'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, ChevronDown, ClipboardList, FileCheck2, GraduationCap, PenLine, type LucideIcon } from 'lucide-react';
import { SKILL_LEVELS, type LessonCourse, type SkillLevel } from '@/lib/tutoringLessons';
import {
  MASTERY_LABELS,
  type CourseProgress,
  type LessonProgress,
  type Mastery,
  type ProgressActivity,
  type StudentProgress,
  type UnitProgress,
} from '@/lib/studentProgress';
import { getSubjectSlug, getUnitSlug, type PracticeMcqSubject } from '@/lib/practiceSlugs';

const SQUARE: Record<Mastery, string> = {
  strong: 'bg-emerald-400',
  developing: 'bg-amber-300',
  struggling: 'bg-red-400',
  'too-few': 'bg-slate-300',
  'not-started': 'bg-slate-100 ring-1 ring-inset ring-slate-200',
};

const LABEL_TEXT: Record<Mastery, string> = {
  strong: 'text-emerald-700',
  developing: 'text-amber-700',
  struggling: 'text-red-700',
  'too-few': 'text-slate-500',
  'not-started': 'text-slate-400',
};

const TUTOR_DOT: Record<SkillLevel, string> = { 1: 'bg-red-500', 2: 'bg-amber-400', 3: 'bg-emerald-500' };

const PRACTICE_SUBJECT: Record<LessonCourse, PracticeMcqSubject> = {
  'AP Macroeconomics': 'macro',
  'AP Microeconomics': 'micro',
  'AP Government': 'gov',
  'AP Statistics': 'stats',
};

const ACTIVITY_ICONS: Record<ProgressActivity['kind'], LucideIcon> = {
  test: FileCheck2,
  quiz: ClipboardList,
  practice: PenLine,
  lesson: GraduationCap,
};

const card = 'rounded-3xl border border-slate-200 bg-white shadow-[0_1px_3px_rgba(15,23,42,0.06)]';
const sectionTitle = 'text-lg font-extrabold tracking-tight text-slate-900';

function shortDate(iso: string) {
  const date = new Date(iso);
  const sameYear = date.getFullYear() === new Date().getFullYear();
  return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', ...(sameYear ? {} : { year: 'numeric' }) });
}

function practiceHref(course: LessonCourse, lesson: string) {
  const subject = PRACTICE_SUBJECT[course];
  return `/mcq-practice/${getSubjectSlug(subject)}/${getUnitSlug(Number.parseInt(lesson, 10), subject)}`;
}

function tutorLabel(level: SkillLevel) {
  return SKILL_LEVELS.find((l) => l.level === level)?.label ?? '';
}

function Summary({ course }: { course: CourseProgress }) {
  const lessons = course.units.flatMap((u) => u.lessons);
  const strong = lessons.filter((l) => l.mastery === 'strong').length;
  const started = lessons.filter((l) => l.mastery !== 'not-started').length;
  const accuracy = course.answers ? Math.round((course.correct / course.answers) * 100) : null;

  const segments: { mastery: Mastery; count: number }[] = (['strong', 'developing', 'struggling', 'too-few'] as Mastery[]).map(
    (mastery) => ({ mastery, count: lessons.filter((l) => l.mastery === mastery).length }),
  );

  return (
    <section className={`${card} flex flex-col gap-5 p-5 sm:p-6`}>
      <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
        <div>
          <p className="text-4xl font-black tabular-nums tracking-tight text-slate-900">
            {strong}
            <span className="text-2xl text-slate-400"> / {lessons.length}</span>
          </p>
          <p className="text-sm font-medium text-slate-500">lessons strong</p>
        </div>
        <dl className="flex gap-8">
          <div>
            <dt className="text-xs font-medium text-slate-500">Last 30 days</dt>
            <dd className="text-lg font-black tabular-nums text-slate-900">{course.answersLast30Days} questions</dd>
          </div>
          <div>
            <dt className="text-xs font-medium text-slate-500">Accuracy</dt>
            <dd className="text-lg font-black tabular-nums text-slate-900">{accuracy === null ? '–' : `${accuracy}%`}</dd>
          </div>
        </dl>
      </div>
      <div>
        <div className="flex h-2.5 overflow-hidden rounded-full bg-slate-100" aria-hidden>
          {segments.map((s) =>
            s.count ? (
              <span key={s.mastery} className={SQUARE[s.mastery]} style={{ width: `${(s.count / lessons.length) * 100}%` }} />
            ) : null,
          )}
        </div>
        <p className="mt-2 text-xs font-medium text-slate-500">
          {started} of {lessons.length} lessons practiced. Each lesson is rated on its last 10 answers.
        </p>
      </div>
    </section>
  );
}

