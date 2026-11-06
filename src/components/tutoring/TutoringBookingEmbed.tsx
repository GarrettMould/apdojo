'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { ArrowRight, Loader2 } from 'lucide-react';
import { calBookingUrl, type TutoringSessionType } from '@/data/tutoring';
import { trackEvent } from '@/lib/analytics';
import { secondaryButton } from '@/components/guidedLesson/styles';

// Browser only: the embed script and iframe never run on the server.
const Cal = dynamic(() => import('@calcom/embed-react'), { ssr: false });

/** If Cal.com hasn't reported the booking page as ready by then, assume it's blocked and show the link. */
const LOAD_TIMEOUT_MS = 15000;
const BRAND_BLUE = '#2563eb';

type EmbedStatus = 'waiting' | 'loading' | 'ready' | 'failed';

export function TutoringBookingEmbed({ sessions }: { sessions: TutoringSessionType[] }) {
  const [activeId, setActiveId] = useState(sessions[0]?.id);
  const active = sessions.find((s) => s.id === activeId) ?? sessions[0];
  const containerRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [status, setStatus] = useState<EmbedStatus>(active?.calLink ? 'waiting' : 'failed');
  const namespace = `tutoring-${active?.id ?? 'session'}`;

  // Load the embed only when the booking section is near the viewport.
  useEffect(() => {
    const el = containerRef.current;
    if (!el || inView) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) setInView(true);
      },
      { rootMargin: '400px' },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [inView]);

  useEffect(() => {
    if (!inView || !active?.calLink) return;
    let cancelled = false;
    let detach: (() => void) | null = null;
    setStatus('loading');
    const timeout = window.setTimeout(() => {
      if (!cancelled) setStatus((s) => (s === 'ready' ? s : 'failed'));
    }, LOAD_TIMEOUT_MS);

    import('@calcom/embed-react')
      .then(({ getCalApi }) => getCalApi({ namespace }))
      .then((cal) => {
        if (cancelled) return;
        cal('ui', {
          theme: 'light',
          cssVarsPerTheme: { light: { 'cal-brand': BRAND_BLUE }, dark: { 'cal-brand': BRAND_BLUE } },
          hideEventTypeDetails: false,
          layout: 'month_view',
        });
        const onReady = () => !cancelled && setStatus('ready');
        const onFailed = () => !cancelled && setStatus('failed');
        // Booking details stay out of analytics; only the session type is sent.
        const onBooked = () => void trackEvent('tutoring_booking_completed', { session_type: active.id });
        cal('on', { action: 'linkReady', callback: onReady });
        cal('on', { action: 'linkFailed', callback: onFailed });
        cal('on', { action: 'bookingSuccessfulV2', callback: onBooked });
        detach = () => {
          cal('off', { action: 'linkReady', callback: onReady });
          cal('off', { action: 'linkFailed', callback: onFailed });
          cal('off', { action: 'bookingSuccessfulV2', callback: onBooked });
        };
      })
      .catch(() => {
        if (!cancelled) setStatus('failed');
      });

    return () => {
      cancelled = true;
      window.clearTimeout(timeout);
      detach?.();
    };
  }, [inView, active?.calLink, active?.id, namespace]);

  if (!active) return null;
  const bookingUrl = calBookingUrl(active.calLink);

  return (
    <div className="flex flex-col gap-4">
      {sessions.length > 1 ? (
        <div role="radiogroup" aria-label="Session type" className="flex flex-wrap gap-2">
          {sessions.map((s) => (
            <button
              key={s.id}
              type="button"
              role="radio"
              aria-checked={s.id === active.id}
              onClick={() => {
                setActiveId(s.id);
                setStatus(s.calLink ? 'waiting' : 'failed');
              }}
              className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                s.id === active.id
                  ? 'border-blue-600 bg-blue-600 text-white'
                  : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
              }`}
            >
              {s.name}
            </button>
          ))}
        </div>
      ) : null}

      <div
        ref={containerRef}
        className={`relative overflow-hidden rounded-[20px] border border-slate-200 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04)] ${
          status === 'failed' ? '' : 'min-h-[680px]'
        }`}
      >
        {status === 'failed' ? (
          <FallbackLink href={bookingUrl} />
        ) : (
          <>
            {status !== 'ready' ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-slate-500" aria-live="polite">
                <Loader2 className="h-6 w-6 animate-spin" aria-hidden />
                <span className="text-sm font-semibold">Loading available times…</span>
              </div>
            ) : null}
            {inView ? (
              <Cal
                key={active.id}
                namespace={namespace}
                calLink={active.calLink}
                style={{ width: '100%', height: '100%', minHeight: 680, overflow: 'auto' }}
                config={{ layout: 'month_view', theme: 'light' }}
              />
            ) : null}
          </>
        )}
      </div>
    </div>
  );
}

function FallbackLink({ href }: { href: string }) {
  return (
    <div className="flex min-h-[260px] flex-col items-center justify-center gap-4 p-6 text-center">
      <p className="max-w-sm text-[15px] leading-relaxed text-slate-600">
        The booking calendar didn&apos;t load here. You can book directly on Cal.com instead.
      </p>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={secondaryButton}
      >
        Open the booking page <ArrowRight className="h-4 w-4" aria-hidden />
      </a>
    </div>
  );
}
