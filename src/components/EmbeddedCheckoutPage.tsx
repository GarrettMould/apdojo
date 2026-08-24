'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { EmbeddedCheckout, EmbeddedCheckoutProvider } from '@stripe/react-stripe-js';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Star, ShieldCheck, Sparkles, Zap } from 'lucide-react';
import Link from 'next/link';
import { useAuthContext } from '@/contexts/AuthContext';
import { reviews, type Review } from '@/data/reviews';
import { COURSE_CONFIG, type SeasonPassPurchaseType } from '@/data/seasonPassCourseConfig';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

interface EmbeddedCheckoutPageProps {
  courseType: SeasonPassPurchaseType;
}

const REVIEW_ROTATE_MS = 5500;

function shuffleReviews(list: Review[]): Review[] {
  const arr = [...list];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function MobileReviewCarousel({ items }: { items: Review[] }) {
  const [index, setIndex] = useState(0);
  const safeLen = items.length;

  useEffect(() => {
    if (safeLen <= 1) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % safeLen);
    }, REVIEW_ROTATE_MS);
    return () => window.clearInterval(id);
  }, [safeLen]);

  if (safeLen === 0) return null;

  const review = items[index];

  return (
    <div className="space-y-3">
      <h2 className="text-lg font-black text-black uppercase tracking-wide">What students & parents say</h2>
      <div className="relative min-h-[200px]" aria-live="polite" aria-atomic="true">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={`${review.author}-${index}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35 }}
            className="bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-4"
          >
            <div className="flex gap-0.5 mb-2">
              {[...Array(5)].map((_, j) => (
                <Star key={j} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <p className="text-sm font-semibold text-gray-900 leading-relaxed mb-2">
              &ldquo;{review.text}&rdquo;
            </p>
            <p className="text-xs font-bold text-gray-700">{review.author}</p>
            {review.badge && (
              <p className="text-xs text-blue-600 font-semibold">{review.badge}</p>
            )}
            {review.title && <p className="text-xs text-gray-600 mt-0.5">{review.title}</p>}
          </motion.div>
        </AnimatePresence>
      </div>
      {safeLen > 1 && (
        <div className="flex justify-center gap-1.5 pt-1" aria-hidden>
          {items.map((_, i) => (
            <span
              key={i}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === index ? 'w-6 bg-black' : 'w-1.5 bg-gray-300'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export function EmbeddedCheckoutPage({ courseType }: EmbeddedCheckoutPageProps) {
  const { user } = useAuthContext();
  const config = COURSE_CONFIG[courseType] ?? COURSE_CONFIG.macro;
  const selectedReviews = reviews.slice(0, 3);
  const shuffledReviewsMobile = useMemo(() => shuffleReviews(reviews), []);
  const [checkoutReady, setCheckoutReady] = useState(false);

  const fetchClientSecret = useCallback(async () => {
    const res = await fetch('/api/create-embedded-checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ purchaseType: courseType, userId: user?.uid }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to create session');
    setCheckoutReady(true);
    return data.clientSecret;
  }, [courseType, user?.uid]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 lg:items-start">

          {/* ── Product / pitch (row 1 col 1 on lg) ── */}
          <div className="space-y-6 lg:sticky lg:top-8 lg:col-start-1 lg:row-start-1 lg:self-start">

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <span className={`inline-flex items-center gap-2 px-4 py-2 ${config.accentBg} text-white font-bold text-xs uppercase tracking-widest border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]`}>
                <Zap className="w-3.5 h-3.5" />
                {config.badge}
              </span>
            </motion.div>

            {/* Headline + Price grouped */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="space-y-2"
            >
              <h1 className="text-4xl lg:text-5xl font-black text-black leading-tight">
                {config.headline}
              </h1>
              <p className="text-lg text-gray-600 font-medium">
                {config.subheadline}
              </p>

              {/* Price */}
              <div className="pt-2 flex items-baseline gap-3">
                <span className={`text-6xl font-black ${config.accentColor} leading-none`}>
                  ${config.price}
                </span>
                <span className="text-lg text-gray-400 line-through font-semibold">
                  ${config.originalPrice}
                </span>
                <span className="text-xs font-bold text-white bg-red-500 px-2 py-1 rounded-full">
                  SAVE ${config.originalPrice - config.price}
                </span>
              </div>
              <p className="text-sm text-gray-500">
                One-time payment · Valid until June 30, 2027
              </p>
            </motion.div>

            {/* Bundle upsell (Macro / Micro only — Gov has its own pass) */}
            {(courseType === 'macro' || courseType === 'micro') && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="p-4 bg-yellow-50 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-yellow-600 shrink-0" />
                  <div>
                    <p className="text-sm font-bold text-gray-900">Taking both exams?</p>
                    <p className="text-xs text-gray-600">Get Macro + Micro Bundle for $49</p>
                  </div>
                </div>
                <Link
                  href="/purchase/season-pass?courseType=bundle"
                  className="text-xs font-bold border-2 border-black px-3 py-1.5 bg-white hover:bg-gray-100 transition-colors whitespace-nowrap"
                >
                  View Bundle
                </Link>
              </motion.div>
            )}

            {/* Features */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.25 }}
              className="space-y-3"
            >
              <h2 className="text-lg font-black text-black uppercase tracking-wide">What&apos;s Included:</h2>
              <ul className="space-y-3">
                {config.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle2 className={`w-5 h-5 shrink-0 ${config.accentColor}`} />
                    <span className="text-base font-semibold text-gray-900">{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Trust badge */}
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <ShieldCheck className="w-4 h-4" />
              <span className="font-medium">100% Money-Back Guarantee</span>
            </div>

            {/* Aggregate stars — mobile stays with product; full review cards are below checkout on mobile */}
            <div className="flex items-center gap-2 lg:hidden">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-sm font-semibold text-gray-600">1,000+ students helped</span>
            </div>
          </div>

          {/* ── Stripe Embedded Checkout (row 1 col 2 on lg, spans 2 rows) ── */}
          <div className="lg:sticky lg:top-8 lg:col-start-2 lg:row-start-1 lg:row-span-2 lg:self-start">
            <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
              {/* Header bar */}
              <div className="px-6 py-4 bg-gray-50 border-b-2 border-gray-200 flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-gray-500" />
                <p className="text-sm font-bold text-gray-700 uppercase tracking-wide">
                  Secure Checkout
                </p>
              </div>

              <div className="p-2">
                <EmbeddedCheckoutProvider
                  key={courseType}
                  stripe={stripePromise}
                  options={{ fetchClientSecret }}
                >
                  <EmbeddedCheckout />
                </EmbeddedCheckoutProvider>
              </div>
            </div>
          </div>

          {/* ── Mobile: reviews under checkout (one at a time, auto-rotate) ── */}
          <div className="lg:hidden">
            <MobileReviewCarousel items={shuffledReviewsMobile} />
          </div>

          {/* ── Desktop: reviews under product in left column ── */}
          <div className="hidden lg:block space-y-4 pt-2 lg:col-start-1 lg:row-start-2">
            <div className="flex items-center gap-2">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-sm font-semibold text-gray-600">1,000+ students helped</span>
            </div>
            {selectedReviews.map((review, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                className="bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-4"
              >
                <div className="flex gap-0.5 mb-2">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-sm font-semibold text-gray-900 leading-relaxed mb-2">
                  &ldquo;{review.text}&rdquo;
                </p>
                <p className="text-xs font-bold text-gray-700">{review.author}</p>
                {review.badge && (
                  <p className="text-xs text-blue-600 font-semibold">{review.badge}</p>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
