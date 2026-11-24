import { NextResponse } from 'next/server';
import { auth as adminAuth, db as adminDb } from '@/lib/firebase-admin';
import {
  TUTORING_BOOKINGS_COLLECTION,
  calManageBookingUrl,
  type TutoringBooking,
  type TutoringBookingStatus,
} from '@/lib/tutoringBookings';

export const runtime = 'nodejs';

const STATUSES: TutoringBookingStatus[] = ['confirmed', 'pending', 'cancelled', 'rescheduled'];

/** The signed-in user's tutoring bookings, oldest first. */
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
    // Matching by email only for verified addresses, so nobody can see bookings by signing up with someone
    // else's email.
    verifiedEmail = decoded.email && decoded.email_verified ? decoded.email.toLowerCase() : null;
  } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const bookings = adminDb.collection(TUTORING_BOOKINGS_COLLECTION);
    const snapshots = await Promise.all([
      bookings.where('userId', '==', uid).get(),
      verifiedEmail ? bookings.where('attendeeEmail', '==', verifiedEmail).get() : null,
    ]);

    const byId = new Map<string, TutoringBooking>();
    for (const snapshot of snapshots) {
      snapshot?.forEach((doc) => {
        const data = doc.data();
        // A booking explicitly linked to another account stays with that account.
        if (data.userId && data.userId !== uid) return;
        byId.set(doc.id, {
          id: doc.id,
          title: typeof data.title === 'string' ? data.title : 'Tutoring session',
          startTime: typeof data.startTime === 'string' ? data.startTime : null,
          endTime: typeof data.endTime === 'string' ? data.endTime : null,
          status: STATUSES.includes(data.status) ? data.status : 'pending',
          meetingUrl: typeof data.meetingUrl === 'string' ? data.meetingUrl : null,
          attendeeName: typeof data.attendeeName === 'string' ? data.attendeeName : null,
          manageUrl: calManageBookingUrl(doc.id),
        });
      });
    }

    const list = [...byId.values()].sort((a, b) => (a.startTime ?? '').localeCompare(b.startTime ?? ''));
    return NextResponse.json({ bookings: list });
  } catch (error) {
    console.error('Error loading tutoring bookings:', error);
    return NextResponse.json({ error: 'Failed to load bookings' }, { status: 500 });
  }
}
