'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { FRQFeedbackDemo } from '@/components/FRQFeedbackDemo';
import { MCQPracticePreview } from '@/components/MCQPracticePreview';
import { CheatSheetPreview } from '@/components/CheatSheetPreview';
import { Star } from 'lucide-react';
import { useAuthContext } from '@/contexts/AuthContext';

const EXAM_DATES = {
  micro: new Date('2026-05-04T12:00:00'),
  macro: new Date('2026-05-08T12:00:00'),
};

function getTimeLeft(target: Date) {
  const diff = target.getTime() - Date.now();
  return {
    days: Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24))),
    hours: Math.max(0, Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))),
    minutes: Math.max(0, Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))),
    seconds: Math.max(0, Math.floor((diff % (1000 * 60)) / 1000)),
  };
}

export function HeroSection() {
  const { selectedSubject } = useAuthContext();
  const [mounted, setMounted] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    setMounted(true);
    const target = EXAM_DATES[selectedSubject] ?? EXAM_DATES.macro;
    setTimeLeft(getTimeLeft(target));
    const id = setInterval(() => setTimeLeft(getTimeLeft(target)), 1000);
    return () => clearInterval(id);
  }, [selectedSubject]);

  const pad = (n: number) => String(n).padStart(2, '0');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

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

  return (
    <section className="relative pt-10 pb-24 sm:pt-12 sm:pb-32 lg:pt-14 lg:pb-36 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">


      <div className="max-w-screen-2xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center"
        >
          {/* Countdown — centered */}
          <motion.div variants={itemVariants} className="flex flex-col items-center gap-2 mb-10">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">
              AP{' '}
              <span className={mounted && selectedSubject === 'micro' ? 'text-green-500' : 'text-blue-500'}>
                {mounted ? (selectedSubject === 'micro' ? 'Micro' : 'Macro') : 'Macro'}
              </span>
              {' '}Exam In
            </p>
            <div className="flex items-start gap-2">
              {[
                { value: mounted ? timeLeft.days : 0, label: 'Days' },
                { value: mounted ? timeLeft.hours : 0, label: 'Hrs' },
                { value: mounted ? timeLeft.minutes : 0, label: 'Min' },
                { value: mounted ? timeLeft.seconds : 0, label: 'Sec' },
              ].map(({ value, label }, i) => (
                <div key={label} className="flex items-start gap-2">
                  <div className="flex flex-col items-center">
                    <div className="bg-gray-900 text-white border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center">
                      <span className="text-xl sm:text-2xl font-black tabular-nums leading-none">
                        {pad(value)}
                      </span>
                    </div>
                    <span className="text-[9px] font-bold text-gray-400 mt-1.5 uppercase tracking-wide">
                      {label}
                    </span>
                  </div>
                  {i < 3 && (
                    <span className="text-xl font-black text-gray-300 mt-2 select-none">:</span>
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={itemVariants}
            className="text-6xl sm:text-7xl lg:text-8xl font-black text-gray-900 mb-6 leading-[1.05] tracking-tight"
          >
            Score a 5 on AP Econ.
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={itemVariants}
            className="text-xl sm:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto font-medium leading-relaxed"
          >
            Full AP practice tests, unlimited MCQ practice, AI-graded FRQs, interactive cheat sheets, and more. All for $29.
          </motion.p>

          {/* Main CTA */}
          <motion.div
            variants={itemVariants}
            className="mb-20"
          >
            <div className="flex flex-col items-center gap-8">
              <Button
                asChild
                size="lg"
                className="text-xl sm:text-2xl font-black py-8 px-10 sm:px-16 rounded-2xl border-4 border-black shadow-[7px_7px_0px_0px_rgba(0,0,0,1)] hover:shadow-[9px_9px_0px_0px_rgba(0,0,0,1)] transition-all hover:-translate-y-1 bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Link href="/purchase/season-pass">
                  Get the Season Pass
                </Link>
              </Button>

              {/* Social proof */}
              <div className="flex flex-col items-center gap-1.5">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-sm font-semibold text-gray-600">
                  1,000+ students helped
                </p>
                <Link
                  href="/purchase/season-pass"
                  className="text-xs font-semibold text-blue-600 hover:text-blue-800 underline underline-offset-2"
                >
                  See what students have to say →
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Three Feature Containers Grid */}
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 w-full mx-auto items-stretch"
          >
            {/* 1. AI-Graded FRQs */}
            <motion.div
              variants={cardVariants}
              className="lg:col-span-1 flex"
            >
              <div className="w-full flex flex-col">
                <div className="text-center mb-4">
                  <h3 className="text-2xl sm:text-3xl font-black text-gray-900">
                    AI-Graded FRQs
                  </h3>
                </div>
                <div className="scale-90 lg:scale-100 origin-center w-full flex">
                  <FRQFeedbackDemo />
                </div>
              </div>
            </motion.div>

            {/* 2. MCQ Practice Preview */}
            <motion.div
              variants={cardVariants}
              className="lg:col-span-1 flex"
            >
              <div className="w-full flex flex-col">
                <div className="text-center mb-4">
                  <h3 className="text-2xl sm:text-3xl font-black text-gray-900">
                    Unlimited MCQ Practice
                  </h3>
                </div>
                <MCQPracticePreview />
              </div>
            </motion.div>

            {/* 3. Unit Cheat Sheets */}
            <motion.div
              variants={cardVariants}
              className="lg:col-span-1 flex min-w-0"
            >
              <div className="w-full flex flex-col min-h-[400px]">
                <div className="text-center mb-4">
                  <h3 className="text-2xl sm:text-3xl font-black text-gray-900">
                    Unit Cheat Sheets
                  </h3>
                </div>
                <div className="flex-1 min-h-0 w-full flex scale-90 lg:scale-100 origin-center">
                  <CheatSheetPreview />
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
