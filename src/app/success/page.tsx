'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function SuccessPage() {
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: 'easeOut',
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: 'easeOut',
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center py-12 px-4">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-2xl w-full bg-white border-4 border-black rounded-3xl shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] p-16 min-h-[500px]"
      >
        <motion.h1
          variants={itemVariants}
          className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-10 text-center"
        >
          Welcome to the <span className="text-blue-500">Dojo</span>!
        </motion.h1>
        
        <motion.div
          variants={itemVariants}
          className="space-y-4 mb-10"
        >
          <motion.div
            whileHover={{ scale: 1.02, x: 4 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link
              href="/select-practice-units"
              className="block w-full text-left px-6 py-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors border-2 border-gray-200 hover:border-blue-300 shadow-sm hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-gray-900 text-lg">Unit MCQ Practice</span>
                <ArrowRight className="w-5 h-5 text-gray-400" />
              </div>
            </Link>
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.02, x: 4 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link
              href="/unitFRQpracticePage"
              className="block w-full text-left px-6 py-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors border-2 border-gray-200 hover:border-blue-300 shadow-sm hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-gray-900 text-lg">Unit FRQ Practice</span>
                <ArrowRight className="w-5 h-5 text-gray-400" />
              </div>
            </Link>
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.02, x: 4 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link
              href="/unit/1"
              className="block w-full text-left px-6 py-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors border-2 border-gray-200 hover:border-blue-300 shadow-sm hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-gray-900 text-lg">Unit Cheat Sheets</span>
                <ArrowRight className="w-5 h-5 text-gray-400" />
      </div>
            </Link>
          </motion.div>
        </motion.div>
        
        <motion.div
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Link
            href="/"
            className="block w-full bg-blue-600 text-white px-8 py-4 rounded-xl hover:bg-blue-700 transition-colors text-center font-bold text-lg shadow-lg hover:shadow-xl"
          >
            Return Home
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
} 