import { notFound } from 'next/navigation';
import Link from 'next/link';

export default function MicroMCQPreview({ params }: { params: { num: string } }) {
  // Only show exam 1 for now
  if (params.num !== '1') {
    notFound();
  }

  return (
    <div className="py-8">
      <div className="max-w-4xl mx-auto px-4">
      <div className="mb-6">
        <Link 
          href="/purchase/exams"
          className="text-blue-600 hover:text-blue-800"
        >
          ← Back to Exams Page
        </Link>
        <h1 className="text-4xl font-extrabold mt-4">
          AP Microeconomics MCQ {params.num}
        </h1>
        <p className="text-gray-600 mt-2">
          Complete all questions to submit and view your score. Explanations are available after you submit.
        </p>
      </div>
        <h1 className="text-3xl font-bold mb-4">AP Microeconomics MCQ Exam 1</h1>
        <p className="text-gray-600 mb-8">Coming soon! This exam is currently under development.</p>
      </div>
    </div>
  );
} 