'use client';

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import type { CheatSheetWatchVideo } from '@/lib/cheatSheetVideos';
import { scotusEssayPrompts } from '@/data/gov/scotusEssayPrompts';
import { useAuthContext } from '@/contexts/AuthContext';
import { hasValidSeasonPass } from '@/lib/utils';
import { COURSE_CONFIG } from '@/data/seasonPassCourseConfig';
import { Button } from '@/components/ui/button';

const scotusComparisonFrqSlugSet = new Set(scotusEssayPrompts.map((p) => p.id));
const AUTO_ADVANCE_MS = 1800;
const FREE_LESSON_VIDEO_PREVIEW_SECONDS = 5;

function getScotusComparisonFrqSlug(caseId: string | undefined): string | null {
  if (!caseId) return null;
  if (scotusComparisonFrqSlugSet.has(caseId)) return caseId;
  const withoutYear = caseId.replace(/-\d{4}$/, '');
  if (withoutYear !== caseId && scotusComparisonFrqSlugSet.has(withoutYear)) return withoutYear;
  return null;
}

type Props = {
  video: CheatSheetWatchVideo;
};

function SeasonPassLessonPitch({ courseKey }: { courseKey: 'macro' | 'micro' }) {
  const config = COURSE_CONFIG[courseKey];
  const accentBtn =
    courseKey === 'micro'
      ? 'bg-green-600 hover:bg-green-700 border-green-800'
      : 'bg-blue-600 hover:bg-blue-700 border-blue-800';
  return (
    <div className="flex flex-col">
      <p className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-600">{config.badge}</p>
      <h3 className="mt-2 text-lg font-black leading-tight text-black">{config.headline}</h3>
      <p className="mt-2 text-sm font-semibold leading-relaxed text-slate-700">{config.subheadline}</p>
      <p className="mt-3 text-xl font-black tabular-nums text-black">
        ${config.price}
        <span className="ml-2 text-base font-semibold text-gray-400 line-through">${config.originalPrice}</span>
      </p>
      <Button
        asChild
        size="lg"
        className={`mt-4 w-full border-2 border-black py-3 text-sm font-black shadow-[3px_3px_0_0_rgba(0,0,0,1)] ${accentBtn} text-white`}
      >
        <Link href={`/purchase/season-pass?courseType=${courseKey}`}>Get the Season Pass</Link>
      </Button>
    </div>
  );
}

