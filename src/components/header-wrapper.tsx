'use client'

import { Suspense } from 'react'
import { Header } from './header'

function HeaderContent() {
  return <Header />
}

export function HeaderWrapper() {
  return (
    <header className="w-full border-b bg-white">
      <Suspense fallback={<div className="h-16 bg-white" />}>
        <HeaderContent />
      </Suspense>
    </header>
  )
} 