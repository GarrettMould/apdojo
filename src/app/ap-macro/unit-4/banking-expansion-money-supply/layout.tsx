import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Banking and the Expansion of the Money Supply Deep Dive | AP Dojo',
  description: 'Master fractional reserve banking and how banks create money through the lending process. Learn about the money multiplier and how the money supply expands.',
  openGraph: {
    title: 'Banking and the Expansion of the Money Supply Deep Dive | AP Dojo',
    description: 'Master fractional reserve banking and how banks create money through the lending process.',
  },
  alternates: {
    canonical: 'https://apdojo.com/ap-macro/unit-4/banking-expansion-money-supply',
  },
};

export default function BankingExpansionMoneySupplyDeepDiveLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
