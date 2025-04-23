import { NextResponse } from 'next/server';
import { db as adminDb } from '@/lib/firebase-admin'; // Corrected import path and name
import { FieldValue } from 'firebase-admin/firestore';

// Ensure you have initialized Firebase Admin SDK in @/lib/firebaseAdmin.ts
// Example initialization in firebaseAdmin.ts:
// import admin from 'firebase-admin';
// 
// if (!admin.apps.length) {
//   try {
//     admin.initializeApp({
//       credential: admin.credential.cert({
//         projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
//         clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
//         // Use environment variable for private key, replacing newlines
//         privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\n/g, '\n'),
//       }),
//       // Optional: databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
//     });
//     console.log('Firebase Admin Initialized');
//   } catch (error: any) {
//     console.error('Firebase Admin initialization error', error.stack);
//   }
// }
// 
// export const adminDb = admin.firestore();
// export const adminAuth = admin.auth();


export async function POST(request: Request) {
  try {
    const { userId, unitId, xpAmount } = await request.json();

    if (!userId || typeof userId !== 'string') {
      return NextResponse.json({ error: 'Missing userId' }, { status: 400 });
    }
    // Ensure unitId is a string or number as needed for your structure
    if (unitId === undefined || unitId === null) { 
      return NextResponse.json({ error: 'Missing unitId' }, { status: 400 });
    }
    if (xpAmount === undefined || typeof xpAmount !== 'number') {
      return NextResponse.json({ error: 'Missing or invalid xpAmount' }, { status: 400 });
    }

    // Optional: Add authentication check here if needed (e.g., verify ID token)

    const userRef = adminDb.collection('users').doc(userId);

    // Atomically increment the totalXP field
    await userRef.update({
      [`unitScores.${unitId}`]: FieldValue.increment(xpAmount)
      // Consider adding a lastActivity timestamp update here as well
      // lastActivity: FieldValue.serverTimestamp()
    });

    console.log(`Successfully updated Unit ${unitId} XP for user ${userId} by ${xpAmount}`);
    return NextResponse.json({ success: true });

  } catch (error: any) {
    console.error('Error updating Unit XP:', error);
    
    // Handle potential errors like user document not found
    if (error.code === 5) { // Firestore error code for NOT_FOUND
      return NextResponse.json({ error: `User document not found for userId: ${error.details?.match(/documents\/(.*?)\/does not exist/)?.[1] ?? 'unknown'}` }, { status: 404 });
    }

    return NextResponse.json({ error: `Failed to update unit XP: ${error.message || 'Unknown server error'}` }, { status: 500 });
  }
} 