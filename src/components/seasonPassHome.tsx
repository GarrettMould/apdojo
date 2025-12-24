'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, BookOpen, FileText, Target, PlayCircle, Sparkles, Brain, Award, Search, Filter, X } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { allQuestions } from '@/data/unitPracticeProblems/unitPracticeProblems';
import { Question } from '@/data/questionBanks/types';
import { dojoDrills } from '@/data/dojoDrills';
import { frqExams } from '@/data/frqQuestions';
import Image from 'next/image';

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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        {/* Main Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-gray-900 mb-6">
            Stop Guessing.{' '}
            <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              Score a 5 in AP Econ.
            </span>
          </h1>
          <p className="text-xl sm:text-2xl text-gray-600 max-w-3xl mx-auto">
            Get everything you need to master AP Macroeconomics and AP Microeconomics in one comprehensive pass.
          </p>
        </motion.div>

        {/* Season Pass Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* AP Macro Season Pass */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="h-full bg-white rounded-xl shadow-lg border border-gray-100 hover:shadow-2xl transition-shadow duration-300">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-2">
                  <CardTitle className="text-3xl font-extrabold text-gray-900">
                    AP Macro Season Pass
                  </CardTitle>
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                    <span className="text-2xl font-bold text-blue-600">M</span>
                  </div>
                </div>
                <p className="text-gray-600 text-lg">
                  Complete access to all AP Macroeconomics resources
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 mb-6">
                  {macroFeatures.map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                      className="flex items-center gap-3"
                    >
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
                        <Check className="w-4 h-4 text-blue-600" />
                      </div>
                      <span className="text-gray-700 font-medium text-lg">
                        {feature.text}
                      </span>
                    </motion.div>
                  ))}
                </div>
                <Button
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-6 text-lg rounded-md transition-colors"
                  size="lg"
                >
                  Get AP Macro Season Pass
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* AP Micro Season Pass */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="h-full bg-white rounded-xl shadow-lg border border-gray-100 hover:shadow-2xl transition-shadow duration-300">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-2">
                  <CardTitle className="text-3xl font-extrabold text-gray-900">
                    AP Micro Season Pass
                  </CardTitle>
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                    <span className="text-2xl font-bold text-green-600">μ</span>
                  </div>
                </div>
                <p className="text-gray-600 text-lg">
                  Complete access to all AP Microeconomics resources
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 mb-6">
                  {microFeatures.map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                      className="flex items-center gap-3"
                    >
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                        <Check className="w-4 h-4 text-green-600" />
                      </div>
                      <span className="text-gray-700 font-medium text-lg">
                        {feature.text}
                      </span>
                    </motion.div>
                  ))}
                </div>
                <Button
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-6 text-lg rounded-md transition-colors"
                  size="lg"
                >
                  Get AP Micro Season Pass
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* Question List Section */}
      <QuestionListSection />

      {/* Dojo Drills Section */}
      <DojoDrillsSection />

      {/* FRQ Practice Preview Section */}
      <FRQPreviewSection />
    </div>
  );
}

