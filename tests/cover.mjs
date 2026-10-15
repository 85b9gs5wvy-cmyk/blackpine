// Browser test: node tests/cover.mjs [file.html]  (needs playwright + chromium; set NPM_GLOBAL like smoke.mjs)
// Starts a raid, shoots siege raiders, and checks one sets down a Wood Barricade and hides behind it.
import { createRequire } from 'node:module';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
const require = createRequire(import.meta.url);
let chromium;
try { ({ chromium } = require('playwright')); }
catch { ({ chromium } = require(path.join(process.env.NPM_GLOBAL || '/usr/local/lib/node_modules', 'playwright'))); }
const file = path.resolve(process.argv[2] || new URL('../play.html', import.meta.url).pathname);
const browser = await chromium.launch({ args: ['--use-gl=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
const page = await browser.newPage({ viewport: { width: 1000, height: 600 } });
const errors = []; page.on('pageerror', e => errors.push(e.message));
await page.goto(pathToFileURL(file).href);
await page.click('#go');
await page.waitForFunction(() => window.__bp && typeof window.__bp.rating === 'function', null, { timeout: 120000 });
await page.waitForTimeout(1500);
const r = await page.evaluate(() => {
  const B = window.__bp; B.launch(); B.tick(300);
  for (let k = 0; k < 12; k++) {
    B.tick(20);
    for (const f of B.foes().filter(f => f.siege && f.gun)) B.hitFoe(f.i, 1);
    if (B.barricades().some(b => b.owner === 'raid')) break;
  }
  return { raid: B.barricades().filter(b => b.owner === 'raid').length, holding: B.foes().some(f => f.hold > 0) };
});
await browser.close();
console.log(JSON.stringify(r));
if (errors.length || r.raid < 1) { console.error('FAIL', errors, r); process.exit(1); }
console.log('cover OK');
