/**
 * Wrapper-app banners for the feed, to the GitHub style guide:
 *   <app>/assets/banner.png       light  (dark logo/text on #ffffff)
 *   <app>/assets/banner-dark.png  dark   (light logo/text on #0d1117)
 * Layout mirrors the own-repo banners (krusader): logo left, wordmark + ONE
 * cheeky claim (Lato, grey) stacked to its right, the text block vertically
 * centred on H/2. 1600x500. Logo embedded verbatim from <app>/assets/icon.svg.
 * Deps (global): opentype.js, @resvg/resvg-js. Run: node .github/gen-wrapper-banners.mjs [slug...]
 */
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { tmpdir } from "node:os";
import { createRequire } from "node:module";
import { execSync } from "node:child_process";

const require = createRequire(import.meta.url);
const groot = execSync("npm root -g").toString().trim();
const opentype = require(`${groot}/opentype.js`);
const { Resvg } = require(`${groot}/@resvg/resvg-js`);
const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

// ---- config: one entry per wrapper app -----------------------------------
// nameFont: "bree" (house serif) | "reuse" (lift wordmark paths from the
//   existing banner.svg, keeping the app's official font)
// logoDark: optional {from:to} colour swaps applied ONLY to the dark banner's
//   logo (e.g. a near-black wordmark part that would vanish on #0d1117).
const APPS = [
  {
    slug: "euro-office", name: "Euro Office", nameFont: "bree",
    claim: "Docs, sheets and slides, served not surveilled.",
  },
  // reuse: keep the app's official logo + wordmark artwork verbatim from the
  // existing banner.svg (bg/border rects stripped); logoDark = literal colour
  // swaps applied ONLY to the dark banner (near-black ink -> light).
  {
    slug: "openhands", reuse: true, claim: "Your tireless junior dev, self-hosted.",
    logoDark: { '"black"': '"#e6edf3"' },
  },
  {
    slug: "n8n", reuse: true, claim: "Wire up everything, babysit nothing.",
  },
  {
    slug: "couchdb", reuse: true, claim: "Sit back, your data syncs itself.",
    logoDark: { '"#444444"': '"#e6edf3"', '"#777777"': '"#9aa4ad"' },
  },
  {
    slug: "standardnotes-server", reuse: true, claim: "Notes even we can't read.",
  },
  {
    slug: "standardnotes-webui", reuse: true, claim: "Notes even we can't read.",
  },
];
const ONLY = process.argv.slice(2);
const RUN = ONLY.length ? APPS.filter(a => ONLY.includes(a.slug)) : APPS;

// ---- fonts (OFL, fetched to tmp, never committed) -------------------------
async function font(file, url) {
  const p = join(tmpdir(), file);
  if (!existsSync(p)) {
    const r = await fetch(url);
    if (!r.ok) throw new Error(`${file} fetch ${r.status}`);
    writeFileSync(p, Buffer.from(await r.arrayBuffer()));
  }
  const b = readFileSync(p);
  return opentype.parse(b.buffer.slice(b.byteOffset, b.byteOffset + b.byteLength));
}
const bree = await font("jdp-BreeSerif-Regular.ttf", "https://github.com/google/fonts/raw/main/ofl/breeserif/BreeSerif-Regular.ttf");
const lato = await font("jdp-Lato-Regular.ttf", "https://github.com/google/fonts/raw/main/ofl/lato/Lato-Regular.ttf");

const sc = (f, s) => s / f.unitsPerEm;
function fitSize(f, text, maxW, cap) {
  let size = Math.min(cap, Math.floor((100 * maxW) / f.getAdvanceWidth(text, 100)));
  for (; size > 10; size--) {
    if (!f.getPath(text, 0, 0, size).toPathData(2).includes("NaN")) return size;
  }
  throw new Error("no NaN-free size for " + text);
}

