'use client';

import { useRef, useState } from 'react';
import { ArrowRight, Check, RotateCcw, X } from 'lucide-react';
import type { GuideQuestion } from '@/data/teachingGuides';
import { PayoffMatrix } from './PayoffMatrix';
import { GuideDiagram } from './GuideDiagram';

const LETTERS = 'ABCDE';

/**
 * "Check yourself", one question at a time: pick an answer to see whether it's right and why, then move
 * on. Ends with a score and a way to try again.
 */
export function GuideQuiz({ questions }: { questions: GuideQuestion[] }) {
  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState<(number | null)[]>(() => questions.map(() => null));
  const [finished, setFinished] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const total = questions.length;
  const score = picked.filter((p, i) => p === questions[i].correct).length;
  const q = questions[index];
  const choice = picked[index];
  const answered = choice !== null;
  const isLast = index === total - 1;

  /** Keeps the card in view when it changes, so the next question isn't hidden below the fold. */
  const focusCard = () => {
    requestAnimationFrame(() => {
      const card = cardRef.current;
      if (!card) return;
      const top = card.getBoundingClientRect().top;
      if (top < 80) window.scrollBy({ top: top - 96, behavior: 'smooth' });
      card.focus({ preventScroll: true });
    });
  };

  const next = () => {
    if (isLast) setFinished(true);
    else setIndex((i) => i + 1);
    focusCard();
  };

  const restart = () => {
    setPicked(questions.map(() => null));
    setIndex(0);
    setFinished(false);
    focusCard();
  };

  return (
    <div
      ref={cardRef}
      tabIndex={-1}
      className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 outline-none sm:p-6"
      aria-live="polite"
    >
      {/* Progress: one dot per question, colored once answered */}
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm font-semibold tabular-nums text-slate-500">
          {finished ? 'Done' : `Question ${index + 1} of ${total}`}
        </p>
        <ol className="flex gap-1.5" aria-label="Progress">
          {questions.map((question, i) => {
            const p = picked[i];
            const state = p === null ? (i === index && !finished ? 'current' : 'todo') : p === question.correct ? 'right' : 'wrong';
            return (
              <li
                key={i}
                aria-label={`Question ${i + 1}: ${state === 'right' ? 'correct' : state === 'wrong' ? 'incorrect' : 'not answered'}`}
                className={`h-2 w-6 rounded-full ${
                  state === 'right'
                    ? 'bg-emerald-500'
                    : state === 'wrong'
                      ? 'bg-red-400'
                      : state === 'current'
                        ? 'bg-blue-500'
                        : 'bg-slate-200'
                }`}
              />
            );
          })}
        </ol>
      </div>

      {finished ? (
        <div className="flex flex-col items-center gap-3 py-6 text-center">
          <p className="text-5xl font-black tabular-nums tracking-tight text-slate-900">
            {score}
            <span className="text-3xl text-slate-400">/{total}</span>
          </p>
          <p className="max-w-sm text-[15px] text-slate-600">
            {score === total
              ? 'All correct. You’ve got this lesson.'
              : score >= total - 1
                ? 'Nearly there. Reread the section behind the one you missed.'
                : 'Reread the sections above for the ones you missed, then try again.'}
          </p>
          <button
            type="button"
            onClick={restart}
            className="mt-2 inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
          >
            <RotateCcw className="h-4 w-4" aria-hidden /> Try again
          </button>
        </div>
      ) : (
        <>
          {q.figure?.type === 'matrix' ? (
            <div className="rounded-xl border border-slate-200 px-2 py-4">
              <PayoffMatrix block={q.figure} framed={false} />
            </div>
          ) : q.figure?.type === 'diagram' ? (
            <GuideDiagram id={q.figure.id} />
          ) : null}
          <p className="text-[17px] font-semibold leading-relaxed text-slate-900">{q.stem}</p>
          <ol className="flex flex-col gap-2">
            {q.options.map((option, oi) => {
              const state = !answered ? 'idle' : oi === q.correct ? 'correct' : oi === choice ? 'wrong' : 'other';
              return (
                <li key={oi}>
                  <button
                    type="button"
                    onClick={() => !answered && setPicked((p) => p.map((v, i) => (i === index ? oi : v)))}
                    disabled={answered}
                    className={`flex w-full items-start gap-3 rounded-xl border px-3.5 py-3 text-left text-[15px] transition ${
                      state === 'idle'
                        ? 'border-slate-200 hover:border-blue-300 hover:bg-blue-50/40'
                        : state === 'correct'
                          ? 'border-emerald-300 bg-emerald-50 text-emerald-950'
                          : state === 'wrong'
                            ? 'border-red-300 bg-red-50 text-red-950'
                            : 'border-slate-100 text-slate-400'
                    }`}
                  >
                    <span
                      className={`mt-px inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-xs font-bold ${
                        state === 'correct'
                          ? 'border-emerald-500 bg-emerald-500 text-white'
                          : state === 'wrong'
                            ? 'border-red-500 bg-red-500 text-white'
                            : 'border-slate-300 text-slate-500'
                      }`}
                    >
                      {state === 'correct' ? (
                        <Check className="h-3.5 w-3.5" strokeWidth={3} aria-hidden />
                      ) : state === 'wrong' ? (
                        <X className="h-3.5 w-3.5" strokeWidth={3} aria-hidden />
                      ) : (
                        LETTERS[oi]
                      )}
                    </span>
                    <span>{option}</span>
                  </button>
                </li>
              );
            })}
          </ol>

          {answered ? (
            <>
              <p className="rounded-xl bg-slate-50 px-4 py-3 text-[15px] leading-relaxed text-slate-700">
                <span className={`font-bold ${choice === q.correct ? 'text-emerald-700' : 'text-red-700'}`}>
                  {choice === q.correct ? 'Right. ' : `Not quite: it’s ${LETTERS[q.correct]}. `}
                </span>
                {q.explanation}
              </p>
              <button
                type="button"
                onClick={next}
                className="inline-flex items-center justify-center gap-2 self-end rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-blue-700"
              >
                {isLast ? 'See my score' : 'Next question'}
                <ArrowRight className="h-4 w-4" aria-hidden />
              </button>
            </>
          ) : null}
        </>
      )}
    </div>
  );
}
