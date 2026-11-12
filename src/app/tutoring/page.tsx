import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ArrowRight, Check, ChevronDown, Quote, Star } from 'lucide-react';
import {
  FREE_SEASON_PASS_LINE,
  TUTOR,
  TUTORING_FAQ,
  TUTORING_SESSION_TYPES,
  calBookingUrl,
} from '@/data/tutoring';
import { tutoringReviews } from '@/data/reviews';
import { TutoringBookingEmbed } from '@/components/tutoring/TutoringBookingEmbed';
import { TutoringBookLink, TutoringPageView } from '@/components/tutoring/TutoringTracking';
import { FEATURES } from '@/lib/featureFlags';
import headshot from '../../../public/images/Headshot.jpg';

const description =
  'Live 1-on-1 AP Macroeconomics and AP Microeconomics tutoring over Google Meet with an AP teacher of 8+ years. $70 per hour. Book online.';
const socialTitle = '1-on-1 AP Macro & Micro Tutoring | AP Dojo';

export const metadata: Metadata = {
  // The root layout's template adds "| AP Dojo", so the brand appears once.
  title: '1-on-1 AP Macro & Micro Tutoring',
  description,
  alternates: { canonical: 'https://apdojo.com/tutoring' },
  openGraph: { title: socialTitle, description, url: 'https://apdojo.com/tutoring', type: 'website' },
  twitter: { card: 'summary_large_image', title: socialTitle, description },
};

/** Same modest card look as the Explainers hub. */
const card = 'rounded-[20px] border border-slate-200 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04)]';
/** Zooms the full-length headshot in on head and shoulders for the circular crops. */
const headshotCrop = 'object-cover object-[50%_0%] scale-[1.35] origin-[50%_12%]';
const sectionHeading = 'text-2xl font-extrabold tracking-tight text-slate-900 sm:text-[28px]';

const STATS = [
  { value: `${TUTOR.yearsTeaching} years`, label: 'teaching AP Economics' },
  { value: TUTOR.hoursTutored, label: 'hours tutored' },
  { value: TUTOR.fiveStarReviews, label: '5-star reviews' },
  { value: TUTOR.averageRating, label: 'average rating' },
];

const WHO_FOR = [
  'AP Macro and AP Micro students who keep losing points on graphs and FRQs',
  'Students who want a focused plan in the weeks before the exam',
  'Parents who want a teacher\'s eyes on their student\'s progress',
];

const SESSION_STEPS = [
  'Book a time and tell me what you\'re stuck on.',
  'Meet on Google Meet. We work through real AP questions together.',
  'Leave with a short plan for what to practice next on AP Dojo.',
];

/** Reviews shown up front; the rest sit behind "Read more reviews". */
const FEATURED_REVIEW_COUNT = 6;

function Stars({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <span className="inline-flex gap-0.5 text-amber-400" aria-hidden>
      {Array.from({ length: 5 }, (_, i) => (
        <Star key={i} className={`${className} fill-current`} />
      ))}
    </span>
  );
}

function ReviewCard({ review }: { review: (typeof tutoringReviews)[number] }) {
  return (
    <figure className={`${card} mb-4 flex break-inside-avoid flex-col gap-3 p-5`}>
      <div className="flex items-center justify-between gap-3">
        <Stars />
        <Quote className="h-5 w-5 text-slate-200" aria-hidden />
      </div>
      {review.title ? <p className="text-[15px] font-bold leading-snug text-slate-900">{review.title}</p> : null}
      <blockquote className="text-[15px] leading-relaxed text-slate-600">{review.text}</blockquote>
      <figcaption className="text-sm text-slate-500">
        <span className="font-semibold text-slate-800">{review.author.replace(/\.$/, '')}</span>
        {review.lessonCount ? ` · ${review.lessonCount} lessons` : null}
      </figcaption>
    </figure>
  );
}

