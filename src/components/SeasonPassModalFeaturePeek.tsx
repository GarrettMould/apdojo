'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { FRQFeedbackDemo } from '@/components/FRQFeedbackDemo';
import { MCQPracticePreview } from '@/components/MCQPracticePreview';
import { CheatSheetPreview } from '@/components/CheatSheetPreview';
import { cn } from '@/lib/utils';

const ROTATE_MS = 4000;

const SLIDES = [
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
] as const;

type SeasonPassModalFeaturePeekProps = {
  courseType: 'macro' | 'micro';
  /** When placed in a flex/grid column, pass `min-h-0 flex-1` so the peek grows to match sibling column height. */
  className?: string;
};

/**
 * One preview at a time, full column width (cards keep their own borders). Vertical window shows a readable slice with a soft fade.
 */
export function SeasonPassModalFeaturePeek({ courseType, className }: SeasonPassModalFeaturePeekProps) {
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
    }, ROTATE_MS);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const variants = {
    enter: (d: number) => ({ opacity: 0, x: d > 0 ? 40 : -40 }),
    center: { opacity: 1, x: 0 },
    exit: (d: number) => ({ opacity: 0, x: d > 0 ? -40 : 40 }),
  };

  return (
    <div
      className={cn(
        'flex w-full min-h-0 flex-col',
        // In the modal’s two-column row, grow to fill the stretched grid cell so preview matches left column height.
        'lg:h-full lg:min-h-0',
        className
      )}
    >
      <div className="mb-3 shrink-0 text-center">
        <AnimatePresence mode="wait">
          <motion.h3
            key={active}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
            className="text-lg font-black text-gray-900 sm:text-xl"
          >
            {SLIDES[active].label}
          </motion.h3>
        </AnimatePresence>
      </div>

      <div className="relative min-h-0 w-full flex-1 lg:min-h-[12rem]">
        <div className="absolute inset-0 overflow-hidden bg-transparent">
          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={active}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="w-full min-w-0"
            >
              {SLIDES[active].component}
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
        <Link
          href={`/purchase/season-pass?courseType=${courseType}`}
          className="absolute inset-0 z-10 cursor-pointer"
          aria-label="Get the Season Pass"
        />
      </div>

      <div className="mt-4 flex shrink-0 justify-center gap-2">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => goTo(i)}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === active ? 'w-6 bg-gray-900' : 'w-2 bg-gray-300'
            }`}
            aria-label={`Show ${SLIDES[i].label}`}
            aria-current={i === active ? 'true' : undefined}
          />
        ))}
      </div>
    </div>
  );
}
