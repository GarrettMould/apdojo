'use client';

import Link from 'next/link';
import { ArrowRight, ChevronDown, Star } from 'lucide-react';
import { useAuthContext } from '@/contexts/AuthContext';
import type { CourseSubject } from '@/lib/courseSubject';
import { FEATURES } from '@/lib/featureFlags';
import { TUTOR } from '@/data/tutoring';
import { HomeSocialProofSection } from '@/components/HomeSocialProofSection';
import { SeasonPassShowcase } from '@/components/SeasonPassShowcase';
import { TutoringPromo } from '@/components/tutoring/TutoringPromo';
import { HomeTryQuestions } from '@/components/home/HomeTryQuestions';

/**
 * Shorter logged-out homepage (the "New" option of the homepage toggle):
 * hero → try a question → reviews → pricing → tutoring → FAQ → final call to action.
 */

const SUBJECTS: { id: CourseSubject; label: string; dot: string; active: string }[] = [
  { id: 'macro', label: 'AP Macro', dot: 'bg-blue-500', active: 'border-blue-300 bg-blue-50 text-blue-800' },
  { id: 'micro', label: 'AP Micro', dot: 'bg-green-500', active: 'border-green-300 bg-green-50 text-green-800' },
  { id: 'gov', label: 'AP Gov', dot: 'bg-violet-500', active: 'border-violet-300 bg-violet-50 text-violet-800' },
  { id: 'stats', label: 'AP Stats', dot: 'bg-orange-500', active: 'border-orange-300 bg-orange-50 text-orange-800' },
];

const FAQ: { question: string; answer: string }[] = [
  {
    question: 'What can I do for free?',
    answer:
      'Make a free account to practice AP-style questions every day and browse the cheat sheets. The Season Pass unlocks unlimited questions, full practice exams, AI-graded FRQs and everything else for your course.',
  },
  {
    question: 'Is it a subscription?',
    answer:
      'No. Each Season Pass is a one-time $29 payment for one course, and it covers the May 2027 AP exams with access through June 30, 2027.',
  },
  {
    question: 'Is it updated for the 2027 exams?',
    answer: 'Yes. AP Macro, Micro, Gov and Stats were rebuilt for the 2027 AP exams.',
  },
  {
    question: 'What if it isn’t right for me?',
    answer:
      'Every Season Pass comes with a 100% money-back guarantee. Email service@apdojo.com and we’ll sort it out.',
  },
  {
    question: 'Can a parent pay?',
    answer:
      'Yes. On the checkout page, choose “Send a parent the payment link” and they can pay from their own device.',
  },
  {
    question: 'Taking both AP Macro and AP Micro?',
    answer: 'Get the Macro + Micro Bundle for $49 and save on the two passes.',
  },
];

function Band({ tint = false, id, children }: { tint?: boolean; id?: string; children: React.ReactNode }) {
  return (
    <div id={id} className={`scroll-mt-20 border-t border-slate-200/70 ${tint ? 'bg-slate-50' : 'bg-white'}`}>
      {children}
    </div>
  );
}

function SectionHeading({ eyebrow, title, subtitle }: { eyebrow?: string; title: React.ReactNode; subtitle?: string }) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      {eyebrow ? (
        <p className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-blue-700 ring-1 ring-inset ring-blue-200">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="mt-4 text-4xl font-black tracking-tight text-gray-900 sm:text-5xl">{title}</h2>
      {subtitle ? <p className="mt-4 text-lg text-gray-600 sm:text-xl">{subtitle}</p> : null}
    </div>
  );
}

