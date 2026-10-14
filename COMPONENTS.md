# Blackpine components (Rust-style)

Crafted at a **workbench** unless noted. Fiber items craft by hand.

| Component | Recipe | Used in |
|---|---|---|
| Rope | 6 fiber (hand) | armor, satchel |
| Cloth | 4 fiber (hand) | armor |
| Metal Pipe | 12 metal | barrels, launcher |
| Metal Spring (tier 3) | 18 metal, 3 gears, 2 Low Grade Fuel | every gun |
| Low Grade Fuel | red barrels only | furnace build, Medkit, Spring; burns 3x longer than wood in a furnace |
| Sheet Metal | 16 metal | armor, AK, launcher |
| Semi-Auto Body | 30 metal, 1 sheet, 1 spring | Pistol, Rifle, Semi-Auto Rifle |
| SMG Body | 40 metal, 2 sheet, 2 spring | SMG, Thompson, AK |
| Tech Trash | crate loot only (tier 2-3) | AK |

## Weapons
- Pistol: semi body, spring, 15 metal
- Revolver: pipe, spring, 18 metal, 4 wood
- Shotgun: 2 pipe, spring, 10 wood, 12 metal
- Pump Shotgun (new): 2 pipe, 2 spring, 12 wood, 1 sheet
- SMG: smg body, pipe, spring, 20 metal
- Thompson (new): smg body, pipe, spring, 8 wood, 20 metal
- Rifle: semi body, 2 pipe, 2 spring, 10 wood, 1 circuit
- Semi-Auto Rifle (new): semi body, pipe, spring, 8 wood, 20 metal
- Assault Rifle: smg body, pipe, 2 spring, 2 sheet, 10 wood, 2 tech trash
- Rocket Launcher: 3 pipe, 2 sheet, spring, 6 gears
- Rocket: 16 powder, 8 metal, pipe, gear
- Armor: helmet 1 sheet/2 cloth/1 rope; vest 3 sheet/4 cloth/1 rope/10 metal; legs 2 sheet/3 cloth/1 rope

Components recycle in the Recycler. Junk piles drop tier 1 parts (rope, cloth, pipe). Supply crates and red barrels also give tier 2 parts (sheet, pipe). Military crates can drop Rifles and Semi-Auto Rifles.

Springs are tier 3: only Elite crates drop them, otherwise craft with fuel.
Medkit is craftable: 2 bandages, 3 cloth, 2 Low Grade Fuel. Furnace now costs 3 Low Grade Fuel extra.

## Low Grade Fuel update
- Settlers now fetch Low Grade Fuel from red barrels (needed for their furnace); previously they would stall on the furnace step.
- Furnace UI text now lists Low Grade Fuel as a valid input.

## HUD revamp
Vitals are now a compact icon+bar strip at top-center; alerts (fog, rain, cold, hungry...) are small pills right under it; messages sit below that. Rank/heat is top-left. Low vitals pulse red and show their value. CSS lives at the end of blackpine.css (and inside play.html's style block).

## Ammo types (T to swap, R to load)
- Standard: metal x4 -> 20 rounds
- Hollow Point: 20 standard, 2 metal, 2 charcoal. +30% damage, armor counts for more.
- Armor-Piercing: 20 standard, 8 metal, 2 powder, 1 gears. Ignores most armor, passes through to a second target.
- Incendiary: 20 standard, 6 sulfur, 1 fuel. Lower impact damage, sets targets on fire (burn ignores armor).
Found in tier 2-3 crates and occasionally dropped by raiders. Each gun remembers which ammo is loaded. Swapping types returns the old rounds to your bag.

## Scrap and research (Rust-style)
Scrap drops: junk piles (55%, 1-3), barrels (brown 22%, blue/oil 50%, red 65%, white 12%), supply crates (2-6), military crates (10-25), elite crates (25-60), raiders (70%, 1-4). Every crate that rolls scrap always includes it.
Recycler: tech trash -> 10 scrap + circuit; spring -> 5 scrap + 6 metal; sheet -> 3 scrap + 8 metal; pipe -> 2 scrap + 6 metal; semi body -> 8 scrap + 15 metal; SMG body -> 12 scrap + 20 metal.

**Research Table**: 60 wood, 20 metal, 40 scrap. Use it, pick a locked item, pay the scrap and hand over one copy. The copy is used up and the blueprint is kept for good (it is saved).

| Blueprint | Scrap |
|---|---|
| Metal Pipe, Sheet Metal | 20 |
| Snap Trap, Hollow Point ammo | 40 / 30 |
| Revolver | 60 |
| Spring, Semi-Auto Body, Armor-Piercing, Incendiary, Pistol, Shotgun | 75 |
| Rocket, Auto Turret | 100 |
| SMG Body, Pump Shotgun | 125 |
| SMG, Thompson, C4 | 150 |
| Semi-Auto Rifle, Rifle | 200 |
| Assault Rifle, Rocket Launcher | 300 |

Locked recipes show a lock in the crafting tab. Settlers do not need blueprints. Saves from before this update start with everything unlocked.
