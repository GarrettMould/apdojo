import UnitPage from '@/app/unit/[unitId]/page';
import type { Metadata } from 'next';
import { statsUnits } from '@/data/cheatSheets';

const unit = statsUnits.find((u) => u.number === 3)!;

export const metadata: Metadata = {
  title: `AP Stats Unit 3 Cheat Sheet: ${unit.title} | AP Dojo`,
  description:
    `Free AP Statistics Unit 3 cheat sheet covering ${unit.title}. Review key terms, definitions, and unit-aligned practice.`,
  openGraph: {
    title: `AP Stats Unit 3 Cheat Sheet: ${unit.title} | AP Dojo`,
    description: `Free AP Statistics Unit 3 cheat sheet covering ${unit.title}.`,
  },
  alternates: {
    canonical: 'https://apdojo.com/ap-stats-unit-3-cheat-sheet',
  },
};

export default function APStatsUnit3CheatSheetPage() {
  return <UnitPage unitNumber={3} subject="stats" />;
}
