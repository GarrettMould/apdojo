'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, ArrowRight, Sparkles, ShieldCheck, GraduationCap, CalendarCheck, Lightbulb } from 'lucide-react';
import { TutoringCallout } from '@/components/tutoring/TutoringCallout';
import { FEATURES } from '@/lib/featureFlags';

type CourseCardType = 'macro' | 'micro' | 'gov' | 'stats';

/** Same three rows on every card so the passes compare like for like. */
type IncludedRow = { label: 'Tests' | 'FRQs and essays' | 'Study tools'; text: string };

const SEASON_LABEL = 'Covers the May 2027 AP exams. Access through June 30, 2027.';

const COURSE_CONFIG: Record<
  CourseCardType,
  {
    badge: string;
    title: string;
    subtitle: string;
    price: number;
    originalPrice: number;
    theme: 'blue' | 'green' | 'violet' | 'orange';
    included: IncludedRow[];
  }
> = {
  macro: {
    badge: 'AP MACRO SEASON PASS',
    title: 'Macroeconomics',
    subtitle: 'Everything you need to score a 5 in AP Macro.',
    price: 29,
    originalPrice: 39,
    theme: 'blue',
    included: [
      { label: 'Tests', text: 'Full practice exams and unit tests on the 2027 CED, plus an endless AP-style MCQ bank' },
      { label: 'FRQs and essays', text: 'AI-graded FRQs with graphing help' },
      {
        label: 'Study tools',
        text: FEATURES.guidedExplainers && FEATURES.showExplainersInNav
          ? 'Guided explainers, interactive graphing simulators, cheat sheets with PDFs, and quizzes from your own notes'
          : 'Interactive graphing simulators, cheat sheets with PDFs, and quizzes from your own notes',
      },
    ],
  },
  micro: {
    badge: 'AP MICRO SEASON PASS',
    title: 'Microeconomics',
    subtitle: 'Everything you need to score a 5 in AP Micro.',
    price: 29,
    originalPrice: 39,
    theme: 'green',
    included: [
      { label: 'Tests', text: 'Full practice exams and unit tests on the 2027 CED, plus an endless AP-style MCQ bank' },
      { label: 'FRQs and essays', text: 'AI-graded FRQs with graphing help' },
      {
        label: 'Study tools',
        text: 'Interactive graphing simulators, cheat sheets with PDFs, and quizzes from your own notes',
      },
    ],
  },
  gov: {
    badge: 'AP GOV SEASON PASS',
    title: 'U.S. Government',
    subtitle: 'Everything you need to score a 5 in AP Gov.',
    price: 29,
    originalPrice: 39,
    theme: 'violet',
    included: [
      { label: 'Tests', text: 'Unit MCQ tests for all 5 units' },
      {
        label: 'FRQs and essays',
        text: 'Stimulus FRQ packs with scoring guides, and SCOTUS comparison essays with AI feedback',
      },
      { label: 'Study tools', text: 'Interactive cheat sheets for every unit, each with the Dojo AI tutor' },
    ],
  },
  stats: {
    badge: 'AP STATS SEASON PASS',
    title: 'Statistics',
    subtitle: 'Everything you need to score a 5 in AP Stats.',
    price: 29,
    originalPrice: 39,
    theme: 'orange',
    included: [
      { label: 'Tests', text: 'Unit MCQ tests for all 5 units' },
      { label: 'FRQs and essays', text: 'Unit FRQ packs with stimulus practice' },
      {
        label: 'Study tools',
        text: 'TI-84 calculator drills, the exam formula sheet on every unit, and interactive cheat sheets',
      },
    ],
  },
};

const BUNDLE = {
  price: 49,
};

