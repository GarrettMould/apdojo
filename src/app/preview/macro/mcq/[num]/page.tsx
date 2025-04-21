import { notFound } from 'next/navigation';
import Link from 'next/link';
import { FullExam } from '@/components/FullExam';
import { macroSetOneQuestions } from '@/data/questionBanks/macro/mcqs/macroSetOne';

export async function generateMetadata({ params }: { params: { num: string } }) {
  return {
    title: `AP Macroeconomics MCQ ${params.num} Preview | AP Dojo`
  }
}

export default function MacroMCQPreview({ params }: { params: { num: string } }) {
  // Only show exam 1 for now
  if (params.num !== '1') {
    notFound();
  }

  return (
    <div className="mx-auto px-4 py-12">
      <div>
        <div className="space-y-4 mt-8">
          <h1 className="text-4xl font-extrabold tracking-tight">
            <span className="text-blue-500">AP Macroeconomics</span>{" "}
            MCQ {params.num}
          </h1>
          <p className="text-gray-600 leading-relaxed">
            Complete all questions to submit and view your score. Explanations are available after you submit.
          </p>
        </div>
      </div>

      <FullExam 
        questionBank={macroSetOneQuestions}
        examType="macro"
        questionType="mcq"
        examNumber={params.num}
      />
    </div>
  );
} 