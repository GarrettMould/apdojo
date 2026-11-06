import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Check, ChevronDown } from 'lucide-react';
import {
  FREE_SEASON_PASS_LINE,
  TUTOR,
  TUTORING_FAQ,
  TUTORING_SESSION_TYPES,
  calBookingUrl,
} from '@/data/tutoring';
import { TutoringBookingEmbed } from '@/components/tutoring/TutoringBookingEmbed';
import { TutoringBookLink, TutoringPageView } from '@/components/tutoring/TutoringTracking';
import { primaryButton } from '@/components/guidedLesson/styles';

const description =
  'Live AP tutoring over Google Meet with a real AP teacher. Get help with graphs, FRQs and exam prep. Book online.';
const socialTitle = '1-on-1 AP Tutoring | AP Dojo';

export const metadata: Metadata = {
  // The root layout's template adds "| AP Dojo", so the brand appears once.
  title: '1-on-1 AP Tutoring',
  description,
  alternates: { canonical: 'https://apdojo.com/tutoring' },
  openGraph: { title: socialTitle, description, url: 'https://apdojo.com/tutoring', type: 'website' },
  twitter: { card: 'summary_large_image', title: socialTitle, description },
};

/** Same modest card look as the Explainers hub. */
const card = 'rounded-[20px] border border-slate-200 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04)]';
const sectionHeading = 'text-2xl font-extrabold tracking-tight text-slate-900 sm:text-[28px]';

const WHO_FOR = [
  'Students who keep losing points on graph and FRQ questions',
  'Students who want a focused plan in the weeks before the exam',
  'Parents who want a teacher\'s eyes on their student\'s progress',
];

const SESSION_STEPS = [
  'Book a time and tell me what you\'re stuck on.',
  'Meet on Google Meet. We work through real AP questions together.',
  'Leave with a short plan for what to practise next on AP Dojo.',
];

