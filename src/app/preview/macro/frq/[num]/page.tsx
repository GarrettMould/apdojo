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
        <div>
        
          <div className="space-y-4 mt-8">
            <h1 className="text-4xl font-extrabold tracking-tight">
              <span className="text-blue-500">AP Macroeconomics</span>{" "}
              FRQ {params.num}
            </h1>
            <p className="text-gray-600 leading-relaxed">
              Complete all questions to submit and view your score. Explanations are available after you submit.
            </p>
          </div>
        </div>

        <FullExamFRQ questions={frqSetOneQuestions} />
      </div>
    </div>
  );
} 