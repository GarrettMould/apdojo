import UnitPage from '@/app/unit/[unitId]/page';
import type { Metadata } from 'next';
import { macroUnits } from '@/data/cheatSheets';

const unit = macroUnits.find(u => u.number === 5)!;

export const metadata: Metadata = {
  title: `AP Macro Unit 5 Cheat Sheet: ${unit.title} | AP Dojo`,
  description: `Free AP Macroeconomics Unit 5 cheat sheet covering ${unit.title}. Review key terms, definitions, formulas, graphs, and whiteboards. Practice questions included.`,
  openGraph: {
    title: `AP Macro Unit 5 Cheat Sheet: ${unit.title} | AP Dojo`,
    description: `Free AP Macroeconomics Unit 5 cheat sheet covering ${unit.title}.`,
  },
  alternates: {
    canonical: 'https://apdojo.com/ap-macro-unit-5-cheat-sheet',
  },
};

export default function APMacroUnit5CheatSheetPage() {
  return <UnitPage unitNumber={5} subject="macro" />;
}

