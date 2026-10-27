import type { Metadata } from 'next';
import { UnitResourceLibraryPage } from '@/components/UnitResourceLibraryPage';

export const metadata: Metadata = {
  title: 'Printable Unit Cheat Sheets',
  description:
    'Printable one-page AP review sheets. Interactive unit cheat sheets are also available for Macro, Micro, Gov, and Stats.',
  alternates: {
    canonical: 'https://apdojo.com/unit-cheat-sheets',
  },
};

export default function UnitCheatSheetsPage() {
  return <UnitResourceLibraryPage copyMode="cheat-sheets" />;
}

