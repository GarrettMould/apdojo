import UnitPage from '@/app/unit/[unitId]/page';
import type { Metadata } from 'next';
import { govUnits } from '@/data/cheatSheets';

const unit = govUnits.find((u) => u.number === 5)!;

export const metadata: Metadata = {
  title: `AP Gov Unit 5 Cheat Sheet: ${unit.title} | AP Dojo`,
  description:
    `Free AP U.S. Government Unit 5 cheat sheet covering ${unit.title}. Review key terms, definitions, required cases, and unit-aligned practice.`,
  openGraph: {
    title: `AP Gov Unit 5 Cheat Sheet: ${unit.title} | AP Dojo`,
    description: `Free AP U.S. Government Unit 5 cheat sheet covering ${unit.title}.`,
  },
  alternates: {
    canonical: 'https://apdojo.com/ap-gov-unit-5-cheat-sheet',
  },
};

export default function APGovUnit5CheatSheetPage() {
  return <UnitPage unitNumber={5} subject="gov" />;
}
