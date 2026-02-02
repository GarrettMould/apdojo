'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import { loadStripe } from '@stripe/stripe-js';
import { motion } from 'framer-motion';
import { ShieldCheck, CheckCircle2, Loader2, Star, Trophy, ChevronRight } from 'lucide-react';

// Initialize Stripe
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

// CONFIGURATION — listPrice = price before discount; discount = listPrice - price
const PRODUCTS = {
  bundle: {
    name: 'The Ultimate AP Bundle',
    price: 49,
    listPrice: 58,
    features: [
      'Access to BOTH Macro & Micro Courses',
      '2,000+ AP-Style Practice Questions',
      'AI-Graded FRQ Simulators',
      'Unlimited Practice Exams',
    ]
  },
  macro: {
    name: 'AP Macro Season Pass',
    price: 29,
    listPrice: 39,
    features: [
      'Full AP Macro Practice Exams',
      'Targeted Unit Quizzes',
      'Interactive Graphing Drills',
      'AI-Powered FRQ Grading',
    ]
  },
  micro: {
    name: 'AP Micro Season Pass',
    price: 29,
    listPrice: 39,
    features: [
      'Full AP Micro Practice Exams',
      'Targeted Unit Quizzes',
      'Interactive Graphing Drills',
      'AI-Powered FRQ Grading',
    ]
  },
};

