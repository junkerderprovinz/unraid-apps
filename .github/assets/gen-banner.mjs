/**
 * The feed banner, in the layout of the GitHub style guide: the Unraid mark on
 * the left (largest ink 400px, ink-left x=165, centred on y=250), the official
 * Unraid logotype to its right at a cap height of 110, and one Lato claim below
 * it. Light and dark variants for the README's <picture>.
 *
 * Text is rendered at the origin and placed with a transform, because
 * opentype.js emits NaN control points for some Lato glyphs at large offsets.
 * Deps (global): opentype.js, @resvg/resvg-js.
 * Run: node .github/assets/gen-banner.mjs
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
const DIR = dirname(fileURLToPath(import.meta.url));

const CLAIM = "One feed to rule them all.";

const MARK = {
  vb: "0 0 133.52 76.97",
  content: `<defs><linearGradient id="unraidMark" x1="23.76" y1="81.49" x2="109.76" y2="-4.51" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#e32929"/><stop offset="1" stop-color="#ff8d30"/></linearGradient></defs><path d="M63.49,19.24H70V57.73H63.49ZM6.54,57.73H0V19.24H6.54Zm25.2,4.54h6.55V77H31.74ZM15.87,45.84h6.54V69.62H15.87Zm31.75,0h6.54V69.62H47.62ZM127,19.24h6.54V57.73H127ZM101.77,14.7H95.23V0h6.54Zm15.88,16.44H111.1V7.35h6.55Zm-31.75,0H79.36V7.35H85.9Z" fill="url(#unraidMark)"/>`,
};

// The logotype has capitals only, so its full height is the cap height.
const WORDMARK = {
  vb: "0 0 222.36 39.04",
  content: [
    "M146.7,29.47H135l-3,9h-6.49L138.93,0h8l13.41,38.49h-7.09L142.62,6.93l-5.83,16.88h8Z",
    "M29.69,0V25.4c0,8.91-5.77,13.64-14.9,13.64S0,34.31,0,25.4V0H6.54V25.4c0,5.17,3.19,7.92,8.25,7.92s8.36-2.75,8.36-7.92V0Z",
    "M50.86,12v26.5H44.31V0h6.11l17,26.5V0H74V38.49H67.9Z",
    "M171.29,0h6.54V38.49h-6.54Z",
    "M222.36,24.69c0,9-5.88,13.8-15.17,13.8H192.67V0H207.3c9.18,0,15.06,4.78,15.06,13.8ZM215.82,13.8c0-5.28-3.3-8.14-8.52-8.14h-8.08V32.77h8c5.33,0,8.63-2.8,8.63-8.08Z",
    "M108.31,23.92c4.34-1.6,6.93-5.28,6.93-11.55C115.24,3.68,110.18,0,102.48,0H88.84V38.49h6.55V5.66h6.87c3.8,0,6.21,1.82,6.21,6.71s-2.41,6.76-6.21,6.76H98.88l9.21,19.36h7.53Z",
  ].map((d) => `<path d="${d}" fill="COLOR"/>`).join(""),
};

const W = 1600, H = 500, LOGO_INK = 400, LOGO_X = 165, GAP_LOGO_TEXT = 70, GAP_NAME_CLAIM = 16, CLAIM_SIZE = 44;
const TARGET_CAP = 110;
const THEMES = [
  { suf: "", bg: "#ffffff", name: "#1f2328", claim: "#5a5d5e" },
  { suf: "-dark", bg: "#0d1117", name: "#e6edf3", claim: "#9aa4ad" },
];

async function font(file, url) {
  const p = join(tmpdir(), file);
  if (!existsSync(p)) {
    const r = await fetch(url);
    if (!r.ok) throw new Error(`${file} ${r.status}`);
    writeFileSync(p, Buffer.from(await r.arrayBuffer()));
  }
  const b = readFileSync(p);
  return opentype.parse(b.buffer.slice(b.byteOffset, b.byteOffset + b.byteLength));
}
const lato = await font("jdp-Lato-Regular.ttf", "https://github.com/google/fonts/raw/main/ofl/lato/Lato-Regular.ttf");
const bbox = (vb, content) =>
  new Resvg(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb}">${content}</svg>`, { fitTo: { mode: "original" } }).getBBox();

const mb = bbox(MARK.vb, MARK.content);
const sM = LOGO_INK / Math.max(mb.width, mb.height);
const markTX = LOGO_X - mb.x * sM, markTY = H / 2 - (mb.height * sM) / 2 - mb.y * sM;
const textX = LOGO_X + mb.width * sM + GAP_LOGO_TEXT;

const wb = bbox(WORDMARK.vb, WORDMARK.content.replace(/COLOR/g, "#000"));
const sN = TARGET_CAP / wb.height;
const nameH = wb.height * sN;

const claimScale = CLAIM_SIZE / lato.unitsPerEm;
const claimAsc = lato.ascender * claimScale, claimDesc = -lato.descender * claimScale;
const top = H / 2 - (nameH + GAP_NAME_CLAIM + claimAsc + claimDesc) / 2;
const claimBaseline = Math.round(top + nameH + GAP_NAME_CLAIM + claimAsc);
const claimD = lato.getPath(CLAIM, 0, 0, CLAIM_SIZE, { kerning: false }).toPathData(2);
if (claimD.includes("NaN")) throw new Error("claim path has NaN points");

for (const t of THEMES) {
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="Unraid: ${CLAIM}">
  <rect width="${W}" height="${H}" fill="${t.bg}"/>
  <g transform="translate(${markTX.toFixed(2)},${markTY.toFixed(2)}) scale(${sM.toFixed(5)})">${MARK.content}</g>
  <g transform="translate(${(textX - wb.x * sN).toFixed(2)},${(top - wb.y * sN).toFixed(2)}) scale(${sN.toFixed(5)})">${WORDMARK.content.replace(/COLOR/g, t.name)}</g>
  <g transform="translate(${textX.toFixed(2)},${claimBaseline})"><path d="${claimD}" fill="${t.claim}"/></g>
</svg>
`;
  writeFileSync(join(DIR, `banner${t.suf}.svg`), svg);
  writeFileSync(join(DIR, `banner${t.suf}.png`), new Resvg(svg, { background: t.bg, fitTo: { mode: "original" } }).render().asPng());
}
console.log(`unraid-apps banner: name at x ${textX.toFixed(0)}, right margin ${(W - textX - wb.width * sN).toFixed(0)}`);
