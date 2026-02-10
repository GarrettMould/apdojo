import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Multipliers Deep Dive: Understanding the Spending and Tax Multipliers | AP Dojo',
  description: 'Master the concept of multipliers in macroeconomics. Learn how changes in spending and taxes have amplified effects on aggregate demand and economic output.',
  openGraph: {
    title: 'Multipliers Deep Dive: Understanding the Spending and Tax Multipliers | AP Dojo',
    description: 'Master the concept of multipliers in macroeconomics and how changes in spending and taxes affect the economy.',
  },
  alternates: {
    canonical: 'https://apdojo.com/ap-macro/unit-3/multipliers',
  },
};

export default function MultipliersDeepDiveLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
