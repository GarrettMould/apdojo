import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Money Growth and Inflation Deep Dive | AP Dojo',
  description: 'Understand the relationship between money supply growth and inflation. Learn the quantity theory of money and the classical dichotomy.',
  openGraph: {
    title: 'Money Growth and Inflation Deep Dive | AP Dojo',
    description: 'Understand the relationship between money supply growth and inflation using the quantity theory of money.',
  },
  alternates: {
    canonical: 'https://apdojo.com/ap-macro/unit-5/money-growth-inflation',
  },
};

export default function MoneyGrowthInflationDeepDiveLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
