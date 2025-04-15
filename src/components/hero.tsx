'use client';

import Link from 'next/link'
import logo from '../../public/logo.png'
import { Button } from "@/components/ui/button"
import { useAuthContext } from '@/contexts/AuthContext'
import { ChevronDown } from 'lucide-react'

export function Hero() {
  const { user } = useAuthContext();

  // Uncommented handleScrollDown for original layout
  const handleScrollDown = () => {
    const heroSection = document.querySelector('section');
    if (heroSection) {
      const scrollDistance = heroSection.offsetTop + heroSection.offsetHeight;
      window.scrollTo({
        top: scrollDistance,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="text-center flex flex-col items-center py-16 md:py-24"> {/* Restored original padding/centering */}
      {/* Original Content - Now Active */}
      <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight text-gray-900 leading-[1.3] whitespace-pre-line">
        {`Crush your`}
        <span className="text-blue-500">{`
        AP Econ Exam`}</span>
        {`
        with Smarter Study Tools`}
      </h1>
      <p className="text-base sm:text-lg md:text-xl text-gray-600 mt-4 md:mt-6 font-medium max-w-3xl mx-auto"> {/* Added max-width and margin for centering */}
        Access all the resources you need to ace your AP economics exam, including{' '}
        <span className="text-blue-500 font-semibold">full-length practice exams</span>,{' '}
        <span className="text-blue-500 font-semibold">AI tutor help</span>, expert{' '}
        <span className="text-blue-500 font-semibold">video explanations</span> with comprehension checks, and detailed{' '}
        <span className="text-blue-500 font-semibold">unit cheat sheets</span>
      </p>
      
      {user ? (
        <button 
          onClick={handleScrollDown}
          className="mt-8 md:mt-10 focus:outline-none cursor-pointer"
          aria-label="Scroll to next section"
        >
          <div className="flex flex-col items-center">
            <ChevronDown className="w-6 h-6 md:w-8 md:h-8 text-blue-500" />
            <ChevronDown className="w-6 h-6 md:w-8 md:h-8 text-blue-500 -mt-3 md:-mt-4" />
          </div>
        </button>
      ) : (
        <Link 
          href="/signup"
          className="inline-block px-6 sm:px-8 py-2.5 sm:py-3 mt-8 md:mt-10 text-base sm:text-lg font-bold text-white bg-blue-500 rounded-md hover:bg-blue-600 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Join AP Dojo (It's Free)
        </Link>
      )}

      {/* Two-Column Layout - Now Commented Out */}
      {/*
      <div className="w-full md:w-1/2 bg-blue-100 flex items-center justify-center p-8 cursor-pointer hover:bg-blue-200 transition-colors duration-300">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-blue-800 mb-4">
            AP Macroeconomics
          </h2>
          <p className="text-lg text-blue-700 mb-6">
            Explore fiscal policy, monetary policy, inflation, unemployment, and more.
          </p>
          <span className="text-blue-600 font-semibold">Enter Course &rarr;</span>
        </div>
      </div>

      <div className="w-full md:w-1/2 bg-green-100 flex items-center justify-center p-8 cursor-pointer hover:bg-green-200 transition-colors duration-300">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-green-800 mb-4">
            AP Microeconomics
          </h2>
          <p className="text-lg text-green-700 mb-6">
            Dive into supply and demand, market structures, factor markets, and market failures.
          </p>
          <span className="text-green-600 font-semibold">Enter Course &rarr;</span>
        </div>
      </div>
      */}
    </section>
  )
} 