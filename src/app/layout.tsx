import './globals.css'
import type { Metadata } from 'next'
import { AuthProvider } from '@/contexts/AuthContext'
import { LayoutClientWrapper } from '@/components/LayoutClientWrapper'
import { FixedSidebar } from '@/components/FixedSidebar'
import { LayoutWrapper } from '@/components/LayoutWrapper'

// generateMetadata remains active in this Server Component
export async function generateMetadata({ params }: { params: { type: string } }) {
  const examType = params.type === 'macro-exams' ? 'Macroeconomics' : 'Microeconomics'
  
  return {
    title: `AP Dojo | AP Macroeconomics and AP Microeconomics Resources`,
    description: `Unlock top AP scores with AP Dojo's resources. Unit cheat sheets, full-length practice exams, and comprehensive videos.`
  }
}

// Remove the old LayoutClientContent definition entirely
/*
'use client'; 
function LayoutClientContent({ children }: { children: React.ReactNode }) {
  // ... removed ...
}
*/

// RootLayout remains a Server Component
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <AuthProvider>
          <div className="flex">
            <FixedSidebar />
            <LayoutWrapper>
              <LayoutClientWrapper>{children}</LayoutClientWrapper>
            </LayoutWrapper>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
