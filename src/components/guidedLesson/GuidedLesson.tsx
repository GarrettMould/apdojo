'use client';

import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import Link from 'next/link';
import {
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleDot,
  Layers,
  ListChecks,
  Loader2,
  MessageSquareText,
  PenLine,
  PlayCircle,
  RotateCcw,
  Sparkles,
  type LucideIcon,
} from 'lucide-react';
import { useAuthContext } from '@/contexts/AuthContext';
import { useQuestionBank } from '@/hooks/useQuestionBank';
import { hasValidSeasonPass } from '@/lib/utils';
import { hasAdminRole } from '@/lib/adminAccess';
import { cheatSheetUrlForUnit } from '@/lib/courseSubject';
import { auth as firebaseAuth } from '@/lib/firebase';
import { SeasonPassEntryWideModal } from '@/components/SeasonPassEntryWideModal';
import { getGuidedLesson, getGuidedUnitPath, guidedUnitWrapUpHref } from '@/data/guidedLessons';
import {
  getGuidedLessonProgress,
  type GuidedGradeResult,
} from '@/lib/guidedLessonProgress';
import { marker, primaryButton, secondaryButton, textButton } from './styles';

type Step = 'first' | 'learn' | 'walk' | 'check' | 'final' | 'done';

/** Steps open to everyone. Without a Macro pass, going further (or asking for feedback) opens the pass offer. */
const FREE_STEPS: Step[] = ['first', 'learn'];

const STEPS: { id: Exclude<Step, 'done'>; label: string; icon: LucideIcon }[] = [
  { id: 'first', label: 'First try', icon: PenLine },
  { id: 'learn', label: 'Learn', icon: PlayCircle },
  { id: 'walk', label: 'Walk through', icon: Layers },
  { id: 'check', label: 'Check yourself', icon: ListChecks },
  { id: 'final', label: 'Explain it', icon: MessageSquareText },
];

const MIN_FINAL_ANSWER_LENGTH = 20;

function stepPosition(step: Step): number {
  return step === 'done' ? STEPS.length : STEPS.findIndex((s) => s.id === step);
}


