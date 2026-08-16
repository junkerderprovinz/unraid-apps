/**
 * Feed wrapper banners to the GitHub style guide (the krusader layout):
 *   logo (the app MARK) LEFT, largest ink ~400px, ink-left x=165, ink-vcentre y=250;
 *   the NAME to its right (official wordmark where the app has one, else Bree Serif) at a
 *   UNIFORM cap-height and a UNIFORM colour (foreground, brand colour NOT used for text);
 *   ONE Lato claim (grey, 44) below the name; name+claim group vcentred on H/2. Theme-flip.
 *
 * Uniform size: every name is scaled so its CAPITALS are TARGET_CAP px tall (wordmarks by
 * their first capital glyph, fonts by the font cap-height) so "CouchDB" and "n8n" read the
 * same size. Long names auto-fit down on width (keeping ~120px right margin).
 * Uniform colour: the NAME is always foreground (#1f2328 / #e6edf3); only the logo keeps
 * its brand colour.
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

const NAME_FG_LIGHT = "#1f2328", NAME_FG_DARK = "#e6edf3";
const APPS = [
  { slug: "couchdb", name: { wordmark: true }, claim: "Relax. Your data syncs itself." },
  { slug: "openhands", name: { wordmark: true }, markFromLogoSrc: true, markDark: { 'stroke="black"': 'stroke="#e6edf3"' },
    claim: "Your tireless junior dev, self-hosted." },
  { slug: "standardnotes-server", name: { wordmark: true }, claim: "Notes even we can't read." },
  { slug: "standardnotes-webui", name: { wordmark: true }, claim: "Notes even we can't read." },
  { slug: "n8n", name: { text: "n8n" }, claim: "Wire up everything, babysit nothing." },
  { slug: "euro-office", name: { text: "Euro Office" }, claim: "Docs, sheets and slides, served not surveilled." },
  { slug: "seaweedfs", name: { text: "SeaweedFS" }, claim: "Storage that keeps floating when others sink." },
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
const bbox = (svg) => new Resvg(svg, { fitTo: { mode: "original" } }).getBBox();
function fitClaim(text, maxW, cap) {
  let size = Math.min(cap, Math.floor((100 * maxW) / lato.getAdvanceWidth(text, 100)));
  for (; size > 10; size--) if (!lato.getPath(text, 0, 0, size).toPathData(2).includes("NaN")) return size;
  return 10;
}

const W = 1600, H = 500, LOGO_INK = 400, LOGO_X = 165, GAP_LOGO_TEXT = 70, GAP_NAME_CLAIM = 16, CLAIM_CAP = 44, RIGHT_PAD = 120;
const TARGET_CAP = 110;   // uniform capital-letter height for every name (short names fit at this cap)
const breeCapRatio = bbox(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400"><path d="${bree.getPath("H", 0, 300, 200).toPathData(2)}" fill="#000"/></svg>`).height / 200;

const stripBg = (s) => s
  .replace(/<rect\b[^>]*\bfill="#(?:fff|ffffff|FFF|FFFFFF)"[^>]*\/?>(?:<\/rect>)?/g, "")
  .replace(/<rect\b[^>]*\bfill="white"[^>]*\/?>(?:<\/rect>)?/g, "");
const inner = (s) => s.replace(/^[\s\S]*?<svg[^>]*>/, "").replace(/<\/svg>\s*$/, "");
const vbOf = (s) => { const m = s.match(/viewBox="([\d.\-]+)\s+([\d.\-]+)\s+([\d.]+)\s+([\d.]+)"/); return m ? { x: +m[1], y: +m[2], w: +m[3], h: +m[4] } : { x: 0, y: 0, w: 512, h: 512 }; };

function markOf(app) {
  const slug = app.slug;
  if (app.markFromLogoSrc && slug === "openhands") {
    const src = readFileSync(join(ROOT, slug, "assets", "logo-src.svg"), "utf8");
    const hands = [...src.matchAll(/<path\b[^>]*\/>/g)].map((m) => m[0]).filter((p) => !/\bfill="black"/.test(p)).join("");
    return { content: `<g fill="none">${hands}</g>`, vb: { x: 0, y: 0, w: 195, h: 30 } };
  }
  const cand = [join(ROOT, slug, "icon.svg"), join(ROOT, slug, "assets", "icon.svg")];
  const p = cand.find((c) => existsSync(c));
  if (!p) throw new Error("no icon.svg for " + slug);
  const s = readFileSync(p, "utf8");
  return { content: stripBg(inner(s)), vb: vbOf(s) };
}

// official wordmark lifted from logo-src.svg. capContent = the first CAPITAL glyph
// (or the whole wordmark for couchdb, whose letters are one merged path with no descender)
// so every name can be scaled to a uniform cap-height. COLOR is recoloured per theme.
function wordmarkOf(slug) {
  const src = readFileSync(join(ROOT, slug, "assets", "logo-src.svg"), "utf8");
  if (slug === "couchdb") {
    const d = src.match(/<path\s+d="([^"]+)"\s+fill="#444444"/i)[1];
    const c = `<path d="${d}" fill="COLOR"/>`;
    return { content: c, capContent: c, vb: { x: 0, y: 0, w: 512, h: 132 } };
  }
  if (slug === "openhands") {
    const letters = [...src.matchAll(/<path\b[^>]*\bfill="black"[^>]*\/>/g)].map((m) => m[0].replace(/fill="black"/, 'fill="COLOR"'));
    return { content: letters.join(""), capContent: letters[0], vb: { x: 0, y: 0, w: 195, h: 30 } };
  }
  if (slug.startsWith("standardnotes")) {
    const g = [...src.matchAll(/<g\b[\s\S]*?<\/g>/g)].map((m) => m[0])[1].replace(/fill="#1C6EE0"/gi, 'fill="COLOR"');
    const first = g.match(/<path\b[^>]*\/>/)[0];
    const gopen = g.match(/^<g\b[^>]*>/)[0];
    return { content: g, capContent: `${gopen}${first}</g>`, vb: { x: 0, y: 0, w: 1200, h: 360 } };
  }
  throw new Error("no wordmark extractor for " + slug);
}

const THEMES = [
  { suf: "", bg: "#ffffff", name: NAME_FG_LIGHT, claim: "#5a5d5e", dark: false },
  { suf: "-dark", bg: "#0d1117", name: NAME_FG_DARK, claim: "#9aa4ad", dark: true },
];
function emit(dir, name, svg, bg) {
  writeFileSync(join(dir, `${name}.svg`), svg);
  writeFileSync(join(dir, `${name}.png`), new Resvg(svg, { background: bg, fitTo: { mode: "original" } }).render().asPng());
}

for (const app of RUN) {
  const dir = join(ROOT, app.slug, "assets");
  const mark = markOf(app);

  const mb = bbox(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="${mark.vb.x} ${mark.vb.y} ${mark.vb.w} ${mark.vb.h}">${mark.content}</svg>`);
  const sM = LOGO_INK / Math.max(mb.width, mb.height);
  const markW = mb.width * sM, markH = mb.height * sM;
  const markTX = LOGO_X - mb.x * sM, markTY = H / 2 - markH / 2 - mb.y * sM;
  const textX = LOGO_X + markW + GAP_LOGO_TEXT;
  const maxNameW = W - textX - RIGHT_PAD;

  // NAME: scale so capitals == TARGET_CAP, then width-fit (long names shrink)
  let nameH, nameW, placeName;
  if (app.name.wordmark) {
    const wm = wordmarkOf(app.slug);
    const wb = bbox(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="${wm.vb.x} ${wm.vb.y} ${wm.vb.w} ${wm.vb.h}">${wm.content.replace(/COLOR/g, "#000")}</svg>`);
    const capB = bbox(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="${wm.vb.x} ${wm.vb.y} ${wm.vb.w} ${wm.vb.h}">${wm.capContent.replace(/COLOR/g, "#000")}</svg>`);
    let sN = TARGET_CAP / capB.height;
    if (wb.width * sN > maxNameW) sN = maxNameW / wb.width;
    nameH = wb.height * sN; nameW = wb.width * sN;
    placeName = (color, nameTop) => `<g transform="translate(${(textX - wb.x * sN).toFixed(2)},${(nameTop - wb.y * sN).toFixed(2)}) scale(${sN.toFixed(5)})">${wm.content.replace(/COLOR/g, color)}</g>`;
  } else {
    let ns = TARGET_CAP / breeCapRatio;                 // Bree size for cap-height == TARGET_CAP
    const adv = bree.getAdvanceWidth(app.name.text, ns);
    if (adv > maxNameW) ns = ns * maxNameW / adv;
    const cb = bbox(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 5000 800"><path d="${bree.getPath(app.name.text, 0, 500, ns).toPathData(2)}" fill="#000"/></svg>`);
    nameH = cb.height; nameW = cb.width;
    const d = bree.getPath(app.name.text, 0, 0, ns).toPathData(2);
    const inkTop = cb.y - 500;                           // cb measured with baseline at y=500
    placeName = (color, nameTop) => `<g transform="translate(${textX.toFixed(2)},${(nameTop - inkTop).toFixed(2)})"><path d="${d}" fill="${color}"/></g>`;
  }

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
  ${placeName(t.name, top)}
  <g transform="translate(${textX.toFixed(2)},${claimBaseline})"><path d="${claimD}" fill="${t.claim}"/></g>
</svg>
`;
    emit(dir, `banner${t.suf}`, svg, t.bg);
  }
  console.log(`${app.slug}: name ${nameW.toFixed(0)}x${nameH.toFixed(0)} @${textX.toFixed(0)} | claim ${claimSize} | rmargin ${(W - textX - nameW).toFixed(0)}`);
}
