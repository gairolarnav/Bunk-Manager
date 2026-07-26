# Bunk Manager

A mobile-first attendance calculator. Enter your total classes and how many you attended (or missed), and it tells you how many more you can safely skip — or how many you need to attend — to hold the 75% line.

No backend, no build step, no dependencies. Three files and an image.

## How it works

The target is **75%**.

| Mode | Attended is |
| --- | --- |
| Classes Attended | the number you type |
| Classes Missed | `total − missed` |

```
percentage = attended / total × 100

percentage ≥ 75  →  skippable = floor((4 × attended − 3 × total) / 3)
percentage < 75  →  needed    = ceil(3 × total − 4 × attended)
```

`skippable` is how many classes you can miss before dropping below 75%. `needed` is how many consecutive classes you must attend to climb back to it.

The percentage, progress bar, and result card share one color state:

| State | Range |
| --- | --- |
| Green — safe | ≥ 78% |
| Yellow — borderline | 75% – 77.99% |
| Red — critical | < 75% |

Results update when you press **Calculate**. Editing an input afterwards dims the previous result until you recalculate, so the numbers on screen always match the numbers you submitted.

## Tech stack

- **HTML** — semantic markup, ARIA live region for results, `inputmode="numeric"` for mobile keypads
- **CSS** — dark theme built on custom properties, BEM naming, CSS transitions and a keyframe fade-in, `prefers-reduced-motion` respected
- **JavaScript** — vanilla, no framework, no dependencies

## Usage

Open `index.html` directly, or serve the folder:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`. In VS Code, Live Server works too.

## Structure

```
index.html      markup
style.css       theme, layout, animations
script.js       input handling and attendance math
favicon.svg     icon (favicon.ico is a 32×32 raster of the same mark)
image/          meme asset
```

## Notes

Needing more than 15 classes to recover triggers a small easter egg below the result card.
