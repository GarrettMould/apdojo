'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Star } from 'lucide-react';
import { useAuthContext } from '@/contexts/AuthContext';
import { MCQPracticePreview } from '@/components/MCQPracticePreview';
import { CheatSheetPreview } from '@/components/CheatSheetPreview';
import { FRQFeedbackDemo } from '@/components/FRQFeedbackDemo';

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

const SLIDES = [
  { label: 'Unlimited MCQ Practice', component: <MCQPracticePreview /> },
  { label: 'AI-Graded FRQs', component: <FRQFeedbackDemo /> },
  { label: 'Unit Cheat Sheets', component: <div className="w-full flex min-h-[400px]"><CheatSheetPreview /></div> },
];

const slideVariants = {
  enter: (d: number) => ({ opacity: 0, x: d > 0 ? 60 : -60 }),
  center: { opacity: 1, x: 0 },
  exit: (d: number) => ({ opacity: 0, x: d > 0 ? -60 : 60 }),
};

export function HeroSection() {
  const { selectedSubject } = useAuthContext();
  const [mounted, setMounted] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const pdfCardRef = useRef<HTMLDivElement>(null);
  const [pdfScale, setPdfScale] = useState(0.77);
  const [activeSlide, setActiveSlide] = useState(0);
  const [slideDir, setSlideDir] = useState(1);
  const slideTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    setMounted(true);
    const target = EXAM_DATES[selectedSubject] ?? EXAM_DATES.macro;
    setTimeLeft(getTimeLeft(target));
    const id = setInterval(() => setTimeLeft(getTimeLeft(target)), 1000);
    return () => clearInterval(id);
  }, [selectedSubject]);

  useEffect(() => {
    const update = () => {
      if (pdfCardRef.current) {
        setPdfScale(pdfCardRef.current.offsetWidth / 833);
      }
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  useEffect(() => {
    slideTimerRef.current = setInterval(() => {
      setSlideDir(1);
      setActiveSlide(i => (i + 1) % SLIDES.length);
    }, 3500);
    return () => { if (slideTimerRef.current) clearInterval(slideTimerRef.current); };
  }, []);

  const goToSlide = (index: number) => {
    setSlideDir(index > activeSlide ? 1 : -1);
    setActiveSlide(index);
    if (slideTimerRef.current) clearInterval(slideTimerRef.current);
    slideTimerRef.current = setInterval(() => {
      setSlideDir(1);
      setActiveSlide(i => (i + 1) % SLIDES.length);
    }, 3500);
  };

  const pad = (n: number) => String(n).padStart(2, '0');
  const isMicro = mounted && selectedSubject === 'micro';
  const subject = mounted ? (selectedSubject === 'micro' ? 'Micro' : 'Macro') : 'Macro';
  const accentClass = isMicro ? 'text-green-500' : 'text-blue-500';
  const btnClass = isMicro ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700';

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  return (
    <section className="relative flex flex-col justify-center pt-14 pb-10 sm:pt-16 sm:pb-16 lg:min-h-screen lg:pt-24 lg:pb-56 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      <div className="max-w-screen-xl mx-auto w-full">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col lg:flex-row items-center gap-10 lg:gap-8"
        >

          {/* ── LEFT: text + CTA ── */}
          <div className="w-full lg:w-[46%] flex flex-col items-center text-center lg:items-start lg:text-left gap-9">

            {/* Countdown */}
            <motion.div variants={itemVariants} className="flex flex-col items-center lg:items-start gap-2">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">
                AP <span className={accentClass}>{subject}</span> Exam In
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
              className="text-5xl sm:text-6xl lg:text-8xl font-black text-gray-900 leading-[1.05] tracking-tight"
            >
              Score a 5 on<br />AP Econ.
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              variants={itemVariants}
              className="text-xl sm:text-2xl text-gray-600 font-medium leading-relaxed max-w-lg mx-auto lg:mx-0"
            >
              Full practice exams, unlimited MCQ practice, AI-graded FRQs, printable cheat sheets, and more — all for $29.
            </motion.p>

            {/* CTA + social proof */}
            <motion.div variants={itemVariants} className="flex flex-col items-center lg:items-start gap-6 w-full">
              <Button
                asChild
                size="lg"
                className={`w-full sm:w-auto text-lg font-black py-7 px-10 rounded-2xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all hover:-translate-y-0.5 text-white ${btnClass}`}
              >
                <Link href="/purchase/season-pass">
                  Get the Season Pass — $29
                </Link>
              </Button>

              <div className="flex items-center gap-2 flex-wrap justify-center lg:justify-start">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-sm font-semibold text-gray-600">1,000+ students helped</p>
                <Link
                  href="/purchase/season-pass"
                  className="text-xs font-semibold text-blue-600 hover:text-blue-800 underline underline-offset-2"
                >
                  See reviews →
                </Link>
              </div>
            </motion.div>
          </div>

          {/* ── MOBILE ONLY: auto-rotating feature carousel ── */}
          <motion.div variants={itemVariants} className="lg:hidden w-full mt-4">
            {/* Slide label */}
            <div className="text-center mb-4 h-8 flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.h3
                  key={activeSlide}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.25 }}
                  className="text-xl font-black text-gray-900"
                >
                  {SLIDES[activeSlide].label}
                </motion.h3>
              </AnimatePresence>
            </div>

            {/* Slide content */}
            <div className="relative overflow-hidden w-full min-h-[400px]">
              <AnimatePresence custom={slideDir} mode="wait">
                <motion.div
                  key={activeSlide}
                  custom={slideDir}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] as const }}
                  className="w-full"
                >
                  {SLIDES[activeSlide].component}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Dot navigation */}
            <div className="flex justify-center gap-2 mt-5">
              {SLIDES.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => goToSlide(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${i === activeSlide ? 'w-6 bg-gray-900' : 'w-2 bg-gray-300'}`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </motion.div>

          {/* ── RIGHT (desktop only): large cheat sheet + two floating cards ── */}
          <motion.div
            variants={itemVariants}
            className="hidden lg:block lg:w-[54%] flex-shrink-0 relative"
            style={{ height: 500 }}
          >

            {/* Large base card — full-width PDF, top quarter visible */}
            <div
              ref={pdfCardRef}
              className="absolute rounded-2xl border-2 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden"
              style={{ top: 44, left: 20, right: 20, height: 420 }}
            >
              <iframe
                src={`https://apdojowhiteboards.s3.ap-southeast-2.amazonaws.com/pdfs/AP+${isMicro ? 'Micro' : 'Macro'}+-+Unit+1.pdf#toolbar=0&navpanes=0&scrollbar=0`}
                title="Cheat sheet preview"
                className="absolute top-0 left-0 pointer-events-none select-none border-none"
                style={{
                  width: '833px',
                  height: '1080px',
                  transform: `scale(${pdfScale})`,
                  transformOrigin: 'top left',
                }}
              />
            </div>

            {/* Floating card — MCQ Practice (top-right) */}
            <div
              className="absolute rounded-2xl border-2 border-black bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-3.5"
              style={{ top: 0, right: 0, width: 242, zIndex: 20 }}
            >
              <p className="text-[8px] font-black uppercase tracking-widest text-gray-400 mb-2">AP MCQ Practice</p>
              <p className="text-[11px] font-bold text-gray-900 leading-snug mb-2.5">
                "In a competitive market, equilibrium is achieved when..."
              </p>
              <div className="space-y-1.5">
                {[
                  { letter: 'A', text: 'There is a surplus of the good', correct: false },
                  { letter: 'B', text: 'Qty supplied = qty demanded', correct: true },
                  { letter: 'C', text: 'Price is set by the government', correct: false },
                ].map(({ letter, text, correct }) => (
                  <div
                    key={letter}
                    className={`flex items-center gap-2 px-2 py-1.5 rounded-lg border text-[9px] font-semibold ${
                      correct ? 'bg-green-50 border-green-400 text-green-800' : 'border-gray-100 text-gray-500'
                    }`}
                  >
                    <span className={`w-4 h-4 rounded-full border flex items-center justify-center text-[7px] font-black flex-shrink-0 ${correct ? 'bg-green-500 border-green-500 text-white' : 'border-gray-300 text-gray-400'}`}>
                      {letter}
                    </span>
                    {text}
                  </div>
                ))}
              </div>
            </div>

            {/* Floating card — AI FRQ Feedback (bottom-left) */}
            <div
              className="absolute rounded-2xl border-2 border-black bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-3.5"
              style={{ bottom: 0, left: 0, width: 250, zIndex: 20 }}
            >
              <div className="flex items-center justify-between mb-2">
                <p className="text-[8px] font-black uppercase tracking-widest text-gray-400">AI FRQ Feedback</p>
                <span className="text-[8px] font-black bg-green-100 text-green-700 border border-green-300 px-2 py-0.5 rounded-full">
                  1 / 1 pts
                </span>
              </div>
              <div className="text-[10px] text-gray-700 font-medium leading-snug bg-gray-50 rounded-xl p-2.5 border border-gray-100">
                <span className="text-green-600 font-black">✓ Correct.</span> You identified that decreasing the IOR rate increases the money supply and lowers interest rates — consistent with expansionary monetary policy.
              </div>
            </div>

          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}
