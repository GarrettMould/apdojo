'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';

const COURSE_CONFIG: Record<
  'macro' | 'micro',
  {
    badge: string;
    title: string;
    subtitle: string;
    price: number;
    originalPrice: number;
    validUntilLabel: string;
    theme: 'blue' | 'green';
    features: Array<{ text: string; key: string }>;
  }
> = {
  macro: {
    badge: 'AP MACRO SEASON PASS',
    title: 'Macroeconomics',
    subtitle: 'Everything you need to score a 5 in AP Macro.',
    price: 29,
    originalPrice: 39,
    validUntilLabel: 'Valid until June 30th, 2026',
    theme: 'blue',
    features: [
      { text: 'Full Practice Exams based on 2026 AP Macro CED', key: 'Full Practice Exams' },
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
    validUntilLabel: 'Valid until June 30th, 2026',
    theme: 'green',
    features: [
      { text: 'Full Practice Exams based on 2026 AP Micro CED', key: 'Full Practice Exams' },
      { text: 'Endless AP-Style MCQ Bank', key: 'Endless' },
      { text: 'AI-Graded FRQs with Graphing Help', key: 'AI-Graded' },
      { text: 'Interactive Graphing Simulators', key: 'Interactive Graphing Simulators' },
      { text: 'Interactive Cheat Sheets + Downloadable PDFs', key: 'Interactive Cheat Sheets' },
      { text: 'Upload Notes to Create Quizzes', key: 'Upload Notes' },
    ],
  },
};

const BUNDLE = {
  price: 49,
};

function SeasonPassCard({ courseType }: { courseType: 'macro' | 'micro' }) {
  const config = COURSE_CONFIG[courseType];
  const isGreen = config.theme === 'green';
  const accent = isGreen ? 'text-green-600' : 'text-blue-600';
  const badgeBg = isGreen ? 'bg-green-600' : 'bg-blue-600';
  const buttonBg = isGreen ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700';

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-white border-4 border-black rounded-3xl shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] p-8 sm:p-10"
    >
      <div className="flex flex-col items-center text-center">
        <span
          className={`inline-flex items-center justify-center px-5 py-2.5 ${badgeBg} text-white font-bold text-sm uppercase tracking-wider border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rounded-lg`}
        >
          {config.badge}
        </span>

        <h3 className="mt-6 text-4xl sm:text-5xl font-black text-black leading-tight">
          AP <span className={accent}>{config.title}</span>
        </h3>
        <p className="mt-3 text-lg sm:text-xl text-gray-700 font-medium max-w-xl">
          {config.subtitle}
        </p>

        <div className="mt-8 flex items-end gap-3">
          <span className={`text-6xl sm:text-7xl font-black ${accent}`}>${config.price}</span>
          <span className="text-xl text-gray-400 line-through">${config.originalPrice}</span>
        </div>
        <p className="mt-2 text-sm text-gray-600">{config.validUntilLabel}</p>

        <Link
          href={`/purchase/season-pass?courseType=${courseType}`}
          className={`mt-8 w-full inline-flex items-center justify-center gap-2 ${buttonBg} text-white font-black text-xl py-6 rounded-2xl border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all hover:-translate-y-1`}
        >
          Get started <ArrowRight className="w-6 h-6" />
        </Link>

        <div className="mt-10 w-full text-left">
          <p className="text-lg font-black text-black mb-5">
            Includes:
          </p>
          <ul className="space-y-4">
            {config.features.map((feature, idx) => {
              const parts = feature.text.split(feature.key);
              return (
                <li key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className={`w-6 h-6 mt-0.5 flex-shrink-0 ${accent}`} />
                  <span className="text-base sm:text-lg font-semibold text-gray-900 leading-relaxed">
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

export function SeasonPassShowcase() {
  const savings = Math.max(0, COURSE_CONFIG.macro.price + COURSE_CONFIG.micro.price - BUNDLE.price);
  return (
    <div className="w-full pt-24 sm:pt-32 pb-8 sm:pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900">
            Your All‑In‑One AP Econ Season Pass
          </h2>
        </motion.div>

        {/* Bundle banner */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="mb-10 bg-yellow-50 border-4 border-black rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
        >
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Sparkles className="w-5 h-5 text-yellow-700" />
              <p className="text-lg sm:text-xl font-black text-black">
                Studying Micro and Macro? Save ${savings} with the Bundle.
              </p>
            </div>
            <p className="text-sm sm:text-base text-gray-700 font-medium">
              Get both passes together for ${BUNDLE.price}.
            </p>
          </div>
          <Link
            href="/purchase/bundle"
            className="inline-flex items-center justify-center gap-2 bg-white border-4 border-black rounded-xl px-5 py-3 font-black text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all hover:-translate-y-1 whitespace-nowrap"
          >
            View Bundle <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>

        {/* Two cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <SeasonPassCard courseType="macro" />
          <SeasonPassCard courseType="micro" />
        </div>
      </div>
    </div>
  );
}

