// Pulls the AI cover logic out of blackpine.js and runs it against a tiny mock world.
const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const js = fs.readFileSync(path.join(__dirname, '..', 'blackpine.js'), 'utf8');
const grab = (a, b) => { const i = js.indexOf(a); assert.ok(i >= 0, a); const j = js.indexOf(b, i); assert.ok(j > i, b); return js.slice(i, j); };
const mk = () => new Function(`
let age=10;const devs=[],ALLC=[],P={x:0,z:0},ITEMS={barricade:{}},RGUN={pistol:{mag:12}},H=()=>1,moves=[];
const near=(a,b,p)=>{const dx=b.x-a.x,dz=b.z-a.z,l2=dx*dx+dz*dz||1,t=Math.max(0,Math.min(1,((p.x-a.x)*dx+(p.z-a.z)*dz)/l2));return Math.hypot(a.x+dx*t-p.x,a.z+dz*t-p.z)};
const turretSees=(a,b)=>!devs.some(d=>d.t==='barricade'&&!d._gone&&near(a,b,d)<1.4);
const construct=(it,g)=>devs.push({t:'barricade',x:g.x,z:g.z,y:g.y,rot:g.rot,owner:'npc'});
const stepTo=(e,x,z)=>moves.push([x,z]),puffAt=()=>{},blip=()=>{};
${grab('function underFire(', 'function gunSiege(')}
return {devs,moves,aiCover,underFire,setAge:v=>{age=v},get age(){return age}}`)();
const raider = (o = {}) => ({ k: 'raider', x: 0, z: 0, y: 1, hp: 60, gun: 'pistol', mag: 12, ammo: 24, rl: 0, ...o });

test('an exposed raider that is shot sets down a barricade between itself and the shooter', () => {
  const W = mk(), e = raider();
  W.underFire(e, 20, 0, 1);
  assert.equal(W.aiCover(e, .016, 3), true);
  assert.equal(W.devs.length, 1);
  const d = W.devs[0];
  assert.ok(Math.abs(d.x - 1.5) < 1e-6 && Math.abs(d.z) < 1e-6, 'placed 1.5 m toward the shooter');
  assert.ok(Math.abs(Math.sin(d.rot) - 1) < 1e-6, 'wall faces the shooter');
  assert.equal(d.owner, 'raid');
  assert.equal(e.walls, 0);
  assert.ok(e.cvHold > W.age, 'holds behind it');
});
test('no barricade is spent when there is already cover, no fire, or nothing to place', () => {
  const W = mk(), e = raider();
  assert.equal(W.aiCover(e, .016, 3), false);
  W.underFire(e, 20, 0, 1); W.aiCover(e, .016, 3);
  const n = W.devs.length; e.cvCd = 0; e.cvHold = 0; e.fireT = W.age + 4;
  assert.equal(W.aiCover(e, .016, 3), false);
  assert.equal(W.devs.length, n, 'already covered, so no second wall');
  const dry = raider({ walls: 0, x: 100, z: 100 }); W.underFire(dry, 100, 130, 1);
  assert.equal(W.aiCover(dry, .016, 3), false);
  assert.equal(W.devs.length, n);
});
test('a settler pays 20 wood and needs it', () => {
  const W = mk(), s = { k: 'settler', x: 0, z: 0, y: 1, inv: { wood: 25 } };
  W.underFire(s, 0, 25, 1); assert.equal(W.aiCover(s, .016, 3.7), true);
  assert.equal(s.inv.wood, 5); assert.equal(W.devs.length, 1);
  const poor = { k: 'settler', x: 50, z: 50, y: 1, inv: { wood: 5 } };
  W.underFire(poor, 50, 80, 1); assert.equal(W.aiCover(poor, .016, 3.7), false);
  assert.equal(W.devs.length, 1);
});
test('a shot raider walks to an existing barricade instead of placing a new one', () => {
  const W = mk(); W.devs.push({ t: 'barricade', x: 6, z: 3, owner: 'you' });
  const e = raider({ walls: 1 }); W.underFire(e, 30, 3, 1);
  assert.equal(W.aiCover(e, .016, 3), true);
  assert.equal(W.devs.length, 1); assert.equal(e.walls, 1);
  const [mx, mz] = W.moves[0]; assert.ok(mx < 6 && Math.abs(mz - 3) < 1, 'goes to the side away from the shooter');
});
test('barricade is a craftable item with a collision box and model', () => {
  assert.match(js, /ITEMS\.barricade=\{[^}]*dv:'barricade'/);
  assert.match(js, /REC\.push\(\{out:'barricade',q:1,need:\{wood:30\}\}\)/);
  assert.match(js, /barricade:\[1\.3,\.18,1\.62\]/);
  assert.match(js, /v==='barricade'/);
  assert.match(js, /'snap','barricade'\]/);
});
