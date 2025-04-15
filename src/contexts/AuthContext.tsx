'use client'
import { createContext, useContext, ReactNode } from 'react'
import { useAuth } from '@/hooks/useAuth'

const AuthContext = createContext<ReturnType<typeof useAuth> | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const auth = useAuth()
  
  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuthContext() {
  const context = useContext(AuthContext)
  if (!context) {
    return {
      user: null,
      loading: true,
      signup: async () => { throw new Error('AuthProvider not found'); },
      login: async () => { throw new Error('AuthProvider not found'); },
      logout: async () => { throw new Error('AuthProvider not found'); },
      showLoginModal: false,
      setShowLoginModal: () => {},
      showSignupModal: false,
      setShowSignupModal: () => {},
    }
  }
  return context
} 