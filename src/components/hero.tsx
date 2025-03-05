import Link from 'next/link'
import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <section className="py-20 text-center max-w-3xl mx-auto relative">
      <h1 className="text-6xl font-extrabold tracking-tight drop-shadow-sm leading-tight">
        Take a Free {' '}
        <span className="text-blue-500">
        AP Macro
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