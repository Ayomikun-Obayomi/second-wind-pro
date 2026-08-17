# Design Tokens

All tokens are defined in `css/tokens.css` as CSS custom properties on `:root`. Consume via `var(--token-name)` — never use raw hex values in component styles.

---

## Color tokens

### Surfaces

| Token | Value | Usage |
|---|---|---|
| `--bg` | `#0a0710` | Page background, default canvas |
| `--bg-deep` | `#050308` | Deepest surface (services section, footer, marquee strip) |
| `--surface` | `#1a1525` | Default card surface (athlete cards, service cards) |
| `--surface-2` | `#241d33` | Secondary surface (athlete photo placeholder bg) |

### Borders

| Token | Value | Usage |
|---|---|---|
| `--line` | `rgba(196, 181, 253, 0.22)` | Default dividers, card borders |
| `--line-strong` | `rgba(196, 181, 253, 0.55)` | Emphasized borders, tag pills |

Both meet the 3:1 contrast rule for non-text UI components.

### Purple system

| Token | Value | Contrast on `--bg` | Usage |
|---|---|---|---|
| `--purple` | `#b89dff` | 8.4:1 — AAA | Primary CTA fills, active tabs, badges |
| `--purple-bright` | `#d4c5ff` | 11.2:1 — AAA | Accent text, italic display words, focus accents |
| `--purple-deep` | `#6d28d9` | — | Decorative gradients only (do not use for text) |
| `--purple-glow` | `rgba(184, 157, 255, 0.5)` | — | `box-shadow` glow effects |

### Text

| Token | Value | Contrast on `--bg` | Usage |
|---|---|---|---|
| `--cream` | `#f4efe6` | 16:1 — AAA | Primary text, headings |
| `--muted` | `#c4bbd1` | 10.2:1 — AAA | Body copy, secondary text |
| `--muted-2` | `#9890a3` | 6.1:1 — AA | Tertiary text (dates, label numbers, captions) |

### Text-on-fill

| Token | Value | Contrast on `--purple` | Usage |
|---|---|---|---|
| `--on-purple` | `#1a0a2e` | 8.1:1 — AAA | Text sitting on any purple fill — buttons, tabs, badges |

> **Rule:** any time text sits on a purple background, use `--on-purple`, not `--bg`. They're visually similar but `--on-purple` is tuned for guaranteed contrast against `--purple`.

### Focus

| Token | Value | Contrast on `--bg` | Usage |
|---|---|---|---|
| `--focus` | `#ffd166` | 12:1 — AAA | Global `:focus-visible` outline, skip link |

The amber is intentionally distinct from the purple hover state so users can tell hover and focus apart.

---

## Typography

### Font families

| Token | Stack |
|---|---|
| `--serif` | `'Instrument Serif', Georgia, serif` |
| `--sans` | `'Familjen Grotesk', system-ui, sans-serif` |
| `--mono` | `'JetBrains Mono', ui-monospace, monospace` |

Fonts load from Google Fonts. For self-hosting, download from:
- https://fonts.google.com/specimen/Instrument+Serif
- https://fonts.google.com/specimen/Familjen+Grotesk
- https://fonts.google.com/specimen/JetBrains+Mono

### Type scale

| Token | Value | Common usage |
|---|---|---|
| `--t-xs` | `11px` | Mono labels, eyebrow tags |
| `--t-sm` | `13px` | Nav links, small body |
| `--t-base` | `16px` | Body copy |
| `--t-md` | `20px` | Lead text, pull quotes |
| `--t-lg` | `28px` | Card headings, leader names |
| `--t-xl` | `44px` | Service card titles |
| `--t-2xl` | `72px` | Section headlines |
| `--t-3xl` | `clamp(54px, 10vw, 156px)` | Hero display |

### Typographic conventions

- **Headlines** use `--serif`. Display italics within headlines are wrapped in `<em>` and colored `--purple-bright`.
- **Body** uses `--sans` at 15–17px.
- **Labels, numbers, dates** use `--mono` at 10–12px with `letter-spacing: 0.2em–0.25em` and `text-transform: uppercase`.

---

## Spacing scale

| Token | Value |
|---|---|
| `--s-1` | `4px` |
| `--s-2` | `8px` |
| `--s-3` | `14px` |
| `--s-4` | `24px` |
| `--s-5` | `40px` |
| `--s-6` | `60px` |
| `--s-7` | `100px` |
| `--s-8` | `160px` |

Section padding-block uses `--s-8` on desktop, `--s-7` on mobile.

---

## Motion

| Token | Value | Usage |
|---|---|---|
| `--ease-out` | `cubic-bezier(.2, .7, .2, 1)` | Default for hovers and reveals |
| `--ease-in-out` | `cubic-bezier(.16, 1, .3, 1)` | Services scroll lerp |
| `--dur-fast` | `.25s` | Hover state changes |
| `--dur-mid` | `.45s` | Reveal transitions |
| `--dur-slow` | `.9s` | Major layout shifts, services transition |

All transitions are globally disabled when `prefers-reduced-motion: reduce` is set.

---

## Radius

| Token | Value | Usage |
|---|---|---|
| `--radius-sm` | `4px` | Tags, small chips |
| `--radius-md` | `8px` | Modal cells |
| `--radius-lg` | `12px` | Cards |
| `--radius-pill` | `100px` | Nav CTA, filter tabs, partner button |

> **Section CTAs** (`.btn-outline`) use **`--radius-pill`** — same pill radius as `.nav-cta` and partner buttons, with slide-fill hover.

---

## Buttons (sports agency)

### `.btn-outline` — ghost secondary

- Cream 1px border, transparent fill, `--mono` at 12px, `letter-spacing: 0.2em`, uppercase
- Hover: `--purple` fill slides up from bottom; text → `--on-purple`; diagonal arrow nudges up-right
- Examples: **Launch Campaign**, **Speak With an Agent**

### `.btn-outline.btn-primary` — solid primary

- Default: `--purple` fill, `--on-purple` text, purple border
- Hover: `--cream` fill slides up; border → `--cream`
- Examples: **View Roster**, **Get Started**, **Contact Us**

```html
<a href="#roster" class="btn-outline btn-primary">
  View Roster
  <svg class="arrow" viewBox="0 0 14 14" aria-hidden="true">...</svg>
</a>
<a href="#brand" class="btn-outline">
  Launch Campaign
  <svg class="arrow" viewBox="0 0 14 14" aria-hidden="true">...</svg>
</a>
```

---

## Layout

| Token | Value | Usage |
|---|---|---|
| `--container` | `1400px` | Max content width |
| `--gutter` | `40px` | Desktop side padding |
| `--gutter-mobile` | `24px` | Mobile side padding (≤980px) |
