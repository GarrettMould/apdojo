import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AP Economics MCQ Practice Questions | AP Dojo',
  description: 'Practice AP Macroeconomics and AP Microeconomics multiple-choice questions. Choose specific units, topics, or weakest areas. Get instant feedback and detailed explanations.',
  keywords: [
    'AP economics practice questions',
    'AP macroeconomics MCQ',
    'AP microeconomics MCQ',
    'AP economics multiple choice',
    'AP exam practice questions',
    'AP economics quiz',
    'AP economics review questions',
  ].join(', '),
  openGraph: {
    title: 'AP Economics MCQ Practice Questions | AP Dojo',
    description: 'Practice AP Macroeconomics and AP Microeconomics multiple-choice questions. Choose specific units, topics, or weakest areas.',
    type: 'website',
    url: 'https://apdojo.com/unitMCQPracticePage',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AP Economics MCQ Practice Questions | AP Dojo',
    description: 'Practice AP Macroeconomics and AP Microeconomics multiple-choice questions. Choose specific units, topics, or weakest areas.',
  },
  alternates: {
    canonical: 'https://apdojo.com/unitMCQPracticePage',
  },
};

export default function UnitMCQPracticeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}



