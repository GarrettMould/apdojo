'use client';

import { useParams } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const guides = {
  'macro-1': {
    title: "Basic Economic Concepts",
    pdfUrl: "/cheat-sheets/macro/AP_Dojo_Macro_U1.pdf",
    subject: "Macroeconomics",
    unitNumber: 1
  },
  'macro-2': {
    title: "Economic Indicators and the Business Cycle",
    pdfUrl: "/cheat-sheets/macro/AP_Dojo_Macro_U2.pdf",
    subject: "Macroeconomics",
    unitNumber: 2
  },
  'macro-3': {
    title: "National Income and Price Determination",
    pdfUrl: "/cheat-sheets/macro/AP_Dojo_Macro_U3.pdf",
    subject: "Macroeconomics",
    unitNumber: 3
  },
  'macro-4': {
    title: "Financial Sector",
    pdfUrl: "/cheat-sheets/macro/AP_Dojo_Macro_U4.pdf",
    subject: "Macroeconomics",
    unitNumber: 4
  },
  'macro-5': {
    title: "Long-Run Consequences of Stabilization Policies",
    pdfUrl: "/cheat-sheets/macro/AP_Dojo_Macro_U5.pdf",
    subject: "Macroeconomics",
    unitNumber: 5
  },
  'macro-6': {
    title: "Open Economy—International Trade and Finance",
    pdfUrl: "/cheat-sheets/macro/AP_Dojo_Macro_U6.pdf",
    subject: "Macroeconomics",
    unitNumber: 6
  },
  'micro-1': {
    title: "Basic Economic Concepts",
    pdfUrl: "/cheat-sheets/micro/AP_Dojo_Micro_U1.pdf",
    subject: "Microeconomics",
    unitNumber: 1
  },
  'micro-2': {
    title: "Supply and Demand",
    pdfUrl: "/cheat-sheets/micro/AP_Dojo_Micro_U2.pdf",
    subject: "Microeconomics",
    unitNumber: 2
  },
  'micro-3': {
    title: "Production, Cost, and the Perfect Competition Model",
    pdfUrl: "/cheat-sheets/micro/AP_Dojo_Micro_U3.pdf",
    subject: "Microeconomics",
    unitNumber: 3
  },
  'micro-4': {
    title: "Imperfect Competition",
    pdfUrl: "/cheat-sheets/micro/AP_Dojo_Micro_U4.pdf",
    subject: "Microeconomics",
    unitNumber: 4
  },
  'micro-5': {
    title: "Factor Markets",
    pdfUrl: "/cheat-sheets/micro/AP_Dojo_Micro_U5.pdf",
    subject: "Microeconomics",
    unitNumber: 5
  },
  'micro-6': {
    title: "Market Failure and the Role of Government",
    pdfUrl: "/cheat-sheets/micro/AP_Dojo_Micro_U6.pdf",
    subject: "Microeconomics",
    unitNumber: 6
  }
};

export default function StudyGuidePage() {
  const params = useParams();
  const guideId = params.unit as string;
  const guide = guides[guideId as keyof typeof guides];

  if (!guide) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Study Guide Not Found</h1>
          <Link href="/cheat-sheets" className="text-blue-500 hover:text-blue-600">
            Return to Study Guides
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col pt-8 pb-12">
      {/* Header Section */}
      <div className="max-w-6xl mx-auto px-4 w-full mb-6">
        <div className="flex items-center gap-4">
          <Link 
            href="/cheat-sheets" 
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">
              <span className="text-blue-500">AP {guide.subject}</span> Unit {guide.unitNumber}
            </h1>
            <p className="text-xl text-gray-600 mt-2">{guide.title}</p>
          </div>
        </div>
      </div>

      {/* PDF Viewer Container */}
      <div className="flex-1 bg-gray-50 rounded-lg shadow-lg border border-gray-200 max-w-6xl mx-auto w-full mb-8">
        <iframe
          src={`${guide.pdfUrl}#view=FitH`}
          className="w-full h-[calc(100vh-180px)] rounded-lg"
          title={`Unit ${guide.unitNumber} Study Guide`}
        />
      </div>
    </div>
  );
} 