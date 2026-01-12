import UnitPage from '@/app/unit/[unitId]/page';
import type { Metadata } from 'next';
import { macroUnits } from '@/data/cheatSheets';

const unit = macroUnits.find(u => u.number === 4)!;

export const metadata: Metadata = {
  title: `AP Macro Unit 4 Cheat Sheet: ${unit.title} | AP Dojo`,
  description: `Free AP Macroeconomics Unit 4 cheat sheet covering ${unit.title}. Review key terms, definitions, formulas, graphs, and whiteboards. Practice questions included.`,
  openGraph: {
    title: `AP Macro Unit 4 Cheat Sheet: ${unit.title} | AP Dojo`,
    description: `Free AP Macroeconomics Unit 4 cheat sheet covering ${unit.title}.`,
  },
  alternates: {
    canonical: 'https://apdojo.com/ap-macro-unit-4-cheat-sheet',
  },
};

export default function APMacroUnit4CheatSheetPage() {
  return <UnitPage unitNumber={4} subject="macro" />;
}

