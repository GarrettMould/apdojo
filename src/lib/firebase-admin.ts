import * as admin from 'firebase-admin'

// Store the initialization promise
let firebaseAdminInitPromise: Promise<void> | null = null;

const initializeFirebaseAdmin = async () => {
  // Check if already initialized or initialization is in progress
  if (admin.apps.length > 0) {
    console.log('Firebase Admin already initialized.');
    return;
  }
  console.log('Attempting Firebase Admin initialization...');
  try {
    const privateKey = process.env.FIREBASE_PRIVATE_KEY
    if (!privateKey) {
      throw new Error('FIREBASE_PRIVATE_KEY is not set in environment variables')
    }

    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        // Remove the newline replacement again for testing
        // privateKey: privateKey.replace(/\n/g, '\n') 
        privateKey: privateKey
      })
    })
    console.log('Firebase Admin initialized successfully')
  } catch (error) {
    console.error('Firebase Admin initialization error:', error)
    // Re-throw the error to make the promise reject
    throw error
  }
};

// Ensure initialization is triggered only once and export the promise
// Check for `typeof window === 'undefined'` to ensure this runs only server-side
if (typeof window === 'undefined' && !firebaseAdminInitPromise) {
  console.log('Creating Firebase Admin initialization promise.');
  firebaseAdminInitPromise = initializeFirebaseAdmin();
}

// Export the promise and the admin services
export { firebaseAdminInitPromise };
export const auth = admin.auth()
export const db = admin.firestore() 