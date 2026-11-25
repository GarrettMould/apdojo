'use client';

import type { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { useAuthContext } from '@/contexts/AuthContext';
import { isAdminUserData } from '@/lib/isAdmin';
import { dojoButtonPrimary, dojoCard } from './dojoStyles';

/** Shows its children only to admins. The API checks again on every request; this just hides the UI. */
export default function AdminGate({ children }: { children: ReactNode }) {
  const { user, userData, loading, loadingUserData } = useAuthContext();
  const pathname = usePathname();

  if (loading || (user && loadingUserData)) {
    return (
      <div className="flex items-center justify-center gap-2 py-16 font-semibold text-slate-500">
        <Loader2 className="h-5 w-5 animate-spin" aria-hidden /> Loading…
      </div>
    );
  }
  if (!user) {
    return (
      <div className={`${dojoCard} flex flex-col items-start gap-4 p-6`}>
        <p className="font-medium text-slate-700">Log in to see the tutor pages.</p>
        <Link href={`/login?redirect=${encodeURIComponent(pathname)}`} className={dojoButtonPrimary}>
          Log in
        </Link>
      </div>
    );
  }
  if (!isAdminUserData(userData)) {
    return <p className="py-16 text-center font-semibold text-slate-600">This page is only for tutors.</p>;
  }
  return <>{children}</>;
}
