'use client';

import { Suspense, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '@/contexts/AuthContext';
import { getFullMCQExamPreviewUrl } from '@/lib/utils';

function FullMCQExamRedirect() {
  const router = useRouter();
  const { selectedSubject } = useAuthContext();
  const subject = selectedSubject === 'micro' ? 'micro' : 'macro';

  useEffect(() => {
    router.replace(getFullMCQExamPreviewUrl(subject, 1));
  }, [router, subject]);

  return (
    <div className="flex min-h-[50vh] items-center justify-center text-slate-500">
      Loading exam…
    </div>
  );
}

export default function FullMCQExamPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[50vh] items-center justify-center text-slate-500">
          Loading exam…
        </div>
      }
    >
      <FullMCQExamRedirect />
    </Suspense>
  );
}