export function SeasonPassHomeNew() {
  const { selectedSubject, setSelectedSubject, setShowSignupModal } = useAuthContext();
  const subject = (SUBJECTS.some((s) => s.id === selectedSubject) ? selectedSubject : 'macro') as CourseSubject;
  const subjectLabel = SUBJECTS.find((s) => s.id === subject)?.label ?? 'AP Macro';
  const showTutoring = FEATURES.tutoring && FEATURES.showTutoringInNav && (subject === 'macro' || subject === 'micro');

  return (
    <div className="min-h-screen bg-white">
      {/* 1. Hero */}
      <section className="relative overflow-hidden px-4 pb-16 pt-14 sm:px-6 sm:pb-20 sm:pt-20 lg:px-8">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(59,130,246,0.12),_transparent_55%),radial-gradient(ellipse_at_80%_20%,_rgba(249,115,22,0.08),_transparent_45%),linear-gradient(to_bottom,#f8fafc,#ffffff)]"
        />
        <div className="relative mx-auto flex max-w-4xl flex-col items-center text-center">
          <p className="inline-flex items-center rounded-full border-2 border-black bg-white px-4 py-1.5 text-xs font-black uppercase tracking-[0.14em] text-slate-800 shadow-[3px_3px_0_0_rgba(0,0,0,1)] sm:text-sm">
            Brand new <span className="mx-1.5 text-blue-600">2027</span> courses available
          </p>
          <h1 className="mt-6 text-4xl font-black tracking-tight text-slate-900 sm:text-6xl lg:text-7xl lg:leading-[1.05]">
            Four AP courses.
            <br />
            One place to score a 5.
          </h1>
          <p className="mt-5 max-w-2xl text-base font-medium leading-relaxed text-slate-600 sm:text-xl">
            Macro, Micro, Gov, and Stats, rebuilt for the 2027 exams with practice, cheat sheets, and season-pass
            tools.
          </p>

          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:gap-4">
            <button
              type="button"
              onClick={() => setShowSignupModal(true)}
              className="inline-flex items-center justify-center rounded-2xl border-2 border-black bg-slate-900 px-8 py-4 text-base font-black text-white shadow-[4px_4px_0_0_rgba(0,0,0,1)] transition hover:-translate-y-0.5 hover:shadow-[6px_6px_0_0_rgba(0,0,0,1)]"
            >
              Start practicing free
            </button>
            <a
              href="#try-it"
              className="inline-flex items-center justify-center rounded-2xl border-2 border-black bg-white px-8 py-4 text-base font-black text-slate-900 shadow-[4px_4px_0_0_rgba(0,0,0,1)] transition hover:-translate-y-0.5 hover:shadow-[6px_6px_0_0_rgba(0,0,0,1)]"
            >
              Try a question
            </a>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-2" role="group" aria-label="Choose your course">
            {SUBJECTS.map((s) => (
              <button
                key={s.id}
                type="button"
                aria-pressed={subject === s.id}
                onClick={() => setSelectedSubject(s.id)}
                className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition ${
                  subject === s.id ? s.active : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                }`}
              >
                <span className={`h-2 w-2 rounded-full ${s.dot}`} aria-hidden />
                {s.label}
              </button>
            ))}
          </div>

          <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-slate-600">
            <span className="flex gap-0.5" aria-hidden>
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              ))}
            </span>
            <span>1,000+ students helped</span>
          </div>
        </div>
      </section>

      {/* 2. Try it now */}
      <Band tint id="try-it">
        <section aria-labelledby="try-it-heading" className="px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="mx-auto max-w-3xl text-center">
              <p className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-blue-700 ring-1 ring-inset ring-blue-200">
                Try it now
              </p>
              <h2 id="try-it-heading" className="mt-4 text-4xl font-black tracking-tight text-gray-900 sm:text-5xl">
                Answer three real {subjectLabel} questions
              </h2>
              <p className="mt-4 text-lg text-gray-600 sm:text-xl">
                No account needed. Every question comes with an explanation.
              </p>
            </div>
            <div className="mt-10">
              <HomeTryQuestions subject={subject as 'macro' | 'micro' | 'gov' | 'stats'} />
            </div>
          </div>
        </section>
      </Band>

      {/* 3. Reviews */}
      <Band>
        <HomeSocialProofSection />
      </Band>

      {/* 4. Pricing */}
      <Band tint>
        <SeasonPassShowcase />
      </Band>

      {/* 5. Tutoring (AP Macro and Micro only) */}
      {showTutoring ? (
        <Band>
          <TutoringPromo variant="band" course={subject} placement="home_logged_out_new" />
        </Band>
      ) : null}

      {/* 6. FAQ */}
      <Band tint={showTutoring}>
        <section aria-labelledby="home-faq-heading" className="px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 id="home-faq-heading" className="text-center text-4xl font-black tracking-tight text-gray-900 sm:text-5xl">
              Questions, answered
            </h2>
            <div className="mt-10 flex flex-col divide-y divide-slate-200 rounded-3xl border border-slate-200 bg-white shadow-[0_10px_30px_rgba(15,23,42,0.06)]">
              {[
                ...FAQ,
                ...(FEATURES.tutoring && FEATURES.showTutoringInNav
                  ? [
                      {
                        question: 'Do you offer 1-on-1 tutoring?',
                        answer: `Yes, for AP Macro and AP Micro. Live sessions over Google Meet with ${TUTOR.name} are ${TUTOR.hourlyRate} per hour.`,
                      },
                    ]
                  : []),
              ].map((item) => (
                <details key={item.question} className="group px-5 py-4 sm:px-6 [&_summary::-webkit-details-marker]:hidden">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-semibold text-gray-900">
                    {item.question}
                    <ChevronDown className="h-4 w-4 shrink-0 text-gray-400 transition-transform group-open:rotate-180" aria-hidden />
                  </summary>
                  <p className="mt-2.5 text-[15px] leading-relaxed text-gray-600">
                    {item.answer}
                    {item.question.startsWith('Do you offer') ? (
                      <>
                        {' '}
                        <Link href="/tutoring" className="font-semibold text-blue-600 hover:underline">
                          See times
                        </Link>
                      </>
                    ) : null}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </Band>

      {/* 7. Final call to action */}
      <section className="relative overflow-hidden bg-blue-600 px-4 py-20 text-white sm:px-6 sm:py-24 lg:px-8">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.14)_1px,transparent_1px)] [background-size:22px_22px]"
        />
        <div className="relative mx-auto flex max-w-3xl flex-col items-center text-center">
          <h2 className="text-4xl font-black tracking-tight sm:text-5xl">The exam is in May. Start today.</h2>
          <p className="mt-4 max-w-xl text-lg text-blue-50">
            Practice free every day, or unlock everything for {subjectLabel} with a one-time $29 Season Pass.
          </p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => setShowSignupModal(true)}
              className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl bg-slate-950 px-7 py-3 text-base font-semibold text-white shadow-[0_8px_20px_rgba(15,23,42,0.25)] transition hover:-translate-y-px hover:bg-slate-800"
            >
              Start practicing free <ArrowRight className="h-4 w-4" aria-hidden />
            </button>
            <a
              href="#season-pass"
              className="inline-flex min-h-[52px] items-center justify-center rounded-xl bg-white px-7 py-3 text-base font-semibold text-blue-700 transition hover:bg-blue-50"
            >
              Get the Season Pass
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
