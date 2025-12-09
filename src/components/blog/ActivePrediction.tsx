'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ReactNode } from 'react';

interface Metric {
  id: string;
  label: string;
  correctOption: 'increase' | 'decrease' | 'no-change';
}

interface ActivePredictionProps {
  title: string;
  introText: string;
  metrics: Metric[];
  explanation: ReactNode;
}

type SelectedOption = 'increase' | 'decrease' | 'no-change' | null;

export function ActivePrediction({
  title,
  introText,
  metrics,
  explanation,
}: ActivePredictionProps) {
  const [selections, setSelections] = useState<Record<string, SelectedOption>>({});
  const [hasChecked, setHasChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [showAsText, setShowAsText] = useState(false);

  const handleSelect = (metricId: string, option: SelectedOption) => {
    if (hasChecked && isCorrect) return; // Prevent changes after correct answer
    setSelections((prev) => ({
      ...prev,
      [metricId]: option,
    }));
  };

  const handleCheckAnswers = () => {
    setHasChecked(true);
    
    // Check if all metrics have selections
    const allSelected = metrics.every((metric) => selections[metric.id] !== null && selections[metric.id] !== undefined);
    
    if (!allSelected) {
      setIsCorrect(false);
      return;
    }

    // Check if all selections are correct
    const allCorrect = metrics.every(
      (metric) => selections[metric.id] === metric.correctOption
    );

    setIsCorrect(allCorrect);
    
    if (allCorrect) {
      setShowExplanation(true);
      // After a short delay, transform to text format
      setTimeout(() => {
        setShowAsText(true);
      }, 1500);
    }
  };

  const getButtonClass = (
    metricId: string,
    option: SelectedOption,
    isSelected: boolean
  ) => {
    const baseClass = 'px-4 py-2 rounded-md font-medium transition-all duration-200 border-2';
    
    if (!hasChecked) {
      return `${baseClass} ${
        isSelected
          ? 'bg-blue-600 text-white border-blue-600 shadow-md'
          : 'bg-white text-slate-700 border-slate-300 hover:border-blue-400 hover:bg-blue-50'
      }`;
    }

    // After checking
    if (isCorrect) {
      return `${baseClass} ${
        isSelected
          ? 'bg-green-600 text-white border-green-600'
          : 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed'
      }`;
    }

    // Wrong answer
    const isCorrectOption = metrics.find((m) => m.id === metricId)?.correctOption === option;
    if (isCorrectOption) {
      return `${baseClass} bg-green-600 text-white border-green-600`;
    }
    if (isSelected && !isCorrectOption) {
      return `${baseClass} bg-red-500 text-white border-red-500`;
    }
    return `${baseClass} bg-slate-100 text-slate-400 border-slate-200`;
  };

  // Format option for display
  const formatOption = (option: 'increase' | 'decrease' | 'no-change') => {
    switch (option) {
      case 'increase':
        return 'Increases (↑)';
      case 'decrease':
        return 'Decreases (↓)';
      case 'no-change':
        return 'No Change (→)';
    }
  };

  // If completed and should show as text, render as blog post content
  if (showAsText && isCorrect) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="my-6"
      >
        <ul className="mb-6">
          {metrics.map((metric) => (
            <li key={metric.id} className="mb-2">
              <strong>{metric.label}:</strong> {formatOption(metric.correctOption)}
            </li>
          ))}
        </ul>
        <div className="mb-6">
          {explanation}
        </div>
      </motion.div>
    );
  }

  return (
    <div className="my-8 p-6 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
      <h3 className="text-2xl font-bold text-slate-900 mb-3">{title}</h3>
      <p className="text-slate-700 mb-6">{introText}</p>

      <div className="space-y-4 mb-6">
        {metrics.map((metric) => {
          const selected = selections[metric.id];
          return (
            <div
              key={metric.id}
              className="flex items-center justify-between p-4 bg-white rounded-lg border border-slate-200 shadow-sm"
            >
              <span className="font-semibold text-slate-800 flex-1">
                {metric.label}:
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => handleSelect(metric.id, 'increase')}
                  disabled={hasChecked && isCorrect}
                  className={getButtonClass(metric.id, 'increase', selected === 'increase')}
                >
                  Increase
                </button>
                <button
                  onClick={() => handleSelect(metric.id, 'decrease')}
                  disabled={hasChecked && isCorrect}
                  className={getButtonClass(metric.id, 'decrease', selected === 'decrease')}
                >
                  Decrease
                </button>
                <button
                  onClick={() => handleSelect(metric.id, 'no-change')}
                  disabled={hasChecked && isCorrect}
                  className={getButtonClass(metric.id, 'no-change', selected === 'no-change')}
                >
                  No Change
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <button
        onClick={handleCheckAnswers}
        disabled={hasChecked && isCorrect}
        className={`w-full py-3 px-6 rounded-md font-semibold transition-all duration-200 ${
          hasChecked && isCorrect
            ? 'bg-green-600 text-white cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg'
        }`}
      >
        {hasChecked && isCorrect ? '✓ All Correct!' : 'Check Answers'}
      </button>

      <AnimatePresence>
        {hasChecked && !isCorrect && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg"
          >
            <p className="text-red-800 font-medium">
              Not quite right. Review the options and try again!
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showExplanation && !showAsText && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-6 p-5 bg-green-50 border border-green-200 rounded-lg"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {explanation}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

