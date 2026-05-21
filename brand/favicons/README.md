# Favicons

Generated from `../marks/compass-filled-disc.svg`.

## Generate via realfavicongenerator.net (recommended)

1. Go to https://realfavicongenerator.net/
2. Upload `../marks/compass-filled-disc.svg`
3. Configure for iOS / Android / Windows
4. Download the package, extract here
5. Update the site's HTML `<head>` with the generated link tags

## Generate via Node (local)

```bash
# From repo root
npm install --save-dev sharp png-to-ico
# Script to be added in next phase
```

Files this folder should eventually contain:

- `favicon.ico` (32×32, ICO format for legacy browsers)
- `favicon-16x16.png`
- `favicon-32x32.png`
- `apple-touch-icon.png` (180×180)
- `android-chrome-192x192.png`
- `android-chrome-512x512.png`
- `site.webmanifest`
