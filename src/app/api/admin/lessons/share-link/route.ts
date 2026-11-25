import { NextResponse } from 'next/server';
import { db as adminDb } from '@/lib/firebase-admin';
import { getAdminUid } from '@/lib/adminAuth';
import { TUTORING_LESSONS_COLLECTION } from '@/lib/tutoringLessons';
import { str } from '@/lib/tutoringLessonsServer';

export const runtime = 'nodejs';

/** Admin only. Turns a lesson's no-login notes link on or off. Body: `{ bookingId, enabled }`. */
export async function POST(req: Request) {
  if (!adminDb || !(await getAdminUid(req))) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  let body: { bookingId?: unknown; enabled?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }
  const bookingId = str(body.bookingId);
  if (!bookingId || typeof body.enabled !== 'boolean') {
    return NextResponse.json({ error: 'Missing bookingId or enabled' }, { status: 400 });
  }

  const ref = adminDb.collection(TUTORING_LESSONS_COLLECTION).doc(bookingId);
  const lesson = (await ref.get()).data();
  const token = str(lesson?.shareToken);
  if (!token) return NextResponse.json({ error: 'Send the notes first' }, { status: 400 });
  await ref.set({ shareLinkEnabled: body.enabled }, { merge: true });
  return NextResponse.json({ shareLink: { token, enabled: body.enabled } });
}
