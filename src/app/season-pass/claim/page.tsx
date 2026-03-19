'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Loader2, CheckCircle, AlertTriangle, ArrowRight } from 'lucide-react';
import Link from 'next/link';

function SeasonPassClaimContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');

  const [status, setStatus] = useState<'loading' | 'needs_login' | 'ready' | 'error'>('loading');
  const [email, setEmail] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!sessionId) {
      setStatus('error');
      setMessage('Missing Stripe session. Please check your email confirmation or contact support.');
      return;
    }

    const claimPass = async () => {
      try {
        const res = await fetch('/api/claim-season-pass', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sessionId }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Failed to process claim');
        setEmail(data.email);
        setStatus('needs_login');
      } catch (err: any) {
        console.error('Claim error:', err);
        setStatus('error');
        setMessage(err.message || 'Something went wrong. Please contact support.');
      }
    };

    claimPass();
  }, [sessionId]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="max-w-md w-full bg-white border-4 border-black rounded-3xl shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] p-10 text-center space-y-4">
          <Loader2 className="h-12 w-12 mx-auto animate-spin text-blue-500" />
          <p className="text-sm text-gray-600 font-medium">Verifying your Season Pass purchase…</p>
        </div>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="max-w-md w-full bg-white border-4 border-black rounded-3xl shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] p-10 text-center space-y-4">
          <AlertTriangle className="h-12 w-12 mx-auto text-red-500" />
          <h1 className="text-xl font-extrabold text-gray-900">We couldn&apos;t verify your purchase</h1>
          <p className="text-sm text-gray-600">{message}</p>
        </div>
      </div>
    );
  }

  // needs_login or ready both just tell them to log in/sign up with checkout email for now
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white border-4 border-black rounded-3xl shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] p-10 text-center space-y-6">
        <CheckCircle className="h-16 w-16 mx-auto text-green-500" />
        <h1 className="text-2xl font-extrabold text-gray-900">Season Pass Activated (Almost)</h1>
        <p className="text-sm text-gray-700">
          Your payment was successful. To finish unlocking your Season Pass, log in or create an account using the same
          email address you used at checkout. Our system will automatically attach your pass to that account.
        </p>
        {email && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg px-4 py-3 text-sm text-blue-800 font-medium">
            Use this email: <span className="font-extrabold">{email}</span>
          </div>
        )}
        <div className="space-y-4 pt-2">
          <Link
            href="/signup"
            className="inline-flex w-full max-w-full items-center justify-center gap-2 whitespace-nowrap rounded-md bg-blue-600 px-3 py-2 text-xs font-bold text-white border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:bg-blue-700 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all sm:px-4 sm:py-2.5 sm:text-sm"
          >
            Create your AP Dojo account
            <ArrowRight className="h-4 w-4 shrink-0" />
          </Link>
          <p className="text-xs text-gray-600 pt-1">
            Already have an account?{' '}
            <Link href="/login" className="font-semibold text-blue-600 hover:text-blue-700 underline underline-offset-2">
              Log in here
            </Link>
            .
          </p>
        </div>
        <p className="text-[11px] text-gray-400">
          If you don&apos;t see your Season Pass after logging in, please reach out and we&apos;ll fix it manually.
        </p>
      </div>
    </div>
  );
}

export default function SeasonPassClaimPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="max-w-md w-full bg-white border-4 border-black rounded-3xl shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] p-10 text-center space-y-4">
          <Loader2 className="h-12 w-12 mx-auto animate-spin text-blue-500" />
          <p className="text-sm text-gray-600 font-medium">Verifying your Season Pass purchase…</p>
        </div>
      </div>
    }>
      <SeasonPassClaimContent />
    </Suspense>
  );
}

