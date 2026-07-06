#!/usr/bin/env python3
"""Depth-aware extraction of balanced element spans from the cleaned body.

stdlib-only. Records the raw source span of every element so we can pull out
exactly-balanced fragments (header, each index section, footer, modals, shell
pieces) regardless of how the source whitespace/structure nests.
"""
import json
import os
import re
from html.parser import HTMLParser

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BODY = os.path.join(ROOT, "tools", "body.clean.html")

VOID = {"area", "base", "br", "col", "embed", "hr", "img", "input",
        "link", "meta", "param", "source", "track", "wbr"}

html = open(BODY, encoding="utf-8").read()


class Spans(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=False)
        self.stack = []          # (tag, startpos, attrs)
        self.records = []        # (tag, id, classes, start, end)

    def handle_starttag(self, tag, attrs):
        if tag in VOID:
            return
        self.stack.append((tag, self.getpos(), dict(attrs)))

    def handle_startendtag(self, tag, attrs):
        return

    def handle_endtag(self, tag):
        for i in range(len(self.stack) - 1, -1, -1):
            if self.stack[i][0] == tag:
                _, startpos, attrs = self.stack[i]
                start = self._abs(startpos)
                end = self._abs(self.getpos())
                # extend end to include this closing tag
                end = html.find(">", end) + 1
                self.records.append((tag, attrs.get("id"),
                                     attrs.get("class", ""), start, end))
                del self.stack[i:]
                return

    def _abs(self, pos):
        line, col = pos
        # convert (line, col) -> absolute offset
        return self._lineoff[line - 1] + col

    def feed_all(self):
        self._lineoff = [0]
        for line in html.splitlines(keepends=True):
            self._lineoff.append(self._lineoff[-1] + len(line))
        self.feed(html)


p = Spans()
p.feed_all()


def by_id(eid):
    for tag, i, cls, s, e in p.records:
        if i == eid:
            return html[s:e]
    return None


def by_class_contains(token):
    out = []
    for tag, i, cls, s, e in p.records:
        if token in (cls or "").split():
            out.append((s, e, html[s:e]))
    return out


# direct children sections of shifter-page#container, in document order
shifter = None
for tag, i, cls, s, e in p.records:
    if i == "container" and "shifter-page" in (cls or ""):
        shifter = (s, e)
        break

index_sections = []
if shifter:
    cs, ce = shifter
    for tag, i, cls, s, e in p.records:
        if tag == "div" and "shopify-section" in (cls or "") and cs < s < ce:
            index_sections.append((s, i, cls, html[s:e]))
    index_sections.sort()

print("header span found:", by_id("shopify-section-header") is not None and
      "shopify-section-header" or "MISSING")
print("CartDrawer:", "ok" if by_id("CartDrawer") else "MISSING")
print("to-top:", "ok" if by_id("to-top") else "MISSING")
print("shifter#container:", "ok" if shifter else "MISSING")
print("index sections under shifter:", len(index_sections))
for s, i, cls, frag in index_sections:
    print(f"   {i or '-':40s} {len(frag):>7} {cls[:40]}")

# --- off-canvas--viewport direct children order ---
oc = None
for tag, i, cls, s, e in p.records:
    if "off-canvas--viewport" in (cls or ""):
        oc = (s, e); break
print("\n=== off-canvas--viewport direct-ish children (sections/drawer/shifter) ===")
seen = set()
rows = []
for tag, i, cls, s, e in p.records:
    if oc and oc[0] < s < oc[1]:
        if i in ("CartDrawer", "container") or "shopify-section" in (cls or ""):
            rows.append((s, i, cls))
for s, i, cls in sorted(rows):
    print(f"  @{s:>7} {i or '-':40s} {cls[:45]}")
print("\nshell pieces present:",
      "preloader" if by_class_contains("se-pre-con") else "no-preloader",
      "| mobile-menu" if by_class_contains("mobile-menu") else "",
      "| overlay" if by_class_contains("mobile-menu-overlay") else "")
