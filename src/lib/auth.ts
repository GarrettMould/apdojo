import { useState, useEffect } from 'react'
import { auth } from '@/lib/firebase'
import { User } from 'firebase/auth'

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    return auth.onAuthStateChanged(user => {
      setUser(user)
    })
  }, [])

  return { user }
} 