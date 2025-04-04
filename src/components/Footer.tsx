import Image from 'next/image'
import dojoIcon from "../../public/images/dojoIcon.png"
import { PageContainer } from '@/components/ui/page-container'
import { Mail } from 'lucide-react'
import Link from 'next/link'

export function Footer() {
  return (
    <footer className="border-t relative z-50 bg-white">
      <PageContainer>
        {/* Main Row */}
        <div className="pt-12 pb-8 flex flex-col sm:flex-row items-start justify-between gap-12">
          {/* Logo */}
          <div className="hover:opacity-90 transition-opacity flex items-center gap-4">
            <Image 
              src={dojoIcon}
              alt="Dojo Icon"
              width={40}
              height={40}
              className="object-contain"
            />
            <div className="flex items-center">
              <span className="text-4xl font-extrabold">AP</span>
              <span className="ml-1.5 text-4xl font-extrabold text-blue-500">Dojo</span>
            </div>
          </div>

          {/* Menu and Contact */}
          <div className="flex flex-col sm:flex-row gap-12 sm:gap-24">
            {/* Navigation Links */}
            <div className="flex flex-col gap-3">
              <span className="text-sm font-bold text-gray-900">Menu</span>
              {/* Comment out private tutoring link */}
              {/* <Link 
                href="/tutoring" 
                className="text-sm text-gray-500 hover:text-blue-600 transition-colors"
              >
                Private Tutoring
              </Link> */}
              <Link 
                href="/interactive-tools/flashcards" 
                className="text-sm text-gray-500 hover:text-blue-600 transition-colors"
              >
                Flashcards
              </Link>
              <Link 
                href="/cheat-sheets" 
                className="text-sm text-gray-500 hover:text-blue-600 transition-colors"
              >
                Cheat Sheets
              </Link>
              <Link 
                href="/purchase/exams" 
                className="text-sm text-gray-500 hover:text-blue-600 transition-colors"
              >
                Practice Exams
              </Link>
            </div>

            {/* Contact */}
            <div className="flex flex-col gap-1 items-end">
              <p className="text-sm font-bold text-gray-700 text-right">
                Have questions or want to book lessons? <br />Contact via email.
              </p>
              <a 
                href="mailto:garrett@apdojo.com"
                className="text-sm text-gray-500 hover:text-blue-600 transition-colors flex items-center gap-2 mt-4"
              >
                <Mail className="w-4 h-4" />
                <span>garrett@apdojo.com</span>
              </a>
            </div>
          </div>
        </div>

        {/* Trademark Row */}
        <div className="py-6 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-xs text-gray-500">© 2024 AP Dojo. All rights reserved.</p>
            <p className="text-xs text-gray-500 text-center sm:text-right max-w-xl">
              AP® and SAT® are trademarks registered by the College Board, which is not affiliated with, and does not endorse this website.
            </p>
          </div>
        </div>
      </PageContainer>
    </footer>
  )
} 