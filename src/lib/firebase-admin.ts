import * as admin from 'firebase-admin';

let auth: admin.auth.Auth | null = null;
let db: admin.firestore.Firestore | null = null;

// Initialize Firebase Admin only if not already initialized
if (!admin.apps.length) {
  try {
    const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');
    const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
    const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;

    // Validate required environment variables
    if (!projectId || !clientEmail || !privateKey) {
      console.error('Firebase Admin initialization failed: Missing required environment variables');
      console.error('Required: NEXT_PUBLIC_FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY');
    } else {
      admin.initializeApp({
        credential: admin.credential.cert({
          projectId,
          clientEmail,
          privateKey,
        }),
      });
      console.log('Firebase Admin initialized successfully');
    }
  } catch (error: any) {
    console.error('Firebase Admin initialization error:', error.message || error);
    console.error('Stack:', error.stack);
  }
}

// Only create auth and db if app was successfully initialized
if (admin.apps.length > 0) {
  try {
    auth = admin.auth();
    db = admin.firestore();
  } catch (error: any) {
    console.error('Error creating Firebase Admin services:', error.message || error);
  }
} else {
  console.warn('Firebase Admin app not initialized. Auth and Firestore services will be null.');
}

export { auth, db }; 