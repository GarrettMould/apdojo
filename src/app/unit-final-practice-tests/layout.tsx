import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AP Unit Practice Tests',
  description: 'Full-length unit practice tests for AP Macro, Micro, U.S. Government, and Statistics, with explanations after you finish.',
  keywords: [
    'AP practice tests',
    'AP macroeconomics unit tests',
    'AP microeconomics unit tests',
    'AP government unit tests',
    'AP statistics unit tests',
    'AP exam practice',
  ].join(', '),
  openGraph: {
    title: 'AP Unit Practice Tests | AP Dojo',
    description: 'Full-length unit practice tests for AP Macro, Micro, U.S. Government, and Statistics.',
    type: 'website',
    url: 'https://apdojo.com/unit-final-practice-tests',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AP Unit Practice Tests | AP Dojo',
    description: 'Full-length unit practice tests for AP Macro, Micro, U.S. Government, and Statistics.',
  },
  robots: {
    index: false,
    follow: true,
  },
  alternates: {
    canonical: 'https://apdojo.com/ap-macro-practice-tests',
  },
};

export default function UnitPracticeTestsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}



