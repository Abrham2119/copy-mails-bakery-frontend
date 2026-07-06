#!/usr/bin/env python3
"""Final content build: extract balanced fragments from body.clean, clean off
inert export cruft, and emit one TS content module per fragment + a manifest.
stdlib-only.
"""
import json
import os
import re
from html.parser import HTMLParser

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BODY = os.path.join(ROOT, "tools", "body.clean.html")
OUT = os.path.join(ROOT, "src", "content")
os.makedirs(OUT, exist_ok=True)

VOID = {"area", "base", "br", "col", "embed", "hr", "img", "input",
        "link", "meta", "param", "source", "track", "wbr"}
DROP_TREE = {"script", "noscript", "template", "shop-cart-sync", "iframe"}
DROP_ATTR_PREFIX = ("data-savepage-", "data-qb-", "data-source-attribution")
DROP_ATTR = {"crossorigin", "integrity", "nonce", "data-shopify-privacy",
             "data-savepage", "savepage", "data-instance-id", "experiments"}

html = open(BODY, encoding="utf-8").read()

# ---- 1. record balanced spans -------------------------------------------------
class Spans(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=False)
        self.stack = []
        self.records = []
        self._lineoff = [0]
        for line in html.splitlines(keepends=True):
            self._lineoff.append(self._lineoff[-1] + len(line))

    def _abs(self, pos):
        line, col = pos
        return self._lineoff[line - 1] + col

    def handle_starttag(self, tag, attrs):
        if tag in VOID:
            return
        self.stack.append((tag, self._abs(self.getpos()), dict(attrs)))

    def handle_endtag(self, tag):
        for i in range(len(self.stack) - 1, -1, -1):
            if self.stack[i][0] == tag:
                _, start, attrs = self.stack[i]
                end = html.find(">", self._abs(self.getpos())) + 1
                self.records.append((tag, attrs.get("id"),
                                     attrs.get("class", ""), start, end))
                del self.stack[i:]
                return

sp = Spans()
sp.feed(html)

def by_id(eid):
    for tag, i, cls, s, e in sp.records:
        if i == eid:
            return html[s:e]
    return None

# ---- 2. cleaner ---------------------------------------------------------------
class Cleaner(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=False)
        self.out = []
        self.skip = 0
        self.skip_tag = None

    def handle_starttag(self, tag, attrs):
        if self.skip:
            if tag == self.skip_tag and tag not in VOID:
                self.skip += 1
            return
        if tag in DROP_TREE:
            if tag not in VOID:
                self.skip = 1
                self.skip_tag = tag
            return
        self.out.append(self._tag(tag, attrs))

    def handle_startendtag(self, tag, attrs):
        if self.skip or tag in DROP_TREE:
            return
        self.out.append(self._tag(tag, attrs))

    def handle_endtag(self, tag):
        if self.skip:
            if tag == self.skip_tag:
                self.skip -= 1
                if self.skip == 0:
                    self.skip_tag = None
            return
        if tag in DROP_TREE or tag in VOID:
            return
        self.out.append(f"</{tag}>")

    def handle_data(self, d):
        if not self.skip:
            self.out.append(d)

    def handle_entityref(self, n):
        if not self.skip:
            self.out.append(f"&{n};")

    def handle_charref(self, n):
        if not self.skip:
            self.out.append(f"&#{n};")

    def handle_comment(self, d):
        pass

    def _tag(self, tag, attrs):
        amap, order = {}, []
        for k, v in attrs:
            if k not in amap:
                amap[k] = v
                order.append(k)
        if (not amap.get("href")) and amap.get("data-savepage-href"):
            amap["href"] = amap["data-savepage-href"]
            order.append("href") if "href" not in order else None
        if (not amap.get("src")) and amap.get("data-savepage-src"):
            spv = amap["data-savepage-src"]
            if spv and not spv.startswith("data:"):
                amap["src"] = spv
                order.append("src") if "src" not in order else None
        parts = [tag]
        for k in order:
            if k in DROP_ATTR or any(k.startswith(p) for p in DROP_ATTR_PREFIX):
                continue
            v = amap[k]
            if v is None:
                parts.append(k)
            else:
                parts.append(f'{k}="{v.replace(chr(34), "&quot;")}"')
        return "<" + " ".join(parts) + ">"

def clean(fragment):
    c = Cleaner()
    c.feed(fragment)
    s = "".join(c.out)
    s = re.sub(r"[ \t]+\n", "\n", s)
    s = re.sub(r"\n{3,}", "\n\n", s)
    return s.strip()

# ---- 3. fragment map ----------------------------------------------------------
INDEX = [
    ("1623818547dae95647", "slideshow"),
    ("16238188793b83dbee", "linkedlistMenu"),
    ("1623819169e8bc0d96", "productCarousel"),
    ("16238195270d417511", "dealCarousel"),
    ("16238200958a6f6d85", "productTab"),
    ("162382045661b10ec8", "dealBanner"),
    ("162382233804109a90", "pricingBlock"),
    ("162382390610733a63", "blog"),
    ("162382434105c92300", "faq"),
    ("1623826484f5d7bd08", "supportBlock"),
    ("162382668147e63d4b", "brandLogos"),
]
EXTRA = [
    ("CartDrawer", "cartDrawer"),
    ("shopify-section-header", "header"),
    ("shopify-section-footer", "footer"),
    ("shopify-section-modal-newsletter", "newsletterModal"),
    ("shopify-section-customer-purchased", "customerPurchased"),
    ("to-top", "toTop"),
]

written = []
def write(name, frag):
    cleaned = clean(frag)
    with open(os.path.join(OUT, f"{name}.content.ts"), "w", encoding="utf-8") as f:
        f.write("// AUTO-GENERATED from the saved DT theme snapshot. Do not edit.\n")
        f.write(f"export const html = {json.dumps(cleaned)};\n")
    written.append((name, len(cleaned)))

for sid, name in INDEX:
    write(name, by_id(f"shopify-section-{sid}"))
for eid, name in EXTRA:
    write(name, by_id(eid))

for n, sz in written:
    print(f"  {n:18s} {sz:>8}")
print(f"wrote {len(written)} content modules")
