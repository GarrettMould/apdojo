'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { loadStripe } from '@stripe/stripe-js';
import { useAuthContext } from '@/contexts/AuthContext';

function PurchaseSeasonPassContent() {
  const searchParams = useSearchParams();
  const courseType = (searchParams.get('courseType') as 'macro' | 'micro') || 'macro';
  const { user } = useAuthContext();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const run = async () => {
      try {
        const response = await fetch('/api/create-season-pass-checkout', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            purchaseType: courseType,
            userId: user?.uid,
            cancelUrl: document.referrer || window.location.origin,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to create checkout session');
        }

        const { sessionId } = await response.json();

        const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
        if (!stripe) {
          throw new Error('Failed to load Stripe');
        }

        const { error } = await stripe.redirectToCheckout({ sessionId });
        if (error) {
          throw error;
        }
      } catch (e) {
        console.error('Error initiating purchase:', e);
        setError(e instanceof Error ? e.message : 'Failed to start checkout. Please try again.');
      }
    };

    run();
  }, [user, courseType]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <Loader2 className="h-12 w-12 animate-spin text-blue-500" />
      <p className="text-sm text-gray-600 font-medium">
        Taking you to secure checkout for the {courseType === 'macro' ? 'AP Macro' : 'AP Micro'} Season Pass…
      </p>
      {error && (
        <p className="text-sm text-red-600 font-medium max-w-md text-center">
          {error}
        </p>
      )}
    </div>
  );
}

export default function PurchaseSeasonPassPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <Loader2 className="h-12 w-12 animate-spin text-blue-500" />
      </div>
    }>
      <PurchaseSeasonPassContent />
    </Suspense>
  );
}






















