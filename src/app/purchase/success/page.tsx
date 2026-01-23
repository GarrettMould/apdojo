'use client';

import React, { Suspense, useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { CheckCircle, ArrowRight, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuthContext } from '@/contexts/AuthContext';
import { getPracticeTestsUrl } from '@/lib/utils';

function SuccessContent() {
  const searchParams = useSearchParams();
  const { selectedSubject } = useAuthContext();

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
