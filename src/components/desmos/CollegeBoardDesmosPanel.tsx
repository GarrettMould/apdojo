'use client';

import { ExternalLink } from 'lucide-react';

export const COLLEGE_BOARD_DESMOS_GRAPHING_URL =
  'https://www.desmos.com/testing/collegeboard/graphing';

export const BLUEBOOK_PRACTICE_URL = 'https://bluebook.collegeboard.org/students/practice';

type Props = {
  height?: number;
  /** When true, use the full parent width (Desmos needs more room than TI-84). */
  fullWidth?: boolean;
  /** Fill parent height (exam tools panel). */
  fillHeight?: boolean;
  className?: string;
};

/**
 * Official College Board Desmos testing graphing calculator.
 * Tries an iframe embed; always offers open-in-new-tab + Bluebook practice links
 * because Desmos often blocks cross-origin embedding.
 */
export function CollegeBoardDesmosPanel({
  height = 640,
  fullWidth = false,
  fillHeight = false,
  className = '',
}: Props) {
  return (
    <div
      className={`w-full ${fullWidth ? '' : 'max-w-[640px]'} ${fillHeight ? 'flex h-full min-h-0 flex-col' : ''} ${className}`}
    >
      <div className="mb-2 flex shrink-0 flex-wrap items-center justify-between gap-2">
        <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-gray-500">
          Exam-style Desmos · College Board testing version
        </p>
        <a
          href={COLLEGE_BOARD_DESMOS_GRAPHING_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-xs font-semibold text-orange-700 hover:text-orange-800"
        >
          Open full screen
          <ExternalLink className="h-3 w-3" aria-hidden />
        </a>
      </div>

      <div
        className={`relative overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm ${
          fillHeight ? 'min-h-[420px] flex-1' : ''
        }`}
        style={fillHeight ? undefined : { height }}
      >
        <iframe
          title="College Board Desmos Graphing Calculator"
          src={COLLEGE_BOARD_DESMOS_GRAPHING_URL}
          className="h-full w-full border-0"
          allow="clipboard-write; fullscreen"
          referrerPolicy="no-referrer-when-downgrade"
        />

        {/* Always-visible fallback strip — iframe may be blank if Desmos blocks embedding */}
        <div className="absolute inset-x-0 bottom-0 border-t border-gray-200 bg-white/95 px-4 py-3 backdrop-blur-sm">
          <p className="text-xs text-gray-600">
            If the calculator is blank, Desmos is blocking the embed. Use the official links:
          </p>
          <div className="mt-2 flex flex-wrap gap-3">
            <a
              href={COLLEGE_BOARD_DESMOS_GRAPHING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-orange-700 hover:text-orange-800"
            >
              College Board Desmos
              <ExternalLink className="h-3.5 w-3.5" aria-hidden />
            </a>
            <a
              href={BLUEBOOK_PRACTICE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-blue-700 hover:text-blue-800"
            >
              Practice in Bluebook
              <ExternalLink className="h-3.5 w-3.5" aria-hidden />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
