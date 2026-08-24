'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '@/contexts/AuthContext';
import { tutoringPagePath } from '@/data/tutoringPages';

/** Legacy `/tutoring` → subject-specific template based on active course. */
export default function TutoringIndexRedirect() {
  const router = useRouter();
  const { selectedSubject } = useAuthContext();

  useEffect(() => {
    router.replace(tutoringPagePath(selectedSubject ?? 'macro'));
  }, [router, selectedSubject]);

  return (
    <div className="flex min-h-[50vh] items-center justify-center bg-gray-50">
      <p className="text-sm font-semibold text-gray-600">Opening tutoring…</p>
    </div>
  );
}
