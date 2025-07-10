"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronDown, ChevronRight, ChevronLeft, BookOpen } from "lucide-react";
import { videos as allVideos } from '@/data/videos';
import { keyTerms, KeyTerm } from '@/data/allContent';
import { useAuthContext } from '@/contexts/AuthContext';
import { LoginModal, SignupModal, SelectPlanModal } from '@/components/AuthModals';

// Helper function to sort lesson IDs like "1.1", "1.10", "2.1"
const sortLessonIDs = (a: string, b: string): number => {
  const partsA = a.split('.').map(Number);
  const partsB = b.split('.').map(Number);
  if (partsA[0] !== partsB[0]) {
    return partsA[0] - partsB[0]; // Sort by unit first
  }
  return (partsA[1] || 0) - (partsB[1] || 0); // Then sort by lesson number
};

// --- Flashcard Component ---
interface FlashcardProps {
  terms: KeyTerm[];
}

function Flashcard({ terms }: FlashcardProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [hasFlippedOnce, setHasFlippedOnce] = useState(false);

  const currentTerm = terms[currentIndex];

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFlipped(false);
    setCurrentIndex(prev => (prev === terms.length - 1 ? 0 : prev + 1));
  };

  const handlePrevious = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFlipped(false);
    setCurrentIndex(prev => (prev === 0 ? terms.length - 1 : prev - 1));
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
    if (!hasFlippedOnce) {
      setHasFlippedOnce(true);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto text-center flex items-center justify-center gap-4">
      {/* Previous Button - Outside card */}
      {terms.length > 1 && (
        <button 
          onClick={handlePrevious} 
          className="p-3 bg-gray-200/60 hover:bg-gray-300/80 text-gray-800 rounded-full transition-colors duration-200 focus:outline-none shadow-md flex-shrink-0"
          aria-label="Previous term"
        >
          <ChevronLeft className="w-8 h-8" />
        </button>
      )}
      
      <div className="relative flex-1 min-w-0">
        <div 
          className="relative w-full h-80 cursor-pointer shadow-md hover:shadow-lg rounded-lg overflow-hidden border border-gray-200 hover:border-blue-400 transition-all duration-200"
          onClick={handleFlip}
        >
          {!isFlipped ? (
            // Front of card
            <div className="absolute inset-0 w-full h-full bg-white flex items-center justify-center p-6">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  {currentTerm.term}
                </h3>
                {!hasFlippedOnce && (
                  <p className="text-gray-500 text-sm">Click to reveal definition</p>
                )}
              </div>
            </div>
          ) : (
            // Back of card
            <div className="absolute inset-0 w-full h-full bg-blue-50 flex items-center justify-center p-6">
              <div className="text-center">
                <p className="text-lg text-gray-700 leading-relaxed">{currentTerm.definition}</p>
              </div>
            </div>
          )}
        </div>
        
        {/* Counter at bottom */}
        <div className="mt-4 text-center">
          <span className="text-sm text-gray-500">
            {currentIndex + 1} of {terms.length}
          </span>
        </div>
      </div>
      
      {/* Next Button - Outside card */}
      {terms.length > 1 && (
        <button 
          onClick={handleNext} 
          className="p-3 bg-gray-200/60 hover:bg-gray-300/80 text-gray-800 rounded-full transition-colors duration-200 focus:outline-none shadow-md flex-shrink-0"
          aria-label="Next term"
        >
          <ChevronRight className="w-8 h-8" />
        </button>
      )}
    </div>
  );
}

// --- TermCard Component ---
interface TermCardProps {
  term: KeyTerm;
  isFirst?: boolean;
}

