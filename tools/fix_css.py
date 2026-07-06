#!/usr/bin/env python3
"""Repoint every url() in the extracted theme CSS to local /fonts and /images.

Handles two cases left by the SavePage export:
  1. Live Shopify CDN font URLs  -> /fonts/<short>.woff2
  2. Emptied url() with a /*savepage-url=NAME*/ comment -> local asset path
"""
import os
import re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CSS_DIR = os.path.join(ROOT, "src", "styles", "theme")

# basename -> local path (empty string => leave url() empty: asset unavailable)
SAVEPAGE = {
    "fontawesome-webfont.woff2": "/fonts/fontawesome-webfont.woff2",
    "fontawesome-webfont.woff": "/fonts/fontawesome-webfont.woff",
    "fontawesome-webfont.ttf": "/fonts/fontawesome-webfont.ttf",
    "fontawesome-webfont.eot": "",
    "fontawesome-webfont.svg": "",
    "loading.gif": "/images/loading.gif",
    "pattern_arrow.png": "/images/pattern_arrow.png",
    "icon.png": "/images/icon.png",
    "instagram-icon.svg": "/images/instagram-icon.svg",
    "video-icon.png": "/images/video-icon.png",
    # genuinely unavailable on the CDN (404) -> graceful fallback, like the live site
    "american_captain-webfont.woff2": "",
    "american_captain-webfont.woff": "",
    "futurabt-light-webfont.woff2": "",
    "futurabt-light-webfont.woff": "",
}

cdn_font_re = re.compile(
    r'url\(\s*["\']?(?://|https?:)?[^"\')]*?/cdn/fonts/[^/"\')]+/([^/."\')]+)\.[0-9a-f]+\.(woff2?)["\']?\s*\)'
)
noimage_re = re.compile(
    r'url\(\s*["\']?(?://|https?:)?[^"\')]*?/no-image-2048[^"\')]+["\']?\s*\)'
)
savepage_re = re.compile(r"/\*savepage-url=([^*]+)\*/\s*url\(\s*\)")
# any remaining protocol-relative / absolute shopify asset url that is NOT local
leftover_re = re.compile(r'url\(\s*["\']?((?://|https?:)[^"\')]+)["\']?\s*\)')


def basename(name):
    return name.rstrip("/").split("/")[-1].split("?")[0]


total = {"cdn": 0, "savepage": 0, "leftover": 0}
for fn in sorted(os.listdir(CSS_DIR)):
    if not fn.endswith(".css"):
        continue
    p = os.path.join(CSS_DIR, fn)
    css = open(p, encoding="utf-8").read()

    def cdn_sub(m):
        total["cdn"] += 1
        return f'url("/fonts/{m.group(1)}.{m.group(2)}")'

    css = cdn_font_re.sub(cdn_sub, css)
    css = noimage_re.sub('url("/images/no-image-2048.gif")', css)

    def sp_sub(m):
        local = SAVEPAGE.get(basename(m.group(1)))
        total["savepage"] += 1
        return f'url("{local}")' if local else "url()"

    css = savepage_re.sub(sp_sub, css)
    open(p, "w", encoding="utf-8").write(css)

    for m in leftover_re.finditer(css):
        total["leftover"] += 1
        if total["leftover"] <= 15:
            print(f"  LEFTOVER in {fn}: {m.group(1)[:90]}")

print(f"rewrote cdn-font={total['cdn']} savepage={total['savepage']} ; leftover external url()={total['leftover']}")
