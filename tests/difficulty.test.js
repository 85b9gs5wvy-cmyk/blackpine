// Pulls the difficulty table and camp-avoidance helpers straight out of blackpine.js and checks them.
const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const js = fs.readFileSync(path.join(__dirname, '..', 'blackpine.js'), 'utf8');
const grab = (a, b) => { const i = js.indexOf(a); assert.ok(i >= 0, a); const j = js.indexOf(b, i); assert.ok(j > i, b); return js.slice(i, j); };
const mk = () => new Function(`${grab('const DIFFS={', 'let DIFFK')}
let DF=DIFFS.medium;${grab('function foeMit(', 'let REPLAY')}const RCAMPS=[{x:0,z:0,r:20,raiders:[{hp:50}]}];let raidNo=()=>1,daysToRaid=()=>0;
${grab('function wantTier()', '// Settlers stay away')}${grab('function campGunTier()', 'function setSettlerWeapon')}
return {foeMit,DIFFS,setDF:k=>{DF=DIFFS[k]},campDanger,settlerArmed,wantTier,RCAMPS}`)();

test('four modes exist and scale upward', () => {
  const { DIFFS } = mk();
  const order = ['easy', 'medium', 'hard', 'extreme'];
  assert.deepEqual(Object.keys(DIFFS), order);
  for (const k of ['raidMul', 'hp', 'dmg', 'arm', 'grow', 'acc', 'tier', 'heavy', 'sTgt', 'nightMax', 'camp', 'sight', 'party', 'cap'])
    for (let i = 1; i < 4; i++) assert.ok(DIFFS[order[i]][k] >= DIFFS[order[i - 1]][k], k);
  for (const k of ['night', 'campResp', 'sortie', 'sHp']) for (let i = 1; i < 4; i++) assert.ok(DIFFS[order[i]][k] <= DIFFS[order[i - 1]][k], k);
  assert.equal(DIFFS.medium.raidMul, 1);
});
test('unarmed settlers avoid a live camp, armed ones do not', () => {
  const L = mk();
  const unarmed = { k: 'settler', x: 50, z: 0, wt: 2, hx: 300, hz: 300 };
  assert.ok(L.campDanger(unarmed, 50, 0));
  assert.equal(L.campDanger(unarmed, 400, 0), null);
  assert.equal(L.campDanger({ ...unarmed, wt: 3 }, 50, 0), null);
  assert.ok(L.settlerArmed({ wt: 3 }) && !L.settlerArmed({ wt: 2 }));
  L.RCAMPS[0].raiders = [{ hp: 0 }];
  assert.equal(L.campDanger(unarmed, 50, 0), null);
});
test('armor and heavy builds are eased by difficulty and never turn a raider into a sponge', () => {
  const L = mk();
  const heavyArmored = [.6, .86 * .72 * .88];
  const through = {};
  for (const k of ['easy', 'medium', 'hard', 'extreme']) { L.setDF(k); through[k] = L.foeMit(...heavyArmored); }
  assert.ok(through.easy > through.medium && through.medium > through.hard && through.hard >= through.extreme);
  assert.ok(through.extreme >= .4);
  L.setDF('extreme');
  assert.equal(L.foeMit(1, 1), 1);
});
