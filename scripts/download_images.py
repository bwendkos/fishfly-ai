"""
Download all 157 fly pattern images from final_v2.json and bundle into a zip.

Output:
- /home/vercel-sandbox/workspace/images/{slug}.{ext} - one file per pattern
- /home/vercel-sandbox/workspace/images/_manifest.csv - filename -> pattern mapping
- /home/vercel-sandbox/workspace/saltwater_fly_images.zip - bundled deliverable
"""
import csv
import json
import os
import re
import urllib.request
import urllib.error
import zipfile
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path

WORKSPACE = Path("/home/vercel-sandbox/workspace")
RESEARCH_DIR = WORKSPACE / "research"
IMAGES_DIR = WORKSPACE / "images"
ZIP_PATH = WORKSPACE / "saltwater_fly_images.zip"

USER_AGENT = (
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
    "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36"
)
TIMEOUT_SEC = 15
MAX_WORKERS = 10


def slugify(name: str) -> str:
    """Convert pattern name to a safe filename (no extension)."""
    s = name.lower()
    s = re.sub(r"['\"`]", "", s)
    s = re.sub(r"[^\w]+", "-", s)
    s = re.sub(r"-+", "-", s).strip("-")
    return s[:80]  # cap length


def extension_from(url: str, content_type: str) -> str:
    """Determine file extension from URL or response content-type."""
    # Strip query string for URL-based detection
    clean_url = url.split("?")[0].split("#")[0].lower()
    for ext in (".jpg", ".jpeg", ".png", ".gif", ".webp"):
        if clean_url.endswith(ext):
            return ".jpg" if ext == ".jpeg" else ext
    if content_type:
        ct = content_type.lower()
        if "jpeg" in ct or "jpg" in ct:
            return ".jpg"
        if "png" in ct:
            return ".png"
        if "webp" in ct:
            return ".webp"
        if "gif" in ct:
            return ".gif"
    return ".jpg"  # safe default


def download_one(pattern: dict) -> dict:
    """Download a single image. Returns result dict."""
    name = pattern["name"]
    url = pattern.get("image_url")
    if not url:
        return {"name": name, "status": "no_url", "filename": None, "error": None}

    slug = slugify(name)
    req = urllib.request.Request(url, headers={"User-Agent": USER_AGENT})
    try:
        with urllib.request.urlopen(req, timeout=TIMEOUT_SEC) as resp:
            content_type = resp.headers.get("Content-Type", "")
            ext = extension_from(url, content_type)
            filename = f"{slug}{ext}"
            out_path = IMAGES_DIR / filename
            data = resp.read()
            if len(data) < 100:
                return {
                    "name": name,
                    "status": "too_small",
                    "filename": None,
                    "error": f"Response was {len(data)} bytes",
                }
            out_path.write_bytes(data)
            return {
                "name": name,
                "status": "ok",
                "filename": filename,
                "url": url,
                "bytes": len(data),
            }
    except urllib.error.HTTPError as e:
        return {"name": name, "status": "http_error", "filename": None, "error": f"{e.code} {e.reason}"}
    except urllib.error.URLError as e:
        return {"name": name, "status": "url_error", "filename": None, "error": str(e.reason)}
    except Exception as e:
        return {"name": name, "status": "error", "filename": None, "error": str(e)[:200]}


def main():
    IMAGES_DIR.mkdir(exist_ok=True)
    with open(RESEARCH_DIR / "final_v2.json") as f:
        data = json.load(f)
    patterns = data["patterns"]
    print(f"Total patterns: {len(patterns)}")
    has_url = [p for p in patterns if p.get("image_url")]
    no_url = [p for p in patterns if not p.get("image_url")]
    print(f"With image URLs: {len(has_url)}")
    print(f"Without image URLs: {len(no_url)}")

    print(f"\nDownloading {len(has_url)} images with {MAX_WORKERS} parallel workers...")
    results = []
    with ThreadPoolExecutor(max_workers=MAX_WORKERS) as executor:
        futures = {executor.submit(download_one, p): p for p in has_url}
        for i, future in enumerate(as_completed(futures), 1):
            r = future.result()
            results.append(r)
            if i % 20 == 0 or i == len(has_url):
                print(f"  {i}/{len(has_url)} done")

    # Stats
    ok = [r for r in results if r["status"] == "ok"]
    fails = [r for r in results if r["status"] != "ok"]
    print(f"\n=== DOWNLOAD RESULTS ===")
    print(f"Successful: {len(ok)}")
    print(f"Failed:     {len(fails)}")

    if fails:
        print(f"\nFailures:")
        for r in fails:
            print(f"  - {r['name']}: {r['status']} ({r.get('error', '')})")

    # Add no-URL entries to the failure list for transparency
    for p in no_url:
        fails.append({"name": p["name"], "status": "no_url", "filename": None, "error": "No image URL was sourced"})

    # Write manifest
    manifest_path = IMAGES_DIR / "_manifest.csv"
    with open(manifest_path, "w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(
            f,
            fieldnames=["pattern_name", "filename", "originator", "pattern_type", "image_source_url", "image_source", "status"],
            quoting=csv.QUOTE_ALL,
        )
        writer.writeheader()
        # Build a lookup so we can include originator + pattern_type
        info_by_name = {p["name"]: p for p in patterns}
        for r in sorted(results + [{"name": p["name"], "status": "no_url", "filename": None} for p in no_url], key=lambda x: x["name"].lower()):
            p = info_by_name.get(r["name"], {})
            writer.writerow({
                "pattern_name": r["name"],
                "filename": r.get("filename") or "",
                "originator": p.get("originator") or "",
                "pattern_type": p.get("pattern_type") or "",
                "image_source_url": p.get("image_url") or "",
                "image_source": p.get("image_source") or "",
                "status": r["status"],
            })
    print(f"\nManifest written: {manifest_path}")

    # Build zip
    print(f"\nBuilding zip: {ZIP_PATH}")
    with zipfile.ZipFile(ZIP_PATH, "w", zipfile.ZIP_DEFLATED, compresslevel=6) as z:
        # Add manifest first
        z.write(manifest_path, arcname="_manifest.csv")
        # Add all image files
        for img in sorted(IMAGES_DIR.iterdir()):
            if img.name == "_manifest.csv":
                continue
            z.write(img, arcname=img.name)
    zip_size = ZIP_PATH.stat().st_size
    print(f"Zip size: {zip_size / 1024 / 1024:.2f} MB")

    # Total bytes downloaded
    total_bytes = sum(r.get("bytes", 0) for r in ok)
    print(f"Total image bytes: {total_bytes / 1024 / 1024:.2f} MB")


if __name__ == "__main__":
    main()
