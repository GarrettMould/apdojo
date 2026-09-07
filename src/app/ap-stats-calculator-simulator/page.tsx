import type { Metadata } from 'next';
import { CalculatorDrillSession } from '@/components/ti84/CalculatorDrillSession';

export const metadata: Metadata = {
  title: 'TI-84 Calculator Simulator | AP Stats | AP Dojo',
  description:
    'Practice TI-84 Plus calculator skills for AP Statistics with guided drills — STAT tests, DISTR functions, and more.',
  openGraph: {
    title: 'TI-84 Calculator Simulator | AP Stats | AP Dojo',
    description:
      'Practice TI-84 Plus calculator skills for AP Statistics with guided drills.',
  },
};

export default function ApStatsCalculatorSimulatorPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8 sm:py-12 px-4 sm:px-6">
      <CalculatorDrillSession />

      <div className="max-w-7xl mx-auto mt-10">
        <a
          href="/math-solver"
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-800 transition-colors"
        >
          AI Math Problem Solver →
        </a>
      </div>
    </main>
  );
}
