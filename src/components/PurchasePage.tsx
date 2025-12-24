'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Play, FileText, Monitor } from 'lucide-react';
import { redirectToCheckout } from '@/lib/stripe';
import { useAuthContext } from '@/contexts/AuthContext';

interface PurchasePageProps {
  courseType: 'macro' | 'micro';
}

interface CarouselSlide {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: string;
  imagePlaceholder: string;
}

const carouselSlides: CarouselSlide[] = [
  {
    id: 'drills',
    title: 'Interactive Drills',
    icon: <Play className="w-16 h-16" />,
    description: 'Master concepts through hands-on practice',
    imagePlaceholder: 'Graph movement animation',
  },
  {
    id: 'cheatsheets',
    title: 'Visual Cheat Sheets',
    icon: <FileText className="w-16 h-16" />,
    description: 'Downloadable PDF study guides',
    imagePlaceholder: 'Sleek PDF preview',
  },
  {
    id: 'exam',
    title: 'Premium Exam UI',
    icon: <Monitor className="w-16 h-16" />,
    description: 'Split-screen exam interface',
    imagePlaceholder: 'Exam interface preview',
  },
];

export function PurchasePage({ courseType }: PurchasePageProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { user } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);

  // Auto-rotate carousel every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

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

  const currentSlideData = carouselSlides[currentSlide];

  return (
    <div className="min-h-[calc(100vh-4rem)] grid grid-cols-1 lg:grid-cols-4">
      {/* Left Column - Visual Hook (Col Span 1) */}
      <div className="bg-gray-100 border-r-2 border-black p-6 flex items-center justify-center sticky top-0 h-screen lg:col-span-1">
        <div className="w-full max-w-md">
          {/* Tablet/Monitor Frame */}
          <div className="bg-white border-4 border-black rounded-2xl shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] p-4 overflow-hidden">
            {/* Screen Area */}
            <div className="bg-gray-900 rounded-lg aspect-video flex items-center justify-center relative overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 flex flex-col items-center justify-center p-8 text-white"
                >
                  <div className="mb-4 text-white">
                    {currentSlideData.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-center">
                    {currentSlideData.title}
                  </h3>
                  <p className="text-sm text-gray-300 text-center">
                    {currentSlideData.description}
                  </p>
                  {/* Placeholder visual content */}
                  <div className="mt-6 w-full h-32 bg-gray-800 rounded border-2 border-gray-700 flex items-center justify-center">
                    <span className="text-gray-500 text-xs">
                      {currentSlideData.imagePlaceholder}
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
            
            {/* Slide Indicators */}
            <div className="flex justify-center gap-2 mt-4">
              {carouselSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentSlide
                      ? 'bg-black w-8'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right Column - Sales Pitch (Col Span 3) */}
      <div className="bg-white p-8 lg:p-12 flex flex-col justify-center lg:col-span-3">
        <div className="max-w-2xl mx-auto w-full space-y-8">
          {/* Badge */}
          <div className="inline-block">
            <span className="px-4 py-2 bg-black text-white font-bold text-sm uppercase tracking-wider border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              {courseType.toUpperCase()} SEASON PASS
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl lg:text-6xl font-extrabold text-black leading-tight">
            The Complete Toolkit for a 5.
          </h1>

          {/* Price Section */}
          <div className="space-y-2">
            <p className="text-lg font-semibold text-gray-700">
              One-time payment of
            </p>
            <div className="flex items-baseline gap-3">
              <span className="text-6xl font-extrabold text-green-500">
                $29
              </span>
              <span className="text-2xl text-gray-400 line-through">
                $59
              </span>
            </div>
          </div>

          {/* Benefits Stack */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-black mb-4">
              What's Included:
            </h2>
            <ul className="space-y-3">
              {[
                'Endless AP-Style MCQ Bank',
                'AI-Graded FRQs with Graphing Help',
                'Interactive Dojo Drills for Hard Topics',
                'Downloadable Visual Cheat Sheets',
                'New: Upload Notes to Create Custom Quizzes',
              ].map((benefit, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-lg font-semibold text-gray-900">
                    {benefit}
                  </span>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* CTA Button */}
          <div className="pt-8">
            <motion.button
              onClick={handlePurchase}
              disabled={isLoading}
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-extrabold text-xl py-6 px-8 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 uppercase tracking-wide disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Processing...' : 'UNLOCK INSTANT ACCESS'}
            </motion.button>

            {/* Trust Elements */}
            <p className="text-sm text-gray-600 text-center mt-4">
              Secure Checkout via Stripe. 100% Money-Back Guarantee.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}


