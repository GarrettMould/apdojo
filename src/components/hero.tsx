'use client';

import Link from 'next/link'
import logo from '../../public/logo.png'
import { Button } from "@/components/ui/button"
import { useAuthContext } from '@/contexts/AuthContext'
import { ChevronDown } from 'lucide-react'

export function Hero() {
  const { user } = useAuthContext();

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
    <section className="text-center max-w-3xl mx-auto relative py-12 md:py-24 px-4 md:px-0" id="hero-section">
      <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight text-gray-900 leading-[1.3] whitespace-pre-line">
        {`Crush your`}
        <span className="text-blue-500">{`
        AP Econ Exam`}</span>
        {`
        with Smarter Study Tools`}
      </h1>
      <p className="text-base sm:text-lg md:text-xl text-gray-600 mt-4 md:mt-6 font-medium">
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
    </section>
  )
} 