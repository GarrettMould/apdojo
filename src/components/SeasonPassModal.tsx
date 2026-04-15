'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, Zap, Sparkles } from 'lucide-react';
import { loadStripe } from '@stripe/stripe-js';
import { useAuthContext } from '@/contexts/AuthContext';

interface SeasonPassModalProps {
  subject: 'macro' | 'micro';
  onClose: () => void;
}

const FEATURES = [
  { text: 'Full Practice Exams (2026 CED)' },
  { text: 'Endless AP-Style MCQ Bank' },
  { text: 'AI-Graded FRQs with Graphing Help' },
  { text: 'Interactive Graphing Simulators' },
  { text: 'Cheat Sheets + Downloadable PDFs' },
  { text: 'Upload Notes to Create Quizzes' },
];

export function SeasonPassModal({ subject, onClose }: SeasonPassModalProps) {
  const { user } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);
  const [isBundleLoading, setIsBundleLoading] = useState(false);

  const isGreen = subject === 'micro';
  const accentBgClass = isGreen ? 'bg-green-600 hover:bg-green-700 border-green-800' : 'bg-blue-600 hover:bg-blue-700 border-blue-800';
  const accentPillClass = isGreen ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800';
  const subjectLabel = subject === 'macro' ? 'Macro' : 'Micro';

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  const handleCheckout = async (type: 'macro' | 'micro' | 'bundle') => {
    const setLoading = type === 'bundle' ? setIsBundleLoading : setIsLoading;
    setLoading(true);
    try {
      const response = await fetch('/api/create-season-pass-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ purchaseType: type, userId: user?.uid, cancelUrl: window.location.href }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create checkout session');
      }
      const { sessionId } = await response.json();
      const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
      if (!stripe) throw new Error('Failed to load Stripe');
      const { error } = await stripe.redirectToCheckout({ sessionId });
      if (error) throw error;
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Failed to start checkout. Please try again.');
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[10060] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
        onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: 'spring', stiffness: 320, damping: 28 }}
          className="relative w-full max-w-xl overflow-hidden rounded-2xl border-4 border-black bg-white shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]"
          onClick={(e) => e.stopPropagation()}
        >
          <div className={`h-2 w-full border-b-2 border-black ${isGreen ? 'bg-green-500' : 'bg-blue-500'}`} />

          <div className="p-6 sm:p-8">
          <button
            onClick={onClose}
              className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border-2 border-black bg-white text-gray-700 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-gray-100"
            >
              <X size={14} />
          </button>

            <div className="space-y-6">
              <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-black uppercase tracking-wider ${accentPillClass}`}>
                <Zap className="h-3.5 w-3.5" />
                AP {subjectLabel} Season Pass
              </span>

              <div>
                <h2 className="text-3xl font-black leading-tight text-black sm:text-4xl">
                  Keep Going.
                  <br />
                  <span className={isGreen ? 'text-green-600' : 'text-blue-600'}>
                    Unlock the exam experience
                  </span>
                </h2>
              </div>

              <div className="rounded-xl border-2 border-black bg-gray-50 p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <ul className="space-y-2.5">
                  {FEATURES.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <CheckCircle2 className={`mt-0.5 h-4 w-4 shrink-0 ${isGreen ? 'text-green-600' : 'text-blue-600'}`} />
                      <span className="text-sm font-semibold text-gray-800">{feature.text}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-3">
                <div className="flex items-end gap-2">
                  <span className={`text-4xl font-black leading-none ${isGreen ? 'text-green-600' : 'text-blue-600'}`}>$29</span>
                  <span className="text-xl font-semibold text-gray-400 line-through">$39</span>
                </div>
                <p className="text-xs font-medium text-gray-500">One-time payment - valid through June 30, 2026</p>

                <button
                  onClick={() => handleCheckout(subject)}
                  disabled={isLoading}
                  className={`w-full rounded-xl border-4 py-4 text-base font-black text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-y-[-1px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] disabled:opacity-70 ${accentBgClass}`}
                >
                  {isLoading ? 'Processing...' : `Unlock AP ${subjectLabel} - $29`}
                </button>

                <button
                  onClick={() => handleCheckout('bundle')}
                  disabled={isBundleLoading}
                  className="w-full rounded-xl border-2 border-black bg-amber-100 px-4 py-3 text-sm font-black text-amber-900 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:bg-amber-200 disabled:opacity-70"
                >
                  <span className="inline-flex items-center gap-1.5">
                    <Sparkles className="h-4 w-4" />
                    {isBundleLoading ? 'Processing...' : 'Need both? Get Macro + Micro Bundle - $49'}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
