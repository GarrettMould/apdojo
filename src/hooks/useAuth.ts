'use client'
import { useState, useEffect } from 'react'
import { 
  User,
  UserCredential,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth'
import { auth, db } from '@/lib/firebase'
import { doc, setDoc, serverTimestamp } from 'firebase/firestore'

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const signup = async (email: string, password: string): Promise<UserCredential> => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const newUser = userCredential.user;

      if (newUser) {
        console.log("Auth user created, attempting to create Firestore doc for:", newUser.uid);
        const userDocRef = doc(db, "users", newUser.uid);
        const userData = {
          uid: newUser.uid,
          email: newUser.email,
          displayName: newUser.displayName || null,
          photoURL: newUser.photoURL || null,
          createdAt: serverTimestamp(),
          subscriptionStatus: "free",
        };

        try {
          await setDoc(userDocRef, userData);
          console.log("Firestore user document created successfully for UID:", newUser.uid);
        } catch (firestoreError) {
          console.error(`Error creating Firestore user document for UID ${newUser.uid}:`, firestoreError);
        }
      } else {
        console.error("Firebase Auth user object was null after successful creation.");
      }

      return userCredential;
    } catch (authError) {
      console.error("Firebase Auth signup error:", authError);
      throw authError;
    }
  }

  const login = async (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password)
  }

  const logout = async () => {
    setUser(null)
    setShowLoginModal(false);
    setShowSignupModal(false);
    return signOut(auth)
  }

  return {
    user,
    loading,
    signup,
    login,
    logout,
    showLoginModal,
    setShowLoginModal,
    showSignupModal,
    setShowSignupModal
  }
} 