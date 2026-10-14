# Blackpine

Wilderness survival in the browser. Gather, build a claim, and hold the tool cupboard through every tenth night.

<p>
  <a href="https://htmlpreview.github.io/?https://github.com/85b9gs5wvy-cmyk/blackpine/blob/main/play.html"><img alt="Play Blackpine" src="https://img.shields.io/badge/Play-Blackpine-c4552a?style=for-the-badge"></a>
</p>

That button opens the game. Press **Wake up**. **Continue** loads a save already in this browser.

GitHub’s file list only shows source. The button above is what runs it. On a phone, turn it sideways.

## How to play

- **Computer.** WASD to move. Click the game, then the mouse looks. Shift sprints. E or click uses, gathers, and fires. R reloads. T swaps ammo. M opens the island map. 1–6 is the hotbar. I or Tab opens the bag. Esc pauses.
- **Phone.** Landscape only. Stick to move, drag to look, Use / Fire, Sprint, and Bag.
- **Menu.** Pause, look sensitivity, invert Y, day speed, gather rate, minimap, save to a file, load a file.

## What’s new

- Full island map: press **M** (or tap the minimap) to open it, **M** or **Esc** to close. Shows monuments, bases, settlers, raiders, fires and you.
- Settlers now build in wood first, then upgrade their foundations, walls, roofs and stairs to stone, and to metal once they have metal.
- Biomes: dark pine forest, autumn woods (orange and gold leaves, birch), open meadow, and dry scrub. Ground color, trees, rocks, bushes and grass all change with the biome, and the clock shows which one you are in. Forest patches have clearings.
- Aim at your own wall, door, or cupboard and a health bar appears. It also shows for a few seconds after a hit. The color follows the damage cracks.
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
| [blackpine.css](blackpine.css) | The HUD. |
| [COMPONENTS.md](COMPONENTS.md) | Components, guns, armor, and ammo. |
| [three.module.js](three.module.js) | Three.js r128 (MIT). |
