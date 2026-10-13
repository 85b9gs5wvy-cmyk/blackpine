# Blackpine

Wilderness survival in the browser. Gather, build a claim, and hold the tool cupboard through every tenth night.

## Play

**On GitHub Pages:** Settings → Pages → Deploy from branch → `main` / root. Then open `https://<your-username>.github.io/<repo-name>/` (that serves `index.html`).

**[Play Blackpine](https://htmlpreview.github.io/?https://github.com/85b9gs5wvy-cmyk/blackpine/blob/main/play.html)**

That opens [play.html](play.html). Hit **Wake up** to start. The page also has **Save file**, **Load file**, and a **Menu** for look sensitivity, day speed, gather rate, and pause. **Continue** picks up a save already in this browser.

GitHub’s file view only shows the source. The Play link above is what runs the game.

WASD and the mouse on a computer. On a phone, turn it sideways: the stick and a drag to look. Nothing to install.

## Files

| File | What it is |
|---|---|
| [play.html](play.html) | The whole game in one file. This is the one the link runs. |
| [index.html](index.html) | Same game and menus, split into files, for GitHub Pages. Needs to be served over http (a local server or GitHub Pages), not opened as a file. |
| [blackpine.js](blackpine.js) | The island (kept in sync with the copy inside play.html) |
| [blackpine.css](blackpine.css) | The HUD |
| [three.module.js](three.module.js) | Three.js r128 (MIT) |
