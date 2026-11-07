'use client';

import { useEffect, type ReactNode } from 'react';
import { trackEvent } from '@/lib/analytics';

/** Fires `tutoring_page_view` once per visit to /tutoring. */
export function TutoringPageView() {
  useEffect(() => {
    void trackEvent('tutoring_page_view');
  }, []);
  return null;
}

/** "Book a session" anchor that scrolls to the booking section and fires `tutoring_book_click`. */
export function TutoringBookLink({
  source,
  className,
  children,
}: {
  source: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <a href="#book" className={className} onClick={() => void trackEvent('tutoring_book_click', { source })}>
      {children}
    </a>
  );
}
