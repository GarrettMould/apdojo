'use client';

import type { ReactNode } from 'react';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { FRQFeedbackDemo } from '@/components/FRQFeedbackDemo';
import { MCQPracticePreview } from '@/components/MCQPracticePreview';
import { CheatSheetPreview } from '@/components/CheatSheetPreview';

const SLIDES = [
  { label: 'AI-Graded FRQs', component: <FRQFeedbackDemo /> },
  { label: 'Unlimited MCQ Practice', component: <MCQPracticePreview /> },
  { label: 'Unit Cheat Sheets', component: <div className="w-full flex min-h-[400px]"><CheatSheetPreview /></div> },
] as const;

function MobileFeatureCarousel({
  courseType,
  compact,
}: {
  courseType: string;
  compact?: boolean;
}) {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = (index: number) => {
    setDirection(index > active ? 1 : -1);
    setActive(index);
  };

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setDirection(1);
      setActive((i) => (i + 1) % SLIDES.length);
    }, 3500);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const variants = {
    enter: (d: number) => ({ opacity: 0, x: d > 0 ? 60 : -60 }),
    center: { opacity: 1, x: 0 },
    exit: (d: number) => ({ opacity: 0, x: d > 0 ? -60 : 60 }),
  };

  const minH = compact ? 'min-h-[380px]' : 'min-h-[420px]';

  return (
    <div className="lg:hidden w-full">
      <div className="text-center mb-4">
        <AnimatePresence mode="wait">
          <motion.h3
            key={active}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25 }}
            className={compact ? 'text-xl font-black text-gray-900' : 'text-2xl font-black text-gray-900'}
          >
            {SLIDES[active].label}
          </motion.h3>
        </AnimatePresence>
      </div>

      <div className={`relative overflow-hidden w-full ${minH}`}>
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={active}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="w-full"
          >
            {SLIDES[active].component}
          </motion.div>
        </AnimatePresence>
        <Link
          href={`/purchase/season-pass?courseType=${courseType}`}
          className="absolute inset-0 z-10 cursor-pointer"
          aria-label="Get the Season Pass"
        />
      </div>

      <div className="flex justify-center gap-2 mt-5">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => goTo(i)}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === active ? 'w-6 bg-gray-900' : 'w-2 bg-gray-300'
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

export type SeasonPassFeaturePreviewProps = {
  courseType: 'macro' | 'micro';
  /**
   * Shorter previews for wide modals (scaled-down demos in a fixed-height row).
   * Default matches the home hero.
   */
  variant?: 'hero' | 'compact';
};

/**
 * Logged-out hero previews: FRQ demo, MCQ preview, cheat sheet carousel — same as {@link HeroSection}.
 */
export function SeasonPassFeaturePreview({ courseType, variant = 'hero' }: SeasonPassFeaturePreviewProps) {
  const compact = variant === 'compact';

  if (compact) {
    const previewShell = (child: ReactNode) => (
      <div className="relative h-[260px] sm:h-[300px] lg:h-[320px] overflow-hidden rounded-2xl border-2 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        <div className="absolute left-1/2 top-0 w-[200%] max-w-none -translate-x-1/2 origin-top scale-[0.54] sm:scale-[0.58] lg:scale-[0.62] pointer-events-none">
          {child}
        </div>
        <Link
          href={`/purchase/season-pass?courseType=${courseType}`}
          className="absolute inset-0 z-10 cursor-pointer"
          aria-label="Get the Season Pass"
        />
      </div>
    );

    return (
      <div className="w-full">
        <MobileFeatureCarousel courseType={courseType} compact />

        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.08, delayChildren: 0.05 },
            },
          }}
          className="hidden lg:grid grid-cols-3 gap-5 w-full items-start"
        >
          <motion.div variants={cardVariants} className="min-w-0 flex flex-col gap-2">
            <h3 className="text-center text-xl font-black text-gray-900">AI-Graded FRQs</h3>
            {previewShell(<FRQFeedbackDemo />)}
          </motion.div>
          <motion.div variants={cardVariants} className="min-w-0 flex flex-col gap-2">
            <h3 className="text-center text-xl font-black text-gray-900">Unlimited MCQ Practice</h3>
            {previewShell(<MCQPracticePreview />)}
          </motion.div>
          <motion.div variants={cardVariants} className="min-w-0 flex flex-col gap-2">
            <h3 className="text-center text-xl font-black text-gray-900">Unit Cheat Sheets</h3>
            {previewShell(
              <div className="w-full flex min-h-[400px]">
                <CheatSheetPreview />
              </div>
            )}
          </motion.div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <MobileFeatureCarousel courseType={courseType} />

      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15, delayChildren: 0.1 },
          },
        }}
        className="hidden lg:grid grid-cols-3 gap-8 w-full mx-auto items-stretch"
      >
        <motion.div variants={cardVariants} className="col-span-1 flex">
          <div className="w-full flex flex-col">
            <div className="text-center mb-4">
              <h3 className="text-2xl sm:text-3xl font-black text-gray-900">AI-Graded FRQs</h3>
            </div>
            <div className="w-full flex relative">
              <FRQFeedbackDemo />
              <Link
                href={`/purchase/season-pass?courseType=${courseType}`}
                className="absolute inset-0 z-10 cursor-pointer"
                aria-label="Get the Season Pass"
              />
            </div>
          </div>
        </motion.div>

        <motion.div variants={cardVariants} className="col-span-1 flex">
          <div className="w-full flex flex-col">
            <div className="text-center mb-4">
              <h3 className="text-2xl sm:text-3xl font-black text-gray-900">Unlimited MCQ Practice</h3>
            </div>
            <div className="w-full flex relative">
              <MCQPracticePreview />
              <Link
                href={`/purchase/season-pass?courseType=${courseType}`}
                className="absolute inset-0 z-10 cursor-pointer"
                aria-label="Get the Season Pass"
              />
            </div>
          </div>
        </motion.div>

        <motion.div variants={cardVariants} className="col-span-1 flex min-w-0">
          <div className="w-full flex flex-col min-h-[400px]">
            <div className="text-center mb-4">
              <h3 className="text-2xl sm:text-3xl font-black text-gray-900">Unit Cheat Sheets</h3>
            </div>
            <div className="flex-1 min-h-0 w-full flex relative">
              <CheatSheetPreview />
              <Link
                href={`/purchase/season-pass?courseType=${courseType}`}
                className="absolute inset-0 z-10 cursor-pointer"
                aria-label="Get the Season Pass"
              />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
