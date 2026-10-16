// scripts/images.mjs
// Turns full-size exports into web images for the site.
//
//   1. Drop images into  images-src/<folder>/   (PNG, JPG, WebP, TIFF; any size)
//   2. Run              npm run images
//   3. Use them as      /img/<folder>/<name>.webp
//
// images-src/ stays on this Mac (it's gitignored), so pushes only carry the small
// web versions. Only new or changed files are processed. SVGs are copied as they are.
import { readdir, stat, mkdir, copyFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const SRC = "images-src";
const OUT = "public/img";
const MAX_EDGE = 3200; // long edge in px: sharp on retina screens and in the zoom viewer
// Folders shown small and never zoomed: still 2x+ their on-screen size, far lighter
const FOLDER_MAX = { about: 2000, projects: 2400, home: 2600 };
const QUALITY = 90; // WebP quality: visually lossless for artwork and photos

const edgeFor = (rel) => FOLDER_MAX[rel.split(path.sep)[0]] ?? MAX_EDGE;
const RASTER = new Set([".png", ".jpg", ".jpeg", ".webp", ".tif", ".tiff"]);

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if (entry.name.startsWith(".")) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else yield full;
  }
}

const newer = async (a, b) => {
  try {
    return (await stat(a)).mtimeMs > (await stat(b)).mtimeMs;
  } catch {
    return true; // output missing
  }
};

let done = 0, skipped = 0, before = 0, after = 0;
for await (const file of walk(SRC)) {
  const ext = path.extname(file).toLowerCase();
  const rel = path.relative(SRC, file);
  const isSvg = ext === ".svg";
  if (!isSvg && !RASTER.has(ext)) continue;

  const out = path.join(OUT, isSvg ? rel : rel.slice(0, -ext.length) + ".webp");
  if (!(await newer(file, out))) { skipped++; continue; }
  await mkdir(path.dirname(out), { recursive: true });

  if (isSvg) {
    await copyFile(file, out);
  } else {
    await sharp(file)
      .rotate() // respect phone-photo orientation
      .resize({ width: edgeFor(rel), height: edgeFor(rel), fit: "inside", withoutEnlargement: true })
      .webp({ quality: QUALITY, effort: 6, smartSubsample: true })
      .toFile(out);
  }
  const [a, b] = [(await stat(file)).size, (await stat(out)).size];
  before += a; after += b; done++;
  console.log(`${rel.padEnd(52)} ${(a / 1024).toFixed(0).padStart(6)} KB → ${(b / 1024).toFixed(0).padStart(5)} KB`);
}
const mb = (n) => (n / 1048576).toFixed(1) + " MB";
console.log(`\n${done} processed (${mb(before)} → ${mb(after)}), ${skipped} already up to date.`);
