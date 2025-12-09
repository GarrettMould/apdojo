import type { Metadata } from 'next';

const guides: Record<string, { title: string; subject: string; unitNumber: number }> = {
  'AP-macroeconomics-unit-1': {
    title: "Basic Economic Concepts",
    subject: "Macroeconomics",
    unitNumber: 1,
  },
  'AP-macroeconomics-unit-2': {
    title: "Economic Indicators and the Business Cycle",
    subject: "Macroeconomics",
    unitNumber: 2,
  },
  'AP-macroeconomics-unit-3': {
    title: "National Income and Price Determination",
    subject: "Macroeconomics",
    unitNumber: 3,
  },
  'AP-macroeconomics-unit-4': {
    title: "Financial Sector",
    subject: "Macroeconomics",
    unitNumber: 4,
  },
  'AP-macroeconomics-unit-5': {
    title: "Long-Run Consequences of Stabilization Policies",
    subject: "Macroeconomics",
    unitNumber: 5,
  },
  'AP-macroeconomics-unit-6': {
    title: "Open Economy—International Trade and Finance",
    subject: "Macroeconomics",
    unitNumber: 6,
  },
  'AP-microeconomics-unit-1': {
    title: "Basic Economic Concepts",
    subject: "Microeconomics",
    unitNumber: 1,
  },
  'AP-microeconomics-unit-2': {
    title: "Supply and Demand",
    subject: "Microeconomics",
    unitNumber: 2,
  },
  'AP-microeconomics-unit-3': {
    title: "Production, Cost, and the Perfect Competition Model",
    subject: "Microeconomics",
    unitNumber: 3,
  },
  'AP-microeconomics-unit-4': {
    title: "Imperfect Competition",
    subject: "Microeconomics",
    unitNumber: 4,
  },
  'AP-microeconomics-unit-5': {
    title: "Factor Markets",
    subject: "Microeconomics",
    unitNumber: 5,
  },
  'AP-microeconomics-unit-6': {
    title: "Market Failure and the Role of Government",
    subject: "Microeconomics",
    unitNumber: 6,
  }
};

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const guide = guides[params.slug];
  
  if (!guide) {
    return {
      title: 'Study Guide Not Found | AP Dojo',
      description: 'The requested study guide could not be found.',
    };
  }

  const subjectShort = guide.subject === 'Macroeconomics' ? 'Macro' : 'Micro';
  const title = `AP ${subjectShort} Unit ${guide.unitNumber} Study Guide: ${guide.title} | AP Dojo`;
  const description = `Free AP ${guide.subject} Unit ${guide.unitNumber} study guide covering ${guide.title}. Download PDF cheat sheets, review key terms, formulas, and graphs to ace your AP exam.`;
  
  return {
    title,
    description,
    keywords: [
      `AP ${guide.subject}`,
      `AP ${subjectShort} Unit ${guide.unitNumber}`,
      `${guide.title}`,
      'AP exam study guide',
      'AP economics cheat sheet',
      'AP economics review',
      'AP exam prep',
      'free AP study materials',
    ].join(', '),
    openGraph: {
      title,
      description,
      type: 'website',
      url: `https://apdojo.com/study-guides/${params.slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    alternates: {
      canonical: `https://apdojo.com/study-guides/${params.slug}`,
    },
  };
}

export default function StudyGuideLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}



