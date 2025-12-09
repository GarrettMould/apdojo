'use client';

import React from 'react';
import { Package, CalendarDays, Award, CheckCircle } from 'lucide-react'; // Example icons

interface PlanDetailProps {
  icon: React.ElementType;
  title: string;
  price: string;
  billingInfo: string;
  description: string;
  features: string[];
}

const PlanDetailCard: React.FC<PlanDetailProps> = ({ icon: Icon, title, price, billingInfo, description, features }) => {
  return (
    <div className="bg-white rounded-2xl border border-black border-2 p-6 flex flex-col text-left h-full shadow-lg">
      <div>
        <div className="mb-4">
          <Icon size={36} className="text-gray-700" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-1">{title}</h3>
        <div className="mb-3">
          <span className="text-2xl font-bold text-blue-500">{price}</span>
          <span className="text-sm text-gray-500 ml-1">({billingInfo})</span>
        </div>
        <p className="text-gray-600 text-sm leading-relaxed mb-4">{description}</p>
      </div>
      
      <ul className="space-y-2 text-sm text-gray-700 flex-grow mb-6">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <div className="mt-auto">
        <button 
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2.5 px-4 rounded-md transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

const commonFeatures = [
  'Access to all AP Dojo features',
  'Full MCQ and FRQ practice tests',
  'Personalized study resources',
  'Full library of interactive videos',
  'AI Dojo explanations'
];

export function PaymentPlanPreview() {
  const plans: PlanDetailProps[] = [
    {
      icon: Package,
      title: 'Monthly Plan',
      price: '$5',
      billingInfo: 'billed monthly',
      description: 'Perfect for focused, short-term prep or trying out our platform.',
      features: commonFeatures,
    },
    {
      icon: CalendarDays,
      title: 'Semester Plan',
      price: '$20',
      billingInfo: 'billed once',
      description: 'Ideal for a full semester of study to build strong foundations.',
      features: commonFeatures,
    },
    {
      icon: Award,
      title: 'One Year Plan',
      price: '$40',
      billingInfo: 'billed once',
      description: 'Our best value! Commit to a full year of learning and mastery.',
      features: commonFeatures,
    },
  ];

  return (
    <section className="bg-blue-500 py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 
            className="text-5xl sm:text-6xl font-extrabold tracking-tight text-white"
          >
            Flexible Plans for Every Student
          </h2>
          <p className="mt-6 max-w-3xl mx-auto text-lg text-blue-100">
          Whether it's last minute cramming or a full semester of study, we have a plan for you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <PlanDetailCard 
              key={plan.title} 
              icon={plan.icon} 
              title={plan.title} 
              price={plan.price}
              billingInfo={plan.billingInfo}
              description={plan.description} 
              features={plan.features}
            />
          ))}
        </div>

        {/* Added informational text below plans */}
        <div className="text-center mt-12">
          <p className="text-base text-blue-100">
            * Subscription gives you full access to AP Micro and AP Macro course          </p>
        </div>

      </div>
    </section>
  );
} 