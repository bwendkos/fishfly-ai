"""
Build an offline-capable version of the saltwater fly library.

Output: /home/vercel-sandbox/workspace/saltwater_fly_library_offline.zip

The zip contains:
- index.html         — the webpage with local image references
- images/            — all 157 fly images
- _manifest.csv      — pattern name -> filename mapping
- README.txt         — usage instructions
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
ZIP_PATH = WORKSPACE / "saltwater_fly_library_offline.zip"

README_TEXT = """\
The Saltwater Fly Library — Offline Edition
============================================

163 fly patterns across 18 destinations. 365 region cards. 157 fly photos.

WHAT'S IN THIS ZIP
------------------
  index.html       The library webpage. Open this in any browser.
  images/          157 fly photos referenced by index.html.
  _manifest.csv    Maps pattern name to image filename.
  README.txt       This file.

HOW TO USE
----------
1. Unzip this archive somewhere on your computer.
2. Open index.html in a web browser (drag-and-drop also works).
3. The page is fully interactive offline — search, filters,
   region nav, and all 157 images load locally.

FONT NOTE
---------
Typography (Playfair Display + Inter + JetBrains Mono) is bundled
locally in fonts/. The page renders identically with or without
an internet connection.

THE 6 PATTERNS WITHOUT IMAGES
-----------------------------
These cards show without an image because no public photo of the
specific named pattern was available:
  - Brush Popper
  - Cubera Deceiver
  - EP Snook Bunny (Cuban)
  - Gordon Baggett's Stiff Worm
  - Grocery Fly
  - Jardines Bonefish Fly
  - Snapper Charlie
  - Tabory's Sand Eel

FILE COUNTS
-----------
  Unique patterns:        163
  Region cards:           365
  Destinations:           18
  Image files:            157
"""


def main():
    # 1. Reset offline_build dir
    if OFFLINE_DIR.exists():
        shutil.rmtree(OFFLINE_DIR)
    OFFLINE_DIR.mkdir()
    (OFFLINE_DIR / "images").mkdir()

    # 2. Read manifest -> pattern name to filename
    filename_by_name = {}
    with open(IMAGES_DIR / "_manifest.csv") as f:
        reader = csv.DictReader(f)
        for row in reader:
            if row["filename"]:
                filename_by_name[row["pattern_name"]] = row["filename"]
    print(f"Read manifest: {len(filename_by_name)} pattern -> filename mappings")

    # 3. Load final_v2.json and rewrite image_url to local paths
    with open(RESEARCH_DIR / "final_v2.json") as f:
        data = json.load(f)
    rewritten = 0
    for p in data["patterns"]:
        fn = filename_by_name.get(p["name"])
        if fn:
            # Preserve the original image URL so retailer routing still works
            # (build_page.py prefers image_source_url for the Buy link logic).
            p["image_source_url"] = p.get("image_url")
            p["image_url"] = f"images/{fn}"
            rewritten += 1
        else:
            p["image_source_url"] = p.get("image_url")
            p["image_url"] = None  # Explicitly null for offline (no remote fallback)
    print(f"Rewrote {rewritten} image URLs to local paths (originals preserved in image_source_url)")

    # 4. Save the offline-data variant
    offline_json = RESEARCH_DIR / "final_v2_offline.json"
    with open(offline_json, "w") as f:
        json.dump(data, f, indent=2)

    # 5. Run build_page.py with overridden source + output
    env = os.environ.copy()
    env["SOURCE_FILE"] = str(offline_json)
    env["OUTPUT_FILE"] = str(OFFLINE_DIR / "index.html")
    print(f"Running build_page.py...")
    result = subprocess.run(
        ["python3", "build_page.py"],
        cwd=str(WORKSPACE),
        env=env,
        capture_output=True,
        text=True,
    )
    if result.returncode != 0:
        print("BUILD FAILED:")
        print(result.stdout)
        print(result.stderr)
        raise SystemExit(1)
    print(result.stdout.strip())

    # 6. Copy all images
    print(f"\nCopying {len(filename_by_name)} images to offline_build/images/...")
    for fn in filename_by_name.values():
        src = IMAGES_DIR / fn
        if src.exists():
            shutil.copy2(src, OFFLINE_DIR / "images" / fn)

    # 7. Copy manifest
    shutil.copy2(IMAGES_DIR / "_manifest.csv", OFFLINE_DIR / "_manifest.csv")

    # 8. Write README
    (OFFLINE_DIR / "README.txt").write_text(README_TEXT, encoding="utf-8")

    # 9. Build zip
    print(f"\nBuilding zip: {ZIP_PATH}")
    if ZIP_PATH.exists():
        ZIP_PATH.unlink()
    with zipfile.ZipFile(ZIP_PATH, "w", zipfile.ZIP_DEFLATED, compresslevel=6) as z:
        # Walk the offline_build dir and add everything
        for root, dirs, files in os.walk(OFFLINE_DIR):
            for fname in files:
                full = Path(root) / fname
                rel = full.relative_to(OFFLINE_DIR)
                z.write(full, arcname=str(rel))

    zip_size = ZIP_PATH.stat().st_size
    print(f"Zip size: {zip_size / 1024 / 1024:.2f} MB")

    # File counts
    img_count = len(list((OFFLINE_DIR / "images").iterdir()))
    print(f"\nContents:")
    print(f"  index.html: {(OFFLINE_DIR / 'index.html').stat().st_size:,} bytes")
    print(f"  images/: {img_count} files")
    print(f"  _manifest.csv + README.txt")


if __name__ == "__main__":
    main()
