'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { ArrowRight, Loader2 } from 'lucide-react';
import { calBookingUrl, type TutoringSessionType } from '@/data/tutoring';

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
        cal('on', { action: 'linkReady', callback: () => !cancelled && setStatus('ready') });
        cal('on', { action: 'linkFailed', callback: () => !cancelled && setStatus('failed') });
      })
      .catch(() => {
        if (!cancelled) setStatus('failed');
      });

    return () => {
      cancelled = true;
      window.clearTimeout(timeout);
    };
  }, [inView, active?.calLink, namespace]);

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
              className={`rounded-xl border-2 border-black px-4 py-2 text-sm font-black transition ${
                s.id === active.id ? 'bg-blue-600 text-white' : 'bg-white text-gray-900 hover:bg-gray-100'
              }`}
            >
              {s.name}
            </button>
          ))}
        </div>
      ) : null}

      <div
        ref={containerRef}
        className={`relative overflow-hidden rounded-3xl border-4 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] ${
          status === 'failed' ? '' : 'min-h-[680px]'
        }`}
      >
        {status === 'failed' ? (
          <FallbackLink href={bookingUrl} />
        ) : (
          <>
            {status !== 'ready' ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-gray-500" aria-live="polite">
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
      <p className="max-w-sm text-base font-semibold text-gray-700">
        The booking calendar didn&apos;t load here. You can book directly on Cal.com instead.
      </p>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 rounded-2xl border-4 border-black bg-white px-6 py-3 text-base font-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-300"
      >
        Open the booking page <ArrowRight className="h-4 w-4" aria-hidden />
      </a>
    </div>
  );
}
