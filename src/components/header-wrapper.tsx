'use client'

import { Header } from './header'
import { PageContainer } from '@/components/ui/page-container'

export function HeaderWrapper() {
  return (
    <header className="border-b">
      <PageContainer>
        <Header />
      </PageContainer>
    </header>
  )
} 