'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { TutorAssistantMarkdown } from '@/components/TutorAssistantMarkdown';
import { MathSolverProblemPanel } from '@/components/MathSolverSolutionView';
import type { MathSolverPractice, MathSolverProblem } from '@/lib/mathSolver/types';

const STACK_VISIBLE = 3;
const STACK_OFFSET = 18;

function CardChrome({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm ${className}`}>
      {children}
    </div>
  );
}

function BackCardShell() {
  return <div className="h-full rounded-xl border border-gray-200 bg-white shadow-sm" />;
}

function problemPromptText(problem: MathSolverProblem): string {
  const restatement = problem.restatement?.trim();
  if (restatement) return restatement;
  const partPrompt = problem.parts[0]?.prompt?.trim();
  if (partPrompt) return partPrompt;
  return problem.title;
}

function ActivePracticeCard({
  problem,
  index,
  total,
  onContinue,
}: {
  problem: MathSolverProblem;
  index: number;
  total: number;
  onContinue: () => void;
}) {
  const [showWalkthrough, setShowWalkthrough] = useState(false);
  const prompt = problemPromptText(problem);
  const isLast = index >= total - 1;

  return (
    <CardChrome>
      <div className="flex items-center justify-between gap-3 border-b border-gray-100 bg-gray-50/80 px-5 py-4">
        <div className="min-w-0">
          <p className="text-xs font-medium tracking-wide text-gray-400">Practice problem</p>
          <p className="mt-0.5 truncate text-sm font-semibold text-gray-800">
            {problem.topic || problem.title || `Problem ${index + 1}`}
          </p>
        </div>
        <p className="shrink-0 tabular-nums text-xs font-medium text-gray-400">
          {index + 1} / {total}
        </p>
      </div>

      <div className="flex flex-col gap-4 px-5 py-5">
        {!showWalkthrough ? (
          <>
            <div>
              <p className="mb-1.5 text-xs font-medium text-gray-400">Try this</p>
              <TutorAssistantMarkdown
                text={prompt}
                className="tutor-markdown text-[17px] leading-relaxed text-gray-900 [&_.katex]:text-inherit"
              />
            </div>
            {problem.parts.length > 1 && (
              <ol className="space-y-2 rounded-lg border border-gray-100 bg-gray-50 px-4 py-3">
                {problem.parts.map((part) => (
                  <li key={part.label} className="text-sm text-gray-700">
                    <span className="font-semibold text-gray-500">({part.label}) </span>
                    <TutorAssistantMarkdown
                      text={part.prompt || ''}
                      className="tutor-markdown inline text-sm [&_p]:mb-0 [&_.katex]:text-inherit"
                    />
                  </li>
                ))}
              </ol>
            )}
            <p className="text-sm text-gray-500">
              Work it on paper first — then reveal the step-by-step walkthrough.
            </p>
            <button
              type="button"
              onClick={() => setShowWalkthrough(true)}
              className="inline-flex w-full items-center justify-center rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 active:scale-[0.99]"
            >
              Reveal walkthrough
            </button>
          </>
        ) : (
          <>
            <MathSolverProblemPanel problem={problem} />
            <button
              type="button"
              onClick={onContinue}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 active:scale-[0.99]"
            >
              {isLast ? 'Finish practice' : 'Next practice'}
              {!isLast && <span aria-hidden>→</span>}
            </button>
          </>
        )}
      </div>
    </CardChrome>
  );
}

export function MathSolverPracticeDeck({ practice }: { practice: MathSolverPractice }) {
  const [index, setIndex] = useState(0);
  const frontRef = useRef<HTMLDivElement>(null);
  const [frontHeight, setFrontHeight] = useState(0);

  const problems = practice.problems;
  const remaining = problems.length - index;
  const visibleCount = Math.min(STACK_VISIBLE, remaining);
  const stack = problems.slice(index, index + visibleCount);
  const currentId = stack[0]
    ? `${index}-${stack[0].title}-${stack[0].restatement?.slice(0, 24) ?? ''}`
    : 'done';

  useEffect(() => {
    const el = frontRef.current;
    if (!el) return;
    const update = () => setFrontHeight(el.offsetHeight);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [currentId, index]);

  if (remaining <= 0) {
    return (
      <div className="w-full max-w-xl">
        <CardChrome>
          <div className="px-5 py-10 text-center">
            <p className="text-lg font-semibold text-gray-800">Practice set complete</p>
            <p className="mt-1.5 text-sm text-gray-500">
              Generate another set anytime from your upload.
            </p>
          </div>
        </CardChrome>
      </div>
    );
  }

  const backCards = stack.slice(1);

  return (
    <div className="w-full max-w-xl space-y-3">
      {practice.note && (
        <p className="rounded-lg border border-gray-100 bg-gray-50 px-3 py-2 text-sm text-gray-600">
          {practice.note}
        </p>
      )}

      <div
        className="relative"
        style={{ paddingBottom: Math.max(0, visibleCount - 1) * STACK_OFFSET }}
      >
        {backCards
          .map((problem, i) => ({ problem, depth: i + 1 }))
          .reverse()
          .map(({ problem, depth }) => (
            <motion.div
              key={`back-${index + depth}-${problem.title}`}
              className="pointer-events-none absolute inset-x-0 top-0"
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
            key={currentId}
            className="relative"
            style={{ zIndex: STACK_VISIBLE }}
            initial={{ y: STACK_OFFSET, opacity: 0.85, scale: 0.985 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -56, opacity: 0, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 380, damping: 32 }}
          >
            <div ref={frontRef}>
              <ActivePracticeCard
                problem={stack[0]}
                index={index}
                total={problems.length}
                onContinue={() => setIndex((i) => i + 1)}
              />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
