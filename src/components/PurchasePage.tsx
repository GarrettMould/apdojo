'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Play, FileText, Monitor, Star, ShieldCheck, Sparkles, Quote } from 'lucide-react';
import { loadStripe } from '@stripe/stripe-js';
import { useAuthContext } from '@/contexts/AuthContext';
import Image from 'next/image';
import Link from 'next/link';
import { reviews } from '@/data/reviews';

interface PurchasePageProps {
  courseType: 'macro' | 'micro';
}

interface CourseConfig {
  themeColor: 'green' | 'blue';
  badge: string;
  headline: string;
  price: number;
  features: Array<{ text: string; key: string }>;
}

const COURSE_CONFIG: Record<'macro' | 'micro', CourseConfig> = {
  micro: {
    themeColor: 'green',
    badge: 'AP MICRO SEASON PASS',
    headline: 'The Complete AP Micro Toolkit for a 5.',
    price: 29,
    features: [
      { text: 'Full Practice Exams based on 2026 AP Micro CED', key: 'Full Practice Exams' },
      { text: 'Endless AP-Style MCQ Bank', key: 'Endless' },
      { text: 'AI-Graded FRQs with Graphing Help', key: 'AI-Graded' },
      { text: 'Interactive Graphing Simulators', key: 'Interactive Graphing Simulators' },
      { text: 'Interactive Cheat Sheets + Downloadable PDFs', key: 'Interactive Cheat Sheets' },
      { text: 'Upload Notes to Create Quizzes', key: 'Upload Notes' },
    ],
  },
  macro: {
    themeColor: 'blue',
    badge: 'AP MACRO SEASON PASS',
    headline: 'The Complete AP Macro Toolkit for a 5.',
    price: 29,
    features: [
      { text: 'Full Practice Exams based on 2026 AP Macro CED', key: 'Full Practice Exams' },
      { text: 'Endless AP-Style MCQ Bank', key: 'Endless' },
      { text: 'AI-Graded FRQs with Graphing Help', key: 'AI-Graded' },
      { text: 'Interactive Graphing Simulators', key: 'Interactive Graphing Simulators' },
      { text: 'Interactive Cheat Sheets + Downloadable PDFs', key: 'Interactive Cheat Sheets' },
      { text: 'Upload Notes to Create Quizzes', key: 'Upload Notes' },
    ],
  },
};

