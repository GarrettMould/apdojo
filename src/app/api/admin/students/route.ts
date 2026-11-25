import { NextResponse } from 'next/server';
import { db as adminDb } from '@/lib/firebase-admin';
import { getAdminUid } from '@/lib/adminAuth';
import { TUTORING_BOOKINGS_COLLECTION } from '@/lib/tutoringBookings';
import type { AdminStudentListItem } from '@/lib/studentProgress';
import { buildStudentProgress, recentAnswerCounts } from '@/lib/studentProgressServer';
import { str } from '@/lib/tutoringLessonsServer';

export const runtime = 'nodejs';
export const maxDuration = 30;

/**
 * Admin only.
 * - GET: the tutoring students (everyone with a booking), with recent practice counts.
 * - GET ?uid=: that student's progress report.
 */
export async function GET(req: Request) {
  if (!adminDb || !(await getAdminUid(req))) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }
  const db = adminDb;

  const uid = new URL(req.url).searchParams.get('uid');
  if (uid) {
    const user = await db.collection('users').doc(uid).get();
    if (!user.exists) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json({ progress: await buildStudentProgress(db, uid) });
  }

  const bookings = await db.collection(TUTORING_BOOKINGS_COLLECTION).get();
  const now = Date.now();
  const students = new Map<string, AdminStudentListItem>();

  for (const doc of bookings.docs) {
    const b = doc.data();
    if (b.example === true) continue;
    const email = str(b.attendeeEmail)?.toLowerCase() ?? null;
    const bookingUid = str(b.userId);
    const key = bookingUid ?? email ?? doc.id;
    const s = students.get(key) ?? {
      uid: bookingUid,
      name: str(b.attendeeName),
      email,
      lessons: 0,
      lastLessonAt: null,
      nextLessonAt: null,
      answersLast7Days: 0,
      answersLast30Days: 0,
    };
    const active = b.status === 'confirmed' || b.status === 'pending';
    const start = str(b.startTime);
    if (active && start) {
      s.lessons += 1;
      const t = Date.parse(start);
      if (t <= now && (!s.lastLessonAt || t > Date.parse(s.lastLessonAt))) s.lastLessonAt = start;
      if (t > now && (!s.nextLessonAt || t < Date.parse(s.nextLessonAt))) s.nextLessonAt = start;
    }
    students.set(key, s);
  }

  // Bookings made before the student had an account (or logged out) have no uid: match by email.
  const unmatched = [...students.values()].filter((s) => !s.uid && s.email);
  await Promise.all(
    unmatched.map(async (s) => {
      const match = await db.collection('users').where('email', '==', s.email).limit(1).get();
      if (!match.empty) s.uid = match.docs[0].id;
    }),
  );

  // The same student can now appear twice (one booking by account, one by email): merge them.
  const merged = new Map<string, AdminStudentListItem>();
  for (const s of students.values()) {
    const key = s.uid ?? s.email ?? `${merged.size}`;
    const prev = merged.get(key);
    if (!prev) {
      merged.set(key, s);
      continue;
    }
    prev.lessons += s.lessons;
    prev.name ??= s.name;
    prev.email ??= s.email;
    if (s.lastLessonAt && (!prev.lastLessonAt || s.lastLessonAt > prev.lastLessonAt)) prev.lastLessonAt = s.lastLessonAt;
    if (s.nextLessonAt && (!prev.nextLessonAt || s.nextLessonAt < prev.nextLessonAt)) prev.nextLessonAt = s.nextLessonAt;
  }

  await Promise.all(
    [...merged.values()]
      .filter((s) => s.uid)
      .map(async (s) => {
        const counts = await recentAnswerCounts(db, s.uid as string, now);
        s.answersLast7Days = counts.last7;
        s.answersLast30Days = counts.last30;
      }),
  );

  const list = [...merged.values()].sort(
    (a, b) => Date.parse(b.lastLessonAt ?? b.nextLessonAt ?? '0') - Date.parse(a.lastLessonAt ?? a.nextLessonAt ?? '0'),
  );
  return NextResponse.json({ students: list });
}
