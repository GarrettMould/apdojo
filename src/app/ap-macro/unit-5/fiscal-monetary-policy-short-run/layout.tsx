import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Fiscal and Monetary Policy Actions in the Short Run Deep Dive | AP Dojo',
  description: 'Master how fiscal and monetary policy affect aggregate demand, output, and interest rates in the short run. Learn how policy combinations create different economic outcomes.',
  openGraph: {
    title: 'Fiscal and Monetary Policy Actions in the Short Run Deep Dive | AP Dojo',
    description: 'Master how fiscal and monetary policy affect aggregate demand, output, and interest rates in the short run.',
  },
  alternates: {
    canonical: 'https://apdojo.com/ap-macro/unit-5/fiscal-monetary-policy-short-run',
  },
};

export default function FiscalMonetaryPolicyShortRunDeepDiveLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
