import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import CoffeeGDPCalculator from '@/components/interactiveGDPCalculator'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export default function GDPCalculatorPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Link 
        href="/interactive-tools" 
        className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold mb-8 group"
      >
        <ChevronLeft className="w-4 h-4 mr-1 transition-transform group-hover:-translate-x-1" />
        Return to Interactive Tools
      </Link>

      <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 text-center mb-8">
        Real vs. Nominal GDP Calculator
      </h1>

      <div className="max-w-3xl mx-auto mb-8 bg-white rounded-lg shadow-sm border p-6">
        <h2 className="text-xl font-bold mb-4">Using the Interactive Tool</h2>
        <p>In this simulator, you'll explore Coffee Land's economy:</p>
        <ol className="list-decimal list-inside ml-4 space-y-2 mt-2">
          <li>Use the <span className="font-semibold">Price slider</span> to simulate inflation or deflation</li>
          <li>Use the <span className="font-semibold">Quantity slider</span> to simulate changes in production</li>
          <li>Watch how these changes affect both Nominal and Real GDP differently</li>
          <li>Pay attention to the explanatory text that appears when you make changes</li>
        </ol>
      </div>
      
      <div className="max-w-3xl mx-auto mb-12">
        <Accordion type="single" collapsible className="bg-white rounded-lg shadow-sm border">
          <AccordionItem value="terms-and-formulas">
            <AccordionTrigger className="px-6 hover:no-underline">
              <span className="text-xl font-bold">Key Terms and Formulas</span>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-6">
              <Accordion type="single" collapsible className="border-none">
                <AccordionItem value="nominal-gdp">
                  <AccordionTrigger className="hover:no-underline text-lg">
                    <span className="font-semibold">Nominal GDP</span>
                  </AccordionTrigger>
                  <AccordionContent className="space-y-3 text-lg">
                    <p><span className="bg-yellow-500/20 font-semibold">Nominal GDP</span> measures the total value of all final goods and services in current prices. It can change due to:</p>
                    <ul className="list-disc list-inside ml-4">
                      <li>Changes in price levels (inflation/deflation)</li>
                      <li>Changes in output (production)</li>
                      <li>A combination of both</li>
                    </ul>
                    <div className="bg-gray-50 p-3 rounded-md font-mono text-base">
                      Nominal GDP = Current Year Prices × Current Year Quantities
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="real-gdp">
                  <AccordionTrigger className="hover:no-underline text-lg">
                    <span className="font-semibold">Real GDP</span>
                  </AccordionTrigger>
                  <AccordionContent className="space-y-3 text-lg">
                    <p><span className="bg-yellow-500/20 font-semibold">Real GDP</span> measures the total value of all final goods and services in constant (base year) prices. It only changes due to:</p>
                    <ul className="list-disc list-inside ml-4">
                      <li>Changes in output (production)</li>
                    </ul>
                    <div className="bg-gray-50 p-3 rounded-md font-mono text-base">
                      Real GDP = Base Year Prices × Current Year Quantities
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <div className="max-w-4xl mx-auto">
        <CoffeeGDPCalculator />
      </div>
    </div>
  )
} 