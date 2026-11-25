'use client';

import { useCallback, useEffect, useState, type ReactNode } from 'react';
import Link from 'next/link';
import { ChevronRight, Loader2 } from 'lucide-react';
import { useAuthContext } from '@/contexts/AuthContext';
import type { AdminStudentListItem } from '@/lib/studentProgress';
import AdminTabs from '../AdminTabs';
import { dojoButtonSecondary, dojoCard, dojoCardLink, dojoLabel, dojoTitle } from '../lessons/dojoStyles';

function shortDate(iso: string) {
  const date = new Date(iso);
  const sameYear = date.getFullYear() === new Date().getFullYear();
  return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', ...(sameYear ? {} : { year: 'numeric' }) });
}

function Activity({ student }: { student: AdminStudentListItem }) {
  if (!student.uid) {
    return <span className="text-xs font-semibold text-slate-400">No site account</span>;
  }
  if (student.answersLast30Days === 0) {
    return <span className="text-xs font-semibold text-slate-400">No practice in 30 days</span>;
  }
  return (
    <span className="text-right">
      <span className="block text-sm font-bold tabular-nums text-slate-900">{student.answersLast7Days} this week</span>
      <span className="block text-xs font-medium tabular-nums text-slate-500">{student.answersLast30Days} in 30 days</span>
    </span>
  );
}

function StudentRow({ student }: { student: AdminStudentListItem }) {
  const lessons = [
    `${student.lessons} ${student.lessons === 1 ? 'lesson' : 'lessons'}`,
    student.lastLessonAt ? `last ${shortDate(student.lastLessonAt)}` : null,
    student.nextLessonAt ? `next ${shortDate(student.nextLessonAt)}` : null,
  ]
    .filter(Boolean)
    .join(' · ');

  const body = (
    <>
      <div className="min-w-0">
        <p className="truncate font-bold text-slate-900">{student.name ?? student.email ?? 'Unknown student'}</p>
        <p className="truncate text-sm font-medium text-slate-500">{lessons}</p>
      </div>
      <div className="flex shrink-0 items-center gap-3">
        <Activity student={student} />
        {student.uid ? <ChevronRight className="h-4 w-4 text-slate-400" aria-hidden /> : null}
      </div>
    </>
  );

  return (
    <li>
      {student.uid ? (
        <Link
          href={`/admin/students/${encodeURIComponent(student.uid)}`}
          className={`${dojoCardLink} flex items-center justify-between gap-4 p-4 sm:p-5`}
        >
          {body}
        </Link>
      ) : (
        <div
          className={`${dojoCard} flex items-center justify-between gap-4 p-4 sm:p-5`}
          title={`No AP Dojo account uses ${student.email ?? 'this email'}, so there's no practice to show.`}
        >
          {body}
        </div>
      )}
    </li>
  );
}

export default function AdminStudentsPage() {
  const { user } = useAuthContext();
  const [students, setStudents] = useState<AdminStudentListItem[] | null>(null);
  const [error, setError] = useState(false);

  const load = useCallback(async () => {
    if (!user) return;
    setError(false);
    try {
      const token = await user.getIdToken();
      const res = await fetch('/api/admin/students', { headers: { Authorization: `Bearer ${token}` } });
      if (!res.ok) throw new Error(`Request failed: ${res.status}`);
      setStudents(((await res.json()) as { students: AdminStudentListItem[] }).students);
    } catch (err) {
      console.error('Failed to load students:', err);
      setError(true);
    }
  }, [user]);

  useEffect(() => {
    void load();
  }, [load]);

  let content: ReactNode;
  if (error) {
    content = (
      <div className={`${dojoCard} flex flex-col items-start gap-4 p-6`}>
        <p className="font-medium text-slate-700">We couldn&apos;t load students.</p>
        <button type="button" onClick={() => void load()} className={dojoButtonSecondary}>
          Try again
        </button>
      </div>
    );
  } else if (students === null) {
    content = (
      <div className="flex items-center justify-center gap-2 py-16 font-semibold text-slate-500">
        <Loader2 className="h-5 w-5 animate-spin" aria-hidden /> Loading students…
      </div>
    );
  } else if (students.length === 0) {
    content = <p className={`${dojoCard} p-6 font-medium text-slate-700`}>Students show up here once they book a session.</p>;
  } else {
    content = (
      <ul className="flex flex-col gap-3">
        {students.map((s) => (
          <StudentRow key={s.uid ?? s.email ?? s.name} student={s} />
        ))}
      </ul>
    );
  }

  return (
    <>
      <div className="flex flex-col gap-3">
        <AdminTabs />
        <span className={`${dojoLabel} mt-4`}>Tutors only</span>
        <h1 className={dojoTitle}>
          <span className="text-blue-500">Student</span> Progress
        </h1>
        <p className="text-lg text-slate-600">What each student has practiced on the site, lesson by lesson.</p>
      </div>
      {content}
    </>
  );
}
