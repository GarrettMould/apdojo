import { notFound } from 'next/navigation'
import { FullExam } from '@/components/FullExam'
import Link from 'next/link'
import { macroSetOneQuestions } from '@/data/questionBanks/macroSetOne'
import { macroSetTwoQuestions } from '@/data/questionBanks/macroSetTwo'
import { macroSetThreeQuestions } from '@/data/questionBanks/macroSetThree'

interface PageProps {
  params: {
    type: 'macro-exams' | 'micro-exams'
    format: 'mcq' | 'frq'
    num: string
  }
}

export async function generateMetadata({ params }: PageProps) {
  const examType = params.type === 'macro-exams' ? 'Macroeconomics' : 'Microeconomics'
  const format = params.format.toUpperCase()
  return {
    title: `AP ${examType} ${format} ${params.num} Preview | AP Dojo`
  }
}

export default function ExamPreview({ params }: PageProps) {
  // Validate params
  if (
    (params.type !== 'macro-exams' && params.type !== 'micro-exams') ||
    (params.format !== 'mcq' && params.format !== 'frq') ||
    !['1', '2', '3'].includes(params.num)
  ) {
    notFound()
  }

  const examType = params.type === 'macro-exams' ? 'Macroeconomics' : 'Microeconomics'
  const format = params.format.toUpperCase()

  // Updated question bank selection
  let questionBank
  switch (params.num) {
    case '1':
      questionBank = macroSetOneQuestions
      break
    case '2':
      questionBank = macroSetTwoQuestions
      break
    case '3':
      questionBank = macroSetThreeQuestions
      break
    default:
      questionBank = macroSetOneQuestions
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="mb-8">
        <Link href={`/purchase/${params.type}`} className="text-blue-600 hover:text-blue-800">
          ← Back to Exams Page
        </Link>
        <h1 className="text-4xl font-bold mt-4">
          AP {examType} {format} {params.num} 
        </h1>
        <p className="text-gray-600 mt-2">
          Complete all questions to submit and view your score. Explanations are available after you submit.
        </p>
      </div>

      <FullExam 
        questionBank={questionBank} 
        examType={params.type === 'macro-exams' ? 'macro' : 'micro'}
        questionType={params.format}
        examNumber={params.num}
      />

      
    </div>
  )
} 