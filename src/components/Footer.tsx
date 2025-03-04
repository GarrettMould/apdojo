import Image from 'next/image'

export function Footer() {
  return (
    <footer className="border-t">
      <div className="max-w-6xl mx-auto px-4 py-8 flex items-center justify-between">
        {/* Logo */}
        <div className="w-32">
          {/* Placeholder logo - replace with your actual logo */}
          <div className="w-full h-12 bg-gray-200 rounded flex items-center justify-center text-gray-500">
            Logo
          </div>
        </div>

        {/* Copyright and Trademark Notice */}
        <div className="text-xs text-gray-500 max-w-xl text-right">
          <p className="mb-1">© 2024 AP Dojo. All rights reserved.</p>
          <p>
            AP® and SAT® are trademarks registered by the College Board, which is not affiliated with, and does not endorse this website.
          </p>
        </div>
      </div>
    </footer>
  )
} 