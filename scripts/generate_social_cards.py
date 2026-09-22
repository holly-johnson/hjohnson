"""Generate the 1200x630 Open Graph cards.

A card is a promise about the page behind it, so these are built from the site's
own tokens and the page's own hero copy: mono kicker, serif title, one-line
subhead, hairline rule, mono footer. Nothing here is written for the card. If a
page's hero changes, change it here too and re-run.

    python3 scripts/generate_social_cards.py

Fonts are the real ones the site loads, cached in scripts/.fonts on first run
(git-ignored). Rendering with Arial instead is what made the previous set look
like a different website.
"""

from __future__ import annotations

from pathlib import Path
from urllib.request import Request, urlopen
import re

from PIL import Image, ImageDraw, ImageFont


WIDTH, HEIGHT = 1200, 630
MARGIN = 80

# From projects/portfolio/src/styles.css, light theme. There is no orange here.
BACKGROUND = "#FAF8F4"
FOREGROUND = "#141412"
MUTED = "#5E5A54"
BORDER = "#E0DCD4"
PRIMARY = "#2F6B4F"

ROOT = Path(__file__).parents[1]
FONT_DIR = Path(__file__).parent / ".fonts"
OUTPUT = ROOT / "projects/portfolio/public/assets/social"

# Google Fonts serves TrueType to a user agent too old to know about woff2.
FONT_UA = (
    "Mozilla/5.0 (Linux; U; Android 4.0.3; en-us; Galaxy Nexus Build/IML74K) "
    "AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30"
)
FONTS = {
    "LibreCaslonText-Regular": ("Libre Caslon Text", 400),
    "InterTight-Regular": ("Inter Tight", 400),
    "JetBrainsMono-Regular": ("JetBrains Mono", 400),
}


def fetch(url: str) -> bytes:
    return urlopen(Request(url, headers={"User-Agent": FONT_UA}), timeout=30).read()


def ensure_fonts() -> None:
    FONT_DIR.mkdir(parents=True, exist_ok=True)
    for name, (family, weight) in FONTS.items():
        target = FONT_DIR / f"{name}.ttf"
        if target.exists():
            continue
        css = fetch(
            f"https://fonts.googleapis.com/css2?family={family.replace(' ', '+')}:wght@{weight}"
        ).decode()
        match = re.search(r"https://fonts\.gstatic\.com/[^)]+", css)
        if not match:
            raise SystemExit(f"Could not resolve a TrueType URL for {family} {weight}")
        target.write_bytes(fetch(match.group(0)))
        print(f"cached {target.name}")


def font(name: str, size: int) -> ImageFont.FreeTypeFont:
    return ImageFont.truetype(str(FONT_DIR / f"{name}.ttf"), size)


def serif(size: int) -> ImageFont.FreeTypeFont:
    return font("LibreCaslonText-Regular", size)


def sans(size: int) -> ImageFont.FreeTypeFont:
    return font("InterTight-Regular", size)


def mono(size: int) -> ImageFont.FreeTypeFont:
    return font("JetBrainsMono-Regular", size)


def tracked(
    draw: ImageDraw.ImageDraw,
    xy: tuple[int, int],
    text: str,
    fill: str,
    typeface: ImageFont.FreeTypeFont,
    tracking: float,
    anchor_right: int | None = None,
) -> None:
    """Draw text with letter-spacing, which Pillow has no setting for.

    The site's mono labels carry tracking-[0.08em] to tracking-[0.14em]; without
    it they read as code rather than as a label.
    """
    x, y = xy
    if anchor_right is not None:
        width = sum(typeface.getlength(ch) + tracking for ch in text) - tracking
        x = anchor_right - int(width)
    for ch in text:
        draw.text((x, y), ch, fill=fill, font=typeface)
        x += typeface.getlength(ch) + tracking


def wrap(text: str, typeface: ImageFont.FreeTypeFont, width: int) -> list[str]:
    lines: list[str] = []
    line = ""
    for word in text.split():
        candidate = f"{line} {word}".strip()
        if typeface.getlength(candidate) <= width or not line:
            line = candidate
        else:
            lines.append(line)
            line = word
    if line:
        lines.append(line)
    return lines


RAIL_X = 844
RAIL_RULE_X = 812
RAIL_WIDTH = WIDTH - MARGIN - RAIL_X


def stats_rail(draw: ImageDraw.ImageDraw, stats: list[tuple[str, str]]) -> None:
    """The case-study hero's stat block, stacked one per row.

    The page sets these two-up. A card is read at thumbnail size and some
    captions run to two words, so they are stacked here and the caption sits
    beside the number rather than under it.
    """
    caption_x = RAIL_X + 84
    for index, (value, label) in enumerate(stats):
        y = 240 + index * 57
        draw.text((RAIL_X, y), value, fill=FOREGROUND, font=serif(30))
        tracked(draw, (caption_x, y + 14), label.upper(), MUTED, mono(11), 1.3)


