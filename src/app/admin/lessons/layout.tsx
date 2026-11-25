import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import { FEATURES } from '@/lib/featureFlags';
import AdminGate from './AdminGate';
import { dojoPage } from './dojoStyles';

export const metadata: Metadata = {
  title: 'Lesson Notes',
  robots: { index: false, follow: false },
};

export default function AdminLessonsLayout({ children }: { children: ReactNode }) {
  if (!FEATURES.tutoring) notFound();
  return (
    <div className={dojoPage}>
      <div className="mx-auto flex max-w-4xl flex-col gap-8">
        <AdminGate>{children}</AdminGate>
      </div>
    </div>
  );
}
