"""Generate the LinkedIn profile banner in the site's design language.

    python3 scripts/generate_linkedin_banner.py

Type, colour and the line-box layout come from generate_social_cards, so the
banner and the share cards are the same system rather than two things that
merely look alike.

LinkedIn renders the banner at 1584x396 and scales it down to roughly 1128px
wide on a desktop profile, so every size here is the site's step multiplied by
SCALE. Without that the mono labels land under 10px and turn to mush.

Two crops to respect, both measured against LinkedIn's own layout: the profile
photo overlaps the lower left, and a narrow window trims the sides. Everything
sits in a centred column clear of both.
"""

from __future__ import annotations

import importlib.util
import random
from pathlib import Path

from PIL import Image, ImageDraw

_spec = importlib.util.spec_from_file_location(
    "social_cards", Path(__file__).parent / "generate_social_cards.py"
)
cards = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(cards)

WIDTH, HEIGHT = 1584, 396

# The banner takes :root, not .dark. The share cards are dark because they land
# in someone else's feed; this one sits behind a profile photo and above a page
# of white LinkedIn chrome, where dark reads as a hole.
BACKGROUND = "#FAF8F4"
FOREGROUND = "#141412"
MUTED = "#5E5A54"
BORDER = "#E0DCD4"
PRIMARY = "#2F6B4F"

# The banner is displayed about 0.71x, so the site's steps are scaled back up.
SCALE = 1.5
HEADLINE = 56                                 # sized so the sentence holds one line
URL = round(cards.TEXT_LABEL * 1.35)          # 16

# The photo sits over the lower left; the safe column starts to its right.
PHOTO_KEEPOUT = 360
MARGIN = 96

OUTPUT = Path.home() / "Desktop/Portfolio/linkedin-banner.png"

# Deliberately not the homepage hero. That line is already on the share card
# in Featured, directly below this, and the titles are already in the profile
# headline between the two. This is the third line of her own summary, the
# part that says what the work is for.
# One sentence and a link. Earlier passes also carried a project list and a
# keyword strip, which made three tracked mono rows around a single serif line.
# LinkedIn already shows the name, the headline and the roles directly beneath
# this image, so anything the profile repeats is clutter the reader pays for.
HEADLINE_TEXT = "Product designer who writes the code too."
URL_TEXT = "hollyjohnson.design"

# A field, not a flat panel: near-black at the left where the profile photo
# sits, warming into the palette's greens toward the lower right. Same idea as
# the gradient she already liked, in the colours the site actually uses, since
# the old one was built on a burnt orange that is not in the palette.
GRADIENT = ["#121212", "#151515", "#1C2A22", "#245740", "#2F6B4F", "#4E9B72"]
FOCUS = (0.97, 0.86)

# A node graph over the field: points joined by hairlines, the way a design
# system actually is. Primitives into semantics into components into products.
# Placement is seeded, so the banner rebuilds identically rather than being a
# new drawing every run, and the type's own band is kept clear of nodes.
SEED = 11
NODES = 26
LINK_DISTANCE = 300
SUPERSAMPLE = 2


def ramp(t: float) -> tuple[int, int, int]:
    """Sample the gradient at 0..1, interpolating between its stops."""
    t = min(max(t, 0.0), 1.0) * (len(GRADIENT) - 1)
    low = min(int(t), len(GRADIENT) - 2)
    frac = t - low
    a, b = GRADIENT[low], GRADIENT[low + 1]
    return tuple(
        round(int(a[i : i + 2], 16) + (int(b[i : i + 2], 16) - int(a[i : i + 2], 16)) * frac)
        for i in (1, 3, 5)
    )


def field() -> Image.Image:
    """Render the gradient small and scale it up, which is both fast and smooth."""
    w, h = 158, 40
    small = Image.new("RGB", (w, h))
    fx, fy = FOCUS
    reach = ((max(fx, 1 - fx)) ** 2 + (max(fy, 1 - fy)) ** 2) ** 0.5
    pixels = []
    for y in range(h):
        for x in range(w):
            dx = (x / (w - 1) - fx) * 1.35
            dy = (y / (h - 1) - fy) * 0.55
            pixels.append(ramp(1 - (dx * dx + dy * dy) ** 0.5 / reach))
    small.putdata(pixels)
    return small.resize((WIDTH, HEIGHT), Image.BICUBIC)


def graph(image: Image.Image, keep_clear: tuple[int, int, int, int]) -> Image.Image:
    """Points joined by hairlines, drawn at 2x so the lines stay crisp."""
    rng = random.Random(SEED)
    points: list[tuple[float, float]] = []
    while len(points) < NODES:
        # Weighted right: the profile photo covers the lower left, and the
        # gradient has nothing to say over there either.
        x = WIDTH * (0.12 + 0.88 * rng.random() ** 0.7)
        y = HEIGHT * rng.random()
        left, top, right, bottom = keep_clear
        if left <= x <= right and top <= y <= bottom:
            continue
        if any((x - px) ** 2 + (y - py) ** 2 < 74 ** 2 for px, py in points):
            continue
        points.append((x, y))

    scale = SUPERSAMPLE
    overlay = Image.new("RGBA", (WIDTH * scale, HEIGHT * scale), (0, 0, 0, 0))
    pen = ImageDraw.Draw(overlay)

    for index, (x, y) in enumerate(points):
        for other_x, other_y in points[index + 1 :]:
            distance = ((x - other_x) ** 2 + (y - other_y) ** 2) ** 0.5
            if distance > LINK_DISTANCE:
                continue
            fade = (1 - distance / LINK_DISTANCE) * min(1.0, x / WIDTH + 0.25)
            pen.line(
                (x * scale, y * scale, other_x * scale, other_y * scale),
                fill=(244, 243, 241, round(60 * fade)),
                width=scale,
            )

    for x, y in points:
        fade = min(1.0, x / WIDTH + 0.3)
        radius = 3.5 * scale
        pen.ellipse(
            (x * scale - radius, y * scale - radius, x * scale + radius, y * scale + radius),
            fill=(244, 243, 241, round(150 * fade)),
        )

    overlay = overlay.resize((WIDTH, HEIGHT), Image.LANCZOS)
    return Image.alpha_composite(image.convert("RGBA"), overlay).convert("RGB")


def main() -> None:
    cards.ensure_fonts()

    x = PHOTO_KEEPOUT
    column = WIDTH - MARGIN - x
    image = graph(field(), (x - 40, 120, WIDTH - MARGIN, 280))
    draw = ImageDraw.Draw(image)

    lines = cards.wrap(HEADLINE_TEXT, cards.serif(HEADLINE), column)
    if len(lines) > 1:
        raise SystemExit("the headline wraps, which orphans the tail on a short second line")

    headline_box = cards.metrics(cards.serif(HEADLINE), HEADLINE, 1.14)[0]
    url_box = cards.metrics(cards.mono(URL), URL, None)[0]
    block = headline_box + 26 + url_box
    top = (HEIGHT - block) / 2

    top = cards.draw_line(
        draw,
        x,
        top,
        lines[0],
        cards.serif(HEADLINE),
        HEADLINE,
        "#F4F3F1",
        leading=1.14,
        tracking=-0.02,
    )
    cards.draw_line(draw, x, top + 26, URL_TEXT, cards.mono(URL), URL, "#8FC4A8", tracking=0.14)

    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    image.save(OUTPUT, "PNG", optimize=True)
    print(f"wrote {OUTPUT}")


if __name__ == "__main__":
    main()
