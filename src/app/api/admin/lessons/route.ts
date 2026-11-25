import { NextResponse } from 'next/server';
import { FieldValue, type DocumentData, type Timestamp } from 'firebase-admin/firestore';
import { db as adminDb } from '@/lib/firebase-admin';
import { getAdminUid } from '@/lib/adminAuth';
import { withBoardLinks } from '@/lib/lessonBoardsServer';
import { practiceView, readStoredPractice } from '@/lib/practiceEngine';
import { courseFor, matchesShared, notesStateFor, readNotes, sharedFor, str } from '@/lib/tutoringLessonsServer';
import { TUTORING_BOOKINGS_COLLECTION } from '@/lib/tutoringBookings';
import {
  EMPTY_LESSON_NOTES,
  LESSON_NOTE_FIELDS,
  MAX_BOARD_CAPTION_CHARS,
  MAX_NOTE_CHARS,
  MAX_TRANSCRIPT_CHARS,
  TUTORING_LESSONS_COLLECTION,
  isLessonCourse,
  buildSharedNotes,
  readBoards,
  sanitizeSkills,
  type AdminLessonDetail,
  type AdminLessonListItem,
} from '@/lib/tutoringLessons';

export const runtime = 'nodejs';

function toListItem(bookingId: string, booking: DocumentData, lesson: DocumentData | undefined): AdminLessonListItem {
  const notesState = notesStateFor(lesson);
  return {
    bookingId,
    title: str(booking.title) ?? 'Tutoring session',
    startTime: str(booking.startTime),
    endTime: str(booking.endTime),
    bookingStatus: str(booking.status) ?? 'pending',
    studentName: str(booking.attendeeName),
    studentEmail: str(booking.attendeeEmail),
    studentUserId: str(booking.userId),
    notesState,
    editedSinceShare: notesState === 'shared' && lesson?.editedSinceShare === true,
    hasTranscript: Boolean(str(lesson?.transcript)?.trim()),
  };
}

/**
 * Admin only. With no query, every booked session with its notes status, newest first.
 * With `?bookingId=`, that session with its transcript and notes.
 */
export async function GET(req: Request) {
  if (!adminDb || !(await getAdminUid(req))) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const bookingId = new URL(req.url).searchParams.get('bookingId');
  try {
    if (bookingId) {
      const [bookingSnap, lessonSnap] = await Promise.all([
        adminDb.collection(TUTORING_BOOKINGS_COLLECTION).doc(bookingId).get(),
        adminDb.collection(TUTORING_LESSONS_COLLECTION).doc(bookingId).get(),
      ]);
      if (!bookingSnap.exists) return NextResponse.json({ error: 'Not found' }, { status: 404 });
      const lesson = lessonSnap.data();
      const updatedAt = lesson?.updatedAt as Timestamp | undefined;
      const shared = sharedFor(lesson);
      const booking = bookingSnap.data() ?? {};
      const lessonSkills = sanitizeSkills(lesson?.skills);
      const [boards, sharedBoards, practice] = await Promise.all([
        withBoardLinks(bookingId, readBoards(lesson?.boards)),
        shared ? withBoardLinks(bookingId, shared.boards) : [],
        practiceView(adminDb, readStoredPractice(lesson?.practice), lessonSkills, courseFor(booking, lesson).course),
      ]);
      const detail: AdminLessonDetail = {
        ...toListItem(bookingId, bookingSnap.data() ?? {}, lesson),
        transcript: str(lesson?.transcript) ?? '',
        notes: readNotes(lesson),
        skills: sanitizeSkills(lesson?.skills),
        ...courseFor(bookingSnap.data() ?? {}, lesson),
        updatedAt: updatedAt?.toDate?.().toISOString() ?? null,
        boards,
        practice,
        shareLink: str(lesson?.shareToken) ? { token: str(lesson?.shareToken) as string, enabled: lesson?.shareLinkEnabled !== false } : null,
        shared: shared ? { ...shared, boards: sharedBoards } : null,
      };
      return NextResponse.json({ lesson: detail });
    }

    const [bookingsSnap, lessonsSnap] = await Promise.all([
      adminDb.collection(TUTORING_BOOKINGS_COLLECTION).get(),
      adminDb.collection(TUTORING_LESSONS_COLLECTION).get(),
    ]);
    const lessons = new Map(lessonsSnap.docs.map((doc) => [doc.id, doc.data()]));
    const list = bookingsSnap.docs
      .map((doc) => toListItem(doc.id, doc.data(), lessons.get(doc.id)))
      .sort((a, b) => (b.startTime ?? '').localeCompare(a.startTime ?? ''));
    return NextResponse.json({ lessons: list });
  } catch (error) {
    console.error('Error loading lessons:', error);
    return NextResponse.json({ error: 'Failed to load lessons' }, { status: 500 });
  }
}

