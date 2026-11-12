'use client';

import Link from 'next/link';
import { trackEvent } from '@/lib/analytics';
import { FEATURES } from '@/lib/featureFlags';
import { TUTOR } from '@/data/tutoring';

/** Quiet link to /tutoring on Season Pass purchase pages and the thank-you page; tracks clicks by placement. */
export function TutoringCallout({ placement, className = '' }: { placement: string; className?: string }) {
  if (!FEATURES.tutoring) return null;
  return (
    <p className={`text-sm text-gray-500 ${className}`} data-placement={placement}>
      Want 1-on-1 help?{' '}
      <Link
        href="/tutoring"
        onClick={() => void trackEvent('tutoring_callout_click', { placement })}
        className="font-medium text-gray-700 underline decoration-dotted underline-offset-4 hover:text-blue-600"
      >
        Book a session with {TUTOR.name}
      </Link>
    </p>
  );
}
