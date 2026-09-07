import type { Metadata } from 'next';
import { MathSolverClient } from '@/components/MathSolverClient';

export const metadata: Metadata = {
  title: 'AI Math Problem Solver | AP Dojo',
  description:
    'Upload a photo or PDF of any math problem and get a step-by-step solution instantly. Free AI math solver for AP Statistics, Calculus, and more.',
  openGraph: {
    title: 'AI Math Problem Solver | AP Dojo',
    description:
      'Upload a photo or PDF of any math problem and get a step-by-step solution instantly.',
  },
};

export default function MathSolverPage() {
  return (
    <main className="min-h-screen bg-gray-50 px-4 pb-8 pt-8">
      <div className="mx-auto mb-8 max-w-2xl px-2 py-4 text-center sm:py-6">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          AI Math Problem Solver
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-base text-gray-500 sm:text-lg">
          Snap a photo, upload a PDF, or type a problem. Get a step-by-step walkthrough — then generate similar practice from your upload.
        </p>
      </div>
      <MathSolverClient />
    </main>
  );
}
