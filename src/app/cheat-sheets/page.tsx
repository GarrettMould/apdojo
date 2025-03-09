'use client';

import { useState } from 'react';
import { Download } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

type Unit = {
  number: number;
  title: string;
  pdfUrl: string;
}

const macroUnits: Unit[] = [
  { number: 1, title: "Basic Economic Concepts", pdfUrl: "/cheat-sheets/macro/AP_Dojo_Macro_U1.pdf" },
  { number: 2, title: "Economic Indicators and the Business Cycle", pdfUrl: "/cheat-sheets/macro/AP_Dojo_Macro_U2.pdf"},
  { number: 3, title: "National Income and Price Determination", pdfUrl: "/cheat-sheets/macro/AP_Dojo_Macro_U3.pdf" },
  { number: 4, title: "Financial Sector", pdfUrl: "/cheat-sheets/macro/AP_Dojo_Macro_U4.pdf" },
  { number: 5, title: "Long-Run Consequences of Stabilization Policies", pdfUrl: "/cheat-sheets/macro/AP_Dojo_Macro_U5.pdf" },
  { number: 6, title: "Open Economy—International Trade and Finance", pdfUrl: "/cheat-sheets/macro/AP_Dojo_Macro_U6.pdf" },
];

const microUnits: Unit[] = [
  { number: 1, title: "Basic Economic Concepts", pdfUrl: "/cheat-sheets/micro/AP_Dojo_Micro_U1.pdf" },
  { number: 2, title: "Supply and Demand", pdfUrl: "/cheat-sheets/micro/AP_Dojo_Micro_U2.pdf" },
  { number: 3, title: "Production, Cost, and the Perfect Competition Model", pdfUrl: "/cheat-sheets/micro/AP_Dojo_Micro_U3.pdf" },
  { number: 4, title: "Imperfect Competition", pdfUrl: "/cheat-sheets/micro/AP_Dojo_Micro_U4.pdf" },
  { number: 5, title: "Factor Markets", pdfUrl: "/cheat-sheets/micro/AP_Dojo_Micro_U5.pdf" },
  { number: 6, title: "Market Failure and the Role of Government", pdfUrl: "/cheat-sheets/micro/AP_Dojo_Micro_U6.pdf" },
];

export default function CheatSheetsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 mt-12">
      <h1 className="text-5xl font-extrabold tracking-tight text-gray-900 text-center mb-6">
        Unit Cheat Sheets
      </h1>
      
      <p className="text-xl text-gray-600 text-center mb-12">
        These Unit Cheat Sheets cover key terms, formulas, and graphs needed to master your AP economics exam.
      </p>

      <Tabs defaultValue="macro" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8 h-12">
          <TabsTrigger 
            value="macro" 
            className="text-lg font-bold w-full h-full flex items-center justify-center
              data-[state=active]:bg-blue-600 data-[state=active]:text-white
              data-[state=inactive]:bg-gray-100"
          >
            AP Macroeconomics
          </TabsTrigger>
          <TabsTrigger 
            value="micro" 
            className="text-lg font-bold w-full h-full flex items-center justify-center
              data-[state=active]:bg-blue-600 data-[state=active]:text-white
              data-[state=inactive]:bg-gray-100"
          >
            AP Microeconomics
          </TabsTrigger>
        </TabsList>

        <TabsContent value="macro">
          <div className="space-y-4">
            {macroUnits.map((unit) => (
              <div 
                key={unit.number}
                className="flex items-center justify-between p-4 bg-white rounded-lg border hover:shadow-md transition-shadow"
              >
                <div className="text-lg">
                  <span className="font-bold text-blue-600">Unit {unit.number}:</span>
                  <span className="ml-2 font-medium">{unit.title}</span>
                </div>
                <button 
                  onClick={() => window.open(unit.pdfUrl, '_blank')}
                  className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
                  title={`Download Unit ${unit.number} Cheat Sheet`}
                >
                  <Download className="w-6 h-6" />
                </button>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="micro">
          <div className="space-y-4">
            {microUnits.map((unit) => (
              <div 
                key={unit.number}
                className="flex items-center justify-between p-4 bg-white rounded-lg border hover:shadow-md transition-shadow"
              >
                <div className="text-lg">
                  <span className="font-bold text-blue-600">Unit {unit.number}:</span>
                  <span className="ml-2 font-medium">{unit.title}</span>
                </div>
                <button 
                  onClick={() => window.open(unit.pdfUrl, '_blank')}
                  className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
                  title={`Download Unit ${unit.number} Cheat Sheet`}
                >
                  <Download className="w-6 h-6" />
                </button>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
} 