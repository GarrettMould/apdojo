import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AP Macroeconomics Full MCQ Practice Exam | AP Dojo',
  description: 'Take a full-length AP Macroeconomics multiple-choice practice exam. 60 questions covering all 6 units with detailed explanations. Perfect for AP exam preparation.',
  keywords: [
    'AP macroeconomics practice exam',
    'AP macroeconomics MCQ',
    'AP macroeconomics multiple choice',
    'full length AP exam',
    'AP macroeconomics test',
    'AP exam practice',
    'AP macroeconomics review',
  ].join(', '),
  openGraph: {
    title: 'AP Macroeconomics Full MCQ Practice Exam | AP Dojo',
    description: 'Take a full-length AP Macroeconomics multiple-choice practice exam. 60 questions covering all 6 units.',
    type: 'website',
    url: 'https://apdojo.com/full-mcq-exam-preview?subject=macro&num=1',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AP Macroeconomics Full MCQ Practice Exam | AP Dojo',
    description: 'Take a full-length AP Macroeconomics multiple-choice practice exam. 60 questions covering all 6 units.',
  },
  alternates: {
    canonical: 'https://apdojo.com/full-mcq-exam-preview?subject=macro&num=1',
  },
};

export default function FullMCQExamLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}



