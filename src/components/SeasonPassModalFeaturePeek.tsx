'use client';

import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { HeroCheatSheetPreview } from '@/components/HeroCheatSheetPreview';
import { motion, AnimatePresence } from 'framer-motion';
import { FRQFeedbackDemo } from '@/components/FRQFeedbackDemo';
import { MCQPracticePreview } from '@/components/MCQPracticePreview';
import { CheatSheetPreview } from '@/components/CheatSheetPreview';
import { cn } from '@/lib/utils';
import { getLoggedOutHeroConfig } from '@/data/loggedOutHeroConfig';
import type { CourseSubject } from '@/lib/courseSubject';

const ROTATE_MS = 4000;

type PeekSlide = { label: string; component: ReactNode };

const ECON_SLIDES: PeekSlide[] = [
  { label: 'AI-Graded FRQs', component: <FRQFeedbackDemo /> },
  { label: 'Unlimited MCQ Practice', component: <MCQPracticePreview /> },
  {
    label: 'Unit Cheat Sheets',
    component: (
      <div className="flex w-full min-h-0">
        <CheatSheetPreview />
      </div>
    ),
  },
];

/**
 * Homepage-style showcase: cheat sheet base + MCQ + FRQ cards layered on top.
 */
function FeatureStackShowcase({ courseType }: { courseType: 'gov' | 'stats' }) {
  const config = getLoggedOutHeroConfig(courseType);
  const { theme } = config;

  return (
    <div className="relative w-full pointer-events-none select-none">
      <div className="relative ml-3.5 mr-2">
        <div className="relative overflow-hidden rounded-2xl border-2 border-black bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] aspect-[833/1140]">
          {config.cheatSheetPreviewSrc ? (
            <>
              <HeroCheatSheetPreview
                src={config.cheatSheetPreviewSrc}
                alt={config.cheatSheetPreviewAlt}
              />
              <div
                className="pointer-events-none absolute inset-x-0 bottom-0 h-[18%]"
                style={{
                  background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.92))',
                }}
              />
            </>
          ) : null}
        </div>

        {/* Feature cards — hug bottom-left corner of cheat sheet */}
        <div
          className="absolute bottom-0 left-0 z-20 w-[min(13.75rem,78%)]"
          style={{ height: '7.75rem' }}
        >
          {/* Back card: Unit MCQ */}
          <div
            className="absolute bottom-0 left-0 w-full rounded-xl border-2 border-black bg-white p-2.5 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]"
            style={{ transform: 'translate(-6px, -10px) rotate(-3deg)', transformOrigin: 'bottom left', zIndex: 1 }}
          >
            <p className="mb-1 text-[7px] font-black uppercase tracking-widest text-gray-400">
              Unit MCQ Test
            </p>
            <p className="mb-1.5 line-clamp-2 text-[10px] font-bold leading-snug text-gray-900">
              {config.mcqPreview.question}
            </p>
            <div className="space-y-1">
              {config.mcqPreview.options.slice(0, 2).map(({ letter, text, correct }) => (
                <div
                  key={letter}
                  className={`flex items-center gap-1.5 rounded-md border px-1.5 py-1 text-[8px] font-semibold ${
                    correct ? theme.mcqCorrectClass : 'border-gray-100 text-gray-500'
                  }`}
                >
                  <span
                    className={`flex h-3.5 w-3.5 flex-shrink-0 items-center justify-center rounded-full border text-[6px] font-black ${
                      correct ? theme.mcqCorrectBadgeClass : 'border-gray-300 text-gray-400'
                    }`}
                  >
                    {letter}
                  </span>
                  <span className="line-clamp-1">{text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Front card: FRQ / SCOTUS */}
          <div
            className="absolute bottom-0 left-0 w-full rounded-xl border-2 border-black bg-white p-2.5 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]"
            style={{ transform: 'translate(4px, 0) rotate(2deg)', transformOrigin: 'bottom left', zIndex: 2 }}
          >
            <div className="mb-1.5 flex items-center justify-between gap-2">
              <p className="text-[7px] font-black uppercase tracking-widest text-gray-400">
                {config.frqPreview.label}
              </p>
              <span className="rounded-full border border-green-300 bg-green-100 px-1.5 py-0.5 text-[7px] font-black text-green-700">
                {config.frqPreview.score}
              </span>
            </div>
            <div className="line-clamp-3 rounded-lg border border-gray-100 bg-gray-50 p-2 text-[9px] font-medium leading-snug text-gray-700">
              {config.frqPreview.feedback}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

type SeasonPassModalFeaturePeekProps = {
  courseType: CourseSubject;
  /** When placed in a flex/grid column, pass `min-h-0 flex-1` so the peek grows to match sibling column height. */
  className?: string;
};

/**
 * Econ: rotating one-at-a-time peeks.
 * Gov/Stats: homepage-style stack — cheat sheet + MCQ + FRQ all visible together.
 */
export function SeasonPassModalFeaturePeek({ courseType, className }: SeasonPassModalFeaturePeekProps) {
  const isStacked = courseType === 'gov' || courseType === 'stats';
  const slides = useMemo(() => ECON_SLIDES, []);
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = (index: number) => {
    setDirection(index > active ? 1 : -1);
    setActive(index);
  };

  useEffect(() => {
    if (isStacked) return;
    setActive(0);
  }, [courseType, isStacked]);

  useEffect(() => {
    if (isStacked) return;
    timerRef.current = setInterval(() => {
      setDirection(1);
      setActive((i) => (i + 1) % slides.length);
    }, ROTATE_MS);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [slides.length, courseType, isStacked]);

  if (isStacked) {
    return (
      <div className={cn('w-full', className)}>
        <FeatureStackShowcase courseType={courseType} />
      </div>
    );
  }

  const variants = {
    enter: (d: number) => ({ opacity: 0, x: d > 0 ? 40 : -40 }),
    center: { opacity: 1, x: 0 },
    exit: (d: number) => ({ opacity: 0, x: d > 0 ? -40 : 40 }),
  };

  return (
    <div className={cn('flex w-full min-h-0 flex-col lg:h-full lg:min-h-0', className)}>
      <div className="mb-3 shrink-0 text-center">
        <AnimatePresence mode="wait">
          <motion.h3
            key={`${courseType}-${active}`}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
            className="text-lg font-black text-gray-900 sm:text-xl"
          >
            {slides[active]?.label}
          </motion.h3>
        </AnimatePresence>
      </div>

      <div className="relative min-h-0 w-full flex-1 lg:min-h-[12rem]">
        <div className="absolute inset-0 overflow-hidden bg-transparent pointer-events-none select-none">
          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={`${courseType}-${active}`}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="w-full min-w-0"
            >
              {slides[active]?.component}
            </motion.div>
          </AnimatePresence>
          <div
            className="pointer-events-none absolute bottom-0 left-0 right-0 z-[1]"
            style={{
              height: '36%',
              background: 'linear-gradient(to bottom, transparent, rgba(249,250,251,0.98))',
            }}
          />
        </div>
      </div>

      <div className="mt-4 flex shrink-0 justify-center gap-2">
        {slides.map((slide, i) => (
          <button
            key={slide.label}
            type="button"
            onClick={() => goTo(i)}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === active ? 'w-6 bg-gray-900' : 'w-2 bg-gray-300'
            }`}
            aria-label={`Show ${slide.label}`}
            aria-current={i === active ? 'true' : undefined}
          />
        ))}
      </div>
    </div>
  );
}
