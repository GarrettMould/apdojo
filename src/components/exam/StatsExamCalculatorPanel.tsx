'use client';

import { useState } from 'react';
import { ExternalLink } from 'lucide-react';
import {
  CollegeBoardDesmosPanel,
  BLUEBOOK_PRACTICE_URL,
  COLLEGE_BOARD_DESMOS_GRAPHING_URL,
} from '@/components/desmos/CollegeBoardDesmosPanel';
import { BasicFourFunctionCalculator } from '@/components/exam/BasicFourFunctionCalculator';

type CalcMode = 'desmos' | 'basic';

type Props = {
  accentClassName: string;
};

/**
 * AP Stats exam tools calculator: exam-style College Board Desmos by default,
 * with a simple four-function fallback and Bluebook practice link.
 */
export function StatsExamCalculatorPanel({ accentClassName }: Props) {
  const [mode, setMode] = useState<CalcMode>('desmos');

  return (
    <div className="flex min-h-[560px] flex-1 flex-col overflow-hidden bg-gray-50 lg:min-h-0">
      <div className="flex shrink-0 flex-wrap items-center justify-between gap-2 border-b border-gray-200 bg-white px-4 py-2.5">
        <div className="inline-flex rounded-lg border border-gray-200 bg-gray-100 p-0.5">
          <button
            type="button"
            onClick={() => setMode('desmos')}
            className={`rounded-md px-3 py-1.5 text-xs font-semibold transition ${
              mode === 'desmos'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            Desmos
            <span className="ml-1 hidden text-[10px] font-bold uppercase tracking-wide text-orange-600 sm:inline">
              exam-style
            </span>
          </button>
          <button
            type="button"
            onClick={() => setMode('basic')}
            className={`rounded-md px-3 py-1.5 text-xs font-semibold transition ${
              mode === 'basic'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            Basic
          </button>
        </div>

        <a
          href={BLUEBOOK_PRACTICE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-xs font-semibold text-blue-700 hover:text-blue-800"
        >
          Practice in Bluebook
          <ExternalLink className="h-3 w-3" aria-hidden />
        </a>
      </div>

      {mode === 'desmos' ? (
        <div className="flex min-h-0 flex-1 flex-col p-3">
          <p className="mb-2 text-[11px] leading-snug text-gray-500">
            Official College Board testing Desmos — not Bluebook chrome. If the embed is blank, open
            it full screen.
          </p>
          <div className="min-h-0 flex-1">
            <CollegeBoardDesmosPanel fullWidth fillHeight className="h-full" />
          </div>
          <a
            href={COLLEGE_BOARD_DESMOS_GRAPHING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex items-center gap-1 self-start text-xs font-semibold text-orange-700 hover:text-orange-800"
          >
            Open College Board Desmos
            <ExternalLink className="h-3 w-3" aria-hidden />
          </a>
        </div>
      ) : (
        <BasicFourFunctionCalculator accentClassName={accentClassName} />
      )}
    </div>
  );
}
