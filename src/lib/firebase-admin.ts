import * as admin from 'firebase-admin';

let auth: admin.auth.Auth | null = null;
let db: admin.firestore.Firestore | null = null; // Initialize as null

// Initialize Firebase Admin only if not already initialized
if (!admin.apps.length) {
  try {
    const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');
    // Support both FIREBASE_PROJECT_ID and NEXT_PUBLIC_FIREBASE_PROJECT_ID for compatibility
    const projectId = process.env.FIREBASE_PROJECT_ID || process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID; 
    const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;

    // Validate required environment variables
    if (!projectId || !clientEmail || !privateKey) {
      // Log error but don't throw - allow module to load so routes can handle the error gracefully
      console.error('❌ Firebase Admin initialization failed - Missing environment variables:');
      console.error(`   ${!projectId ? 'FIREBASE_PROJECT_ID or NEXT_PUBLIC_FIREBASE_PROJECT_ID' : ''}`);
      console.error(`   ${!clientEmail ? 'FIREBASE_CLIENT_EMAIL' : ''}`);
      console.error(`   ${!privateKey ? 'FIREBASE_PRIVATE_KEY' : ''}`);
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
    // Log error but don't throw - allow module to load so routes can handle the error gracefully
    console.error('❌ Firebase Admin initialization error:', error.message || error);
  }
}

// Assign DB after init
if (!db && admin.apps.length) {
    db = admin.firestore();
    auth = admin.auth();
}

export { db, auth };