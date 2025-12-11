'use client';

import { Suspense } from 'react';
import { usePathname } from 'next/navigation';
import { Header } from './header';
import { Footer } from './Footer';

interface LayoutWrapperProps {
  children: React.ReactNode;
}

function HeaderWithSuspense() {
  return <Header />;
}

export function LayoutWrapper({ children }: LayoutWrapperProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <Suspense fallback={<div className="h-16 bg-white" />}>
        <HeaderWithSuspense />
      </Suspense>
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
} 