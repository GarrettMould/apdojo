'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { CalculatorDrill, DrillCheckStatus } from '@/lib/ti84-drills/types';

const SUCCESS_PHRASES = [
  'Well done!',
  'Good stuff!',
  'Nailed it!',
  'Nice work!',
  'You got it!',
  'Clean hit!',
];

function successPhraseForDrill(drillId: string): string {
  let hash = 0;
  for (let i = 0; i < drillId.length; i++) {
    hash = (hash + drillId.charCodeAt(i) * (i + 1)) % SUCCESS_PHRASES.length;
  }
  return SUCCESS_PHRASES[hash];
}

const STACK_VISIBLE = 3;
/** How much of each back card peeks out below the one in front */
const STACK_OFFSET = 18;

type Props = {
  drills: CalculatorDrill[];
  index: number;
  hintLevel: number;
  status: DrillCheckStatus;
  feedback: string | null;
  showPath: boolean;
  onHint: () => void;
  onResetCalc: () => void;
  onContinue: () => void;
  onBackToDecks?: () => void;
};

function CardChrome({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden ${className}`}
    >
      {children}
    </div>
  );
}

function BackCardShell() {
  return (
    <div className="h-full rounded-xl border border-gray-200 bg-white shadow-sm" />
  );
}

function ActiveCardBody({
  drill,
  index,
  total,
  hintLevel,
  status,
  feedback,
  showPath,
  onHint,
  onResetCalc,
  onContinue,
}: {
  drill: CalculatorDrill;
  index: number;
  total: number;
  hintLevel: number;
  status: DrillCheckStatus;
  feedback: string | null;
  showPath: boolean;
  onHint: () => void;
  onResetCalc: () => void;
  onContinue: () => void;
}) {
  const visibleHints = drill.hints.slice(0, hintLevel);
  const canHint = hintLevel < drill.hints.length;
  const isCorrect = status === 'correct';
  const isLast = index >= total - 1;

  return (
    <CardChrome>
      <div className="flex items-center justify-between gap-3 border-b border-gray-200 bg-slate-100 px-4 py-2.5">
        <div>
          <p className="text-[10px] font-medium uppercase tracking-wide text-slate-500">Calculator drill</p>
          <p className="text-xs font-semibold text-slate-800">{drill.skillLabel}</p>
        </div>
        <p className="shrink-0 tabular-nums text-[11px] font-medium text-slate-500">
          {index + 1} / {total}
        </p>
      </div>

      <div className="px-5 py-5 flex flex-col gap-5">
        <div>
          <p className="text-xs font-medium text-gray-400 mb-1.5">Question</p>
          <p className="text-[17px] text-gray-900 leading-relaxed">{drill.prompt}</p>
        </div>

        <div className="overflow-hidden rounded-lg border border-orange-200/80 bg-[#fffaf5]">
          <div className="flex items-center gap-2 border-b border-orange-200/60 bg-orange-50/90 px-3.5 py-2">
            <span className="h-1.5 w-1.5 rounded-full bg-orange-500" aria-hidden />
            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-orange-700">
              Your task
            </p>
          </div>
          <div className="px-3.5 py-3.5">
            <p className="font-mono text-[13px] leading-relaxed text-slate-800 sm:text-sm">
              {drill.goalText}
            </p>
            {drill.successCue && (
              <div className="mt-3 border-t border-dashed border-orange-200/80 pt-3">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-orange-600/80">
                  Target readout
                </p>
                <p className="mt-1 font-mono text-sm font-medium text-slate-700">
                  {drill.successCue.replace(/^You should see\s+(?:a result\s+)?/i, '')}
                </p>
              </div>
            )}
          </div>
        </div>

        {feedback && isCorrect && (
          <div className="flex items-center justify-between gap-3" role="status">
            <p className="flex items-center gap-2 text-sm font-bold text-emerald-600">
              <span
                className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-[11px] font-black text-white"
                aria-hidden
              >
                ✓
              </span>
              Screen matches. {successPhraseForDrill(drill.id)}
            </p>
            <button
              type="button"
              onClick={onContinue}
              className="shrink-0 text-sm font-semibold text-orange-600 underline decoration-dashed decoration-orange-400 underline-offset-4 transition hover:text-orange-700 hover:decoration-orange-600"
            >
              {isLast ? 'Finish' : 'Next Question'}
            </button>
          </div>
        )}

        {feedback && !isCorrect && (
          <div
            className="flex items-start gap-3 rounded-lg border border-amber-300 bg-amber-50 px-3.5 py-3 text-amber-950"
            role="status"
          >
            <span
              className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber-200/80 text-[11px] font-black text-amber-900"
              aria-hidden
            >
              !
            </span>
            <div className="min-w-0">
              <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-amber-700">
                Not quite
              </p>
              <p className="mt-0.5 text-sm leading-snug text-amber-950">
                {feedback}
              </p>
            </div>
          </div>
        )}

        {visibleHints.length > 0 && (
          <div className="rounded-xl bg-gray-50/80 px-4 py-3 ring-1 ring-inset ring-gray-200/70">
            <p className="mb-2 text-xs font-medium text-gray-400">Hints</p>
            <ol className="list-decimal list-inside space-y-1.5 text-sm text-gray-600">
              {visibleHints.map((h, i) => (
                <li key={i}>{h}</li>
              ))}
            </ol>
          </div>
        )}

        {showPath && (
          <div className="rounded-xl bg-slate-50 px-4 py-3 ring-1 ring-inset ring-slate-200/80">
            <p className="mb-1 text-xs font-medium text-slate-500">Path</p>
            <p className="font-mono text-sm leading-snug text-slate-800">{drill.showPath}</p>
          </div>
        )}

        {!isCorrect && (
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={onHint}
              disabled={!canHint}
              className="inline-flex items-center justify-center rounded-xl bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm ring-1 ring-gray-200 transition hover:bg-gray-50 hover:ring-gray-300 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-white disabled:hover:ring-gray-200"
            >
              {canHint ? `Hint · ${hintLevel}/${drill.hints.length}` : 'Hints done'}
            </button>
            <button
              type="button"
              onClick={onResetCalc}
              className="inline-flex items-center justify-center rounded-xl bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm ring-1 ring-gray-200 transition hover:bg-gray-50 hover:ring-gray-300"
            >
              Reset calculator
            </button>
          </div>
        )}
      </div>
    </CardChrome>
  );
}

export function CalculatorDrillTaskCard(props: Props) {
  const { drills, index, onContinue, hintLevel, status, feedback, showPath, onBackToDecks } = props;
  const remaining = drills.length - index;
  const visibleCount = Math.min(STACK_VISIBLE, remaining);
  const stackDrills = drills.slice(index, index + visibleCount);
  const frontRef = useRef<HTMLDivElement>(null);
  const [frontHeight, setFrontHeight] = useState(0);

  // Keep back-card shells the same height as the active card so peeks show below it
  useEffect(() => {
    const el = frontRef.current;
    if (!el) return;
    const update = () => setFrontHeight(el.offsetHeight);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [stackDrills[0]?.id, hintLevel, status, feedback, showPath]);

  if (remaining <= 0) {
    return (
      <aside className="w-full">
        <CardChrome>
          <div className="px-5 py-10 text-center">
            <p className="text-lg font-semibold text-gray-800">Deck complete</p>
            <p className="mt-1.5 text-sm text-gray-500">
              Nice work — pick another skill deck to keep practicing.
            </p>
            {onBackToDecks && (
              <button
                type="button"
                onClick={onBackToDecks}
                className="mt-5 inline-flex items-center justify-center rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
              >
                Choose another deck
              </button>
            )}
          </div>
        </CardChrome>
      </aside>
    );
  }

  const backCards = stackDrills.slice(1);

  return (
    <aside className="w-full">
      <div
        className="relative"
        style={{ paddingBottom: Math.max(0, visibleCount - 1) * STACK_OFFSET }}
      >
        {backCards
          .map((drill, i) => ({ drill, depth: i + 1 }))
          .reverse()
          .map(({ drill, depth }) => (
            <motion.div
              key={`back-${drill.id}`}
              className="absolute inset-x-0 top-0 pointer-events-none"
              initial={false}
              animate={{
                y: depth * STACK_OFFSET,
                scale: 1 - depth * 0.012,
              }}
              transition={{ type: 'spring', stiffness: 380, damping: 32 }}
              style={{
                zIndex: STACK_VISIBLE - depth,
                height: frontHeight > 0 ? frontHeight : undefined,
              }}
              aria-hidden
            >
              <BackCardShell />
            </motion.div>
          ))}

        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={stackDrills[0].id}
            className="relative"
            style={{ zIndex: STACK_VISIBLE }}
            initial={{ y: STACK_OFFSET, opacity: 0.85, scale: 0.985 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -56, opacity: 0, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 380, damping: 32 }}
          >
            <div ref={frontRef}>
              <ActiveCardBody
                {...props}
                drill={stackDrills[0]}
                index={index}
                total={drills.length}
                onContinue={onContinue}
              />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </aside>
  );
}
