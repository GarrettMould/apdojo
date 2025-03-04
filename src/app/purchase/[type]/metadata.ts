import { Metadata } from 'next'

type ExamType = 'macro-exams' | 'micro-exams'

interface PageProps {
  params: {
    type: ExamType
  }
}

export function generateMetadata({ params }: PageProps): Metadata {
  const title = params.type === 'macro-exams' ? 'AP Macroeconomics' : 'AP Microeconomics'
  return {
    title: `${title} Practice Exams | AP Dojo`
  }
} 