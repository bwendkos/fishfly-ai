# FishFly Brand Kit v1.0

The single source of truth for the FishFly visual identity. Every asset in this folder is referenced here.

**Locked in:** May 2026
**Status:** v1.0 — Living document

---

## At a glance

| Element | Spec |
|---|---|
| Parent brand | FishFly.ai |
| Tagline | Fly Fish. Fish Smart. |
| Wordmark | `fish·fly` — Cormorant Garamond Italic 700, lowercase, sand middot |
| Standard mark | Compass V2, medium weight strokes (6px / 3.2px / 4.5px) |
| Inverted mark | Same Compass, cream-colored details for dark backgrounds |
| Small-app mark | Compass with filled blue disc + cream reversed-out details |
| Primary lockup | Compass + wordmark + tagline (horizontal) |
| Type system | Cormorant (wordmark) · Playfair (display) · Inter (body) · JetBrains Mono (mono) |

---

## 01. Logo system

Seven approved lockup variations cover every use case from billboard to favicon.

### Primary lockup (with tagline)

The default everywhere. Compass V2 + "fish·fly" wordmark + "Fly Fish. Fish Smart." tagline, horizontal.

- Light backgrounds: `lockups/lockup-primary.svg`
- Dark backgrounds: `lockups/lockup-primary-inverted.svg`

**Use cases:** Site nav, hero sections, business cards, presentations, email signatures, social profile headers.

### Compact lockup (no tagline)

When space is tight or the tagline is shown elsewhere.

- Light: `lockups/lockup-compact.svg`
- Dark: `lockups/lockup-compact-inverted.svg`

**Use cases:** Mobile nav, app icons paired with text, condensed signatures.

### Vertical lockup (stacked)

For square aspect ratios where horizontal doesn't fit.

- Light: `lockups/lockup-vertical.svg`
- Dark: `lockups/lockup-vertical-inverted.svg`

**Use cases:** Social posts, ad placements, certificates, packaging facets.

### Mark only — three variations

The compass alone, no wordmark.

- **Standard** (≥ 40px, light bg): `marks/compass-standard.svg`
- **Inverted** (≥ 40px, dark bg): `marks/compass-inverted.svg`
- **Filled disc** (any size, especially < 40px): `marks/compass-filled-disc.svg`

**Use cases:** App icons, watermarks, favicons, social profile avatars, oversized print.

### Wordmark only

- Light: `wordmarks/wordmark.svg`
- Dark: `wordmarks/wordmark-inverted.svg`

**Use cases:** Body copy brand references, in-text mentions, narrow strips where the compass won't fit.

---

## 02. Color palette

### Backgrounds

| Name | Hex | Use |
|---|---|---|
| Cream | `#f7f3ec` | Primary background. The canvas everything sits on. |
| Oyster | `#efe9df` | Alt background for cards on cream, subtle layering. |
| White | `#ffffff` | Card backgrounds, maximum-contrast panels. |

### Accents

| Name | Hex | Use |
|---|---|---|
| Ocean Blue | `#1e3a5f` | Primary accent. Wordmark, headlines, primary CTAs, dark backgrounds. |
| Sand | `#c89668` | Secondary accent. Dot separator, taglines, "live" status, compass outer ring. |
| Rust | `#8b3a3a` | Emphasis only. "Coming soon" badges, alerts, "iconic to region" highlights. |

### Text

| Name | Hex | Use |
|---|---|---|
| Ink | `#1a1f2e` | Body text. Maximum legibility on cream without being harsh black. |
| Slate | `#4a5568` | Soft text. Captions, descriptions, supporting copy. |
| Driftwood | `#8b8478` | Muted text. Eyebrows, labels, secondary metadata. |

### Rules

| Name | Hex | Use |
|---|---|---|
| Rule | `#d8d2c4` | Standard borders, dividers. |
| Rule Soft | `#e8e4dc` | Soft borders, subtle separators. |

### CSS variables (drop into any stylesheet)

```css
:root {
  /* Backgrounds */
  --bg: #f7f3ec;
  --bg-alt: #efe9df;
  --card-bg: #ffffff;

  /* Text */
  --text: #1a1f2e;
  --text-soft: #4a5568;
  --text-muted: #8b8478;

  /* Accents */
  --accent: #1e3a5f;
  --sand: #c89668;
  --rust: #8b3a3a;

  /* Rules */
  --rule: #d8d2c4;
  --rule-soft: #e8e4dc;
}
```

---

## 03. Typography

Four typefaces, each with a distinct job. Never use a typeface for what another one does better.

### Cormorant Garamond — Wordmark only

- **Use:** ONLY for the wordmark. Cormorant is the brand's signature.
- **Weight:** 700 Italic
- **Don't:** Use Cormorant for body, headlines, or anywhere else.

### Playfair Display — Display headlines

