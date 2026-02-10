import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'The Loanable Funds Market Deep Dive: Understanding Saving and Investment | AP Dojo',
  description: 'Master the loanable funds market model. Learn how savers supply funds, borrowers demand funds, and how the real interest rate balances saving and investment.',
  openGraph: {
    title: 'The Loanable Funds Market Deep Dive: Understanding Saving and Investment | AP Dojo',
    description: 'Master the loanable funds market model and how the real interest rate balances saving and investment.',
  },
  alternates: {
    canonical: 'https://apdojo.com/ap-macro/unit-4/loanable-funds-market',
  },
};

export default function LoanableFundsMarketDeepDiveLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
