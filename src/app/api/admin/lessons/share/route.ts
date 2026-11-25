import { randomBytes } from 'node:crypto';
import { NextResponse } from 'next/server';
import { FieldValue } from 'firebase-admin/firestore';
import { Resend } from 'resend';
import { db as adminDb } from '@/lib/firebase-admin';
import { getAdminUid } from '@/lib/adminAuth';
import { TUTORING_BOOKINGS_COLLECTION } from '@/lib/tutoringBookings';
import {
  TUTORING_LESSONS_COLLECTION,
  buildSharedNotes,
  readBoards,
  readSharedNotes,
  sanitizeSkills,
  type LessonCourse,
} from '@/lib/tutoringLessons';
import { deleteBoardFiles, withBoardLinks } from '@/lib/lessonBoardsServer';
import { practiceEncodedParam, practicePath, readStoredPractice } from '@/lib/practiceEngine';
import { courseFor, readNotes, str } from '@/lib/tutoringLessonsServer';
import { lessonNotesEmail } from '@/lib/lessonNotesEmail';

export const runtime = 'nodejs';

const COURSE_SUBJECT_TAGS: Record<LessonCourse, string> = {
  'AP Macroeconomics': 'ap_macroeconomics',
  'AP Microeconomics': 'ap_microeconomics',
  'AP Government': 'ap_us_government',
  'AP Statistics': 'ap_statistics',
};

/**
 * Admin only. Shares a lesson's saved notes with the family: snapshots them (the version the family sees),
 * emails them to the booking email and marks the lesson shared. Body: `{ bookingId }`.
 *
 * Without RESEND_API_KEY (local development), the email is skipped but the lesson is still shared, and the
 * response says so. In production a missing key is an error.
 */
export async function POST(req: Request) {
  const adminUid = adminDb ? await getAdminUid(req) : null;
  if (!adminDb || !adminUid) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  let bookingId: string | null = null;
  try {
    bookingId = str(((await req.json()) as { bookingId?: unknown }).bookingId);
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }
  if (!bookingId) return NextResponse.json({ error: 'Missing bookingId' }, { status: 400 });

  const [bookingSnap, lessonSnap] = await Promise.all([
    adminDb.collection(TUTORING_BOOKINGS_COLLECTION).doc(bookingId).get(),
    adminDb.collection(TUTORING_LESSONS_COLLECTION).doc(bookingId).get(),
  ]);
  if (!bookingSnap.exists) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  const booking = bookingSnap.data() ?? {};
  const lesson = lessonSnap.data();

  const notes = readNotes(lesson);
  if (!notes.summary.trim()) {
    return NextResponse.json({ error: 'Write a summary before sharing' }, { status: 400 });
  }
  const to = str(booking.attendeeEmail);
  if (!to) return NextResponse.json({ error: 'This booking has no email to send to' }, { status: 400 });

  const course = courseFor(booking, lesson).course;
  const sharedAt = new Date().toISOString();
  const boards = readBoards(lesson?.boards);

  // The practice set goes out as a custom assignment link; it's reused while its questions are unchanged.
  const stored = readStoredPractice(lesson?.practice);
  let practice: { path: string; count: number } | null = null;
  let practiceUpdate: Record<string, unknown> | null = null;
  if (stored?.include && stored.questionIds.length > 0) {
    const sameAsSent =
      stored.linkId &&
      stored.encodedParam &&
      JSON.stringify(stored.linkQuestionIds ?? []) === JSON.stringify(stored.questionIds);
    let encodedParam = stored.encodedParam ?? '';
    if (!sameAsSent) {
      encodedParam = practiceEncodedParam(stored.questionIds);
      const studentFirst = (str(booking.attendeeName) ?? '').split(' ')[0];
      const link = await adminDb.collection('assignmentLinks').add({
        tutorId: adminUid,
        questionIds: stored.questionIds,
        encodedParam,
        url: `https://apdojo.com${practicePath(encodedParam)}`,
        subject: course ? COURSE_SUBJECT_TAGS[course] : null,
        totalQuestions: stored.questionIds.length,
        assignmentName: `Lesson practice${studentFirst ? `: ${studentFirst}` : ''}`,
        source: 'lesson-practice',
        lessonBookingId: bookingId,
        createdAt: FieldValue.serverTimestamp(),
      });
      practiceUpdate = { ...stored, linkId: link.id, encodedParam, linkQuestionIds: stored.questionIds };
    }
    practice = { path: practicePath(encodedParam), count: stored.questionIds.length };
  }

  const shared = buildSharedNotes(notes, sanitizeSkills(lesson?.skills), course, sharedAt, boards, practice);
  const isUpdate = lesson?.status === 'shared';
  const previous = isUpdate ? readSharedNotes(lesson?.shared) : null;

  let emailSent = false;
  const apiKey = process.env.RESEND_API_KEY;
  if (apiKey) {
    const email = lessonNotesEmail({
      shared,
      lessonStart: str(booking.startTime),
      isUpdate,
      // Locally, the email's links open the local server so changes can be checked before shipping.
      siteUrl: process.env.NODE_ENV === 'production' ? 'https://apdojo.com' : new URL(req.url).origin,
    });
    const { error } = await new Resend(apiKey).emails.send({
      from: process.env.RESEND_FROM ?? 'Garrett at AP Dojo <garrett@apdojo.com>',
      replyTo: 'garrett@apdojo.com',
      to,
      subject: email.subject,
      html: email.html,
      text: email.text,
    });
    if (error) {
      console.error(`Lesson share: email to booking ${bookingId} failed:`, error);
      return NextResponse.json({ error: `The email didn't send: ${error.message}` }, { status: 502 });
    }
    emailSent = true;
  } else if (process.env.NODE_ENV === 'production') {
    console.error('Lesson share: RESEND_API_KEY is not configured');
    return NextResponse.json({ error: 'Email is not configured' }, { status: 500 });
  }

  try {
    await lessonSnap.ref.set(
      {
        status: 'shared',
        shared,
        sharedTo: to,
        sharedBy: adminUid,
        editedSinceShare: false,
        ...(practiceUpdate ? { practice: practiceUpdate } : {}),
        // The no-login link for texting: made once, then kept so links already sent keep working.
        shareToken: str(lesson?.shareToken) ?? randomBytes(18).toString('base64url'),
        shareLinkEnabled: lesson?.shareLinkEnabled !== false,
        shareCount: (typeof lesson?.shareCount === 'number' ? lesson.shareCount : 0) + 1,
      },
      { merge: true },
    );
  } catch (error) {
    console.error(`Lesson share: failed to save shared state for ${bookingId}:`, error);
    return NextResponse.json({ error: 'The email sent, but saving the shared state failed. Refresh.' }, { status: 500 });
  }

  // Boards removed from the draft but kept for the previous version: the family no longer sees them now.
  const orphaned = (previous?.boards ?? []).filter((old) => !boards.some((b) => b.id === old.id));
  if (orphaned.length) {
    await deleteBoardFiles(bookingId, orphaned).catch((e) => console.error('Lesson share: board cleanup failed:', e));
  }

  const sharedBoards = await withBoardLinks(bookingId, boards);
  const saved = (await lessonSnap.ref.get()).data();
  return NextResponse.json({
    shared: { ...shared, boards: sharedBoards, sharedTo: to },
    emailSent,
    shareLink: { token: str(saved?.shareToken) as string, enabled: saved?.shareLinkEnabled !== false },
  });
}
