'use client';

import { useState } from 'react';
import type { Question } from '@/data/questionBanks/types';
import { MathText } from '@/components/MathText';

function letterForIndex(i: number) {
  return String.fromCharCode(65 + i);
}

type Props = {
  question: Question;
  /** Prior wrong pick to show as a hint before answering */
  priorLetter?: string;
  printMode?: boolean;
};

export function PacketMcqBlock({ question, priorLetter, printMode = false }: Props) {
  const [selected, setSelected] = useState<string | null>(null);
  const showFeedback = Boolean(selected) && !printMode;

  return (
    <div className="space-y-3 rounded-xl border border-stone-200 bg-white p-4 print:break-inside-avoid print:border-stone-300">
      <div className="text-[15px] leading-relaxed text-stone-800">
        <MathText text={question.question} />
      </div>
      {priorLetter && !printMode ? (
        <p className="text-xs text-stone-500">You previously picked {priorLetter}</p>
      ) : null}
      <div className="space-y-2">
        {question.options.map((option, optIndex) => {
          const letter = letterForIndex(optIndex);
          const isThis = selected === letter;
          const isCorrect = letter === question.correctAnswer;
          let style = 'border-stone-200 bg-white';
          if (printMode) {
            style = 'border-stone-200 bg-white';
          } else if (showFeedback) {
            if (isCorrect) style = 'border-emerald-300 bg-emerald-50 text-emerald-950';
            else if (isThis) style = 'border-rose-200 bg-rose-50 text-rose-950';
            else style = 'border-stone-100 bg-stone-50 text-stone-400';
          } else if (isThis) {
            style = 'border-stone-400 bg-stone-50';
          } else {
            style = 'border-stone-200 bg-white hover:border-stone-300 hover:bg-stone-50';
          }

          if (printMode) {
            return (
              <div
                key={optIndex}
                className={`flex w-full items-start gap-3 rounded-lg border px-3 py-2.5 text-left ${style}`}
              >
                <span className="mt-0.5 w-4 shrink-0 text-xs font-medium text-stone-400">
                  {letter}
                </span>
                <span className="flex-1 text-sm leading-snug">{option}</span>
              </div>
            );
          }

          return (
            <button
              key={optIndex}
              type="button"
              disabled={showFeedback}
              onClick={() => setSelected(letter)}
              className={`flex w-full items-start gap-3 rounded-lg border px-3 py-2.5 text-left transition ${style}`}
            >
              <span className="mt-0.5 w-4 shrink-0 text-xs font-medium text-stone-400">
                {letter}
              </span>
              <span className="flex-1 text-sm leading-snug">{option}</span>
            </button>
          );
        })}
      </div>
      {showFeedback && question.explanation ? (
        <p className="border-t border-stone-100 pt-3 text-sm leading-relaxed text-stone-600 print:hidden">
          <MathText text={question.explanation} />
        </p>
      ) : null}
      {printMode && question.explanation ? (
        <p className="hidden border-t border-stone-100 pt-3 text-sm text-stone-600 print:block">
          Answer: {question.correctAnswer}. <MathText text={question.explanation} />
        </p>
      ) : null}
    </div>
  );
}