function FocusNext({ course, audience }: { course: CourseProgress; audience: 'tutor' | 'student' }) {
  const items = course.focus.slice(0, 3);
  return (
    <section className="flex flex-col gap-3">
      <h2 className={sectionTitle}>{audience === 'student' ? 'Focus on next' : 'Work on next'}</h2>
      {items.length === 0 ? (
        <p className={`${card} px-5 py-4 text-sm text-slate-500`}>
          Nothing stands out yet. Keep practicing and the lessons to work on will show up here.
        </p>
      ) : (
        <ul className="grid gap-3 sm:grid-cols-3">
          {items.map((l) => (
            <li key={l.lesson} className={`${card} flex flex-col justify-between gap-4 p-4`}>
              <div>
                <p className={`text-xs font-bold ${LABEL_TEXT[l.mastery]}`}>
                  {l.mastery === 'not-started' || l.mastery === 'too-few'
                    ? l.tutorLevel
                      ? `Tutor: ${tutorLabel(l.tutorLevel)}`
                      : MASTERY_LABELS[l.mastery]
                    : `${MASTERY_LABELS[l.mastery]} · ${l.recentCorrect}/${l.recentAnswers}`}
                </p>
                <p className="mt-1 font-bold leading-snug text-slate-900">
                  <span className="tabular-nums text-slate-400">{l.lesson}</span> {l.name}
                </p>
                {audience === 'tutor' && l.tutorLevel ? (
                  <p className="mt-1 text-xs font-medium text-slate-500">You rated it {tutorLabel(l.tutorLevel)}</p>
                ) : null}
              </div>
              {audience === 'student' ? (
                <Link
                  href={practiceHref(course.course, l.lesson)}
                  className="inline-flex w-fit items-center gap-1.5 text-sm font-bold text-blue-600 hover:text-blue-700"
                >
                  Practice <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              ) : null}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

function UnitRow({ unit, audience }: { unit: UnitProgress; audience: 'tutor' | 'student' }) {
  const [open, setOpen] = useState(false);
  const strong = unit.lessons.filter((l) => l.mastery === 'strong').length;
  return (
    <li>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full items-center gap-4 px-4 py-3.5 text-left transition hover:bg-slate-50 sm:px-5"
      >
        <span className="min-w-0 flex-1">
          <span className="block truncate text-sm font-bold text-slate-900">
            <span className="text-slate-400">Unit {unit.unit}</span> {unit.name}
          </span>
          <span className="mt-1.5 flex flex-wrap gap-1" aria-hidden>
            {unit.lessons.map((l) => (
              <span key={l.lesson} className={`h-2.5 w-5 rounded-sm ${SQUARE[l.mastery]}`} />
            ))}
          </span>
        </span>
        <span className="shrink-0 text-xs font-semibold tabular-nums text-slate-500">
          {strong}/{unit.lessons.length} strong
        </span>
        <ChevronDown className={`h-4 w-4 shrink-0 text-slate-400 transition ${open ? 'rotate-180' : ''}`} aria-hidden />
      </button>
      {open ? (
        <ul className="flex flex-col gap-0.5 px-4 pb-3 sm:px-5">
          {unit.lessons.map((l) => (
            <li key={l.lesson} className="flex items-center justify-between gap-3 rounded-lg px-2 py-1.5 text-sm">
              <span className="flex min-w-0 items-center gap-2.5">
                <span className={`h-2.5 w-2.5 shrink-0 rounded-sm ${SQUARE[l.mastery]}`} aria-hidden />
                <span className="truncate text-slate-700">
                  <span className="tabular-nums text-slate-400">{l.lesson}</span> {l.name}
                </span>
                {audience === 'tutor' && l.tutorLevel ? (
                  <span
                    className={`h-2 w-2 shrink-0 rounded-full ${TUTOR_DOT[l.tutorLevel]}`}
                    title={`Your rating: ${tutorLabel(l.tutorLevel)}`}
                  />
                ) : null}
              </span>
              <span className={`shrink-0 text-xs font-semibold tabular-nums ${LABEL_TEXT[l.mastery]}`}>
                {l.recentAnswers > 0 ? `${l.recentCorrect}/${l.recentAnswers}` : MASTERY_LABELS[l.mastery]}
              </span>
            </li>
          ))}
        </ul>
      ) : null}
    </li>
  );
}

function Units({ course, audience }: { course: CourseProgress; audience: 'tutor' | 'student' }) {
  const legend: Mastery[] = ['strong', 'developing', 'struggling', 'too-few', 'not-started'];
  return (
    <section className="flex flex-col gap-3">
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
        <h2 className={sectionTitle}>By unit</h2>
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs font-medium text-slate-500">
          {legend.map((m) => (
            <span key={m} className="inline-flex items-center gap-1.5">
              <span className={`h-2.5 w-2.5 rounded-sm ${SQUARE[m]}`} aria-hidden />
              {MASTERY_LABELS[m]}
            </span>
          ))}
        </div>
      </div>
      <ul className={`${card} divide-y divide-slate-100 overflow-hidden`}>
        {course.units.map((u) => (
          <UnitRow key={u.unit} unit={u} audience={audience} />
        ))}
      </ul>
    </section>
  );
}

function RecentActivity({ items }: { items: ProgressActivity[] }) {
  if (items.length === 0) return null;
  return (
    <section className="flex flex-col gap-3">
      <h2 className={sectionTitle}>Recent activity</h2>
      <ul className={`${card} divide-y divide-slate-100`}>
        {items.map((a, i) => {
          const Icon = ACTIVITY_ICONS[a.kind];
          return (
            <li key={`${a.at}-${i}`} className="flex items-center justify-between gap-4 px-4 py-3 sm:px-5">
              <span className="flex min-w-0 items-center gap-3">
                <Icon className="h-4 w-4 shrink-0 text-slate-400" aria-hidden />
                <span className="truncate text-sm font-semibold text-slate-800">{a.title}</span>
                <span className="shrink-0 text-xs text-slate-400">{shortDate(a.at)}</span>
              </span>
              {a.total ? (
                <span className="shrink-0 text-sm font-bold tabular-nums text-slate-600">
                  {a.correct ?? 0}/{a.total}
                </span>
              ) : null}
            </li>
          );
        })}
      </ul>
    </section>
  );
}

/**
 * A student's progress for one course at a time: a summary, the lessons to work on next, and each unit's
 * lessons. Students get practice links; the tutor also sees their own ratings and recent activity.
 */
export default function ProgressReportView({
  progress,
  audience,
}: {
  progress: StudentProgress;
  audience: 'tutor' | 'student';
}) {
  const [courseIndex, setCourseIndex] = useState(0);
  const course = progress.courses[courseIndex] ?? null;
  const recent = useMemo(
    () => (course ? progress.recent.filter((a) => !a.course || a.course === course.course).slice(0, 8) : []),
    [progress, course],
  );

  if (!course) return null;

  return (
    <div className="flex flex-col gap-8">
      {progress.courses.length > 1 ? (
        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Course">
          {progress.courses.map((c, i) => (
            <button
              key={c.course}
              type="button"
              role="tab"
              aria-selected={i === courseIndex}
              onClick={() => setCourseIndex(i)}
              className={`rounded-xl border px-3.5 py-2 text-sm font-bold transition ${
                i === courseIndex
                  ? 'border-slate-900 bg-slate-900 text-white'
                  : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
              }`}
            >
              {c.course.replace('AP ', '')}
            </button>
          ))}
        </div>
      ) : null}

      <Summary course={course} />
      <FocusNext course={course} audience={audience} />
      <Units course={course} audience={audience} />
      {audience === 'tutor' ? <RecentActivity items={recent} /> : null}
    </div>
  );
}
