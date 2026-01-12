import UnitPage from '@/app/unit/[unitId]/page';
import type { Metadata } from 'next';
import { microUnits } from '@/data/cheatSheets';

const unit = microUnits.find(u => u.number === 6)!;

export const metadata: Metadata = {
  title: `AP Micro Unit 6 Cheat Sheet: ${unit.title} | AP Dojo`,
  description: `Free AP Microeconomics Unit 6 cheat sheet covering ${unit.title}. Review key terms, definitions, formulas, graphs, and whiteboards. Practice questions included.`,
  openGraph: {
    title: `AP Micro Unit 6 Cheat Sheet: ${unit.title} | AP Dojo`,
    description: `Free AP Microeconomics Unit 6 cheat sheet covering ${unit.title}.`,
  },
  alternates: {
    canonical: 'https://apdojo.com/ap-micro-unit-6-cheat-sheet',
  },
};

export default function APMicroUnit6CheatSheetPage() {
  return <UnitPage unitNumber={6} subject="micro" />;
}

