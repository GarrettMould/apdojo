'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Star, X } from 'lucide-react';
import { TUTOR } from '@/data/tutoring';
import { tutoringReviews } from '@/data/reviews';
import { trackEvent } from '@/lib/analytics';
import { FEATURES } from '@/lib/featureFlags';
import headshot from '../../../public/images/Headshot.jpg';

type EconCourse = 'macro' | 'micro';

/** Zooms the full-length headshot in on head and shoulders (same crop as the tutoring page). */
const headshotCrop = 'object-cover object-[50%_0%] scale-[1.35] origin-[50%_12%]';
const DISMISS_KEY = 'apdojo_tutoring_promo_dismissed_v1';

const SESSION_STEPS = [
  { title: 'Book a time', body: 'Pick a slot and tell me what you are stuck on.' },
  { title: 'Meet on Google Meet', body: 'We work through real AP questions together, live.' },
  { title: 'Leave with a plan', body: 'A short list of what to practice next on AP Dojo.' },
];

/** Two short tutoring reviews that mention AP Macro, for the homepage section. */
const HOME_REVIEWS = tutoringReviews.filter((r) => r.text.length < 240 && /AP Macro/i.test(r.text)).slice(0, 2);

function Stars() {
  return (
    <span className="inline-flex gap-0.5 text-amber-400" aria-hidden>
      {Array.from({ length: 5 }, (_, i) => (
        <Star key={i} className="h-3.5 w-3.5 fill-current" />
      ))}
    </span>
  );
}

function Headshot({ size }: { size: number }) {
  return (
    <span
      className="relative block shrink-0 overflow-hidden rounded-full bg-slate-100 ring-4 ring-white/80"
      style={{ width: size, height: size }}
    >
      <Image src={headshot} alt="" fill sizes={`${size}px`} className={headshotCrop} />
    </span>
  );
}

/**
 * Promotes 1-on-1 tutoring. `band` sits on the logged-out homepage; `card` sits on a free user's
 * dashboard and can be dismissed. Shown only for AP Macro and AP Micro, the courses Garrett tutors.
 */
