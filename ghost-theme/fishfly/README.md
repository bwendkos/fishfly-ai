# FishFly Ghost theme

Custom Ghost theme matching the fishfly.ai brand.

## Structure

```
ghost-theme/fishfly/
├── package.json           Ghost theme metadata
├── default.hbs            Master layout (header + footer + ghost_head/foot)
├── index.hbs              Post listing / homepage (Field Notes)
├── post.hbs               Single article view (reading-tuned typography)
├── page.hbs               Static pages
├── tag.hbs                Tag archive
├── author.hbs             Author archive
├── error.hbs              404 page
├── partials/
│   ├── header.hbs         Sticky nav with inline compass SVG + wordmark
│   ├── footer.hbs         Minimal copyright + dotted nav links
│   ├── post-card.hbs      Listing card
│   └── pagination.hbs     Older/newer
└── assets/
    └── built/
        └── theme.css      All styles (chrome verbatim from fishfly.ai + reading-tuned body)
```

## Design

**Hybrid approach:**
- Chrome (header/footer/nav/palette/type stack) ported byte-for-byte from fishfly.ai
- Article body diverges: editorial reading-tuned — Playfair Display headings,
  19px / 1.75 line-height Inter body, ~68ch max width, Cormorant Garamond italic blockquotes

**Palette tokens** (in :root):
- Background: cream #f7f3ec
- Accent: ocean blue #1e3a5f
- Sand (rules, accents): #c89668
- Rust (errors, eyebrow accents): #8b3a3a
- Body text: #1a1f2e

**Fonts** (via Google Fonts):
- Cormorant Garamond Italic 700 — wordmark only
- Playfair Display — all display / heading
- Inter — body / UI
- JetBrains Mono — eyebrows, meta, accents

## Deploy

1. Zip the contents of `ghost-theme/fishfly/` (NOT the parent dir) as `fishfly.zip`
   ```bash
   cd ghost-theme/fishfly && zip -r ../../fishfly.zip . && cd ../..
   ```

2. Upload via Ghost admin: Settings → Design & branding → Change theme → Upload
   OR via API: `POST /ghost/api/admin/themes/upload/` (multipart `file` field)
   then `PUT /ghost/api/admin/themes/fishfly/activate/`

The current live deploy on blog.fishfly.ai was done via API from this thread.

## Validate

```bash
npm install -g gscan
gscan ghost-theme/fishfly
```

Current build passes with **0 errors, 0 warnings** (Ghost 5.x).

## Version

1.0.0 — initial release matching fishfly.ai brand v1.0
