import { auth } from '@/lib/firebase'

export const getSessionCookie = async () => {
  const user = auth.currentUser
  if (!user) {
    throw new Error('No user logged in')
  }
  
  // Get the ID token
  const idToken = await user.getIdToken()
  
  // Exchange ID token for session cookie
  const response = await fetch('/api/auth/session', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ idToken })
  })
  
  const { sessionCookie } = await response.json()
  return sessionCookie
} 