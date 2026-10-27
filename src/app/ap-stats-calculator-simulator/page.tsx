import type { Metadata } from 'next';
import { CalculatorDrillSession } from '@/components/ti84/CalculatorDrillSession';

export const metadata: Metadata = {
  title: 'Calculator Drills | AP Stats',
  description:
    'AP Statistics calculator drills with exam-style College Board Desmos and TI-84 handheld practice.',
  openGraph: {
    title: 'Calculator Drills | AP Stats',
    description:
      'AP Statistics calculator drills with exam-style College Board Desmos and TI-84 handheld practice.',
  },
};

export default function ApStatsCalculatorSimulatorPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8 sm:py-12 px-4 sm:px-6">
      <CalculatorDrillSession />
    </main>
  );
}
