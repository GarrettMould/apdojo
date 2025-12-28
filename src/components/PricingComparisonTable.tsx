'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, X, Sparkles } from 'lucide-react';
import Link from 'next/link';

interface Feature {
  name: string;
  free: boolean;
  macro: boolean;
  micro: boolean;
  bundle: boolean;
}

interface Plan {
  id: string;
  name: string;
  price: string;
  originalPrice?: string;
  description: string;
  theme: 'gray' | 'yellow' | 'green' | 'bundle';
  isBestValue?: boolean;
}

const features: Feature[] = [
  {
    name: 'Video Briefings',
    free: true,
    macro: true,
    micro: true,
    bundle: true,
  },
  {
    name: 'Unit 1 Interactive Drill',
    free: true,
    macro: true,
    micro: true,
    bundle: true,
  },
  {
    name: 'Full Interactive Graph Lab',
    free: false,
    macro: true,
    micro: true,
    bundle: true,
  },
  {
    name: 'AI Note Scanner',
    free: false,
    macro: true,
    micro: true,
    bundle: true,
  },
  {
    name: 'Unlimited Quiz Generator',
    free: false,
    macro: true,
    micro: true,
    bundle: true,
  },
  {
    name: 'Exam-Day PDF Cheat Sheets',
    free: false,
    macro: true,
    micro: true,
    bundle: true,
  },
  {
    name: 'Priority Support',
    free: false,
    macro: false,
    micro: false,
    bundle: true,
  },
];

const plans: Plan[] = [
  {
    id: 'free',
    name: 'Free User',
    price: 'Free',
    description: 'Basic access',
    theme: 'gray',
  },
  {
    id: 'macro',
    name: 'Macro Pass',
    price: '$29',
    description: 'AP Macroeconomics',
    theme: 'yellow',
  },
  {
    id: 'micro',
    name: 'Micro Pass',
    price: '$29',
    description: 'AP Microeconomics',
    theme: 'green',
  },
  {
    id: 'bundle',
    name: 'The Double Major',
    price: '$49',
    originalPrice: '$58',
    description: 'Both courses',
    theme: 'bundle',
    isBestValue: true,
  },
];

const getThemeClasses = (theme: Plan['theme']) => {
  switch (theme) {
    case 'gray':
      return {
        bg: 'bg-gray-50',
        border: 'border-gray-200',
        text: 'text-gray-900',
        badge: 'bg-gray-100 text-gray-700',
        button: 'bg-gray-200 text-gray-600 cursor-not-allowed',
        buttonHover: '',
      };
    case 'yellow':
      return {
        bg: 'bg-yellow-50',
        border: 'border-yellow-200',
        text: 'text-gray-900',
        badge: 'bg-yellow-100 text-yellow-800',
        button: 'bg-yellow-500 hover:bg-yellow-600 text-white border-2 border-black',
        buttonHover: 'hover:shadow-lg',
      };
    case 'green':
      return {
        bg: 'bg-green-50',
        border: 'border-green-200',
        text: 'text-gray-900',
        badge: 'bg-green-100 text-green-800',
        button: 'bg-green-500 hover:bg-green-600 text-white border-2 border-black',
        buttonHover: 'hover:shadow-lg',
      };
    case 'bundle':
      return {
        bg: 'bg-gradient-to-br from-blue-50 via-purple-50 to-green-50',
        border: 'border-blue-300',
        text: 'text-gray-900',
        badge: 'bg-gradient-to-r from-blue-600 to-purple-600 text-white',
        button: 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-2 border-black',
        buttonHover: 'hover:shadow-xl',
      };
  }
};

