'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { CALCULATOR_DRILL_DECKS } from '@/lib/ti84-drills';

const deckCount = CALCULATOR_DRILL_DECKS.length;
const drillCount = CALCULATOR_DRILL_DECKS.reduce((n, d) => n + d.drills.length, 0);

/**
 * Feature CTA for AP Stats unit cheat sheets: calculator drills (Desmos + TI-84).
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
              Calculator drills
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-gray-600 sm:text-base">
              Practice with <span className="font-semibold text-gray-800">exam-style Desmos</span>{' '}
              (College Board testing version) or a <span className="font-semibold text-gray-800">TI-84</span>{' '}
              for handheld paths —{' '}
              <span className="font-semibold text-gray-800">{deckCount} decks</span>,{' '}
              <span className="font-semibold text-gray-800">{drillCount} drills</span>.
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <Link
                href="/ap-stats-calculator-simulator"
                className="inline-flex items-center gap-2 rounded-lg border-2 border-gray-900 bg-gray-900 px-4 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
              >
                Open calculator drills
                <ArrowRight className="h-4 w-4 shrink-0" aria-hidden />
              </Link>
            </div>
          </div>

          <div
            className="relative mx-auto mt-1 flex h-[160px] w-[min(100%,280px)] shrink-0 flex-col justify-between overflow-hidden rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:mx-0 sm:mt-0"
            aria-hidden
          >
            <div className="flex items-center justify-between gap-2">
              <span className="rounded bg-orange-50 px-1.5 py-0.5 text-[9px] font-bold text-orange-700">
                Desmos
              </span>
              <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[9px] font-bold text-slate-600">
                TI-84
              </span>
            </div>
            <p className="font-mono text-sm font-semibold text-slate-800">normalcdf(-∞, 1.2)</p>
            <p className="text-right font-mono text-lg font-bold text-slate-900">0.8849</p>
            <div className="h-8 rounded-md bg-gradient-to-r from-orange-100 via-blue-50 to-emerald-50" />
          </div>
        </div>
      </div>
    </div>
  );
}
