"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Globe, Store, Lock, ArrowRight } from "lucide-react";
import { DojoReadinessBand } from "./DojoReadinessBand";
import dojoIcon from "../../public/images/dojoIcon.png";

export function StudentDashboard() {
  const [selectedSubject, setSelectedSubject] = useState<'macro' | 'micro' | null>(null);

  // View 1: Subject Picker
  if (!selectedSubject) {
    return (
      <div className="w-full h-screen flex">
        {/* Left Side: Macro */}
        <motion.button
          onClick={() => setSelectedSubject('macro')}
          className="flex-1 bg-blue-600 flex flex-col items-center justify-center gap-6 hover:bg-blue-700 transition-colors relative overflow-hidden"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center z-10"
          >
            <Globe className="w-24 h-24 text-white mb-6 mx-auto" />
            <h2 className="text-6xl font-black text-white mb-4">AP MACRO</h2>
            <p className="text-xl font-bold text-blue-100">Click to begin</p>
          </motion.div>
        </motion.button>

        {/* Right Side: Micro */}
        <motion.button
          onClick={() => setSelectedSubject('micro')}
          className="flex-1 bg-red-600 flex flex-col items-center justify-center gap-6 hover:bg-red-700 transition-colors relative overflow-hidden"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-center z-10"
          >
            <Store className="w-24 h-24 text-white mb-6 mx-auto" />
            <h2 className="text-6xl font-black text-white mb-4">AP MICRO</h2>
            <p className="text-xl font-bold text-red-100">Click to begin</p>
          </motion.div>
        </motion.button>
      </div>
    );
  }

  // View 2: Dashboard
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b-4 border-black sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Left: AP Dojo Logo */}
            <Link href="/" className="flex items-center space-x-3">
              <Image
                src={dojoIcon}
                alt="AP Dojo"
                width={32}
                height={32}
                className="w-8 h-8"
              />
              <span className="text-xl font-extrabold tracking-wide text-gray-900">
                AP <span className="text-blue-500">Dojo</span>
              </span>
            </Link>

            {/* Center: Subject Badge */}
            <div className={`px-4 py-2 rounded-lg border-2 border-black font-black text-sm uppercase ${
              selectedSubject === 'macro' 
                ? 'bg-blue-600 text-white' 
                : 'bg-red-600 text-white'
            }`}>
              {selectedSubject === 'macro' ? 'MACRO' : 'MICRO'} MODE
            </div>

            {/* Right: Switch Subject Button */}
            <button
              onClick={() => setSelectedSubject(null)}
              className="px-4 py-2 bg-white border-2 border-black rounded-lg font-bold text-sm hover:bg-gray-100 active:translate-y-1 transition-transform shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
            >
              Switch Subject
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section: Dojo Readiness Band (Sticky Top) */}
      <div className="sticky top-[72px] z-40">
        <DojoReadinessBand score={45} />
      </div>

      {/* Main Grid Area */}
      <div className="max-w-6xl mx-auto p-6 space-y-8">
        {/* Section A: The Campaign Map */}
        <section>
          <h2 className="text-3xl font-black text-black mb-6">Your Path to a 5</h2>
          
          {/* Unit Cards Container - Horizontal Scroll */}
          <div className="overflow-x-auto pb-4">
            <div className="flex gap-4 min-w-max">
              {[1, 2, 3, 4, 5, 6].map((unitNum) => {
                const isActive = unitNum === 1;
                const isLocked = unitNum > 1;
                
                return (
                  <motion.div
                    key={unitNum}
                    whileHover={isActive ? { scale: 1.05 } : {}}
                    whileTap={isActive ? { scale: 0.95 } : {}}
                  >
                    {isActive ? (
                      <Link
                        href="/dojo-drills"
                        className="block w-48 h-48 bg-white border-4 border-black rounded-3xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6 flex flex-col items-center justify-center hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all active:translate-y-1 cursor-pointer"
                      >
                        <div className="text-6xl font-black text-black mb-2">
                          {unitNum}
                        </div>
                        <div className="text-lg font-bold text-black">
                          Unit {unitNum}
                        </div>
                        <div className="text-sm font-semibold text-blue-600 mt-2">
                          Start Drills →
                        </div>
                      </Link>
                    ) : (
                      <div className="w-48 h-48 bg-gray-300 border-4 border-black rounded-3xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-6 flex flex-col items-center justify-center opacity-60">
                        <Lock className="w-12 h-12 text-gray-600 mb-2" />
                        <div className="text-6xl font-black text-gray-600 mb-2">
                          {unitNum}
                        </div>
                        <div className="text-lg font-bold text-gray-600">
                          Unit {unitNum}
                        </div>
                        <div className="text-sm font-semibold text-gray-500 mt-2">
                          Locked
                        </div>
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Section B: The Training Ground */}
        <section>
          <h2 className="text-3xl font-black text-black mb-6">The Training Ground</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Card 1: Full MCQ Exam */}
            <Link
              href="/exam/mcq"
              className="bg-white border-4 border-black rounded-3xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8 hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all active:translate-y-1 cursor-pointer"
            >
              <h3 className="text-2xl font-black text-black mb-4">Full MCQ Exam</h3>
              <p className="text-lg font-bold text-gray-700 mb-4">
                Test your endurance. 60 Questions.
              </p>
              <div className="flex items-center text-blue-600 font-bold">
                <span>Start Exam</span>
                <ArrowRight className="w-5 h-5 ml-2" />
              </div>
            </Link>

            {/* Card 2: FRQ Workshop */}
            <div className="bg-white border-4 border-black rounded-3xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8">
              <h3 className="text-2xl font-black text-black mb-4">FRQ Workshop</h3>
              <p className="text-lg font-bold text-gray-700 mb-4">
                Graphing practice. 3 Scenarios.
              </p>
              <div className="flex items-center text-gray-500 font-bold">
                <span>Coming Soon</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

