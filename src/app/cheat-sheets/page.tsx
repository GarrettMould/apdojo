'use client';

import { Download, Eye, Folder, Loader2 } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';
import heroBG from "../../../public/images/heroBG.png"
import { useAuthContext } from '@/contexts/AuthContext';
import { LoginModal, SignupModal } from '@/components/AuthModals';
import { useRouter } from 'next/navigation';
import AP_Macro_Graphs from "../../../public/cheat-sheets/macro/AP_Dojo_Macro_Graphs_TN.png"
import { macroUnits as allMacroUnits, microUnits as allMicroUnits, Unit } from '@/data/cheatSheets';

type FeaturedSheet = {
  title: string;
  description: string;
  pdfUrl: string;
  subject: 'macro' | 'micro';
}

const featuredSheet: FeaturedSheet = {
  title: "AP Macroeconomics Graph Bank",
  description: "",
  pdfUrl: "https://apdojovideos.s3.ap-southeast-2.amazonaws.com/AP_Dojo_Macro_Graphs.pdf",
  subject: 'macro'
};

export default function CheatSheetsPage() {
  const { user, userData, loadingUserData } = useAuthContext();
  const router = useRouter();
  const [selectedPdf, setSelectedPdf] = useState<string | null>(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);

  const selectedSubject = userData?.selectedSubject;

  const handleAction = (type: 'view' | 'download', unit: Unit) => {
    if (!user) {
      setShowLoginModal(true);
      return;
    }
    if (type === 'view') {
      const subjectSlug = unit.subject === 'macro' ? 'macroeconomics' : 'microeconomics';
      const slug = `AP-${subjectSlug}-unit-${unit.number}`;
      window.location.href = `/study-guides/${slug}`;
    } else {
      window.open(unit.pdfUrl, '_blank');
    }
  };

  const handleAuthSuccess = () => {
    setShowLoginModal(false);
    setShowSignupModal(false);
    router.refresh();
  };

  if (loadingUserData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    );
  }

  if (!selectedSubject) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center p-4">
        <div>
          <h1 className="text-2xl font-semibold mb-4">Select Your Subject</h1>
          <p className="text-gray-600 mb-6">
            Please select your primary subject on the homepage to view relevant cheat sheets.
          </p>
          <Link href="/userHomePage" className="text-blue-600 hover:underline">
            Go to Homepage
          </Link>
        </div>
      </div>
    );
  }

  const unitsToDisplay = selectedSubject === 'macro' ? allMacroUnits : allMicroUnits;
  const pageTitleSubject = selectedSubject === 'macro' ? 'Macroeconomics' : 'Microeconomics';

  const AP_Macro_Graphs = selectedSubject === 'macro' 
    ? require("../../../public/cheat-sheets/macro/AP_Dojo_Macro_Graphs_TN.png").default
    : null;

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 mt-12">
      <LoginModal 
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        switchToSignup={() => {
          setShowLoginModal(false);
          setShowSignupModal(true);
        }}
        onAuthSuccess={handleAuthSuccess}
      />

      <SignupModal
        isOpen={showSignupModal}
        onClose={() => setShowSignupModal(false)}
        switchToLogin={() => {
          setShowSignupModal(false);
          setShowLoginModal(true);
        }}
        onAuthSuccess={handleAuthSuccess}
      />

      <h1 className="text-5xl font-extrabold tracking-tight text-gray-900 text-center mb-6">
        AP {pageTitleSubject} Unit <span className={selectedSubject === 'macro' ? "text-blue-500" : "text-green-500"}>Cheat Sheets</span>
      </h1>
      
      <p className="text-xl text-gray-600 text-center mb-16">
        Key terms, formulas, and graphs for AP {pageTitleSubject}.
      </p>

      {selectedSubject === 'macro' && (
        <div className="mb-16">
          <h2 className="text-2xl font-extrabold text-gray-900 mb-6">
            AP Macroeconomics
          </h2>
          <div className="space-y-3">
            {unitsToDisplay.map((unit: Unit) => (
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
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => handleAction('view', unit)}
                    className="p-2 text-gray-500 hover:text-blue-600 transition-colors flex-shrink-0"
                    title={`View Unit ${unit.number} Study Guide`}
                  >
                    <Eye className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={() => handleAction('download', unit)}
                    className="p-2 text-gray-500 hover:text-blue-600 transition-colors flex-shrink-0"
                    title={`Download Unit ${unit.number} Study Guide`}
                  >
                    <Download className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          {AP_Macro_Graphs && (
            <div className="mt-8 bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
              <div className="p-6">
                <h3 className="text-2xl font-extrabold text-gray-900 mb-3">
                  {featuredSheet.title}
                </h3>
                <div className="space-y-6">
                  <div className="aspect-[1.414/1] bg-gray-50 rounded-lg overflow-hidden shadow-md">
                    <img
                      src={AP_Macro_Graphs.src}
                      alt="Graph Bank Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <button
                    onClick={() => handleAction('download', {
                      ...featuredSheet,
                      number: 0
                    })}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    <Download className="w-5 h-5" strokeWidth={2.5} />
                    <span className="font-semibold">Download PDF</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {selectedSubject === 'micro' && (
        <div className="mb-16">
          <h2 className="text-2xl font-extrabold text-gray-900 mb-6">
            AP Microeconomics
          </h2>
          <div className="space-y-3">
            {unitsToDisplay.map((unit: Unit) => (
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
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => handleAction('view', unit)}
                    className="p-2 text-gray-500 hover:text-green-600 transition-colors flex-shrink-0"
                    title={`View Unit ${unit.number} Study Guide`}
                  >
                    <Eye className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={() => handleAction('download', unit)}
                    className="p-2 text-gray-500 hover:text-green-600 transition-colors flex-shrink-0"
                    title={`Download Unit ${unit.number} Study Guide`}
                  >
                    <Download className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedPdf && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-5xl h-[90vh] flex flex-col">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="font-bold text-lg">Cheat Sheet Preview</h3>
              <button 
                onClick={() => setSelectedPdf(null)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                ✕
              </button>
            </div>
            <div className="flex-1 w-full h-full">
              <iframe
                src={`${selectedPdf}#view=FitH`}
                className="w-full h-full"
                title="PDF Preview"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 
           