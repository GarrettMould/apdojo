import { NextResponse } from 'next/server';
import { FieldValue } from 'firebase-admin/firestore'; // Import FieldValue
import { doc, updateDoc, increment, getDoc } from 'firebase/firestore';
import { db as dbAdmin } from '@/lib/firebase-admin'; // CORRECTED Import: path and alias

export async function POST(request: Request) {
  try {
    const { userId, xpAmount } = await request.json();

    if (!userId || typeof userId !== 'string') {
      return NextResponse.json({ success: false, error: 'Missing or invalid userId' }, { status: 400 });
    }
    if (typeof xpAmount !== 'number' || isNaN(xpAmount)) {
       return NextResponse.json({ success: false, error: 'Invalid xpAmount' }, { status: 400 });
    }
     // Basic check - don't process if xpAmount is 0 (frontend should handle floor logic)
     if (xpAmount === 0) {
         console.log(`[API update-total-xp] Received 0 xpAmount for user ${userId}. No update needed.`);
         return NextResponse.json({ success: true, message: 'No update needed for 0 xpAmount' });
     }

    console.log(`[API update-total-xp] Received request for user ${userId} to update XP by ${xpAmount}`);

    const userRef = dbAdmin.collection('users').doc(userId);

    // Optional: Check if user exists before updating (good practice)
    // const userSnap = await userRef.get();
    // if (!userSnap.exists) {
    //   console.error(`[API update-total-xp] User document not found for userId: ${userId}`);
    //   return NextResponse.json({ success: false, error: 'User not found' }, { status: 404 });
    // }

    // Perform the update using increment
    await userRef.update({
      totalXP: FieldValue.increment(xpAmount) // Use FieldValue.increment
    });

    console.log(`[API update-total-xp] Successfully updated totalXP for user ${userId} by ${xpAmount}`);
    return NextResponse.json({ success: true });

  } catch (error: any) {
    console.error('[API update-total-xp] Error:', error);
    return NextResponse.json({ success: false, error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}

// Ensure you re-import FieldValue if needed at the top
// import * as admin from 'firebase-admin';
// or if using modular: import { FieldValue } from 'firebase-admin/firestore';
