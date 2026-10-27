import Image from 'next/image'
import dojoIcon from "../../public/images/dojoIcon.png"
import { Mail } from 'lucide-react'
import Link from 'next/link'
import { defaultCheatSheetUrl } from '@/lib/courseSubject'

const footerLinkClass = "text-sm text-gray-500 hover:text-blue-600 transition-colors"

export function Footer() {
  return (
    <footer className="border-t bg-white">
      <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="pt-12 pb-8 flex flex-col lg:flex-row items-start justify-between gap-12">
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

          <div className="flex flex-col sm:flex-row flex-wrap gap-12 sm:gap-16">
            <div className="flex flex-col gap-3">
              <span className="text-sm font-bold text-gray-900">Practice Tests</span>
              <Link href="/ap-macro-practice-tests" className={footerLinkClass}>AP Macro</Link>
              <Link href="/ap-micro-practice-tests" className={footerLinkClass}>AP Micro</Link>
              <Link href="/ap-gov-practice-tests" className={footerLinkClass}>AP Gov</Link>
              <Link href="/ap-stats-practice-tests" className={footerLinkClass}>AP Stats</Link>
            </div>

            <div className="flex flex-col gap-3">
              <span className="text-sm font-bold text-gray-900">Cheat Sheets</span>
              <Link href={defaultCheatSheetUrl('macro')} className={footerLinkClass}>AP Macro Unit 1</Link>
              <Link href={defaultCheatSheetUrl('micro')} className={footerLinkClass}>AP Micro Unit 1</Link>
              <Link href={defaultCheatSheetUrl('gov')} className={footerLinkClass}>AP Gov Unit 1</Link>
              <Link href={defaultCheatSheetUrl('stats')} className={footerLinkClass}>AP Stats Unit 1</Link>
            </div>

            <div className="flex flex-col gap-3">
              <span className="text-sm font-bold text-gray-900">Tools</span>
              <Link href="/scotus-essay-practice" className={footerLinkClass}>SCOTUS Practice</Link>
              <Link href="/ap-stats-calculator-simulator" className={footerLinkClass}>Stats Calculator</Link>
              <Link href="/select-practice-units" className={footerLinkClass}>MCQ Practice</Link>
              <Link href="/ap-blog-home" className={footerLinkClass}>Blog</Link>
              <Link href="/feedback" className={footerLinkClass}>Leave Feedback</Link>
            </div>

            <div className="flex flex-col gap-1">
              <p className="text-sm font-bold text-gray-700">
                Have questions or want to book lessons?
              </p>
              <a 
                href="mailto:service@apdojo.com"
                className="text-sm text-gray-500 hover:text-blue-600 transition-colors flex items-center gap-2 mt-2"
              >
                <Mail className="w-4 h-4" />
                <span>service@apdojo.com</span>
              </a>
            </div>
          </div>
        </div>

        <div className="py-6 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-xs text-gray-500">© 2026 AP Dojo. All rights reserved.</p>
            <p className="text-xs text-gray-500 text-center sm:text-right max-w-xl">
              AP® and SAT® are trademarks registered by the College Board, which is not affiliated with, and does not endorse this website.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
