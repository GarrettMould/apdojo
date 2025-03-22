import './globals.css'
import type { Metadata } from 'next'
import { HeaderWrapper } from '@/components/header-wrapper'
import { Footer } from '@/components/Footer'
import { PageContainer } from '@/components/ui/page-container'
import { AuthProvider } from '@/contexts/AuthContext'
import { Analytics } from "@vercel/analytics/react"

export async function generateMetadata({ params }: { params: { type: string } }) {
  const examType = params.type === 'macro-exams' ? 'Macroeconomics' : 'Microeconomics'
  
  return {
    title: `AP Dojo | Elite AP Tutoring & Top AP Economics Resources`,
    description: `Unlock top AP scores with AP Dojo's premium tutoring. Expert guidance, exclusive AP Economics resources, and personalized strategies for academic success`
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <AuthProvider>
          <HeaderWrapper />
          <main className="flex-1 w-full bg-gradient-to-b from-gray-100 via-white to-white via-5%">
            <PageContainer>
              {children}
              <Analytics />
            </PageContainer>
          </main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  )
}
