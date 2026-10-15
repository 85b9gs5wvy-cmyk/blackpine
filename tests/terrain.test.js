// Terrain / biome tests. Run:  node --test tests/
// Target another file (e.g. the terrain upgrade snippet):
//   TERRAIN_SRC=path/to/upgrade.js node --test tests/
// Pulls vn/fbm/Hraw/biomeW/biomeAt out of the source text, so no browser or three.js needed.
const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const SRC = process.env.TERRAIN_SRC || path.join(__dirname, '..', 'blackpine.js');
const text = fs.readFileSync(SRC, 'utf8');

function sliceTerrain(t) {
  const start = t.search(/function vn\s*\(/);
  if (start < 0) throw new Error('function vn not found in ' + SRC);
  // end of a function declaration, found by matching braces (works for one-liners and multi-line)
  const fnEnd = (name) => {
    const i = t.search(new RegExp('function ' + name + '\\s*\\('));
    if (i < 0) throw new Error('function ' + name + ' not found in ' + SRC);
    let d = 0, j = t.indexOf('{', i);
    for (; j < t.length; j++) {
      if (t[j] === '{') d++;
      else if (t[j] === '}' && --d === 0) return j + 1;
    }
    throw new Error('unbalanced braces in ' + name);
  };
  const hm = /let H\s*=\s*Hraw;/.exec(t);
  if (!hm) throw new Error('`let H = Hraw;` not found in ' + SRC);
  // vn..biomeAt/Hraw/`let H=Hraw` is the whole height + biome block in both layouts
  return t.slice(start, Math.max(fnEnd('biomeAt'), fnEnd('Hraw'), hm.index + hm[0].length));
}

const api = new Function(
  'const hash=(x,z)=>{const s=Math.sin(x*127.1+z*311.7)*43758.5453;return s-Math.floor(s)};' +
  sliceTerrain(text) +
  ';return {vn,fbm,Hraw,biomeW,biomeAt};'
)();
const { vn, Hraw, biomeW, biomeAt } = api;

const R = 760; // playable half-size (B in blackpine.js)
const grid = (step, lim = R) => {
  const pts = [];
  for (let x = -lim; x <= lim; x += step) for (let z = -lim; z <= lim; z += step) pts.push([x, z]);
  return pts;
};

test('value noise stays in [0,1] and is deterministic', () => {
  for (const [x, z] of grid(37.3, 400)) {
    const v = vn(x * 0.01, z * 0.01);
    assert.ok(v >= 0 && v <= 1, `vn out of range: ${v}`);
    assert.equal(v, vn(x * 0.01, z * 0.01));
  }
});

test('Hraw is finite and deterministic everywhere, including far outside the island', () => {
  for (const [x, z] of [...grid(53, 1200), [0, 0], [1e4, -1e4]]) {
    const h = Hraw(x, z);
    assert.ok(Number.isFinite(h), `non-finite height at ${x},${z}`);
    assert.equal(h, Hraw(x, z));
  }
});

test('island shape: land in the middle, open water at the rim', () => {
  assert.ok(Hraw(0, 0) > 1, 'spawn should be well above sea level');
  for (let a = 0; a < Math.PI * 2; a += Math.PI / 12) {
    const h = Hraw(Math.cos(a) * 1100, Math.sin(a) * 1100);
    assert.ok(h < -0.5, `expected water at r=1100, angle ${a.toFixed(2)}, got ${h}`);
  }
});

test('terrain is usable: reasonable height range and mostly land inside the play area', () => {
  let min = Infinity, max = -Infinity, land = 0, n = 0;
  for (const [x, z] of grid(20)) {
    if (Math.hypot(x, z) > R) continue;
    const h = Hraw(x, z);
    min = Math.min(min, h); max = Math.max(max, h);
    if (h > 0.3) land++;
    n++;
  }
  assert.ok(max < 14, `peaks too tall: ${max}`);
  assert.ok(max > 3, `terrain too flat: ${max}`);
  assert.ok(min > -8, `ocean too deep: ${min}`);
  assert.ok(land / n > 0.5, `too little land in play area: ${(100 * land / n).toFixed(0)}%`);
});

test('no cliffs or spikes: neighbouring samples differ by a bounded amount', () => {
  const d = 4; // metres
  let worst = 0;
  for (const [x, z] of grid(19, 700)) {
    if (Math.hypot(x, z) > R) continue;
    const h = Hraw(x, z);
    worst = Math.max(worst, Math.abs(Hraw(x + d, z) - h), Math.abs(Hraw(x, z + d) - h));
  }
  assert.ok(worst < 2.4, `steepest 4 m step is ${worst.toFixed(2)} m (slope ${(worst / d).toFixed(2)})`);
});

test('biome weights are non-negative and sum to 1', () => {
  for (const [x, z] of grid(41)) {
    const w = biomeW(x, z);
    assert.equal(w.length, 4);
    let s = 0;
    for (const v of w) { assert.ok(v >= 0 && v <= 1, `weight ${v}`); s += v; }
    assert.ok(Math.abs(s - 1) < 1e-9, `weights sum to ${s} at ${x},${z}`);
  }
});

test('biomeAt returns the dominant weight and always a valid index', () => {
  for (const [x, z] of grid(67)) {
    const b = biomeAt(x, z), w = biomeW(x, z);
    assert.ok(Number.isInteger(b) && b >= 0 && b <= 3);
    assert.equal(w[b], Math.max(...w));
  }
});

test('all four biomes occur inside the play area', () => {
  const seen = new Set();
  for (const [x, z] of grid(25)) if (Math.hypot(x, z) < R) seen.add(biomeAt(x, z));
  assert.deepEqual([...seen].sort(), [0, 1, 2, 3]);
});

test('spawn clearing is forest/meadow, not scrub', () => {
  for (const [x, z] of [[0, 0], [20, 0], [0, -20], [-25, 15]]) {
    assert.notEqual(biomeAt(x, z), 3, `scrub at spawn point ${x},${z}`);
  }
});

test('spawn area is gentle enough to build on', () => {
  let worst = 0;
  for (let x = -60; x <= 60; x += 10) for (let z = -60; z <= 60; z += 10) {
    const h = Hraw(x, z);
    worst = Math.max(worst, Math.abs(Hraw(x + 5, z) - h) / 5, Math.abs(Hraw(x, z + 5) - h) / 5);
  }
  assert.ok(worst < 0.45, `spawn-area max slope ${worst.toFixed(2)}`);
});

test('rolling hills rise above 9.5 m outside the spawn clearing', () => {
  let maxHill = 0;
  for (const [x, z] of grid(16)) {
    if (Math.hypot(x, z) <= R) maxHill = Math.max(maxHill, Hraw(x, z));
  }
  assert.ok(maxHill > 9.5 && maxHill < 14, `expected rolling hills in (9.5, 14), got ${maxHill.toFixed(2)}`);
});

test('rivers, bridges, biome tree species, diverse rocks, and ground snow are wired in blackpine.js', () => {
  for (const fn of ['digRivers', 'buildBridges', 'bridgeAt', 'onBridge', 'inRiver', 'firGeo', 'oakGeo', 'mapleGeo', 'willowGeo', 'juniperGeo', 'mossRockGeo', 'cragRockGeo', 'mesaRockGeo', 'applySnowCover', 'fillUndergrowth']) {
    assert.match(text, new RegExp('function ' + fn + '\\s*\\('), `missing ${fn}`);
  }
});
