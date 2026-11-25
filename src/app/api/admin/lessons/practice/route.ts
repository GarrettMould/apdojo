import { NextResponse } from 'next/server';
import { FieldValue } from 'firebase-admin/firestore';
import { db as adminDb } from '@/lib/firebase-admin';
import { getAdminUid } from '@/lib/adminAuth';
import { TUTORING_BOOKINGS_COLLECTION } from '@/lib/tutoringBookings';
import { TUTORING_LESSONS_COLLECTION, sanitizeSkills } from '@/lib/tutoringLessons';
import { courseFor, str } from '@/lib/tutoringLessonsServer';
import {
  MAX_PRACTICE_WITH_PICKS,
  buildPracticeSet,
  isPracticeQuestion,
  practiceView,
  readStoredPractice,
  swapPracticeQuestion,
  type StoredPractice,
} from '@/lib/practiceEngine';

export const runtime = 'nodejs';
export const maxDuration = 30;

type Action =
  | { action: 'build' }
  | { action: 'swap'; questionId: number }
  | { action: 'remove'; questionId: number }
  | { action: 'add'; questionId: number }
  | { action: 'include'; include: boolean };

/**
 * Admin only. The lesson's follow-up practice set, built from its saved skills.
 * Body: `{ bookingId, action: 'build' | 'swap' | 'remove' | 'add' | 'include', questionId?, include? }`.
 * Returns the updated practice view.
 */
export async function POST(req: Request) {
  const adminUid = adminDb ? await getAdminUid(req) : null;
  if (!adminDb || !adminUid) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  const db = adminDb;

  let body: { bookingId?: unknown } & Partial<Record<string, unknown>>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }
  const bookingId = str(body.bookingId);
  if (!bookingId) return NextResponse.json({ error: 'Missing bookingId' }, { status: 400 });
  const action = body as unknown as Action;

  const [bookingSnap, lessonSnap] = await Promise.all([
    db.collection(TUTORING_BOOKINGS_COLLECTION).doc(bookingId).get(),
    db.collection(TUTORING_LESSONS_COLLECTION).doc(bookingId).get(),
  ]);
  if (!bookingSnap.exists) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  const booking = bookingSnap.data() ?? {};
  const lesson = lessonSnap.data();
  const course = courseFor(booking, lesson).course;
  const skills = sanitizeSkills(lesson?.skills);
  const studentUid = str(booking.userId) ?? str(lesson?.studentUserId);
  const current = readStoredPractice(lesson?.practice);

  let next: StoredPractice | null = current;
  if (action.action === 'build') {
    if (!course) return NextResponse.json({ error: 'The lesson needs a course first' }, { status: 400 });
    if (skills.length === 0) return NextResponse.json({ error: 'Add skills first, then build the practice set' }, { status: 400 });
    const built = await buildPracticeSet(db, { course, skills, studentUid });
    if (built.questionIds.length === 0) {
      return NextResponse.json({ error: 'No practice questions match these skills yet' }, { status: 400 });
    }
    next = { include: current?.include ?? true, questionIds: built.questionIds, gaps: built.gaps, builtAt: new Date().toISOString() };
  } else if (action.action === 'add' && typeof action.questionId === 'number') {
    // Picked by hand from the bank; starts a set if there isn't one yet.
    if (!course || !(await isPracticeQuestion(course, action.questionId))) {
      return NextResponse.json({ error: "That question can't be used in this course's practice" }, { status: 400 });
    }
    const ids = current?.questionIds ?? [];
    if (ids.includes(action.questionId)) return NextResponse.json({ error: 'Already in the set' }, { status: 400 });
    if (ids.length >= MAX_PRACTICE_WITH_PICKS) {
      return NextResponse.json({ error: `A set can have up to ${MAX_PRACTICE_WITH_PICKS} questions` }, { status: 400 });
    }
    next = current
      ? { ...current, questionIds: [...ids, action.questionId] }
      : { include: true, questionIds: [action.questionId], gaps: [], builtAt: new Date().toISOString() };
  } else if (!current) {
    return NextResponse.json({ error: 'Build the practice set first' }, { status: 400 });
  } else if (action.action === 'swap' && typeof action.questionId === 'number') {
    if (!course) return NextResponse.json({ error: 'The lesson needs a course first' }, { status: 400 });
    const swapped = await swapPracticeQuestion(db, {
      course,
      skills,
      studentUid,
      questionIds: current.questionIds,
      questionId: action.questionId,
    });
    if (!swapped) return NextResponse.json({ error: 'No other question for that skill' }, { status: 400 });
    next = { ...current, questionIds: swapped };
  } else if (action.action === 'remove' && typeof action.questionId === 'number') {
    next = { ...current, questionIds: current.questionIds.filter((id) => id !== action.questionId) };
  } else if (action.action === 'include' && typeof action.include === 'boolean') {
    next = { ...current, include: action.include };
  } else {
    return NextResponse.json({ error: 'Unknown action' }, { status: 400 });
  }

  // Keep the sent link's details: the share route reuses the link while its questions are unchanged.
  const toStore = { ...next };
  await lessonSnap.ref.set(
    {
      bookingId,
      practice: toStore,
      ...(lessonSnap.exists ? {} : { status: 'draft', createdAt: FieldValue.serverTimestamp() }),
      // The family's version only changes when the notes are sent again.
      ...(lesson?.status === 'shared' ? { editedSinceShare: true } : {}),
      updatedBy: adminUid,
      updatedAt: FieldValue.serverTimestamp(),
    },
    { merge: true },
  );

  return NextResponse.json({ practice: await practiceView(db, next, skills, course) });
}
