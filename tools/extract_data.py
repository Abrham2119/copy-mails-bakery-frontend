#!/usr/bin/env python3
"""Parse cleaned section content into structured JSON for the component build."""
import json, re, os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CONTENT = os.path.join(ROOT, "src", "content")

def load(name):
    s = open(os.path.join(CONTENT, f"{name}.content.ts"), encoding="utf-8").read()
    return json.loads(s[s.find('"'): s.rfind(";")])

def nosvg(h): return re.sub(r"<svg.*?</svg>", "", h, flags=re.S)

def text(s):
    s = re.sub(r"<[^>]+>", " ", s)
    s = s.replace("&amp;", "&")
    s = re.sub(r"&#?\w+;", " ", s)
    return re.sub(r"\s+", " ", s).strip()

def parse_products(html):
    out = []
    for li in re.findall(r'<li id="product-\d+".*?(?=<li id="product-|\Z)', html, re.S):
        tm = re.search(r'grid-link__title"><a[^>]*>([^<]+)</a>', li)
        if not tm:
            continue
        imgs = re.findall(r'<img src="(/images/[^"]+)"', li)
        org = re.search(r'grid-link__org_price"[^>]*>\s*([^<]+?)\s*<', li)
        sale = re.search(r'grid-link__sale_price"[^>]*>\s*([^<]+?)\s*<', li)
        was = re.search(r'grid-link__was_price"[^>]*>\s*([^<]+?)\s*<', li)
        out.append({
            "title": text(tm.group(1)),
            "image": imgs[0] if imgs else "",
            "hoverImage": imgs[1] if len(imgs) > 1 else (imgs[0] if imgs else ""),
            "price": text(org.group(1)) if org else "",
            "salePrice": text(sale.group(1)) if sale else None,
            "wasPrice": text(was.group(1)) if was else None,
            "onSale": "on-sale" in li[:160],
        })
    return out

def heading(html):
    sub = re.search(r'dt-sc-sub-heading"[^>]*>([^<]+)<', html)
    main = re.search(r'dt-sc-main-heading"[^>]*>([^<]+)<', html)
    return {"sub": text(sub.group(1)) if sub else None,
            "main": text(main.group(1)) if main else None}

data = {}

# ---- products ----
for key, name in [("bestSelling", "productCarousel"), ("deals", "dealCarousel")]:
    h = load(name)
    data[key] = {"heading": heading(h), "products": parse_products(h)}

htab = load("productTab")
data["tabHeading"] = heading(htab)
labels = re.findall(r'class="dt-sc-btn tablinks[^"]*" id="([^"]+)">([^<]+)</div>', htab)
panels = re.split(r'<div data-tab="', htab)[1:]
data["tabs"] = [{"id": tid, "label": text(lbl), "products": parse_products(p)}
                for (tid, lbl), p in zip(labels, panels)]

# ---- slideshow ----
h = nosvg(load("slideshow"))
slides = []
for blk in re.findall(r'<img class="slide-img" src="(/images/[^"]+)".*?(?=<img class="slide-img"|<div class="swiper-button|\Z)', h, re.S):
    pass
for m in re.finditer(r'<img class="slide-img" src="(/images/[^"]+)"[^>]*>(.*?)(?=<img class="slide-img"|$)', h, re.S):
    img, body = m.group(1), m.group(2)
    sub = re.search(r'slide-sub-heading[^>]*>(.*?)</p>', body, re.S)
    head = re.search(r'slide-heading[^>]*>(.*?)</h2>', body, re.S)
    txt = re.search(r'slide-text[^>]*>(.*?)</div>', body, re.S)
    btn = re.search(r'slide-button[^>]*>(.*?)</a>', body, re.S)
    if not head:
        continue
    def lastcolor(tag):
        m = re.search(tag + r'[^>]*style="([^"]*)"', body)
        if not m:
            return "#ffffff"
        cols = re.findall(r'color\s*:\s*(#[0-9a-fA-F]{3,6})', m.group(1))
        return cols[-1] if cols else "#ffffff"
    slides.append({
        "image": img,
        "sub": text(sub.group(1)) if sub else "",
        "subColor": lastcolor("slide-sub-heading"),
        "heading": text(head.group(1)) if head else "",
        "headingColor": lastcolor("slide-heading"),
        "offer": text(txt.group(1)) if txt else "",
        "offerColor": lastcolor("slide-text"),
        "button": text(btn.group(1)) if btn else "Shop Now",
    })
data["slides"] = slides

# ---- linkedlist menu cards ("Feel the Taste") ----
h = nosvg(load("linkedlistMenu"))
cards = []
for blk in re.findall(r'dt-sc-collection-heading.*?dt-sc-collection-description">(.*?)</p>', h, re.S):
    pass
