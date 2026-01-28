import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase-admin';

export async function POST(request: Request) {
  try {
    // Parse request body
    let body;
    try {
      body = await request.json();
    } catch (parseError) {
      console.error('[API upgrade-to-teacher] Error parsing request body:', parseError);
      return NextResponse.json({ success: false, error: 'Invalid request body' }, { status: 400 });
    }

    const { userId } = body;

    if (!userId || typeof userId !== 'string') {
      return NextResponse.json({ success: false, error: 'Missing or invalid userId' }, { status: 400 });
    }

    console.log(`[API upgrade-to-teacher] Received request to upgrade user ${userId} to teacher mode`);

    // Validate Firebase Admin is initialized
    if (!db) {
      console.error('[API upgrade-to-teacher] Firebase Admin DB not initialized');
      console.error('Check that these environment variables are set:');
      console.error('- FIREBASE_PROJECT_ID');
      console.error('- FIREBASE_CLIENT_EMAIL');
      console.error('- FIREBASE_PRIVATE_KEY');
      return NextResponse.json({ 
        success: false,
        error: 'Database not initialized',
        details: 'Firebase Admin SDK failed to initialize. Please check server environment variables.'
      }, { status: 500 });
    }

    const userRef = db.collection('users').doc(userId);

    // Check if user exists
    const userSnap = await userRef.get();
    if (!userSnap.exists) {
      console.error(`[API upgrade-to-teacher] User document not found for userId: ${userId}`);
      return NextResponse.json({ success: false, error: 'User not found' }, { status: 404 });
    }

    // Update teacher field to true
    await userRef.update({
      teacher: true
    });

    console.log(`[API upgrade-to-teacher] Successfully upgraded user ${userId} to teacher mode`);
    return NextResponse.json({ success: true });

  } catch (error: any) {
    console.error('[API upgrade-to-teacher] Unexpected error:', error);
    console.error('[API upgrade-to-teacher] Error stack:', error.stack);
    return NextResponse.json({ 
      success: false, 
      error: error.message || 'Internal Server Error',
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined
    }, { status: 500 });
  }
}
