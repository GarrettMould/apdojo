import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Crowding Out Deep Dive | AP Dojo',
  description: 'Understand how government borrowing can crowd out private investment by raising interest rates in the loanable funds market.',
  openGraph: {
    title: 'Crowding Out Deep Dive | AP Dojo',
    description: 'Understand how government borrowing crowds out private investment through higher interest rates.',
  },
  alternates: {
    canonical: 'https://apdojo.com/ap-macro/unit-5/crowding-out',
  },
};

export default function CrowdingOutDeepDiveLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
