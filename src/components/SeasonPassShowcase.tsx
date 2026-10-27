'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';

type CourseCardType = 'macro' | 'micro' | 'gov' | 'stats';

const COURSE_CONFIG: Record<
  CourseCardType,
  {
    badge: string;
    title: string;
    subtitle: string;
    price: number;
    originalPrice: number;
    validUntilLabel: string;
    theme: 'blue' | 'green' | 'violet' | 'orange';
    features: Array<{ text: string; key: string }>;
  }
> = {
  macro: {
    badge: 'AP MACRO SEASON PASS',
    title: 'Macroeconomics',
    subtitle: 'Everything you need to score a 5 in AP Macro.',
    price: 29,
    originalPrice: 39,
    validUntilLabel: 'Valid until June 30, 2027',
    theme: 'blue',
    features: [
      { text: 'Full Practice Exams based on 2027 AP Macro CED', key: 'Full Practice Exams' },
      { text: 'Endless AP-Style MCQ Bank', key: 'Endless' },
      { text: 'AI-Graded FRQs with Graphing Help', key: 'AI-Graded' },
      { text: 'Interactive Graphing Simulators', key: 'Interactive Graphing Simulators' },
      { text: 'Interactive Cheat Sheets + Downloadable PDFs', key: 'Interactive Cheat Sheets' },
      { text: 'Upload Notes to Create Quizzes', key: 'Upload Notes' },
    ],
  },
  micro: {
    badge: 'AP MICRO SEASON PASS',
    title: 'Microeconomics',
    subtitle: 'Everything you need to score a 5 in AP Micro.',
    price: 29,
    originalPrice: 39,
    validUntilLabel: 'Valid until June 30, 2027',
    theme: 'green',
    features: [
      { text: 'Full Practice Exams based on 2027 AP Micro CED', key: 'Full Practice Exams' },
      { text: 'Endless AP-Style MCQ Bank', key: 'Endless' },
      { text: 'AI-Graded FRQs with Graphing Help', key: 'AI-Graded' },
      { text: 'Interactive Graphing Simulators', key: 'Interactive Graphing Simulators' },
      { text: 'Interactive Cheat Sheets + Downloadable PDFs', key: 'Interactive Cheat Sheets' },
      { text: 'Upload Notes to Create Quizzes', key: 'Upload Notes' },
    ],
  },
  gov: {
    badge: 'AP GOV SEASON PASS',
    title: 'U.S. Government',
    subtitle: 'Everything you need to score a 5 in AP Gov.',
    price: 29,
    originalPrice: 39,
    validUntilLabel: 'Valid until June 30, 2027',
    theme: 'violet',
    features: [
      { text: 'Formal unit MCQ tests for all 5 units', key: 'Formal unit MCQ tests' },
      { text: 'SCOTUS comparison essay practice', key: 'SCOTUS comparison' },
      { text: 'Stimulus FRQ packs with scoring guides', key: 'Stimulus FRQ packs' },
      { text: 'Interactive unit cheat sheets', key: 'Interactive unit cheat sheets' },
      { text: 'Dojo AI tutor on every cheat sheet', key: 'Dojo AI tutor' },
    ],
  },
  stats: {
    badge: 'AP STATS SEASON PASS',
    title: 'Statistics',
    subtitle: 'Everything you need to score a 5 in AP Stats.',
    price: 29,
    originalPrice: 39,
    validUntilLabel: 'Valid until June 30, 2027',
    theme: 'orange',
    features: [
      { text: 'Formal unit MCQ tests for all 5 units', key: 'Formal unit MCQ tests' },
      { text: 'Unit FRQ packs with stimulus practice', key: 'Unit FRQ packs' },
      { text: 'TI-84 calculator drills', key: 'TI-84 calculator drills' },
      { text: 'Exam formula sheet on every unit', key: 'Exam formula sheet' },
      { text: 'Interactive unit cheat sheets', key: 'Interactive unit cheat sheets' },
    ],
  },
};

const BUNDLE = {
  price: 49,
};

const THEME_CLASSES = {
  blue: {
    accent: 'text-blue-600',
    badgeBg: 'bg-blue-600',
    buttonBg: 'bg-blue-600 hover:bg-blue-700',
  },
  green: {
    accent: 'text-green-600',
    badgeBg: 'bg-green-600',
    buttonBg: 'bg-green-600 hover:bg-green-700',
  },
  violet: {
    accent: 'text-violet-600',
    badgeBg: 'bg-violet-600',
    buttonBg: 'bg-violet-600 hover:bg-violet-700',
  },
  orange: {
    accent: 'text-orange-600',
    badgeBg: 'bg-orange-600',
    buttonBg: 'bg-orange-600 hover:bg-orange-700',
  },
} as const;

