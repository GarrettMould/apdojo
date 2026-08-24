'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Star, ShieldCheck } from 'lucide-react';
import { loadStripe } from '@stripe/stripe-js';
import { useAuthContext } from '@/contexts/AuthContext';
import { ParentPaymentModal } from '@/components/ParentPaymentModal';
import { reviews } from '@/data/reviews';

export function BundlePurchasePage() {
  const { user, setShowSignupModal, setRedirectOnLogin } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);
  const [showParentPaymentModal, setShowParentPaymentModal] = useState(false);

  const handlePurchase = async () => {
    if (!user) {
      // If not logged in, remember this page and open signup so we can return here after account creation
      const currentPath =
        typeof window !== 'undefined'
          ? window.location.pathname + window.location.search
          : '/purchase/bundle';
      setRedirectOnLogin(currentPath);
      setShowSignupModal(true);
      return;
    }

    setIsLoading(true);
    try {
      // Create bundle checkout session
      const response = await fetch('/api/create-season-pass-checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          purchaseType: 'bundle',
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

  const features = [
    { text: 'Full Practice Exams based on 2026 AP Macro & Micro CED', key: 'Full Practice Exams' },
    { text: 'Endless AP-Style MCQ Bank', key: 'Endless' },
    { text: 'AI-Graded FRQs with Graphing Help', key: 'AI-Graded' },
    { text: 'Interactive Graphing Simulators', key: 'Interactive Graphing Simulators' },
    { text: 'Interactive Cheat Sheets + Downloadable PDFs', key: 'Interactive Cheat Sheets' },
    { text: 'Upload Notes to Create Quizzes', key: 'Upload Notes' },
  ];

  return (
    <div className="min-h-[calc(100vh-5rem)] bg-white">
      <div className="max-w-7xl mx-auto p-8 lg:p-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
          {/* Left Column - Bundle Content */}
          <div className="lg:col-span-2 space-y-8 pr-0 lg:pr-12 pb-8 lg:pb-0 border-b lg:border-b-0 lg:border-r-4 border-black">
            {/* Badge */}
            <div className="inline-block">
              <span className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-green-600 text-white font-bold text-sm uppercase tracking-wider border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rounded-lg">
                AP MACRO + MICRO BUNDLE
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-5xl lg:text-6xl font-extrabold text-black leading-tight">
              The Complete AP{' '}
              <span className="text-blue-600">Macro</span>
              {' + '}
              <span className="text-green-600">Micro</span>
              {' '}Toolkit for a 5.
            </h1>

            {/* Price Section */}
            <div className="space-y-2">
              <p className="text-lg font-semibold text-gray-700">
                One-time payment of
              </p>
              <div className="flex items-baseline gap-3">
                <span className="text-6xl font-extrabold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                  $49
                </span>
                <span className="text-lg text-gray-400 line-through ml-2">
                  $58
                </span>
              </div>
              <p className="text-sm text-gray-600 mt-2">
                Valid until June 30, 2027
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
                500+ Students Tutored
              </span>
            </div>

            {/* Benefits Stack */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-black mb-4">
                What's Included:
              </h2>
              <ul className="space-y-3">
                {features.map((benefit, index) => {
                  const parts = benefit.text.split(benefit.key);
                  return (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <CheckCircle2 className="w-6 h-6 flex-shrink-0 mt-0.5 text-purple-600" />
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
            <div className="pt-8">
              <motion.button
                onClick={handlePurchase}
                disabled={isLoading}
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.98 }}
                className="w-full text-white font-extrabold text-xl py-6 px-8 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 uppercase tracking-wide disabled:opacity-50 disabled:cursor-not-allowed bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
              >
                {isLoading ? 'Processing...' : 'UNLOCK INSTANT ACCESS'}
              </motion.button>

              {/* Trust Elements */}
              <p className="text-xs text-gray-500 text-center mt-4 flex items-center justify-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-gray-400" />
                100% Money-Back Guarantee
              </p>

              {/* Parent Payment CTA */}
              <button
                type="button"
                onClick={() => {
                  if (!user) {
                    setRedirectOnLogin('/purchase/bundle');
                    setShowSignupModal(true);
                    return;
                  }
                  setShowParentPaymentModal(true);
                }}
                className="mt-4 w-full flex items-center justify-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors group"
              >
                <span>Don&apos;t have a credit card?</span>
                <span className="underline decoration-dotted underline-offset-4 group-hover:text-blue-600 font-medium">
                  Email cart to parent
                </span>
              </button>
            </div>
          </div>

          {user && (
            <ParentPaymentModal
              open={showParentPaymentModal}
              onOpenChange={setShowParentPaymentModal}
              studentName={user.displayName || user.email?.split('@')[0] || 'Student'}
              studentId={user.uid}
              product="bundle"
            />
          )}

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
    </div>
  );
}

