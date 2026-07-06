#!/usr/bin/env python3
"""Migration pipeline for the saved DT 'Cakes & Bakes' Shopify page.

- Decodes every base64 data URI to public/images/ (deduped by content hash).
- Extracts the 12 <style> blocks verbatim (rewriting url(data:) -> /images/..)
  into src/styles/theme/NN.css.
- Emits a cleaned full-body HTML (data URIs replaced by local paths) for
  slicing into React components.
"""
import base64
import hashlib
import os
import re
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, "Cakes & Bakes - Cakes & Bakes (password_ buddha).html")
IMG_DIR = os.path.join(ROOT, "public", "images")
CSS_DIR = os.path.join(ROOT, "src", "styles", "theme")
TOOLS = os.path.join(ROOT, "tools")
os.makedirs(IMG_DIR, exist_ok=True)
os.makedirs(CSS_DIR, exist_ok=True)

EXT = {
    "image/png": "png",
    "image/jpeg": "jpg",
    "image/jpg": "jpg",
    "image/gif": "gif",
    "image/svg+xml": "svg",
    "image/webp": "webp",
}

html = open(SRC, encoding="utf-8", errors="replace").read()

# ---------------------------------------------------------------------------
# 1. Decode all base64 data URIs, dedupe by content hash, build a map.
# ---------------------------------------------------------------------------
datauri_re = re.compile(r"data:(image/[a-z.+-]+);base64,([A-Za-z0-9+/=]+)")
mapping = {}      # full datauri string -> /images/<file>
seen = {}         # content hash -> /images/<file>
count = 0
for m in datauri_re.finditer(html):
    full = m.group(0)
    if full in mapping:
        continue
    mime, b64 = m.group(1).lower(), m.group(2)
    try:
        raw = base64.b64decode(b64)
    except Exception:
        continue
    h = hashlib.sha1(raw).hexdigest()[:12]
    if h in seen:
        mapping[full] = seen[h]
        continue
    ext = EXT.get(mime, "bin")
    fname = f"asset-{h}.{ext}"
    with open(os.path.join(IMG_DIR, fname), "wb") as f:
        f.write(raw)
    path = f"/images/{fname}"
    seen[h] = path
    mapping[full] = path
    count += 1
print(f"decoded {count} unique images ({len(mapping)} data URIs mapped)")


def replace_datauris(text):
    return datauri_re.sub(lambda m: mapping.get(m.group(0), m.group(0)), text)


# ---------------------------------------------------------------------------
# 2. Extract <style> blocks from the <head>.
# ---------------------------------------------------------------------------
head = html[: html.find('<body id="cakes')]
styles = re.findall(r"<style[^>]*>(.*?)</style>", head, re.S)
manifest = []
for i, css in enumerate(styles, 1):
    css = replace_datauris(css).strip()
    if not css:
        continue
    name = f"{i:02d}.css"
    with open(os.path.join(CSS_DIR, name), "w", encoding="utf-8") as f:
        f.write(css)
    manifest.append((name, len(css)))
print(f"wrote {len(manifest)} css files")
for n, sz in manifest:
    print(f"  {n}: {sz} bytes")

# ---------------------------------------------------------------------------
# 3. Emit cleaned body for component slicing.
# ---------------------------------------------------------------------------
bi = html.find('<body id="cakes')
body = html[bi:]
body = replace_datauris(body)
with open(os.path.join(TOOLS, "body.clean.html"), "w", encoding="utf-8") as f:
    f.write(body)
print(f"wrote tools/body.clean.html ({len(body)} chars)")

# Report any remaining external (non-local) asset URLs referenced in CSS.
ext_urls = set(re.findall(r"url\((https?:[^)]+)\)", "\n".join(styles)))
fonts = sorted(u for u in ext_urls if re.search(r"\.(woff2?|ttf|otf|eot)", u))
print(f"external font URLs referenced in CSS: {len(fonts)}")
for u in list(fonts)[:20]:
    print("  ", u.strip('"\''))
