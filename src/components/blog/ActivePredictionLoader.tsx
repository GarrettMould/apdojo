'use client';

import dynamic from 'next/dynamic';
import { ReactNode } from 'react';

// Dynamically import ActivePrediction to avoid SSR issues
const ActivePrediction = dynamic(
  () => import('./ActivePrediction').then((mod) => ({ default: mod.ActivePrediction })),
  { ssr: false }
);

interface ActivePredictionLoaderProps {
  id: string;
  title: string;
  introText: string;
  metrics: Array<{
    id: string;
    label: string;
    correctOption: 'increase' | 'decrease' | 'no-change';
  }>;
  explanation: ReactNode;
}

// Component registry for different quiz configurations
const QUIZ_CONFIGS: Record<string, Omit<ActivePredictionLoaderProps, 'id'>> = {
  'monetary-policy-quiz': {
    title: 'Pop Quiz: Predict the Shift',
    introText: 'Since Aggregate Demand shifted RIGHT, what happens to the 3 economic indicators?',
    metrics: [
      { id: 'pl', label: 'Price Level', correctOption: 'increase' },
      { id: 'gdp', label: 'Real GDP', correctOption: 'increase' },
      { id: 'unemp', label: 'Unemployment', correctOption: 'decrease' },
    ],
    explanation: (
      <>
        <h4 className="font-bold mb-2">The Breakdown:</h4>
        <ul className="list-disc pl-5 space-y-2 text-slate-700">
          <li><strong>Price Level Increases:</strong> More demand pulls prices up (Demand-Pull Inflation).</li>
          <li><strong>Real GDP Increases:</strong> We are producing more output to meet demand.</li>
          <li><strong>Unemployment Decreases:</strong> Factories need to hire more workers to produce that output.</li>
        </ul>
      </>
    ),
  },
};

export function ActivePredictionLoader({ id }: { id: string }) {
  const config = QUIZ_CONFIGS[id];
  
  if (!config) {
    return null;
  }

  return <ActivePrediction {...config} />;
}

