import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, CalendarDays } from 'lucide-react';
import { db as adminDb } from '@/lib/firebase-admin';
import LessonNotesView from '@/components/tutoring/LessonNotesView';
import { TUTORING_BOOKINGS_COLLECTION } from '@/lib/tutoringBookings';
import { TUTORING_LESSONS_COLLECTION, readSharedNotes, type SharedLessonNotes } from '@/lib/tutoringLessons';
import { withBoardLinks } from '@/lib/lessonBoardsServer';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Lesson Notes',
  robots: { index: false, follow: false },
};

const card = 'rounded-[20px] border border-slate-200 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04)]';

/** Tokens are 18 random bytes, base64url. Anything else isn't one of ours. */
const TOKEN_PATTERN = /^[A-Za-z0-9_-]{24}$/;

interface LoadedNotes {
  shared: SharedLessonNotes;
  studentFirstName: string | null;
  startTime: string | null;
}

/** The sent notes for a texting link, or null if the link is unknown or turned off. */
async function loadNotes(token: string): Promise<LoadedNotes | null> {
  if (!adminDb || !TOKEN_PATTERN.test(token)) return null;
  const match = await adminDb.collection(TUTORING_LESSONS_COLLECTION).where('shareToken', '==', token).limit(1).get();
  const doc = match.docs[0];
  const lesson = doc?.data();
  if (!doc || lesson?.status !== 'shared' || lesson.shareLinkEnabled === false) return null;
  const shared = readSharedNotes(lesson.shared);
  if (!shared) return null;
  const booking = (await adminDb.collection(TUTORING_BOOKINGS_COLLECTION).doc(doc.id).get()).data();
  const name = typeof booking?.attendeeName === 'string' ? booking.attendeeName.trim().split(/\s+/)[0] : null;
  return {
    shared: { ...shared, boards: await withBoardLinks(doc.id, shared.boards) },
    studentFirstName: name || null,
    startTime: typeof booking?.startTime === 'string' ? booking.startTime : null,
  };
}

/**
 * A lesson's notes behind a private link, for families who get them by text. No account needed: the long
 * random link is the key, and the tutor can turn it off.
 */
export default async function SharedNotesPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const loaded = await loadNotes(token);

  if (!loaded) {
    return (
      <div className="min-h-screen bg-slate-50 px-4 pb-24 pt-16 text-slate-900">
        <div className={`${card} mx-auto flex max-w-md flex-col items-center gap-3 p-8 text-center`}>
          <h1 className="text-xl font-bold tracking-tight">This link isn&apos;t active</h1>
          <p className="text-[15px] leading-relaxed text-slate-600">
            It may have been turned off. Ask Garrett for a new one, or log in to see your lessons.
          </p>
          <Link href="/my-bookings" className="mt-2 text-sm font-bold text-blue-600 hover:text-blue-700">
            Go to My bookings
          </Link>
        </div>
      </div>
    );
  }

  const { shared, studentFirstName, startTime } = loaded;
  const date = startTime
    ? new Date(startTime).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', timeZone: 'America/New_York' })
    : null;

  return (
    <div className="min-h-screen bg-slate-50 px-4 pb-24 pt-10 text-slate-900 sm:pt-14">
      <div className="mx-auto flex max-w-2xl flex-col gap-6">
        <div className="flex flex-col gap-1.5">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-blue-600">
            {[shared.course, date].filter(Boolean).join(' · ') || 'Tutoring'}
          </p>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {studentFirstName ? `${studentFirstName}'s lesson notes` : 'Lesson notes'}
          </h1>
        </div>

        <div className={`${card} p-5 sm:p-7`}>
          <LessonNotesView shared={shared} />
        </div>

        <Link
          href="/tutoring#book"
          className={`${card} group flex items-center gap-4 p-5 transition hover:-translate-y-px hover:border-blue-200`}
        >
          <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
            <CalendarDays className="h-5 w-5" aria-hidden />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block font-bold text-slate-900">Book the next session</span>
            <span className="block text-sm text-slate-500">Or just text Garrett, whatever&apos;s easier.</span>
          </span>
          <ArrowRight className="h-5 w-5 shrink-0 text-blue-600 transition group-hover:translate-x-0.5" aria-hidden />
        </Link>
      </div>
    </div>
  );
}
