# Blackpine

Wilderness survival in the browser. Gather, build a claim, and hold the tool cupboard through every tenth night.

## Play

**[Play Blackpine](https://htmlpreview.github.io/?https://github.com/85b9gs5wvy-cmyk/blackpine/blob/main/play.html)**

That opens [play.html](play.html), the whole game in one file. Hit **Wake up** to start.

**[Play the split build](https://htmlpreview.github.io/?https://github.com/85b9gs5wvy-cmyk/blackpine/blob/main/index.html)**

That opens [index.html](index.html), the same game loaded from the separate files.

Both links run in the browser. GitHub’s file view only shows source, and this account cannot turn on GitHub Pages, so don’t use a `github.io` address.

The page also has **Save file**, **Load file**, and a **Menu** for look sensitivity, day speed, gather rate, and pause. **Continue** picks up a save already in this browser. On a phone, turn it sideways: the stick and a drag to look. Nothing to install.

## Files

| File | What it is |
|---|---|
| [play.html](play.html) | The whole game in one file. This is the one the link runs. |
| [index.html](index.html) | Same game and menus, split into files, for GitHub Pages. Needs to be served over http (a local server or GitHub Pages), not opened as a file. |
| [blackpine.js](blackpine.js) | The island (kept in sync with the copy inside play.html) |
| [blackpine.css](blackpine.css) | The HUD |
| [three.module.js](three.module.js) | Three.js r128 (MIT) |
