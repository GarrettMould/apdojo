'use client';

import { DiagnosticTest } from '@/components/DiagnosticTest';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuthContext } from '@/contexts/AuthContext';
import { useEffect, useMemo } from 'react';
import { Loader2 } from 'lucide-react';

// 5-Question Placement Test - High-signal questions covering range of difficulty
// 1 Easy, 2 Medium, 1 Hard, 1 Very Hard
const PLACEMENT_QUESTIONS = [
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
]; // 5 questions for placement test

export default function DiagnosticTestPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, loading } = useAuthContext();

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

  return <DiagnosticTest questions={PLACEMENT_QUESTIONS} onComplete={handleComplete} initialAnswers={initialAnswers} user={user} />;
}

