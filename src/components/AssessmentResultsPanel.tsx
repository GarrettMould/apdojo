import dojoIcon from "../../public/images/dojoIcon.png"
import { Question } from '@/data/questionBanks/types';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

interface QuestionSummary {
  id: number;
  unit: number;
  unitName: string;
  correctAnswer: string;
}

interface UnitPerformance {
  unit: number;
  unitName: string;
  correct: number;
  total: number;
  percentage: number;
}

interface AssessmentResultsPanelProps {
  totalQuestions: number;
  correctAnswers: number;
  questions: Question[];
  answers: Record<number, string>;
  examType: 'micro' | 'macro';
  onSeeFullResults?: () => void;
  customTitle?: string | null;
}

export function AssessmentResultsPanel({ 
  totalQuestions, 
  correctAnswers, 
  questions,
  answers,
  examType,
  onSeeFullResults,
  customTitle
}: AssessmentResultsPanelProps) {
  const percentage = Math.round((correctAnswers / totalQuestions) * 100);

  // Calculate XP using dojo drill rules: 20 for completion + 10 per correct answer
  const xpEarned = 20 + (correctAnswers * 10);
  const maxXp = 20 + (totalQuestions * 10);

  // Calculate performance for each unit
  const getUnitPerformance = (): UnitPerformance[] => {
    const unitStats = new Map<number, UnitPerformance>();

    questions.forEach(question => {
      const existing = unitStats.get(question.unit) || {
        unit: question.unit,
        unitName: question.unitName,
        correct: 0,
        total: 0,
        percentage: 0
      };

      existing.total += 1;
      if (answers[question.id] === question.correctAnswer) {
        existing.correct += 1;
      }
      existing.percentage = Math.round((existing.correct / existing.total) * 100);

      unitStats.set(question.unit, existing);
    });

    return Array.from(unitStats.values());
  };

  const unitPerformance = getUnitPerformance();
  const sortedUnits = [...unitPerformance].sort((a, b) => a.percentage - b.percentage);
  
  const weakestUnits = sortedUnits.slice(0, 2);
  const strongestUnits = sortedUnits.slice(-2);

  return (
    <motion.div 
      className="bg-white border border-gray-200 rounded-2xl shadow-lg p-8"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 200, damping: 25 }}
    >
      {/* New Header Section */}
      <motion.div 
        className="flex items-center gap-3 mb-6"
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 25, delay: 0.05 }}
      >
        <img src={dojoIcon.src} alt="AP Dojo Logo" className="w-8 h-8" />
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">
          {customTitle ? customTitle : 'AP Dojo Exam Feedback'}
        </h1>
      </motion.div>

        {/* Overall Score */}
        <div className="flex flex-col space-y-6">
          <motion.div 
            className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 25, delay: 0.1 }}
          >
            <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
              <h2 className="font-semibold text-gray-900">Assessment Results</h2>
            </div>
            <div className="p-4 bg-white">
              <div className="flex items-center gap-6 flex-wrap">
                <motion.div 
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold text-lg shadow-sm"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 25, delay: 0.15 }}
                >
                  Score: {percentage}%
                </motion.div>
                <motion.div 
                  className="text-gray-900 font-semibold"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 25, delay: 0.2 }}
                >
                  {correctAnswers} correct out of {totalQuestions}
                </motion.div>
                <motion.div 
                  className="bg-green-500 text-white px-4 py-2 rounded-lg font-semibold text-lg flex items-center gap-2 shadow-sm"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 25, delay: 0.25 }}
                >
                  <span className="inline-flex items-center">
                    <Image
                      src="/images/flame100.png"
                      alt="XP Flame"
                      width={20}
                      height={20}
                      className="w-5 h-5"
                    />
                  </span>
                  <span>{xpEarned} XP</span>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Unit Analysis */}
          <motion.div 
            className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 25, delay: 0.3 }}
          >
            <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
              <h3 className="font-semibold text-gray-900">Performance by Unit</h3>
            </div>
            <div className="p-4 bg-white">
              <div className="grid md:grid-cols-2 gap-4">
                {/* Areas for Improvement */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900">Areas for Improvement</h4>
                  {weakestUnits.map((unit, index) => (
                    <motion.div 
                      key={unit.unit} 
                      className="bg-white border border-gray-200 rounded-lg p-4 h-[108px] shadow-sm"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ type: "spring", stiffness: 200, damping: 25, delay: 0.35 + index * 0.05 }}
                      whileHover={{ scale: 1.01, shadow: "md" }}
                      whileTap={{ scale: 0.99 }}
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center flex-shrink-0 font-semibold">
                          {unit.unit}
                        </div>
                        <div className="min-w-0">
                          <div className="font-medium text-gray-900 line-clamp-2">{unit.unitName}</div>
                          <div className="text-sm text-gray-700 font-medium mt-1">
                            Score: {unit.percentage}% ({unit.correct}/{unit.total} correct)
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Strongest Areas */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900">Strongest Areas</h4>
                  {strongestUnits.map((unit, index) => (
                    <motion.div 
                      key={unit.unit} 
                      className="bg-white border border-gray-200 rounded-lg p-4 h-[108px] shadow-sm"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ type: "spring", stiffness: 200, damping: 25, delay: 0.35 + index * 0.05 }}
                      whileHover={{ scale: 1.01, shadow: "md" }}
                      whileTap={{ scale: 0.99 }}
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center flex-shrink-0 font-semibold">
                          {unit.unit}
                        </div>
                        <div className="min-w-0">
                          <div className="font-medium text-gray-900 line-clamp-2">{unit.unitName}</div>
                          <div className="text-sm text-gray-700 font-medium mt-1">
                            Score: {unit.percentage}% ({unit.correct}/{unit.total} correct)
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Study Resources */}
          <motion.div 
            className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 25, delay: 0.5 }}
          >
            <div className="bg-blue-50 px-4 py-3 border-b border-gray-200">
              <h3 className="font-semibold text-gray-900">Recommended Study Resources</h3>
            </div>
            <div className="p-4 bg-white">
              <div className="grid md:grid-cols-2 gap-4">
                {weakestUnits.map((unit, index) => (
                  <motion.div
                    key={unit.unit}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 25, delay: 0.55 + index * 0.05 }}
                    whileHover={{ scale: 1.01, shadow: "md" }}
                    whileTap={{ scale: 0.99 }}
                  >
                    <Link
                      href={`/unit/${unit.unit}`}
                      className="flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-lg hover:bg-blue-50 transition-all shadow-sm"
                    >
                      <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-gray-900">Unit {unit.unit} Study Guide</div>
                        <div className="text-sm text-gray-700 font-medium">{unit.unitName}</div>
                      </div>
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* See Full Results Button */}
          {onSeeFullResults && (
            <motion.div 
              className="mt-8"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 25, delay: 0.7 }}
            >
              <motion.button
                onClick={onSeeFullResults}
                className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold rounded-lg shadow-sm transition-all"
                whileHover={{ scale: 1.01, shadow: "md" }}
                whileTap={{ scale: 0.99 }}
              >
                See Full Results
              </motion.button>
            </motion.div>
          )}
      </div>
    </motion.div>
  );
}
