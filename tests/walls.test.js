// Pulls blockDist/turretSees out of blackpine.js and checks that walls stop bullets and line of sight.
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const js = fs.readFileSync(new URL('../blackpine.js', import.meta.url), 'utf8');
const grab = (a, b) => { const i = js.indexOf(a); assert.ok(i >= 0, a); const j = js.indexOf(b, i); assert.ok(j > i, b); return js.slice(i, j); };
const mk = ALLC => new Function('ALLC', 'H', `${grab('function blockDist(', 'function tracer(')}${grab('function turretSees(', 'function turrets(')}return {blockDist,turretSees}`)(ALLC, () => 0);
const wall = { x0: 5, x1: 5.05, z0: -3, z1: 3, y: 0, h: 3 };

test('a thin wall stops a bullet however the ray lines up', () => {
  const L = mk([wall]);
  for (let k = 0; k < 300; k++) { const a = (Math.random() - .5) * .5; assert.ok(L.blockDist(0, 1.5, 0, Math.cos(a), 0, Math.sin(a), 30) < 6); }
});
test('open doors, window gaps, and rays over or beside the wall let shots through', () => {
  assert.equal(mk([{ ...wall, d: { open: true } }]).blockDist(0, 1.5, 0, 1, 0, 0, 30), 30);
  assert.equal(mk([{ ...wall, winWall: true, wx: 5.02, wz: 0 }]).blockDist(0, 2, 0, 1, 0, 0, 30), 30);
  assert.ok(mk([{ ...wall, winWall: true, wx: 5.02, wz: 0 }]).blockDist(0, .5, 0, 1, 0, 0, 30) < 6);
  assert.equal(mk([wall]).blockDist(0, 4, 0, 1, 0, 0, 30), 30);
  assert.equal(mk([wall]).blockDist(0, 1.5, 6, 1, 0, 0, 30), 30);
});
test('raiders and settlers do not see through walls', () => {
  const L = mk([wall]);
  assert.equal(L.turretSees({ x: 0, y: 0, z: 0 }, { x: 10, y: 0, z: 0 }), false);
  assert.equal(L.turretSees({ x: 0, y: 0, z: 0 }, { x: 4, y: 0, z: 0 }), true);
});