function TermCard({ term, isFirst = false }: TermCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasAdditionalContent = term.subNotes || term.image;

  // Auto-expand first term after a delay for tutorial effect
  useEffect(() => {
    if (isFirst && hasAdditionalContent) {
      const timer = setTimeout(() => {
        setIsExpanded(true);
      }, 1500); // 1.5 second delay
      
      return () => clearTimeout(timer);
    }
  }, [isFirst, hasAdditionalContent]);

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 p-4 hover:border-blue-300 hover:shadow-blue-100/50 group">
      <div className="relative">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h5 
              className="text-lg font-bold text-gray-900 mb-2"
            >
              {term.term}
            </h5>
            <p className="text-gray-700 leading-relaxed text-sm">
              {term.definition}
            </p>
          </div>
          <div className="flex items-center gap-2">
            {hasAdditionalContent && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="p-1 text-gray-400 hover:text-blue-600 transition-colors duration-200"
                title={isExpanded ? "Collapse" : "Expand"}
              >
                <ChevronDown 
                  className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} 
                />
              </button>
            )}
          </div>
        </div>

        {/* Expandable Content */}
        {hasAdditionalContent && (
          <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
            isExpanded ? 'max-h-[800px] opacity-100 mt-4' : 'max-h-0 opacity-0'
          }`}>
            <div className="border-t border-gray-100 pt-4 space-y-4">
              
              {/* SubNotes */}
              {term.subNotes && term.subNotes.length > 0 && (
                <div>
                  <h6 className="text-sm font-semibold text-gray-800 mb-2">Key Points:</h6>
                  <ul className="space-y-1">
                    {term.subNotes.map((note, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                        <span>{note}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Image */}
              {term.image && (
                <div>
                  <h6 className="text-sm font-semibold text-gray-800 mb-2">Visual Aid:</h6>
                  <div className="relative group">
                    <img
                      src={term.image.url}
                      alt={term.image.alt}
                      className="w-full max-w-md rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 object-contain"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

interface UnitPageProps {
  params: { unitId: string };
}

export default function UnitLandingPage({ params }: UnitPageProps) {
  const unitId = params.unitId;
  const unitIdNum = parseInt(unitId, 10);
  const router = useRouter();
  const [isFlashcardMode, setIsFlashcardMode] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showSelectPlanModal, setShowSelectPlanModal] = useState(false);
  const [pendingUnit, setPendingUnit] = useState<number | null>(null);

  const { user } = useAuthContext();

  // Filter and sort AP Macro Unit 1 videos
  const macroUnitVideos = allVideos
    .filter(v => v.unit === '1' && v.subjects.includes('AP Macroeconomics'))
    .sort((a, b) => {
      const aLesson = a.lessonIDS[0] ? parseFloat(a.lessonIDS[0]) : 0;
      const bLesson = b.lessonIDS[0] ? parseFloat(b.lessonIDS[0]) : 0;
      return aLesson - bLesson;
    });

  // Filter and sort AP Micro Unit 1 videos (for future use)
  const microUnitVideos = allVideos
    .filter(v => v.unit === '1' && v.subjects.includes('AP Microeconomics'))
    .sort((a, b) => {
      const aLesson = a.lessonIDS[0] ? parseFloat(a.lessonIDS[0]) : 0;
      const bLesson = b.lessonIDS[0] ? parseFloat(b.lessonIDS[0]) : 0;
      return aLesson - bLesson;
    });

  // Get Unit 1 terms from allContent.ts
  const unit1Terms = keyTerms.filter(term => 
    term.unit === 1 && term.subject === 'ap_macroeconomics'
  ).sort((a, b) => {
    // Sort by first lessonID
    const aLesson = a.lessonIDs[0] ? parseFloat(a.lessonIDs[0]) : 0;
    const bLesson = b.lessonIDs[0] ? parseFloat(b.lessonIDs[0]) : 0;
    return aLesson - bLesson;
  }).slice(0, 5); // Only show first 5 terms

  const handlePrev = () => {
    if (unitIdNum > 1) {
      if (unitIdNum === 2 || unitIdNum === 3 || user) {
        router.push(`/unit/${unitIdNum - 1}`);
      } else {
        setPendingUnit(unitIdNum - 1);
        setShowSelectPlanModal(true);
      }
    }
  };

  const handleNext = () => {
    if (unitIdNum === 2 || unitIdNum === 3 || user) {
      router.push(`/unit/${unitIdNum + 1}`);
    } else {
      setPendingUnit(unitIdNum + 1);
      setShowSelectPlanModal(true);
    }
  };

  const handleAuthSuccess = () => {
    setShowLoginModal(false);
    setShowSignupModal(false);
    setShowSelectPlanModal(false);
    if (pendingUnit !== null) {
      router.push(`/unit/${pendingUnit}`);
      setPendingUnit(null);
    }
  };

  return (
    <>
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => {
          setShowLoginModal(false);
          setPendingUnit(null);
        }}
        switchToSignup={() => {
          setShowLoginModal(false);
          setShowSelectPlanModal(false);
          setShowSignupModal(true);
        }}
        onAuthSuccess={handleAuthSuccess}
      />
      <SignupModal
        isOpen={showSignupModal}
        onClose={() => {
          setShowSignupModal(false);
          setPendingUnit(null);
        }}
        switchToLogin={() => {
          setShowSignupModal(false);
          setShowSelectPlanModal(false);
          setShowLoginModal(true);
        }}
        onAuthSuccess={handleAuthSuccess}
      />
      <SelectPlanModal
        isOpen={showSelectPlanModal}
        onClose={() => {
          setShowSelectPlanModal(false);
          setPendingUnit(null);
        }}
        switchToLogin={() => {
          setShowSelectPlanModal(false);
          setShowLoginModal(true);
        }}
        switchToSignup={() => {
          setShowSelectPlanModal(false);
          setShowSignupModal(true);
        }}
      />
      
      <div className="min-h-screen flex flex-col items-center justify-center py-8 px-2 relative">
        {/* Top Navigation */}
        <div className="flex items-center justify-center mb-8 w-full">
          {/* Always show Prev Unit button, but disable for Unit 1 */}
          <button
            onClick={unitIdNum === 1 ? undefined : handlePrev}
            className={`px-4 py-2 rounded-lg shadow font-bold border border-gray-200 transition mr-4 ${
              unitIdNum === 1
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed opacity-60'
                : 'bg-white hover:bg-blue-50 text-black'
            }`}
            disabled={unitIdNum === 1}
          >
            &larr; Prev Unit
          </button>
          <div className="flex flex-col items-center px-8 py-4 bg-transparent">
            <div className="text-4xl md:text-6xl font-extrabold tracking-tight text-gray-800">UNIT {unitId}</div>
            <div className="text-3xl font-bold text-black mt-6">Basic Economic Concepts</div>
          </div>
          <button
            onClick={handleNext}
            className="px-4 py-2 rounded-lg shadow font-bold bg-white border border-gray-200 hover:bg-blue-50 transition ml-4"
          >
            Next Unit &rarr;
          </button>
        </div>

        {/* Main Content Grid */}
        <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-4 gap-8 relative items-start">
          {/* Left: Videos Column (1/4) */}
          <div className="col-span-1 flex flex-col items-center">
            {/* Videos Column */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 flex flex-col items-center w-full">
              <div className="text-2xl font-bold text-blue-700 mb-4 w-full text-center">Videos</div>
              <div className="w-full flex flex-col items-center">
                {macroUnitVideos.map((video, idx) => (
                  <React.Fragment key={video.id}>
                    <Link href={`/videos/macro/${video.videoSlug}`} className="w-full group">
                      <div className={`flex flex-col items-center mb-2 last:mb-0 p-4 cursor-pointer transition-all duration-300 rounded-lg ${
                        idx === 0 ? 'bg-blue-50 hover:bg-blue-100 hover:shadow-lg hover:scale-105 border-2 border-blue-200 group-hover:bg-gray-50 group-hover:border-transparent group-hover:shadow-none group-hover:scale-100' : 'hover:bg-gray-50 border-2 border-transparent'
                      }`}>
                        <img
                          src={video.thumbnail || '/images/placeholder-thumb.png'}
                          alt={video.title}
                          className="w-40 h-24 object-cover rounded-lg shadow border border-gray-200 mb-2"
                        />
                        <div className="text-base font-semibold text-gray-800 text-center">{video.title}</div>
                      </div>
                    </Link>
                    {idx < macroUnitVideos.length - 1 && (
                      <div className="w-2 h-12 bg-blue-700 mx-auto mb-2"></div>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
          
          {/* Right: Terms Section (3/4) */}
          <div className="col-span-1 md:col-span-3 flex flex-col justify-center">
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 flex-1 w-full">
              <div className="flex items-center justify-between mb-6">
                <div className="text-2xl font-bold text-gray-800">Key Terms & Definitions</div>
                <Link 
                  href="/whiteboards"
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                >
                  Full Study Guide &rarr;
                </Link>
              </div>
              
              <div className="grid gap-4">
                {unit1Terms.map((term, index) => (
                  <TermCard
                    key={term.id}
                    term={term}
                    isFirst={index === 0}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 