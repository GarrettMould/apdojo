'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { CheckCircle2, Sparkles, Star, X, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SeasonPassModalFeaturePeek } from '@/components/SeasonPassModalFeaturePeek';
import { COURSE_CONFIG } from '@/data/seasonPassCourseConfig';
import type { CourseSubject } from '@/lib/courseSubject';

export interface SeasonPassEntryWideModalProps {
  subject: CourseSubject;
  onClose: () => void;
}

const SHOWCASE_FUN_FACT =
  "With AP Dojo's Infinite Quiz Mode, you can create custom AP-style review questions based on your own notes or practice problems.";

/** Wide Season Pass promo — pricing + feature peeks (cheat sheets, unit tests, FRQs). */
export function SeasonPassEntryWideModal({ subject, onClose }: SeasonPassEntryWideModalProps) {
  const config = COURSE_CONFIG[subject];
  const isEcon = subject === 'macro' || subject === 'micro';
  const isCompactShowcase = subject === 'gov' || subject === 'stats';

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  const accentBtn =
    subject === 'stats'
      ? 'bg-orange-600 hover:bg-orange-700 border-orange-800'
      : subject === 'gov'
        ? 'bg-violet-600 hover:bg-violet-700 border-violet-800'
        : subject === 'micro'
          ? 'bg-green-600 hover:bg-green-700 border-green-800'
          : 'bg-blue-600 hover:bg-blue-700 border-blue-800';

  const saveAmount = config.originalPrice - config.price;

  return (
    <motion.div
      className="fixed inset-0 z-[10060] flex items-end justify-center bg-black/60 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-8 backdrop-blur-sm sm:items-center sm:p-5 sm:pb-5 sm:pt-5"
      role="dialog"
      aria-modal="true"
      aria-labelledby="season-pass-entry-wide-title"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      onClick={onClose}
    >
      <motion.div
        className={`relative w-full overflow-y-auto rounded-2xl border-4 border-black bg-gradient-to-b from-gray-50 to-white shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] ${
          isCompactShowcase
            ? 'max-w-4xl max-h-[85vh] sm:max-h-[88vh]'
            : 'max-w-7xl max-h-[90vh] sm:max-h-[96vh]'
        }`}
        initial={{ y: 64, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 z-20 flex h-10 w-10 items-center justify-center rounded-full border-2 border-black bg-white text-gray-900 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-gray-100 sm:right-4 sm:top-4"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>

        <div
          className={`flex flex-col ${
            isCompactShowcase
              ? 'gap-5 p-5 pt-14 sm:gap-6 sm:p-6 sm:pt-14 lg:gap-8 lg:p-7 lg:pt-10'
              : 'gap-8 p-6 pt-16 sm:p-8 sm:pt-16 lg:gap-10 lg:p-10 lg:pt-12'
          }`}
        >
          <div
            className={`grid min-h-0 grid-cols-1 lg:grid-cols-2 ${
              isCompactShowcase ? 'gap-5 lg:items-start lg:gap-8' : 'gap-8 lg:items-stretch lg:gap-12'
            }`}
          >
            {/* Pitch + price + CTA + social proof */}
            <div
              className={`flex h-full min-h-0 flex-col ${
                isCompactShowcase ? 'gap-3.5 lg:gap-4' : 'gap-5 lg:gap-6'
              }`}
            >
              <span
                className={`inline-flex items-center gap-2 px-3 py-1.5 ${config.accentBg} text-white font-bold text-[10px] uppercase tracking-widest border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] sm:text-xs sm:px-4 sm:py-2`}
              >
                <Zap className="h-3.5 w-3.5 shrink-0" />
                {config.badge}
              </span>

              <h2
                id="season-pass-entry-wide-title"
                className={`font-black leading-tight text-black ${
                  isCompactShowcase
                    ? 'text-2xl sm:text-3xl lg:text-[1.85rem] lg:leading-[1.12]'
                    : 'text-3xl sm:text-4xl lg:text-[2.75rem] lg:leading-[1.08]'
                }`}
              >
                {config.headline}
              </h2>

              <div className="space-y-2.5">
                <h3
                  className={`font-black uppercase tracking-wide text-black ${
                    isCompactShowcase ? 'text-sm sm:text-base' : 'text-lg sm:text-xl'
                  }`}
                >
                  What&apos;s included
                </h3>
                <ul className={`space-y-2 ${isCompactShowcase ? '' : 'sm:space-y-3'}`}>
                  {config.features.map((feature, i) => (
                    <li key={i} className="flex gap-2.5">
                      <CheckCircle2
                        className={`mt-0.5 shrink-0 ${config.accentColor} ${
                          isCompactShowcase ? 'h-4 w-4' : 'h-5 w-5'
                        }`}
                      />
                      <span
                        className={`font-semibold leading-snug text-gray-900 ${
                          isCompactShowcase ? 'text-xs sm:text-sm' : 'text-sm sm:text-base'
                        }`}
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-2">
                <p
                  className={`font-medium leading-relaxed text-gray-600 ${
                    isCompactShowcase ? 'text-sm sm:text-base' : 'text-base sm:text-lg'
                  }`}
                >
                  {config.subheadline}
                </p>

                <div className="flex flex-wrap items-baseline gap-2.5 pt-0.5">
                  <span
                    className={`font-black leading-none ${config.accentColor} ${
                      isCompactShowcase ? 'text-4xl sm:text-5xl' : 'text-5xl sm:text-6xl'
                    }`}
                  >
                    ${config.price}
                  </span>
                  <span
                    className={`text-gray-400 line-through font-semibold ${
                      isCompactShowcase ? 'text-base sm:text-lg' : 'text-lg sm:text-xl'
                    }`}
                  >
                    ${config.originalPrice}
                  </span>
                  <span className="rounded-full bg-red-500 px-2.5 py-1 text-xs font-bold text-white">
                    SAVE ${saveAmount}
                  </span>
                </div>
                <p className="text-xs font-medium text-gray-500 sm:text-sm">
                  One-time payment · Valid until June 30, 2027
                </p>
              </div>

              {isEcon && (
                <div className="flex items-center gap-2 rounded-xl border-2 border-black bg-yellow-50 p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  <Sparkles className="h-5 w-5 shrink-0 text-yellow-600" />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-bold text-gray-900">Taking both exams?</p>
                    <p className="text-xs text-gray-600">Get Macro + Micro Bundle for $49</p>
                  </div>
                  <Link
                    href="/purchase/season-pass?courseType=bundle"
                    className="shrink-0 border-2 border-black bg-white px-3 py-1.5 text-xs font-bold hover:bg-gray-100 transition-colors"
                  >
                    View Bundle
                  </Link>
                </div>
              )}

              <div className={`flex flex-col gap-2 ${isCompactShowcase ? 'pt-0.5' : 'gap-3 pt-1'}`}>
                <Button
                  asChild
                  size="lg"
                  className={`w-full border-4 border-black font-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] ${accentBtn} text-white ${
                    isCompactShowcase
                      ? 'py-5 text-base sm:py-6 sm:text-lg'
                      : 'py-6 text-lg sm:py-7 sm:text-xl'
                  }`}
                >
                  <Link href={`/purchase/season-pass?courseType=${subject}`}>Get the Season Pass</Link>
                </Button>
                {!isCompactShowcase && (
                  <>
                    <div className="flex items-center justify-center gap-2 py-0.5">
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400 sm:h-5 sm:w-5" />
                        ))}
                      </div>
                      <span className="text-sm font-semibold text-gray-600 sm:text-base">
                        1,000+ students helped
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={onClose}
                      className="w-full py-1.5 text-sm font-semibold text-gray-500 underline-offset-2 hover:text-gray-800 hover:underline"
                    >
                      Maybe later
                    </button>
                  </>
                )}
              </div>
            </div>

            <div
              className={`flex min-w-0 flex-col border-gray-200 lg:border-l lg:pl-8 ${
                isCompactShowcase ? 'self-start' : 'h-full min-h-[22rem] sm:min-h-[26rem] lg:min-h-[28rem] lg:pl-12'
              }`}
            >
              <SeasonPassModalFeaturePeek
                courseType={subject}
                className={isCompactShowcase ? undefined : 'min-h-0 flex-1'}
              />
              {isCompactShowcase && (
                <p className="mt-6 px-2 text-center text-xs font-medium leading-relaxed text-gray-600 sm:mt-8 sm:text-sm">
                  <span className={`font-black ${config.accentColor}`}>Did you know? </span>
                  {SHOWCASE_FUN_FACT}
                </p>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