export function TutoringPromo({
  variant,
  course,
  placement,
}: {
  variant: 'band' | 'card';
  course: string | null | undefined;
  placement: string;
}) {
  const [dismissed, setDismissed] = useState(variant === 'card');

  useEffect(() => {
    if (variant !== 'card') return;
    try {
      setDismissed(window.localStorage.getItem(DISMISS_KEY) === '1');
    } catch {
      setDismissed(false);
    }
  }, [variant]);

  if (!FEATURES.tutoring || (course !== 'macro' && course !== 'micro')) return null;
  const courseLabel = (course as EconCourse) === 'macro' ? 'AP Macro' : 'AP Micro';
  const onClick = () => void trackEvent('tutoring_promo_click', { placement, course });

  if (variant === 'band') {
    const stats = [
      { value: `${TUTOR.yearsTeaching} yrs`, label: 'teaching AP Econ' },
      { value: TUTOR.hoursTutored, label: 'hours tutored' },
      { value: TUTOR.fiveStarReviews, label: '5-star reviews' },
      { value: TUTOR.averageRating, label: 'average rating' },
    ];
    return (
      <section aria-labelledby="tutoring-promo-heading" className="px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-blue-700 ring-1 ring-inset ring-blue-200">
              1-on-1 {courseLabel} tutoring
            </p>
            <h2
              id="tutoring-promo-heading"
              className="mt-4 text-4xl font-black tracking-tight text-gray-900 sm:text-5xl"
            >
              Want a teacher in your <span className="text-blue-600">corner</span>?
            </h2>
            <p className="mt-4 text-lg text-gray-600 sm:text-xl">
              Book a live session over Google Meet with {TUTOR.name} and work through graphs, FRQs or a whole unit
              together.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-[380px_1fr]">
            {/* Tutor card */}
            <div className="relative overflow-hidden rounded-3xl bg-blue-600 p-7 text-white shadow-[0_10px_30px_rgba(15,23,42,0.12)] sm:p-8">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.14)_1px,transparent_1px)] [background-size:22px_22px]"
              />
              <div className="relative flex flex-col items-center text-center">
                <Headshot size={128} />
                <p className="mt-4 text-2xl font-extrabold tracking-tight">{TUTOR.name}</p>
                <p className="mt-1 text-sm text-blue-100">AP Macro &amp; AP Micro teacher · creator of AP Dojo</p>
                <dl className="mt-6 grid w-full grid-cols-2 gap-2.5">
                  {stats.map((stat) => (
                    <div key={stat.label} className="flex flex-col rounded-2xl bg-white/10 px-3 py-3 ring-1 ring-inset ring-white/15">
                      <dt className="order-2 text-xs text-blue-100">{stat.label}</dt>
                      <dd className="order-1 text-xl font-extrabold tracking-tight">{stat.value}</dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-6 text-blue-100">
                  <span className="text-3xl font-extrabold text-white">{TUTOR.hourlyRate}</span> per hour
                </p>
                <Link
                  href="/tutoring#book"
                  onClick={onClick}
                  className="mt-4 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-slate-950 px-6 py-3 text-base font-semibold text-white shadow-[0_8px_20px_rgba(15,23,42,0.25)] transition hover:-translate-y-px hover:bg-slate-800"
                >
                  Book a session <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
                <Link
                  href="/tutoring"
                  onClick={onClick}
                  className="mt-3 text-sm font-semibold text-blue-50 underline-offset-4 hover:text-white hover:underline"
                >
                  Meet your tutor
                </Link>
              </div>
            </div>

            <div className="flex flex-col gap-6">
              {/* How it works */}
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_10px_30px_rgba(15,23,42,0.08)] sm:p-8">
                <h3 className="text-xl font-extrabold tracking-tight text-gray-900">How a session works</h3>
                <ol className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
                  {SESSION_STEPS.map((step, i) => (
                    <li key={step.title} className="flex flex-col gap-2">
                      <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
                        {i + 1}
                      </span>
                      <p className="font-bold text-gray-900">{step.title}</p>
                      <p className="text-sm leading-relaxed text-gray-600">{step.body}</p>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Reviews */}
              <div className="grid flex-1 grid-cols-1 gap-6 sm:grid-cols-2">
                {HOME_REVIEWS.map((review) => (
                  <figure
                    key={review.author}
                    className="flex flex-col gap-3 rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_10px_30px_rgba(15,23,42,0.08)]"
                  >
                    <Stars />
                    {review.title ? <p className="font-bold leading-snug text-gray-900">{review.title}</p> : null}
                    <blockquote className="flex-1 text-[15px] leading-relaxed text-gray-600">{review.text}</blockquote>
                    <figcaption className="text-sm text-gray-500">
                      <span className="font-semibold text-gray-800">{review.author.replace(/\.$/, '')}</span>
                      {review.lessonCount ? ` · ${review.lessonCount} lessons` : null}
                    </figcaption>
                  </figure>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (dismissed) return null;
  return (
    <aside
      aria-label="1-on-1 tutoring"
      className="relative flex flex-col gap-4 rounded-2xl border-2 border-blue-100 bg-blue-50/70 p-4 pr-12 sm:flex-row sm:items-center sm:p-5 sm:pr-14"
    >
      <div className="flex min-w-0 flex-1 items-center gap-4">
        <Headshot size={56} />
        <div className="min-w-0">
          <p className="font-bold text-gray-900">
            Want 1-on-1 help with {courseLabel}? Book a session with {TUTOR.name}
          </p>
          <p className="mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-gray-600">
            <Stars />
            <span>
              {TUTOR.averageRating} from {TUTOR.fiveStarReviews} reviews · {TUTOR.yearsTeaching} years teaching AP ·{' '}
              {TUTOR.hourlyRate}/hour
            </span>
          </p>
        </div>
      </div>
      <Link
        href="/tutoring"
        onClick={onClick}
        className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-blue-700"
      >
        See times <ArrowRight className="h-4 w-4" aria-hidden />
      </Link>
      <button
        type="button"
        onClick={() => {
          setDismissed(true);
          try {
            window.localStorage.setItem(DISMISS_KEY, '1');
          } catch {
            /* storage unavailable: hidden for this visit only */
          }
        }}
        className="absolute right-3 top-3 rounded-lg p-1.5 text-gray-400 transition hover:bg-white hover:text-gray-700"
        aria-label="Hide tutoring offer"
      >
        <X className="h-4 w-4" />
      </button>
    </aside>
  );
}