// Embed an icon.svg verbatim: strip the outer <svg>, keep inner markup, and
// rename ids so multiple embeds / themes never collide.
function embedIcon(svgPath, uid) {
  let s = readFileSync(svgPath, "utf8");
  const vb = s.match(/viewBox="([\d.\-]+)\s+([\d.\-]+)\s+([\d.]+)\s+([\d.]+)"/);
  const vw = vb ? parseFloat(vb[3]) : 512, vh = vb ? parseFloat(vb[4]) : 512;
  let inner = s.replace(/^[\s\S]*?<svg[^>]*>/, "").replace(/<\/svg>\s*$/, "");
  // namespace ids (defs) so two embeds don't clash
  const ids = [...inner.matchAll(/\bid="([^"]+)"/g)].map(m => m[1]);
  for (const id of ids) {
    const re = new RegExp(`(["(#])${id}([")])`, "g");
    inner = inner.replace(re, `$1${uid}-${id}$2`);
  }
  return { inner, vw, vh };
}

const THEMES = [
  { suf: "",      bg: "#ffffff", name: "#1f2328", claim: "#5a5d5e", dark: false },
  { suf: "-dark", bg: "#0d1117", name: "#e6edf3", claim: "#9aa4ad", dark: true  },
];

const W = 1600, H = 500;
const LOGO_H = 400, LOGO_X = 165, GAP_LOGO_TEXT = 70, RIGHT_PAD = 120, GAP_NAME_CLAIM = 8;

function emit(dir, name, svg, bg) {
  writeFileSync(join(dir, `${name}.svg`), svg);
  const png = new Resvg(svg, { background: bg, fitTo: { mode: "original" } }).render().asPng();
  writeFileSync(join(dir, `${name}.png`), png);
}

