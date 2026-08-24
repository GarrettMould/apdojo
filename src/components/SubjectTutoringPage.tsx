'use client';

import dynamic from 'next/dynamic';
import { Inter, DM_Sans } from 'next/font/google';
import { useEffect, useMemo, useState } from 'react';
import {
  getTutoringPageConfig,
  type TutoringTutor,
} from '@/data/tutoringPages';
import type { CourseSubject } from '@/lib/courseSubject';

const display = Inter({
  subsets: ['latin'],
  weight: ['700', '800', '900'],
});

const body = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

const CalendlyBookButton = dynamic(() => import('@/components/CalendlyBookButton'), {
  ssr: false,
  loading: () => (
    <span className="inline-flex h-14 w-full items-center justify-center rounded-2xl bg-white/30 text-sm font-semibold text-white/80">
      Book a session
    </span>
  ),
});

/** Keep full class strings here so Tailwind always emits subject accents. */
const SUBJECT_ACCENT_BG: Record<CourseSubject, string> = {
  macro: 'bg-blue-500',
  micro: 'bg-green-500',
  gov: 'bg-violet-500',
  stats: 'bg-orange-500',
};

const SUBJECT_ACCENT_TEXT: Record<CourseSubject, string> = {
  macro: 'text-blue-700',
  micro: 'text-green-700',
  gov: 'text-violet-700',
  stats: 'text-orange-800',
};

const SUBJECT_ACCENT_SOFT: Record<CourseSubject, string> = {
  macro: 'bg-blue-50',
  micro: 'bg-green-50',
  gov: 'bg-violet-50',
  stats: 'bg-orange-50',
};

const SUBJECT_ACCENT_SOFT_TEXT: Record<CourseSubject, string> = {
  macro: 'text-blue-800',
  micro: 'text-green-800',
  gov: 'text-violet-800',
  stats: 'text-orange-900',
};

interface SubjectTutoringPageProps {
  subject: CourseSubject;
}

