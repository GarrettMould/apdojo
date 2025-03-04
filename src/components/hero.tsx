import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { useState, useEffect } from 'react'
import SVG1 from '../../public/images/SVG1.svg'
import SVG2 from '../../public/images/SVG2.svg'
import SVG3 from '../../public/images/SVG3.svg'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

export function Hero() {
  const [isMacro, setIsMacro] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsMacro(prev => !prev)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="py-20 text-center max-w-3xl mx-auto relative">
     
      
      <h1 className="text-6xl font-bold">
        Take a Free AP{' '}
        <span className="relative inline-block w-32">
          <AnimatePresence mode="wait">
            <motion.span
              key={isMacro ? 'macro' : 'micro'}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className={`absolute ${isMacro ? 'text-blue-500' : 'text-green-500'}`}
            >
              {isMacro ? 'Macro' : 'Micro'}
            </motion.span>
          </AnimatePresence>
        </span>{' '}
        Diagnostic Test
      </h1>
      <p className="text-xl text-gray-600 mt-6">
        Find your weak spots and get a customized study plan in minutes
      </p>
      <Button 
        asChild
        size="xl"
        className="mt-10"
      >
        <Link href="/diagnostic">
          Take Diagnostic Quiz
        </Link>
      </Button>
    </section>
  )
} 