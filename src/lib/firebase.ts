import { initializeApp, getApps, type FirebaseApp } from 'firebase/app'
import { getAuth, connectAuthEmulator } from 'firebase/auth'
import { getFirestore, connectFirestoreEmulator, enableIndexedDbPersistence } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  // Always use the Firebase project auth domain (e.g. project-id.firebaseapp.com).
  // Overriding with localhost in dev breaks Google sign-in; add localhost under Authorized domains instead.
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
}

// Initialize Firebase only if it hasn't been initialized already
function getFirebaseApp(): FirebaseApp {
  const existingApps = getApps()
  if (existingApps.length > 0) {
    return existingApps[0]
  }
  return initializeApp(firebaseConfig)
}

export const app = getFirebaseApp()

// Initialize Firebase services
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)

// Enable persistence
if (typeof window !== 'undefined') {
  try {
    enableIndexedDbPersistence(db)
  } catch (err) {
    console.error('Error enabling persistence:', err)
  }
}

// Initialize Analytics lazily (only in browser environment)
let analytics: any = null

export const getAnalyticsInstance = () => {
  if (typeof window === 'undefined') return null
  
  if (!analytics) {
    try {
      // Dynamically import analytics to avoid SSR issues
      const { getAnalytics } = require('firebase/analytics')
      analytics = getAnalytics(app)
    } catch (error) {
      console.error('Error initializing analytics:', error)
      return null
    }
  }
  
  return analytics
} 