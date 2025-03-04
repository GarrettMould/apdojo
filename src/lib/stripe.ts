import { loadStripe } from '@stripe/stripe-js';

// Load Stripe outside of component render to avoid recreating Stripe object on each render
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '');

export async function redirectToCheckout() {
  try {
    const stripe = await stripePromise;
    
    // Call your backend to create the checkout session
    const response = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    const { id } = await response.json();
    
    // Redirect to Stripe Checkout
    if (!stripe) throw new Error('Stripe failed to initialize');
    
    const result = await stripe.redirectToCheckout({
      sessionId: id,
    });
    
    if (result.error) {
      console.error(result.error.message);
    }
  } catch (error) {
    console.error('Error in redirectToCheckout:', error);
  }
} 