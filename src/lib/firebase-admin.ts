import * as admin from 'firebase-admin';

let auth: admin.auth.Auth | null = null;
let db: admin.firestore.Firestore | null = null; // Initialize as null

// Initialize Firebase Admin only if not already initialized
if (!admin.apps.length) {
  try {
    const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');
    // 🔴 FIX: Changed from NEXT_PUBLIC_FIREBASE_PROJECT_ID to FIREBASE_PROJECT_ID
    const projectId = process.env.FIREBASE_PROJECT_ID; 
    const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;

    // Validate required environment variables
    if (!projectId || !clientEmail || !privateKey) {
      // Throw error to make it visible in logs immediately
      throw new Error(`Missing Vars: ${!projectId ? 'ProjectID' : ''} ${!clientEmail ? 'Email' : ''} ${!privateKey ? 'Key' : ''}`);
    } else {
      admin.initializeApp({
        credential: admin.credential.cert({
          projectId,
          clientEmail,
          privateKey,
        }),
      });
      console.log('✅ Firebase Admin initialized successfully');
    }
  } catch (error: any) {
    console.error('❌ Firebase Admin initialization error:', error.message || error);
    // Re-throw so the webhook fails fast if DB is broken
    throw error;
  }
}

// Assign DB after init
if (!db && admin.apps.length) {
    db = admin.firestore();
    auth = admin.auth();
}

export { db, auth };