/** Admin only. Saves a session's transcript, notes and skills. Body: `{ bookingId, transcript, notes, skills, course }`. */
export async function PUT(req: Request) {
  const adminUid = adminDb ? await getAdminUid(req) : null;
  if (!adminDb || !adminUid) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  let body: {
    bookingId?: unknown;
    transcript?: unknown;
    notes?: Record<string, unknown>;
    skills?: unknown;
    course?: unknown;
    boards?: unknown;
  };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const bookingId = str(body.bookingId);
  const transcript = str(body.transcript) ?? '';
  if (!bookingId) return NextResponse.json({ error: 'Missing bookingId' }, { status: 400 });
  if (transcript.length > MAX_TRANSCRIPT_CHARS) {
    return NextResponse.json({ error: 'Transcript is too long' }, { status: 400 });
  }
  const notes = { ...EMPTY_LESSON_NOTES };
  for (const { key, label } of LESSON_NOTE_FIELDS) {
    const value = str(body.notes?.[key]) ?? '';
    if (value.length > MAX_NOTE_CHARS) {
      return NextResponse.json({ error: `${label} is too long` }, { status: 400 });
    }
    notes[key] = value;
  }

  try {
    const bookingSnap = await adminDb.collection(TUTORING_BOOKINGS_COLLECTION).doc(bookingId).get();
    if (!bookingSnap.exists) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    const booking = bookingSnap.data() ?? {};

    const aiCourse = isLessonCourse(body.course) ? body.course : null;
    const lessonCourse = courseFor(booking, { course: aiCourse }).course;
    // Skills added before the course was known take the lesson's course.
    const rawSkills = Array.isArray(body.skills) ? body.skills : [];
    const skills = sanitizeSkills(
      rawSkills.map((s) => (s && typeof s === 'object' ? { ...s, course: (s as { course?: unknown }).course ?? lessonCourse } : s)),
    );

    const lessonRef = adminDb.collection(TUTORING_LESSONS_COLLECTION).doc(bookingId);
    const existing = await lessonRef.get();
    const existingData = existing.data();
    // Boards are added and removed by their own endpoint; saving only reorders them and edits captions.
    const storedBoards = readBoards(existingData?.boards);
    const edits = Array.isArray(body.boards) ? (body.boards as { id?: unknown; caption?: unknown }[]) : null;
    const boards = edits
      ? [
          ...edits.flatMap((e) => {
            const b = storedBoards.find((stored) => stored.id === e?.id);
            return b ? [{ ...b, caption: (str(e.caption) ?? '').slice(0, MAX_BOARD_CAPTION_CHARS) }] : [];
          }),
          ...storedBoards.filter((b) => !edits.some((e) => e?.id === b.id)),
        ]
      : storedBoards;
    const wasShared = existingData?.status === 'shared';
    const editedSinceShare =
      wasShared && !matchesShared(existingData, buildSharedNotes(notes, skills, lessonCourse, '', boards));
    await lessonRef.set(
      {
        bookingId,
        // Copied from the booking so lessons can be listed per student without joining.
        studentUserId: str(booking.userId),
        studentEmail: str(booking.attendeeEmail),
        studentName: str(booking.attendeeName),
        lessonStartTime: str(booking.startTime),
        transcript,
        notes,
        skills,
        boards,
        // The AI-detected course; a course named by the booking takes precedence when reading.
        course: aiCourse,
        // Saving never un-shares: the family keeps seeing the shared version until it is sent again.
        status: wasShared ? 'shared' : 'draft',
        editedSinceShare,
        updatedBy: adminUid,
        updatedAt: FieldValue.serverTimestamp(),
        ...(existing.exists ? {} : { createdAt: FieldValue.serverTimestamp() }),
      },
      { merge: true },
    );
    return NextResponse.json({ saved: true, editedSinceShare });
  } catch (error) {
    console.error(`Error saving lesson ${bookingId}:`, error);
    return NextResponse.json({ error: 'Failed to save lesson' }, { status: 500 });
  }
}
