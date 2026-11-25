'use client';

import { useCallback, useEffect, useState, type ReactNode } from 'react';
import Link from 'next/link';
import { ArrowRight, Loader2 } from 'lucide-react';
import { useAuthContext } from '@/contexts/AuthContext';
import ProgressReportView from '@/components/progress/ProgressReportView';
import type { StudentProgress } from '@/lib/studentProgress';

const card = 'rounded-3xl border border-slate-200 bg-white shadow-[0_1px_3px_rgba(15,23,42,0.06)]';
const primaryButton =
  'inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-blue-700';
const secondaryButton =
  'inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 transition hover:bg-slate-50';

/** The signed-in student's own progress, from the questions they answer on the site and their tutor's notes. */
export default function ProgressPage() {
  const { user, loading } = useAuthContext();
  const [progress, setProgress] = useState<StudentProgress | null>(null);
  const [error, setError] = useState(false);

  const load = useCallback(async () => {
    if (!user) return;
    setError(false);
    try {
      const token = await user.getIdToken();
      const res = await fetch('/api/progress', { headers: { Authorization: `Bearer ${token}` } });
      if (!res.ok) throw new Error(`Request failed: ${res.status}`);
      setProgress(((await res.json()) as { progress: StudentProgress }).progress);
    } catch (err) {
      console.error('Failed to load progress:', err);
      setError(true);
    }
  }, [user]);

  useEffect(() => {
    void load();
  }, [load]);

  let content: ReactNode;
  if (loading || (user && !progress && !error)) {
    content = (
      <div className="flex items-center justify-center gap-2 py-16 font-semibold text-slate-500">
        <Loader2 className="h-5 w-5 animate-spin" aria-hidden /> Loading your progress…
      </div>
    );
  } else if (!user) {
    content = (
      <div className={`${card} flex flex-col items-start gap-4 p-6`}>
        <p className="text-slate-700">Log in to see your progress.</p>
        <Link href="/login?redirect=/progress" className={primaryButton}>
          Log in
        </Link>
      </div>
    );
  } else if (error || !progress) {
    content = (
      <div className={`${card} flex flex-col items-start gap-4 p-6`}>
        <p className="text-slate-700">We couldn&apos;t load your progress. Please try again.</p>
        <button type="button" onClick={() => void load()} className={secondaryButton}>
          Try again
        </button>
      </div>
    );
  } else if (progress.courses.length === 0) {
    content = (
      <div className={`${card} flex flex-col items-start gap-4 p-6`}>
        <p className="text-slate-700">Answer a few practice questions and your progress will show up here, lesson by lesson.</p>
        <Link href="/select-practice-units" className={primaryButton}>
          Start practicing <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      </div>
    );
  } else {
    content = <ProgressReportView progress={progress} audience="student" />;
  }

  return (
    <div className="min-h-screen bg-slate-50 px-4 pb-24 pt-12 text-slate-900 sm:pt-16">
      <div className="mx-auto flex max-w-3xl flex-col gap-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Your progress</h1>
          <p className="text-slate-600">How you&apos;re doing on each lesson, from the questions you answer on AP Dojo.</p>
        </div>
        {content}
      </div>
    </div>
  );
}
