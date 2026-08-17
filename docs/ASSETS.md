# Asset Inventory

Everything that needs to be sourced, licensed, or replaced before launch. Items are in priority order.

---

## Hero video

**Current:** Pixabay stock clip (`https://cdn.pixabay.com/video/2022/12/06/141666-777719660_large.mp4`)
**Status:** Placeholder only — not licensed for production.

**Needs:**
- Original or properly licensed footage
- 1920×1080 minimum, ideally 4K
- Duration: 15–25 seconds, designed to loop seamlessly
- Muted (silent) — no audio track needed
- Format: H.264 MP4, plus WebM fallback for smaller file size
- Color graded toward purple/dark tones to integrate with the overlay
- Suggested content: training intensity, locker room ambient, stadium lights, slow motion athletic moments. Avoid clear facial focus on real athletes unless rights cleared.

**Implementation:** swap in `index.html`:

```html
<video autoplay muted loop playsinline poster="assets/hero-poster.jpg">
  <source src="assets/hero.webm" type="video/webm">
  <source src="assets/hero.mp4" type="video/mp4">
</video>
```

Also add a poster frame so users on slow connections see something before the video buffers.

---

## Athlete photography

**Current:** Unsplash placeholders, six photos
**Status:** Placeholder only.

**Needs:**
- One portrait per athlete, 800×1000px minimum (4:5 aspect)
- Editorial / action / media-day style — high contrast, dramatic lighting works best with the dark palette
- Subjects looking confident, avoid stock-photo smiles
- Consistent treatment across the roster — same color grade, similar light direction

**Implementation:** each card uses background-image on a `.ph` div:

```html
<div class="ph" style="background-image: url('assets/athletes/marcus-lane.jpg')"></div>
```

For production, drive this from CMS data, not inline styles.

---

## Athlete data

**Current:** Six hardcoded athletes with invented names and stats.
**Status:** Placeholder.

**Needs:** real roster, ideally CMS-driven (Sanity, Contentful, or even a flat JSON file).

**Schema per athlete:**

```json
{
  "name": "Athlete Name",
  "sport": "football | tennis",
  "position": "Quarterback",
  "class": "Class of 2027",
  "program": "University Name",
  "photo": "/assets/athletes/slug.jpg",
  "stats": [
    { "label": "All-Conference", "value": "Five-Star" },
    { "label": "yds", "value": "3,847" }
  ],
  "agent": "Agent Name",
  "active": true
}
```

---

## Transfer / commitment data

**Current:** Five hardcoded wire rows.
**Status:** Placeholder.

**Needs:** CMS-driven feed sorted by date, descending. Schema:

```json
{
  "date": "2026-02-14",
  "athlete": "Marcus Lane",
  "sport": "Football",
  "position": "Quarterback",
  "from": "Phoenix Heritage HS",
  "to": "University of Texas",
  "type": "commit | portal | signing"
}
```

Map `type` to badge class: `commit` → `.badge.commit`, `portal` → `.badge`.

---

## Leadership / agents

**Current:** Four invented names.
**Status:** Placeholder.

**Needs:** real roster from the agency. Schema:

```json
{
  "name": "Luke Bramwell",
  "role": "Head of Sports · COO",
  "focus": "Football / Negotiation",
  "bio": "Optional longer bio for detail pages",
  "photo": "/assets/agents/luke.jpg"
}
```

The current design doesn't show agent photos but the brief mentions individual profile cards — extend the `.leader` component if needed.

---

## Brand mark / logo

**Current:** Wordmark in `--serif` italic. No logomark.
**Status:** Acceptable as-is, but a logomark would help favicon and social cards.

**Needs:**
- Favicon (32×32, 192×192, 512×512 PNG plus SVG)
- Apple touch icon (180×180)
- OG image (1200×630)
- Twitter card image (1200×675)

Add to `<head>`:

```html
<link rel="icon" type="image/svg+xml" href="assets/favicon.svg">
<link rel="apple-touch-icon" href="assets/apple-touch-icon.png">
<meta property="og:image" content="https://secondwindpro.com/assets/og-image.jpg">
<meta name="twitter:card" content="summary_large_image">
```

---

## Athlete card "Committed" / "Signed" graphics

The brief mentions: *"Each entry features a clean, custom 'Committed' or 'Signed' graphic using the new program's branding."*

**Current:** Plain text badges.
**Status:** Acceptable for v1; design system call to make for v2.

If you want to honor the brief literally, add a `logo` field to the transfer schema and render a small university wordmark next to the school name. Watch for licensing — university marks may need clearance.

---

## Fonts

**Current:** Loaded from Google Fonts CDN.
**Status:** Works in production but adds external requests.

**Self-hosting (recommended for performance):**
1. Download from Google Fonts
2. Place in `assets/fonts/`
3. Replace the Google Fonts link in `index.html` with `@font-face` declarations in `tokens.css`

Saves ~30KB on first paint and removes the third-party dependency.

---

## Contact information

**Current:** Dummy phone (`+1 (000) 000 — 0000`) and email (`hello@secondwindpro.com`) in the footer.

**Needs:** real numbers and addresses. The brief mentions Luke's or Lenny's phone.

---

## Social links

**Current:** All point to `#`.

**Needs:** real URLs for Instagram, X, LinkedIn.

---

## Legal pages

**Current:** "Privacy · Terms" in footer points nowhere.

**Needs:**
- `privacy.html` (or external link)
- `terms.html` (or external link)
- Cookie consent banner if tracking is added

---

## Analytics & tracking

Not configured. Add to `<head>` when ready:
- Google Analytics / Plausible / Fathom
- Meta Pixel if running paid social
- LinkedIn Insight Tag for B2B remarketing

Respect privacy: gate non-essential tracking behind a consent banner if launching to EU traffic.
