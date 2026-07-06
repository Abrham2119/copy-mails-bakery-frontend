#!/usr/bin/env python3
"""Clean each saved section's HTML into faithful, framework-agnostic markup.

Removes only INERT nodes/attributes added by the SavePage export and the
Shopify analytics runtime; preserves every class, structural element and
inline style so the DOM the browser parses is identical to the snapshot.
Emits one TS module per section: `export const html = <json string>`.
"""
import json
import os
import re

from html.parser import HTMLParser

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SECT = os.path.join(ROOT, "tools", "sections")
OUT = os.path.join(ROOT, "src", "content")
os.makedirs(OUT, exist_ok=True)

VOID = {"area", "base", "br", "col", "embed", "hr", "img", "input",
        "link", "meta", "param", "source", "track", "wbr"}
# tags whose entire subtree is inert and must be dropped
DROP_TREE = {"script", "noscript", "template", "shop-cart-sync"}

DROP_ATTR_PREFIX = ("data-savepage-", "data-qb-", "data-source-attribution")
DROP_ATTR = {"crossorigin", "integrity", "nonce", "data-shopify-privacy",
             "data-savepage", "savepage", "data-instance-id", "experiments"}


class Cleaner(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=False)
        self.out = []
        self.skip_depth = 0
        self.skip_tag = None

    def handle_starttag(self, tag, attrs):
        if self.skip_depth:
            if tag == self.skip_tag and tag not in VOID:
                self.skip_depth += 1
            return
        if tag in DROP_TREE:
            if tag not in VOID:
                self.skip_depth = 1
                self.skip_tag = tag
            return
        self.out.append(self._render_tag(tag, attrs, self_close=False))

    def handle_startendtag(self, tag, attrs):
        if self.skip_depth:
            return
        if tag in DROP_TREE:
            return
        self.out.append(self._render_tag(tag, attrs, self_close=True))

    def handle_endtag(self, tag):
        if self.skip_depth:
            if tag == self.skip_tag:
                self.skip_depth -= 1
                if self.skip_depth == 0:
                    self.skip_tag = None
            return
        if tag in DROP_TREE or tag in VOID:
            return
        self.out.append(f"</{tag}>")

    def handle_data(self, data):
        if not self.skip_depth:
            self.out.append(data)

    def handle_entityref(self, name):
        if not self.skip_depth:
            self.out.append(f"&{name};")

    def handle_charref(self, name):
        if not self.skip_depth:
            self.out.append(f"&#{name};")

    def handle_comment(self, data):
        pass  # drop HTML comments

    def _render_tag(self, tag, attrs, self_close):
        amap = {}
        order = []
        for k, v in attrs:
            if k in amap:
                continue
            amap[k] = v
            order.append(k)
        # restore real href/src from the SavePage shadow attribute
        if (not amap.get("href")) and amap.get("data-savepage-href"):
            amap["href"] = amap["data-savepage-href"]
            if "href" not in order:
                order.append("href")
        if (not amap.get("src")) and amap.get("data-savepage-src"):
            sp = amap["data-savepage-src"]
            if sp and not sp.startswith("data:"):
                amap["src"] = sp
                if "src" not in order:
                    order.append("src")
        parts = [tag]
        for k in order:
            if k in DROP_ATTR or any(k.startswith(p) for p in DROP_ATTR_PREFIX):
                continue
            v = amap[k]
            if v is None:
                parts.append(k)
            else:
                v = v.replace('"', "&quot;")
                parts.append(f'{k}="{v}"')
        inner = " ".join(parts)
        if self_close or tag in VOID:
            return f"<{inner}>"
        return f"<{inner}>"


def clean(html):
    c = Cleaner()
    c.feed(html)
    s = "".join(c.out)
    # collapse runs of whitespace-only between tags to a single space/newline
    s = re.sub(r"[ \t]+\n", "\n", s)
    s = re.sub(r"\n{3,}", "\n\n", s)
    return s.strip()


SECTIONS = [
    ("01-header.html", "header"),
    ("02-slideshow.html", "slideshow"),
    ("03-linkedlist-menu.html", "linkedlistMenu"),
    ("04-product-carousel.html", "productCarousel"),
    ("05-deal-carousel.html", "dealCarousel"),
    ("06-product-tab.html", "productTab"),
    ("07-deal-banner.html", "dealBanner"),
    ("08-pricing-block.html", "pricingBlock"),
    ("09-blog.html", "blog"),
    ("10-faq.html", "faq"),
    ("11-support-block.html", "supportBlock"),
    ("12-brand-logos.html", "brandLogos"),
    ("13-footer.html", "footer"),
    ("14-modal-newsletter.html", "newsletterModal"),
    ("15-customer-purchased.html", "customerPurchased"),
]

for fn, name in SECTIONS:
    raw = open(os.path.join(SECT, fn), encoding="utf-8").read()
    cleaned = clean(raw)
    js = json.dumps(cleaned)
    out = os.path.join(OUT, f"{name}.content.ts")
    with open(out, "w", encoding="utf-8") as f:
        f.write("// AUTO-GENERATED from the saved DT theme snapshot. Do not edit by hand.\n")
        f.write(f"export const html = {js};\n")
    print(f"{name:18s} {len(raw):>7} -> {len(cleaned):>7} chars")