export function CheatSheetVideoWatchClient({ video }: Props) {
  const { user, userData } = useAuthContext();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const maxTimeSeenRef = useRef(0);
  const advanceTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [videoEnded, setVideoEnded] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [videoAspectRatio, setVideoAspectRatio] = useState(16 / 9);
  const [isHardLocked, setIsHardLocked] = useState(false);
  const isEconVideo = video.kind === 'macro' || video.kind === 'micro';
  const isProCustomer = useMemo(() => {
    if (!user || !userData) return false;
    if (isEconVideo) return hasValidSeasonPass(userData, video.subject as 'macro' | 'micro');
    return hasValidSeasonPass(userData);
  }, [user, userData, isEconVideo, video.subject]);
  const questions = video.questions ?? [];
  const hasQuestions = questions.length > 0;
  const question = questions[questionIndex];
  const essayPracticeSlug = getScotusComparisonFrqSlug(video.scotusCaseId);
  const showScotusNext = video.kind === 'scotus' && videoEnded && !hasQuestions;
  const selectedAnswer = question ? answers[question.id] : undefined;
  const isAnswered = selectedAnswer !== undefined;
  const isCorrect = isAnswered && question != null && selectedAnswer === question.correctAnswer;
  const isLastQuestion = questionIndex >= questions.length - 1;
  const allAnswered =
    hasQuestions && questions.every((q) => answers[q.id] !== undefined);

  useEffect(() => {
    return () => {
      if (advanceTimeoutRef.current) clearTimeout(advanceTimeoutRef.current);
    };
  }, []);

  useEffect(() => {
    maxTimeSeenRef.current = 0;
    setIsHardLocked(false);
  }, [video.watchId]);

  useEffect(() => {
    if (isProCustomer) {
      maxTimeSeenRef.current = 0;
      setIsHardLocked(false);
    }
  }, [isProCustomer]);

  const bumpWatchProgress = useCallback(
    (el: HTMLVideoElement) => {
      if (!isEconVideo || isProCustomer) return;
      maxTimeSeenRef.current = Math.max(maxTimeSeenRef.current, el.currentTime);
      if (maxTimeSeenRef.current < FREE_LESSON_VIDEO_PREVIEW_SECONDS) return;
      el.pause();
      setIsHardLocked(true);
    },
    [isEconVideo, isProCustomer],
  );

  const replay = useCallback(() => {
    setVideoEnded(false);
    const el = videoRef.current;
    if (!el) return;
    el.currentTime = 0;
    void el.play();
  }, []);

  const handleAnswer = useCallback(
    (index: number) => {
      if (!question || answers[question.id] !== undefined) return;

      setAnswers((prev) => ({ ...prev, [question.id]: index }));

      const isCorrect = index === question.correctAnswer;
      if (!isCorrect || questionIndex >= questions.length - 1) return;

      if (advanceTimeoutRef.current) clearTimeout(advanceTimeoutRef.current);
      advanceTimeoutRef.current = setTimeout(() => {
        setQuestionIndex((i) => Math.min(i + 1, questions.length - 1));
      }, AUTO_ADVANCE_MS);
    },
    [answers, question, questionIndex, questions.length],
  );

  const goToQuestion = useCallback((index: number) => {
    if (advanceTimeoutRef.current) clearTimeout(advanceTimeoutRef.current);
    setQuestionIndex(Math.max(0, Math.min(index, questions.length - 1)));
  }, [questions.length]);

  const playerMaxHeightCss = showScotusNext
    ? 'min(40vh, 22rem)'
    : 'calc(100vh - 5rem - 3.5rem - 2rem)';
  /** Stats files often include letterboxing; use a slightly wider frame + object-cover to crop it without scaling the control bar. */
  const displayAspectRatio =
    video.kind === 'stats' ? videoAspectRatio * 1.18 : videoAspectRatio;

  return (
    <div className="flex h-[calc(100vh-5rem)] flex-col overflow-hidden bg-white lg:flex-row">
      {/* Video column */}
      <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
        <div className="flex shrink-0 items-center gap-3 px-4 py-3 sm:px-6">
          <Link
            href={video.backHref}
            className="inline-flex shrink-0 items-center gap-0.5 rounded-md px-2 py-1 text-sm font-medium text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900"
            aria-label="Back to cheat sheet"
          >
            <ChevronLeft className="h-4 w-4" aria-hidden />
            Back
          </Link>
          <div className="h-8 w-px shrink-0 bg-gray-200" aria-hidden />
          <div className="min-w-0">
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-gray-400">
              Unit {video.unit} · Video lesson
            </p>
            <h1 className="truncate text-sm font-semibold text-gray-900 sm:text-base">
              {video.title}
            </h1>
          </div>
        </div>

        <div className="flex min-h-0 flex-1 items-center justify-center px-4 pb-4 sm:px-6 sm:pb-6">
          <div
            className={`relative max-h-full max-w-full overflow-hidden rounded-lg border-2 border-black shadow-[6px_6px_0_0_rgba(0,0,0,1)] ${
              video.kind === 'stats' ? 'bg-white' : 'bg-black'
            }`}
            style={
              {
                '--video-ar': displayAspectRatio,
                aspectRatio: 'var(--video-ar)',
                maxHeight: playerMaxHeightCss,
                width: `min(100%, calc(${playerMaxHeightCss} * var(--video-ar)))`,
              } as React.CSSProperties
            }
          >
            <video
              key={video.watchId}
              ref={videoRef}
              src={video.videoUrl}
              controls={!isHardLocked}
              autoPlay
              playsInline
              preload="auto"
              onLoadedMetadata={(e) => {
                const el = e.currentTarget;
                if (el.videoWidth > 0 && el.videoHeight > 0) {
                  setVideoAspectRatio(el.videoWidth / el.videoHeight);
                }
              }}
              onTimeUpdate={(e) => bumpWatchProgress(e.currentTarget)}
              onSeeked={(e) => bumpWatchProgress(e.currentTarget)}
              onEnded={() => {
                if (video.kind === 'scotus') setVideoEnded(true);
              }}
              className={`absolute inset-0 h-full w-full ${
                video.kind === 'stats' ? 'object-cover object-center' : 'object-contain'
              } ${isHardLocked ? 'pointer-events-none' : ''}`}
            >
              Your browser does not support the video tag.
            </video>
            {isHardLocked && isEconVideo && (
              <Link
                href={`/purchase/season-pass?courseType=${video.kind}`}
                className="absolute inset-0 z-10 flex items-end justify-center bg-black/40 p-4"
              >
                <span className="rounded-lg bg-white px-4 py-2 text-sm font-bold text-gray-900 shadow-lg">
                  Unlock full video with Season Pass
                </span>
              </Link>
            )}
          </div>
        </div>

        {isHardLocked && isEconVideo && !hasQuestions && (
          <div className="shrink-0 border-t border-gray-200 px-4 py-4 sm:px-6">
            <SeasonPassLessonPitch courseKey={video.kind} />
          </div>
        )}

        {showScotusNext && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 280, damping: 28 }}
            className="flex shrink-0 flex-col gap-2 border-t border-gray-200 px-4 py-4 sm:px-6"
          >
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-gray-400">
              What&apos;s next
            </p>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={replay}
                className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-900 transition hover:bg-gray-50"
              >
                Watch again
              </button>
              <Link
                href={
                  essayPracticeSlug
                    ? `/scotus-essay-practice/${essayPracticeSlug}`
                    : '/scotus-essay-practice'
                }
                className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                Essay Practice
                <ArrowRight className="h-3.5 w-3.5" aria-hidden />
              </Link>
            </div>
          </motion.div>
        )}
      </div>

      {/* Full-height comprehension sidebar */}
      {hasQuestions && question && (
        <aside className="flex h-72 shrink-0 flex-col border-t border-gray-200 bg-gray-50 lg:h-full lg:w-80 lg:shrink-0 lg:border-l lg:border-t-0 xl:w-[22rem]">
          <div className="shrink-0 border-b border-gray-200 px-5 py-4">
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-gray-400">
              Comprehension check
            </p>
            <div className="mt-2 flex items-center justify-between gap-3">
              <span className="text-sm font-semibold text-gray-900">
                Question {questionIndex + 1} of {questions.length}
              </span>
              <div className="flex gap-1">
                {questions.map((_, i) => (
                  <span
                    key={i}
                    className={`h-1.5 w-1.5 rounded-full ${
                      i === questionIndex
                        ? 'bg-gray-900'
                        : i < questionIndex
                          ? 'bg-gray-400'
                          : 'bg-gray-200'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          <div key={question.id} className="flex min-h-0 flex-1 flex-col overflow-hidden px-5 py-5">
            {isHardLocked && isEconVideo ? (
              <SeasonPassLessonPitch courseKey={video.kind} />
            ) : (
              <>
            <p className="text-[15px] font-medium leading-snug text-gray-900">{question.text}</p>

            <div className="mt-4 space-y-2">
              {question.options.map((option, index) => {
                const isSelected = selectedAnswer === index;
                const isCorrectOption = index === question.correctAnswer;
                const showResult = isAnswered;
                return (
                  <button
                    key={index}
                    type="button"
                    onClick={() => handleAnswer(index)}
                    disabled={isAnswered}
                    className={`w-full rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${
                      !showResult
                        ? 'border border-gray-200 bg-white text-gray-800 hover:border-gray-400 hover:bg-white'
                        : isCorrectOption
                          ? 'border border-green-500 bg-green-50 font-medium text-green-900'
                          : isSelected
                            ? 'border border-red-400 bg-red-50 font-medium text-red-900'
                            : 'border border-transparent bg-white/60 text-gray-500'
                    } ${showResult ? 'cursor-default' : 'cursor-pointer'}`}
                  >
                    <span className="mr-1.5 font-semibold text-gray-500">
                      {String.fromCharCode(65 + index)}.
                    </span>
                    {option}
                  </button>
                );
              })}
            </div>

            {isAnswered && question.explanation && (
              <div className="mt-4 rounded-lg bg-white px-3 py-3 text-sm leading-relaxed text-gray-700 ring-1 ring-gray-200">
                {question.explanation}
              </div>
            )}

            <div className="mt-auto flex items-center justify-between gap-2 pt-4">
              <button
                type="button"
                disabled={questionIndex === 0}
                onClick={() => goToQuestion(questionIndex - 1)}
                className="inline-flex items-center gap-1 rounded-md border border-gray-200 bg-white px-2.5 py-1.5 text-xs font-semibold text-gray-700 transition hover:border-gray-400 hover:bg-gray-50 disabled:pointer-events-none disabled:opacity-40"
              >
                <ChevronLeft className="h-3.5 w-3.5" aria-hidden />
                Prev
              </button>
              {isAnswered && isCorrect && isLastQuestion && allAnswered ? (
                <span className="text-xs font-medium text-gray-500">All done</span>
              ) : (
                <span className="text-xs text-gray-400">
                  {isAnswered && isCorrect && !isLastQuestion ? 'Next question…' : ''}
                </span>
              )}
              <button
                type="button"
                disabled={questionIndex >= questions.length - 1}
                onClick={() => goToQuestion(questionIndex + 1)}
                className="inline-flex items-center gap-1 rounded-md border border-gray-200 bg-white px-2.5 py-1.5 text-xs font-semibold text-gray-700 transition hover:border-gray-400 hover:bg-gray-50 disabled:pointer-events-none disabled:opacity-40"
              >
                Next
                <ChevronRight className="h-3.5 w-3.5" aria-hidden />
              </button>
            </div>
              </>
            )}
          </div>
        </aside>
      )}
    </div>
  );
}
