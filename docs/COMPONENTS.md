# Component Breakdown

Anatomy and behavior for every reusable piece. If a developer needs to extend the site, this is the reference.

---

## Layout primitives

### `.nav`
Fixed top nav. Compacts at `scrollY > 60`.

- Left: brand mark with pulsing dot (`.brand .dot`)
- Center: link list (`ul`)
- Right: ghost CTA button (`.cta`)

**States:**
- Scroll past 60px → padding reduces, background becomes more opaque (`js/main.js` → NavScroll)
- Link hover/focus → underline animates left-to-right via `::after`

**Responsive:** link list hides under 980px. Mobile menu is **not built** — flagged in `docs/ASSETS.md` as a developer task.

---

## Hero

### `.hero`
Full viewport-height landing. Layered structure:

1. `.hero-video-wrap` — background `<video>` with `.video-fallback` underneath (animated gradient ensures atmosphere if video fails)
2. `.hero-overlay` — darkening gradient + scanline overlay
3. `.hero-content` — grid with title + meta block

**Title structure:**
```html
<h1>
  <span class="line">The Modern</span>
  <span class="line">Athlete's <em>NIL</em></span>
  <span class="line">Agency.</span>
</h1>
```
Each `.line` animates in with staggered delay (350ms, 550ms, 750ms).

**Buttons:** `.btn-outline` and `.btn-outline.btn-primary` (see Buttons below).

---

## Buttons

### `.btn-outline`
Ghost button. White border, transparent fill.

```html
<a href="#" class="btn-outline">
  Label
  <svg class="arrow" aria-hidden="true">...</svg>
</a>
```

**Hover/focus:** purple fill slides up from the bottom (`::before` transform), text turns to `--on-purple`, arrow nudges up-right.

### `.btn-outline.btn-primary`
Solid purple. Same structure, opposite default state.

**Hover/focus:** fill slides up to `--cream`, becomes outlined style.

---

## Cards

### `.service-card`
Used in the horizontal services section. Width 480px desktop, 320px mobile.

**Anatomy:**
- `.index` — service number eyebrow
- `<h3>` — service title with `<em>` accent
- `<p>` — body copy
- `.read` — action link
- `.icon-mark` — oversized decorative serif glyph in bottom-right (aria-hidden)

**Hover:** card lifts 6px, border turns purple, radial gradient appears top-left, icon mark rotates and brightens.

### `.athlete-card`
Roster grid card.

**Anatomy:**
- `.athlete-photo` — 4:5 aspect ratio image wrapped in `.ph` (background-image for lazy swap), with `.tag` pill overlay
- `.athlete-info` — position label, name, stats row
- `.athlete-cta` — purple banner that slides up from bottom on hover/focus

**Photo:** uses background-image on a `.ph` div for easy CMS replacement. On hover, scales 1.05 and removes the grayscale filter.

---

## Tabs

### `.roster-tabs > .tab`
Single-select filter toggle group.

```html
<div class="roster-tabs" role="group" aria-label="Filter roster by sport">
  <button class="tab active" aria-pressed="true">Football <span class="count">24</span></button>
  <button class="tab" aria-pressed="false">Tennis <span class="count">11</span></button>
</div>
```

**Logic:** in `js/main.js` → RosterTabs. Click toggles `.active` class plus `aria-pressed`. **Currently does not filter the grid** — wire to your data source.

---

## Wire rows

### `.wire-row`
Used in the Transfers (Boardroom) section. Five-column grid: date, athlete, from→to, badge, arrow.

**Badges:**
- `.badge` — outlined (Portal Move)
- `.badge.commit` — filled purple (Committed/Signed)

**Hover:** row indents 24px right and gains a purple-tinted gradient bg.

---

## Leader rows

### `.leader`
Similar pattern to wire rows. Three columns: index, name+role, focus area.

**Hover:** row indents 20px right.

---

## Marquee

### `.marquee` + `.marquee-track`
Infinite-scrolling text strip. Items duplicated in markup so the loop is seamless.

**Animation:** CSS-only, `translateX(0)` to `translateX(-50%)` over 40s. Pauses if `prefers-reduced-motion`.

---

## Decorative

### `.icon-mark` (in service cards)
Large `--serif` italic glyph (`$ ↗ ∞ ◎ ♦ ▲`). Pure decoration, marked `aria-hidden`.

### `.big-mark` (in footer)
Oversized `SWP` watermark. 0.08 opacity, `aria-hidden`.

### Grain overlay (on `body::before`)
SVG fractal noise data URI, `mix-blend-mode: overlay`, 4% opacity. No JS.

---

## Section pattern

Every section uses this header structure:

```html
<div class="section-head">
  <div class="left">
    <span class="num">04 — Section Label</span>
    <h2>Headline with <em>accent</em></h2>
  </div>
  <div class="right">
    Optional intro paragraph.
  </div>
</div>
```

The `.num` eyebrow is monospace, purple-bright, with letterspacing — your visual anchor between sections.

---

## CTAs / inquiry forms

The Brand Intake and Apply for Representation buttons currently link to `#` anchors. **Forms are not built.** Recommended fields are noted in the brief:

**Brand Intake:** Company Name, Campaign Objectives, Target Sport, Target Athlete, Estimated Budget Range.

**Apply for Representation:** Athlete Name, Sport/Position, Current School/Program, Rankings, Current Representation Status.

Use whichever form solution your stack prefers (Formspree, Netlify Forms, custom backend). Use existing `.btn-outline` and `.tab` patterns for inputs.
