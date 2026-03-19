import { NextResponse } from 'next/server';
import Stripe from 'stripe';

type PurchaseType = 'macro' | 'micro' | 'bundle';

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is not set in environment variables');
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2025-02-24.acacia'
});

export async function POST(req: Request) {
  try {
    const url = new URL(req.url);
    const baseUrl = `${url.protocol}//${url.host}`;
    
    const { purchaseType, userId, isParentGift, cancelUrl } = await req.json() as { 
      purchaseType: PurchaseType;
      userId?: string;
      isParentGift?: boolean;
      cancelUrl?: string;
    };
    
    if (!purchaseType || (purchaseType !== 'macro' && purchaseType !== 'micro' && purchaseType !== 'bundle')) {
      return NextResponse.json(
        { error: 'Invalid purchaseType. Must be "macro", "micro", or "bundle"' },
        { status: 400 }
      );
    }

    // Get Stripe Price IDs from environment variables
    // These should be set in your .env.local file
    const priceIds = {
      macro: process.env.STRIPE_MACRO_SEASON_PASS_PRICE_ID,
      micro: process.env.STRIPE_MICRO_SEASON_PASS_PRICE_ID,
      bundle: process.env.STRIPE_BUNDLE_SEASON_PASS_PRICE_ID,
    };

    // Validate that price IDs are set
    if (!priceIds.macro || !priceIds.micro || !priceIds.bundle) {
      console.error('Missing Stripe Price IDs:', {
        macro: !!priceIds.macro,
        micro: !!priceIds.micro,
        bundle: !!priceIds.bundle,
      });
      return NextResponse.json(
        { error: 'Stripe Price IDs not configured. Please set STRIPE_MACRO_SEASON_PASS_PRICE_ID, STRIPE_MICRO_SEASON_PASS_PRICE_ID, and STRIPE_BUNDLE_SEASON_PASS_PRICE_ID in environment variables.' },
        { status: 500 }
      );
    }

    // Get the price ID for the selected purchase type
    const priceId = priceIds[purchaseType];
    if (!priceId) {
      return NextResponse.json(
        { error: `Price ID not found for purchase type: ${purchaseType}` },
        { status: 400 }
      );
    }

    // Determine courseType(s) for metadata
    // Bundle should add both 'macro' and 'micro' to seasonPass
    const courseType = purchaseType === 'bundle' ? 'bundle' : purchaseType;
    
    // Create checkout session using the Stripe Price ID
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId, // Use the Price ID from your Stripe product
          quantity: 1,
        },
      ],
      mode: 'payment',
      // client_reference_id is optional; include when we know the app user
      client_reference_id: userId,
      metadata: {
        purchaseType: 'season-pass',
        courseType: courseType, // 'macro', 'micro', or 'bundle'
        userId: userId ?? '',
        source: isParentGift ? 'parent_gift' : userId ? 'student_purchase' : 'guest_checkout',
      },
      // After payment, send users to a claim page that can attach the pass
      // to an account using the Checkout session ID and email.
      success_url: `${baseUrl}/season-pass/claim?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: cancelUrl || `${baseUrl}/`,
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (error) {
    console.error('Error creating season pass checkout session:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { error: 'Error creating checkout session', details: errorMessage },
      { status: 500 }
    );
  }
}

