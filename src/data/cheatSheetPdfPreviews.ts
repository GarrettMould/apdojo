import type { CourseSubject } from '@/lib/courseSubject';

const S3 = 'https://apdojowhiteboards.s3.ap-southeast-2.amazonaws.com/pdfs';

export const GOV_UNIT_PDF_URLS: Record<number, string> = {
  1: `${S3}/apgov/AP+Gov+-+Unit+1+-+CS.pdf`,
  2: `${S3}/apgov/AP+Gov+-+Unit+2+-+CS.pdf`,
  3: `${S3}/apgov/AP+Gov+-+Unit+3+-+CS.pdf`,
  4: `${S3}/apgov/AP+Gov+-+Unit+4+-+CS.pdf`,
  5: `${S3}/apgov/AP+Gov+-+Unit+5+-+CS.pdf`,
};

export const STATS_UNIT_PDF_URLS: Record<number, string> = {
  2: `${S3}/apstats/AP+Stats+-+Unit+2.pdf`,
};

export const ULTIMATE_ADAS_PDF_URL = `${S3}/ultimate_adas.pdf`;

export function getEconUnitPdfUrl(subject: 'macro' | 'micro', unitNumber: number): string {
  const label = subject === 'macro' ? 'Macro' : 'Micro';
  return `${S3}/AP+${label}+-+Unit+${unitNumber}.pdf`;
}

export function getUnitPdfUrl(subject: CourseSubject, unitNumber: number): string | null {
  if (subject === 'stats') return STATS_UNIT_PDF_URLS[unitNumber] ?? null;
  if (subject === 'gov') return GOV_UNIT_PDF_URLS[unitNumber] ?? null;
  if (subject === 'macro' || subject === 'micro') return getEconUnitPdfUrl(subject, unitNumber);
  return null;
}

/** Static WebP raster of page 1 (833×1080 crop) — see `npm run generate:cheat-sheet-previews`. */
export function cheatSheetPdfPreviewPath(
  subject: CourseSubject,
  unitNumber: number,
): string | null {
  if (subject === 'stats' && unitNumber !== 2) return null;
  if (subject === 'gov' && (unitNumber < 1 || unitNumber > 5)) return null;
  if (subject === 'micro' && (unitNumber < 1 || unitNumber > 5)) return null;
  if (subject === 'macro' && (unitNumber < 1 || unitNumber > 6)) return null;
  return `/cheat-sheet-previews/${subject}/unit-${unitNumber}.webp`;
}

export function ultimateAdasPreviewPath(): string {
  return '/cheat-sheet-previews/macro/ultimate-adas.webp';
}
