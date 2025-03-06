import { loadStripe } from '@stripe/stripe-js';

// Add console log to debug the environment variable
const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
console.log('Stripe Key Status:', publishableKey ? 'Present' : 'Missing');

if (!publishableKey) {
  console.error('Warning: Stripe publishable key is not set in environment variables');
}

// Load Stripe outside of component render to avoid recreating Stripe object on each render
const stripePromise = loadStripe(publishableKey || '');

export const redirectToCheckout = async (subject: 'macro' | 'micro', productType: 'mcq' | 'frq', examType: string) => {
  try {
    console.log('Initializing Stripe...');
    const stripe = await stripePromise;
    
    if (!stripe) {
      console.error('Stripe failed to initialize. Check if your publishable key is correct.');
      throw new Error('Stripe failed to initialize');
    }

    // Construct the purchase page URL
    const purchasePageUrl = `${window.location.origin}/purchase/${subject}-${productType}`;

    console.log('Making request to create checkout session...');
    const response = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        subject, 
        productType, 
        examType,
        cancelUrl: purchasePageUrl // Send the specific purchase page URL
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('API error response:', errorData);
      throw new Error(`API error: ${errorData.error || response.statusText}`);
    }

    const data = await response.json();
    console.log('Response from server:', data);
    
    if (!data.sessionId) {
      console.error('No session ID in response:', data);
      throw new Error('No session ID returned from the server');
    }

    console.log('Redirecting to checkout...');
    const result = await stripe.redirectToCheckout({ 
      sessionId: data.sessionId
    });

    if (result.error) {
      console.error('Stripe redirect error:', result.error);
      throw new Error(result.error.message);
    }
  } catch (error) {
    console.error('Error in redirectToCheckout:', error);
    throw error;
  }
}; 