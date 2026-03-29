'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { EmbeddedCheckoutPage } from '@/components/EmbeddedCheckoutPage';
import { Loader2 } from 'lucide-react';

function PurchaseSeasonPassContent() {
  const searchParams = useSearchParams();
  const courseType = (searchParams.get('courseType') as 'macro' | 'micro' | 'bundle') || 'macro';
  return <EmbeddedCheckoutPage courseType={courseType} />;
}

export default function PurchaseSeasonPassPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-blue-500" />
      </div>
    }>
      <PurchaseSeasonPassContent />
    </Suspense>
  );
}
