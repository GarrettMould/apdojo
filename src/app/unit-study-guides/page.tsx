import type { Metadata } from 'next';
import { UnitResourceLibraryPage } from '@/components/UnitResourceLibraryPage';

export const metadata: Metadata = {
  title: 'Printable Unit Study Guides | AP Dojo',
  description:
    'Printable AP Economics unit study guides. One-page review guides for AP Macro units.',
  alternates: {
    canonical: 'https://apdojo.com/unit-cheat-sheets',
  },
};

export default function UnitStudyGuidesPage() {
  return <UnitResourceLibraryPage copyMode="study-guides" />;
}

