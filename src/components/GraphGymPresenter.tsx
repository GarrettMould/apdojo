'use client';

import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Eye, EyeOff, Timer, ChevronUp, ChevronDown, Play, Pause } from 'lucide-react';
import Image from 'next/image';

function formatTime(totalSeconds: number): string {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

export interface GraphGymPresenterScenario {
  /** Main prompt text (e.g. graph instruction) */
  prompt: string;
  /** Optional sub-prompt or conditions shown below in smaller text */
  subPrompt?: string;
  /** Optional URL for the sample answer image (shown on flip) */
  answerImageUrl?: string;
}

interface GraphGymPresenterProps {
  scenarios: GraphGymPresenterScenario[];
}

export default function GraphGymPresenter({ scenarios }: GraphGymPresenterProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [showTimer, setShowTimer] = useState(false);
  const [presetMinutes, setPresetMinutes] = useState(5);
  const [remainingSeconds, setRemainingSeconds] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  const total = scenarios.length;
  const current = scenarios[currentIndex];
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === total - 1;
  const hasAnswerImage = Boolean(current?.answerImageUrl);

  // Countdown tick
  useEffect(() => {
    if (!isTimerRunning || remainingSeconds <= 0) return;
    const id = setInterval(() => {
      setRemainingSeconds((prev) => {
        if (prev <= 1) {
          setIsTimerRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [isTimerRunning, remainingSeconds]);

  const startTimer = useCallback(() => {
    const total = presetMinutes * 60;
    setRemainingSeconds(total);
    setIsTimerRunning(true);
  }, [presetMinutes]);

  const pauseTimer = useCallback(() => {
    setIsTimerRunning(false);
  }, []);

  const resumeTimer = useCallback(() => {
    if (remainingSeconds > 0) setIsTimerRunning(true);
  }, [remainingSeconds]);

  const clearAndHideTimer = useCallback(() => {
    setShowTimer(false);
    setRemainingSeconds(0);
    setIsTimerRunning(false);
  }, []);

  const isTimerActive = showTimer && remainingSeconds > 0; // running or paused
  const isTimerPaused = isTimerActive && !isTimerRunning;

  // Reset flip when changing scenario
  useEffect(() => {
    setIsFlipped(false);
  }, [currentIndex]);

  const goPrevious = () => {
    if (!isFirst) setCurrentIndex((i) => i - 1);
  };

  const goNext = () => {
    if (!isLast) setCurrentIndex((i) => i + 1);
  };

  if (total === 0) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-8">
        <p className="text-xl text-slate-500">No scenarios to display.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 md:p-8">
      <div className="w-full max-w-7xl flex flex-col flex-1 min-h-0 max-h-[90vh]">
        {/* Digital whiteboard card */}
        <div className="relative bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col flex-1 min-h-[480px] aspect-[16/9] max-h-[calc(90vh-8rem)]">
          {/* Timer – compact strip in top right (clock icon always farthest right) */}
          <div className="absolute top-4 right-4 z-40 flex items-center gap-2">
            {showTimer && (
              <>
                {!isTimerActive ? (
                  <>
                    <span className="text-xl font-bold text-slate-900 tabular-nums min-w-[3.5rem]">
                      {formatTime(presetMinutes * 60)}
                    </span>
                    <button
                      type="button"
                      onClick={() => setPresetMinutes((m) => Math.min(99, m + 1))}
                      className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 transition-colors"
                      aria-label="Increase minutes"
                    >
                      <ChevronUp className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setPresetMinutes((m) => Math.max(0, m - 1))}
                      className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 transition-colors"
                      aria-label="Decrease minutes"
                    >
                      <ChevronDown className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={startTimer}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800 transition-colors"
                    >
                      <Play className="w-4 h-4" />
                      Start
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    onClick={isTimerPaused ? resumeTimer : pauseTimer}
                    className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 hover:border-slate-300 transition-colors"
                    aria-label={isTimerPaused ? 'Resume timer' : 'Pause timer'}
                  >
                    {isTimerPaused ? (
                      <Play className="w-4 h-4" />
                    ) : (
                      <Pause className="w-4 h-4" />
                    )}
                  </button>
                )}
              </>
            )}
            <button
              type="button"
              onClick={() => (showTimer ? clearAndHideTimer() : setShowTimer(true))}
              className={`p-2 rounded-lg border transition-colors ${
                showTimer
                  ? 'bg-slate-900 text-white border-slate-900'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:border-slate-300'
              }`}
              aria-label={showTimer ? 'Clear and hide timer' : 'Show timer'}
            >
              <Timer className="w-5 h-5" />
            </button>
          </div>

          {/* Content area – flip card: front = prompt, back = sample answer image */}
          <div className="flex-1 min-h-0 p-8 md:p-12 flex items-center justify-center overflow-hidden">
            <div
              key={currentIndex}
              className="w-full h-full min-h-[320px] max-w-4xl mx-auto [perspective:1200px]"
            >
              <div
                className="relative w-full h-full transition-transform duration-500 [transform-style:preserve-3d]"
                style={{ transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
              >
                {/* Front – scenario prompt (timer on line above main text when active) */}
                <div className="absolute inset-0 [backface-visibility:hidden] flex flex-col items-center justify-center text-center">
                  {isTimerActive && (
                    <p className="text-6xl md:text-7xl font-black text-slate-900 tabular-nums tracking-wider mb-8">
                      {formatTime(remainingSeconds)}
                    </p>
                  )}
                  <p className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight animate-in fade-in duration-300">
                    {current.prompt}
                  </p>
                  {current.subPrompt && (
                    <p className="mt-6 text-2xl text-slate-500 max-w-4xl mx-auto">
                      {current.subPrompt}
                    </p>
                  )}
                  {hasAnswerImage && (
                    <button
                      type="button"
                      onClick={() => setIsFlipped(true)}
                      className="mt-10 inline-flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-slate-300 text-slate-700 font-semibold hover:bg-slate-100 hover:border-slate-400 transition-colors"
                    >
                      <Eye className="w-5 h-5" />
                      Reveal answer
                    </button>
                  )}
                </div>

                {/* Back – sample answer image */}
                <div
                  className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] flex flex-col items-center justify-center bg-slate-50 rounded-2xl overflow-hidden"
                  style={{ minHeight: '320px' }}
                >
                  {current.answerImageUrl && (
                    <div className="relative w-full flex-1 min-h-[280px] p-4">
                      <Image
                        src={current.answerImageUrl}
                        alt="Sample answer"
                        fill
                        className="object-contain"
                        sizes="(max-width: 1024px) 100vw, 896px"
                      />
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={() => setIsFlipped(false)}
                    className="absolute bottom-4 right-4 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800 text-white text-sm font-semibold hover:bg-slate-700 transition-colors z-10"
                  >
                    <EyeOff className="w-4 h-4" />
                    Hide answer
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Footer – navigation */}
          <div className="flex-shrink-0 p-8 border-t border-slate-200 flex items-center justify-between gap-4">
            <button
              type="button"
              onClick={goPrevious}
              disabled={isFirst}
              className="flex items-center gap-2 text-slate-500 hover:text-slate-900 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:text-slate-500 transition-colors"
              aria-label="Previous scenario"
            >
              <ChevronLeft className="w-6 h-6" />
              <span className="font-semibold">Previous</span>
            </button>

            <span className="text-slate-500 font-medium tabular-nums">
              Scenario {currentIndex + 1} of {total}
            </span>

            <button
              type="button"
              onClick={goNext}
              className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-8 py-4 rounded-xl font-bold transition-colors"
              aria-label={isLast ? 'Finish session' : 'Next scenario'}
            >
              {isLast ? (
                'Finish Session'
              ) : (
                <>
                  <span>Next Scenario</span>
                  <ChevronRight className="w-6 h-6" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
