'use client';

import { useState } from 'react';
import { TutorAssistantMarkdown } from '@/components/TutorAssistantMarkdown';
import type { MathSolverPart, MathSolverProblem, MathSolverSolution } from '@/lib/mathSolver/types';

function PartWalkthrough({
  part,
  showPartBadge,
  /** When true, skip repeating the prompt if the problem header already shows it */
  hidePrompt,
}: {
  part: MathSolverPart;
  showPartBadge: boolean;
  hidePrompt?: boolean;
}) {
  const [visibleSteps, setVisibleSteps] = useState(1);
  const [answerShown, setAnswerShown] = useState(false);

  const total = part.steps.length;
  const allStepsShown = visibleSteps >= total;
  const canShowAnswer = allStepsShown || total === 0;
  const badgeLabel = /^part\s+/i.test(part.label.trim())
    ? part.label.trim()
    : `Part ${part.label.trim()}`;
  const showPrompt = !hidePrompt && Boolean(part.prompt?.trim());

  return (
    <div
      className={
        showPartBadge
          ? 'rounded-xl border border-orange-100 bg-orange-50/40 p-4'
          : 'space-y-3'
      }
    >
      {(showPartBadge || showPrompt) && (
        <div className="mb-3 space-y-2">
          {showPartBadge && (
            <span className="inline-flex h-7 min-w-7 items-center justify-center rounded-md bg-orange-500 px-2.5 text-xs font-bold text-white">
              {badgeLabel}
            </span>
          )}
          {showPrompt && (
            <TutorAssistantMarkdown
              text={part.prompt}
              className="tutor-markdown text-[15px] leading-relaxed text-slate-800 [&_strong]:font-semibold [&_.katex]:text-inherit"
            />
          )}
        </div>
      )}

      <ol className="space-y-3">
        {part.steps.slice(0, visibleSteps).map((step, i) => (
          <li
            key={i}
            className="animate-in fade-in slide-in-from-bottom-1 rounded-lg border border-slate-200 bg-white p-3 shadow-sm duration-300"
          >
            <div className="mb-1 flex items-center gap-2">
              <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-slate-900 text-[10px] font-bold text-white">
                {i + 1}
              </span>
              <TutorAssistantMarkdown
                text={step.title}
                inline
                className="tutor-markdown text-sm font-semibold text-slate-900 [&_p]:mb-0 [&_.katex]:text-inherit"
              />
            </div>
            <TutorAssistantMarkdown
              text={step.explanation}
              className="tutor-markdown pl-7 text-[14px] leading-relaxed text-slate-700 [&_p]:mb-1 [&_p]:last:mb-0 [&_.katex]:text-inherit"
            />
          </li>
        ))}
      </ol>

      {!allStepsShown && total > 0 && (
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setVisibleSteps((n) => Math.min(n + 1, total))}
            className="rounded-lg bg-orange-500 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-orange-600"
          >
            Next step ({visibleSteps}/{total})
          </button>
          <button
            type="button"
            onClick={() => setVisibleSteps(total)}
            className="rounded-lg px-3 py-2 text-sm font-medium text-slate-500 transition-colors hover:bg-white hover:text-slate-800"
          >
            Show all steps
          </button>
        </div>
      )}

      {canShowAnswer && !answerShown && (
        <button
          type="button"
          onClick={() => setAnswerShown(true)}
          className="mt-3 w-full rounded-lg border border-dashed border-orange-300 bg-white px-4 py-2.5 text-sm font-semibold text-orange-700 transition-colors hover:border-orange-400 hover:bg-orange-50"
        >
          Reveal final answer
        </button>
      )}

      {answerShown && (
        <div className="mt-3 animate-in fade-in rounded-lg border-2 border-orange-400 bg-white px-4 py-3 duration-300">
          <p className="mb-1 text-[11px] font-bold uppercase tracking-wider text-orange-600">
            Final answer
          </p>
          <TutorAssistantMarkdown
            text={part.answer}
            className="tutor-markdown text-[16px] font-semibold text-slate-900 [&_p]:mb-0 [&_.katex]:text-inherit"
          />
        </div>
      )}
    </div>
  );
}