export default function TutoringPage() {
  const primarySession = TUTORING_SESSION_TYPES[0];

  return (
    <div className="min-h-screen bg-slate-50 bg-[radial-gradient(#dbe3ee_1px,transparent_1px)] px-4 pb-24 pt-10 text-slate-900 [background-size:22px_22px]">
      <TutoringPageView />
      <div className="mx-auto flex max-w-3xl flex-col gap-12 sm:gap-14">
        {/* 1. Hero */}
        <section className="flex flex-col items-start gap-4">
          <p className="text-[13px] font-bold tracking-wide text-blue-600">1-on-1 tutoring</p>
          <h1 className="text-3xl font-extrabold leading-tight tracking-tight sm:text-[40px]">
            1-on-1 AP tutoring with a real AP teacher
          </h1>
          <p className="max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
            Stuck on graphs, FRQs or a whole unit? Book a live session over Google Meet and work through it together.
          </p>
          <div className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-3">
            <TutoringBookLink source="hero" className={primaryButton}>
              Book a session <ArrowRight className="h-4 w-4" aria-hidden />
            </TutoringBookLink>
            <Link
              href="/season-pass#season-pass"
              className="text-base font-semibold text-blue-600 hover:text-blue-700 hover:underline"
            >
              See the Season Pass
            </Link>
          </div>
        </section>

        {/* 2. Who it's for */}
        <section aria-labelledby="who-for-heading" className="flex flex-col gap-4">
          <h2 id="who-for-heading" className={sectionHeading}>
            Who it&apos;s for
          </h2>
          <ul className={`${card} flex flex-col divide-y divide-slate-100 px-5 sm:px-6`}>
            {WHO_FOR.map((item) => (
              <li key={item} className="flex items-start gap-3 py-4">
                <span className="mt-0.5 inline-flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                  <Check className="h-3 w-3" strokeWidth={3.5} aria-hidden />
                </span>
                <span className="text-[15px] leading-relaxed text-slate-700">{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* 3. What a session looks like */}
        <section aria-labelledby="session-heading" className="flex flex-col gap-4">
          <h2 id="session-heading" className={sectionHeading}>
            What a session looks like
          </h2>
          <ol className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {SESSION_STEPS.map((step, i) => (
              <li key={step} className={`${card} flex flex-col gap-3 p-5`}>
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
                  {i + 1}
                </span>
                <span className="text-[15px] leading-relaxed text-slate-700">{step}</span>
              </li>
            ))}
          </ol>
        </section>

        {/* 4. About your tutor */}
        <section aria-labelledby="tutor-heading" className={`${card} flex flex-col gap-5 p-5 sm:flex-row sm:p-6`}>
          <div
            className="flex h-28 w-28 shrink-0 items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 text-xs font-semibold text-slate-400"
            aria-label="Tutor photo"
          >
            {TUTOR.photo}
          </div>
          <div className="flex min-w-0 flex-col gap-2.5">
            <h2 id="tutor-heading" className="text-xl font-bold tracking-tight">
              About your tutor
            </h2>
            <p className="text-[15px] leading-relaxed text-slate-700">{TUTOR.bio}</p>
            <dl className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-slate-500">
              <div className="flex gap-1.5">
                <dt>Years teaching AP:</dt>
                <dd className="font-semibold text-slate-700">{TUTOR.yearsTeaching}</dd>
              </div>
              <div className="flex gap-1.5">
                <dt>Courses:</dt>
                <dd className="font-semibold text-slate-700">{TUTOR.courses}</dd>
              </div>
            </dl>
            <p className="text-[15px] leading-relaxed text-slate-700">
              I built AP Dojo&apos;s drills and graph simulations, and I use them in sessions.
            </p>
          </div>
        </section>

        {/* 5. Pricing */}
        <section aria-labelledby="pricing-heading" className="flex flex-col gap-4">
          <h2 id="pricing-heading" className={sectionHeading}>
            Pricing
          </h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {TUTORING_SESSION_TYPES.map((session) => (
              <div key={session.id} className={`${card} flex flex-col gap-3 p-5 sm:p-6`}>
                <h3 className="text-lg font-bold tracking-tight">{session.name}</h3>
                <p className="text-3xl font-extrabold tracking-tight text-slate-900">{session.price}</p>
                <ul className="flex flex-col gap-2">
                  {session.includes.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-[15px] leading-relaxed text-slate-700">
                      <Check className="mt-1 h-4 w-4 shrink-0 text-blue-600" strokeWidth={2.5} aria-hidden />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="text-[15px] text-slate-600">{FREE_SEASON_PASS_LINE}</p>
        </section>

        {/* 6. Booking */}
        <section id="book" aria-labelledby="book-heading" className="flex scroll-mt-24 flex-col gap-4">
          <h2 id="book-heading" className={sectionHeading}>
            Pick a time
          </h2>
          <TutoringBookingEmbed sessions={TUTORING_SESSION_TYPES} />
          <noscript>
            <a
              href={calBookingUrl(primarySession.calLink)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-base font-semibold text-blue-600 underline"
            >
              Open the booking page <ArrowRight className="h-4 w-4" aria-hidden />
            </a>
          </noscript>
          <p className="text-sm text-slate-500">
            Times are shown in your time zone. You&apos;ll get a confirmation email with your Google Meet link.
          </p>
        </section>

        {/* 7. FAQ */}
        <section aria-labelledby="faq-heading" className="flex flex-col gap-4">
          <h2 id="faq-heading" className={sectionHeading}>
            FAQ
          </h2>
          <div className={`${card} flex flex-col divide-y divide-slate-100`}>
            {TUTORING_FAQ.map((item) => (
              <details key={item.question} className="group px-5 py-4 sm:px-6 [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-semibold text-slate-900 focus:outline-none focus-visible:text-blue-700">
                  {item.question}
                  <ChevronDown
                    className="h-4 w-4 shrink-0 text-slate-400 transition-transform group-open:rotate-180"
                    aria-hidden
                  />
                </summary>
                <p className="mt-2.5 text-[15px] leading-relaxed text-slate-600">{item.answer}</p>
              </details>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
