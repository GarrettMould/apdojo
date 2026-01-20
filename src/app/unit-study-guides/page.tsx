'use client';

import { useEffect, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '@/contexts/AuthContext';
import { Loader2 } from 'lucide-react';

function UnitStudyGuidesRedirectContent() {
  const router = useRouter();
  const { user, userData, loading: authLoading } = useAuthContext();

  useEffect(() => {
    // Wait for auth to finish loading
    if (authLoading) return;

    // Determine the subject
    let subject: 'macro' | 'micro' = 'macro'; // Default to macro

    if (user && userData?.selectedSubject) {
      // Logged-in user: use their selected subject
      subject = userData.selectedSubject;
    } else if (!user && typeof window !== 'undefined') {
      // Guest user: check localStorage
      const guestSubject = localStorage.getItem('guestAPSubject') as 'macro' | 'micro' | null;
      if (guestSubject) {
        subject = guestSubject;
      }
    }

    // Redirect to the appropriate cheat sheet page
    const destination = subject === 'macro' 
      ? '/ap-macro-unit-1-cheat-sheet'
      : '/ap-micro-unit-1-cheat-sheet';
    
    router.replace(destination);
  }, [router, user, userData, authLoading]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Loader2 className="h-12 w-12 animate-spin text-blue-500" />
    </div>
  );
}

export default function UnitStudyGuidesRedirect() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-blue-500" />
      </div>
    }>
      <UnitStudyGuidesRedirectContent />
    </Suspense>
  );
}

