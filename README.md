# Bunk Manager

A lightweight web app to calculate how many classes you can skip—or desperately need to attend—to keep your attendance at or above 75%.

## Features

- **Flexible Input:** Calculate using either classes attended or classes missed.
- **Instant Status:** Shows exact safe skips available or consecutive classes required to recover.
- **Visual Thresholds:** Color-coded status updates (Green: safe, Yellow: borderline, Red: critical).
- **Zero Backend:** Runs entirely in the browser with no tracking or setup required.

## Live Demo & Local Run

- **Live:** [bunk-manager67.netlify.app](https://bunk-manager67.netlify.app/)
- **Local:** Open `index.html` directly in any browser, or spin up a quick server:

```bash
python -m http.server 8000
```

## Tech Stack

- **HTML5:** Semantic structure.
- **CSS3:** Custom styling with built-in dark theme and basic transitions.
- **JavaScript (ES6):** Client-side logic and DOM updates.

## Heads Up

- **Custom Cutoffs:** The default attendance target is set to 75%. If your institution requires a different percentage, adjust the TARGET constant in script.js.
- **Structure:** The repo contains three core files (index.html, style.css, script.js) alongside minor assets.