async function requestGrade(lessonId: string, round: 'first' | 'final', answer: string): Promise<GuidedGradeResult> {
  const token = await firebaseAuth.currentUser?.getIdToken();
  if (!token) throw new Error('Please sign in again to get feedback.');
  const res = await fetch('/api/guided-lesson-grade', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify({ lessonId, round, answer }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(typeof data.error === 'string' ? data.error : 'Something went wrong. Please try again.');
  return data as GuidedGradeResult;
}

export function GuidedLesson({ lessonId }: { lessonId: string }) {
  const { userData, loadingUserData } = useAuthContext();
  const bank = useQuestionBank();
  const lesson = useMemo(() => getGuidedLesson(lessonId), [lessonId]);
  const cardRef = useRef<HTMLElement>(null);

  const [step, setStep] = useState<Step>('first');
  /** Furthest step reached, so the tracker can jump back to anything already seen. */
  const [furthest, setFurthest] = useState(0);
  /** First try starts as a yes/no choice; the answer box shows only once they opt to answer. */
  const [answeringFirst, setAnsweringFirst] = useState(false);
  const [firstAnswer, setFirstAnswer] = useState('');
  const [firstGrade, setFirstGrade] = useState<GuidedGradeResult | null>(null);
  const [fastTrack, setFastTrack] = useState(false);
  const [slide, setSlide] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [results, setResults] = useState<boolean[]>([]);
  const [finalAnswer, setFinalAnswer] = useState('');
  const [finalGrade, setFinalGrade] = useState<GuidedGradeResult | null>(null);
  const [revising, setRevising] = useState(false);
  const [grading, setGrading] = useState(false);
  const [gradeError, setGradeError] = useState<string | null>(null);
  const [passOfferOpen, setPassOfferOpen] = useState(false);

  const checkQuestions = useMemo(() => {
    if (!bank || !lesson) return null;
    return lesson.content.checkQuestionIds.flatMap((id) => {
      const q = bank.find((item) => item.id === id && item.subject === 'ap_macroeconomics');
      if (!q) return [];
      const image = q.image ? (typeof q.image === 'string' ? q.image : q.image.src) : null;
      return [{
        id: q.id,
        text: q.question,
        image,
        table: q.tableData ?? null,
        options: q.options,
        correct: q.correctAnswer.charCodeAt(0) - 65,
        explanation: q.explanation ?? '',
      }];
    });
  }, [bank, lesson]);

  if (!lesson) return null;

  const { content, lessonName, video, walkthrough } = lesson;
  const unitPath = getGuidedUnitPath(content.unit);
  const nextLesson = unitPath[unitPath.findIndex((l) => l.lessonId === content.lessonId) + 1];
  const backHref = cheatSheetUrlForUnit('macro', content.unit);
  // The first two steps are open to everyone (and to search engines). Without a Macro pass, the pass
  // offer opens only when the student tries to go further, not on arrival.
  const locked = !loadingUserData && !hasValidSeasonPass(userData, 'macro');

  const goTo = (next: Step) => {
    if (locked && !FREE_STEPS.includes(next)) {
      setPassOfferOpen(true);
      return;
    }
    setGradeError(null);
    setStep(next);
    setFurthest((f) => Math.max(f, stepPosition(next)));
    cardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const submitFirst = async () => {
    if (locked) {
      setPassOfferOpen(true);
      return;
    }
    setGrading(true);
    setGradeError(null);
    try {
      setFirstGrade(await requestGrade(content.lessonId, 'first', firstAnswer));
    } catch (err) {
      setGradeError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setGrading(false);
    }
  };

  const submitFinal = async () => {
    setGrading(true);
    setGradeError(null);
    try {
      setFinalGrade(await requestGrade(content.lessonId, 'final', finalAnswer));
      setRevising(false);
    } catch (err) {
      setGradeError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setGrading(false);
    }
  };

  const restart = () => {
    setAnsweringFirst(false);
    setFirstAnswer('');
    setFirstGrade(null);
    setFastTrack(false);
    setSlide(0);
    setQuestionIndex(0);
    setPicked(null);
    setResults([]);
    setFinalAnswer('');
    setFinalGrade(null);
    setRevising(false);
    setFurthest(0);
    goTo('first');
  };

  const stepIndex = stepPosition(step);
  const progressFor = (id: string) => getGuidedLessonProgress(userData, id);
  const completedCount = unitPath.filter((l) => progressFor(l.lessonId)?.status).length;
  const unitComplete = unitPath.every((l) => !l.href || progressFor(l.lessonId)?.status);
  const wrapUpHref = guidedUnitWrapUpHref(content.unit);

  const currentSlide = walkthrough[slide];
  const currentQuestion = checkQuestions?.[questionIndex] ?? null;
  const answered = picked !== null;
  const gotIt = currentQuestion !== null && picked === currentQuestion.correct;
  const correctCount = results.filter(Boolean).length;
  const lastQuestion = !checkQuestions || questionIndex >= checkQuestions.length - 1;

  const outcome: 'first' | 'passed' | 'reviewed' = fastTrack ? 'first' : finalGrade?.passed ? 'passed' : 'reviewed';
  const finalLocked = grading || (finalGrade !== null && !revising);
  const outOfAttempts = finalGrade !== null && !finalGrade.passed && finalGrade.attemptsLeft === 0;

  return (
    <>
      <div>
        <div className="min-h-screen bg-slate-50 bg-[radial-gradient(#dbe3ee_1px,transparent_1px)] px-4 pb-20 pt-8 text-slate-900 [background-size:22px_22px]">
          <div className="mx-auto flex w-full max-w-[760px] flex-col gap-6">
              <main className="min-w-0">
                <section
                  ref={cardRef}
                  className="scroll-mt-24 rounded-3xl border border-slate-200 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04),0_16px_40px_rgba(15,23,42,0.07)]"
                >
                  <div className="px-5 pt-5 sm:px-10 sm:pt-8">
                    <div className="flex items-center justify-between gap-3">
                      <Link
                        href={backHref}
                        className="inline-flex items-center gap-1 text-sm font-semibold text-slate-500 hover:text-slate-900"
                      >
                        <ChevronLeft className="h-4 w-4" aria-hidden />
                        Unit {content.unit} cheat sheet
                      </Link>
                      <LessonPathMenu
                        unit={content.unit}
                        currentLessonId={content.lessonId}
                        unitPath={unitPath}
                        completedCount={completedCount}
                        wrapUpHref={wrapUpHref}
                        statusFor={(id) => progressFor(id)?.status}
                      />
                    </div>
                    <h1 className="mt-5 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
                      <span className="mr-2 tabular-nums text-blue-600">{content.lessonId}</span>
                      {lessonName}
                    </h1>
                    <div className="mt-5">
                      <StepTracker
                        current={stepIndex}
                        furthest={furthest}
                        unlockAll={hasAdminRole(userData)}
                        onSelect={goTo}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-6 px-5 pb-8 pt-9 sm:px-10 sm:pb-10 sm:pt-10">

                  {step === 'first' && (
                    <>
                      <StepHeading n={1} title="Your first try" />
                      <div className="flex flex-col gap-4">
                        <BigQuestion text={content.coreQuestion} />
                        <p className="text-base text-slate-500">Before the lesson, give it a go. It isn’t graded, so a guess is fine.</p>
                      </div>
                      {!firstGrade && !answeringFirst ? (
                        <div className="flex flex-wrap items-center gap-3">
                          <button type="button" className={primaryButton} onClick={() => setAnsweringFirst(true)}>
                            <PenLine className="h-4 w-4" aria-hidden />
                            Yes, I’ll answer this
                          </button>
                          <button type="button" className={secondaryButton} onClick={() => goTo('learn')}>
                            I don’t know this yet
                          </button>
                        </div>
                      ) : !firstGrade ? (
                        <>
                          <AnswerBox
                            id="first-answer"
                            value={firstAnswer}
                            onChange={setFirstAnswer}
                            readOnly={grading}
                            autoFocus
                          />
                          {gradeError ? <ErrorNote message={gradeError} /> : null}
                          <div className="flex flex-wrap items-center gap-3">
                            <button
                              type="button"
                              className={primaryButton}
                              disabled={grading || firstAnswer.trim().length === 0}
                              onClick={submitFirst}
                            >
                              {grading ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : null}
                              {grading ? 'Reading your answer…' : 'Submit'}
                            </button>
                            <button type="button" className={textButton} disabled={grading} onClick={() => goTo('learn')}>
                              I don’t know this yet
                            </button>
                          </div>
                        </>
                      ) : firstGrade.passed ? (
                        <>
                          <div className="flex flex-col gap-4 rounded-2xl border border-green-200 bg-green-50 px-5 py-5">
                            <div className="flex items-center gap-3">
                              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-green-600 text-white">
                                <Sparkles className="h-5 w-5" aria-hidden />
                              </span>
                              <p className="text-xl text-green-900" style={marker}>
                                You already know this
                              </p>
                            </div>
                            <p className="text-[15px] leading-relaxed text-slate-700">
                              {firstGrade.summary || 'Your answer covers every key point.'} Skip straight to the check, or
                              go through the full lesson anyway.
                            </p>
                            <RubricResults points={firstGrade.points} />
                          </div>
                          <div className="flex flex-wrap items-center gap-3">
                            <button
                              type="button"
                              className={primaryButton}
                              onClick={() => {
                                setFastTrack(true);
                                goTo('check');
                              }}
                            >
                              Skip to the check
                              <ChevronRight className="h-4 w-4" aria-hidden />
                            </button>
                            <button type="button" className={secondaryButton} onClick={() => goTo('learn')}>
                              Do the full lesson
                            </button>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4">
                            <p className="font-bold">{firstGrade.summary || 'Good start. Here’s what to look for in the lesson.'}</p>
                            <RubricResults points={firstGrade.points} />
                            <p className="text-sm text-slate-500">
                              You’ll answer this again at the end and see how your thinking changed.
                            </p>
                          </div>
                          <div>
                            <button type="button" className={primaryButton} onClick={() => goTo('learn')}>
                              Start the lesson
                              <ChevronRight className="h-4 w-4" aria-hidden />
                            </button>
                          </div>
                        </>
                      )}
                    </>
                  )}

                  {step === 'learn' && (
                    <>
                      <StepHeading n={2} title="Learn it" />
                      {video && locked ? (
                        <button
                          type="button"
                          onClick={() => setPassOfferOpen(true)}
                          className="group relative flex aspect-video w-full flex-col items-center justify-center gap-3 overflow-hidden rounded-2xl bg-slate-900 text-white shadow-[0_12px_32px_rgba(15,23,42,0.18)]"
                        >
                          <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/20 transition group-hover:bg-white/20">
                            <PlayCircle className="h-7 w-7" aria-hidden />
                          </span>
                          <span className="text-base font-semibold">{video.title}</span>
                          <span className="text-sm text-slate-300">Watch the video lesson with the AP Macro Season Pass</span>
                        </button>
                      ) : video ? (
                        <video
                          key={video.url}
                          src={video.url}
                          controls
                          playsInline
                          preload="metadata"
                          className="aspect-video w-full rounded-2xl bg-slate-900 shadow-[0_12px_32px_rgba(15,23,42,0.18)]"
                        >
                          Your browser does not support the video tag.
                        </video>
                      ) : null}
                      <div className="flex flex-col gap-4 rounded-2xl border border-slate-100 bg-slate-50/70 px-5 py-5 text-[17px] leading-relaxed text-slate-700 sm:px-6">
                        <p className="text-lg text-slate-900" style={marker}>
                          {video ? 'Prefer reading? The short version' : 'The lesson'}
                        </p>
                        {content.brief.split('\n\n').map((paragraph, i) => (
                          <p key={i} className="whitespace-pre-line">
                            {paragraph}
                          </p>
                        ))}
                      </div>
                      <div className="flex flex-wrap items-center gap-3">
                        <button type="button" className={secondaryButton} onClick={() => goTo('first')}>
                          Back
                        </button>
                        <button type="button" className={primaryButton} onClick={() => goTo('walk')}>
                          Continue
                          <ChevronRight className="h-4 w-4" aria-hidden />
                        </button>
                      </div>
                    </>
                  )}

                  {step === 'walk' && currentSlide && (
                    <>
                      <StepHeading n={3} title="Walk through it" meta={`${slide + 1} of ${walkthrough.length}`} />
                      <div className="flex flex-wrap items-stretch gap-6">
                        {currentSlide.boards.length > 0 ? (
                          <div className="flex min-w-0 flex-[3_1_340px] flex-col gap-3">
                            {currentSlide.boards.map((board) => (
                              <div
                                key={board.url}
                                className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_8px_24px_rgba(15,23,42,0.06)]"
                              >
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={board.url} alt={board.alt} className="block h-auto w-full" />
                              </div>
                            ))}
                          </div>
                        ) : null}
                        <div className="flex min-w-0 flex-[2_1_240px] flex-col gap-3">
                          <p className="text-base text-blue-600" style={marker}>
                            {currentSlide.kicker}
                          </p>
                          <h3 className="text-[22px] font-extrabold leading-snug tracking-tight">{currentSlide.title}</h3>
                          {currentSlide.note ? (
                            <p className="text-base leading-relaxed text-slate-700">{currentSlide.note}</p>
                          ) : null}
                          {currentSlide.terms.length > 0 ? (
                            <ul className="flex list-disc flex-col gap-2.5 pl-5 text-[15px] leading-relaxed text-slate-600 marker:text-slate-300">
                              {currentSlide.terms.map((t) => (
                                <li key={t.term}>
                                  <span className="font-semibold text-slate-800">{t.term}:</span> {t.definition}
                                </li>
                              ))}
                            </ul>
                          ) : null}
                        </div>
                      </div>
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div aria-hidden className="flex gap-1.5">
                          {walkthrough.map((_, i) => (
                            <span
                              key={i}
                              className={`h-1.5 rounded-full transition-all ${i === slide ? 'w-6' : 'w-1.5'} ${i <= slide ? 'bg-blue-600' : 'bg-slate-200'}`}
                            />
                          ))}
                        </div>
                        <div className="flex flex-wrap gap-2.5">
                          <button
                            type="button"
                            className={secondaryButton}
                            onClick={() => (slide === 0 ? goTo('learn') : setSlide(slide - 1))}
                          >
                            Back
                          </button>
                          <button
                            type="button"
                            className={primaryButton}
                            onClick={() => {
                              if (slide < walkthrough.length - 1) setSlide(slide + 1);
                              else goTo('check');
                            }}
                          >
                            {slide < walkthrough.length - 1 ? 'Next' : 'Check yourself'}
                            <ChevronRight className="h-4 w-4" aria-hidden />
                          </button>
                        </div>
                      </div>
                    </>
                  )}

                  {step === 'check' && (
                    <>
                      <StepHeading
                        n={4}
                        title="Check yourself"
                        meta={checkQuestions ? `Question ${questionIndex + 1} of ${checkQuestions.length}` : undefined}
                      />
                      {!currentQuestion ? (
                        <p className="text-slate-600">Loading questions…</p>
                      ) : (
                        <>
                          <p className="text-lg font-semibold leading-relaxed">{currentQuestion.text}</p>
                          {currentQuestion.table && (
                            <div className="overflow-x-auto rounded-2xl border border-slate-200">
                              <table className="min-w-full text-left text-sm">
                                <thead className="bg-slate-50 text-slate-700">
                                  <tr>
                                    {currentQuestion.table.headers.map((header) => (
                                      <th key={header} className="px-4 py-2.5 font-semibold">{header}</th>
                                    ))}
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 bg-white">
                                  {currentQuestion.table.rows.map((row, r) => (
                                    <tr key={r}>
                                      {row.map((cell, c) => (
                                        <td key={c} className="px-4 py-2.5 text-slate-900">{cell}</td>
                                      ))}
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          )}
                          {currentQuestion.image && (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={currentQuestion.image}
                              alt="Question graph"
                              className="mx-auto w-full max-w-xl rounded-2xl border border-slate-200 bg-white"
                            />
                          )}
                          <div className="flex flex-col gap-2.5">
                            {currentQuestion.options.map((option, i) => {
                              const isCorrect = i === currentQuestion.correct;
                              const isPicked = i === picked;
                              const tone = !answered
                                ? 'border-slate-200 bg-white hover:border-blue-300 hover:bg-blue-50/40'
                                : isCorrect
                                  ? 'border-green-500 bg-green-50'
                                  : isPicked
                                    ? 'border-red-500 bg-red-50'
                                    : 'border-slate-200 bg-white opacity-70';
                              const badge = answered && isCorrect
                                ? 'bg-green-600 text-white'
                                : answered && isPicked
                                  ? 'bg-red-600 text-white'
                                  : 'bg-slate-100 text-slate-700';
                              return (
                                <button
                                  key={i}
                                  type="button"
                                  disabled={answered}
                                  onClick={() => {
                                    setPicked(i);
                                    // By position, so re-answering after jumping back doesn't double count.
                                    setResults((prev) => {
                                      const next = [...prev];
                                      next[questionIndex] = isCorrect;
                                      return next;
                                    });
                                  }}
                                  className={`flex min-h-[52px] w-full items-start gap-3 rounded-2xl border-[1.5px] px-4 py-3 text-left text-base leading-snug transition disabled:cursor-default ${tone}`}
                                >
                                  <span className={`inline-flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-full text-[13px] font-bold ${badge}`}>
                                    {String.fromCharCode(65 + i)}
                                  </span>
                                  <span className="pt-0.5">{option}</span>
                                </button>
                              );
                            })}
                          </div>
                          {answered ? (
                            <>
                              <div role="status" className={`rounded-2xl px-5 py-4 ${gotIt ? 'bg-green-50' : 'bg-red-50'}`}>
                                <p className={`mb-1.5 font-bold ${gotIt ? 'text-green-700' : 'text-red-700'}`}>
                                  {gotIt ? 'Correct' : `Not quite. The answer is ${String.fromCharCode(65 + currentQuestion.correct)}.`}
                                </p>
                                <p className="text-[15px] leading-relaxed text-slate-700">{currentQuestion.explanation}</p>
                              </div>
                              <div className="flex justify-end">
                                <button
                                  type="button"
                                  className={primaryButton}
                                  onClick={() => {
                                    setPicked(null);
                                    if (!lastQuestion) setQuestionIndex(questionIndex + 1);
                                    else goTo(fastTrack ? 'done' : 'final');
                                  }}
                                >
                                  {!lastQuestion ? 'Next question' : fastTrack ? 'Finish lesson' : 'Last step'}
                                  <ChevronRight className="h-4 w-4" aria-hidden />
                                </button>
                              </div>
                            </>
                          ) : null}
                        </>
                      )}
                    </>
                  )}

                  {step === 'final' && (
                    <>
                      <StepHeading
                        n={5}
                        title="Explain it"
                        subtitle="Same question as your first try. Answer it fully to complete the lesson."
                      />
                      <BigQuestion text={content.coreQuestion} />
                      {firstAnswer.trim() ? (
                        <details className="group text-[15px] text-slate-600">
                          <summary className="w-fit cursor-pointer list-none text-sm font-semibold text-blue-600 hover:text-blue-700 hover:underline [&::-webkit-details-marker]:hidden">
                            <span className="group-open:hidden">See your first try</span>
                            <span className="hidden group-open:inline">Hide your first try</span>
                          </summary>
                          <p className="mt-2 whitespace-pre-line border-l-2 border-blue-200 pl-3 leading-relaxed">{firstAnswer}</p>
                        </details>
                      ) : null}
                      <AnswerBox id="final-answer" value={finalAnswer} onChange={setFinalAnswer} readOnly={finalLocked} />
                      {gradeError ? <ErrorNote message={gradeError} /> : null}

                      {(!finalGrade || revising) && (
                        <div>
                          <button
                            type="button"
                            className={primaryButton}
                            disabled={grading || finalAnswer.trim().length < MIN_FINAL_ANSWER_LENGTH}
                            onClick={submitFinal}
                          >
                            {grading ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : null}
                            {grading ? 'Grading…' : finalGrade ? 'Resubmit' : 'Submit answer'}
                          </button>
                        </div>
                      )}

                      {finalGrade && !revising ? (
                        <>
                          <div
                            className={`flex flex-col gap-3 rounded-2xl border px-5 py-4 ${finalGrade.passed ? 'border-green-200 bg-green-50' : 'border-amber-200 bg-amber-50'}`}
                          >
                            <p className={`text-xl ${finalGrade.passed ? 'text-green-900' : 'text-amber-900'}`} style={marker}>
                              {finalGrade.passed ? 'You nailed it' : outOfAttempts ? 'Here’s the full answer' : 'Almost there'}
                            </p>
                            {finalGrade.summary ? (
                              <p className="text-[15px] leading-relaxed text-slate-700">{finalGrade.summary}</p>
                            ) : null}
                            <RubricResults points={finalGrade.points} />
                            {!finalGrade.passed && !outOfAttempts ? (
                              <p className="text-sm font-semibold text-amber-900">
                                {finalGrade.attemptsLeft} {finalGrade.attemptsLeft === 1 ? 'try' : 'tries'} left
                              </p>
                            ) : null}
                          </div>
                          {finalGrade.modelAnswer ? (
                            <div className="rounded-2xl bg-blue-50 px-5 py-4">
                              <p className="mb-1.5 font-bold text-blue-900">Model answer</p>
                              <p className="text-[15px] leading-relaxed text-slate-700">{finalGrade.modelAnswer}</p>
                            </div>
                          ) : null}
                          <div className="flex flex-wrap items-center gap-3">
                            {finalGrade.passed || outOfAttempts ? (
                              <button type="button" className={primaryButton} onClick={() => goTo('done')}>
                                Finish lesson
                                <ChevronRight className="h-4 w-4" aria-hidden />
                              </button>
                            ) : (
                              <button type="button" className={primaryButton} onClick={() => setRevising(true)}>
                                <PenLine className="h-4 w-4" aria-hidden />
                                Revise your answer
                              </button>
                            )}
                          </div>
                        </>
                      ) : null}
                    </>
                  )}

                  {step === 'done' && (
                    <>
                      <div className="flex flex-col items-start gap-3">
                        <span
                          className={`inline-flex h-16 w-16 -rotate-3 items-center justify-center rounded-2xl ${outcome === 'reviewed' ? 'bg-amber-500' : 'bg-green-600'} text-white shadow-[0_8px_20px_rgba(22,163,74,0.25)]`}
                        >
                          <Check className="h-8 w-8" strokeWidth={3} aria-hidden />
                        </span>
                        <h2 className="mt-1 text-[28px] font-extrabold tracking-tight">
                          {outcome === 'reviewed' ? `Lesson ${content.lessonId} reviewed` : `Lesson ${content.lessonId} complete`}
                        </h2>
                        <p className="text-[17px] text-slate-600">
                          {outcome === 'first'
                            ? 'You knew it before the lesson started.'
                            : outcome === 'passed'
                              ? 'You explained the big question in your own words.'
                              : 'Come back to this one later and try the big question again.'}
                        </p>
                      </div>
                      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        <StatTile label="Check yourself" value={checkQuestions ? `${correctCount} of ${checkQuestions.length}` : '—'} />
                        <StatTile
                          label="Big question"
                          value={outcome === 'first' ? 'Passed on first try' : outcome === 'passed' ? 'Passed' : 'Reviewed'}
                        />
                      </div>
                      <div className="rounded-2xl border border-slate-200 px-5 py-4">
                        <p className="mb-2.5 text-lg" style={marker}>
                          The big ideas
                        </p>
                        <ul className="flex flex-col gap-1.5">
                          {walkthrough.map((s) => (
                            <li key={s.title} className="flex gap-2.5 text-[15px] leading-relaxed text-slate-700">
                              <Check className="mt-1 h-4 w-4 shrink-0 text-blue-600" aria-hidden />
                              {s.title}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="flex flex-wrap items-center gap-3">
                        {nextLesson?.href && !unitComplete ? (
                          <Link href={nextLesson.href} className={primaryButton}>
                            Next lesson: {nextLesson.lessonId} {nextLesson.name}
                            <ChevronRight className="h-4 w-4" aria-hidden />
                          </Link>
                        ) : (
                          <Link href={wrapUpHref} className={primaryButton}>
                            {unitComplete ? `Unit ${content.unit} complete: see your wrap-up` : `Unit ${content.unit} wrap-up`}
                            <ChevronRight className="h-4 w-4" aria-hidden />
                          </Link>
                        )}
                        <button type="button" className={secondaryButton} onClick={restart}>
                          <RotateCcw className="h-4 w-4" aria-hidden />
                          Go through it again
                        </button>
                      </div>
                    </>
                  )}
                  </div>
                </section>
              </main>

            <LessonNotes
              lessonId={content.lessonId}
              lessonName={lessonName}
              brief={content.brief}
              outline={walkthrough.map((s) => s.title)}
              keyTerms={lesson.keyTerms}
              cheatSheetHref={backHref}
              unit={content.unit}
              nextLesson={nextLesson?.href ? { href: nextLesson.href, label: `${nextLesson.lessonId} ${nextLesson.name}` } : null}
            />
          </div>
        </div>
      </div>

      {locked && passOfferOpen ? <SeasonPassEntryWideModal subject="macro" onClose={() => setPassOfferOpen(false)} /> : null}
    </>
  );
}

/**
 * Segmented progress bar with step names. Reached steps are clickable.
 * `unlockAll`: admins can jump to any step to review content without answering (no grading calls).
 */
function StepTracker({
  current,
  furthest,
  unlockAll,
  onSelect,
}: {
  current: number;
  furthest: number;
  unlockAll: boolean;
  onSelect: (step: Step) => void;
}) {
  return (
    <ol aria-label="Lesson steps" className="flex gap-1.5">
      {STEPS.map((s, i) => {
        const active = i === current;
        const reached = i <= furthest;
        const reachable = (reached || unlockAll) && !active;
        const bar = `block h-1.5 w-full rounded-full transition ${
          active ? 'bg-blue-600' : reached ? 'bg-blue-300' : 'bg-slate-200'
        }`;
        const label = `mt-2 hidden truncate text-xs sm:block ${
          active ? 'font-semibold text-slate-900' : reached ? 'font-medium text-slate-600' : 'font-medium text-slate-400'
        }`;
        return (
          <li key={s.id} aria-current={active ? 'step' : undefined} className="min-w-0 flex-1">
            {reachable ? (
              <button
                type="button"
                onClick={() => onSelect(s.id)}
                className="group block w-full rounded text-left outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              >
                <span aria-hidden className={`${bar} group-hover:bg-blue-500`} />
                <span className={`${label} group-hover:text-blue-600`}>
                  <span className="sr-only">Go back to </span>
                  {s.label}
                </span>
              </button>
            ) : (
              <>
                <span aria-hidden className={bar} />
                <span className={label}>{s.label}</span>
              </>
            )}
          </li>
        );
      })}
    </ol>
  );
}

/** Unit path in a dropdown: "Lesson 3 of 7". Closes on outside click or Escape. */
function LessonPathMenu({
  unit,
  currentLessonId,
  unitPath,
  completedCount,
  wrapUpHref,
  statusFor,
}: {
  unit: number;
  currentLessonId: string;
  unitPath: { lessonId: string; name: string; href: string | null }[];
  completedCount: number;
  wrapUpHref: string;
  statusFor: (lessonId: string) => 'passed' | 'reviewed' | undefined;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const index = unitPath.findIndex((l) => l.lessonId === currentLessonId);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen(!open)}
        className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 px-3 py-1.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
      >
        Lesson {index + 1} of {unitPath.length}
        <ChevronDown className={`h-4 w-4 text-slate-400 transition ${open ? 'rotate-180' : ''}`} aria-hidden />
      </button>
      {open ? (
        <div className="absolute right-0 z-30 mt-2 w-[min(21rem,calc(100vw-2.5rem))] rounded-2xl border border-slate-200 bg-white p-2 shadow-[0_18px_40px_rgba(15,23,42,0.14)]">
          <div className="flex items-center justify-between px-2.5 pb-2 pt-1.5">
            <p className="text-sm font-bold text-slate-900">Unit {unit} path</p>
            <p className="text-xs font-medium text-slate-500">
              {completedCount} of {unitPath.length} done
            </p>
          </div>
          <ol className="flex flex-col">
            {unitPath.map((item, i) => (
              <li key={item.lessonId}>
                <PathRow
                  lessonId={item.lessonId}
                  name={item.name}
                  href={item.href}
                  current={item.lessonId === currentLessonId}
                  status={statusFor(item.lessonId)}
                  lineAbove={i === 0 ? 'none' : statusFor(unitPath[i - 1].lessonId) ?? 'todo'}
                  lineBelow={i === unitPath.length - 1 ? 'none' : statusFor(item.lessonId) ?? 'todo'}
                />
              </li>
            ))}
          </ol>
          <Link
            href={wrapUpHref}
            className="mt-1.5 flex items-center justify-between gap-2 rounded-xl border-t border-slate-100 px-2.5 pb-1.5 pt-3 text-sm font-semibold text-slate-700 hover:text-blue-600"
          >
            Unit {unit} wrap-up and test
            <ChevronRight className="h-4 w-4 text-slate-400" aria-hidden />
          </Link>
        </div>
      ) : null}
    </div>
  );
}

function StepHeading({ n, title, subtitle, meta }: { n: number; title: string; subtitle?: string; meta?: string }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="text-xs font-bold uppercase tracking-[0.14em] text-blue-600">
          Step {n} · {title}
        </h2>
        {meta ? <p className="text-sm font-semibold text-slate-500">{meta}</p> : null}
      </div>
      {subtitle ? <p className="text-base leading-relaxed text-slate-600">{subtitle}</p> : null}
    </div>
  );
}

/** The lesson's core question, as the hero of the first-try and final steps. */
function BigQuestion({ text }: { text: string }) {
  return (
    <p className="text-2xl font-semibold leading-snug tracking-tight text-slate-900 sm:text-[28px] sm:leading-[1.3]">
      {text}
    </p>
  );
}

function RubricResults({ points }: { points: GuidedGradeResult['points'] }) {
  return (
    <ul className="flex flex-col gap-2.5">
      {points.map((p) => (
        <li key={p.id} className="flex gap-3">
          <span
            className={`mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${p.earned ? 'bg-green-600 text-white' : 'bg-white text-amber-600 ring-1 ring-amber-300'}`}
          >
            {p.earned ? <Check className="h-3.5 w-3.5" strokeWidth={3} aria-hidden /> : <CircleDot className="h-3.5 w-3.5" aria-hidden />}
          </span>
          <div className="min-w-0 text-[15px] leading-relaxed">
            <span className="sr-only">{p.earned ? 'Earned: ' : 'Not yet: '}</span>
            <span className="text-slate-800">{p.feedback || p.criterion}</span>
          </div>
        </li>
      ))}
    </ul>
  );
}

function StatTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4">
      <p className="text-sm font-semibold text-slate-500">{label}</p>
      <p className="mt-1 text-xl font-extrabold tracking-tight">{value}</p>
    </div>
  );
}

function ErrorNote({ message }: { message: string }) {
  return (
    <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-[15px] font-medium text-red-700">
      {message}
    </p>
  );
}

type PathLine = 'none' | 'todo' | 'passed' | 'reviewed';

const pathLineColor: Record<Exclude<PathLine, 'none'>, string> = {
  todo: 'bg-slate-200',
  passed: 'bg-green-500',
  reviewed: 'bg-amber-400',
};

/** One stop on the unit path: a dot joined to its neighbours, coloured once the lesson above it is done. */
function PathRow({
  lessonId,
  name,
  href,
  current,
  status,
  lineAbove,
  lineBelow,
}: {
  lessonId: string;
  name: string;
  href: string | null;
  current: boolean;
  status?: 'passed' | 'reviewed';
  lineAbove: PathLine;
  lineBelow: PathLine;
}) {
  const dot = status === 'passed'
    ? 'bg-green-600 text-white'
    : status === 'reviewed'
      ? 'bg-amber-500 text-white'
      : current
        ? 'bg-white ring-[5px] ring-inset ring-blue-600'
        : 'bg-white ring-2 ring-inset ring-slate-200';
  const row: ReactNode = (
    <>
      <span aria-hidden className="relative flex w-[22px] shrink-0 items-center justify-center self-stretch">
        {lineAbove !== 'none' ? (
          <span className={`absolute left-1/2 top-0 h-1/2 w-0.5 -translate-x-1/2 ${pathLineColor[lineAbove]}`} />
        ) : null}
        {lineBelow !== 'none' ? (
          <span className={`absolute bottom-0 left-1/2 h-1/2 w-0.5 -translate-x-1/2 ${pathLineColor[lineBelow]}`} />
        ) : null}
        <span className={`relative inline-flex h-[22px] w-[22px] items-center justify-center rounded-full ${dot}`}>
          {status ? <Check className="h-3 w-3" strokeWidth={3.5} /> : null}
        </span>
      </span>
      <span className={`py-2.5 text-sm leading-snug ${current ? 'font-bold text-slate-900' : status ? 'font-medium text-slate-900' : 'font-medium text-slate-500'}`}>
        {lessonId} {name}
        {status ? <span className="sr-only"> ({status === 'passed' ? 'complete' : 'reviewed'})</span> : null}
      </span>
    </>
  );
  const rowClass = `flex items-stretch gap-3 rounded-xl px-2.5 ${current ? 'bg-blue-50' : ''}`;
  if (href && !current) {
    return (
      <Link href={href} className={`${rowClass} hover:bg-slate-50`}>
        {row}
      </Link>
    );
  }
  return (
    <div className={rowClass} aria-current={current ? 'page' : undefined}>
      {row}
    </div>
  );
}

function AnswerBox({
  id,
  value,
  onChange,
  readOnly = false,
  autoFocus = false,
}: {
  id: string;
  value: string;
  onChange: (value: string) => void;
  readOnly?: boolean;
  autoFocus?: boolean;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-semibold text-slate-700">
        Your answer
      </label>
      <textarea
        id={id}
        value={value}
        readOnly={readOnly}
        autoFocus={autoFocus}
        onChange={(e) => onChange(e.target.value)}
        rows={5}
        maxLength={2000}
        placeholder="Write 2–3 sentences…"
        className="w-full resize-y rounded-2xl border border-slate-200 bg-white px-4 py-3 text-base leading-relaxed text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 read-only:bg-slate-50"
      />
    </div>
  );
}

/**
 * The lesson's free text as a study-notes section under the lesson. It is in the server HTML, so search
 * engines can read the lesson without clicking through the steps. Holds only free material: the written
 * lesson, the walkthrough outline (titles only) and the key terms, which are also on the cheat sheet.
 */
function LessonNotes({
  lessonId,
  lessonName,
  brief,
  outline,
  keyTerms,
  cheatSheetHref,
  unit,
  nextLesson,
}: {
  lessonId: string;
  lessonName: string;
  brief: string;
  outline: string[];
  keyTerms: { term: string; definition: string }[];
  cheatSheetHref: string;
  unit: number;
  nextLesson: { href: string; label: string } | null;
}) {
  const sideLabel = 'text-xs font-semibold uppercase tracking-wider text-slate-400';
  return (
    <section
      aria-labelledby="lesson-notes-heading"
      className="rounded-3xl border border-slate-200 bg-white px-5 py-7 shadow-[0_1px_2px_rgba(15,23,42,0.04)] sm:px-9 sm:py-9"
    >
      <p className="text-lg text-slate-900" style={marker}>
        Lesson notes
      </p>
      <h2 id="lesson-notes-heading" className="mt-1 text-2xl font-extrabold tracking-tight text-slate-900">
        {lessonId} {lessonName} in brief
      </h2>

      <div className="mt-6 flex flex-col gap-8">
        <div className="flex max-w-[65ch] flex-col gap-4 text-[17px] leading-[1.75] text-slate-700">
          {brief.split('\n\n').map((paragraph, i) => (
            <p key={i} className="whitespace-pre-line">
              {paragraph}
            </p>
          ))}
          {outline.length > 0 ? (
            <div className="mt-4 flex flex-col gap-3 border-t border-slate-100 pt-6 text-base leading-normal">
              <h3 className={sideLabel}>In this lesson</h3>
              <ol className="flex flex-col gap-2">
                {outline.map((title, i) => (
                  <li key={i} className="flex items-baseline gap-3 text-[15px] leading-snug text-slate-700">
                    <span className="w-4 shrink-0 text-sm font-semibold tabular-nums text-blue-600">{i + 1}</span>
                    {title}
                  </li>
                ))}
              </ol>
            </div>
          ) : null}
        </div>

        <div className="flex flex-col gap-8 border-t border-slate-100 pt-7">
          {keyTerms.length > 0 ? (
            <div className="flex flex-col gap-3">
              <h3 className={sideLabel}>Key terms</h3>
              <dl className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
                {keyTerms.map((t) => (
                  <div key={t.term}>
                    <dt className="text-[15px] font-semibold text-slate-900">{t.term}</dt>
                    <dd className="mt-0.5 text-sm leading-relaxed text-slate-500">{t.definition}</dd>
                  </div>
                ))}
              </dl>
            </div>
          ) : null}
        </div>
      </div>

      <div className="mt-9 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-5 text-sm font-semibold">
        <Link href={cheatSheetHref} className="inline-flex items-center gap-1.5 text-slate-500 hover:text-slate-900">
          <ChevronLeft className="h-4 w-4" aria-hidden />
          Unit {unit} cheat sheet
        </Link>
        {nextLesson ? (
          <Link href={nextLesson.href} className="inline-flex items-center gap-1.5 text-blue-600 hover:text-blue-800">
            Next: {nextLesson.label}
            <ChevronRight className="h-4 w-4" aria-hidden />
          </Link>
        ) : null}
      </div>
    </section>
  );
}
