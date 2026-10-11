'use client';

import { useReducer, useState, useCallback, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { INITIAL_STATE, calcReducer } from '@/lib/ti84-simulator';
import { CALCULATOR_DRILL_DECKS } from '@/lib/ti84-drills/drillBank';
import { checkDrill } from '@/lib/ti84-drills/checkDrill';
import type { CalculatorDrill, CalculatorDrillDeck, DrillCheckStatus } from '@/lib/ti84-drills/types';
import { DESMOS_DRILL_DECKS, isDesmosDeck } from '@/lib/desmos-drills';
import type { DesmosDrill, DesmosDrillDeck } from '@/lib/desmos-drills';
import { useAuthContext } from '@/contexts/AuthContext';
import { hasStatsPremiumAccess } from '@/lib/utils';
import { SeasonPassModal } from '@/components/SeasonPassModal';
import { CollegeBoardDesmosPanel } from '@/components/desmos/CollegeBoardDesmosPanel';
import { Ti84Simulator } from './Ti84Simulator';
import { CalculatorDrillTaskCard } from './CalculatorDrillTaskCard';

type CalcMode = 'desmos' | 'ti84';

type AnyDeck = CalculatorDrillDeck | DesmosDrillDeck;
type AnyDrill = CalculatorDrill | DesmosDrill;

function DeckPicker({
  mode,
  onSelect,
}: {
  mode: CalcMode;
  onSelect: (deck: AnyDeck) => void;
}) {
  if (mode === 'desmos') {
    return (
      <div className="w-full space-y-8">
        <section>
          <div className="mb-3 flex items-baseline justify-between gap-3 border-b border-gray-200 pb-2">
            <div>
              <h2 className="text-sm font-black uppercase tracking-[0.14em] text-slate-800">
                Desmos · Distributions
              </h2>
              <p className="mt-0.5 text-sm text-gray-500">
                Software workflows (Inference widget) — not TI menu paths
              </p>
            </div>
            <p className="shrink-0 text-xs font-medium text-gray-400">
              {DESMOS_DRILL_DECKS.length} deck
              {DESMOS_DRILL_DECKS.length === 1 ? '' : 's'}
            </p>
          </div>

          <ul className="divide-y divide-gray-100">
            {DESMOS_DRILL_DECKS.map((deck) => {
              const shortTitle = deck.title.includes('·')
                ? deck.title.split('·').slice(1).join('·').trim()
                : deck.title;

              return (
                <li key={deck.id}>
                  <button
                    type="button"
                    onClick={() => onSelect(deck)}
                    className="group flex w-full items-center gap-3 py-3.5 text-left transition hover:bg-orange-50/60"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="text-[15px] font-semibold text-gray-900 group-hover:text-orange-700">
                        {shortTitle}
                      </p>
                      <p className="mt-0.5 truncate text-sm text-gray-500">{deck.description}</p>
                    </div>
                    <span className="shrink-0 text-xs font-medium tabular-nums text-gray-400">
                      {deck.drills.length} card{deck.drills.length === 1 ? '' : 's'}
                    </span>
                    <span
                      className="shrink-0 text-orange-500 opacity-0 transition group-hover:opacity-100"
                      aria-hidden
                    >
                      →
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </section>
      </div>
    );
  }

  const groups: { family: CalculatorDrillDeck['family']; label: string; blurb: string }[] = [
    { family: 'DISTR', label: 'DISTR', blurb: 'Areas and critical values' },
    { family: 'STAT TESTS', label: 'STAT · TESTS', blurb: 'Inference procedures' },
  ];

  return (
    <div className="w-full space-y-8">
      {groups.map((group) => {
        const decks = CALCULATOR_DRILL_DECKS.filter((d) => d.family === group.family);
        if (decks.length === 0) return null;

        return (
          <section key={group.family}>
            <div className="mb-3 flex items-baseline justify-between gap-3 border-b border-gray-200 pb-2">
              <div>
                <h2 className="text-sm font-black uppercase tracking-[0.14em] text-slate-800">
                  {group.label}
                </h2>
                <p className="mt-0.5 text-sm text-gray-500">{group.blurb}</p>
              </div>
              <p className="shrink-0 text-xs font-medium text-gray-400">
                {decks.length} decks
              </p>
            </div>

            <ul className="divide-y divide-gray-100">
              {decks.map((deck) => {
                const shortTitle = deck.title.includes('·')
                  ? deck.title.split('·').slice(1).join('·').trim()
                  : deck.title;

                return (
                  <li key={deck.id}>
                    <button
                      type="button"
                      onClick={() => onSelect(deck)}
                      className="group flex w-full items-center gap-3 py-3.5 text-left transition hover:bg-orange-50/60"
                    >
                      <div className="min-w-0 flex-1">
                        <p className="text-[15px] font-semibold text-gray-900 group-hover:text-orange-700">
                          {shortTitle}
                        </p>
                        <p className="mt-0.5 truncate text-sm text-gray-500">{deck.description}</p>
                      </div>
                      <span className="shrink-0 text-xs font-medium tabular-nums text-gray-400">
                        {deck.drills.length} cards
                      </span>
                      <span
                        className="shrink-0 text-orange-500 opacity-0 transition group-hover:opacity-100"
                        aria-hidden
                      >
                        →
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </section>
        );
      })}
    </div>
  );
}

function DeckProgressBar({
  deckTitle,
  completed,
  total,
  onBack,
}: {
  deckTitle: string;
  completed: number;
  total: number;
  onBack: () => void;
}) {
  const percent = total > 0 ? Math.min(100, (completed / total) * 100) : 0;

  return (
    <div className="mb-6 sm:mb-8">
      <div className="mb-3 flex items-center justify-between gap-3">
        <p className="truncate text-sm font-semibold text-gray-800">{deckTitle}</p>
        <button
          type="button"
          onClick={onBack}
          className="shrink-0 text-sm font-medium text-gray-500 transition hover:text-gray-800"
        >
          All decks
        </button>
      </div>
      <div className="relative h-6 overflow-hidden rounded-full border-2 border-black bg-gray-200">
        <motion.div
          className="h-full bg-orange-500"
          initial={false}
          animate={{ width: `${percent}%` }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="z-10 text-xs font-bold text-gray-900">
            {completed} / {total} stages
          </span>
        </div>
      </div>
    </div>
  );
}

function CalcModeToggle({
  mode,
  onChange,
}: {
  mode: CalcMode;
  onChange: (mode: CalcMode) => void;
}) {
  return (
    <div className="inline-flex rounded-lg border border-gray-200 bg-gray-100 p-1">
      <button
        type="button"
        onClick={() => onChange('desmos')}
        className={`rounded-md px-3.5 py-1.5 text-sm font-semibold transition ${
          mode === 'desmos'
            ? 'bg-white text-gray-900 shadow-sm'
            : 'text-gray-500 hover:text-gray-800'
        }`}
      >
        Desmos
        <span className="ml-1.5 hidden text-[10px] font-bold uppercase tracking-wide text-orange-600 sm:inline">
          exam-style
        </span>
      </button>
      <button
        type="button"
        onClick={() => onChange('ti84')}
        className={`rounded-md px-3.5 py-1.5 text-sm font-semibold transition ${
          mode === 'ti84'
            ? 'bg-white text-gray-900 shadow-sm'
            : 'text-gray-500 hover:text-gray-800'
        }`}
      >
        TI-84
        <span className="ml-1.5 hidden text-[10px] font-bold uppercase tracking-wide text-slate-500 sm:inline">
          handheld
        </span>
      </button>
    </div>
  );
}

export function CalculatorDrillSession() {
  const { userData } = useAuthContext();
  const isPremium = hasStatsPremiumAccess(userData);

  const [calcMode, setCalcMode] = useState<CalcMode>('desmos');
  const [state, dispatch] = useReducer(calcReducer, INITIAL_STATE);
  const [deck, setDeck] = useState<AnyDeck | null>(null);
  const [index, setIndex] = useState(0);
  const [hintLevel, setHintLevel] = useState(0);
  const [failCount, setFailCount] = useState(0);
  const [status, setStatus] = useState<DrillCheckStatus>('idle');
  const [feedback, setFeedback] = useState<string | null>(null);
  const [showSeasonPassModal, setShowSeasonPassModal] = useState(false);

  const drills: AnyDrill[] = deck?.drills ?? [];
  const drill = drills[index];
  const tiDrill = calcMode === 'ti84' && drill && 'targetRoutine' in drill ? drill : null;
  const showPath = calcMode === 'ti84' && failCount >= 2 && status === 'incorrect';
  const completedStages = Math.min(index, drills.length);
  const totalStages = drills.length;
  const lastAutoCheckKeyRef = useRef<string | null>(null);

  const resetDrillUi = useCallback(() => {
    setHintLevel(0);
    setFailCount(0);
    setStatus('idle');
    setFeedback(null);
    lastAutoCheckKeyRef.current = null;
  }, []);

  useEffect(() => {
    if (!isPremium && index > 0) {
      setIndex(0);
    }
  }, [isPremium, index]);

  // Keep deck bank aligned with calculator mode (also clears HMR / stale TI decks in Desmos).
  useEffect(() => {
    if (!deck) return;
    const deckIsDesmos = isDesmosDeck(deck);
    if (calcMode === 'desmos' && !deckIsDesmos) {
      setDeck(null);
      setIndex(0);
      resetDrillUi();
      return;
    }
    if (calcMode === 'ti84' && deckIsDesmos) {
      setDeck(null);
      setIndex(0);
      resetDrillUi();
    }
  }, [calcMode, deck, resetDrillUi]);

  // TI-84 auto-grade only
  useEffect(() => {
    if (calcMode !== 'ti84' || !tiDrill) return;

    if (tiDrill.goal === 'locate') {
      const onTarget =
        state.routine === tiDrill.targetRoutine &&
        (state.mode === 'input' || state.mode === 'result');
      if (!onTarget) return;

      const key = `locate:${tiDrill.id}:${state.routine}`;
      if (lastAutoCheckKeyRef.current === key) return;
      lastAutoCheckKeyRef.current = key;

      const result = checkDrill(tiDrill, state);
      setStatus(result.status);
      setFeedback(result.message);
      return;
    }

    if (state.mode === 'result') {
      const key = `result:${tiDrill.id}:${state.routine}:${state.screenLines.map((l) => l.text).join('|')}`;
      if (lastAutoCheckKeyRef.current === key) return;
      lastAutoCheckKeyRef.current = key;

      const result = checkDrill(tiDrill, state);
      setStatus(result.status);
      setFeedback(result.message);
      if (result.status === 'incorrect') {
        setFailCount((c) => c + 1);
      }
      return;
    }

    if (status === 'incorrect') {
      setStatus('idle');
      setFeedback(null);
      lastAutoCheckKeyRef.current = null;
    }
  }, [
    calcMode,
    tiDrill,
    state.mode,
    state.routine,
    state.screenLines,
    state.inputValues,
    status,
  ]);

  const handleModeChange = (mode: CalcMode) => {
    setCalcMode(mode);
    setDeck(null);
    setIndex(0);
    resetDrillUi();
    dispatch({ type: 'reset' });
  };

  const handleSelectDeck = (next: AnyDeck) => {
    setDeck(next);
    setIndex(0);
    resetDrillUi();
    dispatch({ type: 'reset' });
  };

  const handleBackToDecks = () => {
    setDeck(null);
    setIndex(0);
    resetDrillUi();
    dispatch({ type: 'reset' });
  };

  const handleHint = () => {
    if (!drill) return;
    setHintLevel((h) => Math.min(h + 1, drill.hints.length));
  };

  const handleResetCalc = () => {
    dispatch({ type: 'reset' });
    setStatus('idle');
    setFeedback(null);
    lastAutoCheckKeyRef.current = null;
  };

  const handleMarkComplete = () => {
    setStatus('correct');
    setFeedback('Nice — keep going when you are ready.');
  };

  const handleContinue = () => {
    if (!isPremium && index === 0 && drills.length > 1) {
      setShowSeasonPassModal(true);
      return;
    }

    setIndex((i) => i + 1);
    resetDrillUi();
    dispatch({ type: 'reset' });
  };

  const isDesmos = calcMode === 'desmos';

  return (
    <div className={`mx-auto w-full ${isDesmos ? 'max-w-[1400px]' : 'max-w-7xl'}`}>
      <AnimatePresence mode="wait" initial={false}>
        {!deck ? (
          <motion.header
            key="page-header"
            className="mb-8 sm:mb-10"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22 }}
          >
            <p className="text-sm font-black uppercase tracking-[0.18em] text-orange-600 sm:text-base">
              AP Statistics
            </p>
            <h1 className="mt-2.5 text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
              Calculator Drills
            </h1>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-gray-500 sm:text-lg">
              {isDesmos
                ? 'Desmos drills teach exam-style software moves (Inference, distributions) — different from TI-84 keystroke paths.'
                : 'TI-84 drills teach handheld menu paths with auto-graded screens.'}
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-3">
              <CalcModeToggle mode={calcMode} onChange={handleModeChange} />
            </div>
          </motion.header>
        ) : (
          <motion.div
            key="deck-progress"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22 }}
          >
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <CalcModeToggle mode={calcMode} onChange={handleModeChange} />
            </div>
            <DeckProgressBar
              deckTitle={deck.title}
              completed={completedStages}
              total={totalStages}
              onBack={handleBackToDecks}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {isDesmos ? (
        <div className="flex flex-col gap-6 lg:gap-8">
          {/* Desmos needs a wide workspace; task card sits beside or below */}
          <div className="flex flex-col items-stretch gap-6 xl:flex-row xl:items-start xl:gap-8">
            <div className="min-w-0 flex-1">
              <CollegeBoardDesmosPanel fullWidth height={680} />
            </div>
            <div className="w-full shrink-0 xl:w-[400px] xl:sticky xl:top-8">
              {!deck ? (
                <DeckPicker mode={calcMode} onSelect={handleSelectDeck} />
              ) : (
                <CalculatorDrillTaskCard
                  drills={drills}
                  index={index}
                  hintLevel={hintLevel}
                  status={status}
                  feedback={feedback}
                  showPath={false}
                  selfCheck
                  onHint={handleHint}
                  onResetCalc={handleResetCalc}
                  onMarkComplete={handleMarkComplete}
                  onContinue={handleContinue}
                  onBackToDecks={handleBackToDecks}
                />
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-start gap-6 lg:flex-row lg:gap-8">
          <div className="flex w-full shrink-0 justify-center lg:w-auto lg:justify-start">
            <Ti84Simulator state={state} dispatch={dispatch} />
          </div>
          <div className="w-full min-w-0 flex-1 lg:sticky lg:top-8">
            {!deck ? (
              <DeckPicker mode={calcMode} onSelect={handleSelectDeck} />
            ) : (
              <CalculatorDrillTaskCard
                drills={drills}
                index={index}
                hintLevel={hintLevel}
                status={status}
                feedback={feedback}
                showPath={showPath}
                selfCheck={false}
                onHint={handleHint}
                onResetCalc={handleResetCalc}
                onContinue={handleContinue}
                onBackToDecks={handleBackToDecks}
              />
            )}
          </div>
        </div>
      )}

      {showSeasonPassModal && (
        <SeasonPassModal subject="stats" onClose={() => setShowSeasonPassModal(false)} />
      )}
    </div>
  );
}
