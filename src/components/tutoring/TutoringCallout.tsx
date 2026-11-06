'use client';

import Link from 'next/link';

/** Quiet link to /tutoring on Season Pass purchase pages and the thank-you page. Presentational only. */
export function TutoringCallout({ placement, className = '' }: { placement: string; className?: string }) {
  return (
    <p className={`text-sm text-gray-500 ${className}`} data-placement={placement}>
      Want 1-on-1 help?{' '}
      <Link
        href="/tutoring"
        className="font-medium text-gray-700 underline decoration-dotted underline-offset-4 hover:text-blue-600"
      >
        Book a session with Garrett.
      </Link>
    </p>
  );
}
