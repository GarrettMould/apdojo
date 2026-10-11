'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Loader2, X } from 'lucide-react';
import type { Question } from '@/data/questionBanks/types';
import { MathText } from '@/components/MathText';

type Props = {
  open: boolean;
  onClose: () => void;
  isGenerating: boolean;
  error: string | null;
  questions: Question[];
  title?: string;
};

function letterForIndex(i: number) {
  return String.fromCharCode(65 + i);
}

export function StudyBucketQuizModal({
  open,
  onClose,
  isGenerating,
  error,
  questions,
  title = 'Quick quiz',
}: Props) {
  const [mounted, setMounted] = useState(false);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    setIndex(0);
    setAnswers({});
  }, [open, questions]);

  if (!mounted) return null;

  const q = questions[index];
  const selected = q ? answers[q.id] : null;
  const showFeedback = Boolean(selected);

  return createPortal(
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-stone-900/40 p-4 backdrop-blur-[2px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={title}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.2 }}
            className="relative flex max-h-[88vh] w-full max-w-lg flex-col overflow-hidden rounded-2xl bg-white shadow-xl ring-1 ring-stone-200/80"
            onClick={(e) => e.stopPropagation()}
          >
            <header className="flex items-center justify-between gap-3 px-6 pb-2 pt-5">
              <div>
                <h2 className="text-base font-semibold tracking-tight text-stone-900">{title}</h2>
                {!isGenerating && questions.length > 0 ? (
                  <p className="mt-0.5 text-sm text-stone-500">
                    {index + 1} of {questions.length}
                  </p>
                ) : null}
              </div>
              <button
                type="button"
                onClick={onClose}
                className="rounded-full p-2 text-stone-400 transition hover:bg-stone-100 hover:text-stone-700"
                aria-label="Close quiz"
              >
                <X className="h-4 w-4" />
              </button>
            </header>

            <div className="min-h-0 flex-1 overflow-y-auto px-6 py-4">
              {isGenerating ? (
                <div className="flex flex-col items-center justify-center gap-3 py-20 text-center">
                  <Loader2 className="h-6 w-6 animate-spin text-stone-400" />
                  <p className="text-sm text-stone-600">Preparing your questions…</p>
                </div>
              ) : error ? (
                <div className="py-16 text-center">
                  <p className="text-sm text-stone-600">{error}</p>
                </div>
              ) : q ? (
                <div className="space-y-5">
                  <div className="text-[17px] leading-relaxed text-stone-900">
                    <MathText text={q.question} />
                  </div>
                  <div className="space-y-2">
                    {q.options.map((option, optIndex) => {
                      const letter = letterForIndex(optIndex);
                      const isThis = selected === letter;
                      const isCorrect = letter === q.correctAnswer;
                      let style =
                        'border-stone-200 bg-white hover:border-stone-300 hover:bg-stone-50';
                      if (showFeedback) {
                        if (isCorrect) style = 'border-emerald-300 bg-emerald-50 text-emerald-950';
                        else if (isThis) style = 'border-rose-200 bg-rose-50 text-rose-950';
                        else style = 'border-stone-100 bg-stone-50 text-stone-400';
                      } else if (isThis) {
                        style = 'border-stone-400 bg-stone-50';
                      }
                      return (
                        <button
                          key={optIndex}
                          type="button"
                          disabled={showFeedback}
                          onClick={() =>
                            setAnswers((prev) => ({ ...prev, [q.id]: letter }))
                          }
                          className={`flex w-full items-start gap-3 rounded-xl border px-3.5 py-3 text-left transition ${style}`}
                        >
                          <span className="mt-0.5 w-4 shrink-0 text-xs font-medium text-stone-400">
                            {letter}
                          </span>
                          <span className="flex-1 text-sm leading-snug">{option}</span>
                        </button>
                      );
                    })}
                  </div>
                  {showFeedback && q.explanation ? (
                    <p className="border-t border-stone-100 pt-4 text-sm leading-relaxed text-stone-600">
                      <MathText text={q.explanation} />
                    </p>
                  ) : null}
                </div>
              ) : (
                <p className="py-16 text-center text-sm text-stone-500">No questions yet.</p>
              )}
            </div>

            {!isGenerating && !error && questions.length > 0 ? (
              <footer className="flex items-center justify-between gap-3 px-6 py-4">
                <button
                  type="button"
                  disabled={index === 0}
                  onClick={() => setIndex((i) => Math.max(0, i - 1))}
                  className="text-sm text-stone-500 transition hover:text-stone-800 disabled:opacity-30"
                >
                  Previous
                </button>
                <button
                  type="button"
                  disabled={index >= questions.length - 1}
                  onClick={() => setIndex((i) => Math.min(questions.length - 1, i + 1))}
                  className="text-sm font-medium text-stone-800 transition hover:text-stone-950 disabled:opacity-30"
                >
                  Next
                </button>
              </footer>
            ) : null}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body
  );
}
