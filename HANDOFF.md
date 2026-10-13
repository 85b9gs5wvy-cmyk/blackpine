# Handoff for a new chat
Game: Blackpine (Three.js survival, single JS file `blackpine.js`, also inlined in `play.html`).
Last change: compact HUD (top-center vitals, alert pills, messages below); settlers fetch fuel from red barrels. Rust-style components in COMPONENTS.md.
Edit both `blackpine.js` AND `play.html` (inlined copy) to keep them in sync.
Where things live in blackpine.js: `REC` (recipes), `ITEMS`, `GUNS`, `ITM` (3D models, built with MB: box/cyl/sph), `VMS` (viewmodel scale), `HOLD`, `RY` (recycler), `lootTable()`, `ARM_N` (armor), `COMP`/`catOf`/`needWB` (crafting categories).
Not yet done / ideas: melee weapons (spear, machete) need player attack logic; attachments; component drops from junk piles; raider guns (`RGUN`) for new weapons; untested in a real browser.
Latest: ammo types (AMMO, ammoSel, cycleAmmo, reloadDone), per-gun animation (ANIM table, gunPose, gunM sub-groups act/mag/cyl), FX particles (fxAdd), muzzle flash (makeFlash), burn (BURN). Untested in a real browser.
