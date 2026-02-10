import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Fiscal Policy Deep Dive: Understanding Government Spending and Taxation | AP Dojo',
  description: 'Master fiscal policy and understand how government spending and taxation affect aggregate demand, economic output, and price levels. Learn about expansionary and contractionary fiscal policy.',
  openGraph: {
    title: 'Fiscal Policy Deep Dive: Understanding Government Spending and Taxation | AP Dojo',
    description: 'Master fiscal policy and understand how government spending and taxation affect aggregate demand and economic output.',
  },
  alternates: {
    canonical: 'https://apdojo.com/ap-macro/unit-3/fiscal-policy',
  },
};

export default function FiscalPolicyDeepDiveLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
