'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Star, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

interface SeasonPassBreakdownProps {}

const MACRO_FEATURES = [
  { text: 'Endless AP-Style MCQ Bank', key: 'Endless' },
  { text: 'AI-Graded FRQs with Graphing Help', key: 'AI-Graded' },
  { text: 'Interactive Drill Simulator', key: 'Interactive' },
  { text: 'Visual Cheat Sheets (PDF)', key: 'Visual Cheat Sheets' },
  { text: 'Upload Notes to Create Quizzes', key: 'Upload Notes' },
];

const MICRO_FEATURES = [
  { text: 'Endless AP-Style MCQ Bank', key: 'Endless' },
  { text: 'AI-Graded FRQs with Graphing Help', key: 'AI-Graded' },
  { text: 'Interactive Drill Simulator', key: 'Interactive' },
  { text: 'Visual Cheat Sheets (PDF)', key: 'Visual Cheat Sheets' },
  { text: 'Upload Notes to Create Quizzes', key: 'Upload Notes' },
];

export function SeasonPassBreakdown({}: SeasonPassBreakdownProps) {
  return (
    <div className="w-full py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* AP Macro Column */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8 lg:p-10"
        >
          {/* Badge */}
          <div className="inline-block mb-6">
            <span className="px-5 py-2.5 bg-blue-600 text-white font-bold text-sm uppercase tracking-wider border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rounded-lg">
              AP MACRO SEASON PASS
            </span>
          </div>

          {/* Headline */}
          <h2 className="text-4xl lg:text-5xl font-extrabold text-black leading-tight mb-6">
            The Complete AP{' '}
            <span className="text-blue-600">Macro</span> Toolkit for a 5.
          </h2>

          {/* Price Section */}
          <div className="space-y-2 mb-6">
            <p className="text-lg font-semibold text-gray-700">
              One-time payment of
            </p>
            <div className="flex items-baseline gap-3">
              <span className="text-5xl font-extrabold text-blue-600">
                $29
              </span>
              <span className="text-lg text-gray-400 line-through ml-2">
                $59
              </span>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              Valid until May 30th, 2026
            </p>
          </div>

          {/* Star Rating */}
          <div className="flex items-center gap-2 mb-8">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <span className="text-sm font-medium text-gray-600">
              500+ Students Tutored
            </span>
          </div>

          {/* Benefits Stack */}
          <div className="space-y-4 mb-8">
            <h3 className="text-2xl font-bold text-black mb-4">
              What's Included:
            </h3>
            <ul className="space-y-3">
              {MACRO_FEATURES.map((benefit, index) => {
                const parts = benefit.text.split(benefit.key);
                return (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle2 className="w-6 h-6 flex-shrink-0 mt-0.5 text-blue-600" />
                    <span className="text-lg font-semibold text-gray-900">
                      {parts[0]}
                      <strong>{benefit.key}</strong>
                      {parts[1]}
                    </span>
                  </motion.li>
                );
              })}
            </ul>
          </div>

          {/* CTA Button */}
          <div className="pt-4">
            <Link href="/purchase/season-pass?courseType=macro">
              <motion.button
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.98 }}
                className="w-full text-white font-extrabold text-xl py-6 px-8 bg-blue-600 hover:bg-blue-700 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 uppercase tracking-wide"
              >
                UNLOCK INSTANT ACCESS
              </motion.button>
            </Link>

            {/* Trust Elements */}
            <p className="text-xs text-gray-500 text-center mt-4 flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-gray-400" />
              100% Money-Back Guarantee
            </p>
          </div>
        </motion.div>

        {/* AP Micro Column */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8 lg:p-10"
        >
          {/* Badge */}
          <div className="inline-block mb-6">
            <span className="px-5 py-2.5 bg-green-600 text-white font-bold text-sm uppercase tracking-wider border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rounded-lg">
              AP MICRO SEASON PASS
            </span>
          </div>

          {/* Headline */}
          <h2 className="text-4xl lg:text-5xl font-extrabold text-black leading-tight mb-6">
            The Complete AP{' '}
            <span className="text-green-600">Micro</span> Toolkit for a 5.
          </h2>

          {/* Price Section */}
          <div className="space-y-2 mb-6">
            <p className="text-lg font-semibold text-gray-700">
              One-time payment of
            </p>
            <div className="flex items-baseline gap-3">
              <span className="text-5xl font-extrabold text-green-600">
                $29
              </span>
              <span className="text-lg text-gray-400 line-through ml-2">
                $59
              </span>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              Valid until May 30th, 2026
            </p>
          </div>

          {/* Star Rating */}
          <div className="flex items-center gap-2 mb-8">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <span className="text-sm font-medium text-gray-600">
              500+ Students Tutored
            </span>
          </div>

          {/* Benefits Stack */}
          <div className="space-y-4 mb-8">
            <h3 className="text-2xl font-bold text-black mb-4">
              What's Included:
            </h3>
            <ul className="space-y-3">
              {MICRO_FEATURES.map((benefit, index) => {
                const parts = benefit.text.split(benefit.key);
                return (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle2 className="w-6 h-6 flex-shrink-0 mt-0.5 text-green-600" />
                    <span className="text-lg font-semibold text-gray-900">
                      {parts[0]}
                      <strong>{benefit.key}</strong>
                      {parts[1]}
                    </span>
                  </motion.li>
                );
              })}
            </ul>
          </div>

          {/* CTA Button */}
          <div className="pt-4">
            <Link href="/purchase/season-pass?courseType=micro">
              <motion.button
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.98 }}
                className="w-full text-white font-extrabold text-xl py-6 px-8 bg-green-600 hover:bg-green-700 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 uppercase tracking-wide"
              >
                UNLOCK INSTANT ACCESS
              </motion.button>
            </Link>

            {/* Trust Elements */}
            <p className="text-xs text-gray-500 text-center mt-4 flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-gray-400" />
              100% Money-Back Guarantee
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}





