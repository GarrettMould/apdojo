'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, AlertTriangle, ChevronDown, ChevronUp, Play, BookOpen, Target, ArrowRight } from 'lucide-react';
import Image from 'next/image';

// Mock Data
const userData = {
  belt: 'Yellow',
  xp: 3450,
  nextBeltXP: 7500,
  unitScores: [
    { id: 1, name: 'Basic Concepts', score: 85, status: 'strong' },
    { id: 2, name: 'Supply & Demand', score: 45, status: 'weak' },
    { id: 3, name: 'Production, Cost, and Perfect Competition', score: 72, status: 'medium' },
    { id: 4, name: 'Imperfect Competition', score: 68, status: 'medium' },
    { id: 5, name: 'Factor Markets', score: 78, status: 'strong' },
    { id: 6, name: 'Market Failure and the Role of Government', score: 65, status: 'medium' },
  ],
  weakestUnit: 'Unit 2: Supply & Demand',
  strongestUnit: 'Unit 1: Basic Concepts',
};

export function DojoDashboard() {
  const [showFullRecord, setShowFullRecord] = useState(false);

  const { belt, xp, nextBeltXP, unitScores, weakestUnit, strongestUnit } = userData;
  const xpProgress = (xp / nextBeltXP) * 100;
  const xpRemaining = nextBeltXP - xp;

  // Recommended training missions targeting weakest unit
  const missions = [
    {
      icon: Target,
      title: `Fix ${weakestUnit} Drill`,
      description: 'Targeted practice for supply shifters',
    },
    {
      icon: BookOpen,
      title: `${weakestUnit} Cheat Sheet`,
      description: 'Review key concepts and formulas',
    },
    {
      icon: Play,
      title: `${weakestUnit} MCQ Speed Run`,
      description: 'Quick-fire practice questions',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Section A: The Identity Card (Hero) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white border-4 border-black rounded-3xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8"
        >
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            {/* Left: Belt Icon */}
            <motion.div
              whileHover={{ scale: 1.1 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className="flex-shrink-0"
            >
              <Image
                src="/images/beltYellow.svg"
                alt={`${belt} Belt`}
                width={120}
                height={120}
                className="w-30 h-30"
              />
            </motion.div>

            {/* Right: Stats */}
            <div className="flex-1 w-full">
              <h2 className="text-3xl font-black text-gray-900 mb-6">
                Current Rank: {belt} Belt
              </h2>

              {/* XP Bar */}
              <div className="space-y-2">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-bold text-gray-700">
                    {xp.toLocaleString()} / {nextBeltXP.toLocaleString()} XP to Orange
                  </span>
                  <span className="text-sm font-bold text-gray-600">
                    {xpRemaining.toLocaleString()} XP remaining
                  </span>
                </div>
                <div className="h-6 w-full bg-gray-200 rounded-full border-2 border-black overflow-hidden">
                  <motion.div
                    className="h-full bg-yellow-400 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${xpProgress}%` }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Section B: Combat Record (Performance) */}
        <section>
          <h2 className="text-3xl font-black text-black mb-6">Performance Intel</h2>

          {/* Summary View (Default) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Strongest Zone Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="bg-white border-4 border-black rounded-3xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6 bg-gradient-to-br from-green-50 to-white"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 p-3 bg-green-100 rounded-full">
                  <ShieldCheck className="w-8 h-8 text-green-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-black text-gray-900 mb-2">Strongest Zone</h3>
                  <p className="text-xl font-bold text-green-700 mb-2">{strongestUnit}</p>
                  <p className="text-sm font-semibold text-green-600">Mastery Achieved</p>
                </div>
              </div>
            </motion.div>

            {/* Critical Weakness Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="bg-white border-4 border-black rounded-3xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6 bg-gradient-to-br from-red-50 to-white"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 p-3 bg-red-100 rounded-full">
                  <AlertTriangle className="w-8 h-8 text-red-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-black text-gray-900 mb-2">Critical Weakness</h3>
                  <p className="text-xl font-bold text-red-700 mb-2">{weakestUnit}</p>
                  <p className="text-sm font-semibold text-red-600">Needs Attention</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* View All Toggle Button */}
          <motion.button
            onClick={() => setShowFullRecord(!showFullRecord)}
            className="w-full bg-white border-4 border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-4 font-bold text-gray-900 hover:bg-gray-50 active:translate-y-1 transition-transform flex items-center justify-center gap-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span>View All Unit Scores</span>
            {showFullRecord ? (
              <ChevronUp className="w-5 h-5" />
            ) : (
              <ChevronDown className="w-5 h-5" />
            )}
          </motion.button>

          {/* Full Record List */}
          <AnimatePresence>
            {showFullRecord && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-6 bg-white border-4 border-black rounded-3xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6 overflow-hidden"
              >
                <div className="space-y-4">
                  {unitScores.map((unit, index) => (
                    <motion.div
                      key={unit.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05, duration: 0.3 }}
                      className="flex items-center gap-4"
                    >
                      <div className="flex-shrink-0 w-16">
                        <span className="text-lg font-black text-gray-900">Unit {unit.id}</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-base font-bold text-gray-900">{unit.name}</span>
                          <span className="text-base font-black text-gray-700">{unit.score}%</span>
                        </div>
                        <div className="h-3 w-full bg-gray-200 rounded-full border border-gray-300 overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              unit.status === 'strong'
                                ? 'bg-green-500'
                                : unit.status === 'weak'
                                ? 'bg-red-500'
                                : 'bg-yellow-500'
                            }`}
                            style={{ width: `${unit.score}%` }}
                          />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* Section C: Recommended Training (Resources) */}
        <section>
          <h2 className="text-3xl font-black text-black mb-6">Sensei's Recommendations</h2>

          <div className="space-y-4">
            {missions.map((mission, index) => {
              const IconComponent = mission.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
                  className="bg-white border-2 border-black rounded-xl p-4 hover:translate-x-1 transition-transform cursor-pointer shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-1">
                      <div className="flex-shrink-0">
                        <IconComponent className="w-6 h-6 text-gray-700" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-900">{mission.title}</h3>
                        <p className="text-sm text-gray-600">{mission.description}</p>
                      </div>
                    </div>
                    <button className="flex items-center gap-2 text-blue-600 font-bold hover:text-blue-700">
                      <span>Start Mission</span>
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}

