"""Wrap a screenshot in a browser window, proportioned from Holly's reference.

Every measurement below is a fraction of the window's width, read off that reference
(1438px wide), so the chrome stays in scale whatever the shot's size. Drawing it into
the image rather than in markup is the point: HTML chrome is a fixed pixel size and
goes out of proportion as the card shrinks.
"""
from PIL import Image, ImageDraw, ImageFilter, ImageFont
import sys

shot_path, out_path, tab_title, url = sys.argv[1:5]
shot = Image.open(shot_path).convert('RGB')
W, Hs = shot.size

F = lambda f: round(f * W)
TABBAR, TOOLBAR, SEP = F(.0292), F(.0250), max(2, F(.0014))
CHROME = TABBAR + TOOLBAR + SEP
RAD, MX = F(.0083), F(.016)
MT, MB = F(.011), F(.026)
WH = CHROME + Hs
CW, CH = W + 2*MX, MT + WH + MB

TAB_BG, TOOLBAR_BG, PILL, LINE, INK = (223,225,229), (255,255,255), (241,243,244), (219,220,221), (95,99,104)
LIGHTS = [(236,107,94), (244,191,79), (97,196,83)]

def font(px):
    for p in ('/System/Library/Fonts/SFNS.ttf', '/System/Library/Fonts/Supplemental/Arial.ttf'):
        try: return ImageFont.truetype(p, px)
        except OSError: pass
    return ImageFont.load_default()

# Transparent outside the window, so the card's own background shows through and the
# same file reads on cream and on near-black. The shadow carries its own alpha.
canvas = Image.new('RGBA', (CW, CH), (0,0,0,0))
sh = Image.new('L', (CW, CH), 0)
ImageDraw.Draw(sh).rounded_rectangle([MX, MT + F(.004), MX + W, MT + WH + F(.006)], RAD, fill=70)
shadow = Image.new('RGBA', (CW, CH), (0,0,0,0))
shadow.putalpha(sh.filter(ImageFilter.GaussianBlur(F(.011))))
canvas = Image.alpha_composite(canvas, shadow)

win = Image.new('RGB', (W, WH), TOOLBAR_BG)
d = ImageDraw.Draw(win)
d.rectangle([0, 0, W, TABBAR], fill=TAB_BG)
d.rectangle([0, TABBAR + TOOLBAR, W, TABBAR + TOOLBAR + SEP], fill=LINE)
win.paste(shot, (0, CHROME))

# Traffic lights
r = F(.0042)
for i, c in enumerate(LIGHTS):
    cx, cy = F(.0177) + i*F(.0139), F(.0160)
    d.ellipse([cx-r, cy-r, cx+r, cy+r], fill=c)

# Active tab, white and rounded into the toolbar below it
tx, tw, ty = F(.0605), F(.1676), F(.0042)
d.rounded_rectangle([tx, ty, tx+tw, TABBAR + RAD], F(.0055), fill=(255,255,255))
d.rectangle([tx, TABBAR - RAD, tx+tw, TABBAR], fill=(255,255,255))
ft = font(F(.0118))
d.text((tx + F(.0097), (ty + TABBAR)//2), tab_title, font=ft, fill=(60,64,67), anchor='lm')
d.line([tx+tw-F(.0160), (ty+TABBAR)//2 - F(.0035), tx+tw-F(.0090), (ty+TABBAR)//2 + F(.0035)], fill=INK, width=max(1,F(.0013)))
d.line([tx+tw-F(.0160), (ty+TABBAR)//2 + F(.0035), tx+tw-F(.0090), (ty+TABBAR)//2 - F(.0035)], fill=INK, width=max(1,F(.0013)))
nx, ny, nr = F(.2460), (ty+TABBAR)//2, F(.0045)          # new-tab plus
d.line([nx-nr, ny, nx+nr, ny], fill=INK, width=max(1,F(.0013)))
d.line([nx, ny-nr, nx, ny+nr], fill=INK, width=max(1,F(.0013)))

# Toolbar: back, forward, reload, then the address pill
mid = TABBAR + TOOLBAR//2
lw = max(1, F(.0015))
for i, back in ((0, True), (1, False)):
    cx = F(.0146) + i*F(.0223)
    s = 1 if back else -1
    d.line([cx + s*F(.0035), mid - F(.0045), cx - s*F(.0035), mid, cx + s*F(.0035), mid + F(.0045)], fill=INK, width=lw)
cx = F(.0591)
d.arc([cx-F(.0048), mid-F(.0048), cx+F(.0048), mid+F(.0048)], 300, 220, fill=INK, width=lw)

px0, pw, py0, ph = F(.0758), F(.8136), TABBAR + F(.0070), F(.0195)
d.rounded_rectangle([px0, py0, px0+pw, py0+ph], ph//2, fill=PILL)
lx, ly, lr = px0 + F(.0120), py0 + ph//2, F(.0030)        # padlock
d.rounded_rectangle([lx-lr, ly-lr//2, lx+lr, ly+lr+lr//2], lr//3, fill=INK)
d.arc([lx-lr+lr//3, ly-lr-lr//3, lx+lr-lr//3, ly+lr//2], 180, 360, fill=INK, width=max(1,F(.0011)))
d.text((px0 + F(.0230), ly), url, font=font(F(.0112)), fill=(60,64,67), anchor='lm')

for i in range(5):                                        # the toolbar's right-hand icons
    cx = F(.8910) + i*F(.0238)
    d.ellipse([cx-F(.0030), mid-F(.0030), cx+F(.0030), mid+F(.0030)], outline=INK, width=lw)

mask = Image.new('L', (W, WH), 0)
ImageDraw.Draw(mask).rounded_rectangle([0, 0, W-1, WH-1], RAD, fill=255)
canvas.paste(win, (MX, MT), mask)
canvas.save(out_path)
print('window', canvas.size, 'chrome', CHROME, 'ratio', round(CW/CH, 3))
