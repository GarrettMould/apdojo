'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Play, FileText, Monitor, Star, ShieldCheck, Sparkles } from 'lucide-react';
import { redirectToCheckout } from '@/lib/stripe';
import { useAuthContext } from '@/contexts/AuthContext';
import Image from 'next/image';
import Link from 'next/link';

interface PurchasePageProps {
  courseType: 'macro' | 'micro';
}

interface CourseConfig {
  themeColor: 'green' | 'blue';
  badge: string;
  headline: string;
  price: number;
  features: Array<{ text: string; key: string }>;
}

const COURSE_CONFIG: Record<'macro' | 'micro', CourseConfig> = {
  micro: {
    themeColor: 'green',
    badge: 'AP MICRO SEASON PASS',
    headline: 'The Complete AP Micro Toolkit for a 5.',
    price: 29,
    features: [
      { text: 'Endless AP-Style MCQ Bank', key: 'Endless' },
      { text: 'AI-Graded FRQs with Graphing Help', key: 'AI-Graded' },
      { text: 'Interactive Drill Simulator', key: 'Interactive' },
      { text: 'Visual Cheat Sheets (PDF)', key: 'Visual Cheat Sheets' },
      { text: 'Upload Notes to Create Quizzes', key: 'Upload Notes' },
    ],
  },
  macro: {
    themeColor: 'blue',
    badge: 'AP MACRO SEASON PASS',
    headline: 'The Complete AP Macro Toolkit for a 5.',
    price: 29,
    features: [
      { text: 'Endless AP-Style MCQ Bank', key: 'Endless' },
      { text: 'AI-Graded FRQs with Graphing Help', key: 'AI-Graded' },
      { text: 'Interactive Drill Simulator', key: 'Interactive' },
      { text: 'Visual Cheat Sheets (PDF)', key: 'Visual Cheat Sheets' },
      { text: 'Upload Notes to Create Quizzes', key: 'Upload Notes' },
    ],
  },
};

export function PurchasePage({ courseType }: PurchasePageProps) {
  const { user } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);
  const config = COURSE_CONFIG[courseType];
  const isGreen = config.themeColor === 'green';

  const handlePurchase = async () => {
    if (!user) {
      // Handle login redirect or modal
      window.location.href = '/?login=true';
      return;
    }

    setIsLoading(true);
    try {
      // TODO: Create season pass checkout session
      // For now, redirect to a placeholder or use existing checkout flow
      // await redirectToCheckout(courseType, 'season-pass', '1', user.uid);
      console.log('Purchase initiated for', courseType, 'season pass');
      // Placeholder - replace with actual checkout
    } catch (error) {
      console.error('Error initiating purchase:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] grid grid-cols-1 lg:grid-cols-4">
      {/* Left Column - Visual Hook (Col Span 1) */}
      <div className="bg-gradient-to-b from-gray-50 to-gray-100 border-r-2 border-black p-6 flex flex-col items-center justify-center sticky top-0 h-screen lg:col-span-1 overflow-y-auto">
        <div className="w-full max-w-md space-y-8">
          {/* Three images stacked vertically */}
          {[1, 2, 3].map((num, index) => (
            <motion.div
              key={num}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
              whileHover={{ y: -4, scale: 1.02 }}
              className="w-full rounded-xl overflow-hidden shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] border-4 border-black bg-white group cursor-pointer"
            >
              <div className="relative overflow-hidden">
                <Image
                  src={`/images/purchasePage${num}.png`}
                  alt={`Purchase page preview ${num}`}
                  width={800}
                  height={600}
                  className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
                  priority={num === 1}
                />
                {/* Subtle gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Right Column - Sales Pitch (Col Span 3) */}
      <div className="bg-white p-8 lg:p-12 flex flex-col justify-center lg:col-span-3">
        <div className="max-w-2xl mx-auto w-full space-y-8">
          {/* Badge */}
          <div className="inline-block">
            <span className={`px-5 py-2.5 ${isGreen ? 'bg-green-600' : 'bg-blue-600'} text-white font-bold text-sm uppercase tracking-wider border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rounded-lg`}>
              {config.badge}
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl lg:text-6xl font-extrabold text-black leading-tight">
            {config.headline.split('AP ').map((part, index) => {
              if (index === 0) return part;
              const courseName = part.split(' ')[0]; // Get "Macro" or "Micro"
              const rest = part.substring(courseName.length);
              return (
                <React.Fragment key={index}>
                  AP{' '}
                  <span className={isGreen ? 'text-green-600' : 'text-blue-600'}>
                    {courseName}
                  </span>
                  {rest}
                </React.Fragment>
              );
            })}
          </h1>

          {/* Price Section */}
          <div className="space-y-2">
            <p className="text-lg font-semibold text-gray-700">
              One-time payment of
            </p>
            <div className="flex items-baseline gap-3">
              <span className={`text-6xl font-extrabold ${isGreen ? 'text-green-600' : 'text-blue-600'}`}>
                ${config.price}
              </span>
              <span className="text-lg text-gray-400 line-through ml-2">
                $59
              </span>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              Valid until May 30th, 2026
            </p>
          </div>

          {/* Star Rating */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <span className="text-sm font-medium text-gray-600">
              500+ Students Tutored
            </span>
          </div>

          {/* Benefits Stack */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-black mb-4">
              What's Included:
            </h2>
            <ul className="space-y-3">
              {config.features.map((benefit, index) => {
                const parts = benefit.text.split(benefit.key);
                return (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle2 className={`w-6 h-6 flex-shrink-0 mt-0.5 ${isGreen ? 'text-green-600' : 'text-blue-600'}`} />
                    <span className="text-lg font-semibold text-gray-900">
                      {parts[0]}
                      <strong>{benefit.key}</strong>
                      {parts[1]}
                    </span>
                  </motion.li>
                );
              })}
            </ul>
          </div>

          {/* CTA Button */}
          <div className="pt-8">
            <motion.button
              onClick={handlePurchase}
              disabled={isLoading}
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full text-white font-extrabold text-xl py-6 px-8 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 uppercase tracking-wide disabled:opacity-50 disabled:cursor-not-allowed ${
                isGreen 
                  ? 'bg-green-600 hover:bg-green-700' 
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {isLoading ? 'Processing...' : 'UNLOCK INSTANT ACCESS'}
            </motion.button>

            {/* Trust Elements */}
            <p className="text-xs text-gray-500 text-center mt-4 flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-gray-400" />
              100% Money-Back Guarantee
            </p>
          </div>

          {/* Bundle Upsell Card */}
          <div className="w-full p-4 mt-6 bg-yellow-50 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            {/* Left Side */}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <Sparkles className="w-5 h-5 text-yellow-600" />
                <h3 className="text-lg font-bold text-gray-900">
                  Taking both exams?
                </h3>
              </div>
              <p className="text-gray-700 text-sm">
                Get the Macro + Micro Bundle for just $49.
              </p>
            </div>
            {/* Right Side */}
            <Link
              href="/purchase/bundle"
              className="bg-white border-2 border-black hover:bg-gray-100 font-bold px-4 py-2 text-sm transition-colors whitespace-nowrap flex-shrink-0"
            >
              View Bundle
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}


