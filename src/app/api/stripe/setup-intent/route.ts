import { NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe-server'
import { auth, db } from '@/lib/firebase-admin'

/*
export async function POST(req: Request) {
  // Add debugging for auth flow
  console.log('1. API route hit')
  
  try {
    const idToken = req.headers.get('Authorization')?.split('Bearer ')[1]
    console.log('2. Auth header present:', !!idToken)

    if (!idToken) {
      return NextResponse.json({ error: 'No auth token' }, { status: 401 })
    }

    // Verify the session cookie
    const decodedToken = await auth.verifyIdToken(idToken)
    console.log('3. Token verified, user:', decodedToken.uid)

    // Check if user document exists, if not create it
    const userDoc = await db.collection('users').doc(decodedToken.uid).get()
    let userData = userDoc.data()

    if (!userData) {
      console.log('Creating new user document...')
      userData = {
        email: decodedToken.email,
        hasPaymentMethod: false,
        createdAt: new Date().toISOString()
      }
      await db.collection('users').doc(decodedToken.uid).set(userData)
    }

    if (userData.hasPaymentMethod) {
      console.log('User already has payment method')
      return NextResponse.json({ hasPaymentMethod: true })
    }

    if (!userData.stripeCustomerId) {
      console.log('Creating new Stripe customer...')
      const customer = await stripe.customers.create({
        email: decodedToken.email || undefined,
        metadata: {
          firebaseUID: decodedToken.uid
        }
      })
      
      await db.collection('users').doc(decodedToken.uid).update({
        stripeCustomerId: customer.id
      })
      userData.stripeCustomerId = customer.id
      console.log('Created Stripe customer:', customer.id)
    }

    console.log('Creating setup intent...')
    const setupIntent = await stripe.setupIntents.create({
      customer: userData.stripeCustomerId,
      payment_method_types: ['card'],
      usage: 'off_session'
    })
    console.log('Setup intent created:', setupIntent.id)
    console.log('Client secret:', setupIntent.client_secret)

    return NextResponse.json({
      hasPaymentMethod: false,
      clientSecret: setupIntent.client_secret
    })

  } catch (error: any) {
    console.error('Setup intent error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
*/

// Temporary response while using Calendly payments
export async function POST(req: Request) {
  return NextResponse.json({ message: 'Using Calendly payments' }, { status: 200 })
} 