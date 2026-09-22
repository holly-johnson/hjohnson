"""Generate the 1200x630 Open Graph cards.

A card is a promise about the page behind it, so these are built from the site's
own tokens and the page's own hero copy: mono kicker, serif title, one-line
subhead, hairline rule, mono footer. Nothing here is written for the card. If a
page's hero changes, change it here too and re-run.

    python3 scripts/generate_social_cards.py

Fonts are the real ones the site loads, cached in scripts/.fonts on first run
(git-ignored). Rendering with Arial instead is what made the previous set look
like a different website.

Type is the site's, not an approximation of it. The card canvas is 1200px and
the site's content column is max-w-6xl, so the case-study hero's px values carry
over one to one: text-label-lg kicker at 0.14em, text-display title at
leading-[1.05] and tracking-[-0.02em], text-hero subhead at leading-[1.3].
Every size, leading, tracking and color below cites the token or the utility it
comes from. Lines are placed on CSS line boxes and drawn from the baseline, the
way a browser does it, because stacking ascender boxes by eye is what made the
spacing look arbitrary.
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

# Type steps, straight from styles.css. The name is the token name.
TEXT_CAPTION = 11
TEXT_LABEL_SM = 12
TEXT_LABEL = 12
TEXT_LABEL_LG = 13
TEXT_SM = 16
TEXT_WORDMARK = 18
TEXT_HERO = 26
TEXT_3XL = 38
TEXT_DISPLAY = 68

# A type step that sets font-size alone inherits Tailwind's 1.5, which is what
# the rendered page reports for every mono label: 13px kicker on a 19.5px line
# box, 11px caption on 16.5. Measured in the browser, not assumed, because the
# font's own ascent plus descent is 2.5px shorter and everything under a label
# then sits high.
DEFAULT_LEADING = 1.5

# Tailwind spacing, in px, as the hero templates use it.
MT_1_5, MT_2, MT_3, MT_4, MT_5 = 6, 8, 12, 16, 20
GAP_3 = 12
GAP_5, GAP_X_6, GAP_Y_7, GAP_16, PL_7 = 20, 24, 28, 64, 28

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


def metrics(typeface: ImageFont.FreeTypeFont, size: int, leading: float | None):
    """CSS line box for one line: its height, and the baseline inside it.

    A browser builds the box from font-size x line-height, then centres the
    font's own ascent and descent in it. `leading=None` is line-height: normal,
    which is the font's natural ascent plus descent.
    """
    ascent, descent = typeface.getmetrics()
    natural = ascent + descent
    height = round(size * (DEFAULT_LEADING if leading is None else leading))
    return height, (height - natural) / 2 + ascent


def draw_line(
    draw: ImageDraw.ImageDraw,
    x: int,
    top: float,
    text: str,
    typeface: ImageFont.FreeTypeFont,
    size: int,
    fill: str,
    leading: float | None = None,
    tracking: float = 0.0,
    anchor_right: int | None = None,
) -> float:
    """Draw one line into its line box and return the bottom of that box.

    `tracking` is in em, the way the templates write it, and Pillow has no
    setting for it, so a tracked line is drawn a character at a time. The site's
    display type carries tracking-[-0.02em] and its mono labels carry 0.08em to
    0.14em; without either, the card reads as a different typeface.
    """
    height, baseline = metrics(typeface, size, leading)
    y = top + baseline
    space = tracking * size

    if not space and anchor_right is None:
        draw.text((x, y), text, fill=fill, font=typeface, anchor="ls")
        return top + height

    if anchor_right is not None:
        width = sum(typeface.getlength(ch) + space for ch in text) - space
        x = anchor_right - round(width)
    for ch in text:
        draw.text((x, y), ch, fill=fill, font=typeface, anchor="ls")
        x += typeface.getlength(ch) + space
    return top + height


def line_width(typeface: ImageFont.FreeTypeFont, size: int, text: str, tracking: float) -> float:
    space = tracking * size
    return sum(typeface.getlength(ch) + space for ch in text) - (space if text else 0)


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


# The hero's side rail: lg:grid-cols-[minmax(0,1fr)_300px] with gap-16, and the
# rail itself is border-l with pl-7.
RAIL_COLUMN = 300
RAIL_RULE_X = WIDTH - MARGIN - RAIL_COLUMN
RAIL_X = RAIL_RULE_X + PL_7
RAIL_WIDTH = WIDTH - MARGIN - RAIL_X

RULE_Y = 522
WORDMARK_TOP = 56

# The hero block is centred in the field between the wordmark and the footer
# rule, so a one-line card and a three-line card both sit in the middle of the
# space they have. A fixed top left short cards floating; hanging them off the
# rule pushed them low.
FIELD_TOP = WORDMARK_TOP + round(TEXT_WORDMARK * DEFAULT_LEADING)


def tracked_wrap(text: str, typeface: ImageFont.FreeTypeFont, size: int, tracking: float, width: int) -> list[str]:
    """Wrap on the tracked width, since letter-spacing is part of the measure."""
    lines: list[str] = []
    line = ""
    for word in text.split():
        candidate = f"{line} {word}".strip()
        if line_width(typeface, size, candidate, tracking) <= width or not line:
            line = candidate
        else:
            lines.append(line)
            line = word
    if line:
        lines.append(line)
    return lines


def stats_rail(draw: ImageDraw.ImageDraw, stats: list[tuple[str, str]], hero_top: float) -> float:
    """The hero's stat block: dl grid-cols-2, gap-x-6 gap-y-7.

    Serif number at text-3xl leading-none, mono caption at text-caption beneath
    it with mt-2 and tracking-[0.1em], exactly as the case-study heroes set it.
    A caption longer than its column wraps rather than running into the next
    one, which is what the grid does on the page.
    """
    column = (RAIL_WIDTH - GAP_X_6) // 2
    caption = mono(TEXT_CAPTION)
    caption_box = metrics(caption, TEXT_CAPTION, None)[0]
    number_box = metrics(serif(TEXT_3XL), TEXT_3XL, 1.0)[0]

    rows = [stats[i : i + 2] for i in range(0, len(stats), 2)]
    top = hero_top + 4
    for row in rows:
        wrapped = [tracked_wrap(label.upper(), caption, TEXT_CAPTION, 0.1, column) for _, label in row]
        for index, (value, _) in enumerate(row):
            x = RAIL_X + index * (column + GAP_X_6)
            y = draw_line(draw, x, top, value, serif(TEXT_3XL), TEXT_3XL, FOREGROUND, leading=1.0) + MT_2
            for line in wrapped[index]:
                y = draw_line(draw, x, y, line, caption, TEXT_CAPTION, MUTED, tracking=0.1)
        top += number_box + MT_2 + max(len(w) for w in wrapped) * caption_box + GAP_Y_7
    return top - GAP_Y_7


def terms_rail(draw: ImageDraw.ImageDraw, terms: list[tuple[str, str]], hero_top: float) -> float:
    """The research hero's rail: mono term at text-label-sm, text-sm beneath.

    Spacing is the template's: mt-1.5 under the term, gap-5 between groups.
    """
    top = hero_top + 4
    for term, definition in terms:
        top = draw_line(
            draw, RAIL_X, top, term.upper(), mono(TEXT_LABEL_SM), TEXT_LABEL_SM, MUTED, tracking=0.14
        )
        top += MT_1_5
        for line in wrap(definition, sans(TEXT_SM), RAIL_WIDTH):
            top = draw_line(draw, RAIL_X, top, line, sans(TEXT_SM), TEXT_SM, FOREGROUND, leading=1.625)
        top += GAP_5
    return top - GAP_5


def card(
    name: str,
    kicker: str,
    title: list[str],
    subhead: str,
    footer: str,
    title_size: int = TEXT_DISPLAY,
    title_leading: float = 1.05,
    kicker_tracking: float = 0.14,
    kicker_gap: int = MT_5,
    subhead_gap: int = MT_3,
    stats: list[tuple[str, str]] | None = None,
    terms: list[tuple[str, str]] | None = None,
    wordmark: bool = True,
) -> None:
    image = Image.new("RGB", (WIDTH, HEIGHT), BACKGROUND)
    draw = ImageDraw.Draw(image)

    has_rail = bool(stats or terms)
    column = (RAIL_RULE_X - GAP_16 - MARGIN) if has_rail else (WIDTH - 2 * MARGIN)

    # Wordmark, the nav's own lockup: font-serif text-wordmark tracking-[-0.01em].
    # The resume card's title is already her name, so it would say it twice.
    if wordmark:
        draw_line(
            draw,
            MARGIN,
            WORDMARK_TOP,
            "Holly Johnson",
            serif(TEXT_WORDMARK),
            TEXT_WORDMARK,
            FOREGROUND,
            tracking=-0.01,
        )

    # Measure the block before drawing any of it, so it can hang off the rule.
    kicker_box = metrics(mono(TEXT_LABEL_LG), TEXT_LABEL_LG, None)[0]
    title_box = metrics(serif(title_size), title_size, title_leading)[0]
    subhead_lines = wrap(subhead, sans(TEXT_HERO), column)
    subhead_box = metrics(sans(TEXT_HERO), TEXT_HERO, 1.3)[0]
    block = (
        kicker_box
        + kicker_gap
        + len(title) * title_box
        + subhead_gap
        + len(subhead_lines) * subhead_box
    )
    hero_top = FIELD_TOP + (RULE_Y - FIELD_TOP - block) / 2
    if hero_top < FIELD_TOP:
        raise SystemExit(f"{name}: the text block is taller than the field it sits in")

    # Hero: kicker, then the title, then the subhead, at each page's own gaps.
    top = draw_line(
        draw,
        MARGIN,
        hero_top,
        kicker.upper(),
        mono(TEXT_LABEL_LG),
        TEXT_LABEL_LG,
        MUTED,
        tracking=kicker_tracking,
    )
    top += kicker_gap

    for line in title:
        if line_width(serif(title_size), title_size, line, -0.02) > column:
            raise SystemExit(f"{name}: title line does not fit the column: {line!r}")
        top = draw_line(
            draw,
            MARGIN,
            top,
            line,
            serif(title_size),
            title_size,
            FOREGROUND,
            leading=title_leading,
            tracking=-0.02,
        )
    top += subhead_gap

    for line in subhead_lines:
        top = draw_line(draw, MARGIN, top, line, sans(TEXT_HERO), TEXT_HERO, FOREGROUND, leading=1.3)

    if stats:
        rail_bottom = stats_rail(draw, stats, hero_top)
    elif terms:
        rail_bottom = terms_rail(draw, terms, hero_top)
    if has_rail:
        # The hero rail's border-l, at the same hairline weight as the footer
        # rule. It runs the height of the rail's own content, nothing further.
        draw.line((RAIL_RULE_X, round(hero_top), RAIL_RULE_X, round(rail_bottom)), fill=BORDER, width=1)

    # Mono label over a hairline rule, the site's section-label convention.
    draw.line((MARGIN, RULE_Y, WIDTH - MARGIN, RULE_Y), fill=BORDER, width=1)
    draw_line(draw, MARGIN, 544, footer.upper(), mono(TEXT_LABEL), TEXT_LABEL, MUTED, tracking=0.14)
    draw_line(
        draw,
        0,
        544,
        "hollyjohnson.design",
        mono(TEXT_LABEL),
        TEXT_LABEL,
        PRIMARY,
        tracking=0.14,
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
        title_leading=1.14,
        kicker_tracking=0.08,
        kicker_gap=GAP_3,
        subhead_gap=MT_4,
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
        title_leading=1.1,
        wordmark=False,
    ),
    dict(
        name="resume.png",
        kicker="Resume",
        title=["Holly Johnson"],
        subhead="Product Designer · Design Systems Lead",
        footer="Lincoln, Nebraska",
        title_leading=1.1,
        wordmark=False,
    ),
]


if __name__ == "__main__":
    ensure_fonts()
    for spec in CARDS:
        card(**spec)
