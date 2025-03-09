import './globals.css'
import type { Metadata } from 'next'
import { HeaderWrapper } from '@/components/header-wrapper'
import { Footer } from '@/components/Footer'
import { PageContainer } from '@/components/ui/page-container'
import { AuthProvider } from '@/contexts/AuthContext'

export async function generateMetadata({ params }: { params: { type: string } }) {
  const examType = params.type === 'macro-exams' ? 'Macroeconomics' : 'Microeconomics'
  
  return {
    title: `AP Dojo | Elite AP Tutoring & Top AP Economics Resources`,
    description: `Unlock top AP scores with AP Dojo’s premium tutoring. Expert guidance, exclusive AP Economics resources, and personalized strategies for academic success`
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
          <main className="flex-1">
            <PageContainer>
              {children}
            </PageContainer>
          </main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  )
}
