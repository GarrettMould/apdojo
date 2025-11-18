import { loadStripe } from '@stripe/stripe-js';

// This file is intended for components that use Stripe.js on the client side.
// To avoid loading Stripe globally, initialize it within the components that need it.

// Example of how to use it in a component:
//
// import { Elements } from '@stripe/react-stripe-js';
// import { loadStripe } from '@stripe/stripe-js';
//
// const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
//
// const MyCheckoutComponent = () => (
//   <Elements stripe={stripePromise} options={...}>
//     <PaymentForm />
//   </Elements>
// );

export { loadStripe };

// Redirect to Stripe Checkout for exam purchases
export async function redirectToCheckout(
  examType: 'macro' | 'micro',
  questionType: 'mcq' | 'frq',
  examNumber: string,
  userId?: string
) {
  try {
    const response = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        subject: examType,
        productType: questionType,
        examType: examNumber as '1' | '2' | '3',
        cancelUrl: window.location.href,
        userId: userId,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to create checkout session');
    }

    const { sessionId } = await response.json();
    
    const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
    if (!stripe) {
      throw new Error('Failed to load Stripe');
    }

    const { error } = await stripe.redirectToCheckout({ sessionId });
    if (error) {
      throw error;
    }
  } catch (error) {
    console.error('Error redirecting to checkout:', error);
    throw error;
  }
} 