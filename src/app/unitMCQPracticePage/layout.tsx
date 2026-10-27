import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AP MCQ Practice Questions',
  description: 'Practice AP Macro, Micro, U.S. Government, and Statistics multiple-choice questions. Choose a unit, get instant feedback, and review explanations.',
  keywords: [
    'AP practice questions',
    'AP macroeconomics MCQ',
    'AP microeconomics MCQ',
    'AP government MCQ',
    'AP statistics MCQ',
    'AP exam practice questions',
  ].join(', '),
  openGraph: {
    title: 'AP MCQ Practice Questions | AP Dojo',
    description: 'Practice AP Macro, Micro, U.S. Government, and Statistics multiple-choice questions.',
    type: 'website',
    url: 'https://apdojo.com/unitMCQPracticePage',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AP MCQ Practice Questions | AP Dojo',
    description: 'Practice AP Macro, Micro, U.S. Government, and Statistics multiple-choice questions.',
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



