'use client'
import { useState, useEffect } from 'react'
import { 
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth'
import { auth } from '@/lib/firebase'

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

    return unsubscribe
  }, [])

  const signup = async (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password)
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