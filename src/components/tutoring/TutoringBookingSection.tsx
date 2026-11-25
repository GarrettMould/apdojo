'use client';

import { useEffect, useRef, useState } from 'react';
import { Check } from 'lucide-react';
import { FREE_SEASON_PASS_LINE, type TutoringSessionType } from '@/data/tutoring';
import { TutoringBookingEmbed } from './TutoringBookingEmbed';

/**
 * The booking calendar as a full-screen section: one screen tall below the sticky site header and wide
 * enough that Cal.com shows the month and the day's times side by side. Price and what's included sit in
 * the header row so nothing narrows the calendar. Cal.com loads only when the section nears the viewport.
 */
export function TutoringBookingSection({ sessions }: { sessions: TutoringSessionType[] }) {
  const [activeId, setActiveId] = useState(sessions[0]?.id);
  const active = sessions.find((s) => s.id === activeId) ?? sessions[0];
  const ref = useRef<HTMLElement>(null);
  const [near, setNear] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || near) return;
    const observer = new IntersectionObserver((entries) => entries.some((e) => e.isIntersecting) && setNear(true), {
      rootMargin: '600px',
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [near]);

  if (!active) return null;

  return (
    <section
      ref={ref}
      id="book"
      aria-labelledby="book-heading"
      className="scroll-mt-20 border-y border-blue-100 bg-gradient-to-b from-blue-50 to-slate-100 px-3 py-6 sm:px-6 sm:py-10"
    >
      <div className="mx-auto flex h-[calc(100svh-5rem-3rem)] min-h-[640px] max-w-[1120px] flex-col overflow-hidden rounded-3xl border border-slate-300/80 bg-white shadow-[0_24px_60px_-24px_rgba(15,23,42,0.35)] sm:h-[calc(100svh-5rem-5rem)]">
        <header className="flex shrink-0 flex-col gap-3 border-b border-slate-200 bg-slate-50/70 px-5 py-5 sm:px-8 sm:py-6 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
          <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
            <h2 id="book-heading" className="text-2xl font-bold tracking-tight text-slate-900 sm:text-[28px]">
              Book a session
            </h2>
            <p className="text-base text-slate-600">
              <span className="font-bold text-slate-900">{active.price}</span>
              {active.priceUnit ? ` ${active.priceUnit}` : ''} · Google Meet · times in your time zone
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {sessions.length > 1 ? (
              <div role="radiogroup" aria-label="Session type" className="flex gap-1 rounded-xl bg-slate-100 p-1">
                {sessions.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    role="radio"
                    aria-checked={s.id === active.id}
                    onClick={() => setActiveId(s.id)}
                    className={`rounded-lg px-3 py-1.5 text-sm font-bold transition ${
                      s.id === active.id ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {s.name}
                  </button>
                ))}
              </div>
            ) : null}
            <details className="group relative text-sm">
              <summary className="flex cursor-pointer list-none items-center gap-1.5 font-semibold text-blue-600 hover:text-blue-700">
                <Check className="h-4 w-4" strokeWidth={2.5} aria-hidden /> What&apos;s included
              </summary>
              <ul className="absolute right-0 z-10 mt-2 flex w-[min(340px,calc(100vw-2rem))] flex-col gap-2 rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_16px_40px_-12px_rgba(15,23,42,0.25)] max-lg:left-0 max-lg:right-auto">
                {[...active.includes, FREE_SEASON_PASS_LINE].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 leading-relaxed text-slate-700">
                    <Check className="mt-1 h-4 w-4 shrink-0 text-blue-600" strokeWidth={2.5} aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </details>
          </div>
        </header>
        <div className="min-h-0 flex-1">{near ? <TutoringBookingEmbed key={active.id} session={active} /> : null}</div>
      </div>
    </section>
  );
}
