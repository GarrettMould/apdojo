import UnitPage from '@/app/unit/[unitId]/page';
import type { Metadata } from 'next';
import { microUnits } from '@/data/cheatSheets';

const unit = microUnits.find(u => u.number === 4)!;

export const metadata: Metadata = {
  title: `AP Micro Unit 4 Cheat Sheet: ${unit.title} | AP Dojo`,
  description: `Free AP Microeconomics Unit 4 cheat sheet covering ${unit.title}. Review key terms, definitions, formulas, graphs, and whiteboards. Practice questions included.`,
  openGraph: {
    title: `AP Micro Unit 4 Cheat Sheet: ${unit.title} | AP Dojo`,
    description: `Free AP Microeconomics Unit 4 cheat sheet covering ${unit.title}.`,
  },
  alternates: {
    canonical: 'https://apdojo.com/ap-micro-unit-4-cheat-sheet',
  },
};

export default function APMicroUnit4CheatSheetPage() {
  return <UnitPage unitNumber={4} subject="micro" />;
}

