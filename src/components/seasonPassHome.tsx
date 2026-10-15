'use client';

import React, { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, BookOpen, FileText, Target, PlayCircle, Sparkles, Brain, Award, Search, Filter, X, ChevronRight, Upload, Image as ImageIcon, Loader2, CheckCircle2, XCircle, RefreshCw, Lightbulb } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { dojoDrills, drillAppliesToSubject, getDrillUnitForSubject } from '@/data/dojoDrills';
import { frqExams } from '@/data/frqQuestions';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { SeasonPassShowcase } from '@/components/SeasonPassShowcase';
import { HomeDojoDrills } from '@/components/HomeDojoDrills';
import { HeroSection } from '@/components/HeroSection';
import { HomeSocialProofSection } from '@/components/HomeSocialProofSection';
import dynamic from 'next/dynamic';

const QuestionListSection = dynamic(
  () => import('./HomeQuestionList').then((m) => m.QuestionListSection),
  { loading: () => <div className="bg-gray-50 py-16 sm:py-24" /> }
);

interface FeatureItem {
  icon: React.ReactNode;
  text: string;
}

const macroFeatures: FeatureItem[] = [
  { icon: <FileText className="w-5 h-5" />, text: 'Unlimited MCQ Practice' },
  { icon: <BookOpen className="w-5 h-5" />, text: 'Full FRQ Practice Library' },
  { icon: <Target className="w-5 h-5" />, text: 'Unit Cheat Sheets' },
  { icon: <PlayCircle className="w-5 h-5" />, text: 'Complete Video Library' },
  { icon: <Sparkles className="w-5 h-5" />, text: 'Dojo Drills & Interactive Exercises' },
  { icon: <Brain className="w-5 h-5" />, text: 'AI-Powered Explanations' },
  { icon: <Award className="w-5 h-5" />, text: 'Full Practice Tests' },
];

const microFeatures: FeatureItem[] = [
  { icon: <FileText className="w-5 h-5" />, text: 'Unlimited MCQ Practice' },
  { icon: <BookOpen className="w-5 h-5" />, text: 'Full FRQ Practice Library' },
  { icon: <Target className="w-5 h-5" />, text: 'Unit Cheat Sheets' },
  { icon: <PlayCircle className="w-5 h-5" />, text: 'Complete Video Library' },
  { icon: <Sparkles className="w-5 h-5" />, text: 'Dojo Drills & Interactive Exercises' },
  { icon: <Brain className="w-5 h-5" />, text: 'AI-Powered Explanations' },
  { icon: <Award className="w-5 h-5" />, text: 'Full Practice Tests' },
];

export function SeasonPassHome() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <HeroSection />

      {/* Social proof section (reviews) */}
      <HomeSocialProofSection />

      {/* Season Pass Showcase */}
      <SeasonPassShowcase />

      {/* Home Dojo Drills Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 pb-16 sm:pb-24">
        <HomeDojoDrills />
      </div>

      {/* Question List Section */}
      <QuestionListSection />
    </div>
  );
}


