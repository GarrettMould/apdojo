import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Balance of Payments Accounts Deep Dive | AP Dojo',
  description: 'Master the balance of payments accounts including the current account and financial account. Understand how international transactions are recorded.',
  openGraph: {
    title: 'Balance of Payments Accounts Deep Dive | AP Dojo',
    description: 'Master the balance of payments accounts and how international transactions are recorded.',
  },
  alternates: {
    canonical: 'https://apdojo.com/ap-macro/unit-6/balance-of-payments-accounts',
  },
};

export default function BalanceOfPaymentsAccountsDeepDiveLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