const THEME_CLASSES = {
  blue: {
    accent: 'text-blue-600',
    badgeTint: 'bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-200',
    buttonBg: 'bg-blue-600 hover:bg-blue-700',
  },
  green: {
    accent: 'text-green-600',
    badgeTint: 'bg-green-50 text-green-700 ring-1 ring-inset ring-green-200',
    buttonBg: 'bg-green-600 hover:bg-green-700',
  },
  violet: {
    accent: 'text-violet-600',
    badgeTint: 'bg-violet-50 text-violet-700 ring-1 ring-inset ring-violet-200',
    buttonBg: 'bg-violet-600 hover:bg-violet-700',
  },
  orange: {
    accent: 'text-orange-600',
    badgeTint: 'bg-orange-50 text-orange-700 ring-1 ring-inset ring-orange-200',
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
      className="bg-white border border-slate-200 rounded-3xl shadow-[0_10px_30px_rgba(15,23,42,0.08)] p-6 sm:p-8 h-full"
    >
      <div className="flex flex-col items-center text-center h-full">
        <span
          className={`inline-flex items-center justify-center rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wider ${theme.badgeTint}`}
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
        <p className="mt-2 text-sm font-semibold text-gray-700">One-time payment, no subscription.</p>
        <p className="mt-1 text-sm text-gray-600">{SEASON_LABEL}</p>

        <Link
          href={`/purchase/season-pass?courseType=${courseType}`}
          className={`mt-6 w-full inline-flex items-center justify-center gap-2 ${theme.buttonBg} text-white font-semibold text-base py-3.5 rounded-xl shadow-[0_6px_16px_rgba(15,23,42,0.10)] transition-all hover:-translate-y-px`}
        >
          Get started <ArrowRight className="w-4 h-4" />
        </Link>
        <p className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-gray-700">
          <ShieldCheck className={`w-4 h-4 ${theme.accent}`} aria-hidden />
          100% money-back guarantee
        </p>

        <div className="mt-8 w-full text-left">
          <p className="text-base font-black text-black mb-4">Includes:</p>
          <ul className="space-y-4">
            {config.included.map((row) => (
              <li key={row.label} className="flex items-start gap-3">
                <CheckCircle2 className={`w-5 h-5 mt-0.5 flex-shrink-0 ${theme.accent}`} />
                <span className="text-sm sm:text-base text-gray-900 leading-relaxed">
                  <strong className="block font-black">{row.label}</strong>
                  <span className="font-medium">{row.text}</span>
                </span>
              </li>
            ))}
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

const TRUST_POINTS = [
  {
    icon: GraduationCap,
    title: 'Built by AP tutors',
    text: 'Shaped by years of one-on-one AP tutoring, around the mistakes students really make.',
  },
  {
    icon: CalendarCheck,
    title: 'Matches the 2027 exam',
    text: 'Questions and practice exams follow the current Course and Exam Description.',
  },
  {
    icon: Lightbulb,
    title: 'Explanations, not just answers',
    text: 'See why each answer is right or wrong, so every miss teaches you something.',
  },
  {
    icon: ShieldCheck,
    title: '100% money-back guarantee',
    text: 'Not happy with your pass? Email service@apdojo.com for a full refund.',
  },
] as const;

function TrustStrip() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45 }}
      className="mt-10 bg-white border border-slate-200 rounded-2xl shadow-[0_10px_30px_rgba(15,23,42,0.08)] p-6 sm:p-8"
    >
      <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {TRUST_POINTS.map(({ icon: Icon, title, text }) => (
          <li key={title} className="flex items-start gap-3">
            <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-300 bg-blue-50 text-blue-600">
              <Icon className="h-5 w-5" aria-hidden />
            </span>
            <div className="min-w-0">
              <p className="font-black text-black leading-snug">{title}</p>
              <p className="mt-1 text-sm font-medium text-gray-600 leading-relaxed">{text}</p>
            </div>
          </li>
        ))}
      </ul>
    </motion.div>
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
      className="mt-10 bg-yellow-50 border border-yellow-200 rounded-2xl shadow-[0_10px_30px_rgba(15,23,42,0.08)] p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
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
        className="inline-flex items-center justify-center gap-2 bg-white border border-slate-200 rounded-xl px-5 py-3 font-black text-black shadow-[0_2px_8px_rgba(15,23,42,0.06)] hover:shadow-[0_14px_36px_rgba(15,23,42,0.12)] transition-all hover:-translate-y-1 whitespace-nowrap"
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
        <TrustStrip />
        <BundleBanner />
        <TutoringCallout placement="season_pass_chooser" className="mt-8 text-center" />
      </div>
    </div>
  );
}

export function SeasonPassShowcase() {
  return (
    <div id="season-pass" className="w-full scroll-mt-24 py-20 sm:py-24">
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
            $29 each, paid once. Each pass covers the May 2027 AP exam season, with a 100% money-back guarantee.
          </p>
        </motion.div>

        <MobileSeasonPassCarousel />

        <div className="hidden lg:grid grid-cols-2 gap-8">
          {CARD_TYPES.map((type) => (
            <SeasonPassCard key={type} courseType={type} />
          ))}
        </div>

        <TrustStrip />
        <BundleBanner />
      </div>
    </div>
  );
}
