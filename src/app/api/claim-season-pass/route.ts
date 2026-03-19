import { NextResponse } from 'next/server';
import { db as adminDb } from '@/lib/firebase-admin';
import { stripe } from '@/lib/stripe-server';

const TEST_SESSION_ID = 'test';
const TEST_EMAIL = 'testdojo@gmail.com';
const TEST_COURSE_TYPE = 'macro';

function getExpirationDate(): string {
  const now = new Date();
  const year = now.getUTCMonth() > 5 || (now.getUTCMonth() === 5 && now.getUTCDate() > 30)
    ? now.getUTCFullYear() + 1
    : now.getUTCFullYear();
  return `${year}-06-30T23:59:59.999Z`;
}

export async function POST(req: Request) {
  try {
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
      const sessionEmail = session.customer_details?.email?.toLowerCase();

      if (!sessionEmail) {
        return NextResponse.json({ error: 'No email found on Stripe session' }, { status: 400 });
      }

      const metadata = session.metadata || {};
      if (metadata.purchaseType !== 'season-pass' || !metadata.courseType) {
        return NextResponse.json({ error: 'Session is not a season pass purchase' }, { status: 400 });
      }

      email = sessionEmail;
      courseType = metadata.courseType;
    }

    // Store pending pass in Firestore keyed by email
    const expirationDate = getExpirationDate();
    const subjects = courseType === 'bundle' ? ['macro', 'micro'] : [courseType];
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
