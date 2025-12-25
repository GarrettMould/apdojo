'use client';

import { useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Loader2 } from 'lucide-react';

function SeasonPassRedirectContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const courseType = searchParams.get('courseType') || 'macro';
    router.replace(`/purchase/season-pass?courseType=${courseType}`);
  }, [router, searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Loader2 className="h-12 w-12 animate-spin text-blue-500" />
    </div>
  );
}

export default function SeasonPassRedirect() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-blue-500" />
      </div>
    }>
      <SeasonPassRedirectContent />
    </Suspense>
  );
}