function SeasonPassCard({ courseType }: { courseType: CourseCardType }) {
  const config = COURSE_CONFIG[courseType];
  const theme = THEME_CLASSES[config.theme];

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-white border-4 border-black rounded-3xl shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] p-6 sm:p-8 h-full"
    >
      <div className="flex flex-col items-center text-center h-full">
        <span
          className={`inline-flex items-center justify-center px-4 py-2 ${theme.badgeBg} text-white font-bold text-xs uppercase tracking-wider border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rounded-lg`}
        >
          {config.badge}
        </span>

        <h3 className="mt-5 text-3xl sm:text-4xl font-black text-black leading-tight">
          AP <span className={theme.accent}>{config.title}</span>
        </h3>
        <p className="mt-3 text-base sm:text-lg text-gray-700 font-medium max-w-xl">
          {config.subtitle}
        </p>

        <div className="mt-6 flex items-end gap-3">
          <span className={`text-5xl sm:text-6xl font-black ${theme.accent}`}>${config.price}</span>
          <span className="text-lg text-gray-400 line-through">${config.originalPrice}</span>
        </div>
        <p className="mt-2 text-sm text-gray-600">{config.validUntilLabel}</p>

        <Link
          href={`/purchase/season-pass?courseType=${courseType}`}
          className={`mt-6 w-full inline-flex items-center justify-center gap-2 ${theme.buttonBg} text-white font-black text-lg py-5 rounded-2xl border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all hover:-translate-y-1`}
        >
          Get started <ArrowRight className="w-5 h-5" />
        </Link>

        <div className="mt-8 w-full text-left">
          <p className="text-base font-black text-black mb-4">Includes:</p>
          <ul className="space-y-3">
            {config.features.map((feature, idx) => {
              const parts = feature.text.split(feature.key);
              return (
                <li key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className={`w-5 h-5 mt-0.5 flex-shrink-0 ${theme.accent}`} />
                  <span className="text-sm sm:text-base font-semibold text-gray-900 leading-relaxed">
                    {parts[0]}
                    <strong>{feature.key}</strong>
                    {parts[1]}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </motion.div>
  );
}

const CARD_TYPES: CourseCardType[] = ['macro', 'micro', 'gov', 'stats'];

const slideVariants = {
  enter: (d: number) => ({ opacity: 0, x: d > 0 ? 80 : -80 }),
  center: { opacity: 1, x: 0 },
  exit: (d: number) => ({ opacity: 0, x: d > 0 ? -80 : 80 }),
};

function MobileSeasonPassCarousel() {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setDirection(1);
      setActive((i) => (i + 1) % CARD_TYPES.length);
    }, 4500);
  };

  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const goTo = (index: number) => {
    setDirection(index > active ? 1 : -1);
    setActive(index);
    startTimer();
  };

  return (
    <div className="lg:hidden">
      <div className="relative overflow-hidden">
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={active}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
          >
            <SeasonPassCard courseType={CARD_TYPES[active]} />
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="flex justify-center gap-2 mt-6">
        {CARD_TYPES.map((type, i) => (
          <button
            key={type}
            onClick={() => goTo(i)}
            className={`h-2 rounded-full transition-all duration-300 ${i === active ? 'w-6 bg-gray-900' : 'w-2 bg-gray-300'}`}
            aria-label={`View ${COURSE_CONFIG[type].title} pass`}
          />
        ))}
      </div>
    </div>
  );
}

function BundleBanner() {
  const savings = Math.max(0, COURSE_CONFIG.macro.price + COURSE_CONFIG.micro.price - BUNDLE.price);
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45 }}
      className="mt-10 bg-yellow-50 border-4 border-black rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
    >
      <div>
        <div className="flex items-center gap-2 mb-1">
          <Sparkles className="w-5 h-5 text-yellow-700" />
          <p className="text-lg sm:text-xl font-black text-black">
            Taking both econ exams? Save ${savings} with the Macro + Micro bundle.
          </p>
        </div>
        <p className="text-sm sm:text-base text-gray-700 font-medium">
          Get both econ passes together for ${BUNDLE.price}. Gov and Stats stay $29 each.
        </p>
      </div>
      <Link
        href="/purchase/bundle"
        className="inline-flex items-center justify-center gap-2 bg-white border-4 border-black rounded-xl px-5 py-3 font-black text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all hover:-translate-y-1 whitespace-nowrap"
      >
        View Bundle <ArrowRight className="w-5 h-5" />
      </Link>
    </motion.div>
  );
}

export function SeasonPassCourseChooser() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:py-16">
        <div className="text-center mb-10">
          <h1 className="text-4xl sm:text-5xl font-black text-gray-900">
            Choose your Season Pass
          </h1>
          <p className="mt-3 text-lg text-gray-600 font-medium">
            Macro, Micro, Gov, and Stats are $29 each. The Macro + Micro bundle is $49.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {CARD_TYPES.map((type) => (
            <SeasonPassCard key={type} courseType={type} />
          ))}
        </div>
        <BundleBanner />
      </div>
    </div>
  );
}

export function SeasonPassShowcase() {
  return (
    <div id="season-pass" className="w-full scroll-mt-24 pt-24 sm:pt-32 pb-8 sm:pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900">
            Four AP courses. Pick your <span className="text-blue-500">Season Pass</span>
          </h2>
          <p className="mt-4 text-lg sm:text-xl text-gray-600 font-medium">
            Macro, Micro, Gov, and Stats — $29 each through June 30, 2027.
          </p>
        </motion.div>

        <MobileSeasonPassCarousel />

        <div className="hidden lg:grid grid-cols-2 gap-8">
          {CARD_TYPES.map((type) => (
            <SeasonPassCard key={type} courseType={type} />
          ))}
        </div>

        <BundleBanner />
      </div>
    </div>
  );
}
