/**
 * Feed wrapper banners to the GitHub style guide (the krusader layout):
 *   logo (the app MARK) LEFT, largest ink ~400px, ink-left x=165, ink-vcentre y=250;
 *   the NAME to its right (the official wordmark artwork where the app has one, else the
 *   house font Bree Serif) at the standard size; ONE Lato claim (grey, 44) below the name;
 *   name+claim group vertically centred on H/2. 1600x500 theme-flip pair.
 *
 * MARK  = each app's icon.svg (white background stripped -> transparent).
 * NAME  = official wordmark lifted from assets/logo-src.svg where one exists
 *         (couchdb, openhands, standardnotes), else Bree Serif text. Long names auto-fit
 *         to keep a ~120px right margin.
 * CLAIM = Lato, grey, target 44 (fitClaim steps down only to dodge a NaN-glyph size).
 *
 * Text is rendered at the ORIGIN and positioned with a <g transform> so opentype.js never
 * emits NaN control points at large coordinates. Deps (global): opentype.js, @resvg/resvg-js.
 * Run: node .github/gen-wrapper-banners.mjs [slug...]
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

// name: {wordmark:true} lifts the official wordmark from logo-src; {text:"..."} = Bree Serif.
// nameLight/nameDark: wordmark/text ink colour per theme (brand colour kept where the app has one).
const APPS = [
  { slug: "couchdb", name: { wordmark: true }, nameLight: "#1f2328", nameDark: "#e6edf3",
    claim: "Relax. Your data syncs itself." },
  { slug: "openhands", name: { wordmark: true }, nameLight: "#0b0b0b", nameDark: "#e6edf3",
    markFromLogoSrc: true, markDark: { 'stroke="black"': 'stroke="#e6edf3"' },
    claim: "Your tireless junior dev, self-hosted." },
  { slug: "standardnotes-server", name: { wordmark: true }, nameLight: "#1C6EE0", nameDark: "#4d94ff",
    claim: "Notes even we can't read." },
  { slug: "standardnotes-webui", name: { wordmark: true }, nameLight: "#1C6EE0", nameDark: "#4d94ff",
    claim: "Notes even we can't read." },
  { slug: "n8n", name: { text: "n8n" }, nameLight: "#1f2328", nameDark: "#e6edf3",
    claim: "Wire up everything, babysit nothing." },
  { slug: "euro-office", name: { text: "Euro Office" }, nameLight: "#1f2328", nameDark: "#e6edf3",
    claim: "Docs, sheets and slides, served not surveilled." },
];
const ONLY = process.argv.slice(2);
const RUN = ONLY.length ? APPS.filter((a) => ONLY.includes(a.slug)) : APPS;

async function font(file, url) {
  const p = join(tmpdir(), file);
  if (!existsSync(p)) { const r = await fetch(url); if (!r.ok) throw new Error(`${file} ${r.status}`); writeFileSync(p, Buffer.from(await r.arrayBuffer())); }
  const b = readFileSync(p);
  return opentype.parse(b.buffer.slice(b.byteOffset, b.byteOffset + b.byteLength));
}
const bree = await font("jdp-BreeSerif-Regular.ttf", "https://github.com/google/fonts/raw/main/ofl/breeserif/BreeSerif-Regular.ttf");
const lato = await font("jdp-Lato-Regular.ttf", "https://github.com/google/fonts/raw/main/ofl/lato/Lato-Regular.ttf");
const sc = (f, s) => s / f.unitsPerEm;
function fitClaim(text, maxW, cap) {
  let size = Math.min(cap, Math.floor((100 * maxW) / lato.getAdvanceWidth(text, 100)));
  for (; size > 10; size--) if (!lato.getPath(text, 0, 0, size).toPathData(2).includes("NaN")) return size;
  return 10;
}

const W = 1600, H = 500, LOGO_INK = 400, LOGO_X = 165, GAP_LOGO_TEXT = 70, GAP_NAME_CLAIM = 16;
const NAME_SIZE = 132, WORDMARK_H = 132, CLAIM_CAP = 44, RIGHT_PAD = 120;

const bbox = (svg) => new Resvg(svg, { fitTo: { mode: "original" } }).getBBox();
const stripBg = (s) => s
  .replace(/<rect\b[^>]*\bfill="#(?:fff|ffffff|FFF|FFFFFF)"[^>]*\/?>(?:<\/rect>)?/g, "")
  .replace(/<rect\b[^>]*\bfill="white"[^>]*\/?>(?:<\/rect>)?/g, "");
const inner = (s) => s.replace(/^[\s\S]*?<svg[^>]*>/, "").replace(/<\/svg>\s*$/, "");
const vbOf = (s) => { const m = s.match(/viewBox="([\d.\-]+)\s+([\d.\-]+)\s+([\d.]+)\s+([\d.]+)"/); return m ? { x: +m[1], y: +m[2], w: +m[3], h: +m[4] } : { x: 0, y: 0, w: 512, h: 512 }; };

function markOf(app) {
  const slug = app.slug;
  // openhands icon.svg is a black-hands variant; take the brand (yellow) hands from
  // logo-src instead = every path that is NOT a fill="black" wordmark letter.
  if (app.markFromLogoSrc && slug === "openhands") {
    const src = readFileSync(join(ROOT, slug, "assets", "logo-src.svg"), "utf8");
    const hands = [...src.matchAll(/<path\b[^>]*\/>/g)].map((m) => m[0]).filter((p) => !/\bfill="black"/.test(p)).join("");
    // the outline paths carry no fill and rely on the source's parent fill="none";
    // wrap so they stay stroke-only (unfilled) instead of defaulting to black.
    return { content: `<g fill="none">${hands}</g>`, vb: { x: 0, y: 0, w: 195, h: 30 } };
  }
  const cand = [join(ROOT, slug, "icon.svg"), join(ROOT, slug, "assets", "icon.svg")];
  const p = cand.find((c) => existsSync(c));
  if (!p) throw new Error("no icon.svg for " + slug);
  const s = readFileSync(p, "utf8");
  return { content: stripBg(inner(s)), vb: vbOf(s) };
}

// official wordmark lifted from logo-src.svg (COLOR placeholder recoloured per theme)
function wordmarkOf(slug) {
  const src = readFileSync(join(ROOT, slug, "assets", "logo-src.svg"), "utf8");
  if (slug === "couchdb") {
    const d = src.match(/<path\s+d="([^"]+)"\s+fill="#444444"/i)[1];
    return { content: `<path d="${d}" fill="COLOR"/>`, vb: { x: 0, y: 0, w: 512, h: 132 } };
  }
  if (slug === "openhands") {
    const in1 = inner(src.replace(/^[\s\S]*?(<svg[^>]*viewBox="0 0 195 30"[^>]*>)/, "$1"));
    const letters = [...in1.matchAll(/<path\b[^>]*\bfill="black"[^>]*\/>/g)].map((m) => m[0].replace(/fill="black"/, 'fill="COLOR"')).join("");
    return { content: letters, vb: { x: 0, y: 0, w: 195, h: 30 } };
  }
  if (slug.startsWith("standardnotes")) {
    const gs = [...src.matchAll(/<g\b[\s\S]*?<\/g>/g)].map((m) => m[0]);
    return { content: gs[1].replace(/fill="#1C6EE0"/gi, 'fill="COLOR"'), vb: { x: 0, y: 0, w: 1200, h: 360 } };
  }
  throw new Error("no wordmark extractor for " + slug);
}

const THEMES = [
  { suf: "", bg: "#ffffff", claim: "#5a5d5e", dark: false },
  { suf: "-dark", bg: "#0d1117", claim: "#9aa4ad", dark: true },
];
function emit(dir, name, svg, bg) {
  writeFileSync(join(dir, `${name}.svg`), svg);
  writeFileSync(join(dir, `${name}.png`), new Resvg(svg, { background: bg, fitTo: { mode: "original" } }).render().asPng());
}

for (const app of RUN) {
  const dir = join(ROOT, app.slug, "assets");
  const mark = markOf(app);

  // mark: largest ink -> LOGO_INK, ink-left at LOGO_X, ink-vcentre at H/2
  const mb = bbox(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="${mark.vb.x} ${mark.vb.y} ${mark.vb.w} ${mark.vb.h}">${mark.content}</svg>`);
  const sM = LOGO_INK / Math.max(mb.width, mb.height);
  const markW = mb.width * sM, markH = mb.height * sM;
  const markTX = LOGO_X - mb.x * sM, markTY = H / 2 - markH / 2 - mb.y * sM;
  const textX = LOGO_X + markW + GAP_LOGO_TEXT;
  const maxNameW = W - textX - RIGHT_PAD;

  // name: wordmark artwork (ink height WORDMARK_H, width-capped) OR Bree Serif text (size-fit)
  let nameH, nameW, placeName;
  if (app.name.wordmark) {
    const wm = wordmarkOf(app.slug);
    const wb = bbox(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="${wm.vb.x} ${wm.vb.y} ${wm.vb.w} ${wm.vb.h}">${wm.content.replace(/COLOR/g, "#000")}</svg>`);
    let sN = WORDMARK_H / wb.height;
    if (wb.width * sN > maxNameW) sN = maxNameW / wb.width;
    nameH = wb.height * sN; nameW = wb.width * sN;
    placeName = (color, nameTop) => `<g transform="translate(${(textX - wb.x * sN).toFixed(2)},${(nameTop - wb.y * sN).toFixed(2)}) scale(${sN.toFixed(5)})">${wm.content.replace(/COLOR/g, color)}</g>`;
  } else {
    let ns = NAME_SIZE;
    const adv = bree.getAdvanceWidth(app.name.text, ns);
    if (adv > maxNameW) ns = Math.floor(ns * maxNameW / adv);
    const cb = bbox(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 4000 600"><path d="${bree.getPath(app.name.text, 0, 400, ns).toPathData(2)}" fill="#000"/></svg>`);
    nameH = cb.height; nameW = cb.width;
    // render the name at the origin baseline, translate into place (NaN-safe)
    const d = bree.getPath(app.name.text, 0, 0, ns).toPathData(2);
    const inkTopAtOrigin = cb.y - 400; // cb measured with baseline at y=400
    placeName = (color, nameTop) => `<g transform="translate(${textX.toFixed(2)},${(nameTop - inkTopAtOrigin).toFixed(2)})"><path d="${d}" fill="${color}"/></g>`;
  }

  // claim (rendered at origin, translated) + vertical centring of the name/claim group
  const claimSize = fitClaim(app.claim, maxNameW, CLAIM_CAP);
  const claimAsc = lato.ascender * sc(lato, claimSize), claimDesc = -lato.descender * sc(lato, claimSize);
  const groupH = nameH + GAP_NAME_CLAIM + claimAsc + claimDesc;
  const top = H / 2 - groupH / 2;
  const claimBaseline = Math.round(top + nameH + GAP_NAME_CLAIM + claimAsc);
  const claimD = lato.getPath(app.claim, 0, 0, claimSize).toPathData(2);

  for (const t of THEMES) {
    let markContent = mark.content;
    if (t.dark && app.markDark) for (const [from, to] of Object.entries(app.markDark)) markContent = markContent.split(from).join(to);
    const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="${app.slug}">
  <rect width="${W}" height="${H}" fill="${t.bg}"/>
  <g transform="translate(${markTX.toFixed(2)},${markTY.toFixed(2)}) scale(${sM.toFixed(5)})">${markContent}</g>
  ${placeName(t.dark ? app.nameDark : app.nameLight, top)}
  <g transform="translate(${textX.toFixed(2)},${claimBaseline})"><path d="${claimD}" fill="${t.claim}"/></g>
</svg>
`;
    emit(dir, `banner${t.suf}`, svg, t.bg);
  }
  console.log(`${app.slug}: mark->${markW.toFixed(0)}x${markH.toFixed(0)} | name ${nameW.toFixed(0)}x${nameH.toFixed(0)} @${textX.toFixed(0)} | claim ${claimSize} | rmargin ${(W - textX - nameW).toFixed(0)}`);
}
