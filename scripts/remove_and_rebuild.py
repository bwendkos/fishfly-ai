"""
Remove the 4 suspect patterns from the library and rebuild all deliverables.

Removed patterns:
- Cubera Deceiver
- EP Snook Bunny (Cuban)
- Jardines Bonefish Fly
- Snapper Charlie

Final library: 159 patterns. The 2 remaining patterns without images
(Gordon Baggett's Stiff Worm, Tabory's Sand Eel) are kept and display
without an image.
"""
import csv
import json
import os
import shutil
import subprocess
import zipfile
from pathlib import Path

WORKSPACE = Path("/home/vercel-sandbox/workspace")
RESEARCH_DIR = WORKSPACE / "research"
IMAGES_DIR = WORKSPACE / "images"
OFFLINE_DIR = WORKSPACE / "offline_build"

REMOVE = {
    "Cubera Deceiver",
    "EP Snook Bunny (Cuban)",
    "Jardines Bonefish Fly",
    "Snapper Charlie",
}


def step(label):
    print(f"\n--- {label} ---")


def main():
    step("Step 1: Remove patterns from final_v2.json")
    with open(RESEARCH_DIR / "final_v2.json") as f:
        data = json.load(f)
    before = len(data["patterns"])
    cards_before = sum(len(p["regional_usage"]) for p in data["patterns"])

    data["patterns"] = [p for p in data["patterns"] if p["name"] not in REMOVE]
    after = len(data["patterns"])
    cards_after = sum(len(p["regional_usage"]) for p in data["patterns"])

    print(f"  Patterns: {before} -> {after} (removed {before - after})")
    print(f"  Cards:    {cards_before} -> {cards_after} (removed {cards_before - cards_after})")

    # Update meta
    data["meta"] = {
        "unique_patterns": after,
        "total_cards": cards_after,
        "regions": len(data["regions"]),
        "patterns_with_images": sum(1 for p in data["patterns"] if p.get("image_url")),
        "patterns_with_descriptions": sum(1 for p in data["patterns"] if p.get("description")),
    }
    with open(RESEARCH_DIR / "final_v2.json", "w") as f:
        json.dump(data, f, indent=2)
    print(f"  meta: {data['meta']}")

    step("Step 2: Update images/_manifest.csv to remove the 4 entries")
    manifest_path = IMAGES_DIR / "_manifest.csv"
    with open(manifest_path) as f:
        rows = list(csv.DictReader(f))
    fieldnames = list(rows[0].keys()) if rows else []
    kept = [r for r in rows if r["pattern_name"] not in REMOVE]
    print(f"  manifest: {len(rows)} -> {len(kept)} rows")
    with open(manifest_path, "w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames, quoting=csv.QUOTE_ALL)
        writer.writeheader()
        for r in kept:
            writer.writerow(r)

    step("Step 3: Rebuild online webpage (build_page.py)")
    r = subprocess.run(["python3", "build_page.py"], cwd=str(WORKSPACE), capture_output=True, text=True)
    print(r.stdout.strip())
    if r.returncode != 0:
        print("STDERR:", r.stderr)
        raise SystemExit("build_page.py failed")

    step("Step 4: Rebuild standalone images zip")
    zip_path = WORKSPACE / "saltwater_fly_images.zip"
    if zip_path.exists():
        zip_path.unlink()
    with zipfile.ZipFile(zip_path, "w", zipfile.ZIP_DEFLATED, compresslevel=6) as z:
        z.write(manifest_path, arcname="_manifest.csv")
        for img in sorted(IMAGES_DIR.iterdir()):
            if img.name == "_manifest.csv":
                continue
            z.write(img, arcname=img.name)
    print(f"  Zip rebuilt: {zip_path.stat().st_size / 1024 / 1024:.2f} MB")

    step("Step 5: Rebuild offline edition (build_offline.py)")
    r = subprocess.run(["python3", "build_offline.py"], cwd=str(WORKSPACE), capture_output=True, text=True)
    print(r.stdout.strip())
    if r.returncode != 0:
        print("STDERR:", r.stderr)
        raise SystemExit("build_offline.py failed")

    step("Step 6: Re-bundle fonts into offline build")
    r = subprocess.run(["python3", "bundle_fonts.py"], cwd=str(WORKSPACE), capture_output=True, text=True)
    print(r.stdout.strip())
    if r.returncode != 0:
        print("STDERR:", r.stderr)
        raise SystemExit("bundle_fonts.py failed")

    step("Step 7: Update README and re-zip offline edition")
    readme = """\
The Saltwater Fly Library — Offline Edition
============================================

159 fly patterns across 18 destinations. 357 region cards. 157 fly photos.

WHAT'S IN THIS ZIP
------------------
  index.html       The library webpage. Open this in any browser.
  images/          157 fly photos referenced by index.html.
  fonts/           21 woff2 font files (Playfair Display, Inter, JetBrains Mono).
  fonts.css        CSS that references the local fonts.
  _manifest.csv    Maps pattern name to image filename.
  README.txt       This file.

HOW TO USE
----------
1. Unzip this archive somewhere on your computer.
2. Open index.html in a web browser (drag-and-drop also works).
3. The page is fully interactive offline — search, filters,
   region nav, all 157 images, and full typography load locally.

THE 2 PATTERNS WITHOUT IMAGES
-----------------------------
These cards show without an image because no public photo of the
specific named pattern was available:
  - Gordon Baggett's Stiff Worm  (Salt Water Sportsman, Jan. 2009)
  - Tabory's Sand Eel           (Lou Tabory's Inshore Fly Fishing)

Both are real, verified patterns documented in the angling literature
but never commercially photographed for online catalogs.

FILE COUNTS
-----------
  Unique patterns:        159
  Region cards:           357 (varies after dedup; see _manifest.csv)
  Destinations:           18
  Image files:            157
  Font files:             21
"""
    (OFFLINE_DIR / "README.txt").write_text(readme, encoding="utf-8")

    offline_zip = WORKSPACE / "saltwater_fly_library_offline.zip"
    if offline_zip.exists():
        offline_zip.unlink()
    with zipfile.ZipFile(offline_zip, "w", zipfile.ZIP_DEFLATED, compresslevel=6) as z:
        for root, dirs, files in os.walk(OFFLINE_DIR):
            for fname in sorted(files):
                full = Path(root) / fname
                rel = full.relative_to(OFFLINE_DIR)
                z.write(full, arcname=str(rel))
    print(f"  Offline zip rebuilt: {offline_zip.stat().st_size / 1024 / 1024:.2f} MB")

    step("Step 8: Regenerate CSV export")
    r = subprocess.run(["python3", "export_csv.py"], cwd=str(WORKSPACE), capture_output=True, text=True)
    print(r.stdout.strip())
    if r.returncode != 0:
        print("STDERR:", r.stderr)
        raise SystemExit("export_csv.py failed")

    step("Done")
    print(f"  Final library: {after} unique patterns, {cards_after} cards, 18 regions")


if __name__ == "__main__":
    main()
