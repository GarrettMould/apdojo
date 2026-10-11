'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, ChevronLeft, ChevronRight, Loader2, Menu, Swords, X } from 'lucide-react';
import type { PracticePacket, PracticePacketChapter } from '@/lib/practicePacket/types';
import { PacketMcqBlock } from '@/components/practice-packet/PacketMcqBlock';
import { PacketTermFlashcards } from '@/components/practice-packet/PacketTermFlashcards';

type Props = {
  open: boolean;
  onClose: () => void;
  packet: PracticePacket | null;
  isBuilding: boolean;
  error: string | null;
};

type PanelStep = 'teach' | 'replay' | 'reflect';

export function PracticePacketModal({
  open,
  onClose,
  packet,
  isBuilding,
  error,
}: Props) {
  const [mounted, setMounted] = useState(false);
  const [chapterIndex, setChapterIndex] = useState(0);
  const [step, setStep] = useState<PanelStep>('teach');
  const [replayIndex, setReplayIndex] = useState(0);
  const [reflectText, setReflectText] = useState('');
  const [reflectReply, setReflectReply] = useState<string | null>(null);
  const [reflectLoading, setReflectLoading] = useState(false);
  const [reflectError, setReflectError] = useState<string | null>(null);
  const [lessonSwitchHint, setLessonSwitchHint] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    setChapterIndex(0);
    setStep('teach');
    setReplayIndex(0);
    setLessonSwitchHint(null);
    resetReflect();
  }, [open, packet?.builtAt]);

  useEffect(() => {
    if (!lessonSwitchHint) return;
    const t = window.setTimeout(() => setLessonSwitchHint(null), 2200);
    return () => window.clearTimeout(t);
  }, [lessonSwitchHint]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const resetReflect = () => {
    setReflectText('');
    setReflectReply(null);
    setReflectLoading(false);
    setReflectError(null);
  };

  const goToChapter = (i: number, opts?: { announce?: boolean }) => {
    const nextChapter = packet?.chapters?.[i];
    setChapterIndex(i);
    setStep('teach');
    setReplayIndex(0);
    resetReflect();
    if (opts?.announce && nextChapter) {
      setLessonSwitchHint(`Switched to ${nextChapter.lessonId}`);
    }
  };

  if (!mounted) return null;

  const chapters = packet?.chapters ?? [];
  const chapter = chapters[chapterIndex];
  const ready = Boolean(packet && !isBuilding && !error && chapters.length > 0);
  const missCount = chapter?.missedQuestions.length ?? 0;
  const sectionTotal = missCount > 0 ? 3 : 2;
  const sectionIndex =
    step === 'teach' ? 1 : step === 'replay' ? 2 : sectionTotal;

  const handleNext = () => {
    if (!chapter) return;
    if (step === 'teach') {
      if (missCount > 0) {
        setStep('replay');
        setReplayIndex(0);
      } else {
        setStep('reflect');
        resetReflect();
      }
      return;
    }
    if (step === 'replay') {
      setStep('reflect');
      resetReflect();
    }
  };

  const handleBack = () => {
    if (step === 'reflect') {
      setStep(missCount > 0 ? 'replay' : 'teach');
      resetReflect();
      return;
    }
    if (step === 'replay') {
      setStep('teach');
      return;
    }
    // teach
    if (chapterIndex > 0) {
      goToChapter(chapterIndex - 1);
    }
  };

  const handleReflectSubmit = async () => {
    if (!chapter || !packet || reflectLoading || reflectReply) return;
    setReflectLoading(true);
    setReflectError(null);
    try {
      const res = await fetch('/api/practice-packet-reflect', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subject: packet.subject,
          unit: chapter.unitNumber ?? packet.unitNumber,
          lessonNumber: chapter.lessonId,
          lessonName: chapter.lessonName,
          keyTerms: chapter.keyTerms,
          studentResponse: reflectText,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data.error || 'Could not get feedback');
      }
      setReflectReply(data.reply || '');
    } catch (e: any) {
      setReflectError(e?.message || 'Could not get feedback');
    } finally {
      setReflectLoading(false);
    }
  };

  const handleAfterReflect = () => {
    if (chapterIndex < chapters.length - 1) {
      goToChapter(chapterIndex + 1, { announce: true });
    } else {
      onClose();
    }
  };

  const canGoNext =
    ready &&
    step !== 'reflect' &&
    (step === 'teach' || step === 'replay');

  const isFinalStep =
    step === 'reflect' && !!reflectReply && chapterIndex === chapters.length - 1;

  const forwardAction =
    step === 'reflect' && reflectReply ? handleAfterReflect : canGoNext ? handleNext : null;

  const forwardLabel =
    step === 'reflect' && !reflectReply
      ? 'Submit your reflection to continue'
      : isFinalStep
        ? 'Done'
        : step === 'reflect'
          ? 'Next lesson'
          : 'Continue';

  return createPortal(
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[210] flex items-end justify-center bg-stone-900/35 p-0 sm:items-center sm:p-4 print:static print:bg-white print:p-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Rematch"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.2 }}
            className="relative flex max-h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-t-2xl bg-white shadow-xl ring-1 ring-stone-200/80 sm:rounded-2xl print:fixed print:inset-0 print:z-[9999] print:max-h-none print:max-w-none print:overflow-visible print:rounded-none print:shadow-none print:ring-0"
            onClick={(e) => e.stopPropagation()}
          >
            <header className="border-b border-stone-100 px-4 pb-3.5 pt-4 sm:px-5 sm:pt-5">
              <div className="flex items-center gap-3">
                <div className="min-w-0 flex flex-1 items-center gap-2.5">
                  <h2 className="inline-flex shrink-0 items-center gap-1.5 text-lg font-bold tracking-tight text-gray-900">
                    <Swords className="h-4 w-4" strokeWidth={2.5} />
                    Rematch
                  </h2>
                  {isBuilding ? (
                    <span className="text-sm font-medium text-stone-400">Building…</span>
                  ) : ready && chapter && step === 'reflect' && reflectReply ? (
                    chapterIndex < chapters.length - 1 && chapters[chapterIndex + 1] ? (
                      <motion.div
                        initial={{ opacity: 0, x: 8 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="ml-4 flex min-w-0 flex-1 items-center justify-end gap-3 sm:ml-8"
                      >
                        <span className="text-sm font-semibold text-orange-800">
                          Next lesson is waiting
                        </span>
                        <button
                          type="button"
                          onClick={handleAfterReflect}
                          className="inline-flex items-center gap-1 rounded-md border-2 border-black bg-amber-300 px-3 py-1.5 text-sm font-bold text-black transition hover:bg-amber-200"
                        >
                          Go to {chapters[chapterIndex + 1].lessonId}
                          <ChevronRight className="h-4 w-4" strokeWidth={2.5} />
                        </button>
                      </motion.div>
                    ) : (
                      <motion.div
                        initial={{ opacity: 0, x: 8 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="ml-4 flex min-w-0 flex-1 items-center justify-end gap-3 sm:ml-8"
                      >
                        <span className="text-sm font-semibold text-stone-600">
                          Rematch complete
                        </span>
                        <button
                          type="button"
                          onClick={handleAfterReflect}
                          className="inline-flex items-center gap-1 rounded-md border-2 border-black bg-black px-3 py-1.5 text-sm font-bold text-white transition hover:bg-stone-800"
                        >
                          Done
                          <Check className="h-4 w-4" strokeWidth={2.5} />
                        </button>
                      </motion.div>
                    )
                  ) : ready && chapter ? (
                    <PacketProgress
                      sectionIndex={sectionIndex}
                      sectionTotal={sectionTotal}
                      lessonLabel={
                        chapters.length > 1
                          ? `Lesson ${chapterIndex + 1} of ${chapters.length}`
                          : undefined
                      }
                    />
                  ) : null}
                </div>
                <div className="flex shrink-0 items-center gap-0.5">
                  {ready &&
                  chapters.length > 1 &&
                  !(step === 'reflect' && reflectReply) ? (
                    <LessonMenu
                      chapters={chapters}
                      index={chapterIndex}
                      onSelectChapter={(i) => {
                        if (i === chapterIndex) return;
                        goToChapter(i, { announce: true });
                      }}
                    />
                  ) : null}
                  <button
                    type="button"
                    onClick={onClose}
                    className="inline-flex items-center justify-center rounded-md p-2.5 text-stone-400 transition hover:bg-stone-100 hover:text-stone-700"
                    aria-label="Close Rematch"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </header>

            <AnimatePresence>
              {ready && lessonSwitchHint ? (
                <motion.p
                  key={lessonSwitchHint}
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="border-b border-amber-100 bg-amber-50 px-4 py-2 text-center text-xs font-medium text-amber-900 print:hidden"
                >
                  {lessonSwitchHint}
                </motion.p>
              ) : null}
            </AnimatePresence>

            <div className="flex min-h-0 flex-1">
              {ready ? (
                <div className="flex w-12 shrink-0 items-center justify-center print:hidden">
                  <button
                    type="button"
                    onClick={handleBack}
                    disabled={step === 'teach' && chapterIndex === 0}
                    title="Back"
                    aria-label="Back"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full text-stone-500 transition hover:bg-stone-100 hover:text-stone-800 disabled:pointer-events-none disabled:opacity-25"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </button>
                </div>
              ) : null}
            <div
              className={`min-h-0 flex-1 overflow-y-auto print:overflow-visible print:border-0 print:bg-transparent print:px-0 print:py-0 ${
                ready
                  ? 'my-4 rounded-xl border border-stone-200 bg-stone-50 px-5 py-5'
                  : 'px-5 py-4'
              }`}
            >
              {isBuilding ? (
                <div className="flex flex-col items-center justify-center gap-3 py-20 text-center print:hidden">
                  <Loader2 className="h-6 w-6 animate-spin text-stone-400" />
                  <p className="text-sm text-stone-600">
                    Writing ELI5 explainers and building your packet…
                  </p>
                </div>
              ) : error ? (
                <div className="py-16 text-center print:hidden">
                  <p className="text-sm text-stone-600">{error}</p>
                </div>
              ) : ready && packet && chapter ? (
                <>
                  <div>
                    <ChapterHeader chapter={chapter} />
                    {step === 'teach' ? (
                      <TeachStep chapter={chapter} />
                    ) : step === 'replay' ? (
                      <ReplayStep
                        chapter={chapter}
                        questionIndex={replayIndex}
                        onQuestionIndexChange={setReplayIndex}
                      />
                    ) : (
                      <ReflectStep
                        chapter={chapter}
                        text={reflectText}
                        onTextChange={setReflectText}
                        reply={reflectReply}
                        loading={reflectLoading}
                        error={reflectError}
                        onSubmit={() => {
                          void handleReflectSubmit();
                        }}
                      />
                    )}
                  </div>
                </>
              ) : (
                <div className="py-16 text-center">
                  <p className="text-sm text-stone-600">No packet content yet.</p>
                </div>
              )}
            </div>

              {ready ? (
                <div className="flex w-12 shrink-0 items-center justify-center print:hidden">
                  <button
                    type="button"
                    onClick={forwardAction ?? undefined}
                    disabled={!forwardAction}
                    title={forwardLabel}
                    aria-label={forwardLabel}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full text-stone-500 transition hover:bg-stone-100 hover:text-stone-800 disabled:pointer-events-none disabled:opacity-25"
                  >
                    {isFinalStep ? (
                      <Check className="h-5 w-5" />
                    ) : (
                      <ChevronRight className="h-6 w-6" />
                    )}
                  </button>
                </div>
              ) : null}
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body
  );
}

function PacketProgress({
  sectionIndex,
  sectionTotal,
  lessonLabel,
}: {
  sectionIndex: number;
  sectionTotal: number;
  lessonLabel?: string;
}) {
  const percent = Math.round((sectionIndex / sectionTotal) * 100);

  return (
    <div className="flex min-w-0 flex-1 items-center gap-2 print:hidden">
      {lessonLabel ? (
        <span className="shrink-0 text-xs font-semibold text-stone-600 sm:text-sm">
          {lessonLabel}
        </span>
      ) : null}
      <div
        className="relative h-3.5 min-w-0 flex-1 overflow-hidden rounded-full border-2 border-black bg-stone-100"
        role="progressbar"
        aria-valuemin={1}
        aria-valuemax={sectionTotal}
        aria-valuenow={sectionIndex}
        aria-label={
          lessonLabel
            ? `${lessonLabel}, section ${sectionIndex} of ${sectionTotal}`
            : `Section ${sectionIndex} of ${sectionTotal}`
        }
      >
        <motion.div
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-amber-300 via-orange-400 to-rose-400"
          initial={false}
          animate={{ width: `${percent}%` }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </div>
  );
}

function LessonMenu({
  chapters,
  index,
  onSelectChapter,
}: {
  chapters: PracticePacketChapter[];
  index: number;
  onSelectChapter: (index: number) => void;
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative print:hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="menu"
        aria-label="Lessons"
        className={`inline-flex items-center justify-center rounded-md p-2.5 transition hover:bg-stone-100 hover:text-stone-700 ${
          open ? 'bg-stone-100 text-stone-700' : 'text-stone-400'
        }`}
      >
        <Menu className="h-4 w-4" />
      </button>
      <AnimatePresence>
        {open ? (
          <motion.div
            role="menu"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.12 }}
            className="absolute right-0 top-full z-20 mt-1 w-72 overflow-hidden rounded-lg border border-stone-200 bg-white py-1 shadow-lg"
          >
            <p className="px-3 pb-1 pt-1.5 text-xs font-medium text-stone-400">Lessons</p>
            {chapters.map((ch, i) => {
              const current = i === index;
              return (
                <button
                  key={ch.lessonId}
                  type="button"
                  role="menuitem"
                  aria-current={current ? 'true' : undefined}
                  onClick={() => {
                    setOpen(false);
                    onSelectChapter(i);
                  }}
                  className={`flex w-full items-baseline gap-2.5 px-3 py-2 text-left text-sm transition ${
                    current ? 'bg-stone-100' : 'hover:bg-stone-50'
                  }`}
                >
                  <span
                    className={`shrink-0 tabular-nums ${
                      current ? 'font-semibold text-stone-800' : 'text-stone-500'
                    }`}
                  >
                    {ch.lessonId}
                  </span>
                  <span
                    className={`min-w-0 truncate ${
                      current ? 'font-medium text-stone-800' : 'text-stone-600'
                    }`}
                  >
                    {ch.lessonName}
                  </span>
                </button>
              );
            })}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

function ChapterHeader({ chapter }: { chapter: PracticePacketChapter }) {
  return (
    <h3 className="mb-5 text-lg font-semibold text-stone-800">
      {chapter.lessonId} · {chapter.lessonName}
    </h3>
  );
}

function TeachStep({ chapter }: { chapter: PracticePacketChapter }) {
  return (
    <div className="space-y-6">
      {chapter.explainer ? (
        <ChapterTeachPanel key={chapter.lessonId} explainer={chapter.explainer} />
      ) : null}
      {chapter.keyTerms.length > 0 ? (
        <PacketTermFlashcards
          terms={chapter.keyTerms}
          resetKey={`${chapter.lessonId}-teach`}
        />
      ) : null}
    </div>
  );
}

function ReplayStep({
  chapter,
  questionIndex,
  onQuestionIndexChange,
}: {
  chapter: PracticePacketChapter;
  questionIndex: number;
  onQuestionIndexChange: (index: number) => void;
}) {
  const total = chapter.missedQuestions.length;
  const q = chapter.missedQuestions[questionIndex];
  if (!q) {
    return (
      <p className="py-10 text-center text-sm text-stone-500">
        No missed questions for this lesson.
      </p>
    );
  }

  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between gap-2">
        <h4 className="text-sm font-semibold text-stone-800">Try these again</h4>
        <p className="text-xs tabular-nums text-stone-400">
          {questionIndex + 1} of {total}
        </p>
      </div>
      <PacketMcqBlock
        key={q.id}
        question={q}
        priorLetter={chapter.selectedLetters[q.id]}
      />
      {total > 1 ? (
        <div className="flex items-center justify-between gap-3 pt-1">
          <button
            type="button"
            onClick={() => onQuestionIndexChange(questionIndex - 1)}
            disabled={questionIndex === 0}
            className="inline-flex items-center justify-center rounded-md border border-stone-200 bg-white px-4 py-2 text-sm font-semibold text-stone-600 transition hover:bg-stone-100 hover:text-stone-800 disabled:pointer-events-none disabled:opacity-40"
          >
            Prev
          </button>
          <button
            type="button"
            onClick={() => onQuestionIndexChange(questionIndex + 1)}
            disabled={questionIndex >= total - 1}
            className="inline-flex items-center justify-center rounded-md border border-stone-200 bg-white px-4 py-2 text-sm font-semibold text-stone-600 transition hover:bg-stone-100 hover:text-stone-800 disabled:pointer-events-none disabled:opacity-40"
          >
            Next
          </button>
        </div>
      ) : null}
    </section>
  );
}

function ReflectStep({
  chapter,
  text,
  onTextChange,
  reply,
  loading,
  error,
  onSubmit,
}: {
  chapter: PracticePacketChapter;
  text: string;
  onTextChange: (v: string) => void;
  reply: string | null;
  loading: boolean;
  error: string | null;
  onSubmit: () => void;
}) {
  const prompt = `In your own words, explain ${chapter.lessonName}. What was the biggest idea you were mixing up before this review?`;

  return (
    <section className="space-y-4">
      <div>
        <h4 className="text-sm font-semibold text-stone-800">Your turn</h4>
        <p className="mt-2 text-base leading-relaxed text-stone-800">{prompt}</p>
      </div>

      {!reply ? (
        <>
          <textarea
            value={text}
            onChange={(e) => onTextChange(e.target.value)}
            rows={5}
            placeholder="Write a few sentences…"
            disabled={loading}
            className="w-full resize-y rounded-xl border border-stone-200 bg-white px-3.5 py-3 text-sm leading-relaxed text-stone-800 outline-none ring-stone-700/10 placeholder:text-stone-400 focus:ring-2 disabled:opacity-60"
          />
          {error ? <p className="text-sm text-rose-600">{error}</p> : null}
          <button
            type="button"
            onClick={onSubmit}
            disabled={loading || text.trim().length < 8}
            className="inline-flex items-center justify-center gap-2 rounded-md bg-stone-800 px-5 py-3.5 text-base font-semibold text-white transition hover:bg-stone-700 disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Getting feedback…
              </>
            ) : (
              'Get feedback'
            )}
          </button>
        </>
      ) : (
        <div className="space-y-3">
          <div className="rounded-xl border border-stone-200 bg-stone-50 px-3.5 py-3">
            <p className="text-xs font-medium uppercase tracking-wide text-stone-400">
              Your answer
            </p>
            <p className="mt-1 whitespace-pre-wrap text-sm leading-relaxed text-stone-700">
              {text}
            </p>
          </div>
          <div className="rounded-xl border border-stone-600 bg-stone-700 px-3.5 py-3 text-stone-100">
            <p className="text-xs font-medium uppercase tracking-wide text-stone-400">
              AI Dojo
            </p>
            <p className="mt-1 text-sm leading-relaxed">{reply}</p>
          </div>
        </div>
      )}
    </section>
  );
}

function ChapterTeachPanel({
  explainer,
}: {
  explainer: NonNullable<PracticePacketChapter['explainer']>;
}) {
  const [tab, setTab] = useState<'eli5' | 'analogy' | 'mistake'>('eli5');

  const tabs: { id: typeof tab; label: string }[] = [
    { id: 'eli5', label: 'ELI5' },
    { id: 'analogy', label: 'Real-world analogy' },
    { id: 'mistake', label: 'Common mistake' },
  ];

  const body =
    tab === 'eli5'
      ? explainer.eli5
      : tab === 'analogy'
        ? explainer.analogy
        : explainer.commonMistake;

  return (
    <section className="overflow-hidden rounded-2xl border border-stone-200 bg-white">
      <div className="flex gap-1 overflow-x-auto border-b border-stone-100 px-2 pt-2">
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={`shrink-0 rounded-t-lg px-3 py-2 text-sm transition ${
              tab === t.id
                ? 'bg-stone-100 font-medium text-stone-800'
                : 'text-stone-500 hover:text-stone-800'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div className="px-4 py-4 sm:px-5 sm:py-5">
        <p
          className={
            tab === 'eli5'
              ? 'text-base leading-relaxed text-stone-800 sm:text-[17px]'
              : 'text-sm leading-relaxed text-stone-700 sm:text-base'
          }
        >
          {body}
        </p>
      </div>
    </section>
  );
}
