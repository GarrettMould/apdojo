import { randomUUID } from 'node:crypto';
import { NextResponse } from 'next/server';
import { FieldValue } from 'firebase-admin/firestore';
import { db as adminDb } from '@/lib/firebase-admin';
import { getAdminUid } from '@/lib/adminAuth';
import { TUTORING_BOOKINGS_COLLECTION } from '@/lib/tutoringBookings';
import {
  LESSON_BOARD_TYPES,
  MAX_BOARD_BYTES,
  MAX_LESSON_BOARDS,
  TUTORING_LESSONS_COLLECTION,
  readBoards,
  readSharedNotes,
  type LessonBoard,
} from '@/lib/tutoringLessons';
import { boardPath, boardsBucket, deleteBoardFiles, withBoardLinks } from '@/lib/lessonBoardsServer';

export const runtime = 'nodejs';

/**
 * Admin only. Whiteboard snapshots on a lesson.
 * - POST (multipart: bookingId, file): stores the file and adds it to the lesson's boards.
 * - DELETE ?bookingId=&boardId=: removes it from the lesson, and deletes the file unless the family's
 *   shared notes still show it (the share route cleans those up when the notes are next sent).
 */
export async function POST(req: Request) {
  const adminUid = adminDb ? await getAdminUid(req) : null;
  if (!adminDb || !adminUid) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  const db = adminDb;

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return NextResponse.json({ error: 'The upload was too large or malformed' }, { status: 400 });
  }
  const bookingId = form.get('bookingId');
  const file = form.get('file');
  if (typeof bookingId !== 'string' || !bookingId || !(file instanceof File)) {
    return NextResponse.json({ error: 'Missing bookingId or file' }, { status: 400 });
  }
  if (!LESSON_BOARD_TYPES[file.type]) {
    return NextResponse.json({ error: 'Upload a PNG, JPG, WebP or PDF' }, { status: 400 });
  }
  if (file.size > MAX_BOARD_BYTES) {
    return NextResponse.json({ error: 'That file is over 4 MB' }, { status: 400 });
  }

  const booking = await db.collection(TUTORING_BOOKINGS_COLLECTION).doc(bookingId).get();
  if (!booking.exists) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  const lessonRef = db.collection(TUTORING_LESSONS_COLLECTION).doc(bookingId);
  const board: LessonBoard = {
    id: randomUUID(),
    name: (file.name || 'Whiteboard').slice(0, 200),
    contentType: file.type,
    caption: '',
  };

  const existing = readBoards((await lessonRef.get()).data()?.boards);
  if (existing.length >= MAX_LESSON_BOARDS) {
    return NextResponse.json({ error: `A lesson can have up to ${MAX_LESSON_BOARDS} whiteboards` }, { status: 400 });
  }

  try {
    await boardsBucket()
      .file(boardPath(bookingId, board))
      .save(Buffer.from(await file.arrayBuffer()), { contentType: file.type, resumable: false });
  } catch (error) {
    console.error(`Lesson boards: upload for ${bookingId} failed:`, error);
    return NextResponse.json({ error: 'The upload failed. Try again.' }, { status: 500 });
  }

  // Appended in a transaction so two quick uploads don't overwrite each other.
  try {
    await db.runTransaction(async (tx) => {
      const snap = await tx.get(lessonRef);
      const boards = readBoards(snap.data()?.boards);
      tx.set(
        lessonRef,
        {
          bookingId,
          boards: [...boards, board],
          ...(snap.exists ? {} : { status: 'draft', createdAt: FieldValue.serverTimestamp() }),
          ...(snap.data()?.status === 'shared' ? { editedSinceShare: true } : {}),
          updatedBy: adminUid,
          updatedAt: FieldValue.serverTimestamp(),
        },
        { merge: true },
      );
    });
  } catch (error) {
    console.error(`Lesson boards: saving board for ${bookingId} failed:`, error);
    await deleteBoardFiles(bookingId, [board]).catch(() => {});
    return NextResponse.json({ error: 'The upload failed. Try again.' }, { status: 500 });
  }

  const [view] = await withBoardLinks(bookingId, [board]);
  return NextResponse.json({ board: view ?? { ...board, url: '' } });
}

export async function DELETE(req: Request) {
  const adminUid = adminDb ? await getAdminUid(req) : null;
  if (!adminDb || !adminUid) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  const db = adminDb;

  const params = new URL(req.url).searchParams;
  const bookingId = params.get('bookingId');
  const boardId = params.get('boardId');
  if (!bookingId || !boardId) return NextResponse.json({ error: 'Missing bookingId or boardId' }, { status: 400 });

  const lessonRef = db.collection(TUTORING_LESSONS_COLLECTION).doc(bookingId);
  let removed: LessonBoard | null = null;
  let stillShared = false;
  await db.runTransaction(async (tx) => {
    const snap = await tx.get(lessonRef);
    const data = snap.data();
    const boards = readBoards(data?.boards);
    removed = boards.find((b) => b.id === boardId) ?? null;
    if (!removed) return;
    const shared = data?.status === 'shared' ? readSharedNotes(data.shared) : null;
    stillShared = !!shared?.boards.some((b) => b.id === boardId);
    tx.set(
      lessonRef,
      {
        boards: boards.filter((b) => b.id !== boardId),
        ...(shared ? { editedSinceShare: true } : {}),
        updatedBy: adminUid,
        updatedAt: FieldValue.serverTimestamp(),
      },
      { merge: true },
    );
  });

  if (!removed) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  if (!stillShared) await deleteBoardFiles(bookingId, [removed]).catch((e) => console.error('Lesson boards: delete failed:', e));
  return NextResponse.json({ removed: true });
}
