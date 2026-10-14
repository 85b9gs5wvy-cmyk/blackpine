// Browser smoke test: node tests/smoke.mjs [file.html]   (needs playwright + chromium)
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
await page.waitForFunction(() => window.__bp && typeof window.__bp.rating === 'function', null, { timeout: 120000 }).catch(e => errors.push('game never became ready: ' + e.message));
await page.waitForTimeout(2500);
const info = await page.evaluate(() => ({
  ready: !!window.__bp,
  qa: (() => { try { const q = window.__bp.qa(); return { mons: q.mons ? q.mons.length : null, bases: q.bases ? q.bases.length : null, keys: Object.keys(q) }; } catch (e) { return { err: String(e) }; } })(),
  errText: document.getElementById('err')?.textContent || '',
}));
console.log(JSON.stringify(info));
if (process.env.SHOT) await page.screenshot({ path: process.env.SHOT, timeout: 90000 }).catch(e => console.log('screenshot skipped:', e.message.split('\n')[0]));
await browser.close();
if (errors.length || !info.ready || info.errText) { console.error('FAIL\n' + [...errors, info.errText].filter(Boolean).join('\n')); process.exit(1); }
console.log('smoke OK');