export default function TutoringPage() {
  if (!FEATURES.tutoring) notFound();
  const primarySession = TUTORING_SESSION_TYPES[0];
  const featured = tutoringReviews.slice(0, FEATURED_REVIEW_COUNT);
  const more = tutoringReviews.slice(FEATURED_REVIEW_COUNT);

  return (
    <div className="min-h-screen bg-slate-50 pb-24 text-slate-900">
      <TutoringPageView />

      {/* 1. Hero band: AP Dojo blue, full width, with the stats along the bottom */}
      <section className="relative overflow-hidden bg-blue-600 text-white">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.14)_1px,transparent_1px)] [background-size:22px_22px]"
        />
        <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-14 px-4 pb-14 pt-12 sm:px-6 sm:pt-16 lg:grid-cols-[1.35fr_1fr] lg:gap-10 lg:pb-16">
          <div className="flex flex-col items-start gap-6">
            <p className="rounded-xl border-2 border-white px-3.5 py-1.5 text-base font-extrabold tracking-tight sm:text-lg">
              1-on-1 AP Macro &amp; Micro tutoring
            </p>
            <h1 className="text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-[52px]">
              Learn AP Economics from a teacher who knows the exam.
            </h1>
            <p className="max-w-xl text-base leading-relaxed text-blue-50 sm:text-lg">
              Stuck on graphs, FRQs or a whole unit? Book a live session over Google Meet and work through it together.
            </p>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
              <TutoringBookLink
                source="hero"
                className="inline-flex min-h-[52px] items-center gap-2 rounded-xl bg-slate-950 px-6 py-3 text-base font-semibold text-white shadow-[0_8px_20px_rgba(15,23,42,0.25)] transition hover:-translate-y-px hover:bg-slate-800"
              >
                Book a session <ArrowRight className="h-4 w-4" aria-hidden />
              </TutoringBookLink>
              <p className="text-base text-blue-100">
                <span className="text-2xl font-extrabold text-white">{TUTOR.hourlyRate}</span> per hour
              </p>
            </div>
          </div>

          {/* Profile collage */}
          <div className="relative mx-auto w-full max-w-[400px] px-2 py-10 sm:px-8">
            <div className="mx-auto flex w-full max-w-[290px] flex-col items-center rounded-3xl bg-white px-6 pb-[104px] pt-8 text-center text-slate-900 shadow-[0_24px_60px_rgba(15,23,42,0.25)]">
              <div className="relative h-44 w-44 overflow-hidden rounded-full bg-slate-100 ring-4 ring-blue-50">
                <Image
                  src={headshot}
                  alt={`${TUTOR.name}, AP Economics tutor`}
                  fill
                  priority
                  sizes="176px"
                  className={headshotCrop}
                />
              </div>
              <p className="mt-4 text-xl font-extrabold tracking-tight">{TUTOR.name}</p>
              <p className="mt-0.5 text-sm text-slate-600">AP Macro &amp; AP Micro teacher · creator of AP Dojo</p>
            </div>

            <a
              href="#reviews"
              className="absolute right-0 top-0 flex flex-col gap-1 rounded-2xl bg-white px-4 py-3 text-slate-900 shadow-[0_12px_32px_rgba(15,23,42,0.22)] transition hover:-translate-y-0.5"
            >
              <Stars className="h-3.5 w-3.5" />
              <span className="text-sm">
                <span className="text-lg font-extrabold">{TUTOR.averageRating}</span>
                <span className="text-slate-500"> · {TUTOR.fiveStarReviews} reviews</span>
              </span>
            </a>

            <dl className="absolute bottom-0 left-0 flex w-[230px] flex-col gap-2.5 rounded-2xl bg-white px-4 py-3.5 text-slate-900 shadow-[0_12px_32px_rgba(15,23,42,0.22)]">
              <div>
                <dt className="text-[11px] font-bold uppercase tracking-wide text-slate-500">Years teaching AP</dt>
                <dd className="text-base font-extrabold">{TUTOR.yearsTeaching}</dd>
              </div>
              <div>
                <dt className="text-[11px] font-bold uppercase tracking-wide text-slate-500">Courses</dt>
                <dd className="text-sm font-semibold leading-snug">{TUTOR.courses}</dd>
              </div>
            </dl>
          </div>
        </div>

        {/* Stats */}
        <div className="relative mx-auto max-w-6xl px-4 pb-12 sm:px-6">
          <dl className="grid grid-cols-2 gap-y-8 border-t border-white/25 pt-10 sm:grid-cols-4">
            {STATS.map((stat) => (
              <div key={stat.label} className="flex flex-col items-center gap-1 text-center">
                <dt className="order-2 text-sm text-blue-100 sm:text-base">{stat.label}</dt>
                <dd className="order-1 text-3xl font-extrabold tracking-tight sm:text-4xl">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <div className="bg-[radial-gradient(#dbe3ee_1px,transparent_1px)] px-4 pt-14 [background-size:22px_22px] sm:pt-16">
      <div className="mx-auto flex max-w-5xl flex-col gap-14 sm:gap-16">
        {/* 2. Price and booking, side by side */}
        <section
          id="book"
          aria-labelledby="book-heading"
          className="grid scroll-mt-24 grid-cols-1 items-start gap-6 lg:grid-cols-[340px_1fr]"
        >
          <div className="flex flex-col gap-4 lg:sticky lg:top-24">
            <h2 id="book-heading" className={sectionHeading}>
              Book a session
            </h2>
            {TUTORING_SESSION_TYPES.map((session) => (
              <div key={session.id} className={`${card} flex flex-col gap-4 p-6`}>
                <div>
                  <h3 className="text-lg font-bold tracking-tight">{session.name}</h3>
                  <p className="mt-1 flex items-baseline gap-1.5">
                    <span className="text-4xl font-extrabold tracking-tight text-slate-900">{session.price}</span>
                    {session.priceUnit ? <span className="text-base text-slate-500">{session.priceUnit}</span> : null}
                  </p>
                </div>
                <ul className="flex flex-col gap-2">
                  {[...session.includes, FREE_SEASON_PASS_LINE].map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-[15px] leading-relaxed text-slate-700">
                      <Check className="mt-1 h-4 w-4 shrink-0 text-blue-600" strokeWidth={2.5} aria-hidden />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <p className="text-sm text-slate-500">
              Pick a time on the calendar. Times are shown in your time zone, and you&apos;ll get a confirmation email
              with your Google Meet link.
            </p>
          </div>
          <div className="min-w-0 lg:pt-[44px]">
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
          </div>
        </section>

        {/* 3. Who it's for + how a session works */}
        <section className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-8">
          <div className="flex flex-col gap-4" aria-labelledby="who-for-heading">
            <h2 id="who-for-heading" className={sectionHeading}>
              Who it&apos;s for
            </h2>
            <ul className={`${card} flex flex-1 flex-col divide-y divide-slate-100 px-5 sm:px-6`}>
              {WHO_FOR.map((item) => (
                <li key={item} className="flex items-start gap-3 py-4">
                  <span className="mt-0.5 inline-flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                    <Check className="h-3 w-3" strokeWidth={3.5} aria-hidden />
                  </span>
                  <span className="text-[15px] leading-relaxed text-slate-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-4" aria-labelledby="session-heading">
            <h2 id="session-heading" className={sectionHeading}>
              How a session works
            </h2>
            <ol className={`${card} flex flex-1 flex-col divide-y divide-slate-100 px-5 sm:px-6`}>
              {SESSION_STEPS.map((step, i) => (
                <li key={step} className="flex items-start gap-3 py-4">
                  <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
                    {i + 1}
                  </span>
                  <span className="pt-0.5 text-[15px] leading-relaxed text-slate-700">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* 4. Reviews */}
        <section id="reviews" aria-labelledby="reviews-heading" className="flex scroll-mt-24 flex-col gap-5">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <h2 id="reviews-heading" className={sectionHeading}>
              What students and parents say
            </h2>
            <p className="flex items-center gap-2 text-sm text-slate-600">
              <Stars />
              <span>
                <span className="font-bold text-slate-900">{TUTOR.averageRating}</span> from {TUTOR.fiveStarReviews}{' '}
                five-star reviews
              </span>
            </p>
          </div>
          <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
            {featured.map((review) => (
              <ReviewCard key={review.author + review.text.slice(0, 20)} review={review} />
            ))}
          </div>
          {more.length > 0 ? (
            <details className="group [&_summary::-webkit-details-marker]:hidden">
              <summary className="mx-auto flex w-fit cursor-pointer list-none items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50">
                <span className="group-open:hidden">Read {more.length} more reviews</span>
                <span className="hidden group-open:inline">Show fewer reviews</span>
                <ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" aria-hidden />
              </summary>
              <div className="mt-4 columns-1 gap-4 sm:columns-2 lg:columns-3">
                {more.map((review) => (
                  <ReviewCard key={review.author + review.text.slice(0, 20)} review={review} />
                ))}
              </div>
            </details>
          ) : null}
        </section>

        {/* 5. FAQ */}
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
    </div>
  );
}
