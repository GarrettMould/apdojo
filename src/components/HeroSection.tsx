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
        ease: [0.22, 1, 0.36, 1] as const,
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
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  return (
    <section className="relative py-24 sm:py-32 lg:py-36 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-screen-2xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center"
        >
          {/* Headline */}
          <motion.h1
            variants={itemVariants}
            className="text-6xl sm:text-7xl lg:text-8xl font-black text-gray-900 mb-10 leading-[1.05] tracking-tight"
          >
            Start the Semester Off Right.
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={itemVariants}
            className="text-2xl sm:text-3xl text-gray-700 mb-14 max-w-4xl mx-auto font-medium leading-relaxed"
          >
            Unlock access to full AP practice tests, unlimited MCQ practice, AI-graded FRQs, interactive cheat sheets, and more. All for $29.
          </motion.p>

          {/* Main CTA */}
          <motion.div
            variants={itemVariants}
            className="mb-20"
          >
            <div className="flex flex-col items-center gap-6">
              <Button
                asChild
                size="lg"
                className="text-xl sm:text-2xl font-black py-8 px-10 sm:px-16 rounded-2xl border-4 border-black shadow-[7px_7px_0px_0px_rgba(0,0,0,1)] hover:shadow-[9px_9px_0px_0px_rgba(0,0,0,1)] transition-all hover:-translate-y-1 bg-blue-600 hover:bg-blue-700 text-white"
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
            className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 w-full mx-auto items-stretch"
          >
            {/* 1. Grade Your FRQs in Seconds */}
            <motion.div
              variants={cardVariants}
              className="lg:col-span-1 flex"
            >
              <div className="w-full flex flex-col">
                <div className="text-center mb-4">
                  <h3 className="text-2xl sm:text-3xl font-black text-gray-900">
                    AI-Graded FRQs
                  </h3>
                </div>
                <div className="scale-90 lg:scale-100 origin-center w-full flex">
                  <FRQFeedbackDemo />
                </div>
              </div>
            </motion.div>

            {/* 2. MCQ Practice Preview */}
            <motion.div
              variants={cardVariants}
              className="lg:col-span-1 flex"
            >
              <div className="w-full flex flex-col">
                <div className="text-center mb-4">
                  <h3 className="text-2xl sm:text-3xl font-black text-gray-900">
                    Unlimited MCQ Practice
                  </h3>
                </div>
                <MCQPracticePreview />
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
