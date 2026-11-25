import { NextResponse } from 'next/server';
import { getAdminUid } from '@/lib/adminAuth';
import { draftLessonNotes } from '@/lib/lessonNotesDraft';
import { MAX_TRANSCRIPT_CHARS, isLessonCourse } from '@/lib/tutoringLessons';

export const runtime = 'nodejs';
export const maxDuration = 60;

/**
 * Admin only. Drafts lesson notes and skills from a transcript. Body: `{ transcript, studentName?, course? }`.
 * Returns the draft without saving it; the tutor reviews it in the editor and saves from there.
 */
export async function POST(req: Request) {
  if (!(await getAdminUid(req))) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  let body: { transcript?: unknown; studentName?: unknown; course?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }
  const transcript = typeof body.transcript === 'string' ? body.transcript.trim() : '';
  const studentName = typeof body.studentName === 'string' ? body.studentName : null;
  if (transcript.length < 200) {
    return NextResponse.json({ error: 'Paste a longer transcript first' }, { status: 400 });
  }
  if (transcript.length > MAX_TRANSCRIPT_CHARS) {
    return NextResponse.json({ error: 'Transcript is too long' }, { status: 400 });
  }

  try {
    const draft = await draftLessonNotes(transcript, studentName, isLessonCourse(body.course) ? body.course : null);
    return NextResponse.json(draft);
  } catch (error) {
    console.error('Error drafting lesson notes:', error);
    return NextResponse.json({ error: 'Could not draft notes. Try again.' }, { status: 502 });
  }
}
