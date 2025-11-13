import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe-server';
import { adminDb, auth as adminAuth } from '@/lib/firebase-admin';

export async function POST(req: Request) {
  try {
    const { amount, userId, unitIds, email } = await req.json();

    if (!amount || amount <= 0 || !userId || !unitIds || !email) {
      return NextResponse.json({ error: 'Invalid amount, userId, unitIds, or email' }, { status: 400 });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency: 'usd',
      payment_method_types: ['card'],
      receipt_email: email, // Use the logged-in user's email for the receipt
      metadata: { userId, unitIds: unitIds.join(',') },
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
    });

  } catch (error: any) {
    console.error('Error creating payment intent:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}













