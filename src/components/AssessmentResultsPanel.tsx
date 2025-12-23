import dojoIcon from "../../public/images/dojoIcon.png"
import { Question } from '@/data/questionBanks/types';
import { motion } from 'framer-motion';

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
      className="bg-white border-4 border-black rounded-3xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      {/* New Header Section */}
      <motion.div 
        className="flex items-center gap-3 mb-6"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30, delay: 0.1 }}
      >
        <img src={dojoIcon.src} alt="AP Dojo Logo" className="w-8 h-8" />
        <h1 className="text-2xl font-black tracking-tight text-black">
          {customTitle ? customTitle : 'AP Dojo Exam Feedback'}
        </h1>
      </motion.div>

      {/* Overall Score */}
      <div className="flex flex-col space-y-6">
        <motion.div 
          className="bg-white border-4 border-black rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] overflow-hidden"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 30, delay: 0.2 }}
        >
          <div className="bg-gray-100 px-4 py-3 border-b-4 border-black">
            <h2 className="font-black text-black">Assessment Results</h2>
          </div>
          <div className="p-4 bg-white">
            <div className="flex items-center gap-6 flex-wrap">
              <motion.div 
                className="bg-blue-600 text-white px-4 py-2 rounded-lg border-2 border-black font-black text-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 30, delay: 0.3 }}
              >
                Score: {percentage}%
              </motion.div>
              <motion.div 
                className="text-black font-black"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 30, delay: 0.35 }}
              >
                {correctAnswers} correct out of {totalQuestions}
              </motion.div>
              <motion.div 
                className="bg-green-500 text-white px-4 py-2 rounded-lg border-2 border-black font-black text-lg flex items-center gap-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 30, delay: 0.4 }}
              >
                <span>⚡</span>
                <span>{xpEarned} XP</span>
                <span className="text-white/80 text-sm font-normal">/ {maxXp} max</span>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Unit Analysis */}
        <motion.div 
          className="bg-white border-4 border-black rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30, delay: 0.5 }}
        >
          <div className="bg-gray-100 px-4 py-3 border-b-4 border-black">
            <h3 className="font-black text-black">Performance by Unit</h3>
          </div>
          <div className="p-4 bg-white">
            <div className="grid md:grid-cols-2 gap-4">
              {/* Areas for Improvement */}
              <div className="space-y-3">
                <h4 className="font-black text-black">Areas for Improvement</h4>
                {weakestUnits.map((unit, index) => (
                  <motion.div 
                    key={unit.unit} 
                    className="bg-white border-2 border-black rounded-xl p-4 h-[108px] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30, delay: 0.6 + index * 0.1 }}
                    whileHover={{ scale: 1.02, boxShadow: "4px_4px_0px_0px_rgba(0,0,0,1)" }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center flex-shrink-0 font-black border-2 border-black">
                        {unit.unit}
                      </div>
                      <div className="min-w-0">
                        <div className="font-bold text-black line-clamp-2">{unit.unitName}</div>
                        <div className="text-sm text-black font-semibold mt-1">
                          Score: {unit.percentage}% ({unit.correct}/{unit.total} correct)
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Strongest Areas */}
              <div className="space-y-3">
                <h4 className="font-black text-black">Strongest Areas</h4>
                {strongestUnits.map((unit, index) => (
                  <motion.div 
                    key={unit.unit} 
                    className="bg-white border-2 border-black rounded-xl p-4 h-[108px] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30, delay: 0.6 + index * 0.1 }}
                    whileHover={{ scale: 1.02, boxShadow: "4px_4px_0px_0px_rgba(0,0,0,1)" }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center flex-shrink-0 font-black border-2 border-black">
                        {unit.unit}
                      </div>
                      <div className="min-w-0">
                        <div className="font-bold text-black line-clamp-2">{unit.unitName}</div>
                        <div className="text-sm text-black font-semibold mt-1">
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
          className="bg-white border-4 border-black rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30, delay: 0.8 }}
        >
          <div className="bg-blue-100 px-4 py-3 border-b-4 border-black">
            <h3 className="font-black text-black">Recommended Study Resources</h3>
          </div>
          <div className="p-4 bg-white">
            <div className="grid md:grid-cols-2 gap-4">
              {weakestUnits.map((unit, index) => (
                <motion.a
                  key={unit.unit}
                  href={`/unit-study-guides`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 bg-white border-2 border-black rounded-xl hover:bg-blue-50 transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30, delay: 0.9 + index * 0.1 }}
                  whileHover={{ scale: 1.05, boxShadow: "4px_4px_0px_0px_rgba(0,0,0,1)", y: -2 }}
                  whileTap={{ scale: 0.98, y: 0 }}
                >
                  <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center border-2 border-black font-black">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="font-black text-black">Unit {unit.unit} Study Guide</div>
                    <div className="text-sm text-black font-semibold">{unit.unitName}</div>
                  </div>
                  <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* See Full Results Button */}
        {onSeeFullResults && (
          <motion.div 
            className="mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30, delay: 1.1 }}
          >
            <motion.button
              onClick={onSeeFullResults}
              className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white text-lg font-black rounded-xl border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all"
              whileHover={{ scale: 1.02, boxShadow: "6px_6px_0px_0px_rgba(0,0,0,1)", y: -2 }}
              whileTap={{ scale: 0.98, y: 0, boxShadow: "2px_2px_0px_0px_rgba(0,0,0,1)" }}
            >
              See Full Results
            </motion.button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
