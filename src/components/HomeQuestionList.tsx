'use client';

import React, { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Search, Filter, X } from 'lucide-react';
import { allQuestions } from '@/data/unitPracticeProblems/unitPracticeProblems';
import { Question } from '@/data/questionBanks/types';
import { useRouter } from 'next/navigation';

// ── Mobile MCQ scroll: 3 questions visible at a time, auto-advances ──
const MCQ_PAGE_SIZE = 3;
const mcqSlideVariants = {
  enter: (d: number) => ({ opacity: 0, y: d > 0 ? 32 : -32 }),
  center: { opacity: 1, y: 0 },
  exit: (d: number) => ({ opacity: 0, y: d > 0 ? -32 : 32 }),
};

function MobileMCQScroll({
  questions,
  subjectFilter,
  onQuestionClick,
}: {
  questions: Question[];
  subjectFilter: 'ap_macroeconomics' | 'ap_microeconomics';
  onQuestionClick: (q: Question) => void;
}) {
  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState(1);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const totalPages = Math.max(1, Math.ceil(questions.length / MCQ_PAGE_SIZE));
  const pageQuestions = questions.slice(page * MCQ_PAGE_SIZE, (page + 1) * MCQ_PAGE_SIZE);

  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setDirection(1);
      setPage((p) => (p + 1) % totalPages);
    }, 2800);
  };

  useEffect(() => {
    startTimer();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalPages]);

  // Reset when questions change (filter change)
  useEffect(() => {
    setPage(0);
    setDirection(1);
  }, [questions]);

  const goTo = (index: number) => {
    setDirection(index > page ? 1 : -1);
    setPage(index);
    startTimer();
  };

  if (questions.length === 0) {
    return (
      <div className="bg-white border-4 border-black rounded-3xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-8 text-center">
        <p className="text-gray-700 font-bold">No questions found matching your filters.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="relative overflow-hidden" style={{ minHeight: '268px' }}>
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={page}
            custom={direction}
            variants={mcqSlideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-3"
          >
            {pageQuestions.map((question) => (
              <button
                key={question.id}
                onClick={() => onQuestionClick(question)}
                className={`w-full bg-white border-4 border-black rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-4 text-left flex items-start gap-3 group hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all`}
              >
                <span className={`flex-shrink-0 px-2.5 py-1 rounded-full text-xs font-black border-2 border-black leading-none mt-0.5 ${
                  subjectFilter === 'ap_macroeconomics' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                }`}>
                  U{question.unit}
                </span>
                <p className="text-sm font-semibold text-gray-900 line-clamp-2 flex-1 leading-snug">
                  {question.question}
                </p>
                <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5 group-hover:text-gray-700 transition-colors" />
              </button>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dot pagination */}
      <div className="flex justify-center gap-1.5 mt-5">
        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${i === page ? 'w-5 bg-gray-900' : 'w-1.5 bg-gray-300'}`}
            aria-label={`Page ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

// Question List Component
export function QuestionListSection() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [unitFilter, setUnitFilter] = useState<number | null>(null);
  const [subjectFilter, setSubjectFilter] = useState<'ap_macroeconomics' | 'ap_microeconomics'>('ap_macroeconomics');

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
    const courseType = subjectFilter === 'ap_macroeconomics' ? 'macro' : 'micro';
    router.push(`/purchase/season-pass?courseType=${courseType}`);
  };

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
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
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 mb-5 text-center">
            The Ultimate <span className="text-blue-500">MCQ</span> Question Vault.
          </h2>
          <p className="text-xl text-gray-600 text-center max-w-3xl mx-auto">
            Filter by Unit. Aligned with the 2026 CED. Designed to mimic the real exam.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white border-4 border-black rounded-3xl shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] p-6 sm:p-8 mb-10"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by question text or unit..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border-2 border-black rounded-xl font-bold focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white transition-all"
              />
            </div>

            {/* Unit Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={unitFilter || ''}
                onChange={(e) => setUnitFilter(e.target.value ? parseInt(e.target.value) : null)}
                className="w-full pl-10 pr-4 py-3 border-2 border-black rounded-xl font-bold focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white transition-all"
              >
                <option value="">All Units</option>
                {uniqueUnits.map(unit => (
                  <option key={unit} value={unit}>Unit {unit}</option>
                ))}
              </select>
            </div>

            {/* Subject Toggle */}
            <div className="flex items-center gap-3">
              <span className="text-sm font-black text-gray-900">Subject</span>
              <div className="flex border-2 border-black rounded-xl overflow-hidden bg-white">
                <button
                  onClick={() => {
                    setSubjectFilter('ap_macroeconomics');
                    setUnitFilter(null);
                  }}
                  className={`px-5 py-3 font-black transition-all ${
                    subjectFilter === 'ap_macroeconomics'
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  Macro
                </button>
                <button
                  onClick={() => {
                    setSubjectFilter('ap_microeconomics');
                    setUnitFilter(null);
                  }}
                  className={`px-5 py-3 font-black transition-all border-l-2 border-black ${
                    subjectFilter === 'ap_microeconomics'
                      ? 'bg-green-600 text-white'
                      : 'bg-white text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  Micro
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Mobile: 3-at-a-time auto-scrolling view */}
        <div className="sm:hidden">
          <MobileMCQScroll
            questions={filteredQuestions}
            subjectFilter={subjectFilter}
            onQuestionClick={handleQuestionClick}
          />
        </div>

        {/* Desktop: full question list */}
        <div className="hidden sm:block space-y-5">
          {filteredQuestions.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white border-4 border-black rounded-3xl shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] p-12 text-center"
            >
              <p className="text-gray-700 font-bold text-lg">No questions found matching your filters.</p>
            </motion.div>
          ) : (
            filteredQuestions.map((question, index) => (
              <motion.div
                key={`${question.id}-${index}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: index * 0.03 }}
              >
                <motion.button
                  onClick={() => handleQuestionClick(question)}
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-white border-4 border-black rounded-3xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[9px_9px_0px_0px_rgba(0,0,0,1)] p-6 text-left transition-all duration-200 group"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-3">
                        <span className={`px-3 py-1.5 rounded-full text-xs font-black uppercase tracking-wider border-2 border-black ${
                          subjectFilter === 'ap_macroeconomics'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-green-100 text-green-800'
                        }`}>
                          Unit {question.unit}
                        </span>
                        <span className="px-3 py-1.5 bg-gray-100 text-gray-900 rounded-full text-xs font-black uppercase tracking-wider border-2 border-black">
                          {question.unitName}
                        </span>
                      </div>
                      <p className="text-gray-900 font-medium text-base sm:text-lg leading-relaxed group-hover:text-gray-700 transition-colors">
                        {truncateText(question.question, 200)}
                      </p>
                    </div>
                    <div className="flex-shrink-0 flex items-center">
                      <div className="w-10 h-10 rounded-full bg-white border-2 border-black flex items-center justify-center group-hover:bg-gray-50 transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                        <ChevronRight className="w-5 h-5 text-gray-900" />
                      </div>
                    </div>
                  </div>
                </motion.button>
              </motion.div>
            ))
          )}
        </div>
      </div>

    </div>
  );
}
