import { FullExamFRQ } from '@/components/FullExamFRQ';
import { frqSetOneQuestions } from '@/data/questionBanks/micro/frqs/setOne';

export default function MicroFRQPreview({ params }: { params: { num: string } }) {
  // Only show exam 1 for now
  if (params.num !== '1') {
    return null;
  }

  return (
    <div className="py-8">
      <FullExamFRQ questions={frqSetOneQuestions} />
    </div>
  );
} 