function normalizeText(s: string) {
  return s.trim().toLowerCase().replace(/\s+/g, ' ');
}

export function MathSolverProblemPanel({ problem }: { problem: MathSolverProblem }) {
  const isMultipart = problem.parts.length > 1;
  const onlyPart = problem.parts[0];

  // For a single-part problem, prefer one clear "question" line at the top
  // (restatement or the part prompt — whichever exists, avoid duplicating).
  let headerText = problem.restatement?.trim() || '';
  if (!headerText && onlyPart?.prompt) headerText = onlyPart.prompt.trim();
  const partPromptDuplicatesHeader =
    !isMultipart &&
    Boolean(onlyPart?.prompt) &&
    Boolean(headerText) &&
    normalizeText(onlyPart.prompt) === normalizeText(headerText);

  // Skip generic titles like "Problem 1" when we already show the question
  const showTitle =
    isMultipart ||
    (!headerText && Boolean(problem.title?.trim())) ||
    (Boolean(problem.title?.trim()) &&
      !/^problem\s*\d+$/i.test(problem.title.trim()));

  return (
    <div className="space-y-4">
      <div>
        {showTitle && (
          <TutorAssistantMarkdown
            text={problem.title}
            inline
            className="tutor-markdown text-lg font-bold text-slate-900 [&_.katex]:text-inherit"
          />
        )}
        {problem.topic && (
          <p className={`text-xs font-medium uppercase tracking-wide text-orange-600 ${showTitle ? 'mt-0.5' : ''}`}>
            {problem.topic}
          </p>
        )}
        {headerText && (
          <div className={`rounded-lg bg-slate-50 px-3 py-2.5 text-[15px] text-slate-800 ${showTitle || problem.topic ? 'mt-2' : ''}`}>
            <TutorAssistantMarkdown
              text={headerText}
              className="tutor-markdown text-[15px] leading-relaxed text-slate-800 [&_p]:mb-0 [&_.katex]:text-inherit"
            />
          </div>
        )}
      </div>

      <div className="space-y-4">
        {problem.parts.map((part) => (
          <PartWalkthrough
            key={`${problem.title}-${part.label}`}
            part={part}
            showPartBadge={isMultipart}
            hidePrompt={!isMultipart && (partPromptDuplicatesHeader || !part.prompt?.trim())}
          />
        ))}
      </div>
    </div>
  );
}

export function MathSolverSolutionView({ solution }: { solution: MathSolverSolution }) {
  const [activeProblem, setActiveProblem] = useState(0);
  const problems = solution.problems;
  const current = problems[Math.min(activeProblem, problems.length - 1)];

  if (!current) return null;

  return (
    <div className="w-full max-w-xl space-y-3">
      {solution.note && (
        <p className="rounded-lg bg-amber-50 px-3 py-2 text-sm text-amber-800">{solution.note}</p>
      )}

      {problems.length > 1 && (
        <div className="flex flex-wrap gap-1.5">
          {problems.map((p, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActiveProblem(i)}
              className={`rounded-full px-3 py-1.5 text-sm font-semibold transition-colors ${
                i === activeProblem
                  ? 'bg-orange-500 text-white'
                  : 'bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-50'
              }`}
            >
              {p.title.length > 24 ? `Problem ${i + 1}` : p.title}
            </button>
          ))}
        </div>
      )}

      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <MathSolverProblemPanel key={activeProblem} problem={current} />
      </div>

      {problems.length > 1 && (
        <p className="text-center text-xs text-slate-400">
          Problem {activeProblem + 1} of {problems.length}
        </p>
      )}
    </div>
  );
}
