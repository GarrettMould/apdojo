'use client';

import React, { Suspense, useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { CheckCircle, ArrowRight, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuthContext } from '@/contexts/AuthContext';
import { getPracticeTestsUrl } from '@/lib/utils';

function SuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { selectedSubject } = useAuthContext();
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [redirectUrl, setRedirectUrl] = useState<string | null>(null);

  // Check for redirect_after_purchase on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedRedirectUrl = localStorage.getItem('redirect_after_purchase');
      if (savedRedirectUrl) {
        setRedirectUrl(savedRedirectUrl);
        setIsRedirecting(true);
        
        // Wait 2-3 seconds then redirect
        const redirectTimer = setTimeout(() => {
          // Clear only redirect_after_purchase, NOT guest_quiz_progress
          localStorage.removeItem('redirect_after_purchase');
          router.push(savedRedirectUrl);
        }, 2500); // 2.5 seconds

        return () => clearTimeout(redirectTimer);
      }
    }
  }, [router]);

  // If redirecting, show redirect message
  if (isRedirecting && redirectUrl) {
    return (
      <div className="max-w-md w-full space-y-8 text-center bg-white p-10 rounded-xl shadow-lg">
        <Loader2 className="mx-auto h-16 w-16 text-blue-500 animate-spin" />
        <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Payment Successful!</h2>
        <p className="mt-2 text-md text-gray-600">
          Taking you back to your test...
        </p>
      </div>
    );
  }

  // Simplified success message for logged-in users
  return (
    <div className="max-w-md w-full space-y-8 text-center bg-white p-10 rounded-xl shadow-lg">
      <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
      <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Payment Successful!</h2>
      <p className="mt-2 text-md text-gray-600">
        The practice test has been added to your account.
      </p>
      <div className="mt-8">
        <Link href={getPracticeTestsUrl(selectedSubject)} passHref>
          <Button className="w-full">
            Go to Practice Tests
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default function PurchaseSuccessPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <Suspense fallback={<Loader2 className="h-12 w-12 animate-spin text-blue-500" />}>
        <SuccessContent />
      </Suspense>
    </div>
  );
}
