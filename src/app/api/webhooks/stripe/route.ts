import { NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe-server'
import { db } from '@/lib/firebase-admin'
import { headers } from 'next/headers'

export async function POST(req: Request) {
  const body = await req.text()
  const headersList = await headers()
  const signature = headersList.get('stripe-signature')

  try {
    const event = stripe.webhooks.constructEvent(
      body,
      signature!,
      process.env.STRIPE_WEBHOOK_SECRET!
    )

    if (event.type === 'setup_intent.succeeded') {
      const setupIntent = event.data.object
      const customer = setupIntent.customer as string
      
      // Find and update user document
      const userSnapshot = await db
        .collection('users')
        .where('stripeCustomerId', '==', customer)
        .get()

      if (!userSnapshot.empty) {
        await userSnapshot.docs[0].ref.update({
          hasPaymentMethod: true
        })
      }
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 400 }
    )
  }
} 