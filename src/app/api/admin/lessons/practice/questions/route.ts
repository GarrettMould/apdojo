import { NextResponse } from 'next/server';
import { db as adminDb } from '@/lib/firebase-admin';
import { getAdminUid } from '@/lib/adminAuth';
import { TUTORING_BOOKINGS_COLLECTION } from '@/lib/tutoringBookings';
import { TUTORING_LESSONS_COLLECTION } from '@/lib/tutoringLessons';
import { courseFor } from '@/lib/tutoringLessonsServer';
import { bankQuestions } from '@/lib/practiceEngine';

export const runtime = 'nodejs';

/**
 * Admin only. Bank questions for one lesson of the lesson's course, to add to the practice set by hand.
 * Query: `bookingId`, and `lesson` (e.g. "3.7") or `unit`.
 */
export async function GET(req: Request) {
  if (!adminDb || !(await getAdminUid(req))) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  const params = new URL(req.url).searchParams;
  const bookingId = params.get('bookingId');
  const lesson = params.get('lesson');
  const unitParam = params.get('unit');
  const unit = unitParam && /^\d+$/.test(unitParam) ? Number(unitParam) : null;
  if (!bookingId || (!lesson && unit === null)) {
    return NextResponse.json({ error: 'Missing bookingId and lesson or unit' }, { status: 400 });
  }

  const [booking, lessonDoc] = await Promise.all([
    adminDb.collection(TUTORING_BOOKINGS_COLLECTION).doc(bookingId).get(),
    adminDb.collection(TUTORING_LESSONS_COLLECTION).doc(bookingId).get(),
  ]);
  if (!booking.exists) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  const course = courseFor(booking.data() ?? {}, lessonDoc.data()).course;
  if (!course) return NextResponse.json({ error: 'The lesson needs a course first' }, { status: 400 });

  return NextResponse.json({ questions: await bankQuestions(course, { lesson, unit }) });
}
