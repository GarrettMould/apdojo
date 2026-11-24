import { createHmac, timingSafeEqual } from 'crypto';
import { NextResponse } from 'next/server';
import { FieldValue } from 'firebase-admin/firestore';
import { auth as adminAuth, db as adminDb } from '@/lib/firebase-admin';
import {
  CAL_METADATA_UID_KEY,
  TUTORING_BOOKINGS_COLLECTION,
  type TutoringBookingStatus,
} from '@/lib/tutoringBookings';

/**
 * Cal.com booking webhook. Cal.com calls this when a tutoring session is booked, paid for, rescheduled or
 * cancelled, and the booking is saved so it shows on the right user's My Bookings page.
 *
 * Setup in Cal.com (Settings -> Developer -> Webhooks): URL `https://apdojo.com/api/cal/webhook`, a secret
 * that matches the CAL_WEBHOOK_SECRET environment variable, and the booking created, rescheduled, cancelled,
 * rejected, requested and paid events.
 */
export const runtime = 'nodejs';

type CalPerson = { email?: string; name?: string; timeZone?: string };
type CalPayload = {
  uid?: string;
  title?: string;
  startTime?: string;
  endTime?: string;
  status?: string;
  location?: string;
  rescheduleUid?: string;
  type?: string;
  attendees?: CalPerson[];
  metadata?: Record<string, unknown>;
  videoCallData?: { url?: string };
};
type CalWebhookEvent = { triggerEvent?: string; payload?: CalPayload };

function hasValidSignature(rawBody: string, signature: string | null, secret: string): boolean {
  if (!signature) return false;
  const expected = Buffer.from(createHmac('sha256', secret).update(rawBody).digest('hex'));
  const received = Buffer.from(signature.trim());
  return expected.length === received.length && timingSafeEqual(expected, received);
}

function statusFor(trigger: string, payload: CalPayload): TutoringBookingStatus | null {
  switch (trigger) {
    case 'BOOKING_CANCELLED':
    case 'BOOKING_REJECTED':
      return 'cancelled';
    case 'BOOKING_PAID':
      return 'confirmed';
    case 'BOOKING_REQUESTED':
      return 'pending';
    case 'BOOKING_CREATED':
    case 'BOOKING_RESCHEDULED':
      return payload.status && payload.status.toUpperCase() !== 'ACCEPTED' ? 'pending' : 'confirmed';
    default:
      return null;
  }
}

/** The Google Meet (or other video) link Cal.com attached to the booking, if any. */
function meetingUrlFor(payload: CalPayload): string | null {
  const candidates = [payload.metadata?.videoCallUrl, payload.videoCallData?.url, payload.location];
  for (const candidate of candidates) {
    if (typeof candidate === 'string' && candidate.startsWith('https://')) return candidate;
  }
  return null;
}

/**
 * The AP Dojo account a booking belongs to: the user id the embed passed in, or else an account whose
 * verified email matches the attendee's.
 */
async function findUserId(payload: CalPayload, attendeeEmail: string | null): Promise<string | null> {
  if (!adminAuth) return null;
  const fromEmbed = payload.metadata?.[CAL_METADATA_UID_KEY];
  if (typeof fromEmbed === 'string' && fromEmbed.length > 0 && fromEmbed.length <= 128) {
    try {
      return (await adminAuth.getUser(fromEmbed)).uid;
    } catch {
      // Not a real account; fall back to the email.
    }
  }
  if (!attendeeEmail) return null;
  try {
    const user = await adminAuth.getUserByEmail(attendeeEmail);
    return user.emailVerified ? user.uid : null;
  } catch {
    return null;
  }
}

export async function POST(req: Request) {
  const secret = process.env.CAL_WEBHOOK_SECRET;
  if (!secret || !adminDb) {
    console.error('Cal webhook: CAL_WEBHOOK_SECRET or Firebase Admin is not configured');
    return NextResponse.json({ error: 'Not configured' }, { status: 500 });
  }

  const rawBody = await req.text();
  if (!hasValidSignature(rawBody, req.headers.get('x-cal-signature-256'), secret)) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
  }

  let event: CalWebhookEvent;
  try {
    event = JSON.parse(rawBody) as CalWebhookEvent;
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const trigger = event.triggerEvent ?? '';
  const payload = event.payload ?? {};
  const status = statusFor(trigger, payload);
  // Pings and events we don't track are acknowledged so Cal.com doesn't retry them.
  if (!status || !payload.uid) return NextResponse.json({ received: true });

  const attendee = payload.attendees?.[0];
  const attendeeEmail = attendee?.email?.trim().toLowerCase() || null;
  const userId = await findUserId(payload, attendeeEmail);

  const record: Record<string, unknown> = {
    status,
    lastEvent: trigger,
    updatedAt: FieldValue.serverTimestamp(),
  };
  if (userId) record.userId = userId;
  if (attendeeEmail) record.attendeeEmail = attendeeEmail;
  if (attendee?.name) record.attendeeName = attendee.name;
  if (attendee?.timeZone) record.attendeeTimeZone = attendee.timeZone;
  if (payload.title) record.title = payload.title;
  if (payload.type) record.eventType = payload.type;
  if (payload.startTime) record.startTime = payload.startTime;
  if (payload.endTime) record.endTime = payload.endTime;
  const meetingUrl = meetingUrlFor(payload);
  if (meetingUrl) record.meetingUrl = meetingUrl;

  try {
    const bookings = adminDb.collection(TUTORING_BOOKINGS_COLLECTION);
    await bookings.doc(payload.uid).set(record, { merge: true });
    if (trigger === 'BOOKING_RESCHEDULED' && payload.rescheduleUid && payload.rescheduleUid !== payload.uid) {
      await bookings.doc(payload.rescheduleUid).set(
        { status: 'rescheduled', rescheduledTo: payload.uid, updatedAt: FieldValue.serverTimestamp() },
        { merge: true },
      );
    }
  } catch (error) {
    console.error(`Cal webhook: failed to save booking ${payload.uid}:`, error);
    return NextResponse.json({ error: 'Failed to save booking' }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}
