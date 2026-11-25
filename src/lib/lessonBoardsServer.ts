/**
 * Whiteboard files for lesson notes, in Firebase Storage under tutoringLessons/{bookingId}/. Storage rules
 * deny that path to browsers, so only the server (Admin SDK) touches the files, and people see them through
 * short-lived signed links. Server only.
 */
import * as admin from 'firebase-admin';
import '@/lib/firebase-admin';
import { LESSON_BOARD_TYPES, type LessonBoard, type LessonBoardView } from '@/lib/tutoringLessons';

/** How long a viewing link works. Pages are reloaded well within this. */
const LINK_TTL_MS = 60 * 60 * 1000;

export function boardsBucket() {
  return admin.storage().bucket(process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET);
}

export function boardPath(bookingId: string, board: Pick<LessonBoard, 'id' | 'contentType'>): string {
  return `tutoringLessons/${bookingId}/${board.id}.${LESSON_BOARD_TYPES[board.contentType] ?? 'bin'}`;
}

/** The boards with viewing links. A board whose link can't be made is left out rather than shown broken. */
export async function withBoardLinks(bookingId: string, boards: LessonBoard[]): Promise<LessonBoardView[]> {
  if (boards.length === 0) return [];
  const bucket = boardsBucket();
  const expires = Date.now() + LINK_TTL_MS;
  const signed = await Promise.all(
    boards.map(async (b) => {
      try {
        const [url] = await bucket.file(boardPath(bookingId, b)).getSignedUrl({ action: 'read', expires, version: 'v4' });
        return { ...b, url };
      } catch (error) {
        console.error(`Lesson boards: couldn't sign ${bookingId}/${b.id}:`, error);
        return null;
      }
    }),
  );
  return signed.filter((b): b is LessonBoardView => b !== null);
}

/** Deletes board files, ignoring ones already gone. */
export async function deleteBoardFiles(bookingId: string, boards: Pick<LessonBoard, 'id' | 'contentType'>[]) {
  const bucket = boardsBucket();
  await Promise.all(boards.map((b) => bucket.file(boardPath(bookingId, b)).delete({ ignoreNotFound: true })));
}
