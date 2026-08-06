/**
 * CouchDB banner to the GitHub style guide (krusader layout):
 *   logo LEFT (couch mark, largest ink ~400px, ink-left x=165, ink-vcentre y=250)
 *   NAME right (the official "CouchDB" wordmark artwork, foreground colour)
 *   ONE cheeky claim below the name (Lato, grey), name+claim group vcentred on H/2.
 * Splits the official gilbarbara lockup (assets/logo-src.svg) into the red couch
 * (#E42528 -> logo) and the wordmark (#444444 -> name); the "relax" tagline
 * (#777777) is dropped. 1600x500 theme-flip pair. Deps (global): opentype.js,
 * @resvg/resvg-js. Run: node couchdb/gen-banner.mjs
 */
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";
import { execSync } from "node:child_process";

const require = createRequire(import.meta.url);
const groot = execSync("npm root -g").toString().trim();
const opentype = require(`${groot}/opentype.js`);
const { Resvg } = require(`${groot}/@resvg/resvg-js`);
const ASSETS = join(dirname(fileURLToPath(import.meta.url)), "assets");

async function font(file, url) {
  const p = join(tmpdir(), file);
  if (!existsSync(p)) { const r = await fetch(url); writeFileSync(p, Buffer.from(await r.arrayBuffer())); }
  const b = readFileSync(p);
  return opentype.parse(b.buffer.slice(b.byteOffset, b.byteOffset + b.byteLength));
}
const lato = await font("jdp-Lato-Regular.ttf", "https://github.com/google/fonts/raw/main/ofl/lato/Lato-Regular.ttf");
const sc = (f, s) => s / f.unitsPerEm;
// step the size down until the merged Lato path is NaN-free (some glyph sizes NaN)
function fitSize(f, text, maxW, cap) {
  let size = Math.min(cap, Math.floor((100 * maxW) / f.getAdvanceWidth(text, 100)));
  for (; size > 10; size--) if (!f.getPath(text, 0, 0, size).toPathData(2).includes("NaN")) return size;
  return 10;
}

// official artwork -> couch (logo) + wordmark (name); relax (#777777) dropped
const src = readFileSync(join(ASSETS, "logo-src.svg"), "utf8");
const grab = (fill) => {
  const m = src.match(new RegExp(`<path\\s+d="([^"]+)"\\s+fill="${fill}"`, "i"));
  if (!m) throw new Error("path not found: " + fill);
  return m[1];
};
const couchD = grab("#E42528");
const nameD = grab("#444444");
const bbox = (d) => new Resvg(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 132"><path d="${d}" fill="#000"/></svg>`, { fitTo: { mode: "original" } }).getBBox();
const cb = bbox(couchD), nb = bbox(nameD);

const W = 1600, H = 500;
const LOGO_INK = 400, LOGO_X = 165, GAP_LOGO_TEXT = 70, NAME_H = 132, GAP_NAME_CLAIM = 16;
const CLAIM = "Relax. Your data syncs itself.";

// couch: largest ink dim -> LOGO_INK, ink-left at LOGO_X, ink-vcentre at H/2
const sL = LOGO_INK / Math.max(cb.width, cb.height);
const couchW = cb.width * sL, couchH = cb.height * sL;
const couchTX = LOGO_X - cb.x * sL;
const couchTY = H / 2 - couchH / 2 - cb.y * sL;
const textX = LOGO_X + couchW + GAP_LOGO_TEXT;
const CLAIM_SIZE = fitSize(lato, CLAIM, W - textX - 120, 46);

// name (wordmark artwork) scaled to NAME_H
const sN = NAME_H / nb.height;
const nameW = nb.width * sN, nameH = nb.height * sN;

// name + claim group vcentred on H/2
const claimAsc = lato.ascender * sc(lato, CLAIM_SIZE);
const claimDesc = -lato.descender * sc(lato, CLAIM_SIZE);
const blockH = nameH + GAP_NAME_CLAIM + claimAsc + claimDesc;
const top = H / 2 - blockH / 2;
const nameTX = textX - nb.x * sN;
const nameTY = top - nb.y * sN;
const claimBaseline = Math.round(top + nameH + GAP_NAME_CLAIM + claimAsc);
// merged path (this claim has no "w", the glyph that would NaN a merged Lato path)
const claimPath = lato.getPath(CLAIM, textX, claimBaseline, CLAIM_SIZE).toPathData(2);

const THEMES = [
  { suf: "", bg: "#ffffff", name: "#1f2328", claim: "#5a5d5e" },
  { suf: "-dark", bg: "#0d1117", name: "#e6edf3", claim: "#9aa4ad" },
];
for (const t of THEMES) {
  const claim = `<path d="${claimPath}" fill="${t.claim}"/>`;
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="CouchDB">
  <rect width="${W}" height="${H}" fill="${t.bg}"/>
  <g transform="translate(${couchTX.toFixed(2)},${couchTY.toFixed(2)}) scale(${sL.toFixed(5)})"><path d="${couchD}" fill="#E42528"/></g>
  <g transform="translate(${nameTX.toFixed(2)},${nameTY.toFixed(2)}) scale(${sN.toFixed(5)})"><path d="${nameD}" fill="${t.name}"/></g>
  ${claim}
</svg>
`;
  writeFileSync(join(ASSETS, `banner${t.suf}.svg`), svg);
  writeFileSync(join(ASSETS, `banner${t.suf}.png`), new Resvg(svg, { background: t.bg, fitTo: { mode: "original" } }).render().asPng());
}
console.log(`couch ${cb.width.toFixed(0)}x${cb.height.toFixed(0)} -> ${couchW.toFixed(0)}x${couchH.toFixed(0)} @x${LOGO_X}; name -> ${nameW.toFixed(0)}x${nameH.toFixed(0)} @x${textX.toFixed(0)}; right margin ${(W - (textX + nameW)).toFixed(0)}`);
