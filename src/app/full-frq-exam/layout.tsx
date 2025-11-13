import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AP Macroeconomics Full FRQ Practice Exam | AP Dojo',
  description: 'Practice free-response questions (FRQs) for the AP Macroeconomics exam. Full-length FRQ practice exam with detailed scoring guidelines and explanations.',
  keywords: [
    'AP macroeconomics FRQ',
    'AP macroeconomics free response',
    'AP macroeconomics practice FRQ',
    'AP macroeconomics exam FRQ',
    'AP economics free response questions',
    'AP exam FRQ practice',
    'AP macroeconomics review',
  ].join(', '),
  openGraph: {
    title: 'AP Macroeconomics Full FRQ Practice Exam | AP Dojo',
    description: 'Practice free-response questions (FRQs) for the AP Macroeconomics exam. Full-length FRQ practice exam with detailed scoring guidelines.',
    type: 'website',
    url: 'https://apdojo.com/full-frq-exam',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AP Macroeconomics Full FRQ Practice Exam | AP Dojo',
    description: 'Practice free-response questions (FRQs) for the AP Macroeconomics exam. Full-length FRQ practice exam.',
  },
  alternates: {
    canonical: 'https://apdojo.com/full-frq-exam',
  },
};

export default function FullFRQExamLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}



