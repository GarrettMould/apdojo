'use client';

import { useReducer, useState, useCallback, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { INITIAL_STATE, calcReducer } from '@/lib/ti84-simulator';
import { CALCULATOR_DRILL_DECKS } from '@/lib/ti84-drills/drillBank';
import { checkDrill } from '@/lib/ti84-drills/checkDrill';
import type { CalculatorDrillDeck, DrillCheckStatus } from '@/lib/ti84-drills/types';
import { useAuthContext } from '@/contexts/AuthContext';
import { hasStatsPremiumAccess } from '@/lib/utils';
import { SeasonPassModal } from '@/components/SeasonPassModal';
import { Ti84Simulator } from './Ti84Simulator';
import { CalculatorDrillTaskCard } from './CalculatorDrillTaskCard';

function DeckPicker({
  onSelect,
}: {
  onSelect: (deck: CalculatorDrillDeck) => void;
}) {
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
                        <p className="mt-0.5 truncate text-sm text-gray-500">
                          {deck.description}
                        </p>
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

/** XP-bar style progress — fills as each stage is completed. */
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
      <div className="h-6 overflow-hidden rounded-full border-2 border-black bg-gray-200 relative">
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

export function CalculatorDrillSession() {
  const { userData } = useAuthContext();
  const isPremium = hasStatsPremiumAccess(userData);

  const [state, dispatch] = useReducer(calcReducer, INITIAL_STATE);
  const [deck, setDeck] = useState<CalculatorDrillDeck | null>(null);
  const [index, setIndex] = useState(0);
  const [hintLevel, setHintLevel] = useState(0);
  const [failCount, setFailCount] = useState(0);
  const [status, setStatus] = useState<DrillCheckStatus>('idle');
  const [feedback, setFeedback] = useState<string | null>(null);
  const [showSeasonPassModal, setShowSeasonPassModal] = useState(false);

  const drills = deck?.drills ?? [];
  const drill = drills[index];
  const showPath = failCount >= 2 && status === 'incorrect';
  // index = how many cards already finished (Continue advances index)
  const completedStages = Math.min(index, drills.length);
  const totalStages = drills.length;

  // Free users never leave round 1 of a deck
  useEffect(() => {
    if (!isPremium && index > 0) {
      setIndex(0);
    }
  }, [isPremium, index]);

  const lastAutoCheckKeyRef = useRef<string | null>(null);

  const resetDrillUi = useCallback(() => {
    setHintLevel(0);
    setFailCount(0);
    setStatus('idle');
    setFeedback(null);
    lastAutoCheckKeyRef.current = null;
  }, []);

  // Auto-read the calculator screen when a drill reaches a settled state
  useEffect(() => {
    if (!drill) return;

    if (drill.goal === 'locate') {
      const onTarget =
        state.routine === drill.targetRoutine &&
        (state.mode === 'input' || state.mode === 'result');
      if (!onTarget) return;

      const key = `locate:${drill.id}:${state.routine}`;
      if (lastAutoCheckKeyRef.current === key) return;
      lastAutoCheckKeyRef.current = key;

      const result = checkDrill(drill, state);
      setStatus(result.status);
      setFeedback(result.message);
      return;
    }

    // produce: grade whenever the result screen content is new
    if (state.mode === 'result') {
      const key = `result:${drill.id}:${state.routine}:${state.screenLines.map((l) => l.text).join('|')}`;
      if (lastAutoCheckKeyRef.current === key) return;
      lastAutoCheckKeyRef.current = key;

      const result = checkDrill(drill, state);
      setStatus(result.status);
      setFeedback(result.message);
      if (result.status === 'incorrect') {
        setFailCount((c) => c + 1);
      }
      return;
    }

    // Left the result screen to try again — clear sticky incorrect feedback
    if (status === 'incorrect') {
      setStatus('idle');
      setFeedback(null);
      lastAutoCheckKeyRef.current = null;
    }
  }, [
    drill,
    state.mode,
    state.routine,
    state.screenLines,
    state.inputValues,
    status,
  ]);

  const handleSelectDeck = (next: CalculatorDrillDeck) => {
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

  const handleContinue = () => {
    // Free: first card only. Next Question / Finish on multi-card decks → season pass.
    if (!isPremium && index === 0 && drills.length > 1) {
      setShowSeasonPassModal(true);
      return;
    }

    setIndex((i) => i + 1);
    resetDrillUi();
    dispatch({ type: 'reset' });
  };

  return (
    <div className="mx-auto w-full max-w-7xl">
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
              TI-84 Calculator Drills
            </h1>
            <p className="mt-3 max-w-xl text-base leading-relaxed text-gray-500 sm:text-lg">
              Build muscle memory for the calculator skills that show up on the AP exam.
            </p>
          </motion.header>
        ) : (
          <motion.div
            key="deck-progress"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22 }}
          >
            <DeckProgressBar
              deckTitle={deck.title}
              completed={completedStages}
              total={totalStages}
              onBack={handleBackToDecks}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col items-start gap-6 lg:flex-row lg:gap-8">
        <div className="flex w-full shrink-0 justify-center lg:w-auto lg:justify-start">
          <Ti84Simulator state={state} dispatch={dispatch} />
        </div>
        <div className="w-full min-w-0 flex-1 lg:sticky lg:top-8">
          {!deck ? (
            <DeckPicker onSelect={handleSelectDeck} />
          ) : (
            <CalculatorDrillTaskCard
              drills={drills}
              index={index}
              hintLevel={hintLevel}
              status={status}
              feedback={feedback}
              showPath={showPath}
              onHint={handleHint}
              onResetCalc={handleResetCalc}
              onContinue={handleContinue}
              onBackToDecks={handleBackToDecks}
            />
          )}
        </div>
      </div>

      {showSeasonPassModal && (
        <SeasonPassModal
          subject="stats"
          onClose={() => setShowSeasonPassModal(false)}
        />
      )}
    </div>
  );
}