export function PurchasePage({ courseType }: PurchasePageProps) {
  const { user } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);
  const [showStickyButton, setShowStickyButton] = useState(false);
  const config = COURSE_CONFIG[courseType];
  const isGreen = config.themeColor === 'green';

  // Show sticky button when scrolling past the main button
  useEffect(() => {
    const handleScroll = () => {
      const mainButton = document.getElementById('main-purchase-button');
      if (mainButton) {
        const rect = mainButton.getBoundingClientRect();
        setShowStickyButton(rect.top < -100); // Show when button is 100px above viewport
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handlePurchase = async () => {
    if (!user) {
      // Handle login redirect or modal
      window.location.href = '/?login=true';
      return;
    }

    setIsLoading(true);
    try {
      // Create season pass checkout session
      const response = await fetch('/api/create-season-pass-checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          purchaseType: courseType, // 'macro' or 'micro'
          userId: user.uid,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create checkout session');
      }

      const { sessionId } = await response.json();
      
      // Redirect to Stripe Checkout
      const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
      if (!stripe) {
        throw new Error('Failed to load Stripe');
      }

      const { error } = await stripe.redirectToCheckout({ sessionId });
      if (error) {
        throw error;
      }
    } catch (error) {
      console.error('Error initiating purchase:', error);
      alert(error instanceof Error ? error.message : 'Failed to start checkout. Please try again.');
      setIsLoading(false);
    }
  };

  // Select 3 reviews for display
  const selectedReviews = reviews.slice(0, 3);

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-white">
      <div className="max-w-7xl mx-auto p-8 lg:p-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
          {/* Left Column - Season Pass Content */}
          <div className="lg:col-span-2 space-y-8 pr-0 lg:pr-12 pb-8 lg:pb-0 border-b lg:border-b-0 lg:border-r-4 border-black">
          {/* Badge */}
          <div className="inline-block">
            <span className={`px-5 py-2.5 ${isGreen ? 'bg-green-600' : 'bg-blue-600'} text-white font-bold text-sm uppercase tracking-wider border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rounded-lg`}>
              {config.badge}
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl lg:text-6xl font-extrabold text-black leading-tight">
            {config.headline.split('AP ').map((part, index) => {
              if (index === 0) return part;
              const courseName = part.split(' ')[0]; // Get "Macro" or "Micro"
              const rest = part.substring(courseName.length);
              return (
                <React.Fragment key={index}>
                  AP{' '}
                  <span className={isGreen ? 'text-green-600' : 'text-blue-600'}>
                    {courseName}
                  </span>
                  {rest}
                </React.Fragment>
              );
            })}
          </h1>

          {/* Bundle Upsell Banner */}
          <div className="w-full p-4 bg-yellow-50 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            {/* Left Side */}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <Sparkles className="w-5 h-5 text-yellow-600" />
                <h3 className="text-lg font-bold text-gray-900">
                  Taking both exams?
                </h3>
              </div>
              <p className="text-gray-700 text-sm">
                Get the Macro + Micro Bundle for just $49.
              </p>
            </div>
            {/* Right Side */}
            <Link
              href="/purchase/bundle"
              className="bg-white border-2 border-black hover:bg-gray-100 font-bold px-4 py-2 text-sm transition-colors whitespace-nowrap flex-shrink-0"
            >
              View Bundle
            </Link>
          </div>

          {/* Price Section */}
          <div className="space-y-2">
            <p className="text-lg font-semibold text-gray-700">
              One-time payment of
            </p>
            <div className="flex items-baseline gap-3">
              <span className={`text-6xl font-extrabold ${isGreen ? 'text-green-600' : 'text-blue-600'}`}>
                ${config.price}
              </span>
              <span className="text-lg text-gray-400 line-through ml-2">
                $39
              </span>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              Valid until June 30th, 2026
            </p>
          </div>

          {/* Star Rating */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <span className="text-sm font-medium text-gray-600">
              500+ Students Trained
            </span>
          </div>

          {/* Benefits Stack */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-black mb-4">
              What's Included:
            </h2>
            <ul className="space-y-3">
              {config.features.map((benefit, index) => {
                const parts = benefit.text.split(benefit.key);
                return (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle2 className={`w-6 h-6 flex-shrink-0 mt-0.5 ${isGreen ? 'text-green-600' : 'text-blue-600'}`} />
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
          <div className="pt-8" id="main-purchase-button">
            <motion.button
              onClick={handlePurchase}
              disabled={isLoading}
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full text-white font-extrabold text-xl py-6 px-8 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 uppercase tracking-wide disabled:opacity-50 disabled:cursor-not-allowed ${
                isGreen 
                  ? 'bg-green-600 hover:bg-green-700' 
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {isLoading ? 'Processing...' : 'UNLOCK INSTANT ACCESS'}
            </motion.button>

            {/* Trust Elements */}
            <p className="text-xs text-gray-500 text-center mt-4 flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-gray-400" />
              100% Money-Back Guarantee
            </p>
          </div>
          </div>

          {/* Right Column - Reviews */}
          <div className="lg:col-span-1 pl-0 lg:pl-12">
            <div className="lg:sticky lg:top-8 space-y-6">
              {selectedReviews.map((review, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + (index * 0.1), duration: 0.5 }}
                  className="bg-white border-4 border-black rounded-3xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6"
                >
                  {/* Stars */}
                  <div className="flex items-center justify-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4 + (i * 0.1), type: "spring", stiffness: 200 }}
                        whileHover={{ scale: 1.2, rotate: 15 }}
                      >
                        <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      </motion.div>
                    ))}
                  </div>

                  {/* Review Text */}
                  <p className="text-base font-semibold text-gray-900 text-center mb-4 leading-relaxed">
                    "{review.text}"
                  </p>

                  {/* Reviewer Info */}
                  <div className="text-center">
                    <p className="font-bold text-gray-900 text-sm">
                      {review.author}
                    </p>
                    {review.badge && (
                      <p className="text-xs font-semibold text-blue-600 mt-1">
                        {review.badge}
                      </p>
                    )}
                    {review.title && (
                      <p className="text-xs text-gray-600 mt-1">
                        {review.title}
                      </p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Sticky CTA Button (appears when scrolling past main button) */}
      <AnimatePresence>
        {showStickyButton && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t-4 border-black shadow-[0_-4px_0px_0px_rgba(0,0,0,1)] p-4 lg:px-8"
          >
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            <div className="hidden sm:block">
              <p className="text-sm font-semibold text-gray-900">
                Ready to unlock instant access?
              </p>
              <p className="text-xs text-gray-600">
                ${config.price} • Valid until June 30th, 2026
              </p>
            </div>
            <motion.button
              onClick={handlePurchase}
              disabled={isLoading}
              whileTap={{ scale: 0.98 }}
              className={`flex-shrink-0 text-white font-extrabold text-lg py-4 px-8 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 uppercase tracking-wide disabled:opacity-50 disabled:cursor-not-allowed ${
                isGreen 
                  ? 'bg-green-600 hover:bg-green-700' 
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {isLoading ? 'Processing...' : 'UNLOCK INSTANT ACCESS'}
            </motion.button>
          </div>
        </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}














