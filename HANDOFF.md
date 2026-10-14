# Handoff for a new chat
Game: Blackpine (Three.js survival, single JS file `blackpine.js`, also inlined in `play.html`).
Last change: compact HUD (top-center vitals, alert pills, messages below); settlers fetch fuel from red barrels. Rust-style components in COMPONENTS.md.
Edit both `blackpine.js` AND `play.html` (inlined copy) to keep them in sync.
Where things live in blackpine.js: `REC` (recipes), `ITEMS`, `GUNS`, `ITM` (3D models, built with MB: box/cyl/sph), `VMS` (viewmodel scale), `HOLD`, `RY` (recycler), `lootTable()`, `ARM_N` (armor), `COMP`/`catOf`/`needWB` (crafting categories).
Not yet done / ideas: melee weapons (spear, machete) need player attack logic; attachments; component drops from junk piles; raider guns (`RGUN`) for new weapons; untested in a real browser.
Latest: ammo types (AMMO, ammoSel, cycleAmmo, reloadDone), per-gun animation (ANIM table, gunPose, gunM sub-groups act/mag/cyl), FX particles (fxAdd), muzzle flash (makeFlash), burn (BURN). Untested in a real browser.
Wall health bar: #wbar HUD (WB/wbPoke/wbBlast/wbAim/wbHud in blackpine.js + play.html, CSS at end of blackpine.css). Shows when aiming at your own wall/door/cupboard (6.5 m) or for 4s after any hit by you, raiders or a blast; color follows the same 4 damage stages as the cracks. Untested in a real browser.
Biomes: biomeW/biomeAt/bDens/treeKindAt near top of blackpine.js (after Hraw), mirrored in play.html. 0 pine, 1 autumn, 2 meadow, 3 dry scrub. Drives terrain vertex color, place() density (BD table), tree kinds (pine/aut/birch/leaf/snag), fillForest/fillLeaf/fillGrass, minimap color and the clock label. World layout changes vs older builds (extra R() calls). Untested in a real browser.

Full map: toggleMap/drawFull/fmTick (after minimap in blackpine.js + play.html, CSS at end of blackpine.css). Settler upgrades: blueprint now uses wood_ pieces; upgradeWork(n,dt) in nextWork upgrades PCS pieces tagged r.n===n (wood→stone→metal; metal only if they hold it). Test hooks: __bp.tiers/sim/rich/mapOpen.