export default function ParentPayPage() {
  const params = useParams();
  const searchParams = useSearchParams();

  // 1. Determine Product based on URL (?product=bundle)
  const productSlug = searchParams.get('product');
  const productKey = (productSlug === 'bundle' || productSlug === 'micro') ? productSlug : 'macro';
  const product = PRODUCTS[productKey as keyof typeof PRODUCTS];

  // 2. State
  const userId = typeof params.userId === 'string' ? params.userId : null;
  const [studentEmail, setStudentEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [payLoading, setPayLoading] = useState(false);

  // 3. Fetch Student Info (email from Firebase via /api/user-public-info)
  useEffect(() => {
    if (!userId) {
      setError('Invalid link');
      setLoading(false);
      return;
    }
    fetch(`/api/user-public-info?userId=${encodeURIComponent(userId)}`)
      .then((res) => {
        if (!res.ok) throw new Error('Student not found');
        return res.json();
      })
      .then((data) => {
        setStudentEmail(data.email ?? null);
        setError(null);
      })
      .catch(() => {
        setStudentEmail(null); // Fallback if API fails (don't block payment)
      })
      .finally(() => setLoading(false));
  }, [userId]);

  // 4. Handle Payment
  const handleCheckout = async () => {
    if (!userId) return;
    setPayLoading(true);
    try {
      const response = await fetch('/api/create-season-pass-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          purchaseType: productKey, // 'bundle', 'macro', or 'micro'
          userId,
          isParentGift: true,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        const msg = data.error || data.details || 'Failed to start checkout';
        throw new Error(typeof msg === 'string' ? msg : JSON.stringify(msg));
      }

      const stripe = await stripePromise;
      if (!stripe) throw new Error('Payment system unavailable. Missing Stripe key.');
      if (!data.sessionId) throw new Error('No checkout session received.');
      const result = await stripe.redirectToCheckout({ sessionId: data.sessionId });
      if (result?.error) throw new Error(result.error.message || 'Redirect to payment failed.');
    } catch (e) {
      const message = e instanceof Error ? e.message : 'Payment initialization failed. Please try again.';
      alert(message);
      console.error('Parent pay checkout error:', e);
    } finally {
      setPayLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-black" />
      </div>
    );
  }

  if (error && !userId) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white rounded-2xl border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8 text-center">
          <p className="text-gray-700 font-bold">{error}</p>
          <p className="text-sm text-gray-500 mt-2">This link may be invalid or expired.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFBF7] font-sans selection:bg-yellow-200">

      <div className="max-w-6xl mx-auto p-6 md:p-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">

          {/* LEFT COLUMN: The Invoice (Payment) — same height as right column */}
          <div className="lg:col-span-7 order-1 flex flex-col min-h-0">
            <div className="bg-white border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] rounded-2xl overflow-hidden flex flex-col h-full">

              {/* Header Section */}
              <div className="bg-slate-600 p-8 text-white">
                <div className="flex justify-between items-start">
                  <div>
                    <h1 className="text-3xl font-black uppercase tracking-wide">Invoice</h1>
                    <p className="text-slate-300 mt-1 font-mono text-sm">REF: {userId?.slice(0, 8).toUpperCase()}</p>
                  </div>
                  <div className="text-right hidden sm:block">
                    <p className="font-bold text-green-400">PAYMENT PENDING</p>
                    <p className="text-sm text-slate-300">One-time payment</p>
                  </div>
                </div>
              </div>

              {/* Student account — whose access we're upgrading */}
              <div className="p-8 border-b-2 border-dashed border-gray-300 bg-gray-50">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Student account</p>
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-blue-100 border-2 border-blue-600 flex items-center justify-center flex-shrink-0">
                    <span className="font-bold text-blue-600 text-lg">{studentEmail?.charAt(0)?.toUpperCase() ?? '?'}</span>
                  </div>
                  <div className="min-w-0">
                    <p className="text-xl font-bold text-gray-900 break-all">{studentEmail ?? '—'}</p>
                    <p className="text-sm text-gray-600 mt-0.5">Authorized request for exam prep materials</p>
                  </div>
                </div>
              </div>

              {/* Line Items — list price, then discount, then total */}
              <div className="p-8 space-y-6 flex-1">
                <div className="flex justify-between items-center text-lg">
                  <span className="font-medium text-gray-700">{product.name}</span>
                  <span className="font-bold text-gray-900">${product.listPrice}.00</span>
                </div>
                <div className="flex justify-between items-center text-sm text-green-600">
                  <span className="font-medium">Discount applied</span>
                  <span className="font-bold">-${product.listPrice - product.price}.00</span>
                </div>

                <div className="h-px bg-black my-4"></div>

                <div className="flex justify-between items-end">
                  <span className="font-black text-xl text-gray-900">TOTAL DUE</span>
                  <span className="font-black text-5xl tracking-tight text-blue-600">${product.price}</span>
                </div>

                {/* Fill: What happens next + trust */}
                <div className="pt-6 space-y-4 border-t border-gray-200 mt-6">
                  <p className="text-sm font-bold text-gray-700">What happens next</p>
                  <ol className="text-sm text-gray-600 space-y-2 list-decimal list-inside">
                    <li>Complete payment securely with your card.</li>
                    <li>Your student&apos;s account is upgraded immediately.</li>
                    <li>Receipt and confirmation sent to your email.</li>
                  </ol>
                  <p className="text-xs text-gray-500">
                    Access valid until June 30, 2026. 100% money-back guarantee if not satisfied.
                  </p>
                </div>
              </div>

              {/* Action Button */}
              <div className="p-8 pt-0">
                <motion.button
                  onClick={handleCheckout}
                  disabled={payLoading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-5 bg-black hover:bg-gray-800 text-white rounded-xl font-bold text-xl shadow-lg transition-all flex items-center justify-center gap-3 disabled:opacity-70"
                >
                  {payLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      <span>Complete Payment</span>
                      <ChevronRight className="w-5 h-5 bg-white text-black rounded-full p-0.5" />
                    </>
                  )}
                </motion.button>
                <div className="mt-4 flex justify-center items-center gap-2 text-xs text-gray-400">
                  <ShieldCheck size={14} />
                  <span>Processed securely via Stripe. Receipt sent via email.</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: The Value Proposition */}
          <div className="lg:col-span-5 order-2 space-y-8 flex flex-col">

            {/* Box 1: ROI */}
            <div className="bg-[#E0F2FE] p-8 rounded-2xl border-4 border-blue-500 shadow-[8px_8px_0px_0px_rgba(59,130,246,1)]">
              <div className="flex items-start gap-4">
                <div className="bg-blue-500 text-white p-3 rounded-lg">
                  <Trophy size={24} strokeWidth={3} />
                </div>
                <div>
                  <h3 className="text-xl font-black text-blue-900 leading-none mb-2">The ROI is Massive.</h3>
                  <p className="text-blue-800 leading-relaxed font-medium">
                    A passing score (3+) on an AP Exam can save you <strong>$3,000+</strong> in college tuition credits. This $29 investment pays for itself 100x over.
                  </p>
                </div>
              </div>
            </div>

            {/* Box 2: What's Inside */}
            <div>
              <h3 className="text-2xl font-black text-black mb-6 flex items-center gap-2">
                Included in Season Pass:
              </h3>
              <ul className="space-y-4">
                {product.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 bg-white p-4 rounded-xl border-2 border-black shadow-sm">
                    <CheckCircle2 className="text-green-500 w-6 h-6 flex-shrink-0" />
                    <span className="font-bold text-gray-800">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Box 3: Social Proof */}
            <div className="pt-6 border-t-2 border-gray-200">
              <div className="flex items-center gap-1 mb-2">
                {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-5 h-5 fill-yellow-400 text-black stroke-1" />)}
              </div>
              <p className="text-lg font-bold text-gray-900 italic">
                &quot;My son was failing Unit 3. After two weeks on AP Dojo, he got an A on the midterm. Best money I&apos;ve spent all year.&quot;
              </p>
              <div className="mt-3 flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center font-bold text-gray-500">S</div>
                <div>
                  <p className="text-sm font-bold text-black">Sarah M.</p>
                  <p className="text-xs text-gray-500">Parent from Texas</p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
