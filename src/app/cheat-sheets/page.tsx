'use client';

import { Download, Folder } from 'lucide-react';

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
    <div className="max-w-3xl mx-auto px-4 py-12 mt-12">
      <h1 className="text-5xl font-extrabold tracking-tight text-gray-900 text-center mb-6">
        Unit Cheat Sheets
      </h1>
      
      <p className="text-xl text-gray-600 text-center mb-16">
        These Unit Cheat Sheets cover key terms, formulas, and graphs needed to master your AP economics exam.
      </p>

      {/* Macro Section */}
      <div className="mb-16">
        <h2 className="text-2xl font-extrabold text-gray-900 mb-6">
          AP Macroeconomics
        </h2>
        <div className="space-y-3">
          {macroUnits.map((unit) => (
            <div 
              key={unit.number}
              className="flex items-center justify-between p-4 min-h-[4.5rem] bg-white border border-gray-200 rounded-lg hover:border-blue-500 transition-colors duration-200"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-gray-100/80 flex items-center justify-center flex-shrink-0">
                  <Folder className="w-4 h-4 text-blue-500" fill="currentColor" />
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                  <span className="text-sm font-bold text-blue-500 whitespace-nowrap">Unit {unit.number}</span>
                  <span className="text-sm font-bold text-gray-900">{unit.title}</span>
                </div>
              </div>
              <button 
                onClick={() => window.open(unit.pdfUrl, '_blank')}
                className="p-2 text-gray-500 hover:text-blue-600 transition-colors flex-shrink-0"
                title={`Download Unit ${unit.number} Cheat Sheet`}
              >
                <Download className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Micro Section */}
      <div>
        <h2 className="text-2xl font-extrabold text-gray-900 mb-6">
          AP Microeconomics
        </h2>
        <div className="space-y-3">
          {microUnits.map((unit) => (
            <div 
              key={unit.number}
              className="flex items-center justify-between p-4 min-h-[4.5rem] bg-white border border-gray-200 rounded-lg hover:border-green-500 transition-colors duration-200"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-gray-100/80 flex items-center justify-center flex-shrink-0">
                  <Folder className="w-4 h-4 text-green-500" fill="currentColor" />
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                  <span className="text-sm font-bold text-green-500 whitespace-nowrap">Unit {unit.number}</span>
                  <span className="text-sm font-bold text-gray-900">{unit.title}</span>
                </div>
              </div>
              <button 
                onClick={() => window.open(unit.pdfUrl, '_blank')}
                className="p-2 text-gray-500 hover:text-green-600 transition-colors flex-shrink-0"
                title={`Download Unit ${unit.number} Cheat Sheet`}
              >
                <Download className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 