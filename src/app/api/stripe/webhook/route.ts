// src/app/api/stripe/webhook/route.ts
import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe-server';
import { db as adminDb } from '@/lib/firebase-admin'; 
import { FieldValue } from 'firebase-admin/firestore';
import Stripe from 'stripe';

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: Request) {
  const buf = await req.text();
  const sig = req.headers.get('stripe-signature')!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(buf, sig, webhookSecret);
  } catch (err: any) {
    console.error(`Webhook signature verification failed: ${err.message}`);
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      console.log(`✅ PaymentIntent succeeded: ${paymentIntent.id}`);
      
      const { userId, unitIds } = paymentIntent.metadata;
      
      if (!userId || !unitIds) {
        console.error(`Webhook Error: Missing metadata for payment intent ${paymentIntent.id}`);
        return NextResponse.json({ error: 'Missing metadata' }, { status: 400 });
      }

      try {
        const userRef = adminDb.collection('users').doc(userId);
        const parsedUnitIds = unitIds.split(',');

        await userRef.set({
          purchasedTests: FieldValue.arrayUnion(...parsedUnitIds),
        }, { merge: true });

      } catch (error: any) {
        console.error(`Error updating user ${userId} in Firestore for payment ${paymentIntent.id}: ${error.message}`);
        return NextResponse.json({ error: 'Firestore update failed.' }, { status: 500 });
      }

      break;
    default:
      // We don't need to log every unhandled event, but you can enable this for debugging
      // console.warn(`Unhandled event type ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
