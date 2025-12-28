'use client';

import { DiagnosticTest } from '@/components/DiagnosticTest';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuthContext } from '@/contexts/AuthContext';
import { useEffect, useMemo, useState, Suspense } from 'react';
import { Loader2 } from 'lucide-react';

// 5-Question Placement Test - High-signal questions covering range of difficulty
// 1 Easy, 2 Medium, 1 Hard, 1 Very Hard
const MACRO_PLACEMENT_QUESTIONS = [
  {
    id: '1',
    question: 'If an economy\'s production possibilities frontier becomes steeper as it moves from point A to point B, this indicates that',
    options: [
      'resources are becoming more specialized',
      'the economy is becoming more efficient',
      'opportunity costs are increasing',
      'technology is improving'
    ],
    correctAnswer: 2, // Index of correct answer (C)
    unit: 'Unit 1: Basic Economic Concepts',
  },
  {
    id: '2',
    question: 'Which measurement would most accurately reflect improvements in a country\'s standard of living over a 10-year period?',
    options: [
      'Real GDP per capita',
      'Nominal GDP growth rate',
      'Total population growth',
      'Aggregate consumer spending'
    ],
    correctAnswer: 0, // Index of correct answer (A)
    unit: 'Unit 2: Economic Indicators',
  },
  {
    id: '3',
    question: 'In an economy with a marginal propensity to consume of 0.8, if businesses increase investment spending by $50 billion, what is the maximum possible increase in equilibrium GDP, assuming no crowding out?',
    options: [
      '$40 billion',
      '$100 billion',
      '$200 billion',
      '$250 billion'
    ],
    correctAnswer: 3, // Index of correct answer (D)
    unit: 'Unit 3: National Income and Price Determination',
  },
  {
    id: '4',
    question: 'Which of the following would cause an increase in the supply of gasoline?',
    options: [
      'An increase in the price of crude oil',
      'A decrease in the number of gasoline refineries',
      'An improvement in refining technology',
      'An increase in consumer demand for gasoline'
    ],
    correctAnswer: 2, // Index of correct answer (C)
    unit: 'Unit 2: Supply and Demand',
  },
  {
    id: '5',
    question: 'If the Federal Reserve increases the money supply, which of the following is most likely to occur in the short run?',
    options: [
      'Interest rates will increase',
      'The price level will decrease',
      'Unemployment will increase',
      'Aggregate demand will increase'
    ],
    correctAnswer: 3, // Index of correct answer (D)
    unit: 'Unit 4: Financial Sector',
  },
]; // 5 questions for macro placement test

const MICRO_PLACEMENT_QUESTIONS = [
  {
    id: '1',
    question: 'If the price of a good increases and the quantity demanded decreases, this demonstrates',
    options: [
      'the law of supply',
      'the law of demand',
      'a change in supply',
      'a change in demand'
    ],
    correctAnswer: 1, // Index of correct answer (B)
    unit: 'Unit 1: Basic Economic Concepts',
  },
  {
    id: '2',
    question: 'In a perfectly competitive market, a firm will maximize profit by producing where',
    options: [
      'price equals average total cost',
      'marginal revenue equals marginal cost',
      'total revenue equals total cost',
      'price equals average variable cost'
    ],
    correctAnswer: 1, // Index of correct answer (B)
    unit: 'Unit 3: Production, Cost, and the Perfect Competition Model',
  },
  {
    id: '3',
    question: 'Which of the following would cause the demand curve for coffee to shift to the right?',
    options: [
      'A decrease in the price of coffee',
      'An increase in the price of tea (a substitute)',
      'A decrease in consumer income',
      'An increase in the price of coffee beans'
    ],
    correctAnswer: 1, // Index of correct answer (B)
    unit: 'Unit 2: Supply and Demand',
  },
  {
    id: '4',
    question: 'A monopolistically competitive firm will produce where',
    options: [
      'price equals marginal cost',
      'marginal revenue equals marginal cost',
      'price equals average total cost',
      'total revenue is maximized'
    ],
    correctAnswer: 1, // Index of correct answer (B)
    unit: 'Unit 4: Imperfect Competition',
  },
  {
    id: '5',
    question: 'In a factor market, if the wage rate increases, what happens to the quantity of labor supplied?',
    options: [
      'It decreases',
      'It increases',
      'It remains constant',
      'It depends on the elasticity of supply'
    ],
    correctAnswer: 1, // Index of correct answer (B)
    unit: 'Unit 5: Factor Markets',
  },
]; // 5 questions for micro placement test

function DiagnosticTestContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, loading } = useAuthContext();
  const [subject, setSubject] = useState<'macro' | 'micro'>('macro');

  // Get questions based on selected subject
  const questions = subject === 'macro' ? MACRO_PLACEMENT_QUESTIONS : MICRO_PLACEMENT_QUESTIONS;

  // Read initial answer from URL params
  const initialAnswers = useMemo(() => {
    const answerQuestionId = searchParams.get('answer');
    const answerOption = searchParams.get('option');
    
    if (answerQuestionId && answerOption !== null) {
      const optionIndex = parseInt(answerOption);
      if (!isNaN(optionIndex) && optionIndex >= 0 && optionIndex < 4) {
        return {
          [answerQuestionId]: optionIndex
        };
      }
    }
    return {};
  }, [searchParams]);

  const handleComplete = (answers: Record<string, number>) => {
    // Handle test completion - you can add logic here to save results, show results page, etc.
    console.log('Test completed with answers:', answers);
    // Don't redirect immediately - let the results screen show first
    // The "Claim Rank" button will handle the redirect
  };

  const handleSubjectToggle = () => {
    setSubject(subject === 'macro' ? 'micro' : 'macro');
  };

  return (
    <DiagnosticTest 
      questions={questions} 
      onComplete={handleComplete} 
      initialAnswers={initialAnswers} 
      user={user}
      onSubjectToggle={handleSubjectToggle}
      currentSubject={subject}
    />
  );
}

export default function DiagnosticTestPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-gray-600" />
      </div>
    }>
      <DiagnosticTestContent />
    </Suspense>
  );
}

