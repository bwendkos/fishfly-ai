# fishfly-ai

A saltwater fly fishing resource — currently The Saltwater Fly Library, with FishFly.ai (the AI-powered personalized destination guide generator) coming in Phase 2.

**Live:** [fishfly.ai](https://fishfly.ai) (Netlify-hosted)
**Repo:** [bwendkos/fishfly-ai](https://github.com/bwendkos/fishfly-ai)

---

## What's in this repo

```
fishfly-ai/
├── index.html              ← The current Fly Library (Phase 1A entry point)
├── images/                 ← 169 fly photos + manifest CSV
├── logo.svg                ← Compass V2 brand mark
├── netlify.toml            ← Netlify config (static site, /library redirect)
├── .gitignore
├── README.md               ← You are here
│
├── data/                   ← Source data for rebuilds
│   ├── final_v2.json       ← Master dataset: 204 patterns, 42 destinations
│   ├── image_overrides.json
│   ├── existing_pattern_names.txt
│   └── expansion_*.json    ← Raw research history
│
└── scripts/                ← Python build pipeline
    ├── build_page.py       ← Generates the HTML page
    ├── build_offline.py    ← Generates the offline edition
    ├── bundle_fonts.py     ← Bundles Google Fonts for offline
    ├── download_images.py  ← Fetches images from URLs in final_v2.json
    ├── export_csv.py       ← Exports the CSV
    ├── consolidate_v3.py   ← Merges expansion research
    ├── finalize_v3.py      ← Merges enrichment results
    ├── slice_for_image_agents.py
    ├── update_descriptions.py
    └── remove_and_rebuild.py
```

---

## Current state

- **204 unique fly patterns**
- **42 destinations** worldwide
- **683 region cards**
- **Species focus:** bonefish, tarpon, permit, GTs, redfish, snook
- **169 patterns with verified photos**, 35 with the Compass silhouette placeholder
- **24 verified retailer URLs** for Buy buttons (Orvis is the fallback)
- **No affiliate IDs configured yet** — placeholders in `scripts/build_page.py` → `AFFILIATE_IDS` dict

---

## Phase plan

### Phase 1A — Foundation (current)
- [x] Static Fly Library at root
- [x] GitHub repo
- [x] Netlify auto-deploy from `main`
- [x] Custom domain `fishfly.ai`

### Phase 1B — Marketing + Library at /library
- [ ] Landing page at `/` in Fly Library design language
- [ ] Move Fly Library to `/library`
- [ ] Ghost newsletter signup
- [ ] About / contact pages

### Phase 2 — FishFly intake flow
- [ ] 5-step intake widget
- [ ] Netlify Function: Claude API prompt chain (7 prompts per FishFly brief)
- [ ] Supabase auth + guide storage with versioning
- [ ] Weather/tide/moon API injection (Stormglass, NOAA, WorldTides)
- [ ] Stripe freemium gating
- [ ] PDF generation + email delivery

### Phase 3+
- Gear locker, photo uploads, community features, lodge booking, expand to 50+ destinations

---

## Local development

### Just view the static Library
Open `index.html` in any browser. No build needed.

### Rebuild the Library after data changes

```bash
# 1. Edit data/final_v2.json (or run consolidate_v3.py with new research files)
# 2. Re-download images if you added new image_url entries:
python3 scripts/download_images.py

# 3. Build the page (writes index.html):
python3 scripts/build_page.py

# 4. Commit + push — Netlify auto-deploys
git add .
git commit -m "Update Fly Library"
git push
```

### Run a local Netlify dev server (when Functions are added in Phase 2)

```bash
netlify dev
```

---

## Environment variables

Set these in **Netlify → Site settings → Environment variables**, NOT in this repo:

| Variable | When needed | Where to get it |
|---|---|---|
| `ANTHROPIC_API_KEY` | Phase 2 (FishFly Claude calls) | console.anthropic.com |
| `STORMGLASS_API_KEY` | Phase 2 (weather data) | stormglass.io |
| `WORLDTIDES_API_KEY` | Phase 2 (tide tables) | worldtides.info |
| `SUPABASE_URL` | Phase 2 (user accounts) | supabase.com project settings |
| `SUPABASE_ANON_KEY` | Phase 2 (frontend Supabase calls) | supabase.com project settings |
| `SUPABASE_SERVICE_ROLE_KEY` | Phase 2 (server-side Supabase) | supabase.com project settings — DO NOT expose to client |
| `STRIPE_SECRET_KEY` | Phase 2 (payments) | dashboard.stripe.com |
| `STRIPE_PUBLISHABLE_KEY` | Phase 2 (frontend Stripe) | dashboard.stripe.com |
| `GHOST_ADMIN_API_KEY` | Phase 1B (newsletter) | ghost admin → integrations |
| `GHOST_API_URL` | Phase 1B (newsletter) | your Ghost site URL |
| `SENDGRID_API_KEY` | Phase 2 (PDF email delivery) | sendgrid.com |

---

## Design principles (don't violate)

1. **No fabrication** — every pattern, originator, target species verifiable from authoritative sources
2. **Every fly has a verified image OR the Compass silhouette** — never substitute another fly's photo
3. **Multi-region duplication is expected** — universals appear everywhere they're commonly used
4. **50-word descriptions** with originator credit woven in
5. **Smart Buy-link routing** — retailer registry in `scripts/build_page.py` → `RETAILERS` dict

Full brand spec, voice, and workflow guidance: see the project's hyperagent.com thread or the linked Curator agent.

**First deploy:** 2026-05-18
