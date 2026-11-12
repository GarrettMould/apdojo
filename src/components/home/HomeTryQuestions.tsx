'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Check, X } from 'lucide-react';
import type { Question } from '@/data/questionBanks/types';
import { getSubjectSlug, getUnitSlug, type PracticeMcqSubject } from '@/lib/practiceSlugs';

const QUESTION_COUNT = 3;

const SUBJECT_LABEL: Record<PracticeMcqSubject, string> = {
  macro: 'AP Macro',
  micro: 'AP Micro',
  gov: 'AP Gov',
  stats: 'AP Stats',
};

async function loadBank(subject: PracticeMcqSubject): Promise<Question[]> {
  if (subject === 'gov') return (await import('@/data/gov/govMcqPractice')).govMcqPracticeQuestions;
  if (subject === 'stats') return (await import('@/data/stats/statsMcqPractice')).statsMcqPracticeQuestions;
  const { allQuestions } = await import('@/data/unitPracticeProblems/unitPracticeProblems');
  const tag = subject === 'macro' ? 'ap_macroeconomics' : 'ap_microeconomics';
  return allQuestions.filter((q) => q.subject === tag);
}

/** Short, text-only Unit 1 questions that read well inline (no images, tables or maths markup). */
function pickQuestions(bank: Question[]): Question[] {
  return bank
    .filter(
      (q) =>
        q.unit === 1 &&
        !q.isTest &&
        !q.image &&
        !q.tableData &&
        !q.optionImages &&
        q.options?.length >= 4 &&
        q.options.every((o) => typeof o === 'string' && o.length < 140 && !o.includes('\\')) &&
        (q.question ?? '').length < 240 &&
        !(q.question ?? '').includes('\\') &&
        Boolean(q.explanation),
    )
    .slice(0, QUESTION_COUNT);
}

