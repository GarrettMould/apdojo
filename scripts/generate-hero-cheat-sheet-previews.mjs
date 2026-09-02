/**
 * @deprecated Use `npm run generate:cheat-sheet-previews` — hero previews now live under
 * `/public/cheat-sheet-previews/` (same raster pipeline, shared paths in loggedOutHeroConfig).
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { pdf } from 'pdf-to-img';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.join(__dirname, '../public/hero-previews');

const WIDTH = 833;
const CROP_HEIGHT = 1080;

const PREVIEWS = [
  {
    out: 'macro-unit-1.webp',
    url: 'https://apdojowhiteboards.s3.ap-southeast-2.amazonaws.com/pdfs/AP+Macro+-+Unit+1.pdf',
  },
  {
    out: 'micro-unit-1.webp',
    url: 'https://apdojowhiteboards.s3.ap-southeast-2.amazonaws.com/pdfs/AP+Micro+-+Unit+1.pdf',
  },
  {
    out: 'stats-unit-2.webp',
    url: 'https://apdojowhiteboards.s3.ap-southeast-2.amazonaws.com/pdfs/apstats/AP+Stats+-+Unit+2.pdf',
  },
  {
    out: 'gov-unit-2.webp',
    url: 'https://apdojowhiteboards.s3.ap-southeast-2.amazonaws.com/pdfs/apgov/AP+Gov+-+Unit+2+-+CS.pdf',
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
    await fs.writeFile(outPath, optimized);
    console.log(`Wrote ${outPath} (${optimized.length} bytes)`);
    return;
  }

  throw new Error(`No pages in ${url}`);
}

async function main() {
  await fs.mkdir(OUT_DIR, { recursive: true });
  for (const { url, out } of PREVIEWS) {
    await renderPreview(url, path.join(OUT_DIR, out));
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
