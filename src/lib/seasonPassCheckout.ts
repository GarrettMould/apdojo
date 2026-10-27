import type { SeasonPassPurchaseType } from '@/data/seasonPassCourseConfig';

export type { SeasonPassPurchaseType };

/** Open Stripe Checkout without loading Stripe.js in the browser. */
export async function startSeasonPassCheckout(body: {
  purchaseType: SeasonPassPurchaseType;
  userId?: string;
  isParentGift?: boolean;
  cancelUrl?: string;
}): Promise<void> {
  const response = await fetch('/api/create-season-pass-checkout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const msg = data.error || data.details || 'Failed to start checkout';
    throw new Error(typeof msg === 'string' ? msg : 'Failed to start checkout');
  }
  if (!data.url || typeof data.url !== 'string') {
    throw new Error('No checkout link received.');
  }
  window.location.href = data.url;
}
