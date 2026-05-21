# FishFly Brand Assets

Quick reference. See `BRAND_KIT.md` for full guidelines.

## What's in here

| Folder | What |
|---|---|
| `marks/` | Compass V2 in three variations (standard, inverted, filled disc) |
| `wordmarks/` | Type-only "fish·fly" treatments (light + dark) |
| `lockups/` | Full lockups: mark + wordmark + optional tagline, light + dark |
| `favicons/` | Generated favicon files (run favicon generator on `marks/compass-filled-disc.svg`) |
| `social/` | OG share cards (generate per launch) |

## When to use which compass

- **`compass-standard.svg`** — Light backgrounds, any size ≥ 40px
- **`compass-inverted.svg`** — Dark backgrounds (Ocean Blue, photography), any size ≥ 40px
- **`compass-filled-disc.svg`** — ANY size below 40px (favicons, mobile nav, social avatars)

## Quick HTML embed examples

```html
<!-- Light background -->
<img src="/brand/marks/compass-standard.svg" alt="FishFly" width="80" height="80">

<!-- Dark background -->
<img src="/brand/marks/compass-inverted.svg" alt="FishFly" width="80" height="80">

<!-- Favicon (in <head>) -->
<link rel="icon" type="image/svg+xml" href="/brand/marks/compass-filled-disc.svg">
```

## Edits

Brand assets should not be edited casually. Edits require a brand kit version bump and update to `BRAND_KIT.md`.
