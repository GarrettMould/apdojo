import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AP Economics Unit Practice Tests | AP Dojo',
  description: 'Test your knowledge with full-length unit practice tests for AP Macroeconomics and AP Microeconomics. Each test covers all topics in a specific unit with detailed explanations.',
  keywords: [
    'AP economics practice tests',
    'AP macroeconomics unit tests',
    'AP microeconomics unit tests',
    'AP exam practice',
    'AP economics exam prep',
    'unit practice tests',
    'AP economics review',
  ].join(', '),
  openGraph: {
    title: 'AP Economics Unit Practice Tests | AP Dojo',
    description: 'Test your knowledge with full-length unit practice tests for AP Macroeconomics and AP Microeconomics.',
    type: 'website',
    url: 'https://apdojo.com/unit-final-practice-tests',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AP Economics Unit Practice Tests | AP Dojo',
    description: 'Test your knowledge with full-length unit practice tests for AP Macroeconomics and AP Microeconomics.',
  },
  alternates: {
    canonical: 'https://apdojo.com/unit-final-practice-tests',
  },
};

export default function UnitPracticeTestsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}



