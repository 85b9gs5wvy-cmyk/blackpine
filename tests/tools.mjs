// Browser test for tool tiers, hold-to-repeat, crate inventories, stacking and drag-to-drop.
// node tests/tools.mjs [file.html]   (needs playwright + chromium; set NPM_GLOBAL if playwright is not resolvable)
import { createRequire } from 'node:module';
import path from 'node:path';
import fs from 'node:fs';
import { pathToFileURL } from 'node:url';
const require = createRequire(import.meta.url);
let chromium;
try { ({ chromium } = require('playwright')); }
catch { ({ chromium } = require(path.join(process.env.NPM_GLOBAL || '/usr/local/lib/node_modules', 'playwright'))); }

const file = path.resolve(process.argv[2] || new URL('../play.html', import.meta.url).pathname);
const SHOTS = process.env.SHOTS || '';
const errors = [], fails = [];
const ok = (c, m) => { console.log((c ? 'PASS ' : 'FAIL ') + m); if (!c) fails.push(m); };
const browser = await chromium.launch({ args: ['--use-gl=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
const page = await browser.newPage({ viewport: { width: 1100, height: 700 } });
page.on('pageerror', e => errors.push('pageerror: ' + e.message));
page.on('console', m => { if (m.type() === 'error') errors.push('console: ' + m.text()); });
await page.goto(pathToFileURL(file).href);
await page.click('#go');
await page.waitForFunction(() => window.__bp && window.__bp.inv, null, { timeout: 120000 });
await page.waitForTimeout(1500);
const ev = (f, a) => page.evaluate(f, a);

// ---- 1. tiers: yields climb, models exist
for (const [id, tier] of [['hatchet', 1], ['metal_hatchet', 2], ['chainsaw', 3]]) {
  const y = await ev(i => window.__bp.inv.tierYield(i), id);
  console.log(id, 'tree/stone/ore/tier =', y);
  ok(y[3] === tier, id + ' is tier ' + tier);
}
const trees = await Promise.all(['rock', 'hatchet', 'metal_hatchet', 'chainsaw'].map(i => ev(x => window.__bp.inv.tierYield(x)[0], i)));
ok(trees[0] < trees[1] && trees[1] < trees[2] && trees[2] < trees[3], 'wood per swing rises with tier ' + trees);
const stones = await Promise.all(['rock', 'pickaxe', 'metal_pickaxe', 'jackhammer'].map(i => ev(x => window.__bp.inv.tierYield(x)[1], i)));
ok(stones[0] < stones[1] && stones[1] < stones[2] && stones[2] < stones[3], 'stone per swing rises with tier ' + stones);

// ---- 2. hold to repeat: count swings in 3 s of simulated time
async function swings(id, hold) {
  return ev(({ id, hold }) => {
    const b = window.__bp, I = b.inv;
    I.closePanel(); I.setSlot(0, { id, n: 1, dur: 9999 }); I.select(0);
    b.tick(30, .02); // settle cooldowns
    I.trig(false);
    if (hold) I.trig(true);
    let n = 0, prevE = I.energy(), last = -1;
    const mel = ['club', 'knife', 'machete', 'spear'].includes(id);
    for (let i = 0; i < 150; i++) {
      b.tick(1, .02);
      const cd = mel ? I.mCd() : I.toolCd();
      if (cd > last + 1e-6 && last >= 0 || (cd > 0 && last === 0)) n++;
      last = cd;
    }
    const held = I.fireHeld();
    I.trig(false);
    return { n, held, afterRelease: I.fireHeld() };
  }, { id, hold });
}
for (const [id, lo, hi] of [['rock', 3, 6], ['hatchet', 4, 8], ['metal_hatchet', 6, 11], ['chainsaw', 18, 30], ['jackhammer', 22, 36], ['club', 4, 7], ['knife', 8, 11]]) {
  const r = await swings(id, true);
  console.log(id, 'held for 3 s ->', r.n, 'swings');
  ok(r.n >= lo && r.n <= hi, id + ' keeps swinging while held (' + r.n + ' in 3 s, expect ' + lo + '-' + hi + ')');
  ok(r.afterRelease === false, id + ' stops on release');
}
{
  const r = await swings('chainsaw', false);
  ok(r.n <= 1, 'chainsaw does not repeat when not held (' + r.n + ')');
}

// ---- 3. crates are containers
const crates = await ev(() => window.__bp.inv.crates());
console.log('crates in world:', crates.length, 'tiers', [...new Set(crates.map(c => c.tier))]);
ok(crates.length > 0, 'world has crates');
for (const tier of [1, 2, 3, 4]) {
  const c = crates.find(c => c.tier === tier);
  if (!c) { console.log('  (no tier ' + tier + ' crate to test)'); continue; }
  const r = await ev(c => {
    const I = window.__bp.inv;
    I.closePanel(); I.place(c.x + 1.2, c.z); window.__bp.tick(2, .05);
    const t = I.openNearestCrate();
    const bx = I.box();
    return { t, open: I.isOpen(), box: bx };
  }, c);
  const items = r.box ? r.box.sl.filter(Boolean).length : 0;
  ok(r.open && r.box && r.box.t === 'crate' && items > 0, 'tier ' + tier + ' crate opens as a container with ' + items + ' stacks (' + (r.box && r.box.nm) + ', ' + (r.box && r.box.sl.length) + ' slots)');
  if (tier === 1 || tier === 4) {
    await page.screenshot({ path: path.join(SHOTS || '/tmp', 'crate' + tier + '.png') }).catch(() => {});
    // press Take all through the real button
    const before = await ev(() => window.__bp.inv.slots().filter(Boolean).length);
    await page.getByRole('button', { name: 'Take all' }).click();
    const after = await ev(() => ({ s: window.__bp.inv.slots().filter(Boolean).length, box: window.__bp.inv.box() }));
    ok(after.s > before, 'Take all moves loot into the bag (' + before + ' -> ' + after.s + ' stacks)');
    ok(after.box.sl.every(q => !q), 'crate is empty after Take all');
    await ev(() => window.__bp.inv.closePanel());
    await ev(() => window.__bp.tick(3, .05));
    const cd = await ev(c => window.__bp.inv.crates().find(q => q.x === c.x && q.z === c.z).cd, c);
    ok(cd > 0, 'emptied crate starts its refill timer (' + Math.round(cd) + ' s)');
  }
}

// ---- 4. stacking by drag and drop
await ev(() => {
  const I = window.__bp.inv;
  for (let i = 0; i < 30; i++) I.setSlot(i, null);
  I.setSlot(7, { id: 'wood', n: 300 }); I.setSlot(8, { id: 'wood', n: 250 });
  I.setSlot(9, { id: 'berry', n: 5 }); I.setSlot(10, { id: 'berry', n: 4 });
  I.setSlot(11, { id: 'stone', n: 30 });
  I.openPanel();
});
await page.waitForSelector('#panel .slot[data-i="7"]');
async function drag(from, to, shift) {
  const a = await page.locator('#panel .slot[data-i="' + from + '"]').boundingBox();
  const b = typeof to === 'number' ? await page.locator('#panel .slot[data-i="' + to + '"]').boundingBox() : { x: to[0], y: to[1], width: 0, height: 0 };
  await page.mouse.move(a.x + a.width / 2, a.y + a.height / 2);
  await page.mouse.down();
  await page.mouse.move(a.x + a.width / 2 + 12, a.y + a.height / 2 + 12, { steps: 4 });
  await page.mouse.move(b.x + b.width / 2, b.y + b.height / 2, { steps: 8 });
  if (shift) await page.keyboard.down('Shift');
  await page.mouse.up();
  if (shift) await page.keyboard.up('Shift');
  await page.waitForTimeout(60);
}
await drag(8, 7);
let sl = await ev(() => window.__bp.inv.slots());
ok(sl[7] && sl[7].n === 550 && !sl[8], 'dragging wood onto wood stacks them (' + JSON.stringify(sl[7]) + ', slot 8 ' + JSON.stringify(sl[8]) + ')');
await drag(10, 9);
sl = await ev(() => window.__bp.inv.slots());
ok(sl[9] && sl[9].n === 9 && !sl[10], 'dragging berries onto berries stacks them (' + JSON.stringify(sl[9]) + ')');
await drag(11, 9);
sl = await ev(() => window.__bp.inv.slots());
ok(sl[9] && sl[9].id === 'stone' && sl[11] && sl[11].id === 'berry', 'dragging onto a different item swaps them');
await drag(9, 11);

// ---- 5. drag off the panel to drop on the ground
const d0 = await ev(() => window.__bp.inv.drops());
await drag(7, [6, 6]);
sl = await ev(() => window.__bp.inv.slots());
const d1 = await ev(() => window.__bp.inv.drops());
ok(!sl[7] && d1 === d0 + 1, 'dragging a stack off the bag drops it on the ground (drops ' + d0 + ' -> ' + d1 + ', slot 7 ' + JSON.stringify(sl[7]) + ')');
await ev(() => window.__bp.inv.setSlot(12, { id: 'berry', n: 9 }));
await drag(12, [6, 6], true);
sl = await ev(() => window.__bp.inv.slots());
ok(sl[12] && sl[12].n === 8, 'Shift-dragging off the bag drops just one (' + JSON.stringify(sl[12]) + ')');
const d2 = await ev(() => window.__bp.inv.drops());
await drag(12, 13);
sl = await ev(() => window.__bp.inv.slots());
ok(sl[13] && sl[13].n === 8 && (await ev(() => window.__bp.inv.drops())) === d2, 'dropping on another slot still moves, not drops');

// ---- 6. screenshots of the tool models
if (SHOTS) {
  await ev(() => window.__bp.inv.closePanel());
  for (const id of ['hatchet', 'metal_hatchet', 'chainsaw', 'pickaxe', 'metal_pickaxe', 'jackhammer']) {
    for (const p of [0, .5]) {
      await ev(({ id, p }) => { window.__bp.meleePose(id, p, true); }, { id, p });
      const url = await ev(() => window.__bp.snap());
      fs.writeFileSync(path.join(SHOTS, id + '_' + p + '.png'), Buffer.from(url.split(',')[1], 'base64'));
    }
  }
}

await browser.close();
if (errors.length) { console.log('ERRORS:\n' + errors.join('\n')); fails.push('page errors'); }
if (fails.length) { console.error('\n' + fails.length + ' FAILED'); process.exit(1); }
console.log('\ntools OK');
