import { FullExamFRQ } from '@/components/FullExamFRQ';
import { frqSetOneQuestions } from '@/data/questionBanks/macro/frqs/setOne';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export default function MacroFRQPreview({ params }: { params: { num: string } }) {
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
        <h1 className="text-4xl font-bold mt-4">
          AP Macroeconomics FRQ {params.num}
        </h1>
        <p className="text-gray-600 mt-2">
          Complete all questions to submit and view your score. Explanations are available after you submit.
        </p>
      </div>
        <FullExamFRQ questions={frqSetOneQuestions} />
      </div>
    </div>
  );
} 