titles = re.findall(r'dt-sc-collection-heading"><a[^>]*>([^<]+)</a>', h)
descs = re.findall(r'dt-sc-collection-description">(.*?)</p>', h, re.S)
imgs = [i for i in re.findall(r'<img[^>]*src="(/images/[^"]+)"', h) if "asset-0b375" not in i]
for i, t in enumerate(titles):
    cards.append({"title": text(t),
                  "desc": text(descs[i]) if i < len(descs) else "",
                  "image": imgs[i] if i < len(imgs) else ""})
data["menuHeading"] = {"sub": text(re.search(r'<h5[^>]*>(.*?)</h5>', h).group(1)) if re.search(r'<h5[^>]*>(.*?)</h5>', h) else "Cakes & Bakes",
                       "main": "Feel the Taste"}
data["menuCards"] = cards
data["menuLogo"] = "/images/asset-0b375c14d09f.png"

# ---- blog ----
h = nosvg(load("blog"))
data["blogHeading"] = heading(h)
posts = []
for m in re.finditer(r'<img[^>]*src="(/images/[^"]+)"[^>]*>(.*?)(?=<img[^>]*src="/images/|$)', h, re.S):
    img, body = m.group(1), m.group(2)
    title = re.search(r'<h\d[^>]*>\s*<a[^>]*>(.*?)</a>', body, re.S)
    date = re.search(r'(\w+ \d{1,2}, \d{4})', body)
    excerpt = re.search(r'<p[^>]*>(.*?)</p>', body, re.S)
    if not title:
        continue
    posts.append({"image": img, "title": text(title.group(1)),
                  "date": date.group(1) if date else "",
                  "excerpt": text(excerpt.group(1)) if excerpt else ""})
data["blogPosts"] = posts[:3]

# ---- faq ----
h = nosvg(load("faq"))
data["faqHeading"] = {"sub": text(re.findall(r'<h\d[^>]*>(.*?)</h\d>', h)[0]) if re.findall(r'<h\d[^>]*>(.*?)</h\d>', h) else "Best solution",
                      "main": "Frequently Asked"}
qs = re.findall(r'dt-sc-accordion-btn">\s*<h5[^>]*>(.*?)</h5>', h, re.S)
ans = re.findall(r'dt-sc-accordion-content-inner">\s*<p>(.*?)</p>', h, re.S)
data["faqs"] = [{"q": text(q), "a": text(ans[i]) if i < len(ans) else ""} for i, q in enumerate(qs)]
data["faqImage"] = (re.search(r'<img[^>]*src="(/images/[^"]+)"', h) or [None, ""])[1] if re.search(r'<img[^>]*src="(/images/[^"]+)"', h) else ""

# ---- pricing ("Menu Items") ----
h = nosvg(load("pricingBlock"))
data["pricingHeading"] = {"sub": "Amazing Taste", "main": "Menu Items"}
ptitles = re.findall(r'<h\d[^>]*>\s*<a[^>]*>(.*?)</a>', h, re.S)
pdescs = re.findall(r'<p[^>]*>(.*?)</p>', h, re.S)
pimg = re.search(r'<img[^>]*src="(/images/[^"]+)"', h)
data["pricingImage"] = pimg.group(1) if pimg else ""
data["pricingItems"] = [{"title": text(t), "desc": text(pdescs[i]) if i < len(pdescs) else ""}
                        for i, t in enumerate(ptitles)]

# ---- brand logos ----
h = load("brandLogos")
data["brandLogos"] = list(dict.fromkeys(re.findall(r'<img [^>]*?src="(/images/[^"]+)"', h)))

# ---- deal banner ----
h = nosvg(load("dealBanner"))
db_img = re.search(r'<img[^>]*src="(/images/[^"]+)"', h)
hs = re.findall(r'<h\d[^>]*>(.*?)</h\d>', h, re.S)
btn = re.search(r'<a[^>]*>(.*?)</a>', h, re.S)
data["dealBanner"] = {
    "image": db_img.group(1) if db_img else "",
    "heading": text(hs[0]) if hs else "",
    "sub": text(hs[1]) if len(hs) > 1 else "",
    "button": text(btn.group(1)) if btn else "Shop Now",
}

json.dump(data, open(os.path.join(ROOT, "tools", "data.json"), "w"), indent=2)
print("== counts ==")
print("slides", len(data["slides"]), "| menuCards", len(data["menuCards"]),
      "| bestSelling", len(data["bestSelling"]["products"]),
      "| tabs", [len(t["products"]) for t in data["tabs"]],
      "| blog", len(data["blogPosts"]), "| faqs", len(data["faqs"]),
      "| pricing", len(data["pricingItems"]), "| logos", len(data["brandLogos"]))
print("\nslides:", json.dumps(data["slides"], indent=1)[:900])
print("\nmenuCards:", json.dumps(data["menuCards"], indent=1)[:700])
print("\nblog:", json.dumps(data["blogPosts"], indent=1)[:700])
