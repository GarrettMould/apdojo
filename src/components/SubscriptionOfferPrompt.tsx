'use client';

import React from 'react';
// You might want to import a Button component if you have a standardized one, e.g., from '@/components/ui/button'
// For now, using standard HTML buttons.

// Define a type for the plan details
interface SubscriptionPlan {
  id: string;
  name: string;
  price: string;
  term: string;
  priceDetails: string;
  buttonText: string;
  bgColorClass: string; 
  hoverBgColorClass: string;
  bestValue?: boolean;
  savings?: string;
}

// Updated plan data based on PaymentPlanPreview.tsx
const plans: SubscriptionPlan[] = [
  {
    id: 'monthly',
    name: 'Monthly Plan',
    price: '$5',
    term: '/month',
    priceDetails: 'Billed every month.',
    buttonText: 'Get Started',
    bgColorClass: 'bg-blue-500',
    hoverBgColorClass: 'hover:bg-blue-600',
  },
  {
    id: 'semester',
    name: 'Semester Plan',
    price: '$20',
    term: '/semester',
    priceDetails: 'Billed once for the semester.', // Approx 6 months
    buttonText: 'Get Started',
    bgColorClass: 'bg-blue-500',
    hoverBgColorClass: 'hover:bg-blue-600',
    savings: 'Save $10 vs. monthly*', // ($5/mo * 6 months = $30)
  },
  {
    id: 'yearly',
    name: 'One Year Plan',
    price: '$40',
    term: '/year',
    priceDetails: 'Billed once for the year.',
    buttonText: 'Get Started',
    bgColorClass: 'bg-blue-500',
    hoverBgColorClass: 'hover:bg-blue-600',
    bestValue: true,
    savings: 'Save $20 vs. monthly', // ($5/mo * 12 months = $60)
  },
];

// Props for the component, e.g., if you need to pass a close handler
interface SubscriptionOfferPromptProps {
  onSelectPlan?: (planId: string) => void; // Example: handler for when a plan is chosen
  // onClose?: () => void; // Example: handler for a close button
}

export function SubscriptionOfferPrompt({ onSelectPlan }: SubscriptionOfferPromptProps) {
  const handlePlanSelect = (planId: string) => {
    if (onSelectPlan) {
      onSelectPlan(planId);
    } else {
      // Default behavior or redirect, e.g.,
      // router.push(`/subscribe?plan=${planId}`);
      console.log(`Plan selected: ${planId}. Implement navigation or further action.`);
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-50 to-slate-100 p-6 sm:p-8 rounded-xl shadow-2xl max-w-2xl mx-auto my-8 text-center ring-1 ring-gray-200">
      <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-800 mb-3">
        Study Smarter with AP Dojo
      </h2>
      <p className="text-gray-600 mb-8 text-sm sm:text-base">
        Unlock all questions, full practice exams, AI assistance, and more to ace your AP exams!
      </p>

      <div className="grid sm:grid-cols-3 gap-4 sm:gap-6">
        {plans.map((plan) => (
          <div 
            key={plan.id}
            className={`relative flex flex-col justify-between p-5 rounded-lg border transition-all duration-300 ease-in-out hover:shadow-lg hover:scale-105 ${plan.bestValue ? 'border-yellow-500 border-2 bg-yellow-50' : 'border-gray-300 bg-white'}`}
          >
            {plan.bestValue && (
              <span className="absolute top-0 right-0 bg-yellow-400 text-yellow-900 text-xs font-semibold px-3 py-1 rounded-bl-lg rounded-tr-md transform -translate-y-px translate-x-px">
                Best Value
              </span>
            )}
            <div>
              <h3 className={`text-xl font-semibold mb-1 ${plan.bestValue ? 'text-yellow-700' : 'text-gray-700'}`}>
                {plan.name}
              </h3>
              <p className="text-3xl font-bold text-gray-900">
                {plan.price}
                <span className="text-sm font-normal text-gray-500 ml-1">{plan.term}</span>
              </p>
              {plan.savings && (
                <p className="text-xs text-green-600 font-medium mt-1">{plan.savings}</p>
              )}
              <p className="text-xs text-gray-500 mt-2 h-8">{plan.priceDetails}</p>
            </div>
            <button 
              onClick={() => handlePlanSelect(plan.id)}
              className={`w-full text-white font-semibold py-2.5 px-4 rounded-md mt-4 transition-colors duration-200 ${plan.bgColorClass} ${plan.hoverBgColorClass} focus:outline-none focus:ring-2 focus:ring-offset-2 ${plan.bestValue ? 'focus:ring-yellow-500' : 'focus:ring-blue-500'}`}
            >
              {plan.buttonText}
            </button>
          </div>
        ))}
      </div>
      
      <p className="text-xs text-gray-500 mt-8">
        *Semester plan savings based on a 6-month duration. You can cancel your subscription at any time.
      </p>
      {/* 
      If you add a close button:
      <button 
        onClick={onClose} 
        className="text-sm text-gray-500 hover:text-gray-700 mt-4"
      >
        Maybe later
      </button> 
      */}
    </div>
  );
}

// For easy import: export default SubscriptionOfferPrompt; (if you prefer default exports) 