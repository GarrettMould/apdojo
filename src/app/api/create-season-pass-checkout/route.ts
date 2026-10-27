import { NextResponse } from 'next/server';
import Stripe from 'stripe';

type PurchaseType = 'macro' | 'micro' | 'bundle' | 'gov' | 'stats';

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
    
    if (
      !purchaseType ||
      (purchaseType !== 'macro' &&
        purchaseType !== 'micro' &&
        purchaseType !== 'bundle' &&
        purchaseType !== 'gov' &&
        purchaseType !== 'stats')
    ) {
      return NextResponse.json(
        { error: 'Invalid purchaseType. Must be "macro", "micro", "bundle", "gov", or "stats"' },
        { status: 400 }
      );
    }

    // Get Stripe Price IDs from environment variables
    // These should be set in your .env.local file
    const priceIds = {
      macro: process.env.STRIPE_MACRO_SEASON_PASS_PRICE_ID,
      micro: process.env.STRIPE_MICRO_SEASON_PASS_PRICE_ID,
      bundle: process.env.STRIPE_BUNDLE_SEASON_PASS_PRICE_ID,
      gov: process.env.STRIPE_GOV_SEASON_PASS_PRICE_ID || process.env.STRIPE_MACRO_SEASON_PASS_PRICE_ID,
      stats: process.env.STRIPE_STATS_SEASON_PASS_PRICE_ID || process.env.STRIPE_MACRO_SEASON_PASS_PRICE_ID,
    };

    // Validate that price IDs are set
    if (!priceIds.macro || !priceIds.micro || !priceIds.bundle || !priceIds.gov || !priceIds.stats) {
      console.error('Missing Stripe Price IDs:', {
        macro: !!priceIds.macro,
        micro: !!priceIds.micro,
        bundle: !!priceIds.bundle,
        gov: !!priceIds.gov,
        stats: !!priceIds.stats,
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
    
    // Card, plus Alipay and WeChat for parents paying from China.
    // If a wallet is not turned on in the Stripe dashboard, drop it and retry.
    const sessionBase = {
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'payment' as const,
      client_reference_id: userId,
      metadata: {
        purchaseType: 'season-pass',
        courseType: courseType,
        userId: userId ?? '',
        source: isParentGift ? 'parent_gift' : userId ? 'student_purchase' : 'guest_checkout',
      },
      success_url: `${baseUrl}/season-pass/claim?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: cancelUrl || `${baseUrl}/`,
    };

    const attempts: Array<{
      payment_method_types: Array<'card' | 'alipay' | 'wechat_pay'>;
      payment_method_options?: { wechat_pay: { client: 'web' } };
    }> = [
      {
        payment_method_types: ['card', 'alipay', 'wechat_pay'],
        payment_method_options: { wechat_pay: { client: 'web' } },
      },
      { payment_method_types: ['card', 'alipay'] },
      { payment_method_types: ['card'] },
    ];

    let session: Stripe.Checkout.Session | null = null;
    let lastError: unknown;
    for (const attempt of attempts) {
      try {
        session = await stripe.checkout.sessions.create({
          ...sessionBase,
          ...attempt,
        });
        break;
      } catch (error) {
        lastError = error;
        const message = error instanceof Error ? error.message : '';
        const walletRejected = /alipay|wechat|payment method/i.test(message);
        if (!walletRejected) throw error;
      }
    }
    if (!session) throw lastError;

    return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch (error) {
    console.error('Error creating season pass checkout session:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { error: 'Error creating checkout session', details: errorMessage },
      { status: 500 }
    );
  }
}

