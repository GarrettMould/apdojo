'use client';

import Link from 'next/link'
import logo from '../../public/logo.png'
import { Button } from "@/components/ui/button"
import { useAuthContext } from '@/contexts/AuthContext'
import heroBG from "../../public/images/heroBG.png"
import { ChevronDown } from 'lucide-react'
import Image from 'next/image';

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
    <div className="flex flex-col items-center">
      {/* Heading Section - Wider width to match heroBG */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 md:pt-20 pb-8 text-center">
        <h1 className="text-[2.5rem] sm:text-[3.5rem] md:text-[5rem] font-extrabold tracking-tight leading-none">
          <span style={{ textShadow: '0 0 15px rgba(59, 130, 246, 0.8)' }} className="text-blue-500">
            Smarter
          </span>{' '}
          Study Tools
        </h1>
      </div>

      {/* Button Section - Narrower width */}
      <div className="max-w-4xl w-full mx-auto px-4 sm:px-6">
        <div className="rounded-lg">
          <Button 
            asChild
            size="lg"
            className="w-full shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5 py-6 sm:py-7 md:py-8 text-lg sm:text-xl font-bold text-white"
            style={{
              background: 'linear-gradient(135deg, rgb(59, 130, 246) 0%, rgba(59, 130, 246, 0.7) 100%)',
            }}
          >
            <Link href="/unitMCQPracticePage?subject=macro"> 
              Try MCQ Cram Mode
            </Link>
          </Button>
        </div>
      </div>

      {/* Background Image Section - Full height, initially showing top portion */}
      <div className="max-w-4xl w-full mx-auto mt-6 sm:mt-8">
        <div 
          className="w-full bg-contain bg-top bg-no-repeat"
          style={{ 
            backgroundImage: `url(${heroBG.src})`,
            height: '120vh',
            marginBottom: '-80vh'
          }}
        />
      </div>
    </div>
  )
} 