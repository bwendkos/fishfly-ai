"""
Download Google Fonts (Playfair Display, Inter, JetBrains Mono) for offline use,
rewrite the CSS to use local file paths, and patch the offline HTML to use it.

Run after build_offline.py has produced offline_build/index.html.

Output:
- offline_build/fonts/*.woff2 — downloaded font files
- offline_build/fonts.css     — CSS with local paths
- offline_build/index.html    — patched to link fonts.css instead of Google
"""
import os
import re
import urllib.request
import urllib.parse
from pathlib import Path
from concurrent.futures import ThreadPoolExecutor

OFFLINE_DIR = Path("/home/vercel-sandbox/workspace/offline_build")
FONTS_DIR = OFFLINE_DIR / "fonts"
HTML_PATH = OFFLINE_DIR / "index.html"
CSS_PATH = OFFLINE_DIR / "fonts.css"

GOOGLE_FONTS_URL = (
    "https://fonts.googleapis.com/css2"
    "?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400"
    "&family=Inter:wght@300;400;500;600;700"
    "&family=JetBrains+Mono:wght@400;500"
    "&display=swap"
)

# Chrome UA so Google returns woff2 (older UAs get TTF/EOT)
UA = (
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
    "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36"
)

# Match the <link> tag in build_page.py output. Pattern is forgiving about
# the preconnect lines so we leave those in place (harmless when offline).
GOOGLE_LINK_PATTERN = re.compile(
    r'<link\s+href="https://fonts\.googleapis\.com/[^"]*"\s+rel="stylesheet"\s*/?>'
)


def fetch(url: str, binary: bool = False):
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    with urllib.request.urlopen(req, timeout=30) as resp:
        data = resp.read()
    return data if binary else data.decode("utf-8")


def url_to_filename(url: str) -> str:
    """Derive a stable, readable filename from a fonts.gstatic.com URL.

    Example URL:
      https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMa1ZL7.woff2
    -> inter-v18-UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMa1ZL7.woff2
    """
    path = urllib.parse.urlparse(url).path
    parts = [p for p in path.split("/") if p]
    if len(parts) >= 4 and parts[0] == "s":
        family = parts[1]
        version = parts[2]
        basename = parts[-1]
        return f"{family}-{version}-{basename}"
    return parts[-1]


def main():
    print(f"Fetching Google Fonts CSS...")
    css = fetch(GOOGLE_FONTS_URL)

    # Extract all font URLs (woff2 file references inside url(...))
    font_urls = sorted(set(re.findall(r"https://fonts\.gstatic\.com[^)]+", css)))
    print(f"Discovered {len(font_urls)} font files in CSS")

    # Map URL -> local filename
    url_to_name = {u: url_to_filename(u) for u in font_urls}

    # Download fonts in parallel
    FONTS_DIR.mkdir(exist_ok=True)
    print(f"Downloading {len(font_urls)} woff2 files...")

    def download_one(url):
        try:
            data = fetch(url, binary=True)
            out = FONTS_DIR / url_to_name[url]
            out.write_bytes(data)
            return (url, len(data), None)
        except Exception as e:
            return (url, 0, str(e))

    results = []
    with ThreadPoolExecutor(max_workers=8) as ex:
        for r in ex.map(download_one, font_urls):
            results.append(r)

    failures = [r for r in results if r[2] is not None]
    total_bytes = sum(r[1] for r in results if r[2] is None)
    print(f"  Downloaded: {len(results) - len(failures)} / {len(results)}")
    print(f"  Total size: {total_bytes / 1024:.1f} KB")
    if failures:
        for r in failures:
            print(f"  FAIL {r[0]}: {r[2]}")
        raise SystemExit("Aborting: some fonts failed to download")

    # Rewrite CSS: replace each gstatic URL with relative local path
    new_css = css
    for url, fn in url_to_name.items():
        new_css = new_css.replace(url, f"fonts/{fn}")

    # Add a header comment so the file is self-documenting
    header = (
        "/* Bundled Google Fonts for offline use.\n"
        " * Sourced from " + GOOGLE_FONTS_URL + "\n"
        " * Font files in fonts/ subfolder.\n"
        " */\n"
    )
    CSS_PATH.write_text(header + new_css, encoding="utf-8")
    print(f"Wrote {CSS_PATH} ({len(new_css):,} bytes)")

    # Patch index.html: replace Google link with local fonts.css link
    if not HTML_PATH.exists():
        raise SystemExit(f"Missing {HTML_PATH} — run build_offline.py first")

    html = HTML_PATH.read_text(encoding="utf-8")
    new_html, n = GOOGLE_LINK_PATTERN.subn(
        '<link href="fonts.css" rel="stylesheet">',
        html,
    )
    if n == 0:
        print("WARNING: didn't find Google Fonts <link> in index.html — leaving HTML untouched")
    else:
        HTML_PATH.write_text(new_html, encoding="utf-8")
        print(f"Patched {HTML_PATH}: replaced Google Fonts <link> with local reference")


if __name__ == "__main__":
    main()
