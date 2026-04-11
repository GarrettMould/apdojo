'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { CheckCircle2, Sparkles, Star, X, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SeasonPassModalFeaturePeek } from '@/components/SeasonPassModalFeaturePeek';
import { COURSE_CONFIG } from '@/data/seasonPassCourseConfig';

export interface SeasonPassEntryWideModalProps {
  subject: 'macro' | 'micro';
  onClose: () => void;
}

/** Wide Season Pass promo for unit cheat sheet routes — pricing, bundle, and what is included. */
export function SeasonPassEntryWideModal({ subject, onClose }: SeasonPassEntryWideModalProps) {
  const config = COURSE_CONFIG[subject];

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  const accentBtn =
    subject === 'micro'
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
        className="relative w-full max-w-7xl max-h-[90vh] overflow-y-auto rounded-2xl border-4 border-black bg-gradient-to-b from-gray-50 to-white shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] sm:max-h-[96vh]"
        initial={{ y: 64, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 z-20 flex h-11 w-11 items-center justify-center rounded-full border-2 border-black bg-white text-gray-900 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-gray-100 sm:right-4 sm:top-4"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex flex-col gap-8 p-6 pt-16 sm:p-8 sm:pt-16 lg:gap-10 lg:p-10 lg:pt-12">
          <div className="grid min-h-0 grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12 lg:items-stretch">
            {/* Pitch + price + CTA + social proof — stretches to match right column */}
            <div className="flex h-full min-h-0 flex-col gap-5 lg:gap-6">
              <span
                className={`inline-flex items-center gap-2 px-4 py-2 ${config.accentBg} text-white font-bold text-xs uppercase tracking-widest border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]`}
              >
                <Zap className="h-3.5 w-3.5 shrink-0" />
                {config.badge}
              </span>

              <h2
                id="season-pass-entry-wide-title"
                className="text-3xl font-black leading-tight text-black sm:text-4xl lg:text-[2.75rem] lg:leading-[1.08]"
              >
                {config.headline}
              </h2>

              <div className="space-y-3">
                <h3 className="text-lg font-black uppercase tracking-wide text-black sm:text-xl">What&apos;s included</h3>
                <ul className="space-y-2.5 sm:space-y-3">
                  {config.features.map((feature, i) => (
                    <li key={i} className="flex gap-3">
                      <CheckCircle2 className={`mt-0.5 h-5 w-5 shrink-0 ${config.accentColor}`} />
                      <span className="text-sm font-semibold leading-snug text-gray-900 sm:text-base">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-3">
                <p className="text-base font-medium leading-relaxed text-gray-600 sm:text-lg">{config.subheadline}</p>

                <div className="pt-1 flex flex-wrap items-baseline gap-3">
                  <span className={`text-5xl font-black leading-none sm:text-6xl ${config.accentColor}`}>
                    ${config.price}
                  </span>
                  <span className="text-lg text-gray-400 line-through font-semibold sm:text-xl">
                    ${config.originalPrice}
                  </span>
                  <span className="text-xs font-bold text-white bg-red-500 px-2.5 py-1 rounded-full">
                    SAVE ${saveAmount}
                  </span>
                </div>
                <p className="text-sm text-gray-500 font-medium">One-time payment · Valid until June 30, 2026</p>
              </div>

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

              <div className="flex flex-col gap-3 pt-1">
                <Button
                  asChild
                  size="lg"
                  className={`w-full border-4 border-black py-6 text-lg font-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] sm:py-7 sm:text-xl ${accentBtn} text-white`}
                >
                  <Link href={`/purchase/season-pass?courseType=${subject}`}>Get the Season Pass</Link>
                </Button>
                <div className="flex items-center justify-center gap-2 py-1">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400 sm:h-5 sm:w-5" />
                    ))}
                  </div>
                  <span className="text-sm font-semibold text-gray-600 sm:text-base">1,000+ students helped</span>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full py-2 text-sm font-semibold text-gray-500 underline-offset-2 hover:text-gray-800 hover:underline"
                >
                  Maybe later
                </button>
              </div>
            </div>

            <div className="hidden h-full min-h-0 min-w-0 flex-col border-gray-200 lg:flex lg:border-l lg:pl-12 lg:pt-0">
              <SeasonPassModalFeaturePeek courseType={subject} className="min-h-0 flex-1" />
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
