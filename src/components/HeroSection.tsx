'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { FRQFeedbackDemo } from '@/components/FRQFeedbackDemo';
import { MCQPracticePreview } from '@/components/MCQPracticePreview';

export function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section className="relative py-20 sm:py-28 lg:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center"
        >
          {/* Headline */}
          <motion.h1
            variants={itemVariants}
            className="text-5xl sm:text-6xl lg:text-7xl font-black text-gray-900 mb-6 leading-tight tracking-tight"
          >
            Start the Semester Off Right.
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={itemVariants}
            className="text-xl sm:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto font-medium leading-relaxed"
          >
            Unlock acceess to full AP practice tests, unlimited MCQ practice, AI-graded FRQs, interactive cheat sheets, and more. All for $29.
          </motion.p>

          {/* Main CTA */}
          <motion.div
            variants={itemVariants}
            className="mb-16"
          >
            <div className="flex flex-col items-center gap-4">
              <div className="flex flex-col items-center gap-1">
                <div className="flex gap-1 text-yellow-400 text-2xl sm:text-3xl" aria-hidden="true">
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                </div>
                <p
                  className="text-2xl font-bold text-gray-900 drop-shadow-sm"
                  style={{ fontFamily: 'Permanent Marker, cursive' }}
                >
                  Trusted by hundreds of students worldwide
                </p>
              </div>

              <Button
                asChild
                size="lg"
                className="text-lg sm:text-xl font-black py-6 px-8 sm:px-12 rounded-xl border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all hover:-translate-y-1 bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Link href="/purchase/season-pass">
                  Get the Season Pass
                </Link>
              </Button>
            </div>
          </motion.div>

          {/* Two Feature Containers Grid */}
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 max-w-6xl mx-auto items-stretch"
          >
            {/* 1. Grade Your FRQs in Seconds */}
            <motion.div
              variants={cardVariants}
              className="lg:col-span-1 flex"
            >
              <div className="scale-90 lg:scale-100 origin-center w-full flex">
                <FRQFeedbackDemo />
              </div>
            </motion.div>

            {/* 2. MCQ Practice Preview */}
            <motion.div
              variants={cardVariants}
              className="lg:col-span-1 flex"
            >
              <MCQPracticePreview />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

