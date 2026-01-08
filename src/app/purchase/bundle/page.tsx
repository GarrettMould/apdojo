'use client';

import { Suspense } from 'react';
import { BundlePurchasePage } from '@/components/BundlePurchasePage';
import { Loader2 } from 'lucide-react';

function LoadingFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Loader2 className="h-12 w-12 animate-spin text-blue-500" />
    </div>
  );
}

export default function BundlePurchasePageRoute() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <BundlePurchasePage />
    </Suspense>
  );
}



