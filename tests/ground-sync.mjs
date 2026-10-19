// Headless check: NPC foundations flush to the mesh, the eye stays above ground,
// and distant terrain is left alone.  node tests/ground-sync.mjs [file.html]
import { createRequire } from 'node:module';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
const require = createRequire(import.meta.url);
let chromium;
try { ({ chromium } = require('playwright')); }
catch { ({ chromium } = require(path.join(process.env.NPM_GLOBAL || '/usr/local/lib/node_modules', 'playwright'))); }

const file = path.resolve(process.argv[2] || new URL('../play.html', import.meta.url).pathname);
const errors = [];
const browser = await chromium.launch({ args: ['--use-gl=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
const page = await browser.newPage({ viewport: { width: 1000, height: 600 } });
page.on('pageerror', e => errors.push('pageerror: ' + e.message));
page.on('console', m => { if (m.type() === 'error') errors.push('console: ' + m.text()); });
await page.goto(pathToFileURL(file).href);
await page.click('#go');
await page.waitForFunction(() => window.__bp && typeof window.__bp.groundAudit === 'function', null, { timeout: 180000 }).catch(e => errors.push('game never became ready: ' + e.message));
const audit = await page.evaluate(() => {
  try { return window.__bp.groundAudit(); }
  catch (e) { return { err: String(e && e.stack || e) }; }
}).catch(e => ({ err: 'evaluate failed: ' + e.message }));
console.log(JSON.stringify(audit, null, 2));
await browser.close();
const fail = [];
if (errors.length) fail.push(...errors);
if (!audit || audit.err) fail.push('audit: ' + (audit && audit.err));
else {
  if (audit.dirtyBefore !== 1) fail.push('npc foundation did not leave terrain dirty (flush still skipped?)');
  if (audit.dirtyAfter !== 0) fail.push('update() did not upload the dirty heightmap');
  if (!(audit.nearDrop > 0.2)) fail.push('foundation did not lower the nearby heightmap');
  if (audit.farDrop > 0.02) fail.push('foundation flattened terrain past 8 m');
  if (audit.meshGap > 0.001) fail.push('mesh vertex Y diverges from the heightmap');
  if (audit.camGap < 0.29) fail.push('camera dropped below ground+0.3');
  if (audit.rockErr) fail.push('rock collider: ' + audit.rockErr);
  if (!(audit.rocks > 0)) fail.push('no rocks sampled');
  if (!(audit.maxR <= 3.2)) fail.push('rock radius exceeded 3.2');
  if (!(audit.canopy > 0)) fail.push('instanced trees have no canopy push');
  if (audit.fatCanopy !== 0) fail.push('rock static cols picked up a canopy');
  for (const m of audit.mons || []) {
    if (Math.abs(m.dG) > 0.08) fail.push('monument ' + m.n + ' walk height disagrees with the pad by ' + m.dG);
  }
}
if (fail.length) { console.error('FAIL\n' + fail.join('\n')); process.exit(1); }
console.log('ground-sync OK');
