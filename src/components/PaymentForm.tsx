'use client';

import { useState } from 'react';
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { getSessionCookie } from '@/utils/session';
import { X } from 'lucide-react';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export function PaymentForm() {
  const [loading, setLoading] = useState(false);
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  const handlePurchaseClick = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/stripe/setup-intent', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${await getSessionCookie()}`
        }
      });
      
      const data = await response.json();
      
      if (data.hasPaymentMethod) {
        window.location.href = '/availability';
        return;
      }
      
      setClientSecret(data.clientSecret);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    setClientSecret(null);
  };

  return (
    <div className="max-w-md mx-auto p-6">
      {!clientSecret ? (
        <button 
          onClick={handlePurchaseClick}
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Loading...' : 'Purchase Lesson'}
        </button>
      ) : (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-lg p-6 max-w-md w-full relative my-8">
            <button
              onClick={() => setClientSecret(null)}
              className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-700 text-2xl font-bold"
              aria-label="Close modal"
            >
              ×
            </button>
            <h3 className="text-xl font-bold mb-4 pr-8">Add Payment Method</h3>
            <div className="max-h-[80vh] overflow-y-auto">
              <Elements 
                stripe={stripePromise} 
                options={{
                  clientSecret,
                  appearance: { theme: 'stripe' },
                  loader: 'auto'
                }}
              >
                <SetupForm />
              </Elements>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function SetupForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    const { error } = await stripe.confirmSetup({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/payment-success`,
      },
    });

    if (error) {
      setError(error.message || 'Something went wrong');
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <PaymentElement 
        options={{
          defaultValues: {
            billingDetails: {
              name: ''
            }
          },
          fields: {
            billingDetails: 'never'
          },
          wallets: {
            applePay: 'never',
            googlePay: 'never'
          },
          paymentMethodOrder: ['card'],
          business: {
            name: 'AP Dojo'
          },
        }}
      />
      {error && <div className="text-red-500 text-sm">{error}</div>}
      <button 
        type="submit" 
        disabled={!stripe || loading}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? 'Processing...' : 'Save Card Details'}
      </button>
    </form>
  );
} 