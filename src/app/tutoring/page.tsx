import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';
import {
  FREE_SEASON_PASS_LINE,
  TUTOR,
  TUTORING_FAQ,
  TUTORING_SESSION_TYPES,
  calBookingUrl,
} from '@/data/tutoring';

const card = 'rounded-3xl border-4 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]';
const sectionHeading = 'text-3xl font-black tracking-tight text-gray-900 sm:text-4xl';

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
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <div className="mx-auto flex max-w-5xl flex-col gap-16 px-4 pb-24 pt-12 sm:gap-20 sm:px-6 sm:pt-16">
        {/* 1. Hero */}
        <section className="flex flex-col items-start gap-6">
          <span className="inline-flex rounded-lg border-2 border-black bg-blue-600 px-3 py-1 text-xs font-black uppercase tracking-wider text-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
            1-on-1 tutoring
          </span>
          <h1 className="max-w-3xl text-4xl font-black leading-[1.05] tracking-tight sm:text-6xl">
            1-on-1 AP tutoring with a real AP teacher
          </h1>
          <p className="max-w-2xl text-lg font-medium leading-relaxed text-gray-700 sm:text-xl">
            Stuck on graphs, FRQs or a whole unit? Book a live session over Google Meet and work through it together.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <a
              href="#book"
              className="inline-flex items-center gap-2 rounded-2xl border-4 border-black bg-blue-600 px-7 py-4 text-lg font-black text-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all hover:-translate-y-0.5 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-300"
            >
              Book a session <ArrowRight className="h-5 w-5" aria-hidden />
            </a>
            <Link
              href="/season-pass#season-pass"
              className="text-base font-black text-gray-900 underline underline-offset-4 hover:text-blue-700"
            >
              See the Season Pass
            </Link>
          </div>
        </section>

        {/* 2. Who it's for */}
        <section aria-labelledby="who-for-heading" className="flex flex-col gap-6">
          <h2 id="who-for-heading" className={sectionHeading}>
            Who it&apos;s for
          </h2>
          <ul className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {WHO_FOR.map((item) => (
              <li key={item} className={`${card} flex items-start gap-3 p-5`}>
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" strokeWidth={3} aria-hidden />
                <span className="text-base font-semibold leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* 3. What a session looks like */}
        <section aria-labelledby="session-heading" className="flex flex-col gap-6">
          <h2 id="session-heading" className={sectionHeading}>
            What a session looks like
          </h2>
          <ol className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {SESSION_STEPS.map((step, i) => (
              <li key={step} className={`${card} flex flex-col gap-3 p-5`}>
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border-2 border-black bg-yellow-300 text-lg font-black">
                  {i + 1}
                </span>
                <span className="text-base font-semibold leading-relaxed">{step}</span>
              </li>
            ))}
          </ol>
        </section>

        {/* 4. About your tutor */}
        <section aria-labelledby="tutor-heading" className={`${card} flex flex-col gap-6 p-6 sm:flex-row sm:p-8`}>
          <div
            className="flex h-40 w-40 shrink-0 items-center justify-center rounded-2xl border-4 border-dashed border-gray-400 bg-gray-100 text-sm font-bold text-gray-500"
            aria-label="Tutor photo"
          >
            {TUTOR.photo}
          </div>
          <div className="flex flex-col gap-3">
            <h2 id="tutor-heading" className="text-2xl font-black tracking-tight sm:text-3xl">
              About your tutor
            </h2>
            <p className="text-base leading-relaxed text-gray-800">{TUTOR.bio}</p>
            <dl className="flex flex-wrap gap-x-6 gap-y-1 text-sm font-semibold text-gray-700">
              <div className="flex gap-1.5">
                <dt>Years teaching AP:</dt>
                <dd>{TUTOR.yearsTeaching}</dd>
              </div>
              <div className="flex gap-1.5">
                <dt>Courses:</dt>
                <dd>{TUTOR.courses}</dd>
              </div>
            </dl>
            <p className="text-base font-semibold text-gray-900">
              I built AP Dojo&apos;s drills and graph simulations, and I use them in sessions.
            </p>
          </div>
        </section>

        {/* 5. Pricing */}
        <section aria-labelledby="pricing-heading" className="flex flex-col gap-6">
          <h2 id="pricing-heading" className={sectionHeading}>
            Pricing
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {TUTORING_SESSION_TYPES.map((session) => (
              <div key={session.id} className={`${card} flex flex-col gap-4 p-6`}>
                <h3 className="text-xl font-black">{session.name}</h3>
                <p className="text-4xl font-black text-blue-600">{session.price}</p>
                <ul className="flex flex-col gap-2">
                  {session.includes.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-base font-medium">
                      <Check className="mt-1 h-4 w-4 shrink-0 text-blue-600" strokeWidth={3} aria-hidden />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="text-base font-bold text-gray-800">{FREE_SEASON_PASS_LINE}</p>
        </section>

        {/* 6. Booking */}
        <section id="book" aria-labelledby="book-heading" className="flex scroll-mt-24 flex-col gap-4">
          <h2 id="book-heading" className={sectionHeading}>
            Pick a time
          </h2>
          <div className={`${card} flex min-h-[200px] items-center justify-center p-6`}>
            <a
              href={calBookingUrl(primarySession.calLink)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-2xl border-4 border-black bg-white px-6 py-3 text-base font-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5"
            >
              Open the booking page <ArrowRight className="h-4 w-4" aria-hidden />
            </a>
          </div>
          <p className="text-sm font-medium text-gray-600">
            Times are shown in your time zone. You&apos;ll get a confirmation email with your Google Meet link.
          </p>
        </section>

        {/* 7. FAQ */}
        <section aria-labelledby="faq-heading" className="flex flex-col gap-4">
          <h2 id="faq-heading" className={sectionHeading}>
            FAQ
          </h2>
          <div className="flex flex-col gap-3">
            {TUTORING_FAQ.map((item) => (
              <details key={item.question} className={`${card} group p-5 [&_summary::-webkit-details-marker]:hidden`}>
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-black focus:outline-none focus-visible:underline">
                  {item.question}
                  <span aria-hidden className="text-2xl leading-none transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-base leading-relaxed text-gray-700">{item.answer}</p>
              </details>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