/** "Try it now": a few real questions answered right on the homepage. */
export function HomeTryQuestions({ subject }: { subject: PracticeMcqSubject }) {
  const [questions, setQuestions] = useState<Question[] | null>(null);
  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [results, setResults] = useState<boolean[]>([]);

  useEffect(() => {
    let cancelled = false;
    setQuestions(null);
    setIndex(0);
    setPicked(null);
    setResults([]);
    loadBank(subject).then((bank) => {
      if (!cancelled) setQuestions(pickQuestions(bank));
    });
    return () => {
      cancelled = true;
    };
  }, [subject]);

  const question = questions?.[index] ?? null;
  const correctIndex = question ? question.correctAnswer.charCodeAt(0) - 65 : -1;
  const answered = picked !== null;
  const gotIt = answered && picked === correctIndex;
  // Finished once the student moves past the last question (so its explanation shows first).
  const finished = questions !== null && questions.length > 0 && index >= questions.length;
  const practiceHref = useMemo(
    () => `/mcq-practice/${getSubjectSlug(subject)}/${getUnitSlug(1, subject)}`,
    [subject],
  );

  const choose = (i: number) => {
    if (answered) return;
    setPicked(i);
    setResults((r) => [...r, i === correctIndex]);
  };

  const next = () => {
    setPicked(null);
    setIndex((i) => i + 1);
  };

  return (
    <div className="mx-auto w-full max-w-3xl">
      <motion.div
        animate={
          answered ? (gotIt ? { scale: [1, 1.02, 1] } : { x: [0, -10, 10, -7, 7, -3, 3, 0] }) : { x: 0, scale: 1 }
        }
        transition={{ duration: answered && !gotIt ? 0.45 : 0.35 }}
        className={`rounded-3xl border bg-white p-5 shadow-[0_10px_30px_rgba(15,23,42,0.08)] transition-[border-color,box-shadow] duration-300 sm:p-8 ${
          answered
            ? gotIt
              ? 'border-emerald-300 ring-4 ring-emerald-100'
              : 'border-rose-300 ring-4 ring-rose-100'
            : 'border-slate-200'
        }`}
      >
        {questions === null ? (
          <div className="flex h-64 items-center justify-center text-gray-500">Loading a question…</div>
        ) : questions.length === 0 ? (
          <div className="flex h-40 items-center justify-center text-gray-500">Questions are on their way.</div>
        ) : finished ? (
          <div className="flex flex-col items-center py-6 text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
              {results.every(Boolean) ? 'Perfect score' : results.filter(Boolean).length >= 2 ? 'Nice work' : 'Good start'}
            </p>
            <p className="mt-2 text-3xl font-black tracking-tight text-gray-900 sm:text-4xl">
              You got {results.filter(Boolean).length} of {results.length} right
            </p>
            <p className="mt-3 max-w-md text-base text-gray-600">
              There are hundreds more {SUBJECT_LABEL[subject]} questions like these, with explanations for every one.
            </p>
            <div className="mt-6 flex w-full max-w-sm flex-col gap-3">
              <Link
                href={practiceHref}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-base font-semibold text-white shadow-[0_6px_16px_rgba(37,99,235,0.25)] transition hover:-translate-y-px hover:bg-blue-700"
              >
                Keep practicing free <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
              <a
                href="#season-pass"
                className="inline-flex min-h-12 items-center justify-center rounded-xl border border-slate-200 bg-white px-6 py-3 text-base font-semibold text-gray-800 transition hover:bg-slate-50"
              >
                See the Season Pass
              </a>
            </div>
          </div>
        ) : question ? (
          <AnimatePresence mode="wait">
            <motion.div
              key={`${subject}-${question.id}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center justify-between gap-3">
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                  {SUBJECT_LABEL[subject]} · Unit 1
                </p>
                <p className="text-xs font-semibold tabular-nums text-gray-500">
                  Question {index + 1} of {questions.length}
                </p>
              </div>
              <p className="mt-3 text-lg font-semibold leading-snug text-gray-900 sm:text-xl">{question.question}</p>
              <ul className="mt-5 flex flex-col gap-2.5">
                {question.options.map((option, i) => {
                  const isCorrect = i === correctIndex;
                  const isPicked = i === picked;
                  const state = !answered
                    ? 'idle'
                    : isCorrect
                      ? 'correct'
                      : isPicked
                        ? 'wrong'
                        : 'muted';
                  return (
                    <li key={i}>
                      <button
                        type="button"
                        onClick={() => choose(i)}
                        disabled={answered}
                        className={`flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left text-[15px] transition ${
                          state === 'idle'
                            ? 'border-slate-200 hover:border-blue-300 hover:bg-blue-50/50'
                            : state === 'correct'
                              ? 'border-emerald-400 bg-emerald-50 text-emerald-950'
                              : state === 'wrong'
                                ? 'border-rose-400 bg-rose-50 text-rose-950'
                                : 'border-slate-200 text-gray-500'
                        }`}
                      >
                        <span
                          className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-xs font-bold ${
                            state === 'correct'
                              ? 'border-emerald-500 bg-emerald-500 text-white'
                              : state === 'wrong'
                                ? 'border-rose-500 bg-rose-500 text-white'
                                : 'border-slate-300 text-gray-600'
                          }`}
                        >
                          {state === 'correct' ? (
                            <Check className="h-3.5 w-3.5" strokeWidth={3} />
                          ) : state === 'wrong' ? (
                            <X className="h-3.5 w-3.5" strokeWidth={3} />
                          ) : (
                            String.fromCharCode(65 + i)
                          )}
                        </span>
                        <span className="flex-1">{option}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>

              {answered ? (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
                >
                  <div className="min-w-0">
                    <p className={`font-bold ${gotIt ? 'text-emerald-700' : 'text-rose-700'}`}>
                      {gotIt ? 'Correct!' : `Not quite. The answer is ${question.correctAnswer}.`}
                    </p>
                    <p className="mt-1 line-clamp-4 text-sm leading-relaxed text-gray-600">{question.explanation}</p>
                  </div>
                  <button
                    type="button"
                    onClick={next}
                    className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-gray-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
                  >
                    {index + 1 < questions.length ? 'Next question' : 'See how you did'}
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </button>
                </motion.div>
              ) : null}
            </motion.div>
          </AnimatePresence>
        ) : null}
      </motion.div>
    </div>
  );
}
