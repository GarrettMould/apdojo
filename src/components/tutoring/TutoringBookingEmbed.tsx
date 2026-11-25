'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { ArrowRight, Loader2 } from 'lucide-react';
import { calBookingUrl, type TutoringSessionType } from '@/data/tutoring';
import { useAuthContext } from '@/contexts/AuthContext';
import { CAL_METADATA_UID_KEY } from '@/lib/tutoringBookings';
import { trackEvent } from '@/lib/analytics';
import { secondaryButton } from '@/components/guidedLesson/styles';

// Browser only: the embed script and iframe never run on the server.
const Cal = dynamic(() => import('@calcom/embed-react'), { ssr: false });

/** If Cal.com hasn't reported the booking page as ready by then, assume it's blocked and show the link. */
const LOAD_TIMEOUT_MS = 15000;
const BRAND_BLUE = '#2563eb';

/** Cal.com's default borders are very faint on white; these keep the time slots and booking form outlined. */
const CAL_LIGHT_THEME = {
  'cal-brand': BRAND_BLUE,
  'cal-border': '#cbd5e1',
  'cal-border-subtle': '#e2e8f0',
  'cal-border-emphasis': '#94a3b8',
  'cal-border-booker': '#cbd5e1',
};

type EmbedStatus = 'loading' | 'ready' | 'failed';

/**
 * One session type's Cal.com booking calendar, filling its container. Given enough width (the booking
 * modal), Cal.com lays the month calendar and that day's times side by side.
 */
export function TutoringBookingEmbed({ session }: { session: TutoringSessionType }) {
  const [status, setStatus] = useState<EmbedStatus>(session.calLink ? 'loading' : 'failed');
  const namespace = `tutoring-${session.id}`;
  const { user } = useAuthContext();
  // Signed-in bookers: tie the booking to their account (for My Bookings) and prefill their email.
  const calConfig: Record<string, string> = { layout: 'month_view', theme: 'light' };
  if (user) {
    calConfig[`metadata[${CAL_METADATA_UID_KEY}]`] = user.uid;
    if (user.email) calConfig.email = user.email;
    if (user.displayName) calConfig.name = user.displayName;
  }

  useEffect(() => {
    if (!session.calLink) return;
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
          cssVarsPerTheme: { light: CAL_LIGHT_THEME, dark: { 'cal-brand': BRAND_BLUE } },
          hideEventTypeDetails: false,
          layout: 'month_view',
        });
        const onReady = () => !cancelled && setStatus('ready');
        const onFailed = () => !cancelled && setStatus('failed');
        // Booking details stay out of analytics; only the session type is sent.
        const onBooked = () => void trackEvent('tutoring_booking_completed', { session_type: session.id });
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
  }, [session.calLink, session.id, namespace]);

  if (status === 'failed') return <FallbackLink href={calBookingUrl(session.calLink)} />;

  return (
    <div className="relative h-full w-full">
      {status !== 'ready' ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-slate-500" aria-live="polite">
          <Loader2 className="h-6 w-6 animate-spin" aria-hidden />
          <span className="text-sm font-semibold">Loading available times…</span>
        </div>
      ) : null}
      <Cal
        key={session.id}
        namespace={namespace}
        calLink={session.calLink}
        style={{ width: '100%', height: '100%', overflow: 'auto' }}
        config={calConfig}
      />
    </div>
  );
}

function FallbackLink({ href }: { href: string }) {
  return (
    <div className="flex h-full min-h-[260px] flex-col items-center justify-center gap-4 p-6 text-center">
      <p className="max-w-sm text-[15px] leading-relaxed text-slate-600">
        The booking calendar didn&apos;t load here. You can book directly on Cal.com instead.
      </p>
      <a href={href} target="_blank" rel="noopener noreferrer" className={secondaryButton}>
        Open the booking page <ArrowRight className="h-4 w-4" aria-hidden />
      </a>
    </div>
  );
}
