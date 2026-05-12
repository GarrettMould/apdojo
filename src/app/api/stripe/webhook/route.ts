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
        if (!adminDb) {
          console.error('Firebase Admin DB is not initialized');
          return NextResponse.json({ error: 'Database not initialized' }, { status: 500 });
        }
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
      const checkoutSession = event.data.object as Stripe.Checkout.Session;
      console.log(`✅ Checkout session completed: ${checkoutSession.id}`);
      
      const { purchaseType, courseType, examId: checkoutExamId, userId: metadataUserId } = checkoutSession.metadata || {};
      const checkoutUserId = metadataUserId || checkoutSession.client_reference_id;

      // Calculate expiration date: June 30th of current or next year
      const now = new Date();
      const currentYear = now.getUTCFullYear();
      const currentMonth = now.getUTCMonth();
      const currentDay = now.getUTCDate();
      const expirationYear = (currentMonth > 5 || (currentMonth === 5 && currentDay > 30))
        ? currentYear + 1
        : currentYear;
      const expirationDate = `${expirationYear}-06-30T23:59:59.999Z`;

      // Guest checkout: no userId — store a pending pass keyed by email
      if (!checkoutUserId) {
        const customerEmail = checkoutSession.customer_details?.email?.toLowerCase();
        if (customerEmail && purchaseType === 'season-pass' && courseType && adminDb) {
          try {
            const subjects = courseType === 'bundle' ? ['macro', 'micro'] : [courseType];
            const expiration: Record<string, string> = {};
            subjects.forEach(s => { expiration[s] = expirationDate; });

            await adminDb.collection('pendingSeasonPasses').doc(customerEmail).set({
              courseType,
              subjects,
              expirationDate: expiration,
              purchasedAt: now.toISOString(),
              sessionId: checkoutSession.id,
            }, { merge: true });

            console.log(`✅ Stored pending season pass for email ${customerEmail} (expires ${expirationDate})`);
          } catch (error: any) {
            console.error(`Error storing pending season pass for ${checkoutSession.id}: ${error.message}`);
          }
        } else {
          console.error(`Webhook: guest checkout missing email or purchaseType for session ${checkoutSession.id}`);
        }
        break;
      }

      try {
        if (!adminDb) {
          console.error('Firebase Admin DB is not initialized');
          return NextResponse.json({ error: 'Database not initialized' }, { status: 500 });
        }
        const userRef = adminDb.collection('users').doc(checkoutUserId);
        
        // Handle season pass purchases
        if (purchaseType === 'season-pass' && courseType) {
          // Get current user data to merge expiration dates properly
          const userDoc = await userRef.get();
          const currentData = userDoc.exists ? (userDoc.data() || {}) : {};
          const currentExpiration = currentData.seasonPassExpiration || {};
          const currentSeasonPass = currentData.seasonPass || [];
          
          // Handle bundle purchase (adds both macro and micro)
          if (courseType === 'bundle') {
            const subjectsToAdd = ['macro', 'micro'];
            const newExpiration = { ...currentExpiration };
            
            subjectsToAdd.forEach((subject) => {
              if (!currentSeasonPass.includes(subject)) {
                newExpiration[subject] = expirationDate;
              }
            });
            
            await userRef.set({
              seasonPass: FieldValue.arrayUnion(...subjectsToAdd),
              seasonPassExpiration: newExpiration,
            }, { merge: true });
            
            console.log(`✅ Added bundle season pass (macro + micro) to user ${checkoutUserId} (expires ${expirationDate})`);
          } 
          // Handle single subject purchase (econ or gov)
          else if (courseType === 'macro' || courseType === 'micro' || courseType === 'gov') {
            await userRef.set({
              seasonPass: FieldValue.arrayUnion(courseType),
              seasonPassExpiration: {
                ...currentExpiration,
                [courseType]: expirationDate,
              },
            }, { merge: true });
            
            console.log(`✅ Added ${courseType} season pass to user ${checkoutUserId} (expires ${expirationDate})`);
          } else {
            console.error(`Webhook Error: Invalid courseType ${courseType} for season pass`);
            return NextResponse.json({ error: 'Invalid courseType' }, { status: 400 });
          }
        } 
        // Handle exam purchases (existing logic)
        else if (checkoutExamId) {
          await userRef.set({
            purchases: FieldValue.arrayUnion(checkoutExamId),
          }, { merge: true });
        
          console.log(`✅ Added exam ${checkoutExamId} to user ${checkoutUserId} purchases`);
        } else {
          console.error(`Webhook Error: Missing purchaseType or examId for checkout session ${checkoutSession.id}`);
          return NextResponse.json({ error: 'Missing purchase data' }, { status: 400 });
        }
      } catch (error: any) {
        console.error(`Error updating user ${checkoutUserId} in Firestore for checkout ${checkoutSession.id}: ${error.message}`);
        return NextResponse.json({ error: 'Firestore update failed.' }, { status: 500 });
      }

      break;
    
    default:
      // We don't need to log every unhandled event, but you can enable this for debugging
      // console.warn(`Unhandled event type ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
