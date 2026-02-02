import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase-admin';

/**
 * GET /api/user-public-info?userId=xxx
 * Returns public display info for a user (e.g. for parent-pay landing page).
 * Only returns displayName and email for identity confirmation.
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId || typeof userId !== 'string') {
      return NextResponse.json({ error: 'Missing userId' }, { status: 400 });
    }

    if (!db) {
      return NextResponse.json({ error: 'Database not available' }, { status: 500 });
    }

    const userRef = db.collection('users').doc(userId);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const data = userDoc.data() ?? {};
    const displayName = typeof data.displayName === 'string' ? data.displayName : null;
    const email = typeof data.email === 'string' ? data.email : null;

    return NextResponse.json({
      displayName: displayName ?? email?.split('@')[0] ?? 'Student',
      email: email ?? null,
    });
  } catch (error) {
    console.error('user-public-info error:', error);
    return NextResponse.json({ error: 'Failed to fetch user info' }, { status: 500 });
  }
}
