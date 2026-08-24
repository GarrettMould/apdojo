'use client';

import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';
import {
  getOfferPageConfig,
  offerPriceLabel,
  seasonPassCheckoutPath,
  type OfferCourseSlug,
} from '@/data/offerPages';

interface CourseOfferPageProps {
  course: OfferCourseSlug;
}

const FEATURE_TILE_COLORS = [
  { bg: 'bg-red-500', text: 'text-white' },
  { bg: 'bg-blue-500', text: 'text-white' },
  { bg: 'bg-yellow-400', text: 'text-gray-950' },
  { bg: 'bg-orange-500', text: 'text-white' },
] as const;

export function CourseOfferPage({ course }: CourseOfferPageProps) {
  const config = getOfferPageConfig(course);
  const pricing = offerPriceLabel(config);
  const checkoutHref = config.checkoutType
    ? seasonPassCheckoutPath(config.checkoutType)
    : null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100">
      {/* Hero — course pitch left, feature squares right */}
      <section className="relative overflow-hidden border-b border-black/10">
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              'radial-gradient(circle at 12% 18%, rgba(15,23,42,0.08), transparent 42%), radial-gradient(circle at 88% 10%, rgba(15,23,42,0.06), transparent 36%)',
          }}
          aria-hidden
        />
        <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-2 lg:gap-14 lg:py-24">
          <div>
            <p className={`text-xs font-black uppercase tracking-[0.2em] ${config.accentText}`}>
              {config.badge}
            </p>
            <h1 className="mt-4 text-5xl font-black tracking-tight text-gray-950 sm:text-6xl md:text-7xl">
              {config.courseLabel}
            </h1>
            <p className="mt-5 max-w-xl text-xl font-bold leading-snug text-gray-900 sm:text-2xl">
              {config.headline}
            </p>
            <p className="mt-3 max-w-xl text-base font-medium leading-relaxed text-gray-600 sm:text-lg">
              {config.supporting}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              {checkoutHref && pricing ? (
                <>
                  <Link
                    href={checkoutHref}
                    className={`inline-flex items-center gap-2 rounded-xl border-2 border-black px-6 py-3.5 text-sm font-black uppercase tracking-wide text-white shadow-[4px_4px_0_0_rgba(0,0,0,1)] transition-all hover:translate-y-0.5 hover:shadow-[2px_2px_0_0_rgba(0,0,0,1)] ${config.accentBg}`}
                  >
                    Get Season Pass — ${pricing.price}
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </Link>
                  <p className="text-sm font-semibold text-gray-500">
                    <span className="line-through">${pricing.originalPrice}</span>
                    <span className="ml-2 text-gray-800">one-time · through June 30, 2027</span>
                  </p>
                </>
              ) : (
                <p className="rounded-xl border-2 border-black bg-white px-5 py-3 text-sm font-bold text-gray-800 shadow-[4px_4px_0_0_rgba(0,0,0,1)]">
                  Season Pass for this course is coming soon — explore free resources below.
                </p>
              )}
            </div>
          </div>

          <div
            className="grid grid-cols-2 gap-3 sm:gap-4"
            aria-label="Included features"
          >
            {config.featureTiles.map((label, index) => {
              const colors = FEATURE_TILE_COLORS[index];
              return (
                <div
                  key={label}
                  className={`flex aspect-square items-center justify-center border-2 border-black p-4 text-center shadow-[4px_4px_0_0_rgba(0,0,0,1)] ${colors.bg} ${colors.text}`}
                >
                  <span className="text-base font-black leading-tight tracking-tight sm:text-lg md:text-xl">
                    {label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Meet the teacher */}
      <section className="border-b border-black/10 bg-white/70">
        <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-20">
          <h2 className="text-3xl font-black tracking-tight text-gray-950 sm:text-4xl">
            Meet the teacher
          </h2>
          <p className="mt-3 max-w-xl text-base font-medium text-gray-600 sm:text-lg">
            The person behind this course.
          </p>
          <div className="mt-10 w-full max-w-xs border-2 border-black bg-white p-5 shadow-[4px_4px_0_0_rgba(0,0,0,1)] sm:max-w-sm">
            <div className="flex h-16 w-16 items-center justify-center border-2 border-black bg-gray-100 text-lg font-black text-gray-500">
              {config.teacher.name
                .split(' ')
                .map((part) => part[0])
                .join('')
                .slice(0, 2)}
            </div>
            <h3 className="mt-4 text-lg font-black text-gray-950">{config.teacher.name}</h3>
            <p className={`mt-1 text-xs font-bold uppercase tracking-wide ${config.accentText}`}>
              {config.teacher.title}
            </p>
            <p className="mt-3 text-sm font-medium leading-relaxed text-gray-600">
              {config.teacher.blurb}
            </p>
          </div>
        </div>
      </section>

      {/* Full resource breakdown */}
      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-black tracking-tight text-gray-950 sm:text-4xl">
            What&apos;s included
          </h2>
          <p className="mt-3 text-base font-medium text-gray-600 sm:text-lg">
            A closer look at everything unlocked with the Season Pass.
          </p>
        </div>

        <ul className="mt-8 divide-y-2 divide-black border-2 border-black bg-white shadow-[6px_6px_0_0_rgba(0,0,0,1)]">
          {config.resources.map((resource) => (
            <li
              key={resource.id}
              className="flex flex-col gap-3 px-5 py-6 sm:flex-row sm:items-center sm:justify-between sm:gap-8 sm:px-7"
            >
              <div className="min-w-0 max-w-2xl">
                <h3 className="text-lg font-black text-gray-950 sm:text-xl">{resource.title}</h3>
                <p className="mt-1.5 text-sm font-medium leading-relaxed text-gray-600 sm:text-base">
                  {resource.blurb}
                </p>
              </div>
              {resource.previewHref ? (
                <Link
                  href={resource.previewHref}
                  className="inline-flex shrink-0 items-center gap-1.5 self-start text-sm font-black uppercase tracking-wide text-gray-900 underline underline-offset-4 hover:text-gray-600 sm:self-center"
                >
                  Preview
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                </Link>
              ) : null}
            </li>
          ))}
        </ul>
      </section>

      {/* How students use it */}
      <section className="border-y border-black/10 bg-white/70">
        <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-20">
          <h2 className="text-3xl font-black tracking-tight text-gray-950 sm:text-4xl">
            How students use it
          </h2>
          <p className="mt-3 max-w-xl text-base font-medium text-gray-600 sm:text-lg">
            A simple loop that compounds — not a pile of random tools.
          </p>
          <ol className="mt-10 grid gap-4 sm:grid-cols-2">
            {config.howItWorks.map((step, index) => (
              <li
                key={step}
                className="flex gap-4 border-2 border-black bg-white px-5 py-4 shadow-[4px_4px_0_0_rgba(0,0,0,1)]"
              >
                <span
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-black text-white ${config.accentBg}`}
                >
                  {index + 1}
                </span>
                <p className="pt-1 text-sm font-bold leading-snug text-gray-900 sm:text-base">{step}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Bottom CTA */}
      {checkoutHref && pricing ? (
        <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-20">
          <div
            className={`border-2 border-black ${config.accentBg} px-6 py-10 text-white shadow-[8px_8px_0_0_rgba(0,0,0,1)] sm:px-10`}
          >
            <p className="text-xs font-black uppercase tracking-[0.18em] text-white/80">
              {config.courseLabel} Season Pass
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
              Unlock the full toolkit for ${pricing.price}
            </h2>
            <ul className="mt-5 space-y-2">
              {config.featureTiles.map((label) => (
                <li key={label} className="flex items-start gap-2 text-sm font-semibold text-white/95">
                  <Check className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
                  {label}
                </li>
              ))}
            </ul>
            <Link
              href={checkoutHref}
              className="mt-8 inline-flex items-center gap-2 rounded-xl border-2 border-black bg-white px-6 py-3.5 text-sm font-black uppercase tracking-wide text-gray-950 shadow-[4px_4px_0_0_rgba(0,0,0,1)] transition-all hover:translate-y-0.5 hover:shadow-[2px_2px_0_0_rgba(0,0,0,1)]"
            >
              Continue to checkout
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </section>
      ) : null}
    </div>
  );
}
