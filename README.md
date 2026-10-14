# Blackpine

Wilderness survival in the browser. Gather, build a claim, and hold the tool cupboard through every tenth night.

<p>
  <a href="https://htmlpreview.github.io/?https://github.com/85b9gs5wvy-cmyk/blackpine/blob/main/play.html"><img alt="Play Blackpine" src="https://img.shields.io/badge/Play-Blackpine-c4552a?style=for-the-badge"></a>
</p>

That button opens the game. Name a claim, then press **Wake up**. **Continue** loads the latest claim in this browser.

GitHub’s file list only shows source. The button above is what runs it. On a phone, turn it sideways.

## How to play

- **Computer.** WASD to move. Click the game, then the mouse looks. Shift sprints. E or click uses, gathers, and fires. R reloads. T swaps ammo. G drops the held stack (Shift+G drops one). V opens attachments. Z aims. F toggles the light. M opens the island map. 1–6 is the hotbar. I or Tab opens the bag. F5 quick-saves. F9 quick-loads. Esc pauses.
- **Phone.** Landscape only. Stick to move, drag to look, Use / Fire, Sprint, and Bag.
- **Claims.** On the title screen, set the name, day speed, gather rate, and starting kit. Saved claims can be continued, renamed, cloned, exported, or deleted.

## What’s new

- **Solid world.** You, settlers, and animals stop on trees, rocks, ore, barrels, crates, and junk instead of walking through them. Props sit down into slopes so they don’t float, and they get pushed off the road.
- **Chop and mine feedback.** A swing kicks the camera. Wood chips, stone sparks, and a hit sound follow the tool.
- **Saved claims.** Name the claim before you wake. Pick day speed, gather rate, and a kit: Rock, Pioneer (tools and rations), or Outpost Builder (a cupboard and materials). **+ Starter Outpost** adds a fortified Day 3 camp. **F5** quick-saves. **F9** quick-loads.
- **Smarter fights.** Raiders strafe, flank, duck behind trees and rocks while they reload, and bandage when they are badly hurt. A shot calls nearby raiders in. Settlers do the same: they hold a gun line, heal, and repair broken walls, doors, and machines. They upgrade the camp door to sheet metal once they have the metal and a gear.
- **Deer and wolves.** Deer bolt as a herd when you get close, when a wolf is near, or when a gun goes off. Wolves hunt deer and call the pack. Both drop meat and leather.
- **Hands on the gun.** The viewmodel now has gloved hands. Two-handed tools and rifles use both.
- **Bigger island.** New monuments: satellite dish, oil depot, abandoned sawmill, power substation, and radar helipad, two of each, alongside the military outposts, warehouses, gas stations, and shacks. A road runs from where you wake toward the nearest settler and on to a monument. Trees now include spruce, aspen, birch, and scrub.
- **Doors upgrade.** Hit a door with the hammer to step it up, all the way to armored HQ metal.
- **3D items and drops.** Every item now has a 3D model in your hand and on the ground. Press **G** to toss the held stack (**Shift+G** for one). Dropped items arc, bounce, settle, hover and spin, merge with nearby stacks, and fly to you when picked up. The bag has Drop 1 / Drop Stack instead of Discard.
- **Tools gate gathering.** Bare hands can no longer chop trees or mine rocks. You wake with a **Rock** in your hotbar: it chops trees for 2 wood and chips stone for 1, and never breaks. Use it to collect 4 wood and 4 stone, craft a **Stone Hatchet** (needed for wood) and a **Stone Pickaxe** (needed for stone, ore and sulfur). Berries and loot still work by hand. Settlers ignore this rule. If you lose the Rock and lack both tools, you get a new one when you wake or load.
- **Scrap and research.** Scrap turns up in junk piles, barrels, crates and on raiders, and the recycler turns tech trash, springs, sheet, pipes and gun bodies into it. Build a **Research Table** (60 wood, 20 metal, 40 scrap), then spend scrap plus one copy of an item to learn its blueprint. Pipes, sheet metal, springs, gun bodies, guns, special ammo, rockets, C4, turrets and snap traps all start locked.
- Settlers craft weapons and get better ones as raid day nears: clubs and spears first, then knives and machetes, then pistols, shotguns, SMGs, rifles and AKs. Guns shoot raiders from range.
- Screen flashes red when you take damage. Crates hold 1 to 3 items. Roads route around settler bases.
- Full island map: press **M** (or tap the minimap) to open it, **M** or **Esc** to close. Shows monuments, bases, settlers, raiders, fires and you.
- Settlers now build in wood first, then upgrade their foundations, walls, roofs and stairs to stone, and to metal once they have metal.
- **Weapon attachments.** Holo sight, 8x scope, silencer, muzzle brake, muzzle boost, laser, flashlight and extended mag. Press **V** (or the Mods button, or Attachments on a gun in the bag) to mount them. Z or right-click aims down sights. F toggles the light and laser.
- Biomes: dark pine forest, autumn woods (orange and gold leaves, birch), open meadow, and dry scrub. Ground color, trees, rocks, bushes and grass all change with the biome, and the clock shows which one you are in. Forest patches have clearings.
- Compact vitals across the top. Weather and hunger alerts sit under them. Rank and heat stay on the left.
- Workbench components: rope, cloth, pipe, spring, sheet metal, gun bodies, tech trash, low grade fuel.
- New guns: pump shotgun, Thompson, semi-auto rifle. Armor, recycler, and medkits.
- Ammo types: standard, hollow point, armor-piercing, incendiary. Each gun remembers what is loaded.
- Settlers pull low grade fuel from red barrels so their furnace can finish.

Full recipes are in [COMPONENTS.md](COMPONENTS.md).

## Files

| File | What it is |
|---|---|
| [play.html](play.html) | The whole game in one file. This is what Play opens. |
| [index.html](index.html) | The same game split into files. Only runs from a local server, not from GitHub’s file view. |
| [blackpine.js](blackpine.js) | The island. Kept in sync with the copy inside play.html. |
| [blackpine.css](blackpine.css) | The HUD and the title screen. |
| [COMPONENTS.md](COMPONENTS.md) | Components, guns, armor, and ammo. |
| [three.module.js](three.module.js) | Three.js r128 (MIT). |
