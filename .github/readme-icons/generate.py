#!/usr/bin/env python3
"""Generate the README-only card icons from each app's CA icon.

Shown ONLY in the root README cards (NOT the Community Applications icons at
``<app>/icon.png``). Convention (jdp 2026-08-04): NO baked white background and
NO light corners. Each logo either keeps its own brand tile (full-bleed colour)
or sits transparent, filling the icon, with transparent rounded corners.

Modes per app:
  TILE      - the CA icon is already a full-bleed brand tile (krusader, euro-office,
              featherdrop, opencloud, stellarium): keep it, just guarantee
              transparent rounded corners (no white peeking at the corners).
  FILL      - a logo mark on a removable background (bombvault, bombvaultwidget,
              standardnotes-*): flood-fill the OUTER background to transparent
              (inner white, e.g. inside the Standard Notes frame, is kept), crop
              to the logo and scale it to fill the tile - no white left over.
  KEEP      - matrix, n8n, openhands, jdownloader, prusaslicer: colourful/dark
              marks that still read best on a clean white tile (no light-corner
              problem) - left on a white rounded tile.
  opencloud - special: rebuild on the OpenCloud petrol tile (#20434F) with the
              lavender logo enlarged (jdp: "logo viel groesser + CI colours").

ShipLog + FireSquire are excluded (theme-flipping <picture> pairs from their own
SVG masters). Usage: python .github/readme-icons/generate.py   (requires Pillow)
"""
import os
from collections import deque
from PIL import Image, ImageDraw

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.normpath(os.path.join(HERE, "..", ".."))

TILE = {"krusader", "euro-office", "featherdrop", "opencloud", "stellarium", "seaweedfs"}
FILL = {"bombvault", "bombvaultwidget", "standardnotes-server", "standardnotes-webui"}
KEEP = {"matrix", "n8n", "openhands", "jdownloader", "prusaslicer", "couchdb", "garage"}
ALL = sorted(TILE | FILL | KEEP)

OC_PETROL = (32, 67, 79, 255)     # #20434F
OC_LAVENDER = (226, 186, 255, 255)  # #E2BAFF
FILL_FRAC = 0.98    # logo fills ~all of the tile
KEEP_FILL = 0.80    # white-tile marks keep a small margin


def corner_ratio():
    """Krusader's corner radius as a fraction of width (the house reference)."""
    k = Image.open(os.path.join(ROOT, "krusader", "icon.png")).convert("RGBA")
    bb = k.split()[3].getbbox()
    bw = bb[2] - bb[0]
    px = k.load()
    rad = 0
    for x in range(bb[0], bb[2]):
        if px[x, bb[1] + 1][3] > 128:
            rad = x - bb[0]
            break
    r = rad / bw if bw else 0.141
    return r if 0.05 <= r <= 0.45 else 0.141


def rounded(im, ratio):
    w, h = im.size
    rr = int(round(ratio * w))
    ss = 4
    big = Image.new("L", (w * ss, h * ss), 0)
    ImageDraw.Draw(big).rounded_rectangle([0, 0, w * ss - 1, h * ss - 1], radius=rr * ss, fill=255)
    mask = big.resize((w, h), Image.LANCZOS)
    # intersect with existing alpha so we never turn transparent pixels opaque
    a = im.split()[3]
    im.putalpha(Image.composite(a, Image.new("L", (w, h), 0), mask))
    return im


def flood_outer_transparent(im, tol=32):
    """Flood-fill the border-connected background colour to transparent (keeps inner regions)."""
    im = im.convert("RGBA")
    w, h = im.size
    px = im.load()
    bg = px[0, 0]

    def match(c):
        return c[3] > 0 and abs(c[0] - bg[0]) <= tol and abs(c[1] - bg[1]) <= tol and abs(c[2] - bg[2]) <= tol

    seen = bytearray(w * h)
    dq = deque()
    for x in range(w):
        dq.append((x, 0)); dq.append((x, h - 1))
    for y in range(h):
        dq.append((0, y)); dq.append((w - 1, y))
    while dq:
        x, y = dq.pop()
        i = y * w + x
        if seen[i]:
            continue
        seen[i] = 1
        c = px[x, y]
        if not match(c):
            continue
        px[x, y] = (c[0], c[1], c[2], 0)
        if x > 0: dq.append((x - 1, y))
        if x < w - 1: dq.append((x + 1, y))
        if y > 0: dq.append((x, y - 1))
        if y < h - 1: dq.append((x, y + 1))
    return im


def autocrop(im):
    bb = im.split()[3].getbbox()
    return im.crop(bb) if bb else im


def fit_center(logo, size, frac):
    w = h = size
    canvas = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    target = int(round(size * frac))
    lw, lh = logo.size
    s = target / max(lw, lh)
    logo = logo.resize((max(1, round(lw * s)), max(1, round(lh * s))), Image.LANCZOS)
    canvas.paste(logo, ((w - logo.size[0]) // 2, (h - logo.size[1]) // 2), logo)
    return canvas


def build_opencloud(size, ratio):
    """Petrol tile + enlarged lavender OpenCloud mark."""
    src = Image.open(os.path.join(ROOT, "opencloud", "icon.png")).convert("RGBA")
    logo = autocrop(flood_outer_transparent(src))     # lavender mark on transparent
    tile = Image.new("RGBA", (size, size), OC_PETROL)
    mark = fit_center(logo, size, 0.74)               # much bigger than the ~0.55 original
    tile = Image.alpha_composite(tile, mark)
    return rounded(tile, ratio)


def main():
    ratio = corner_ratio()
    print(f"corner ratio: {ratio:.3f}")
    for app in ALL:
        src = Image.open(os.path.join(ROOT, app, "icon.png")).convert("RGBA")
        size = min(src.size)
        if app == "opencloud":
            out = build_opencloud(size, ratio)
        elif app in TILE:
            out = rounded(src.copy(), ratio)                     # keep brand tile, transparent corners
        elif app in FILL:
            logo = autocrop(flood_outer_transparent(src))        # drop outer bg, keep inner
            out = rounded(fit_center(logo, size, FILL_FRAC), ratio)
        else:  # KEEP - clean white rounded tile
            canvas = Image.new("RGBA", src.size, (255, 255, 255, 255))
            canvas = Image.alpha_composite(canvas, src)
            out = rounded(canvas, ratio)
        out.save(os.path.join(HERE, app + ".png"))
        print("wrote", app + ".png", f"({app in TILE and 'tile' or app in FILL and 'fill' or app=='opencloud' and 'opencloud' or 'keep'})")


if __name__ == "__main__":
    main()
