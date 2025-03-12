'use client';

import { Download } from 'lucide-react';

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
    <div className="max-w-6xl mx-auto px-4 py-12 mt-12">
      <h1 className="text-5xl font-extrabold tracking-tight text-gray-900 text-center mb-6">
        Unit Cheat Sheets
      </h1>
      
      <p className="text-xl text-gray-600 text-center mb-12">
        These Unit Cheat Sheets cover key terms, formulas, and graphs needed to master your AP economics exam.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Macro Section */}
        <div>
          <h2 className="text-3xl font-extrabold text-blue-600 mb-6 text-center">
            AP Macroeconomics
          </h2>
          <div className="space-y-4">
            {macroUnits.map((unit) => (
              <div 
                key={unit.number}
                className="group flex bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-200 h-24"
              >
                <div className="w-20 bg-gradient-to-br from-blue-500/80 to-blue-700/90 flex items-center justify-center">
                  <span className="text-white text-3xl font-bold">
                    {unit.number}
                  </span>
                </div>
                <div className="flex-1 p-6">
                  <div className="flex h-full items-center justify-between gap-4">
                    <div>
                      <h3 className="font-bold text-gray-900 text-lg leading-tight max-w-[300px]">
                        {unit.title}
                      </h3>
                      <div className="text-sm text-gray-500 mt-1">
                        Key concepts, graphs, and formulas
                      </div>
                    </div>
                    <button 
                      onClick={() => window.open(unit.pdfUrl, '_blank')}
                      className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-lg bg-gray-50 text-gray-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-200"
                      title={`Download Unit ${unit.number} Cheat Sheet`}
                    >
                      <Download className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Micro Section */}
        <div>
          <h2 className="text-3xl font-extrabold text-green-600 mb-6 text-center">
            AP Microeconomics
          </h2>
          <div className="space-y-4">
            {microUnits.map((unit) => (
              <div 
                key={unit.number}
                className="group flex bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-200 h-24"
              >
                <div className="w-20 bg-gradient-to-br from-green-500/80 to-green-700/90 flex items-center justify-center">
                  <span className="text-white text-3xl font-bold">
                    {unit.number}
                  </span>
                </div>
                <div className="flex-1 p-6">
                  <div className="flex h-full items-center justify-between gap-4">
                    <div>
                      <h3 className="font-bold text-gray-900 text-lg leading-tight max-w-[300px]">
                        {unit.title}
                      </h3>
                      <div className="text-sm text-gray-500 mt-1">
                        Key concepts, graphs, and formulas
                      </div>
                    </div>
                    <button 
                      onClick={() => window.open(unit.pdfUrl, '_blank')}
                      className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-lg bg-gray-50 text-gray-600 group-hover:bg-green-600 group-hover:text-white transition-all duration-200"
                      title={`Download Unit ${unit.number} Cheat Sheet`}
                    >
                      <Download className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 