// Dojo Drills Section Component
function DojoDrillsSection() {
  const drills = Object.values(dojoDrills);

  const getSubjectLabel = (subject: string) => {
    return subject === 'ap_macroeconomics' ? 'Macro' : 'Micro';
  };

  const handleDrillClick = (drillId: string) => {
    // Navigate to dojo drill preview page
    window.location.href = `/dojo-drills/preview/${drillId}`;
  };

  return (
    <div className="bg-gray-50 py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4 text-center">
            Master the Hardest Topics with <span className="text-blue-500">Interactive</span> Drills
          </h2>
          <p className="text-xl text-gray-600 text-center max-w-3xl mx-auto">
            Master key concepts through interactive video lessons, graph simulations, and practice questions.
          </p>
        </motion.div>

        {drills.length === 0 ? (
          <div className="bg-white border-4 border-black rounded-3xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8 text-center">
            <p className="text-gray-600">No Dojo Drills available yet. Check back soon!</p>
          </div>
        ) : (
          <div className="relative">
            {/* SVG Overlay for connecting lines - Dashed thick black lines */}
            {drills.length > 1 && (
              <svg 
                className="absolute top-0 left-0 w-full h-full pointer-events-none z-0"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                style={{ 
                  height: '100%',
                  minHeight: `${drills.length * 250}px`
                }}
              >
                <defs>
                  <marker
                    id="arrowhead-drill"
                    markerWidth="8"
                    markerHeight="8"
                    refX="7"
                    refY="4"
                    orient="auto"
                    markerUnits="userSpaceOnUse"
                  >
                    <polygon points="0 0, 8 4, 0 8" fill="black" />
                  </marker>
                </defs>
                {drills.slice(0, -1).map((_, index) => {
                  const isEven = index % 2 === 0;
                  const nextIsEven = (index + 1) % 2 === 0;
                  
                  // Calculate Y positions - evenly spaced across 100 units
                  const cardSpacingPercent = 100 / drills.length;
                  const startY = (index + 1) * cardSpacingPercent;
                  const endY = (index + 2) * cardSpacingPercent;
                  
                  // X positions: left cards at 10%, right cards at 90%
                  const startX = isEven ? 10 : 90;
                  const endX = nextIsEven ? 10 : 90;
                  const midX = 50;
                  const midY = (startY + endY) / 2;
                  
                  return (
                    <path
                      key={index}
                      d={`M ${startX} ${startY} Q ${midX} ${startY + 2} ${midX} ${midY} Q ${midX} ${endY - 2} ${endX} ${endY}`}
                      stroke="black"
                      strokeWidth="2"
                      fill="none"
                      strokeDasharray="6 4"
                      markerEnd="url(#arrowhead-drill)"
                    />
                  );
                })}
              </svg>
            )}
            
            {/* Path container with alternating offset */}
            <div className="space-y-8 relative z-10">
              {drills.map((drill, index) => {
                const isEven = index % 2 === 0;
                return (
                  <motion.div
                    key={drill.id}
                    initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className={`flex ${isEven ? 'justify-start' : 'justify-end'}`}
                  >
                    <button
                      onClick={() => handleDrillClick(drill.id)}
                      className="bg-white border-4 border-black rounded-3xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6 text-left hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all active:translate-y-1 w-full max-w-md flex flex-col relative z-10"
                    >
                      <div className="flex items-center justify-between mb-4">
                        {(() => {
                          // Determine which subject to display (prefer macro, then micro, then fallback)
                          const displaySubject = drill.subjects?.[0] || drill.subject;
                          const displayUnit = drill.subjects && drill.subjects.length > 0 
                            ? getDrillUnitForSubject(drill, displaySubject) || drill.unit
                            : drill.unit;
                          return (
                            <div
                              className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-md ${
                                displaySubject === 'ap_macroeconomics'
                                  ? 'bg-blue-100 text-blue-800'
                                  : 'bg-green-100 text-green-800'
                              }`}
                            >
                              {getSubjectLabel(displaySubject)} - Unit {displayUnit}
                            </div>
                          );
                        })()}
                        <div className="flex items-center gap-1.5 text-sm font-semibold text-gray-800">
                          <span>{drill.xpReward.total}</span>
                          <span className="inline-flex items-center">
                            <Image
                              src="/images/flame100.png"
                              alt="XP Flame"
                              width={20}
                              height={20}
                              className="w-5 h-5"
                            />
                          </span>
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {drill.title}
                      </h3>
                      <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                        {drill.description}
                      </p>
                      <div className="text-sm font-semibold text-blue-600 mt-auto">
                        Start Drill →
                      </div>
                    </button>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// FRQ Practice Preview Section
function FRQPreviewSection() {
  // Get a sample FRQ question for preview (using the first question from macroUnit4Set1)
  const sampleFRQ = frqExams.find(exam => exam.examTitle.includes('Ample Reserves'))?.questions[0];
  
  if (!sampleFRQ) return null;

  const handleFRQClick = () => {
    // Navigate to FRQ practice page
    window.location.href = `/unitFRQpracticePage?subject=macro&frqId=1`;
  };

  return (
    <div className="bg-white py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4 text-center">
            FRQ Practice
          </h2>
          <p className="text-xl text-gray-600 text-center max-w-3xl mx-auto">
            Practice Free Response Questions with interactive graph drawing, instant feedback, and video walkthroughs.
          </p>
        </motion.div>

        {/* Static Preview Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white border-2 border-gray-200 rounded-xl shadow-lg overflow-hidden"
        >
          {/* Preview Header */}
          <div className="bg-gradient-to-r from-blue-50 to-green-50 border-b-2 border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">
                  {sampleFRQ.title}
                </h3>
                <p className="text-sm text-gray-600">
                  Question {sampleFRQ.questionNumber} • {sampleFRQ.difficulty ? sampleFRQ.difficulty.charAt(0).toUpperCase() + sampleFRQ.difficulty.slice(1) : 'Medium'} Difficulty
                </p>
              </div>
              <div className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-md">
                Preview
              </div>
            </div>
          </div>

          {/* Question Prompt */}
          <div className="p-6 border-b border-gray-200">
            <p className="text-lg text-gray-800 leading-relaxed">
              {sampleFRQ.prompt}
            </p>
          </div>

          {/* Preview Parts */}
          <div className="p-6 space-y-6">
            {/* Show first part as preview */}
            {sampleFRQ.parts.slice(0, 2).map((part, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                <div className="flex items-start gap-3 mb-3">
                  <span className="font-bold text-lg text-gray-900">{part.label}.</span>
                  <div className="flex-1">
                    <p className="text-gray-800 mb-3">{part.text}</p>
                    
                    {/* Show subparts if they exist */}
                    {part.subparts && part.subparts.length > 0 && (
                      <div className="ml-4 space-y-2 mb-3">
                        {part.subparts.map((subpart, subIndex) => (
                          <p key={subIndex} className="text-sm text-gray-700">
                            <span className="font-semibold">{part.label}{subpart.label}.</span> {subpart.text}
                          </p>
                        ))}
                      </div>
                    )}

                    {/* Preview Answer Area */}
                    {part.answerType === 'draw' && (
                      <div className="mt-4 space-y-4">
                        {/* Side-by-side comparison */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {/* Student's Drawing */}
                          <div className="flex flex-col">
                            <h4 className="text-base font-semibold text-gray-800 mb-2">Your Drawing:</h4>
                            <div className="bg-white border-2 border-gray-300 rounded-lg p-4 flex items-center justify-center h-64">
                              <div className="text-gray-400 text-sm text-center">
                                <div className="w-32 h-32 bg-gray-100 border-2 border-dashed border-gray-300 rounded mx-auto mb-2 flex items-center justify-center">
                                  <span className="text-2xl">📊</span>
                                </div>
                                <p>No drawing submitted</p>
                              </div>
                            </div>
                          </div>

                          {/* Reference Image (Correct Answer) */}
                          <div className="flex flex-col">
                            <h4 className="text-base font-semibold text-gray-800 mb-2">Correct Answer:</h4>
                            <div className="bg-white border-2 border-green-300 rounded-lg p-4 flex items-center justify-center h-64 overflow-hidden">
                              {part.referenceImageUrl ? (
                                <Image
                                  src={part.referenceImageUrl}
                                  alt="Correct Answer"
                                  width={250}
                                  height={180}
                                  className="object-contain max-w-full max-h-full"
                                />
                              ) : (
                                <div className="text-gray-400 text-sm text-center">
                                  <div className="w-32 h-32 bg-gray-200 rounded mx-auto mb-2"></div>
                                  <p>Reference image</p>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Score Display */}
                        <div className="rounded-lg p-4 bg-gray-50 border border-gray-200">
                          <p className="text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">
                            AP Exam Score
                          </p>
                          <div className="flex gap-2 mb-2">
                            {[0, 1, 2].map((score) => {
                              const isSelected = score === 1; // Show partial credit (1 out of 2)
                              let colorClass = '';
                              if (isSelected) {
                                colorClass = 'bg-yellow-100 border-yellow-500 text-yellow-700';
                              } else {
                                colorClass = 'bg-white border-gray-300 text-gray-500';
                              }
                              
                              return (
                                <div
                                  key={score}
                                  className={`flex-1 py-3 px-4 rounded-lg border-2 font-semibold text-lg ${colorClass}`}
                                >
                                  {score}
                                </div>
                              );
                            })}
                          </div>
                          <p className="text-xs text-gray-600 text-center">
                            Partial credit - Some understanding shown
                          </p>
                        </div>

                        {/* Feedback Explanation */}
                        <div className="mt-3 pt-3 border-t border-gray-200">
                          <p className="text-sm font-semibold text-gray-700 mb-2">Feedback:</p>
                          <p className="text-sm text-gray-800 leading-relaxed">
                            Your graph shows the LRAS, SRAS, and AD curves with labeled axes, which is good. However, the current equilibrium (Y1, PL1) is not clearly marked at the intersection, and the full-employment output (Yf) label is missing from the LRAS curve. Review the correct answer to see how these elements should be positioned.
                          </p>
                        </div>
                      </div>
                    )}

                    {part.answerType === 'text' && (
                      <div className="mt-4 space-y-4">
                        {/* Student Answer */}
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Your Answer:
                          </label>
                          <div className="bg-white border-2 border-gray-300 rounded-lg p-3">
                            <p className="text-gray-800">
                              {part.label === 'B' ? 'Decrease the interest on reserves (IOR) rate.' : 
                               part.label === 'D' ? 'Increase. The decrease in the policy rate reduces the cost of borrowing, which incentivizes businesses to increase investment spending.' :
                               'Sample student answer'}
                            </p>
                          </div>
                        </div>

                        {/* Score Display */}
                        <div className="rounded-lg p-4 bg-gray-50 border border-gray-200">
                          <p className="text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">
                            AP Exam Score
                          </p>
                          <div className="flex gap-2 mb-2">
                            {[0, 1, 2].slice(0, (part.pointValue || 2) + 1).map((score) => {
                              const isSelected = score === (part.pointValue || 1);
                              let colorClass = '';
                              if (isSelected) {
                                if (score === 0) {
                                  colorClass = 'bg-red-100 border-red-500 text-red-700';
                                } else if (score === 1) {
                                  colorClass = (part.pointValue || 2) === 1 
                                    ? 'bg-green-100 border-green-500 text-green-700'
                                    : 'bg-yellow-100 border-yellow-500 text-yellow-700';
                                } else {
                                  colorClass = 'bg-green-100 border-green-500 text-green-700';
                                }
                              } else {
                                colorClass = 'bg-white border-gray-300 text-gray-500';
                              }
                              
                              return (
                                <div
                                  key={score}
                                  className={`flex-1 py-3 px-4 rounded-lg border-2 font-semibold text-lg ${colorClass}`}
                                >
                                  {score}
                                </div>
                              );
                            })}
                          </div>
                          <p className="text-xs text-gray-600 text-center">
                            {part.pointValue === 1 ? 'Full credit - Meets all criteria' : 'Full credit - Meets all criteria'}
                          </p>
                        </div>

                        {/* Feedback Explanation */}
                        <div className="mt-3 pt-3 border-t border-gray-200">
                          <p className="text-sm font-semibold text-gray-700 mb-2">Feedback:</p>
                          <p className="text-sm text-gray-800 leading-relaxed">
                            {part.label === 'B' ? 'Correct! Decreasing the interest on reserves (IOR) rate is an effective monetary policy tool in an ample reserves system. This encourages banks to lend more, increasing the money supply and stimulating economic activity.' :
                             part.label === 'D' ? 'Correct! When the policy rate decreases, borrowing becomes cheaper, which incentivizes businesses to increase investment spending. This is a key mechanism through which monetary policy affects aggregate demand.' :
                             'Your answer demonstrates good understanding of the concept. Consider providing more specific details to strengthen your response.'}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {/* Show indicator for more parts */}
            {sampleFRQ.parts.length > 2 && (
              <div className="text-center py-4 border-t border-gray-200">
                <p className="text-sm text-gray-500">
                  + {sampleFRQ.parts.length - 2} more part{sampleFRQ.parts.length - 2 !== 1 ? 's' : ''} in full version
                </p>
              </div>
            )}
          </div>

          {/* CTA Button */}
          <div className="bg-gray-50 border-t-2 border-gray-200 px-6 py-4">
            <Button
              onClick={handleFRQClick}
              className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white font-semibold py-6 text-lg rounded-md transition-all"
              size="lg"
            >
              Try FRQ Practice Now
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// Diagnostic Question Preview Component
function DiagnosticQuestionPreview() {
  const router = useRouter();
  
  // First question from diagnostic test
  const firstQuestion = {
    id: '1',
    question: 'If an economy\'s production possibilities frontier becomes steeper as it moves from point A to point B, this indicates that',
    options: [
      'resources are becoming more specialized',
      'the economy is becoming more efficient',
      'opportunity costs are increasing',
      'technology is improving'
    ],
  };

  const handleOptionClick = (optionIndex: number) => {
    // Navigate directly to diagnostic test (no login required)
    router.push(`/diagnostic-test?answer=1&option=${optionIndex}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="mb-16"
    >
      <div className="max-w-5xl mx-auto relative">
        {/* Stacked Paper Effect - Background layers */}
        <div className="absolute inset-0 -z-10 top-2">
          {/* First layer */}
          <div className="absolute top-2 left-2 right-2 bottom-2 bg-white border-4 border-black rounded-3xl opacity-20 transform rotate-1" />
          {/* Second layer */}
          <div className="absolute top-4 left-4 right-4 bottom-4 bg-white border-4 border-black rounded-3xl opacity-10 transform -rotate-1" />
        </div>

        {/* Main Card - Question text and options */}
        <div className="relative bg-white border-4 border-black rounded-3xl shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] p-8 sm:p-12">
          {/* Header - Removed question count */}

          {/* Question Text */}
          <div className="mb-12">
            <h2 className="text-2xl sm:text-3xl font-serif text-gray-900 leading-relaxed text-center sm:text-left">
              {firstQuestion.question}
            </h2>
          </div>

          {/* Options Grid */}
          <div className="space-y-4">
            {firstQuestion.options.map((option, index) => {
              const keyLabel = String.fromCharCode(65 + index); // A, B, C, D

              return (
                <motion.button
                  key={index}
                  onClick={() => handleOptionClick(index)}
                  className="w-full text-left p-6 rounded-xl border-2 border-gray-200 bg-white hover:border-black hover:bg-gray-50 flex items-center gap-4 transition-all duration-200 cursor-pointer"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  {/* Keycap Hint */}
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm border-2 bg-gray-100 text-gray-700 border-gray-300">
                    {keyLabel}
                  </div>

                  {/* Option Text */}
                  <span className="text-lg font-medium flex-1">{option}</span>
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

