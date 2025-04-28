import * as admin from 'firebase-admin'

// Store the initialization promise
let firebaseAdminInitPromise: Promise<void> | null = null;

const initializeFirebaseAdmin = async () => {
  // Check if already initialized or initialization is in progress
  if (admin.apps.length > 0) {
    console.log('Firebase Admin already initialized.');
    return;
  }
  console.log('Attempting Firebase Admin initialization (DEBUG: using hardcoded credentials)...');
  try {
    // const privateKey = process.env.FIREBASE_PRIVATE_KEY
    // if (!privateKey) {
    //   throw new Error('FIREBASE_PRIVATE_KEY is not set in environment variables')
    // }

    // --- TEMPORARY DEBUG ---
    const hardcodedPrivateKey = "-----BEGIN PRIVATE KEY-----\\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQC8HfX2mtQ/xXAq\\n6t74CdticGgdhM+Tl5NVfL5KrOBlUcaosQla0dMcrOxNwyvmxmgV9xaVAYNYtPoz\\nBKZ1PamyKLpVC5mD4umYFq3EglLGy2wsIv/Ugt++JdhRc/BWvZrBdHXXVvcPz3z8\\njjouRiKYJdHqKytvCSbLOQ/BfhsDkCrd6lF2ouSBULY+gig76Pg59mtnil/o6J7R\\n4fvo/QWpueVrqHpOHw4NyIxSYJXy7ejiEwNrRHeThTsPLrm2esAH9QQAjJvIYTP5\\n4L8jslkuqFJjc8cYXyCboaD3qj0XQii6LuGdfMGqSQiNwt24xAuVE2HNgClyiJA/\\nE1VY9KWlAgMBAAECggEABljaODuEc1u2XUGsIOhTWBJgaAoeytcMEsjizsZty11c\\nbVnFmHmlA74d5TMeDjJIqzXyQeLLS2OyfBZpTSlgdPEvg9SgeUNDC/uhr00fthaB\\nb7tak/TlJUIM9vjQWT6os/IO/ZUizuGlNH4LHn93FANVU7ZTK2SwboHQCJzxMJ1q\\n6oRGyhPcLvTq+tPUpofSLdDuqX1FV6JAb6CimmKhdjZYFhFGcfNCc6sKCyGJ9EnO\\nsx0C5Irr6PdHsXeQkKT/BwuA6xDYeLI0rxNaoeS2x2ID9AZ6GhzxaEvYM/sj8M17\\naYr3wIfgv+l1rgXV41++L+7IRd/eOy4qWks6/wYYnQKBgQD78UP6CZrm0knCvcXq\\nazpM/8dgqB+51+vqTeY65ukrnABzHTvHcIq9hYxudOxuJzGSw0f738CFpF+GtR7K\\n7RhD8BfjzVW4kjLE1u8JRpXECwByw6eqEDSpdVnNBQM1rC9VvglH6+iq/JYQPIzC\\nq5b9sHZvH1gVN0MH/q5uq6S9kwKBgQC/JYyavTZmCsw5FhQsdXZ8/FxlOHi3Hyva\\n9A5uWAFsR8MV3y0homBWXicAjgR2kTh/fHYTuiEPn6qWTkmv2+us2so1I/j6DyOP\\nFUC6KEJ9ve2K+fx3UWtXTA7Itlv3NCk4fURcousKUKuleIO496jALrlngmQQH1ZV\\ntVw/s+nS5wKBgQDSW+AmJV7w2yQ7NbjKwj0rjWUrjzTuNxsDx4c0JxkJEHhPpVkE\\nbTNqitd2YqoGTzNVFzhDVc+pxlT8ZL4RMWXRU+aejhPEyE0bjVqIpCboSUdWi4ay\\nuFVAKHuSc1z6s4nSTZnyM0dRfRTO+b+NyzeHGo/IuKMTE9EkG8IJJcengQKBgQCF\\nfarBUk0QXJAdeg7isbHrPa8lPZgIg2t0QSdm5m0v+roCp1b0e1r+Vki0uXnieC7V\\n0c0An+eA6sgOqmQJvfPMRwwaqqGxuSrjPTt0BrPQ7vhbK5Smm6T0VXipsbluXe4/\\ntjQs4dZ14LrPF+geIE+oz7jJ0iUhoVEBEGR5VKOClwKBgQDbfqHqbTl7QRz1hnjV\\n60fc+2g9EIzaJ3rb9/VNZDWAr5RWQ1Z+G6J96Nf+kQtzKfkbIUWU3dvUAJ08c7BY\\nAeTYACtWYEHjmtpkLdD4RE0qKxhZ1L5FJGb/gtdBhJhuD5WwDE6JlqoIwXnF0zsn\\nVweZ6S+9CAHzSFh6QC2i47b+0w==\\n-----END PRIVATE KEY-----\\n";
    // --- END TEMPORARY DEBUG ---

    admin.initializeApp({
      credential: admin.credential.cert({
        // projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        // clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        // privateKey: privateKey
        projectId: "apdojo",
        clientEmail: "firebase-adminsdk-fbsvc@apdojo.iam.gserviceaccount.com",
        privateKey: hardcodedPrivateKey.replace(/\\n/g, '\\n') // Apply replace here
      })
    })
    console.log('Firebase Admin initialized successfully (DEBUG: using hardcoded credentials)')
  } catch (error) {
    console.error('Firebase Admin initialization error (DEBUG: using hardcoded credentials):', error)
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