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
      
      const { userId, unitIds, examId } = paymentIntent.metadata;
      
      if (!userId) {
        console.error(`Webhook Error: Missing userId for payment intent ${paymentIntent.id}`);
        return NextResponse.json({ error: 'Missing userId' }, { status: 400 });
      }

      try {
        const userRef = adminDb.collection('users').doc(userId);
        
        // Handle unit test purchases
        if (unitIds) {
          const parsedUnitIds = unitIds.split(',');
          await userRef.set({
            purchasedTests: FieldValue.arrayUnion(...parsedUnitIds),
          }, { merge: true });
          console.log(`✅ Added unit tests ${parsedUnitIds.join(', ')} to user ${userId}`);
        }
        
        // Handle full exam purchases
        if (examId) {
          await userRef.set({
            purchases: FieldValue.arrayUnion(examId),
          }, { merge: true });
          console.log(`✅ Added exam ${examId} to user ${userId} purchases`);
        }

        if (!unitIds && !examId) {
          console.error(`Webhook Error: Missing unitIds or examId for payment intent ${paymentIntent.id}`);
          return NextResponse.json({ error: 'Missing purchase data' }, { status: 400 });
        }

      } catch (error: any) {
        console.error(`Error updating user ${userId} in Firestore for payment ${paymentIntent.id}: ${error.message}`);
        return NextResponse.json({ error: 'Firestore update failed.' }, { status: 500 });
      }

      break;
    
    case 'checkout.session.completed':
      const session = event.data.object as Stripe.Checkout.Session;
      console.log(`✅ Checkout session completed: ${session.id}`);
      
      const { examId, userId: sessionUserId } = session.metadata || {};
      
      if (!examId || !sessionUserId) {
        console.error(`Webhook Error: Missing metadata for checkout session ${session.id}`);
        return NextResponse.json({ error: 'Missing metadata' }, { status: 400 });
      }

      try {
        const userRef = adminDb.collection('users').doc(sessionUserId);
        await userRef.set({
          purchases: FieldValue.arrayUnion(examId),
        }, { merge: true });
        
        console.log(`✅ Added exam ${examId} to user ${sessionUserId} purchases`);
      } catch (error: any) {
        console.error(`Error updating user ${sessionUserId} in Firestore for checkout ${session.id}: ${error.message}`);
        return NextResponse.json({ error: 'Firestore update failed.' }, { status: 500 });
      }

      break;
    
    default:
      // We don't need to log every unhandled event, but you can enable this for debugging
      // console.warn(`Unhandled event type ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
