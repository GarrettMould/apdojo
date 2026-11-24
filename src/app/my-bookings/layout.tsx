import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import { FEATURES } from '@/lib/featureFlags';

export const metadata: Metadata = {
  title: 'My Bookings',
  robots: { index: false, follow: false },
};

export default function MyBookingsLayout({ children }: { children: ReactNode }) {
  if (!FEATURES.tutoring) notFound();
  return children;
}
