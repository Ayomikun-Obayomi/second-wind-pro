# Second Wind Pro

The modern athlete's NIL agency — landing page.

This is a static site built with vanilla HTML, CSS, and JavaScript. No build step, no framework, no dependencies. Open `index.html` in a browser or serve the folder with any static file server.

---

## Quick start

```bash
# Option 1 — open directly
open index.html

# Option 2 — serve with Python (recommended for fonts/video to load consistently)
python3 -m http.server 8000

# Option 3 — serve with Node
npx serve .
```

Then visit `http://localhost:8000`.

---

## Repository structure

```
second-wind-pro/
├── index.html           Single-page entry. Section markup only.
├── README.md            This file.
├── .gitignore
│
├── css/
│   ├── tokens.css       Design tokens (colors, type, spacing, motion).
│   └── style.css        All component and section styles.
│
├── js/
│   └── main.js          Four IIFE modules: services scroll, nav,
│                        roster tabs, hero parallax.
│
├── assets/
│   └── README.md        Asset specifications and placeholder list.
│
└── docs/
    ├── DESIGN-TOKENS.md   Full token reference with contrast ratios.
    ├── COMPONENTS.md      Per-component anatomy and states.
    ├── ACCESSIBILITY.md   WCAG audit, keyboard map, screen-reader notes.
    └── ASSETS.md          What needs to be sourced before launch.
```

---

## Pushing this to GitHub

From inside this folder:

```bash
git init
git add .
git commit -m "Initial commit — landing page handoff"

# Create the repo on github.com first, then:
git branch -M main
git remote add origin https://github.com/YOUR_ORG/second-wind-pro.git
git push -u origin main
```

Your dev team can then clone it into Cursor with:

```bash
git clone https://github.com/YOUR_ORG/second-wind-pro.git
cd second-wind-pro
cursor .
```

---

## What's done vs what needs work

**Done**
- Full visual design across nine sections
- WCAG 2.2 AA compliant color system (see `docs/ACCESSIBILITY.md`)
- Mouse + touch + keyboard interaction on services section
- `prefers-reduced-motion` support throughout
- Responsive breakpoints down to mobile
- Semantic HTML landmarks, ARIA states, skip link

**Needs developer work before launch**
- Replace stock hero video (`cdn.pixabay.com`) with licensed footage
- Replace placeholder athlete photos (Unsplash) with real photography
- Replace placeholder athlete data with CMS-driven content
- Wire roster tabs to actually filter the grid (currently visual only)
- Build the inquiry forms (Brand Intake, Apply for Representation) — currently styled buttons only
- Add real contact info, social URLs, legal pages
- Configure analytics
- Add OG / Twitter card meta tags for social sharing
- Replace favicon

See `docs/ASSETS.md` for a complete inventory.

---

## Design principles for future work

1. **Use the tokens.** Never write raw hex values in `style.css`. If a color is missing, add it to `tokens.css` first.
2. **Text on purple fills uses `--on-purple`.** Not `--bg`. This is non-negotiable for contrast.
3. **Focus states are visible.** Anything interactive gets the global `:focus-visible` outline. Don't override with `outline: none` unless replacing with something equally visible.
4. **Honor reduced motion.** Any new animation must either degrade gracefully under `prefers-reduced-motion` or be gated behind a JS check.

---

## Browser support

Tested against current Chrome, Safari, Firefox, Edge. Uses modern features:

- CSS custom properties
- `backdrop-filter` (Safari needs `-webkit-backdrop-filter` — included)
- `clamp()` for fluid type
- `:focus-visible`
- `prefers-reduced-motion`

IE is not supported.

---

## Contact

Design system and questions: [your name / email]
