'use client';

import { useCallback, useEffect, useState, type ReactNode } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { useAuthContext } from '@/contexts/AuthContext';
import ProgressReportView from '@/components/progress/ProgressReportView';
import type { StudentProgress } from '@/lib/studentProgress';
import { dojoButtonSecondary, dojoCard, dojoLabel } from '../../lessons/dojoStyles';

export default function StudentProgressPage() {
  const { uid } = useParams<{ uid: string }>();
  const { user } = useAuthContext();
  const [progress, setProgress] = useState<StudentProgress | null>(null);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!user) return;
    setError(null);
    try {
      const token = await user.getIdToken();
      const res = await fetch(`/api/admin/students?uid=${encodeURIComponent(uid)}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.status === 404) throw new Error('No account found for this student.');
      if (!res.ok) throw new Error('We couldn’t load this report.');
      setProgress(((await res.json()) as { progress: StudentProgress }).progress);
    } catch (err) {
      console.error('Failed to load progress:', err);
      setError(err instanceof Error ? err.message : 'We couldn’t load this report.');
    }
  }, [user, uid]);

  useEffect(() => {
    void load();
  }, [load]);

  let content: ReactNode;
  if (error) {
    content = (
      <div className={`${dojoCard} flex flex-col items-start gap-4 p-6`}>
        <p className="font-medium text-slate-700">{error}</p>
        <button type="button" onClick={() => void load()} className={dojoButtonSecondary}>
          Try again
        </button>
      </div>
    );
  } else if (!progress) {
    content = (
      <div className="flex items-center justify-center gap-2 py-16 font-semibold text-slate-500">
        <Loader2 className="h-5 w-5 animate-spin" aria-hidden /> Building the report…
      </div>
    );
  } else if (progress.courses.length === 0) {
    content = (
      <p className={`${dojoCard} p-6 font-medium text-slate-700`}>
        No practice or lesson ratings yet. This fills in as they answer questions on the site.
      </p>
    );
  } else {
    content = <ProgressReportView progress={progress} audience="tutor" />;
  }

  return (
    <>
      <div className="flex flex-col gap-3">
        <Link href="/admin/students" className="inline-flex w-fit items-center gap-1.5 text-sm font-bold text-slate-500 hover:text-slate-900">
          <ArrowLeft className="h-4 w-4" aria-hidden /> All students
        </Link>
        <span className={`${dojoLabel} mt-2`}>Progress report</span>
        <h1 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
          {progress?.name ?? progress?.email ?? (progress ? 'Student' : ' ')}
        </h1>
        {progress?.email && progress.name ? <p className="font-medium text-slate-500">{progress.email}</p> : null}
      </div>
      {content}
    </>
  );
}
