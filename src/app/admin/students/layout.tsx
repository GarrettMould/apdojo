import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import { FEATURES } from '@/lib/featureFlags';
import AdminGate from '../lessons/AdminGate';
import { dojoPage } from '../lessons/dojoStyles';

export const metadata: Metadata = {
  title: 'Student Progress',
  robots: { index: false, follow: false },
};

export default function AdminStudentsLayout({ children }: { children: ReactNode }) {
  if (!FEATURES.tutoring) notFound();
  return (
    <div className={dojoPage}>
      <div className="mx-auto flex max-w-5xl flex-col gap-8">
        <AdminGate>{children}</AdminGate>
      </div>
    </div>
  );
}
