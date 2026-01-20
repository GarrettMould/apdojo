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
  const pathname = usePathname();
  const isGraphGymPage = pathname === '/graph-gym';
  const isUnitCheatSheetPage =
    pathname.startsWith('/unit/') ||
    pathname.includes('-cheat-sheet');
  
  return (
    <div className="flex flex-col">
      <Suspense fallback={<div className="h-16 bg-white" />}>
        <HeaderWithSuspense />
      </Suspense>
      <main>
        {children}
      </main>
      {!isGraphGymPage && !isUnitCheatSheetPage && <Footer />}
    </div>
  );
} 