export function SubjectTutoringPage({ subject }: SubjectTutoringPageProps) {
  const config = useMemo(() => getTutoringPageConfig(subject), [subject]);
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    setEntered(false);
    const id = requestAnimationFrame(() => setEntered(true));
    return () => cancelAnimationFrame(id);
  }, [subject]);

  const tutors = config.tutors;
  const activeTutor: TutoringTutor = tutors[0];
  const firstName = activeTutor.name.split(' ')[0];
  const rosterCount = tutors.length;
  const accentBg = SUBJECT_ACCENT_BG[subject];
  const accentText = SUBJECT_ACCENT_TEXT[subject];
  const accentSoft = SUBJECT_ACCENT_SOFT[subject];
  const accentSoftText = SUBJECT_ACCENT_SOFT_TEXT[subject];

  return (
    <div className={`${body.className} min-h-screen bg-white text-slate-900`}>
      {/* Hero */}
      <section className="relative overflow-hidden bg-white">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage:
              'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%230f172a\' fill-opacity=\'0.04\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          }}
          aria-hidden
        />

        <div className="relative mx-auto max-w-6xl px-4 pb-16 pt-12 sm:px-6 sm:pb-20 sm:pt-16 lg:pt-20">
          <div
            className={`max-w-3xl transition-all duration-700 ease-out ${
              entered ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'
            }`}
          >
            <p className={`text-base font-bold tracking-wide sm:text-lg ${accentText}`}>
              {config.badge}
            </p>
            <h1
              className={`${display.className} mt-3 text-5xl font-black leading-[0.95] tracking-tight text-slate-950 sm:text-6xl lg:text-7xl`}
            >
              {config.headline}
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-700 sm:text-xl">
              {config.supporting}
            </p>

            <div className="mt-7 flex flex-wrap gap-2.5">
              {[
                `Only ${rosterCount} teachers for ${config.courseLabel}`,
                'All classroom teachers',
                'Course creators included',
              ].map((label) => (
                <span
                  key={label}
                  className="rounded-full border border-slate-900/10 bg-white/70 px-3.5 py-1.5 text-sm font-semibold text-slate-800 shadow-sm backdrop-blur-sm"
                >
                  {label}
                </span>
              ))}
            </div>
          </div>

          <div
            className={`mt-12 grid gap-6 lg:grid-cols-[1.35fr_0.85fr] lg:items-stretch lg:gap-7 transition-all delay-100 duration-700 ease-out ${
              entered ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`}
          >
            <article className="relative overflow-hidden rounded-[1.75rem] bg-white/80 shadow-[0_20px_50px_-24px_rgba(15,23,42,0.35)] ring-1 ring-slate-900/5 backdrop-blur-sm">
              <div className={`absolute inset-x-0 top-0 h-1.5 ${accentBg}`} aria-hidden />
              <div className="grid gap-0 sm:grid-cols-[auto_1fr]">
                <div
                  className={`relative flex min-h-[11rem] items-end justify-center px-8 pb-6 pt-10 sm:min-h-full sm:w-44 sm:items-center sm:px-6 ${accentSoft}`}
                >
                  <div
                    className={`flex h-28 w-28 items-center justify-center rounded-[2rem] text-3xl font-bold text-white shadow-lg rotate-[-3deg] ${accentBg} ${display.className}`}
                  >
                    {activeTutor.initials}
                  </div>
                  <div
                    className="pointer-events-none absolute -right-6 top-8 h-24 w-24 rounded-full bg-white/40 blur-2xl"
                    aria-hidden
                  />
                </div>

                <div className="flex flex-col p-6 sm:p-8">
                  <div>
                    {activeTutor.isCourseCreator && (
                      <span
                        className={`mb-3 inline-flex rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide ${accentSoft} ${accentSoftText}`}
                      >
                        Course creator
                      </span>
                    )}
                    <h2
                      className={`${display.className} text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl`}
                    >
                      {activeTutor.name}
                    </h2>
                    <p className={`mt-1.5 text-sm font-semibold ${accentText}`}>
                      {activeTutor.title}
                    </p>
                    <p className="mt-3 text-lg font-medium leading-snug text-slate-800">
                      {activeTutor.tagline}
                    </p>
                  </div>

                  <p className="mt-5 flex-1 text-[15px] leading-relaxed text-slate-600">
                    {activeTutor.description}
                  </p>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {activeTutor.specialties.map((item) => (
                      <span
                        key={item}
                        className={`rounded-lg px-3 py-1.5 text-xs font-semibold ${accentSoft} ${accentSoftText}`}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </article>

            <aside
              className={`relative flex flex-col overflow-hidden rounded-[1.75rem] p-7 text-white shadow-[0_24px_48px_-20px_rgba(15,23,42,0.45)] sm:p-8 ${accentBg}`}
            >
              <div
                className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/15"
                aria-hidden
              />
              <div
                className="pointer-events-none absolute -bottom-16 -left-8 h-44 w-44 rounded-full bg-black/10"
                aria-hidden
              />

              <div className="relative">
                <p className="text-base font-medium text-white">Private session with {firstName}</p>
                <p className={`${display.className} mt-2 text-5xl font-extrabold tracking-tight`}>
                  {config.sessionPrice}
                </p>
                <p className="mt-1 text-base text-white">per live session</p>

                <ul className="mt-8 space-y-3.5 border-y border-white/30 py-6 text-base">
                  <li className="flex items-center justify-between gap-3">
                    <span className="text-white">Length</span>
                    <span className="font-semibold text-white">{config.sessionLength}</span>
                  </li>
                  <li className="flex items-center justify-between gap-3">
                    <span className="text-white">Format</span>
                    <span className="font-semibold text-white">{config.sessionFormat}</span>
                  </li>
                  <li className="flex items-center justify-between gap-3">
                    <span className="text-white">With</span>
                    <span className="font-semibold text-white">
                      {activeTutor.isCourseCreator ? 'Course creator' : 'Subject teacher'}
                    </span>
                  </li>
                </ul>

                <CalendlyBookButton
                  key={activeTutor.id}
                  url={activeTutor.calendlyUrl}
                  label={`Book with ${firstName}`}
                  className={`${display.className} mt-6 flex h-14 w-full items-center justify-center rounded-2xl bg-white px-4 text-base font-bold text-slate-950 transition hover:scale-[1.02] hover:bg-slate-50 active:scale-[0.99]`}
                />
                <p className="mt-4 text-center text-sm leading-relaxed text-white">
                  Limited availability. You’ll pick a time next — reschedule anytime from your confirmation email.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="border-t border-slate-200/80 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <h2 className={`${display.className} text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl`}>
            How it works
          </h2>
          <p className="mt-2 max-w-lg text-base text-slate-600">
            Premium by design — fewer teachers, better sessions.
          </p>

          <ol className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {config.howItWorks.map((step, index) => (
              <li key={step} className="relative">
                <p
                  className={`${display.className} text-5xl font-extrabold leading-none ${accentText} opacity-90`}
                >
                  {String(index + 1).padStart(2, '0')}
                </p>
                <p className="mt-4 text-[15px] font-medium leading-snug text-slate-800">{step}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </div>
  );
}