// Question List Component
function QuestionListSection() {
  const [searchTerm, setSearchTerm] = useState('');
  const [unitFilter, setUnitFilter] = useState<number | null>(null);
  const [subjectFilter, setSubjectFilter] = useState<'ap_macroeconomics' | 'ap_microeconomics'>('ap_macroeconomics');
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Get unique units for the selected subject
  const uniqueUnits = useMemo(() => {
    const units = new Set(
      allQuestions
        .filter(q => q.subject === subjectFilter)
        .map(q => q.unit)
    );
    return Array.from(units).sort((a, b) => a - b);
  }, [subjectFilter]);

  // Filter questions based on search and filters
  const { filteredQuestions, totalCount } = useMemo(() => {
    const filtered = allQuestions.filter(q => {
      const matchesSearch = searchTerm === '' || 
        q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        q.unitName.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesUnit = unitFilter === null || q.unit === unitFilter;
      
      const matchesSubject = q.subject === subjectFilter;
      
      return matchesSearch && matchesUnit && matchesSubject;
    });
    
    const total = filtered.length;
    // Cap at 20 questions
    const capped = filtered.slice(0, 20);
    
    return { filteredQuestions: capped, totalCount: total };
  }, [searchTerm, unitFilter, subjectFilter]);

  const handleQuestionClick = (question: Question) => {
    setSelectedQuestion(question);
    setIsModalOpen(true);
  };

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
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
            The Ultimate AP Question Vault.
          </h2>
          <p className="text-xl text-gray-600 text-center max-w-3xl mx-auto">
            Filter by Unit. Aligned with the 2026 CED. Designed to mimic the real exam.
          </p>
        </motion.div>

        {/* Filters */}
        <div className="bg-white border-2 border-gray-200 rounded-xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by question text or unit..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Unit Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={unitFilter || ''}
                onChange={(e) => setUnitFilter(e.target.value ? parseInt(e.target.value) : null)}
                className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
              >
                <option value="">All Units</option>
                {uniqueUnits.map(unit => (
                  <option key={unit} value={unit}>Unit {unit}</option>
                ))}
              </select>
            </div>

            {/* Subject Toggle */}
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-gray-700">Subject:</span>
              <div className="flex border-2 border-gray-300 rounded-lg overflow-hidden">
                <button
                  onClick={() => {
                    setSubjectFilter('ap_macroeconomics');
                    setUnitFilter(null);
                  }}
                  className={`px-4 py-3 font-semibold transition-colors ${
                    subjectFilter === 'ap_macroeconomics'
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Macro
                </button>
                <button
                  onClick={() => {
                    setSubjectFilter('ap_microeconomics');
                    setUnitFilter(null);
                  }}
                  className={`px-4 py-3 font-semibold transition-colors border-l-2 border-gray-300 ${
                    subjectFilter === 'ap_microeconomics'
                      ? 'bg-green-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Micro
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Questions Table */}
        <div className="bg-white border-2 border-gray-200 rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b-2 border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left font-bold text-gray-900">Unit</th>
                  <th className="px-6 py-4 text-left font-bold text-gray-900">Question Text</th>
                  <th className="px-6 py-4 text-left font-bold text-gray-900">Unit Name</th>
                </tr>
              </thead>
              <tbody>
                {filteredQuestions.map((question, index) => (
                  <tr
                    key={`${question.id}-${index}`}
                    className="border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer"
                    onClick={() => handleQuestionClick(question)}
                  >
                    <td className="px-6 py-4 font-semibold text-gray-900">
                      Unit {question.unit}
                    </td>
                    <td className="px-6 py-4 text-gray-700 max-w-2xl">
                      {truncateText(question.question, 150)}
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-semibold rounded-full">
                        {question.unitName}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredQuestions.length === 0 && (
            <div className="p-12 text-center">
              <p className="text-gray-500 font-semibold text-lg">No questions found matching your filters.</p>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="mt-6 text-center">
          <p className="text-gray-600 font-medium">
            Showing {filteredQuestions.length} question{filteredQuestions.length !== 1 ? 's' : ''}
            {totalCount > 20 && ` of ${totalCount} total`}
          </p>
        </div>
      </div>

      {/* Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-extrabold text-gray-900">
              AP Dojo Season Pass
            </DialogTitle>
            <DialogDescription className="text-base text-gray-600 mt-2">
              We'll fill this in later
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4">
            <Button
              onClick={() => setIsModalOpen(false)}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
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
    // Navigate to dojo drills page with the selected drill
    window.location.href = `/dojo-drills?drill=${drillId}`;
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
            Master the Hardest Topics with Interactive Drills
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
          <div className="relative" style={{ minHeight: `${drills.length * 200 + 100}px` }}>
            {/* SVG Path connecting all drills - positioned absolutely behind cards */}
            <svg
              className="absolute top-0 left-0 w-full h-full pointer-events-none z-0"
              style={{ height: '100%', minHeight: `${drills.length * 200 + 100}px` }}
            >
              <defs>
                <marker
                  id="arrowhead"
                  markerWidth="12"
                  markerHeight="12"
                  refX="10"
                  refY="4"
                  orient="auto"
                >
                  <polygon points="0 0, 12 4, 0 8" fill="black" />
                </marker>
              </defs>
              <path
                d={(() => {
                  let path = '';
                  const cardHeight = 200; // Approximate height of each card + spacing
                  const startY = 100; // Starting Y position
                  
                  drills.forEach((drill, index) => {
                    const isEven = index % 2 === 0;
                    // Position: left cards at ~10% from left, right cards at ~90% from left
                    // On mobile, cards are centered, so we'll adjust
                    const xPercent = isEven ? 10 : 90;
                    const y = startY + (index * cardHeight);
                    
                    if (index === 0) {
                      path = `M ${xPercent}% ${y}`;
                    } else {
                      // Create a smooth weaving path
                      const prevIsEven = (index - 1) % 2 === 0;
                      const prevXPercent = prevIsEven ? 10 : 90;
                      const prevY = startY + ((index - 1) * cardHeight);
                      
                      // Control points for smooth curve
                      const midXPercent = 50; // Middle of the screen
                      const midY = (prevY + y) / 2;
                      
                      // Create a smooth S-curve connecting the points
                      path += ` C ${prevXPercent}% ${prevY + 40} ${midXPercent}% ${midY - 20} ${midXPercent}% ${midY} C ${midXPercent}% ${midY + 20} ${xPercent}% ${y - 40} ${xPercent}% ${y}`;
                    }
                  });
                  return path;
                })()}
                stroke="black"
                strokeWidth="6"
                fill="none"
                strokeDasharray="30 20"
                markerEnd="url(#arrowhead)"
                className="opacity-90"
                vectorEffect="non-scaling-stroke"
              />
            </svg>

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
                        <div
                          className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-md ${
                            drill.subject === 'ap_macroeconomics'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-green-100 text-green-800'
                          }`}
                        >
                          {getSubjectLabel(drill.subject)} - Unit {drill.unit}
                        </div>
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

