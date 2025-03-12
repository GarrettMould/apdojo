import { NextResponse } from 'next/server'
import { auth } from '@/lib/firebase-admin'

export async function POST(req: Request) {
  try {
    const { idToken } = await req.json()
    
    // Create session cookie
    const expiresIn = 60 * 60 * 24 * 5 * 1000 // 5 days
    const sessionCookie = await auth.createSessionCookie(idToken, { expiresIn })
    
    return NextResponse.json({ sessionCookie })
  } catch (error) {
    console.error('Session creation error:', error)
    return NextResponse.json({ error: 'Failed to create session' }, { status: 401 })
  }
} 