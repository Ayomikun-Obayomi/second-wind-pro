# Accessibility

This site is built to **WCAG 2.2 AA** standard. Many combinations exceed AAA. Below is the full audit and the developer rules for keeping it compliant.

---

## Color contrast — all combinations

Measured against the dark backgrounds the colors are paired with.

| Text color | On background | Ratio | WCAG |
|---|---|---|---|
| `--cream` `#f4efe6` | `--bg` `#0a0710` | 16:1 | AAA |
| `--cream` | `--surface` `#1a1525` | 14:1 | AAA |
| `--purple` `#b89dff` | `--bg` | 8.4:1 | AAA |
| `--purple-bright` `#d4c5ff` | `--bg` | 11.2:1 | AAA |
| `--purple-bright` | `--surface` | 9.7:1 | AAA |
| `--muted` `#c4bbd1` | `--bg` | 10.2:1 | AAA |
| `--muted` | `--surface` | 8.8:1 | AAA |
| `--muted-2` `#9890a3` | `--bg` | 6.1:1 | AA |
| `--muted-2` | `--surface` | 5.3:1 | AA |
| `--on-purple` `#1a0a2e` | `--purple` `#b89dff` | 8.1:1 | AAA |
| `--focus` `#ffd166` | `--bg` | 12:1 | AAA |

### Borders / UI components (3:1 rule)

| Token | Effective contrast | WCAG |
|---|---|---|
| `--line` (0.22 alpha) | ~3.1:1 | AA |
| `--line-strong` (0.55 alpha) | ~5.4:1 | AA |

---

## Keyboard navigation

### Tab order (top to bottom)

1. **Skip-to-content link** — appears in top-left on first Tab
2. Nav: brand mark (not focusable), each nav link, Apply CTA
3. Hero: View Roster, Launch Campaign
4. Editorial section (no interactive elements)
5. Services: each "Read brief" link — when focused, **the services track scrolls horizontally to bring the card into view** (see `js/main.js` → ServicesScroll focusin handler)
6. Roster: each tab button, each athlete card link/CTA
7. Transfers: each wire row (currently not focusable — see below)
8. Brand CTA: Open Brand Intake
9. Leadership: each leader row (currently not focusable — see below)
10. Join: Apply For Representation, Speak With An Agent
11. Footer: every link in every column, social links

### Focus indicator

A 2px solid amber outline (`--focus`) with 3px offset. Applied via the global:

```css
*:focus-visible {
  outline: 2px solid var(--focus);
  outline-offset: 3px;
  border-radius: 2px;
}
```

`:focus` (without -visible) hides the outline so mouse users don't see it on click, but keyboard users always do.

### Skip link

```html
<a href="#main" class="skip-link">Skip to content</a>
```

Hidden offscreen until it receives focus, then animates to the top-left with the amber background.

---

## Screen reader support

### Landmarks

- `<header>` — implicit, contains `<nav aria-label="Primary">`
- `<main id="main">` — wraps everything from hero to join
- `<footer>` — site footer

### Headings

- `<h1>` — hero only
- `<h2>` — every major section (some are `.sr-only` for editorial and services where the visible design intentionally has no on-screen H2)
- `<h3>` — card titles within sections
- `<h4>` — leader names
- `<h5>` — footer column labels

### `aria-hidden` on decoration

The following are decorative and announced to no one:
- The pulsing brand dot
- The scroll-cue bar
- All SVG arrows inside text buttons
- The down-arrow `↓` and right-arrow `→` in wire rows
- The oversized italic icon-marks on service cards
- The big SWP watermark in the footer
- The marquee strip
- The grain noise overlay
- The hero video and overlay

### State announcements

- Roster tabs use `aria-pressed="true|false"` and are wrapped in `<div role="group" aria-label="Filter roster by sport">`
- Service cards are `<article>` elements with proper internal headings, so screen readers announce them as articles

---

## Reduced motion

`prefers-reduced-motion: reduce` triggers:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: .001ms !important;
    transition-duration: .001ms !important;
  }
  .marquee-track { animation: none !important; }
  .services-track { transition: none !important; }
}
```

The hero parallax mouse handler also self-disables when `matchMedia('(prefers-reduced-motion: reduce)').matches`.

---

## Known gaps / developer to-dos

These are accessibility tasks left for the dev team:

| Item | Severity | Notes |
|---|---|---|
| Mobile nav menu | High | Nav links hide under 980px with no replacement. Add a hamburger + drawer. |
| Wire rows not keyboard-accessible | Medium | They look interactive (hover state, arrow) but aren't `<a>` or `<button>`. Either wrap in `<a>` or remove hover affordance. |
| Leader rows same issue | Medium | Same as above. |
| Athlete cards not focusable | Medium | Currently only the photo+info; consider wrapping each card in `<a>` linking to an athlete page. |
| Forms not built | Blocker | Brand intake and apply forms must follow standard form a11y: labelled fields, error association via `aria-describedby`, `aria-invalid` on errors, single error summary on submit. |
| Video has no captions | Medium | Hero video is decorative (muted, looping). If you swap in narrated content, add `<track kind="captions">`. |
| No focus management for SPA-like nav | Low | Anchor links jump fine; no JS routing in play. |

---

## Testing checklist

Before launch, verify:

- [ ] Tab through the entire page with keyboard only — no traps, all interactive elements reachable
- [ ] Run axe DevTools or Lighthouse a11y audit — score 95+
- [ ] Test with VoiceOver (Mac), NVDA (Windows), or TalkBack (Android)
- [ ] Toggle "Reduce Motion" in OS settings and verify animations stop
- [ ] Resize to 320px wide — nothing overlaps, all content reachable
- [ ] Zoom browser to 200% — layout holds, no horizontal scroll outside intended sections
- [ ] Test in Windows High Contrast Mode — focus indicators still visible