// Reuse an app's existing official logo+wordmark artwork: strip the background /
// border rects, measure the tight content bbox, then centre it on a 1600x500
// theme-flip canvas with the cheeky claim below.
function reuseBanner(app) {
  const dir = join(ROOT, app.slug, "assets");
  // read the untouched official artwork from logo-src.svg so re-runs never
  // reprocess the generated banner (output != source)
  let src = readFileSync(join(dir, "logo-src.svg"), "utf8");
  const vb = src.match(/viewBox="([\d.\-]+)\s+([\d.\-]+)\s+([\d.]+)\s+([\d.]+)"/);
  const sw = parseFloat(vb[3]), sh = parseFloat(vb[4]);
  let inner = src.replace(/^[\s\S]*?<svg[^>]*>/, "").replace(/<\/svg>\s*$/, "");
  // drop background + any border rects (never draw border lines)
  inner = inner.replace(/<rect\b[^>]*\bfill="#[fF]{6}"[^>]*\/>/g, "");
  inner = inner.replace(/<rect\b[^>]*\bstroke="[^"]*"[^>]*\/>/g, "");

  // tight content bbox in source-viewBox coords
  const probe = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${sw} ${sh}" width="${sw}" height="${sh}">${inner}</svg>`;
  const bb = new Resvg(probe, { fitTo: { mode: "original" } }).getBBox();
  if (!bb) throw new Error("no bbox for " + app.slug);

  const targetH = 210, GAP = 34, SIDE = 150;
  let k = targetH / bb.height;
  if (bb.width * k > W - 2 * SIDE) k = (W - 2 * SIDE) / bb.width;
  const artW = bb.width * k, artH = bb.height * k;

  const claimSize = fitSize(lato, app.claim, W - 2 * SIDE, 46);
  const claimAsc = lato.ascender * sc(lato, claimSize);
  const claimDesc = -lato.descender * sc(lato, claimSize);
  const groupH = artH + GAP + claimAsc + claimDesc;
  const top = H / 2 - groupH / 2;
  const tx = SIDE - bb.x * k;                     // left-anchor visible content (krusader reference)
  const ty = top - bb.y * k;
  const claimBaseline = Math.round(top + artH + GAP + claimAsc);
  const claimPath = lato.getPath(app.claim, SIDE, claimBaseline, claimSize).toPathData(2);

  for (const t of THEMES) {
    let art = inner;
    if (t.dark && app.logoDark) for (const [from, to] of Object.entries(app.logoDark)) art = art.split(from).join(to);
    const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="${app.slug}">
  <rect width="${W}" height="${H}" fill="${t.bg}"/>
  <g transform="translate(${tx.toFixed(2)},${ty.toFixed(2)}) scale(${k.toFixed(5)})">${art}</g>
  <path d="${claimPath}" fill="${t.claim}"/>
</svg>
`;
    emit(dir, `banner${t.suf}`, svg, t.bg);
  }
  console.log(`${app.slug}: reuse banner + dark (bbox ${bb.width.toFixed(0)}x${bb.height.toFixed(0)} -> ${artW.toFixed(0)}x${artH.toFixed(0)}, claim ${claimSize}px)`);
}

for (const app of RUN) {
  if (app.reuse) { reuseBanner(app); continue; }
  const dir = join(ROOT, app.slug, "assets");
  const { inner, vw, vh } = embedIcon(join(ROOT, app.slug, "icon.svg"), app.slug);
  const logoScale = LOGO_H / vh, logoW = vw * logoScale;
  const logoX = LOGO_X, logoY = (H - LOGO_H) / 2;
  const textX = logoX + logoW + GAP_LOGO_TEXT;
  const maxTextW = W - textX - RIGHT_PAD;

  const nameFnt = app.nameFont === "bree" ? bree : bree; // (only bree for now)
  const nameSize = fitSize(nameFnt, app.name, maxTextW, 132);
  const claimSize = fitSize(lato, app.claim, maxTextW, 46);

  const nameAsc = nameFnt.ascender * sc(nameFnt, nameSize);
  const nameDesc = -nameFnt.descender * sc(nameFnt, nameSize);
  const claimAsc = lato.ascender * sc(lato, claimSize);
  const claimDesc = -lato.descender * sc(lato, claimSize);
  const blockH = nameAsc + nameDesc + GAP_NAME_CLAIM + claimAsc + claimDesc;
  const top = H / 2 - blockH / 2;
  const nameBaseline = Math.round(top + nameAsc);
  const claimBaseline = Math.round(nameBaseline + nameDesc + GAP_NAME_CLAIM + claimAsc);

  // Render text as ONE <path> PER GLYPH, not a single merged path: resvg's tessellator
  // can silently abort a merged multi-subpath path partway through for certain
  // glyph/coordinate combinations (it dropped the tail of the euro-office claim),
  // and per-glyph paths sidestep that entirely.
  const glyphD = (f, text, x, baseline, size) =>
    f.getPaths(text, x, baseline, size).map((p) => p.toPathData(2)).filter(Boolean);
  const nameD = glyphD(nameFnt, app.name, textX, nameBaseline, nameSize);
  const claimD = glyphD(lato, app.claim, textX, claimBaseline, claimSize);
  const paths = (ds, fill) => ds.map((d) => `<path d="${d}" fill="${fill}"/>`).join("");

  for (const t of THEMES) {
    let logo = inner;
    if (t.dark && app.logoDark) for (const [from, to] of Object.entries(app.logoDark)) {
      logo = logo.split(from).join(to);
    }
    const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="${app.name}">
  <rect width="${W}" height="${H}" fill="${t.bg}"/>
  <g transform="translate(${logoX},${logoY}) scale(${logoScale.toFixed(4)})">${logo}</g>
  ${paths(nameD, t.name)}
  ${paths(claimD, t.claim)}
</svg>
`;
    emit(dir, `banner${t.suf}`, svg, t.bg);
  }
  console.log(`${app.slug}: banner + banner-dark (1600x500), name=${nameSize}px claim=${claimSize}px`);
}
