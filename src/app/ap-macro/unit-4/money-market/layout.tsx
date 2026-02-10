import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'The Money Market Deep Dive: Understanding Money Supply and Demand | AP Dojo',
  description: 'Master the money market model. Learn how the supply and demand for money determine the equilibrium interest rate and how changes affect the economy.',
  openGraph: {
    title: 'The Money Market Deep Dive: Understanding Money Supply and Demand | AP Dojo',
    description: 'Master the money market model and how supply and demand for money determine interest rates.',
  },
  alternates: {
    canonical: 'https://apdojo.com/ap-macro/unit-4/money-market',
  },
};

export default function MoneyMarketDeepDiveLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
