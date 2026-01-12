import UnitPage from '@/app/unit/[unitId]/page';
import type { Metadata } from 'next';
import { macroUnits } from '@/data/cheatSheets';

const unit = macroUnits.find(u => u.number === 1)!;

export const metadata: Metadata = {
  title: `AP Macro Unit 1 Cheat Sheet: ${unit.title} | AP Dojo`,
  description: `Free AP Macroeconomics Unit 1 cheat sheet covering ${unit.title}. Review key terms, definitions, formulas, graphs, and whiteboards. Practice questions included.`,
  openGraph: {
    title: `AP Macro Unit 1 Cheat Sheet: ${unit.title} | AP Dojo`,
    description: `Free AP Macroeconomics Unit 1 cheat sheet covering ${unit.title}.`,
  },
  alternates: {
    canonical: 'https://apdojo.com/ap-macro-unit-1-cheat-sheet',
  },
};

export default function APMacroUnit1CheatSheetPage() {
  return <UnitPage unitNumber={1} subject="macro" />;
}

