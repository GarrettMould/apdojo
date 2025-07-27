'use client';

import { usePathname } from 'next/navigation';

interface LayoutWrapperProps {
  children: React.ReactNode;
}

export function LayoutWrapper({ children }: LayoutWrapperProps) {
  return (
    <div className="flex-1 bg-gray-50 min-h-screen">
      {children}
    </div>
  );
} 