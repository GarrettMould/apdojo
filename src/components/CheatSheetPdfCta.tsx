'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Download } from 'lucide-react';
import type { CourseSubject } from '@/lib/courseSubject';
import {
  cheatSheetPdfPreviewPath,
  getUnitPdfUrl,
} from '@/data/cheatSheetPdfPreviews';

type PdfCtaSubject = Extract<CourseSubject, 'macro' | 'micro' | 'gov'>;

type Props = {
  subject: PdfCtaSubject;
  unitNumber: number;
  isProCustomer: boolean;
  onLockedClick: () => void;
  onDownload: (pdfUrl: string, filename: string) => void;
};

const SUBJECT_STYLES: Record<
  PdfCtaSubject,
  { tint: string; eyebrow: string; title: string; body: string }
> = {
  macro: {
    tint: 'to-blue-50/40',
    eyebrow: 'Built for AP Macro',
    title: 'Printable cheat sheet PDFs',
    body: 'One clean page per unit — graphs, definitions, and exam cues ready to print or study offline.',
  },
  micro: {
    tint: 'to-emerald-50/40',
    eyebrow: 'Built for AP Micro',
    title: 'Printable cheat sheet PDFs',
    body: 'Single-page unit sheets for Units 1–5 — markets, costs, and key graphs in one printable view.',
  },
  gov: {
    tint: 'to-violet-50/40',
    eyebrow: 'Built for AP Gov',
    title: 'Printable cheat sheet PDFs',
    body: 'Unit foundations, institutions, and required cases on a single printable page.',
  },
};

function downloadFilename(subject: PdfCtaSubject, unitNumber: number): string {
  if (subject === 'gov') return `AP-Dojo-Gov-Unit-${unitNumber}-Cheat-Sheet.pdf`;
  const label = subject === 'macro' ? 'Macro' : 'Micro';
  return `AP-Dojo-${label}-Unit-${unitNumber}-Cheat-Sheet.pdf`;
}

/**
 * Flashcards-style feature CTA for Macro / Micro / Gov unit cheat sheets:
 * copy on the left; wide top-cropped PDF filling the right half of the card.
 */
export function CheatSheetPdfCta({
  subject,
  unitNumber,
  isProCustomer,
  onLockedClick,
  onDownload,
}: Props) {
  const styles = SUBJECT_STYLES[subject];
  const previewSrc = cheatSheetPdfPreviewPath(subject, unitNumber);
  const pdfUrl = getUnitPdfUrl(subject, unitNumber);

  if (!previewSrc || !pdfUrl) return null;

  const filename = downloadFilename(subject, unitNumber);

  const handleDownload = () => {
    if (!isProCustomer) {
      onLockedClick();
      return;
    }
    onDownload(pdfUrl, filename);
  };

  return (
    <div id="printable-cheat-sheets" className="mb-8">
      <div
        className={`overflow-hidden rounded-xl border border-gray-200/90 bg-gradient-to-br from-white via-slate-50/90 ${styles.tint} shadow-[0_1px_2px_rgba(15,23,42,0.04),0_8px_24px_-8px_rgba(15,23,42,0.07)]`}
      >
        <div className="flex flex-col sm:flex-row sm:items-stretch">
          <div className="w-full shrink-0 p-5 sm:w-[min(100%,420px)] sm:p-6">
            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-gray-500">
              {styles.eyebrow}
            </p>
            <h2 className="mt-1.5 text-2xl font-black tracking-tight text-gray-900 sm:text-3xl">
              {styles.title}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-gray-600 sm:text-base">
              {styles.body}{' '}
              <span className="font-semibold text-gray-800">Unit {unitNumber}</span> is ready to
              download now.
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={handleDownload}
                className="inline-flex items-center gap-2 rounded-lg border-2 border-gray-900 bg-gray-900 px-4 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
              >
                <Download className="h-4 w-4 shrink-0" aria-hidden />
                Download PDF
                <ArrowRight className="h-4 w-4 shrink-0" aria-hidden />
              </button>

              {(subject === 'macro' || subject === 'micro') && (
                <Link
                  href="/cheat-sheets"
                  className="text-sm font-semibold text-gray-600 underline decoration-gray-300 underline-offset-4 transition hover:text-gray-900"
                >
                  Browse all units
                </Link>
              )}
            </div>
          </div>

          {/* Fills remaining card width — top of PDF only, bleeds to edges */}
          <button
            type="button"
            onClick={handleDownload}
            className="relative h-[160px] w-full min-w-0 flex-1 overflow-hidden bg-white sm:h-auto sm:min-h-[200px]"
            title="Download PDF"
            aria-label={`Download Unit ${unitNumber} cheat sheet PDF`}
          >
            <Image
              src={previewSrc}
              alt=""
              fill
              priority
              className="pointer-events-none origin-bottom object-cover object-top scale-[0.8]"
              sizes="(max-width: 640px) 100vw, 55vw"
            />
          </button>
        </div>
      </div>
    </div>
  );
}
