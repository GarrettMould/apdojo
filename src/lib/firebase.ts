import { initializeApp, getApps } from 'firebase/app'
import { getAuth, connectAuthEmulator } from 'firebase/auth'
import { getFirestore, connectFirestoreEmulator, enableIndexedDbPersistence } from 'firebase/firestore'
import { getAnalytics, isSupported } from 'firebase/analytics'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  authDomain: typeof window !== 'undefined' && process.env.NODE_ENV === 'development'
    ? window.location.hostname + (window.location.port ? ':' + window.location.port : '')
    : process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
}

// Initialize Firebase only if it hasn't been initialized already
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0]

// Initialize Firebase services
const auth = getAuth(app)
const db = getFirestore(app)

// Enable persistence
if (typeof window !== 'undefined') {
  try {
    enableIndexedDbPersistence(db)
  } catch (err) {
    console.error('Error enabling persistence:', err)
  }
}

// Initialize Analytics only in browser environment
const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null

export { app, auth, db, analytics } 