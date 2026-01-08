'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { PurchasePage } from '@/components/PurchasePage';
import { Loader2 } from 'lucide-react';

function PurchaseSeasonPassContent() {
  const searchParams = useSearchParams();
  const courseType = (searchParams.get('courseType') as 'macro' | 'micro') || 'macro';

  return <PurchasePage courseType={courseType} />;
}

function LoadingFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Loader2 className="h-12 w-12 animate-spin text-blue-500" />
    </div>
  );
}

export default function PurchaseSeasonPassPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <PurchaseSeasonPassContent />
    </Suspense>
  );
}






