'use client';

import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';
import Link from 'next/link';
import { ChevronRight, Loader2 } from 'lucide-react';
import { useAuthContext } from '@/contexts/AuthContext';
import AdminTabs from '../AdminTabs';
import type { AdminLessonListItem } from '@/lib/tutoringLessons';
import { dojoButtonSecondary, dojoCard, dojoCardLink, dojoLabel, dojoSectionTitle, dojoTitle } from './dojoStyles';

function formatWhen(startTime: string | null) {
  if (!startTime) return 'Time to be confirmed';
  return new Date(startTime).toLocaleString(undefined, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
}

function LessonRow({ lesson }: { lesson: AdminLessonListItem }) {
  const cancelled = lesson.bookingStatus === 'cancelled' || lesson.bookingStatus === 'rescheduled';
  return (
    <li>
      <Link
        href={`/admin/lessons/${encodeURIComponent(lesson.bookingId)}`}
        className={`${dojoCardLink} flex items-center justify-between gap-4 p-4 sm:p-5`}
      >
        <div className="min-w-0">
          <p className="font-bold text-slate-900">{lesson.studentName ?? lesson.studentEmail ?? 'Unknown student'}</p>
          <p className="text-sm font-medium text-slate-600">
            {formatWhen(lesson.startTime)} · {lesson.title}
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          {cancelled ? (
            <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-600">
              {lesson.bookingStatus === 'cancelled' ? 'Cancelled' : 'Rescheduled'}
            </span>
          ) : lesson.notesState === 'shared' && !lesson.editedSinceShare ? (
            <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 ring-1 ring-inset ring-emerald-200">
              Sent
            </span>
          ) : lesson.notesState === 'shared' ? (
            <span className="rounded-full bg-[#f7f2e8] px-2.5 py-0.5 text-xs font-semibold text-stone-700 ring-1 ring-inset ring-[#eadbb8]">
              Edited · not re-sent
            </span>
          ) : lesson.notesState === 'draft' ? (
            <span className="rounded-full bg-[#f7f2e8] px-2.5 py-0.5 text-xs font-semibold text-stone-700 ring-1 ring-inset ring-[#eadbb8]">
              Draft
            </span>
          ) : null}
          <ChevronRight className="h-4 w-4 text-slate-400" aria-hidden />
        </div>
      </Link>
    </li>
  );
}

function Section({ title, hint, lessons }: { title: string; hint?: string; lessons: AdminLessonListItem[] }) {
  if (lessons.length === 0) return null;
  return (
    <section className="flex flex-col gap-4">
      <div>
        <h2 className={`${dojoSectionTitle} flex items-center gap-2`}>
          {title}
          <span className="rounded-full bg-slate-200/70 px-2 py-0.5 text-xs font-bold text-slate-600">{lessons.length}</span>
        </h2>
        {hint ? <p className="text-sm font-medium text-slate-500">{hint}</p> : null}
      </div>
      <ul className="flex flex-col gap-3">
        {lessons.map((lesson) => (
          <LessonRow key={lesson.bookingId} lesson={lesson} />
        ))}
      </ul>
    </section>
  );
}

export default function AdminLessonsPage() {
  const { user } = useAuthContext();
  const [lessons, setLessons] = useState<AdminLessonListItem[] | null>(null);
  const [error, setError] = useState(false);

  const load = useCallback(async () => {
    if (!user) return;
    setError(false);
    try {
      const token = await user.getIdToken();
      const res = await fetch('/api/admin/lessons', { headers: { Authorization: `Bearer ${token}` } });
      if (!res.ok) throw new Error(`Request failed: ${res.status}`);
      setLessons(((await res.json()) as { lessons: AdminLessonListItem[] }).lessons);
    } catch (err) {
      console.error('Failed to load lessons:', err);
      setError(true);
    }
  }, [user]);

  useEffect(() => {
    void load();
  }, [load]);

  const groups = useMemo(() => {
    const now = Date.now();
    const list = lessons ?? [];
    const isActive = (l: AdminLessonListItem) => l.bookingStatus === 'confirmed' || l.bookingStatus === 'pending';
    const started = (l: AdminLessonListItem) => (l.startTime ? new Date(l.startTime).getTime() <= now : false);
    return {
      needsNotes: list.filter((l) => isActive(l) && started(l) && l.notesState === 'none'),
      // Written but the family doesn't have the latest version yet.
      toShare: list.filter((l) => isActive(l) && (l.notesState === 'draft' || (l.notesState === 'shared' && l.editedSinceShare))),
      upcoming: list.filter((l) => isActive(l) && !started(l) && l.notesState === 'none').reverse(),
      shared: list.filter((l) => isActive(l) && l.notesState === 'shared' && !l.editedSinceShare),
      inactive: list.filter((l) => !isActive(l)),
    };
  }, [lessons]);

  let content: ReactNode;
  if (error) {
    content = (
      <div className={`${dojoCard} flex flex-col items-start gap-4 p-6`}>
        <p className="font-medium text-slate-700">We couldn&apos;t load lessons.</p>
        <button type="button" onClick={() => void load()} className={dojoButtonSecondary}>
          Try again
        </button>
      </div>
    );
  } else if (lessons === null) {
    content = (
      <div className="flex items-center justify-center gap-2 py-16 font-semibold text-slate-500">
        <Loader2 className="h-5 w-5 animate-spin" aria-hidden /> Loading lessons…
      </div>
    );
  } else if (lessons.length === 0) {
    content = <p className={`${dojoCard} p-6 font-medium text-slate-700`}>No sessions have been booked yet.</p>;
  } else {
    content = (
      <div className="flex flex-col gap-10">
        <Section title="Needs notes" hint="Sessions that have started and have no notes yet." lessons={groups.needsNotes} />
        <Section title="Ready to send" hint="Notes are written, but the family doesn't have the latest version yet." lessons={groups.toShare} />
        <Section title="Upcoming" lessons={groups.upcoming} />
        <Section title="Sent" lessons={groups.shared} />
        <Section title="Cancelled or rescheduled" lessons={groups.inactive} />
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col gap-3">
        <AdminTabs />
        <span className={`${dojoLabel} mt-4`}>Tutors only</span>
        <h1 className={dojoTitle}>
          <span className="text-blue-500">Lesson</span> Notes
        </h1>
        <p className="text-lg text-slate-600">Turn every session into notes, skills and next steps.</p>
      </div>
      {content}
    </>
  );
}