export function PricingComparisonTable() {
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);

  return (
    <div className="w-full py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-gray-900 mb-4">
            One Pass. <span className="text-blue-500">Unlimited</span> Access Until Exam Day.
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Pay once and own the dojo for the entire 2026 school year. No monthly subscriptions, just results.
          </p>
        </motion.div>

        {/* Mobile Scroll Hint */}
        <div className="md:hidden mb-4 text-center">
          <p className="text-sm text-gray-500 flex items-center justify-center gap-2">
            <span>← Scroll to compare →</span>
          </p>
        </div>

        {/* Table Container with Horizontal Scroll on Mobile */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="overflow-x-auto -mx-4 sm:mx-0"
        >
          <div className="inline-block min-w-full align-middle">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2, type: "spring", stiffness: 100 }}
              className="overflow-hidden bg-white rounded-3xl border border-gray-100 shadow-xl"
            >
              {/* Table */}
              <div className="grid grid-cols-[200px_repeat(4,minmax(150px,1fr))] md:grid-cols-[250px_repeat(4,minmax(180px,1fr))]">
                {/* Header Row - Sticky */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, type: "spring" }}
                  className="sticky top-0 z-20 bg-gray-50/80 backdrop-blur-sm border-b border-gray-200 font-semibold text-sm sm:text-base text-gray-900 p-5"
                >
                  Features
                </motion.div>
                {plans.map((plan, planIndex) => {
                  const theme = getThemeClasses(plan.theme);
                  return (
                    <motion.div
                      key={plan.id}
                      initial={{ opacity: 0, y: -20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: planIndex * 0.1, type: "spring" }}
                      className={`sticky top-0 z-20 ${theme.bg} border-b border-l border-gray-200 p-5 text-center`}
                    >
                      {/* Best Value Badge */}
                      {plan.isBestValue && (
                        <motion.div
                          initial={{ scale: 0, rotate: -10 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                          className={`${theme.badge} inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold mb-3 shadow-sm`}
                        >
                          <Sparkles className="w-3.5 h-3.5" />
                          Best Value
                        </motion.div>
                      )}
                      <h3 className={`${theme.text} font-bold text-base sm:text-lg mb-2`}>
                        {plan.name}
                      </h3>
                      <div className="flex flex-col items-center gap-1.5">
                        <div className="flex items-baseline gap-2">
                          <span className={`${theme.text} text-2xl sm:text-3xl font-extrabold`}>
                            {plan.price}
                          </span>
                          {plan.originalPrice && (
                            <span className="text-sm text-gray-400 line-through">
                              {plan.originalPrice}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-gray-500">{plan.description}</p>
                      </div>
                    </motion.div>
                  );
                })}

                {/* Feature Rows */}
                {features.map((feature, index) => {
                  const isHovered = hoveredRow === index;
                  return (
                    <React.Fragment key={feature.name}>
                      {/* Feature Name Cell */}
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: index * 0.05, type: "spring" }}
                        className={`border-b border-l border-gray-100 p-5 flex items-center ${
                          isHovered ? 'bg-gray-50/50' : 'bg-white'
                        } transition-colors duration-200`}
                        onMouseEnter={() => setHoveredRow(index)}
                        onMouseLeave={() => setHoveredRow(null)}
                        whileHover={{ x: 4, transition: { type: "spring", stiffness: 300 } }}
                      >
                        <span className="text-sm sm:text-base font-medium text-gray-800">
                          {feature.name}
                        </span>
                      </motion.div>

                      {/* Plan Cells */}
                      {plans.map((plan, planIndex) => {
                        const theme = getThemeClasses(plan.theme);
                        const hasFeature = feature[plan.id as keyof Feature] as boolean;
                        return (
                          <motion.div
                            key={`${feature.name}-${plan.id}`}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.3, delay: (index * 0.05) + (planIndex * 0.05), type: "spring" }}
                            whileHover={{ scale: 1.08, transition: { type: "spring", stiffness: 400 } }}
                            className={`border-b border-l border-gray-100 p-5 flex items-center justify-center ${
                              isHovered ? `${theme.bg} opacity-90` : theme.bg
                            } transition-all duration-200`}
                            onMouseEnter={() => setHoveredRow(index)}
                            onMouseLeave={() => setHoveredRow(null)}
                          >
                            {hasFeature ? (
                              <motion.div
                                initial={{ scale: 0, rotate: -180 }}
                                animate={{ scale: 1, rotate: 0 }}
                                transition={{ delay: (index * 0.05) + (planIndex * 0.05), type: "spring", stiffness: 200 }}
                                whileHover={{ scale: 1.2, rotate: 5 }}
                              >
                                <Check className="w-6 h-6 sm:w-7 sm:h-7 text-green-500" />
                              </motion.div>
                            ) : (
                              <motion.div
                                initial={{ scale: 0, rotate: 180 }}
                                animate={{ scale: 1, rotate: 0 }}
                                transition={{ delay: (index * 0.05) + (planIndex * 0.05), type: "spring", stiffness: 200 }}
                                whileHover={{ scale: 1.1 }}
                              >
                                <X className="w-5 h-5 sm:w-6 sm:h-6 text-gray-300" />
                              </motion.div>
                            )}
                          </motion.div>
                        );
                      })}
                    </React.Fragment>
                  );
                })}

                {/* CTA Row */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, type: "spring" }}
                  className="col-span-1 border-b border-l border-gray-100 p-5 bg-gray-50/50"
                >
                  <span className="text-sm font-semibold text-gray-700">Get Started</span>
                </motion.div>
                {plans.map((plan, planIndex) => {
                  const theme = getThemeClasses(plan.theme);
                  const isFree = plan.id === 'free';
                  const isBundle = plan.id === 'bundle';
                  
                  return (
                    <motion.div
                      key={`cta-${plan.id}`}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: planIndex * 0.1, type: "spring" }}
                      className={`border-b border-l border-gray-100 p-5 ${theme.bg} flex items-center justify-center`}
                    >
                      {isFree ? (
                        <motion.button
                          disabled
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className={`${theme.button} px-6 py-3 rounded-xl text-sm font-bold w-full transition-all`}
                        >
                          Current Plan
                        </motion.button>
                      ) : (
                        <Link
                          href={
                            isBundle
                              ? '/purchase/bundle'
                              : `/purchase/season-pass?courseType=${plan.id === 'macro' ? 'macro' : 'micro'}`
                          }
                          className="w-full"
                        >
                          <motion.button
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.98 }}
                            transition={{ type: "spring", stiffness: 300 }}
                            className={`${theme.button} ${theme.buttonHover} px-6 py-3 rounded-xl text-sm font-bold w-full text-center transition-all shadow-sm ${
                              isBundle ? 'text-base py-4' : ''
                            }`}
                          >
                            {isBundle ? (
                              <>
                                {plan.price} - Save $9
                              </>
                            ) : (
                              <>
                                {plan.price} - Unlock
                              </>
                            )}
                          </motion.button>
                        </Link>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Mobile: Show only Free vs Bundle comparison */}
        <div className="md:hidden mt-8">
          <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4 text-center">
            <p className="text-sm text-blue-900 font-medium mb-2">
              💡 Tip: Scroll horizontally to see all plans
            </p>
            <p className="text-xs text-blue-700">
              Or view on a larger screen for the full comparison
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

