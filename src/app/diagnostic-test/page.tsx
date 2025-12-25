'use client';

import { DiagnosticTest } from '@/components/DiagnosticTest';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '@/contexts/AuthContext';
import { useEffect } from 'react';
import { Loader2 } from 'lucide-react';

// Sample diagnostic questions - you can replace these with actual questions from your data
// For testing: only showing 1 question
const diagnosticQuestions = [
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
  },
  {
    id: '6',
    question: 'A perfectly competitive firm will maximize profit by producing the quantity where',
    options: [
      'price equals average total cost',
      'marginal revenue equals marginal cost',
      'price equals marginal cost',
      'total revenue equals total cost'
    ],
    correctAnswer: 1, // Index of correct answer (B)
  },
  {
    id: '7',
    question: 'Which of the following is a characteristic of a public good?',
    options: [
      'Rivalry in consumption',
      'Excludability',
      'Non-rivalry and non-excludability',
      'Private provision'
    ],
    correctAnswer: 2, // Index of correct answer (C)
  },
  {
    id: '8',
    question: 'If the government imposes a price ceiling below the equilibrium price, which of the following will occur?',
    options: [
      'A surplus will develop',
      'A shortage will develop',
      'The equilibrium price will increase',
      'The quantity supplied will increase'
    ],
    correctAnswer: 1, // Index of correct answer (B)
  },
  {
    id: '9',
    question: 'The multiplier effect occurs because',
    options: [
      'government spending directly increases GDP',
      'an initial change in spending leads to further changes in income and spending',
      'taxes automatically adjust to changes in income',
      'the money supply increases with government spending'
    ],
    correctAnswer: 1, // Index of correct answer (B)
  },
  {
    id: '10',
    question: 'Which of the following would shift the aggregate demand curve to the right?',
    options: [
      'An increase in taxes',
      'A decrease in government spending',
      'An increase in consumer confidence',
      'A decrease in the money supply'
    ],
    correctAnswer: 2, // Index of correct answer (C)
  },
  {
    id: '11',
    question: 'In the long run, a perfectly competitive firm will earn',
    options: [
      'positive economic profit',
      'negative economic profit',
      'zero economic profit',
      'profit equal to total revenue'
    ],
    correctAnswer: 2, // Index of correct answer (C)
  },
  {
    id: '12',
    question: 'Which of the following is included in GDP?',
    options: [
      'The sale of a used car',
      'Government transfer payments',
      'The purchase of a new house',
      'Stock market transactions'
    ],
    correctAnswer: 2, // Index of correct answer (C)
  },
  {
    id: '13',
    question: 'If the marginal propensity to save is 0.25, the spending multiplier is',
    options: [
      '0.25',
      '1.33',
      '4',
      '5'
    ],
    correctAnswer: 2, // Index of correct answer (C)
  },
  {
    id: '14',
    question: 'A monopolist will produce where',
    options: [
      'price equals marginal cost',
      'marginal revenue equals marginal cost',
      'price equals average total cost',
      'total revenue is maximized'
    ],
    correctAnswer: 1, // Index of correct answer (B)
  },
  {
    id: '15',
    question: 'Which of the following would cause the aggregate supply curve to shift to the left?',
    options: [
      'An increase in productivity',
      'A decrease in input prices',
      'An increase in the price level',
      'An increase in resource costs'
    ],
    correctAnswer: 3, // Index of correct answer (D)
  },
  {
    id: '16',
    question: 'The opportunity cost of attending college includes',
    options: [
      'only tuition and fees',
      'tuition, fees, and room and board',
      'tuition, fees, and the value of the best alternative use of your time',
      'only the value of the best alternative use of your time'
    ],
    correctAnswer: 2, // Index of correct answer (C)
  },
  {
    id: '17',
    question: 'If the economy is experiencing inflation, the Federal Reserve would most likely',
    options: [
      'decrease the discount rate',
      'buy government securities',
      'increase the reserve requirement',
      'decrease taxes'
    ],
    correctAnswer: 2, // Index of correct answer (C)
  },
  {
    id: '18',
    question: 'Which of the following is a characteristic of a monopoly?',
    options: [
      'Many sellers',
      'Homogeneous products',
      'Barriers to entry',
      'Perfect information'
    ],
    correctAnswer: 2, // Index of correct answer (C)
  },
  {
    id: '19',
    question: 'The natural rate of unemployment includes',
    options: [
      'only frictional unemployment',
      'only structural unemployment',
      'frictional and structural unemployment',
      'frictional, structural, and cyclical unemployment'
    ],
    correctAnswer: 2, // Index of correct answer (C)
  },
  {
    id: '20',
    question: 'If the cross-price elasticity of demand between two goods is positive, the goods are',
    options: [
      'complements',
      'substitutes',
      'normal goods',
      'inferior goods'
    ],
    correctAnswer: 1, // Index of correct answer (B)
  },
].slice(0, 1); // Only show 1 question for testing

export default function DiagnosticTestPage() {
  const router = useRouter();
  const { user, loading } = useAuthContext();

  // Require login to access diagnostic test
  useEffect(() => {
    if (!loading && !user) {
      router.push('/');
    }
  }, [user, loading, router]);

  const handleComplete = (answers: Record<string, number>) => {
    // Handle test completion - you can add logic here to save results, show results page, etc.
    console.log('Test completed with answers:', answers);
    // Don't redirect immediately - let the results screen show first
    // The "Claim Rank" button will handle the redirect
  };

  // Show loading state while checking auth
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    );
  }

  // Don't render test if user is not logged in (will redirect)
  if (!user) {
    return null;
  }

  return <DiagnosticTest questions={diagnosticQuestions} onComplete={handleComplete} />;
}

