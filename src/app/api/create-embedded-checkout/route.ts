import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe-server';

type PurchaseType = 'macro' | 'micro' | 'bundle';

export async function POST(req: Request) {
  try {
    const url = new URL(req.url);
    const baseUrl = `${url.protocol}//${url.host}`;

    const { purchaseType, userId } = await req.json() as {
      purchaseType: PurchaseType;
      userId?: string;
    };

    if (!purchaseType || !['macro', 'micro', 'bundle'].includes(purchaseType)) {
      return NextResponse.json({ error: 'Invalid purchaseType' }, { status: 400 });
    }

    const priceIds = {
      macro: process.env.STRIPE_MACRO_SEASON_PASS_PRICE_ID,
      micro: process.env.STRIPE_MICRO_SEASON_PASS_PRICE_ID,
      bundle: process.env.STRIPE_BUNDLE_SEASON_PASS_PRICE_ID,
    };

    const priceId = priceIds[purchaseType];
    if (!priceId) {
      return NextResponse.json({ error: `Price ID not configured for: ${purchaseType}` }, { status: 500 });
    }

    const courseType = purchaseType === 'bundle' ? 'bundle' : purchaseType;

    const session = await stripe.checkout.sessions.create({
      ui_mode: 'embedded',
      line_items: [{ price: priceId, quantity: 1 }],
      mode: 'payment',
      client_reference_id: userId,
      metadata: {
        purchaseType: 'season-pass',
        courseType,
        userId: userId ?? '',
        source: userId ? 'student_purchase' : 'guest_checkout',
      },
      return_url: `${baseUrl}/season-pass/claim?session_id={CHECKOUT_SESSION_ID}`,
    });

    return NextResponse.json({ clientSecret: session.client_secret });
  } catch (error: any) {
    console.error('Error creating embedded checkout session:', error);
    return NextResponse.json({ error: error.message || 'Failed to create session' }, { status: 500 });
  }
}
