'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, Suspense } from 'react';
import { GuestSubjectSelector } from '@/components/GuestSubjectSelector';
import { Loader2 } from 'lucide-react';

function SelectGuestSubjectContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPattern = searchParams.get('redirectPattern');

  const handleSubjectSelect = (subject: 'micro' | 'macro') => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('guestAPSubject', subject);
    }

    if (redirectPattern) {
      const finalRedirectUrl = decodeURIComponent(redirectPattern).replace('{subject}', subject);
      router.push(finalRedirectUrl);
    } else {
      // Fallback if no redirectPattern is provided (e.g., direct navigation to this page)
      router.push('/'); 
    }
  };

  // Immediate redirect if guest already has a subject set
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const existingGuestSubject = localStorage.getItem('guestAPSubject');
      if (existingGuestSubject && redirectPattern) {
        const finalRedirectUrl = decodeURIComponent(redirectPattern).replace('{subject}', existingGuestSubject);
        router.replace(finalRedirectUrl); // Use replace to not add this page to history
        return; // Exit early to prevent rendering the component
      } else if (existingGuestSubject && !redirectPattern) {
        router.replace('/'); // Or to a guest dashboard if you have one
        return; // Exit early to prevent rendering the component
      }
    }
  }, [router, redirectPattern]);

  // Don't render anything if we're redirecting
  if (typeof window !== 'undefined' && localStorage.getItem('guestAPSubject') && redirectPattern) {
    return null;
  }

  return <GuestSubjectSelector onSubjectSelect={handleSubjectSelect} />;
}

export default function SelectGuestSubjectPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500"/>
      </div>
    }>
      <SelectGuestSubjectContent />
    </Suspense>
  );
} 