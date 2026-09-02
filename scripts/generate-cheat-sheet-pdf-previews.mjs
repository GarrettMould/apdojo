/**
 * Rasterize cheat-sheet PDF page 1 into /public/cheat-sheet-previews/.
 * Run: npm run generate:cheat-sheet-previews
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { pdf } from 'pdf-to-img';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_ROOT = path.join(__dirname, '../public/cheat-sheet-previews');

const WIDTH = 833;
const CROP_HEIGHT = 1080;
const S3 = 'https://apdojowhiteboards.s3.ap-southeast-2.amazonaws.com/pdfs';

/** @type {Array<{ out: string; url: string }>} */
const PREVIEWS = [
  ...[1, 2, 3, 4, 5, 6].map((n) => ({
    out: `macro/unit-${n}.webp`,
    url: `${S3}/AP+Macro+-+Unit+${n}.pdf`,
  })),
  ...[1, 2, 3, 4, 5].map((n) => ({
    out: `micro/unit-${n}.webp`,
    url: `${S3}/AP+Micro+-+Unit+${n}.pdf`,
  })),
  ...[1, 2, 3, 4, 5].map((n) => ({
    out: `gov/unit-${n}.webp`,
    url: `${S3}/apgov/AP+Gov+-+Unit+${n}+-+CS.pdf`,
  })),
  {
    out: 'stats/unit-2.webp',
    url: `${S3}/apstats/AP+Stats+-+Unit+2.pdf`,
  },
  {
    out: 'macro/ultimate-adas.webp',
    url: `${S3}/ultimate_adas.pdf`,
  },
];

async function renderPreview(url, outPath) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  const doc = await pdf(buf, { scale: 2 });

  for await (const page of doc) {
    const optimized = await sharp(page)
      .resize(WIDTH, CROP_HEIGHT, { fit: 'cover', position: 'north' })
      .webp({ quality: 78, effort: 6 })
      .toBuffer();
    await fs.mkdir(path.dirname(outPath), { recursive: true });
    await fs.writeFile(outPath, optimized);
    console.log(`Wrote ${path.relative(OUT_ROOT, outPath)} (${optimized.length} bytes)`);
    return;
  }

  throw new Error(`No pages in ${url}`);
}

async function main() {
  await fs.mkdir(OUT_ROOT, { recursive: true });
  for (const { url, out } of PREVIEWS) {
    await renderPreview(url, path.join(OUT_ROOT, out));
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
