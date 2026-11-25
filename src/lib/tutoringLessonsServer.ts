/**
 * Server-side helpers for tutoring lesson documents, shared by the admin lesson routes.
 */
import type { DocumentData } from 'firebase-admin/firestore';
import {
  EMPTY_LESSON_NOTES,
  LESSON_NOTE_FIELDS,
  detectCourse,
  isLessonCourse,
  readBoards,
  readSharedNotes,
  type AdminLessonDetail,
  type LessonCourse,
  type LessonNotes,
  type LessonNotesState,
  type SharedLessonNotes,
} from '@/lib/tutoringLessons';

export const str = (value: unknown): string | null => (typeof value === 'string' ? value : null);

export function readNotes(lesson: DocumentData | undefined): LessonNotes {
  const notes = { ...EMPTY_LESSON_NOTES };
  for (const { key } of LESSON_NOTE_FIELDS) {
    notes[key] = str(lesson?.notes?.[key]) ?? '';
  }
  return notes;
}

function hasContent(lesson: DocumentData | undefined): boolean {
  if (!lesson) return false;
  return (
    Boolean(str(lesson.transcript)?.trim()) ||
    Object.values(readNotes(lesson)).some((v) => v.trim()) ||
    readBoards(lesson.boards).length > 0
  );
}

/** The lesson's course: named by the booking if possible, otherwise the one saved from the AI draft. */
export function courseFor(booking: DocumentData, lesson: DocumentData | undefined) {
  const fromBooking = detectCourse(`${str(booking.title) ?? ''} ${str(booking.subjectAnswer) ?? ''}`);
  if (fromBooking) return { course: fromBooking, courseSource: 'booking' as const };
  if (isLessonCourse(lesson?.course)) return { course: lesson.course as LessonCourse, courseSource: 'ai' as const };
  return { course: null, courseSource: null };
}

export function notesStateFor(lesson: DocumentData | undefined): LessonNotesState {
  if (lesson?.status === 'shared' && readSharedNotes(lesson.shared)) return 'shared';
  return hasContent(lesson) ? 'draft' : 'none';
}

export function sharedFor(lesson: DocumentData | undefined): AdminLessonDetail['shared'] {
  const shared = lesson?.status === 'shared' ? readSharedNotes(lesson.shared) : null;
  return shared ? { ...shared, sharedTo: str(lesson?.sharedTo) } : null;
}

/** Whether the notes and skills match what the family was sent (ignoring when it was sent). */
export function matchesShared(lesson: DocumentData | undefined, current: SharedLessonNotes): boolean {
  const shared = readSharedNotes(lesson?.shared);
  if (!shared) return false;
  const strip = ({ notes, skills, course, boards }: SharedLessonNotes) =>
    JSON.stringify({ notes, skills, course, boards: boards.map(({ id, caption }) => ({ id, caption })) });
  return strip(shared) === strip(current);
}

