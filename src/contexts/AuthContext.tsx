'use client'
import React, { createContext, useContext, ReactNode } from 'react'
import { useAuth } from '@/hooks/useAuth'
import type { AuthContextValue } from '@/hooks/useAuth'
import { User } from 'firebase/auth'

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const auth = useAuth()
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}

export function useAuthContext(): AuthContextValue {
  const context = useContext(AuthContext)
  if (!context) {
    console.warn('AuthContext not found, returning fallback values.')
    return {
      user: null,
      loading: true,
      signup: async (email, password, isSubscribed) => { throw new Error('AuthProvider not found'); },
      login: async () => { throw new Error('AuthProvider not found'); },
      logout: async () => { throw new Error('AuthProvider not found'); },
      resendVerificationEmail: async () => { throw new Error('AuthProvider not found'); },
      mcqAnswersData: null,
      loadingMcqData: true,
      userData: null,
      loadingUserData: true,
      lastSelectedPracticeUnits: null,
      setLastSelectedPracticeUnits: () => { console.warn('AuthProvider not found, cannot set last selected units'); },
      globalLevel: 1,
      globalProgress: 0,
      totalXP: 0,
      correctStreak: 0,
      setCorrectStreak: (streak: number | ((prev: number) => number)) => { console.warn('AuthProvider not found, cannot set correct streak'); },
      isNextQuestionDoubleXp: false,
      setIsNextQuestionDoubleXp: (isDouble: boolean | ((prev: boolean) => boolean)) => { console.warn('AuthProvider not found, cannot set is next question double XP'); },
      unitPerformanceStats: null,
      loadingUnitPerformance: true,
      showLoginModal: false,
      setShowLoginModal: () => {},
      showSignupModal: false,
      setShowSignupModal: () => {},
      selectedSubject: 'macro',
      setSelectedSubject: () => {},
      toggleSubject: () => {},
    }
  }
  return context
} 