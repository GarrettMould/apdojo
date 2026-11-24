'use client';

import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';
import Link from 'next/link';
import { ArrowRight, CalendarDays, Loader2, Video } from 'lucide-react';
import { useAuthContext } from '@/contexts/AuthContext';
import type { TutoringBooking } from '@/lib/tutoringBookings';

const card = 'rounded-[20px] border border-slate-200 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04)]';
const primaryButton =
  'inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700';
const secondaryButton =
  'inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50';

const STATUS_LABELS: Partial<Record<TutoringBooking['status'], { label: string; className: string }>> = {
  pending: { label: 'Awaiting confirmation', className: 'bg-amber-50 text-amber-800 ring-amber-200' },
  cancelled: { label: 'Cancelled', className: 'bg-slate-100 text-slate-600 ring-slate-200' },
  rescheduled: { label: 'Rescheduled', className: 'bg-slate-100 text-slate-600 ring-slate-200' },
};

function isActive(booking: TutoringBooking) {
  return booking.status === 'confirmed' || booking.status === 'pending';
}

function hasEnded(booking: TutoringBooking, now: number) {
  const end = booking.endTime ?? booking.startTime;
  return end ? new Date(end).getTime() < now : false;
}

function formatWhen(booking: TutoringBooking) {
  if (!booking.startTime) return { day: 'Time to be confirmed', time: '' };
  const start = new Date(booking.startTime);
  const day = start.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
  const startTime = start.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' });
  const end = booking.endTime
    ? new Date(booking.endTime).toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit', timeZoneName: 'short' })
    : '';
  return { day, time: end ? `${startTime} – ${end}` : startTime };
}

function BookingCard({ booking, upcoming }: { booking: TutoringBooking; upcoming: boolean }) {
  const { day, time } = formatWhen(booking);
  const badge = STATUS_LABELS[booking.status];
  return (
    <li className={`${card} flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6`}>
      <div className="flex min-w-0 items-start gap-4">
        <span className="mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
          <CalendarDays className="h-5 w-5" aria-hidden />
        </span>
        <div className="min-w-0">
          <p className="font-semibold text-slate-900">{day}</p>
          {time ? <p className="text-sm text-slate-600">{time}</p> : null}
          <p className="mt-1 flex flex-wrap items-center gap-2 text-sm text-slate-500">
            <span>{booking.title}</span>
            {badge ? (
              <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ring-1 ring-inset ${badge.className}`}>
                {badge.label}
              </span>
            ) : null}
          </p>
        </div>
      </div>
      {upcoming ? (
        <div className="flex flex-wrap gap-2 sm:shrink-0 sm:justify-end">
          {booking.meetingUrl && booking.status === 'confirmed' ? (
            <a href={booking.meetingUrl} target="_blank" rel="noopener noreferrer" className={primaryButton}>
              <Video className="h-4 w-4" aria-hidden /> Join meeting
            </a>
          ) : null}
          <a href={booking.manageUrl} target="_blank" rel="noopener noreferrer" className={secondaryButton}>
            Reschedule or cancel
          </a>
        </div>
      ) : null}
    </li>
  );
}

export default function MyBookingsPage() {
  const { user, loading } = useAuthContext();
  const [bookings, setBookings] = useState<TutoringBooking[] | null>(null);
  const [error, setError] = useState(false);

  const load = useCallback(async () => {
    if (!user) return;
    setError(false);
    try {
      const token = await user.getIdToken();
      const res = await fetch('/api/tutoring/bookings', { headers: { Authorization: `Bearer ${token}` } });
      if (!res.ok) throw new Error(`Request failed: ${res.status}`);
      const data = (await res.json()) as { bookings: TutoringBooking[] };
      setBookings(data.bookings);
    } catch (err) {
      console.error('Failed to load bookings:', err);
      setError(true);
    }
  }, [user]);

  useEffect(() => {
    void load();
  }, [load]);

  const { upcoming, past } = useMemo(() => {
    const now = Date.now();
    const list = bookings ?? [];
    return {
      upcoming: list.filter((b) => isActive(b) && !hasEnded(b, now)),
      past: list.filter((b) => !isActive(b) || hasEnded(b, now)).reverse(),
    };
  }, [bookings]);

  let content: ReactNode;
  if (loading || (user && bookings === null && !error)) {
    content = (
      <div className="flex items-center justify-center gap-2 py-16 text-slate-500">
        <Loader2 className="h-5 w-5 animate-spin" aria-hidden /> Loading your bookings…
      </div>
    );
  } else if (!user) {
    content = (
      <div className={`${card} flex flex-col items-start gap-4 p-6`}>
        <p className="text-slate-700">Log in to see your tutoring sessions.</p>
        <Link href="/login?redirect=/my-bookings" className={primaryButton}>
          Log in
        </Link>
      </div>
    );
  } else if (error) {
    content = (
      <div className={`${card} flex flex-col items-start gap-4 p-6`}>
        <p className="text-slate-700">We couldn&apos;t load your bookings. Please try again.</p>
        <button type="button" onClick={() => void load()} className={secondaryButton}>
          Try again
        </button>
      </div>
    );
  } else {
    content = (
      <div className="flex flex-col gap-10">
        <section aria-labelledby="upcoming-heading" className="flex flex-col gap-4">
          <h2 id="upcoming-heading" className="text-lg font-bold text-slate-900">
            Upcoming
          </h2>
          {upcoming.length > 0 ? (
            <ul className="flex flex-col gap-3">
              {upcoming.map((booking) => (
                <BookingCard key={booking.id} booking={booking} upcoming />
              ))}
            </ul>
          ) : (
            <div className={`${card} flex flex-col items-start gap-4 p-6`}>
              <p className="text-slate-700">You have no upcoming sessions.</p>
              <Link href="/tutoring#calendar" className={primaryButton}>
                Book a session <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
          )}
        </section>

        {past.length > 0 ? (
          <section aria-labelledby="past-heading" className="flex flex-col gap-4">
            <h2 id="past-heading" className="text-lg font-bold text-slate-900">
              Past
            </h2>
            <ul className="flex flex-col gap-3">
              {past.map((booking) => (
                <BookingCard key={booking.id} booking={booking} upcoming={false} />
              ))}
            </ul>
          </section>
        ) : null}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 px-4 pb-24 pt-12 text-slate-900 sm:pt-16">
      <div className="mx-auto flex max-w-3xl flex-col gap-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">My bookings</h1>
          <p className="text-slate-600">Your 1-on-1 tutoring sessions. Times are shown in your time zone.</p>
        </div>
        {content}
      </div>
    </div>
  );
}
