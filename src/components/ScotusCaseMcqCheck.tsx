'use client';

import { useMemo, useState } from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';
import type { Question } from '@/data/questionBanks/types';

type ScotusCaseMcqCheckProps = {
  caseName: string;
  questions: Question[];
};

const LETTERS = ['A', 'B', 'C', 'D'] as const;

export function ScotusCaseMcqCheck({ caseName, questions }: ScotusCaseMcqCheckProps) {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});

  const question = questions[index];
  const selected = question ? answers[question.id] : undefined;
  const answered = Boolean(selected);
  const finished = questions.length > 0 && questions.every((item) => answers[item.id]);
  const correctCount = useMemo(
    () => questions.filter((item) => answers[item.id] === item.correctAnswer).length,
    [answers, questions]
  );

  if (!question) return null;

  const isLast = index === questions.length - 1;

  return (
    <section id="check-yourself" className="scroll-mt-28">
      <h2 className="text-3xl font-black tracking-tight text-gray-950">Check yourself</h2>
      <p className="mt-2 text-base text-gray-600">
        Three questions on {caseName}: the holding, a common mix-up, and how it differs from another required case.
      </p>

      <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 sm:p-8">
        <div className="flex items-center justify-between gap-4">
          <p className="text-xs font-bold uppercase tracking-wider text-violet-700">
            Question {index + 1} of {questions.length}
          </p>
          {finished ? (
            <p className="text-sm font-bold text-gray-700">
              {correctCount} of {questions.length} correct
            </p>
          ) : null}
        </div>

        <p className="mt-4 text-lg font-semibold leading-relaxed text-gray-950">{question.question}</p>

        <div className="mt-6 space-y-3">
          {question.options.map((option, optionIndex) => {
            const letter = LETTERS[optionIndex];
            if (!letter) return null;
            const isCorrect = letter === question.correctAnswer;
            const isSelected = selected === letter;
            let optionClass = 'border-gray-200 bg-white hover:border-violet-300 hover:bg-violet-50';
            if (answered) {
              if (isCorrect) optionClass = 'border-emerald-300 bg-emerald-50';
              else if (isSelected) optionClass = 'border-rose-300 bg-rose-50';
              else optionClass = 'border-gray-200 bg-white';
            }

            return (
              <button
                key={letter}
                type="button"
                disabled={answered}
                onClick={() => setAnswers((prev) => ({ ...prev, [question.id]: letter }))}
                className={`flex w-full items-start gap-3 rounded-xl border px-4 py-3.5 text-left transition-colors ${optionClass} ${
                  answered ? 'cursor-default' : 'cursor-pointer'
                }`}
              >
                <span
                  className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm font-black ${
                    answered && isCorrect
                      ? 'bg-emerald-600 text-white'
                      : answered && isSelected
                        ? 'bg-rose-600 text-white'
                        : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  {letter}
                </span>
                <span className="flex-1 text-base leading-relaxed text-gray-900">{option}</span>
                {answered && isCorrect ? <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" /> : null}
                {answered && isSelected && !isCorrect ? (
                  <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-rose-600" />
                ) : null}
              </button>
            );
          })}
        </div>

        {answered && question.explanation ? (
          <div
            className={`mt-6 rounded-xl border p-4 text-base leading-relaxed text-gray-800 ${
              selected === question.correctAnswer
                ? 'border-emerald-200 bg-emerald-50'
                : 'border-rose-200 bg-rose-50'
            }`}
          >
            <p className="text-xs font-bold uppercase tracking-wider text-gray-500">Explanation</p>
            <p className="mt-2">{question.explanation}</p>
          </div>
        ) : null}

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            disabled={index === 0}
            onClick={() => setIndex((current) => Math.max(0, current - 1))}
            className="rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm font-bold text-gray-800 hover:border-gray-400 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Previous
          </button>
          {isLast ? (
            <button
              type="button"
              disabled={!finished}
              onClick={() => {
                setIndex(0);
                setAnswers({});
              }}
              className="rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm font-bold text-gray-800 hover:border-gray-400 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Try again
            </button>
          ) : (
            <button
              type="button"
              disabled={!answered}
              onClick={() => setIndex((current) => Math.min(questions.length - 1, current + 1))}
              className="rounded-xl bg-violet-700 px-4 py-2.5 text-sm font-bold text-white hover:bg-violet-800 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Next question
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
