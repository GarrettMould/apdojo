'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AlertCircle, CheckCircle, Info, Lock } from 'lucide-react';
import Link from 'next/link';
import { Elements, PaymentElement, useElements, useStripe, ExpressCheckoutElement } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

function CheckoutForm() {
  const searchParams = useSearchParams();
  const [clientSecret, setClientSecret] = React.useState('');

  const isBundle = searchParams.get('bundle') === 'true';
  const unitIds = searchParams.get('units')?.split(',') || [];
  const total = searchParams.get('total') || '0';

  const productName = isBundle ? "Complete Bundle (All 6 Units)" : `Unit Tests for Unit(s): ${unitIds.join(', ')}`;
  const price = parseFloat(total);

  React.useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    if (price > 0) {
      fetch("/api/stripe/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: price }),
      })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
    }
  }, [price]);

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-6xl mx-auto lg:grid lg:grid-cols-2 lg:gap-12">
        
        {/* Left Side: Checkout Form */}
        <div className="bg-white p-8 rounded-xl shadow-md">
          {/* Success Message */}
          <div className="bg-green-50 border border-green-200 text-green-700 text-sm rounded-lg p-4 flex items-center gap-3 mb-6">
            <CheckCircle className="w-5 h-5" />
            <span>"{productName}" has been added to your cart.</span>
          </div>
          
          <div className="text-sm mb-6">
            Returning customer? <Link href="/login" className="text-blue-600 hover:underline">Click here to login</Link>
          </div>

          {clientSecret ? (
            <Elements options={options} stripe={stripePromise}>
              {/* Express Checkout */}
              <div className="mb-6">
                <div className="text-xs text-gray-500 mb-2 text-center">Express Checkout</div>
                <ExpressCheckoutElement />
              </div>

              <div className="flex items-center text-gray-400 text-xs my-6">
                <div className="flex-grow border-t border-gray-200"></div>
                <span className="px-4">OR</span>
                <div className="flex-grow border-t border-gray-200"></div>
              </div>

              {/* Student Information & Payment */}
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Student Information</h2>
                <PaymentForm />
              </div>
            </Elements>
          ) : (
            <div className="text-center py-8">
              <p>Loading payment options...</p>
            </div>
          )}
        </div>

        {/* Right Side: Order Summary and Support */}
        <div className="space-y-8">
          {/* Order Summary */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm">
            <div className="p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Order summary</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                  <div className="text-gray-600">{productName} x 1</div>
                  <div className="font-semibold text-gray-800">${price.toFixed(2)}</div>
                </div>
                <div className="flex justify-between items-center text-gray-600 pt-2">
                  <div>Subtotal</div>
                  <div>${price.toFixed(2)}</div>
                </div>
                <div className="flex justify-between items-center text-xl font-bold text-gray-900 pt-4">
                  <div>Total</div>
                  <div>${price.toFixed(2)}</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Support Sections */}
          <div className="bg-white border border-gray-200 p-8 rounded-xl shadow-sm space-y-6">
            <div className="flex gap-4">
              <Lock className="w-8 h-8 text-blue-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-lg text-gray-800">Our AP Dojo Guarantee</h3>
                <p className="text-gray-600 text-sm mt-1">
                  14-day, 100% money-back guarantee with no hassle. Simply send us a contact message. <a href="#" className="text-blue-600 underline">For more info, click here.</a>
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <Info className="w-8 h-8 text-blue-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-lg text-gray-800">Customer Support</h3>
                <p className="text-gray-600 text-sm mt-1">
                  Got a question before purchase? <a href="#" className="text-blue-600 underline">Send us a message</a> and we'll respond within 24 hours.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PaymentForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/success`,
      },
    });

    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message || 'An unexpected error occurred.');
    } else {
      setMessage("An unexpected error occurred.");
    }

    setIsLoading(false);
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit} className="space-y-6">
      <PaymentElement id="payment-element" options={{ layout: "tabs" }} />
      <Button disabled={isLoading || !stripe || !elements} id="submit" className="w-full py-4 text-lg">
        <span id="button-text">
          {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
        </span>
      </Button>
      {message && <div id="payment-message" className="text-red-500 text-sm mt-2">{message}</div>}
    </form>
  );
}

export default function MCQCheckoutPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CheckoutForm />
    </Suspense>
  );
}
