import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Government Deficits and the National Debt Deep Dive | AP Dojo',
  description: 'Understand the difference between budget deficits and national debt, and how government borrowing affects interest rates and private investment.',
  openGraph: {
    title: 'Government Deficits and the National Debt Deep Dive | AP Dojo',
    description: 'Understand budget deficits, national debt, and their economic consequences.',
  },
  alternates: {
    canonical: 'https://apdojo.com/ap-macro/unit-5/government-deficits-national-debt',
  },
};

export default function GovernmentDeficitsNationalDebtDeepDiveLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
