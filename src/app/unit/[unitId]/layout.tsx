import type { Metadata } from 'next';
import { macroUnits, microUnits } from '@/data/cheatSheets';

export async function generateMetadata({ params }: { params: { unitId: string } }): Promise<Metadata> {
  const unitId = parseInt(params.unitId);
  
  // Try macro first, then micro
  let unit = macroUnits.find(u => u.number === unitId);
  let subject = 'Macroeconomics';
  let subjectShort = 'Macro';
  
  if (!unit) {
    unit = microUnits.find(u => u.number === unitId);
    subject = 'Microeconomics';
    subjectShort = 'Micro';
  }

  if (!unit) {
    return {
      title: 'Unit Not Found | AP Dojo',
      description: 'The requested unit could not be found.',
    };
  }

  const title = `AP ${subjectShort} Unit ${unitId} Cheat Sheet: ${unit.title} | AP Dojo`;
  const description = `Free AP ${subject} Unit ${unitId} cheat sheet covering ${unit.title}. Review key terms, definitions, formulas, graphs, and whiteboards. Practice questions included.`;
  
  return {
    title,
    description,
    keywords: [
      `AP ${subject}`,
      `AP ${subjectShort} Unit ${unitId}`,
      `${unit.title}`,
      'AP economics cheat sheet',
      'AP economics review',
      'AP exam prep',
      'AP economics key terms',
      'AP economics formulas',
      'free AP study materials',
    ].join(', '),
    openGraph: {
      title,
      description,
      type: 'website',
      url: `https://apdojo.com/unit/${unitId}`,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    alternates: {
      canonical: `https://apdojo.com/unit/${unitId}`,
    },
  };
}

export default function UnitLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}



