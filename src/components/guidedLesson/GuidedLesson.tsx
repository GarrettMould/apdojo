'use client';

import { useMemo, useRef, useState, type ReactNode } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Check,
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
  const router = useRouter();
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
  // Render the lesson while auth loads so the server HTML has real content (these URLs are indexed);
  // lock it only once we know there's no Macro pass.
  const locked = !loadingUserData && !hasValidSeasonPass(userData, 'macro');

  const goTo = (next: Step) => {
    setGradeError(null);
    setStep(next);
    setFurthest((f) => Math.max(f, stepPosition(next)));
    cardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const submitFirst = async () => {
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
      <div
        className={locked ? 'pointer-events-none select-none blur-[6px]' : undefined}
        aria-hidden={locked ? true : undefined}
      >
        <div className="min-h-screen bg-slate-50 bg-[radial-gradient(#dbe3ee_1px,transparent_1px)] px-4 pb-20 pt-8 text-slate-900 [background-size:22px_22px]">
          <div className="mx-auto flex max-w-[1120px] flex-col gap-6">
            <div className="flex flex-col gap-4">
              <Link
                href={backHref}
                className="inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-slate-900"
              >
                <ChevronLeft className="h-4 w-4" aria-hidden />
                Unit {content.unit} cheat sheet
              </Link>
              <div className="flex items-center gap-4 sm:gap-5">
                <span
                  aria-hidden
                  className="inline-flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-blue-600 text-2xl font-extrabold tracking-tight tabular-nums text-white shadow-[0_8px_20px_rgba(37,99,235,0.3)] sm:h-20 sm:w-20 sm:text-3xl"
                >
                  {content.lessonId}
                </span>
                <div className="flex min-w-0 flex-col gap-1">
                  <p className="text-[13px] font-bold tracking-wide text-blue-600">
                    AP Macro · Unit {content.unit} · Lesson {content.lessonId}
                  </p>
                  <h1 className="text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">{lessonName}</h1>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-start gap-7">
              <main className="min-w-0 flex-[999_1_560px]">
                <section
                  ref={cardRef}
                  className="scroll-mt-24 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04),0_16px_40px_rgba(15,23,42,0.07)]"
                >
                  <div className="border-b border-slate-100 bg-slate-50/80 px-3 py-4 sm:px-8">
                    <StepTracker
                      current={stepIndex}
                      furthest={furthest}
                      unlockAll={hasAdminRole(userData)}
                      onSelect={goTo}
                    />
                  </div>
                  <div className="flex flex-col gap-6 p-5 sm:p-8">

                  {step === 'first' && (
                    <>
                      <StepHeading
                        title="Your first try"
                        subtitle="Before the lesson, can you answer this? It isn’t graded, so a guess is fine."
                      />
                      <BigQuestion text={content.coreQuestion} />
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
                      <StepHeading title="Learn it" />
                      {video ? (
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
                      <StepHeading title="Walk through it" meta={`${slide + 1} of ${walkthrough.length}`} />
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

              <aside
                aria-label={`Unit ${content.unit} lessons`}
                className="flex min-w-0 flex-[1_1_260px] flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.04)]"
              >
                <div className="flex flex-col gap-2">
                  <p className="text-lg" style={marker}>
                    Unit {content.unit} path
                  </p>
                  <p className="text-sm text-slate-500">
                    {completedCount} of {unitPath.length} lessons done
                  </p>
                  <div aria-hidden className="h-2 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full bg-blue-600 transition-all"
                      style={{ width: `${unitPath.length ? (completedCount / unitPath.length) * 100 : 0}%` }}
                    />
                  </div>
                </div>
                <ol className="flex flex-col">
                  {unitPath.map((item, i) => (
                    <li key={item.lessonId}>
                      <PathRow
                        lessonId={item.lessonId}
                        name={item.name}
                        href={item.href}
                        current={item.lessonId === content.lessonId}
                        status={progressFor(item.lessonId)?.status}
                        lineAbove={i === 0 ? 'none' : progressFor(unitPath[i - 1].lessonId)?.status ?? 'todo'}
                        lineBelow={i === unitPath.length - 1 ? 'none' : progressFor(item.lessonId)?.status ?? 'todo'}
                      />
                    </li>
                  ))}
                </ol>
                <Link
                  href={wrapUpHref}
                  className="inline-flex items-center justify-between gap-2 rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  Unit {content.unit} wrap-up and test
                  <ChevronRight className="h-4 w-4 text-slate-400" aria-hidden />
                </Link>
              </aside>
            </div>
          </div>
        </div>
      </div>

      {locked ? <SeasonPassEntryWideModal subject="macro" onClose={() => router.push(backHref)} /> : null}
    </>
  );
}

/** `unlockAll`: admins can jump to any step to review content without answering (no grading calls). */
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
    <ol aria-label="Lesson steps" className="flex items-start">
      {STEPS.map((s, i) => {
        const active = i === current;
        const done = i < furthest && !active;
        const reachable = (i <= furthest || unlockAll) && !active;
        const Icon = done ? Check : s.icon;
        const circle = `relative z-10 inline-flex h-8 w-8 items-center justify-center rounded-full transition ${
          done
            ? 'bg-blue-600 text-white'
            : active
              ? 'bg-blue-50 text-blue-600 ring-1 ring-blue-300'
              : reachable
                ? 'bg-white text-blue-600 ring-1 ring-blue-300'
                : 'bg-white text-slate-400 ring-1 ring-slate-200'
        }`;
        const label = `sr-only text-xs sm:not-sr-only ${active ? 'font-bold text-slate-900' : reachable ? 'font-semibold text-slate-600' : 'font-medium text-slate-400'}`;
        return (
          <li
            key={s.id}
            aria-current={active ? 'step' : undefined}
            className="relative flex flex-1 flex-col items-center gap-1.5 text-center"
          >
            {i > 0 ? (
              <span
                aria-hidden
                className={`absolute right-1/2 top-4 h-px w-full ${i <= furthest ? 'bg-blue-300' : 'bg-slate-200'}`}
              />
            ) : null}
            {reachable ? (
              <button
                type="button"
                onClick={() => onSelect(s.id)}
                className="group relative z-10 flex flex-col items-center gap-1.5 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              >
                <span aria-hidden className={`${circle} group-hover:ring-2 group-hover:ring-blue-300`}>
                  <Icon className="h-4 w-4" strokeWidth={done ? 2.75 : 1.75} />
                </span>
                <span className={`${label} group-hover:text-blue-600`}>
                  <span className="sr-only">Go back to </span>
                  {s.label}
                </span>
              </button>
            ) : (
              <>
                <span aria-hidden className={circle}>
                  <Icon className="h-4 w-4" strokeWidth={1.75} />
                </span>
                <span className={label}>{s.label}</span>
              </>
            )}
          </li>
        );
      })}
    </ol>
  );
}

function StepHeading({ title, subtitle, meta }: { title: string; subtitle?: string; meta?: string }) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="text-2xl font-extrabold tracking-tight">
          <span className="bg-[linear-gradient(transparent_58%,#fde68a_58%,#fde68a_92%,transparent_92%)] px-0.5">
            {title}
          </span>
        </h2>
        {meta ? <p className="text-sm font-semibold text-slate-500">{meta}</p> : null}
      </div>
      {subtitle ? <p className="text-base leading-relaxed text-slate-600">{subtitle}</p> : null}
    </div>
  );
}

function BigQuestion({ text }: { text: string }) {
  return (
    <div className="relative rounded-2xl border border-amber-200 bg-amber-50 px-5 pb-5 pt-4 sm:px-6">
      <p className="mb-1.5 text-base text-amber-800" style={marker}>
        The big question
      </p>
      <p className="text-lg font-semibold leading-relaxed text-slate-900">{text}</p>
    </div>
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