- **Use:** Editorial headlines, page titles, hero text, section headers throughout fishfly.ai and the Library.
- **Weights:** 400, 500, 600 (regular + italic)
- **Voice:** The editorial register of FishFly's long-form content.

### Inter — Body, UI, tagline

- **Use:** Body copy, paragraphs, navigation links, buttons, UI controls, taglines (in caps).
- **Weights:** 300, 400, 500, 600, 700
- **Tagline spec:** Inter 500, uppercase, 0.28em letter-spacing, sand color.

### JetBrains Mono — Labels, accents

- **Use:** Eyebrows, labels, technical accents, status badges, monospaced data.
- **Weights:** 400, 500
- **Pattern:** uppercase, 0.18-0.20em letter-spacing, sand or muted color.

### Google Fonts import

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
```

---

## 04. Product hierarchy

```
FishFly.ai
└── Fly Fish. Fish Smart.
    │
    ├── Saltwater Fly Library         [LIVE]
    │   A comprehensive catalog of saltwater fly patterns,
    │   organized by the destinations that fish them.
    │   204 patterns. 42 destinations. Live at fishfly.ai/library/
    │
    └── Fly Trip Scout                [COMING SOON]
        AI-powered destination reports for smarter fly fishing trips.
        Tell us where and when — get a complete brief on species,
        weather, fly selection, gear, regulations, and access.
```

---

## 05. Usage guidelines

### Do

- ✓ Use the primary lockup (with tagline) wherever space allows
- ✓ Use the compact lockup (no tagline) when space is tight
- ✓ Use the inverted compass on dark backgrounds — NOT the standard one
- ✓ Use the filled-disc compass for any application below 40px
- ✓ Keep the dot separator sand-colored — it's the visual anchor
- ✓ Set the tagline in Inter caps with 0.28em letter-spacing
- ✓ Pair Cormorant italic with Inter for body — never swap them
- ✓ Use the cream background as the default canvas

### Don't

- ✕ Don't change wordmark capitalization — always lowercase
- ✕ Don't remove the sand middot in "fish·fly" — it's the signature
- ✕ Don't use Cormorant for body copy — that's Inter's job
- ✕ Don't recolor the compass outer ring — it's always sand
- ✕ Don't use the standard compass on dark backgrounds (use inverted)
- ✕ Don't use the medium-weight compass below 40px (use filled disc)
- ✕ Don't stretch, rotate, or skew any lockup component
- ✕ Don't substitute Cormorant with Playfair italic — they're different

---

## 06. Folder structure

```
brand/
├── marks/
│   ├── compass-standard.svg          (light bg, ≥ 40px)
│   ├── compass-inverted.svg          (dark bg, ≥ 40px)
│   └── compass-filled-disc.svg       (any bg, especially < 40px)
│
├── wordmarks/
│   ├── wordmark.svg                  (light bg, accent blue)
│   └── wordmark-inverted.svg         (dark bg, cream)
│
├── lockups/
│   ├── lockup-primary.svg            (horizontal with tagline, light)
│   ├── lockup-primary-inverted.svg   (horizontal with tagline, dark)
│   ├── lockup-compact.svg            (horizontal no tagline, light)
│   ├── lockup-compact-inverted.svg   (horizontal no tagline, dark)
│   ├── lockup-vertical.svg           (stacked centered, light)
│   └── lockup-vertical-inverted.svg  (stacked centered, dark)
│
├── favicons/                         (generate from compass-filled-disc.svg)
│   └── README.md
│
├── social/                           (generate per launch)
│   └── README.md
│
├── BRAND_KIT.md                      (this document)
└── README.md                         (quick reference)
```

---

## 07. Generating favicons

The favicon source is `marks/compass-filled-disc.svg`. To generate the actual favicon files (PNG, ICO):

### Option A: Use realfavicongenerator.net (recommended)

1. Go to https://realfavicongenerator.net/
2. Upload `brand/marks/compass-filled-disc.svg`
3. Configure platforms (iOS, Android, Windows)
4. Download the favicon package
5. Extract files into `brand/favicons/`
6. Update HTML `<head>` with the generated link tags

### Option B: Local generation with sharp + png-to-ico

```bash
npm install --save-dev sharp png-to-ico
node brand/favicons/_generate.js
```

(Script to be added in next phase.)

---

## 08. Generating social cards

Social cards (1200x630 OG images) should be generated per launch / per major content piece. Place in `brand/social/`:

- `og-default.png` — Generic share card with logo + tagline
- `og-library.png` — Library-specific
- `og-fly-trip-scout.png` — Trip Scout-specific

These can be designed in HTML/CSS and screenshot via Puppeteer, or designed in Figma and exported. To be addressed in a future phase.

---

## Changelog

- **v1.0 (May 2026):** Initial brand kit. Wordmark, three compass variations (standard, inverted, filled disc), tagline, all six lockup variations, complete palette, type system, product hierarchy locked in.
