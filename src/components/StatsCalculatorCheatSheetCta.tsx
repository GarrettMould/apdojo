'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Ti84Simulator } from '@/components/ti84/Ti84Simulator';
import { CALCULATOR_DRILL_DECKS } from '@/lib/ti84-drills';
import { INITIAL_STATE, type CalcState } from '@/lib/ti84-simulator';

/** Seeded home screen so the CTA preview looks “in use,” not blank. */
const CTA_PREVIEW_STATE: CalcState = {
  ...INITIAL_STATE,
  screenLines: [
    { text: 'normalcdf(-1E99,1.2,0,1)' },
    { text: '0.8849303298', align: 'right' },
  ],
};

const deckCount = CALCULATOR_DRILL_DECKS.length;
const drillCount = CALCULATOR_DRILL_DECKS.reduce((n, d) => n + d.drills.length, 0);

/**
 * Flashcards-style feature CTA for AP Stats unit cheat sheets:
 * show the TI-84, explain skill drills, link to the simulator.
 */
export function StatsCalculatorCheatSheetCta() {
  return (
    <div id="calculator-drills" className="mb-8">
      <div className="overflow-hidden rounded-xl border border-gray-200/90 bg-gradient-to-br from-white via-slate-50/90 to-orange-50/35 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_8px_24px_-8px_rgba(15,23,42,0.07)]">
        <div className="flex flex-col gap-6 p-5 sm:flex-row sm:items-center sm:justify-between sm:gap-8 sm:p-6">
          <div className="min-w-0 max-w-xl flex-1">
            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-gray-500">
              Built for AP Stats
            </p>
            <h2 className="mt-1.5 text-2xl font-black tracking-tight text-gray-900 sm:text-3xl">
              TI-84 skill drills
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-gray-600 sm:text-base">
              Practice the same DISTR and STAT → TESTS paths you use on exam day.
              Pick a deck, follow the prompt on the real calculator UI, and get graded
              automatically when your screen matches —{' '}
              <span className="font-semibold text-gray-800">{deckCount} decks</span>,{' '}
              <span className="font-semibold text-gray-800">{drillCount} drills</span>.
            </p>
            <Link
              href="/ap-stats-calculator-simulator"
              className="mt-5 inline-flex items-center gap-2 rounded-lg border-2 border-gray-900 bg-gray-900 px-4 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
            >
              Open calculator drills
              <ArrowRight className="h-4 w-4 shrink-0" aria-hidden />
            </Link>
          </div>

          <div
            className="pointer-events-none relative mx-auto mt-1 h-[220px] w-[min(100%,200px)] shrink-0 select-none overflow-hidden sm:mx-0 sm:mt-0 sm:h-[240px] sm:w-[210px]"
            aria-hidden
          >
            <div
              className="absolute left-1/2 top-0 origin-top"
              style={{
                transform: 'translateX(-50%) scale(0.52)',
                width: 360,
              }}
            >
              <Ti84Simulator
                state={CTA_PREVIEW_STATE}
                dispatch={() => {}}
                captureKeyboard={false}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
