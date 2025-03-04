import { loadStripe } from '@stripe/stripe-js';

// Load Stripe outside of component render to avoid recreating Stripe object on each render
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '');

export const redirectToCheckout = async () => {
  // Temporary placeholder
  alert('Payment system coming soon!');
  return;
} 