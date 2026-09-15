#!/usr/bin/env python3
"""Normalize a design-handoff bundle so it can be diffed.

For every *.dc.html prototype in BUNDLE, writes two files to OUT:

  <name>.txt        visible text, one line per run, entities unescaped
  <name>.tags.html  markup, one tag per line, so a structural diff is readable

Usage:
    python3 extract.py "<bundle dir>" <out dir>

Then:
    diff -r out-v3 out-v4          # what actually changed between bundles
    diff out-v4/home.txt live/home.txt   # prototype vs the running app
"""
import html
import os
import re
import sys

# Prototype file -> the app route it maps to, used as the output basename.
ROUTES = {
    "Home": "home",
    "About": "about",
    "Resume": "resume",
    "Helios": "helios",
    "InvestigativeWorkflow": "analysis-workflow",
    "NUcleus": "nucleus",
    "Orbit": "orbit",
    "Theorem": "theorem",
    "NebraskaEdu": "nebraska-edu",
}


def strip_noise(s: str) -> str:
    """Drop everything that is prototype runtime rather than design."""
    for tag in ("script", "style", "head", "svg"):
        s = re.sub(rf"<{tag}.*?</{tag}>", "", s, flags=re.S)
    return s


def to_text(s: str) -> str:
    s = re.sub(r"<[^>]+>", "\n", strip_noise(s))
    lines = [l.strip() for l in html.unescape(s).split("\n")]
    # `{{ }}` is a prototype binding placeholder, not copy.
    return "\n".join(l for l in lines if l and not l.startswith("{{"))


def to_tags(s: str) -> str:
    s = re.sub(r">\s*<", ">\n<", strip_noise(s))
    return "\n".join(l.strip() for l in s.split("\n") if l.strip())


def main() -> int:
    if len(sys.argv) != 3:
        print(__doc__)
        return 2
    bundle, out = sys.argv[1], sys.argv[2]
    os.makedirs(out, exist_ok=True)
    seen = 0
    for f in sorted(os.listdir(bundle)):
        if not f.endswith(".dc.html"):
            continue
        stem = f[: -len(".dc.html")]
        name = ROUTES.get(stem, stem.lower())
        s = open(os.path.join(bundle, f), encoding="utf-8").read()
        open(os.path.join(out, name + ".txt"), "w", encoding="utf-8").write(to_text(s))
        open(os.path.join(out, name + ".tags.html"), "w", encoding="utf-8").write(to_tags(s))
        print(f"{f}  ->  {name}")
        seen += 1
    if not seen:
        print(f"No .dc.html prototypes found in {bundle}", file=sys.stderr)
        return 1
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
