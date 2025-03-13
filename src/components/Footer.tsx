import Image from 'next/image'
import { PageContainer } from '@/components/ui/page-container'

export function Footer() {
  return (
    <footer className="border-t">
      <PageContainer>
        <div className="py-8 flex items-center justify-between">
          {/* Logo */}
          <div 
          
              className="hover:opacity-90 transition-opacity flex items-center"
        >
              <span className="text-2xl font-extrabold ">AP</span>
              <span className="ml-1 text-2xl font-extrabold text-blue-600">Dojo</span>
        </div>

          {/* Copyright and Trademark Notice */}
          <div className="text-xs text-gray-500 max-w-xl text-right">
            <p className="mb-1">© 2024 AP Dojo. All rights reserved.</p>
            <p>
              AP® and SAT® are trademarks registered by the College Board, which is not affiliated with, and does not endorse this website.
            </p>
          </div>
        </div>
      </PageContainer>
    </footer>
  )
} 