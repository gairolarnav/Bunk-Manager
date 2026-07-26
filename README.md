# Bunk Manager 🎒

Ever sat in class doing mental math about whether you can skip tomorrow without your attendance going down the drain? Yeah, same. That's why this exists.

Punch in your total classes and how many you've attended (or missed, we don't judge), and Bunk Manager instantly tells you how many more you can safely skip — or how many you desperately need to attend — to stay above **75%**.

No sign-ups, no ads, no backend doing who-knows-what with your data. Just open it and it works.

## What it actually does

The magic number is **75%**. That's the line most colleges draw for "you're allowed in the exam hall."

- Toggle between **Classes Attended** or **Classes Missed** — whichever you find easier to count.
- Type in your numbers, hit **Calculate**.
- It tells you straight up:
  - ✅ **Above 75%?** "You can safely miss X more classes."
  - ⚠️ **Right at the edge?** It'll let you know you're cutting it close.
  - 🚨 **Below 75%?** "You need to attend X classes in a row to fix this."

The percentage, the progress bar, and the little result card all change color depending on how screwed (or not) you are:

- 🟢 **Green** — 78% and up, you're golden
- 🟡 **Yellow** — 75–77.9%, borderline, tread carefully
- 🔴 **Red** — below 75%, time to lock in

Oh, and there are a couple of easter eggs hiding in there — one for when things are *really* bad (need more than 15 classes to recover), and one for when you're doing suspiciously well (90% or above and can still skip 5 or more classes). Find out yourself. 👀

## Try it

**Live site:** [Bunk Manager](https://bunk-manager67.netlify.app/)

Or just run it locally like a real developer:

```bash
python -m http.server 8000
```

then open `http://localhost:8000`. Or honestly, just double-click `index.html`. Or use VS Code's Live Server. It's that simple — no build tools, no npm install, no waiting around.

## Built with

Nothing fancy. Just:
- **HTML** — plain and semantic
- **CSS** — dark mode by default, smooth animations, no framework
- **JavaScript** — vanilla, zero dependencies, zero drama

Three files, a couple of images, and that's the whole app.

## What's in the folder

```
index.html      the page
style.css       the vibes (dark theme, colors, animations)
script.js       the brains (all the math + logic)
favicon.svg     the little icon in your tab
image/          shh, they're surprises
```

## Heads up

The math assumes a strict 75% target — if your institution uses a different cutoff, you'll want to tweak the `TARGET` value in `script.js`. Everything else adjusts on its own.

Built for students, by someone who's also done the math on a bathroom break before a lecture. Use it wisely. Or don't — that's between you and your attendance sheet.
