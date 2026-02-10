import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Nominal vs. Real Interest Rates Deep Dive: Understanding Interest Rates and Inflation | AP Dojo',
  description: 'Master the difference between nominal and real interest rates. Learn how to calculate real rates and understand the Fisher Effect.',
  openGraph: {
    title: 'Nominal vs. Real Interest Rates Deep Dive: Understanding Interest Rates and Inflation | AP Dojo',
    description: 'Master the difference between nominal and real interest rates and how inflation affects them.',
  },
  alternates: {
    canonical: 'https://apdojo.com/ap-macro/unit-4/nominal-real-interest-rates',
  },
};

export default function NominalRealInterestRatesDeepDiveLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
