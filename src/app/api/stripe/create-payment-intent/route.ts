import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe-server';
import { adminDb, auth as adminAuth } from '@/lib/firebase-admin';

export async function POST(req: Request) {
  try {
    const { amount, userId, unitIds, email, examType, questionType, examNumber } = await req.json();

    // Validate required fields - either unitIds (for unit tests) or exam info (for full exams)
    if (!userId || !email) {
      return NextResponse.json({ error: 'Invalid userId or email' }, { status: 400 });
    }

    if (!unitIds && (!examType || !questionType || !examNumber)) {
      return NextResponse.json({ error: 'Either unitIds or examType/questionType/examNumber must be provided' }, { status: 400 });
    }

    // Define prices on server side - DO NOT trust client-provided amount
    let actualAmount: number;
    let metadata: Record<string, string> = { userId };
    
    if (unitIds) {
      // Unit test purchase - $4.99 per unit or $14.99 for bundle
      const isBundle = unitIds.length > 1;
      actualAmount = isBundle ? 14.99 : 4.99;
      metadata.unitIds = unitIds.join(',');
    } else if (examType && questionType && examNumber) {
      // Full exam purchase - Price depends on question type (server-enforced)
      // MCQ exams: $30.00, FRQ exams: $20.00
      actualAmount = questionType === 'frq' ? 20.00 : 30.00;
      const examId = `${examType}-${questionType}-${examNumber}`;
      metadata.examId = examId;
      metadata.examType = examType;
      metadata.questionType = questionType;
      metadata.examNumber = examNumber;
    } else {
      return NextResponse.json({ error: 'Invalid purchase type' }, { status: 400 });
    }

    // Security: Ignore client-provided amount, use server-defined price
    // This prevents users from changing the URL to pay less
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(actualAmount * 100),
      currency: 'usd',
      payment_method_types: ['card'],
      receipt_email: email, // Use the logged-in user's email for the receipt
      metadata: metadata,
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
    });

  } catch (error: any) {
    console.error('Error creating payment intent:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}













