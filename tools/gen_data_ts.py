#!/usr/bin/env python3
"""Generate typed TS data files from tools/data.json."""
import json, os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
d = json.load(open(os.path.join(ROOT, "tools", "data.json")))

def ts(obj, indent=2):
    return json.dumps(obj, indent=indent, ensure_ascii=False)

# dedupe slideshow (Swiper loop clones) by heading, keep first order
seen, slides = set(), []
for s in d["slides"]:
    if s["heading"] in seen:
        continue
    seen.add(s["heading"]); slides.append(s)

# normalize blog posts
comments = [4, 3, 2]
blog = [{"image": p["image"], "title": p["title"], "date": p["date"],
         "author": "Ram M", "comments": comments[i] if i < len(comments) else 0}
        for i, p in enumerate(d["blogPosts"])]

def prod(p):
    return {k: v for k, v in p.items()}

catalog = {
    "slides": slides,
    "menuHeading": d["menuHeading"],
    "menuCards": d["menuCards"],
    "menuLogo": d["menuLogo"],
    "bestSellingHeading": d["bestSelling"]["heading"],
    "bestSelling": [prod(p) for p in d["bestSelling"]["products"]],
    "dealsHeading": d["deals"]["heading"],
    "tabHeading": d["tabHeading"],
    "tabs": [{"id": t["id"], "label": t["label"],
              "products": [prod(p) for p in t["products"]]} for t in d["tabs"]],
    "dealBanner": d["dealBanner"],
    "pricingHeading": d["pricingHeading"],
    "pricingImage": d["pricingImage"],
    "pricingItems": d["pricingItems"],
    "blogHeading": d["blogHeading"],
    "blogPosts": blog,
    "faqHeading": d["faqHeading"],
    "faqImage": d["faqImage"],
    "faqs": d["faqs"],
    "brandLogos": d["brandLogos"],
}

out = os.path.join(ROOT, "src", "constant", "catalog.ts")
with open(out, "w", encoding="utf-8") as f:
    f.write("// AUTO-GENERATED from the original storefront content. Edit tools/gen_data_ts.py.\n")
    f.write('import type {\n  Slide, MenuCard, Product, ProductTab, DealBanner,\n  PricingItem, BlogPost, Faq, Heading,\n} from "@/domain/entities/catalog.types";\n\n')
    defs = [
        ("slides", "Slide[]", catalog["slides"]),
        ("menuHeading", "Heading", catalog["menuHeading"]),
        ("menuLogo", "string", catalog["menuLogo"]),
        ("menuCards", "MenuCard[]", catalog["menuCards"]),
        ("bestSellingHeading", "Heading", catalog["bestSellingHeading"]),
        ("bestSelling", "Product[]", catalog["bestSelling"]),
        ("dealsHeading", "Heading", catalog["dealsHeading"]),
        ("tabHeading", "Heading", catalog["tabHeading"]),
        ("productTabs", "ProductTab[]", catalog["tabs"]),
        ("dealBanner", "DealBanner", catalog["dealBanner"]),
        ("pricingHeading", "Heading", catalog["pricingHeading"]),
        ("pricingImage", "string", catalog["pricingImage"]),
        ("pricingItems", "PricingItem[]", catalog["pricingItems"]),
        ("blogHeading", "Heading", catalog["blogHeading"]),
        ("blogPosts", "BlogPost[]", catalog["blogPosts"]),
        ("faqHeading", "Heading", catalog["faqHeading"]),
        ("faqImage", "string", catalog["faqImage"]),
        ("faqs", "Faq[]", catalog["faqs"]),
        ("brandLogos", "string[]", catalog["brandLogos"]),
    ]
    for name, typ, val in defs:
        f.write(f"export const {name}: {typ} = {ts(val)};\n\n")
print("wrote", out)
print("slides", len(slides), "bestSelling", len(catalog["bestSelling"]),
      "tabs", [len(t['products']) for t in catalog['tabs']])
