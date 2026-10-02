/**
 * Builds an app tile for the README cards from a logo: the white and grey
 * ground of parleyport.svg, the house tile, with the logo
 * centred on it at the size the ParleyPort logo has there.
 *
 *   node .github/readme-icons/app/tile.mjs <logo.svg> <name>
 *
 * Writes <name>.svg and <name>.png (512 px) next to this file; generate.py
 * takes the PNG for every app in its APP set. A logo's classes become fill
 * attributes, so its colours cannot clash with the ground's.
 *
 * Deps (global): @resvg/resvg-js.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";
import { execSync } from "node:child_process";

const require = createRequire(import.meta.url);
const { Resvg } = require(`${execSync("npm root -g").toString().trim()}/@resvg/resvg-js`);
const here = dirname(fileURLToPath(import.meta.url));

const [logoPath, name] = process.argv.slice(2);
if (!logoPath || !name) throw new Error("usage: tile.mjs <logo.svg> <name>");

function inline(svg) {
  const fills = Object.fromEntries([...svg.matchAll(/\.([\w-]+)\s*\{\s*fill:\s*(#[0-9a-fA-F]+);?\s*\}/g)].map((m) => [m[1], m[2]]));
  return svg
    .replace(/<\?xml[^>]*\?>\s*/, "")
    .replace(/<defs>[\s\S]*?<\/defs>/, "")
    .replace(/\s(?:id|data-name)="[^"]*"/g, "")
    .replace(/class="([\w-]+)"/g, (_, c) => `fill="${fills[c]}"`);
}

const S = 610;
// The ParleyPort logo spans 506 of the tile's 610 units, centred.
const LOGO = 506;
const ground = inline(readFileSync(join(here, "parleyport.svg"), "utf8")).match(/<g>\s*<path[\s\S]*?<\/g>/)[0];
const logo = inline(readFileSync(logoPath, "utf8"));
const [, , w, h] = logo.match(/viewBox="([^"]+)"/)[1].split(/\s+/).map(Number);
const scale = LOGO / Math.max(w, h);
const lw = w * scale, lh = h * scale;
const placed = logo.replace(
  /<svg\b[^>]*>/,
  `<svg x="${((S - lw) / 2).toFixed(1)}" y="${((S - lh) / 2).toFixed(1)}" width="${lw.toFixed(1)}" height="${lh.toFixed(1)}" viewBox="0 0 ${w} ${h}">`,
);

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${S} ${S}">\n  ${ground}\n  ${placed.trim()}\n</svg>\n`;
writeFileSync(join(here, `${name}.svg`), svg);
writeFileSync(join(here, `${name}.png`), new Resvg(svg, { fitTo: { mode: "width", value: 512 } }).render().asPng());
console.log(`wrote ${name}.svg and ${name}.png`);
