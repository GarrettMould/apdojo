import { NextResponse } from 'next/server';
import { FieldValue } from 'firebase-admin/firestore';
import { db as adminDb } from '@/lib/firebase-admin';
import { stripe } from '@/lib/stripe-server';
import { getSeasonPassExpirationDate } from '@/lib/seasonPassExpiration';

const TEST_SESSION_ID = 'test';
const TEST_EMAIL = 'testdojo@gmail.com';
const TEST_COURSE_TYPE = 'macro';
/** The claim page only grants a pass for recent checkouts; the Stripe webhook is the lasting record. */
const DIRECT_GRANT_WINDOW_SECONDS = 24 * 60 * 60;

function subjectsForCourse(courseType: string): string[] {
  return courseType === 'bundle' ? ['macro', 'micro'] : [courseType];
}

/**
 * Adds the pass to an account without waiting for the webhook. Safe to repeat, and never shortens
 * an expiration date that is already later.
 */
async function grantSeasonPass(uid: string, subjects: string[], purchasedAt: Date) {
  if (!adminDb) throw new Error('Database not initialized');
  const expirationDate = getSeasonPassExpirationDate(purchasedAt);
  const userRef = adminDb.collection('users').doc(uid);
  const userDoc = await userRef.get();
  const expiration: Record<string, string> = { ...(userDoc.data()?.seasonPassExpiration || {}) };
  subjects.forEach((subject) => {
    const existing = expiration[subject];
    if (!existing || new Date(expirationDate) > new Date(existing)) expiration[subject] = expirationDate;
  });
  await userRef.set(
    { seasonPass: FieldValue.arrayUnion(...subjects), seasonPassExpiration: expiration },
    { merge: true },
  );
}

export async function POST(req: Request) {
  try {
    if (!adminDb) {
      return NextResponse.json({ error: 'Database not initialized' }, { status: 500 });
    }

    const { sessionId } = await req.json();

    if (!sessionId) {
      return NextResponse.json({ error: 'Missing sessionId' }, { status: 400 });
    }

    let email: string;
    let courseType: string;

    if (sessionId === TEST_SESSION_ID) {
      // Test flow: use preset values
      email = TEST_EMAIL;
      courseType = TEST_COURSE_TYPE;
    } else {
      // Real flow: fetch session from Stripe
      const session = await stripe.checkout.sessions.retrieve(sessionId);
      if (session.payment_status !== 'paid' && session.payment_status !== 'no_payment_required') {
        return NextResponse.json({ error: 'This payment has not been completed' }, { status: 402 });
      }

      const metadata = session.metadata || {};
      if (metadata.purchaseType !== 'season-pass' || !metadata.courseType) {
        return NextResponse.json({ error: 'Session is not a season pass purchase' }, { status: 400 });
      }

      // Bought while logged in (or by a parent for a student): the pass belongs to that account,
      // whatever email was typed into Stripe.
      const linkedUserId = metadata.userId || session.client_reference_id;
      if (linkedUserId) {
        const subjects = subjectsForCourse(metadata.courseType);
        const ageSeconds = Date.now() / 1000 - session.created;
        if (ageSeconds <= DIRECT_GRANT_WINDOW_SECONDS) {
          await grantSeasonPass(linkedUserId, subjects, new Date(session.created * 1000));
        }
        return NextResponse.json({
          linked: true,
          courseType: metadata.courseType,
          subjects,
          isParentGift: metadata.source === 'parent_gift',
        });
      }

      const sessionEmail = session.customer_details?.email?.toLowerCase();
      if (!sessionEmail) {
        return NextResponse.json({ error: 'No email found on Stripe session' }, { status: 400 });
      }

      email = sessionEmail;
      courseType = metadata.courseType;
    }

    // Store pending pass in Firestore keyed by email
    const expirationDate = getSeasonPassExpirationDate();
    const subjects = subjectsForCourse(courseType);
    const expiration: Record<string, string> = {};
    subjects.forEach(s => { expiration[s] = expirationDate; });

    await adminDb.collection('pendingSeasonPasses').doc(email).set({
      courseType,
      subjects,
      expirationDate: expiration,
      purchasedAt: new Date().toISOString(),
      sessionId,
    }, { merge: true });

    return NextResponse.json({ email, courseType, subjects });
  } catch (error: any) {
    console.error('Error in claim-season-pass:', error);
    return NextResponse.json({ error: error.message || 'Failed to process claim' }, { status: 500 });
  }
}