def terms_rail(draw: ImageDraw.ImageDraw, terms: list[tuple[str, str]]) -> None:
    """The research hero's rail: mono term, sans definition beneath."""
    y = 236
    for term, definition in terms:
        tracked(draw, (RAIL_X, y), term.upper(), MUTED, mono(12), 1.4)
        for line in wrap(definition, sans(18), RAIL_WIDTH):
            y += 26
            draw.text((RAIL_X, y), line, fill=FOREGROUND, font=sans(18))
        y += 52


def card(
    name: str,
    kicker: str,
    title: list[str],
    subhead: str,
    footer: str,
    title_size: int = 62,
    stats: list[tuple[str, str]] | None = None,
    terms: list[tuple[str, str]] | None = None,
    wordmark: bool = True,
) -> None:
    image = Image.new("RGB", (WIDTH, HEIGHT), BACKGROUND)
    draw = ImageDraw.Draw(image)

    has_rail = bool(stats or terms)
    column = (RAIL_RULE_X - 36 - MARGIN) if has_rail else (WIDTH - 2 * MARGIN)

    # Wordmark, the same serif lockup the site's nav uses. The resume card's
    # title is already her name, and the card should not say it twice.
    if wordmark:
        draw.text((MARGIN, 60), "Holly Johnson", fill=FOREGROUND, font=serif(25))

    tracked(draw, (MARGIN, 236), kicker.upper(), MUTED, mono(15), 2.1)

    y = 276
    for line in title:
        if serif(title_size).getlength(line) > column:
            raise SystemExit(f"{name}: title line does not fit the column: {line!r}")
        draw.text((MARGIN, y), line, fill=FOREGROUND, font=serif(title_size))
        y += title_size + 14

    for line in wrap(subhead, sans(25), column):
        y += 40
        draw.text((MARGIN, y - 26), line, fill=FOREGROUND, font=sans(25))

    if y > 500:
        raise SystemExit(f"{name}: the text block runs into the footer rule")

    if has_rail:
        # The hero rail's border-l, at the same hairline weight as the footer rule.
        draw.line((RAIL_RULE_X, 232, RAIL_RULE_X, 470), fill=BORDER, width=1)
    if stats:
        stats_rail(draw, stats)
    if terms:
        terms_rail(draw, terms)

    # Mono label over a hairline rule, the site's section-label convention.
    draw.line((MARGIN, 522, WIDTH - MARGIN, 522), fill=BORDER, width=1)
    tracked(draw, (MARGIN, 548), footer.upper(), MUTED, mono(14), 1.9)
    tracked(
        draw,
        (0, 548),
        "hollyjohnson.design",
        PRIMARY,
        mono(14),
        1.9,
        anchor_right=WIDTH - MARGIN,
    )

    OUTPUT.mkdir(parents=True, exist_ok=True)
    image.save(OUTPUT / name, "PNG", optimize=True)
    print(f"wrote {name}")


# Copy is lifted from each page's hero. Do not write new lines here.
CARDS = [
    dict(
        name="home.png",
        kicker="Product designer · Design systems lead",
        title=["I work on the seam between", "design and engineering."],
        subhead="Product designer who writes the code too.",
        footer="Portfolio",
    ),
    dict(
        name="helios.png",
        kicker="Design system · 2023–2026",
        title=["Helios"],
        subhead="Design decisions, shipped as code.",
        footer="Case study",
        stats=[
            ("150+", "engineers"),
            ("200+", "tokens"),
            ("50+", "components"),
            ("20+", "patterns"),
        ],
    ),
    dict(
        name="investigative-workflow.png",
        kicker="Research · 2023–2026",
        title=["Investigative", "Workflow Research"],
        subhead="Aligning design around the work, not just the interface.",
        footer="Case study",
        terms=[
            ("Method", "Contextual interviews and workflow mapping"),
            ("Outcome", "One end-to-end view of investigative work"),
        ],
    ),
    dict(
        name="nucleus.png",
        kicker="Platform · 2017–present",
        title=["NUcleus", "Design System"],
        subhead="One system, many institutional identities.",
        footer="Case study",
        stats=[
            ("9", "university brands"),
            ("20+", "implementations"),
            ("300+", "features reviewed"),
            ("8+", "years in use"),
        ],
    ),
    dict(
        name="theorem.png",
        kicker="Product design · 2017–2022",
        title=["Theorem"],
        subhead="A learning management system rebuilt around how the work is actually done.",
        footer="Case study",
    ),
    dict(
        name="orbit.png",
        kicker="AI workspace · 2026",
        title=["Orbit"],
        subhead="Prototyping with Claude as a partner, building from the real Helios library.",
        footer="Case study",
    ),
    dict(
        name="about.png",
        kicker="About",
        title=["Helping government, education and", "communities serve people better."],
        subhead="Holly Johnson · Senior Product Designer & Design Systems Lead",
        footer="Portfolio",
        title_size=52,
        wordmark=False,
    ),
    dict(
        name="resume.png",
        kicker="Resume",
        title=["Holly Johnson"],
        subhead="Product Designer · Design Systems Lead",
        footer="Lincoln, Nebraska",
        wordmark=False,
    ),
]


if __name__ == "__main__":
    ensure_fonts()
    for spec in CARDS:
        card(**spec)
