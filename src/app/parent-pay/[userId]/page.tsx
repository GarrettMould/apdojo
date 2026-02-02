'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { loadStripe } from '@stripe/stripe-js';
import { ShieldCheck, CreditCard, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ParentPayPage() {
  const params = useParams();
  const userId = typeof params.userId === 'string' ? params.userId : null;
  const [studentName, setStudentName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [payLoading, setPayLoading] = useState(false);

  useEffect(() => {
    if (!userId) {
      setError('Invalid link');
      setLoading(false);
      return;
    }
    fetch(`/api/user-public-info?userId=${encodeURIComponent(userId)}`)
      .then((res) => {
        if (!res.ok) {
          if (res.status === 404) throw new Error('Student not found');
          throw new Error('Something went wrong');
        }
        return res.json();
      })
      .then((data: { displayName?: string; email?: string | null }) => {
        setStudentName(data.displayName ?? 'Student');
        setError(null);
      })
      .catch((e) => {
        setError(e instanceof Error ? e.message : 'Something went wrong');
        setStudentName(null);
      })
      .finally(() => setLoading(false));
  }, [userId]);

  const handlePayNow = async () => {
    if (!userId) return;
    setPayLoading(true);
    try {
      const res = await fetch('/api/create-season-pass-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          purchaseType: 'bundle',
          userId,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to start checkout');
      const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
      if (!stripe) throw new Error('Payment system unavailable');
      const { error: stripeError } = await stripe.redirectToCheckout({ sessionId: data.sessionId });
      if (stripeError) throw stripeError;
    } catch (e) {
      console.error(e);
      alert(e instanceof Error ? e.message : 'Failed to start checkout. Please try again.');
      setPayLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-10 w-10 animate-spin text-indigo-600" />
          <p className="font-semibold text-slate-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (error || !studentName) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-slate-200 p-8 text-center">
          <p className="text-slate-700 font-semibold">{error ?? 'Student not found'}</p>
          <p className="text-sm text-slate-500 mt-2">This link may be invalid or expired.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
        <div className="bg-indigo-600 px-6 py-8 text-center">
          <h1 className="text-2xl font-bold text-white">
            Upgrade {studentName}&apos;s Account
          </h1>
          <p className="text-indigo-100 mt-2 font-medium">
            AP Dojo Season Pass
          </p>
        </div>
        <div className="p-8 space-y-6">
          <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl border border-slate-100">
            <div className="p-2 rounded-full bg-indigo-100 text-indigo-600">
              <CreditCard className="h-5 w-5" />
            </div>
            <div>
              <p className="font-bold text-slate-900">AP Dojo Season Pass</p>
              <p className="text-2xl font-extrabold text-slate-900">$29</p>
              <p className="text-sm text-slate-600">Full access to practice exams and study tools</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <ShieldCheck className="h-5 w-5 text-green-600 flex-shrink-0" />
            <span>Secure payment by Stripe. Your card is not stored on our servers.</span>
          </div>
          <Button
            className="w-full py-6 text-lg font-bold bg-indigo-600 hover:bg-indigo-700"
            onClick={handlePayNow}
            disabled={payLoading}
          >
            {payLoading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Starting checkout...
              </>
            ) : (
              <>
                <CreditCard className="mr-2 h-5 w-5" />
                Pay Now with Card
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
