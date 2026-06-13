import UnitPage from '@/app/unit/[unitId]/page';
import type { Metadata } from 'next';
import { statsUnits } from '@/data/cheatSheets';

const unit = statsUnits.find((u) => u.number === 2)!;

export const metadata: Metadata = {
  title: `AP Stats Unit 2 Cheat Sheet: ${unit.title} | AP Dojo`,
  description:
    `Free AP Statistics Unit 2 cheat sheet covering ${unit.title}. Review key terms, definitions, and unit-aligned practice.`,
  openGraph: {
    title: `AP Stats Unit 2 Cheat Sheet: ${unit.title} | AP Dojo`,
    description: `Free AP Statistics Unit 2 cheat sheet covering ${unit.title}.`,
  },
  alternates: {
    canonical: 'https://apdojo.com/ap-stats-unit-2-cheat-sheet',
  },
};

export default function APStatsUnit2CheatSheetPage() {
  return <UnitPage unitNumber={2} subject="stats" />;
}
