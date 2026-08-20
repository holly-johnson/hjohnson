"""Generate deterministic 1200x630 Open Graph cards for the portfolio."""

from pathlib import Path

from PIL import Image, ImageDraw, ImageFont


WIDTH, HEIGHT = 1200, 630
INK = "#171513"
PAPER = "#F2EEE9"
MUTED = "#C9C1B8"
ACCENT = "#B04318"
RUST = "#7A2C10"
FONT_REGULAR = "/System/Library/Fonts/Supplemental/Arial.ttf"
FONT_BOLD = "/System/Library/Fonts/Supplemental/Arial Bold.ttf"
FONT_MONO = "/System/Library/Fonts/Menlo.ttc"
OUTPUT = Path(__file__).parents[1] / "projects/portfolio/public/assets/social"


def font(path: str, size: int) -> ImageFont.FreeTypeFont:
    return ImageFont.truetype(path, size)


def base(dark: bool = False) -> tuple[Image.Image, ImageDraw.ImageDraw]:
    image = Image.new("RGB", (WIDTH, HEIGHT), INK if dark else PAPER)
    return image, ImageDraw.Draw(image)


def brand(draw: ImageDraw.ImageDraw, dark: bool = False) -> None:
    fg = PAPER if dark else INK
    box = PAPER if dark else INK
    initials = INK if dark else PAPER
    draw.rectangle((64, 56, 112, 104), fill=box)
    draw.text((76, 68), "HJ", fill=initials, font=font(FONT_MONO, 16))
    draw.text((128, 68), "Holly Johnson", fill=fg, font=font(FONT_BOLD, 20))


def footer(draw: ImageDraw.ImageDraw, label: str, dark: bool = False) -> None:
    color = MUTED if dark else "#655E57"
    draw.text((64, 560), label.upper(), fill=color, font=font(FONT_MONO, 14))


def title(draw: ImageDraw.ImageDraw, lines: list[str], subtitle: str, dark: bool = False) -> None:
    fg = PAPER if dark else INK
    y = 205
    for line in lines:
        draw.text((64, y), line, fill=fg, font=font(FONT_BOLD, 66))
        y += 72
    draw.text((68, y + 18), subtitle, fill=MUTED if dark else "#5C5248", font=font(FONT_REGULAR, 25))


def save(image: Image.Image, name: str) -> None:
    OUTPUT.mkdir(parents=True, exist_ok=True)
    image.save(OUTPUT / name, "PNG", optimize=True)


def home() -> None:
    image, draw = base(dark=True)
    brand(draw, dark=True)
    title(draw, ["Clarity for", "complex products"], "Systems that connect design, engineering, and product.", dark=True)
    # Design-to-code motif.
    draw.rectangle((828, 170, 1136, 462), outline="#655E57", width=2)
    draw.line((982, 170, 982, 462), fill="#655E57", width=2)
    for y in (225, 285, 345, 405):
        draw.line((858, y, 948, y), fill=ACCENT, width=5)
        draw.line((1016, y, 1100, y), fill="#857C74", width=3)
    draw.ellipse((963, 296, 1001, 334), fill=INK, outline=ACCENT, width=2)
    draw.text((973, 303), "↔", fill=ACCENT, font=font(FONT_REGULAR, 18))
    footer(draw, "Product designer · Design systems lead", dark=True)
    save(image, "home.png")


def helios() -> None:
    image, draw = base()
    brand(draw)
    title(draw, ["Helios"], "Design decisions, shipped as code.")
    # Layered system architecture.
    labels = ["TOKENS", "COMPONENTS", "PATTERNS", "PRODUCTS"]
    widths = [270, 230, 190, 150]
    for i, (label, width) in enumerate(zip(labels, widths)):
        x = 1080 - width
        y = 168 + i * 82
        draw.rectangle((x, y, 1136, y + 52), outline=ACCENT if i == 3 else "#B7AFA6", width=2)
        draw.text((x + 16, y + 17), label, fill=RUST, font=font(FONT_MONO, 13))
    draw.line((1002, 220, 1002, 414), fill=ACCENT, width=2)
    footer(draw, "Figma architecture → production Angular")
    save(image, "helios.png")


def investigative() -> None:
    image, draw = base()
    brand(draw)
    title(draw, ["Investigative", "Workflow Research"], "Aligning design around the work, not just the interface.")
    # A looping, branching workflow.
    nodes = [(850, 185), (1030, 185), (940, 305), (850, 425), (1030, 425)]
    edges = [(0, 1), (1, 2), (2, 3), (2, 4), (3, 0), (4, 1)]
    for a, b in edges:
        draw.line((*nodes[a], *nodes[b]), fill="#B7AFA6", width=3)
    for index, (x, y) in enumerate(nodes, start=1):
        draw.ellipse((x - 27, y - 27, x + 27, y + 27), fill=PAPER, outline=ACCENT, width=3)
        draw.text((x - 7, y - 10), str(index), fill=RUST, font=font(FONT_MONO, 15))
    draw.line((816, 500, 1080, 500), fill=ACCENT, width=5)
    draw.text((816, 516), "DOCUMENTATION PERSISTS", fill=RUST, font=font(FONT_MONO, 12))
    footer(draw, "Query · collect · analyze · map · visualize · report")
    save(image, "investigative-workflow.png")


def nucleus() -> None:
    image, draw = base()
    brand(draw)
    title(draw, ["NUcleus", "Design System"], "One system, many institutional identities.")
    colors = ["#7A2C10", "#B04318", "#D06A3D", "#171513", "#655E57", "#857C74", "#A49B92", "#C9C1B8", "#E2DDD7"]
    for index, color in enumerate(colors):
        col, row = index % 3, index // 3
        x, y = 830 + col * 98, 185 + row * 98
        draw.rectangle((x, y, x + 70, y + 70), fill=color)
    draw.rectangle((812, 167, 1112, 467), outline=INK, width=2)
    footer(draw, "9 brands · 20+ implementations · one front-end foundation")
    save(image, "nucleus.png")


def resume() -> None:
    image, draw = base(dark=True)
    brand(draw, dark=True)
    title(draw, ["Holly Johnson"], "Product Designer · Design Systems Lead", dark=True)
    draw.text((68, 390), "COMPLEX PRODUCT UX", fill=ACCENT, font=font(FONT_MONO, 15))
    draw.text((68, 425), "DESIGN SYSTEMS", fill=ACCENT, font=font(FONT_MONO, 15))
    draw.text((68, 460), "PRODUCTION IMPLEMENTATION", fill=ACCENT, font=font(FONT_MONO, 15))
    # System-to-production motif.
    for index, label in enumerate(("DESIGN", "SYSTEM", "CODE")):
        x = 820 + index * 108
        draw.rectangle((x, 260, x + 88, 348), outline="#655E57", width=2)
        draw.text((x + 14, 296), label, fill=PAPER, font=font(FONT_MONO, 11))
        if index < 2:
            draw.line((x + 88, 304, x + 108, 304), fill=ACCENT, width=3)
    footer(draw, "Lincoln, Nebraska", dark=True)
    save(image, "resume.png")


if __name__ == "__main__":
    home()
    helios()
    investigative()
    nucleus()
    resume()
