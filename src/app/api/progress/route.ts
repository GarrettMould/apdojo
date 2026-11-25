import { NextResponse } from 'next/server';
import { auth as adminAuth, db as adminDb } from '@/lib/firebase-admin';
import { buildStudentProgress } from '@/lib/studentProgressServer';

export const runtime = 'nodejs';
export const maxDuration = 30;

/** The signed-in student's own progress report. */
export async function GET(req: Request) {
  const header = req.headers.get('authorization') ?? '';
  const token = header.startsWith('Bearer ') ? header.slice('Bearer '.length).trim() : '';
  if (!token || !adminAuth || !adminDb) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let uid: string;
  let verifiedEmail: string | null;
  try {
    const decoded = await adminAuth.verifyIdToken(token);
    uid = decoded.uid;
    verifiedEmail = decoded.email && decoded.email_verified ? decoded.email : null;
  } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const progress = await buildStudentProgress(adminDb, uid, { audience: 'student', verifiedEmail });
    return NextResponse.json({ progress });
  } catch (error) {
    console.error(`Progress report failed for ${uid}:`, error);
    return NextResponse.json({ error: 'Could not build the report' }, { status: 500 });
  }
}
