'use client';

import React, { Suspense, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Check, Lock, Loader2 } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Elements, PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useAuthContext } from '@/contexts/AuthContext';
import { LoginModal, SignupModal } from '@/components/AuthModals';
import dojoIcon from '../../../../public/images/dojoIcon.png';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

function PurchaseCardHeader() {
  const searchParams = useSearchParams();
  const examType = searchParams.get('examType') as 'macro' | 'micro' | null;
  const questionType = searchParams.get('questionType') as 'mcq' | 'frq' | null;
  const examNumber = searchParams.get('examNumber') || '1';
  const total = searchParams.get('total') || '30.00';
  const price = parseFloat(total);

  const getProductName = () => {
    if (!examType || !questionType) return "Full Practice Exam";
    const subject = examType === 'macro' ? 'Macroeconomics' : 'Microeconomics';
    const type = questionType.toUpperCase();
    return `AP ${subject} Full ${type} Exam ${examNumber}`;
  };
  
  const productName = getProductName();

  return (
    <>
      <div className="flex justify-between items-start text-left mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">{productName}</h2>
          <p className="text-sm text-gray-500 mt-1">One-time purchase</p>
        </div>
        <div className="text-right">
          <p className="text-3xl font-extrabold text-gray-900">${price.toFixed(2)}</p>
        </div>
      </div>
      <div className="space-y-3 text-sm text-gray-600 mb-6">
        <p className="flex items-center"><Check className="w-4 h-4 mr-2 text-green-500" /> <span><strong>Lifetime Access</strong> to purchased materials.</span></p>
        <p className="flex items-center"><Check className="w-4 h-4 mr-2 text-green-500" /> Detailed, expert-written explanations.</p>
        <p className="flex items-center"><Lock className="w-4 h-4 mr-2 text-gray-400" /> Secure payment processing with Stripe.</p>
      </div>
    </>
  );
}

function PaymentForm({ examType, questionType, examNumber }: { examType: string; questionType: string; examNumber: string }) {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setIsLoading(true);

    const examId = `${examType}-${questionType}-${examNumber}`;

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/purchase/success?examId=${examId}`,
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
    <form id="payment-form" onSubmit={handleSubmit}>
      <PaymentElement id="payment-element" options={{ layout: "tabs" }} />
      <Button disabled={isLoading || !stripe || !elements} id="submit" className="w-full mt-6">
        <span id="button-text">
          {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Pay now"}
        </span>
      </Button>
      {message && <div id="payment-message" className="text-red-500 text-sm mt-2 text-center">{message}</div>}
    </form>
  );
}

function LoginGate({ onAuthSuccess }: { onAuthSuccess: () => void }) {
  const [modalToShow, setModalToShow] = useState<'none' | 'login' | 'signup'>('none');
  
  const handleAuthSuccess = () => {
    setModalToShow('none');
    onAuthSuccess();
  };

  return (
    <>
      <LoginModal 
        isOpen={modalToShow === 'login'}
        onClose={() => setModalToShow('none')}
        onAuthSuccess={handleAuthSuccess}
        switchToSignup={() => setModalToShow('signup')} 
      />
      <SignupModal 
        isOpen={modalToShow === 'signup'}
        onClose={() => setModalToShow('none')}
        onAuthSuccess={handleAuthSuccess}
        switchToLogin={() => setModalToShow('login')} 
      />
      <div className="text-center">
        <div className="flex flex-col items-center mb-6">
          <Image src={dojoIcon} alt="AP Dojo" width={48} height={48} />
          <h3 className="text-xl font-semibold text-gray-800 mt-4">Please sign in to continue</h3>
          <p className="text-md text-gray-600 mt-1">An account is required to purchase and access your test materials.</p>
        </div>
        <Button onClick={() => setModalToShow('login')} size="lg" className="w-full">
          Login or Create Account
        </Button>
      </div>
    </>
  );
}

function FullExamPurchaseContent() {
  const { user } = useAuthContext();
  const [clientSecret, setClientSecret] = useState('');
  const [isReadyForPayment, setIsReadyForPayment] = useState(!!user);
  
  const searchParams = useSearchParams();
  const examType = searchParams.get('examType') as 'macro' | 'micro' | null;
  const questionType = searchParams.get('questionType') as 'mcq' | 'frq' | null;
  const examNumber = searchParams.get('examNumber') || '1';
  const total = searchParams.get('total') || '30.00';
  const price = parseFloat(total);

  useEffect(() => {
    if (isReadyForPayment && user && examType && questionType) {
      fetch("/api/stripe/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          amount: price, 
          userId: user.uid, 
          examType: examType,
          questionType: questionType,
          examNumber: examNumber,
          email: user.email 
        }),
      })
      .then((res) => res.json())
      .then((data) => {
        if (data.clientSecret) {
          setClientSecret(data.clientSecret);
        } else {
          console.error("Failed to get client secret from server");
        }
      });
    }
  }, [isReadyForPayment, user, price, examType, questionType, examNumber]);

  const onLoginSuccess = () => {
    setIsReadyForPayment(true);
  };
  
  const appearance = { theme: 'stripe' as const };
  const options = { clientSecret, appearance };

  if (!examType || !questionType) {
    return (
      <div className="bg-white p-8 rounded-2xl shadow-2xl border border-gray-100 max-w-lg w-full text-center">
        <p className="text-red-500">Invalid exam parameters. Please try again.</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-8 rounded-2xl shadow-2xl border border-gray-100 max-w-lg w-full">
      <PurchaseCardHeader />
      
      <div className="border-t border-gray-200 mt-8 pt-8">
        {isReadyForPayment ? (
          clientSecret ? (
            <Elements options={options} stripe={stripePromise}>
              <PaymentForm examType={examType} questionType={questionType} examNumber={examNumber} />
            </Elements>
          ) : (
            <div className="text-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-gray-500 mx-auto" />
              <p className="mt-2 text-sm text-gray-600">Preparing secure payment...</p>
            </div>
          )
        ) : (
          <LoginGate onAuthSuccess={onLoginSuccess} />
        )}
      </div>
    </div>
  );
}

export default function FullExamPurchasePage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-12 px-4">
      <Suspense fallback={<div className="flex items-center justify-center p-12"><Loader2 className="h-12 w-12 animate-spin text-blue-500" /></div>}>
        <FullExamPurchaseContent />
      </Suspense>
    </div>
  );
}

