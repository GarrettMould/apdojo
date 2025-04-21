'use client'
import { useState } from 'react'
import Link from 'next/link'
import { redirectToCheckout } from '@/lib/stripe'
import { useAuthContext } from '@/contexts/AuthContext'
import { LoginModal, SignupModal } from '@/components/AuthModals'
import { Lock, Loader2 } from 'lucide-react'

export default function PurchaseExams() {
  const { user, userData, loadingUserData } = useAuthContext();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [pendingExam, setPendingExam] = useState<{
    examType: 'macro' | 'micro';
    questionType: 'mcq' | 'frq';
    examNumber: string;
  } | null>(null);

  const selectedSubject = userData?.selectedSubject;

  // Handle Loading State
  if (loadingUserData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    );
  }

  // Handle No Subject Selected
  // Redirect or prompt if no subject is selected
  if (!selectedSubject) {
      // Option 1: Redirect (if you have a page for subject selection)
      // import { useRouter } from 'next/navigation';
      // const router = useRouter();
      // useEffect(() => { router.push('/select-subject'); }, [router]);
      // return <div className="min-h-screen flex items-center justify-center">Redirecting...</div>; 

      // Option 2: Show prompt message
      return (
         <div className="min-h-screen flex items-center justify-center text-center p-4">
           <div>
             <h1 className="text-2xl font-semibold mb-4">Select Your Subject</h1>
             <p className="text-gray-600 mb-6">
               Please select your primary subject on the homepage to see available practice exams.
             </p>
             <Link href="/userHomePage" className="text-blue-600 hover:underline">
               Go to Homepage
             </Link>
           </div>
         </div>
      );
  }

  const pageTitleSubject = selectedSubject === 'macro' ? 'Macroeconomics' : 'Microeconomics';

  const handleExamStart = (e: React.MouseEvent, examType: 'macro' | 'micro', questionType: 'mcq' | 'frq', examNumber: string) => {
    e.preventDefault();
    
    if (!user) {
      setPendingExam({ examType, questionType, examNumber });
      setShowLoginModal(true);
      return;
    }

    // If user is logged in, proceed to exam
    window.location.href = `/preview/${examType}/${questionType}/${examNumber}`;
  };

  const handleAuthSuccess = () => {
    if (pendingExam) {
      window.location.href = `/preview/${pendingExam.examType}/${pendingExam.questionType}/${pendingExam.examNumber}`;
      setPendingExam(null);
    }
  };

  return (
    <>
      <LoginModal 
        isOpen={showLoginModal}
        onClose={() => {
          setShowLoginModal(false);
          setPendingExam(null);
        }}
        switchToSignup={() => {
          setShowLoginModal(false);
          setShowSignupModal(true);
        }}
        onAuthSuccess={handleAuthSuccess}
      />

      <SignupModal
        isOpen={showSignupModal}
        onClose={() => {
          setShowSignupModal(false);
          setPendingExam(null);
        }}
        switchToLogin={() => {
          setShowSignupModal(false);
          setShowLoginModal(true);
        }}
        onAuthSuccess={handleAuthSuccess}
      />

      <div className="container max-w-4xl mx-auto px-4 py-16">
        
        {/* Header Section */}
        <div className="mb-16">
          <h1 className="text-6xl font-extrabold tracking-tight text-center leading-tight">
            Full-Length <br></br><span className={selectedSubject === 'macro' ? "text-blue-600" : "text-green-600"}>AP {pageTitleSubject}</span>
            <br />
            Practice Exams
          </h1>
          <p className="text-gray-600 text-center mt-4 text-lg max-w-2xl mx-auto">
            Comprehensive exam preparation for AP {pageTitleSubject}. Created by AP® Economics experts and veteran teachers.
          </p>
        </div>

        {/* Macro Section - Conditional */}
        {selectedSubject === 'macro' && (
          <div className="mb-16">
            {/* Macro MCQ Section */}
            <div className="mb-8">
              <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 backdrop-blur-sm border border-blue-200 rounded-md p-8">
                <div className="md:flex gap-12 block">
                  <div className="md:w-1/4 w-full mb-8 md:mb-0 text-center md:text-left">
                    <h3 className="text-2xl font-extrabold tracking-tight text-gray-900 mb-3">
                      AP Macro <br className="hidden md:inline" />MCQ Exams
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Prep for the AP Macroeconomics exam with full-length practice tests
                    </p>
                  </div>

                  <div className="md:flex-1">
                    <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
                      {[1, 2, 3].map((num) => (
                        <div 
                          key={`mcq-${num}`} 
                          className={`bg-white rounded-md shadow-sm border border-gray-100 overflow-hidden ${num > 1 ? 'opacity-75' : ''}`}
                        >
                          <div className="p-4">
                            <div className="flex items-center gap-2 mb-3">
                              <h4 className="text-lg font-bold text-gray-900">
                                Exam {num}
                              </h4>
                              {num > 1 && <Lock className="w-4 h-4 text-gray-400" />}
                            </div>
                            <div className="text-sm text-gray-500 mb-4">
                              60 questions • 70 minutes
                            </div>
                            <Link 
                              href="#"
                              onClick={(e) => num === 1 ? handleExamStart(e, 'macro', 'mcq', '1') : null}
                              className={`w-full px-4 py-2 rounded-md font-medium text-sm flex items-center justify-center gap-2 ${
                                num === 1 
                                  ? 'bg-blue-600 text-white hover:bg-blue-700 transition-colors' 
                                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                              }`}
                            >
                              Start Exam
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                              </svg>
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Macro FRQ Section */}
            <div className="mb-8">
              <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 backdrop-blur-sm border border-blue-200 rounded-md p-8">
                <div className="md:flex gap-12 block">
                  <div className="md:w-1/4 w-full mb-8 md:mb-0 text-center md:text-left">
                    <h3 className="text-2xl font-extrabold tracking-tight text-gray-900 mb-3">
                      AP Macro <br className="hidden md:inline" /> FRQ Exams
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Master free response questions with our practice sets
                    </p>
                  </div>

                  <div className="md:flex-1">
                    <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
                      {[1, 2, 3].map((num) => (
                        <div 
                          key={`frq-${num}`} 
                          className={`bg-white rounded-md shadow-sm border border-gray-100 overflow-hidden ${num > 1 ? 'opacity-75' : ''}`}
                        >
                          <div className="p-4 flex flex-col h-full">
                            <div>
                              <div className="flex items-center gap-2 mb-3">
                                <h4 className="text-lg font-bold text-gray-900">
                                  Exam {num}
                                </h4>
                                {num > 1 && <Lock className="w-4 h-4 text-gray-400" />}
                              </div>
                              <div className="text-sm text-gray-500 mb-3">
                                3 questions • 60 minutes
                              </div>
                              <div className="flex flex-wrap gap-1 mb-4">
                                {num === 1 && (
                                  <>
                                    <span className="px-2 py-0.5 bg-gray-100 rounded-sm text-xs text-gray-600">AD-AS Model</span>
                                    <span className="px-2 py-0.5 bg-gray-100 rounded-sm text-xs text-gray-600">Forex Market</span>
                                    <span className="px-2 py-0.5 bg-gray-100 rounded-sm text-xs text-gray-600">Phillips Curve</span>
                                  </>
                                )}
                                {num === 2 && (
                                  <>
                                    <span className="px-2 py-0.5 bg-gray-100 rounded-sm text-xs text-gray-600">Monetary Policy</span>
                                    <span className="px-2 py-0.5 bg-gray-100 rounded-sm text-xs text-gray-600">Int'l Trade</span>
                                    <span className="px-2 py-0.5 bg-gray-100 rounded-sm text-xs text-gray-600">Phillips Curve</span>
                                  </>
                                )}
                                {num === 3 && (
                                  <>
                                    <span className="px-2 py-0.5 bg-gray-100 rounded-sm text-xs text-gray-600">Fiscal Policy</span>
                                    <span className="px-2 py-0.5 bg-gray-100 rounded-sm text-xs text-gray-600">Growth</span>
                                    <span className="px-2 py-0.5 bg-gray-100 rounded-sm text-xs text-gray-600">Financial Markets</span>
                                  </>
                                )}
                              </div>
                            </div>
                            <div className="mt-auto">
                              <Link 
                                href="#"
                                onClick={(e) => num === 1 ? handleExamStart(e, 'macro', 'frq', '1') : null}
                                className={`w-full px-4 py-2 rounded-md font-medium text-sm flex items-center justify-center gap-2 ${
                                  num === 1 
                                    ? 'bg-blue-600 text-white hover:bg-blue-700 transition-colors' 
                                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                }`}
                              >
                                Start Exam
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                              </Link>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Micro Section - Conditional */}
        {selectedSubject === 'micro' && (
          <div className="mb-16">
            {/* Micro MCQ Section */}
            <div className="mb-8">
              <div className="bg-gradient-to-br from-green-500/10 to-green-600/10 backdrop-blur-sm border border-green-200 rounded-md p-8">
                <div className="md:flex gap-12 block">
                  <div className="md:w-1/4 w-full mb-8 md:mb-0 text-center md:text-left">
                    <h3 className="text-2xl font-extrabold tracking-tight text-gray-900 mb-3">
                      AP Micro <br className="hidden md:inline" />MCQ Exams
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Prep for the AP Microeconomics exam with full-length practice tests
                    </p>
                  </div>

                  <div className="md:flex-1">
                    <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
                      {[1, 2, 3].map((num) => (
                        <div 
                          key={`micro-mcq-${num}`} 
                          className={`bg-white rounded-md shadow-sm border border-gray-100 overflow-hidden opacity-75`}
                        >
                          <div className="p-4">
                            <div className="flex items-center gap-2 mb-3">
                              <h4 className="text-lg font-bold text-gray-900">
                                Exam {num}
                              </h4>
                              <Lock className="w-4 h-4 text-gray-400" />
                            </div>
                            <div className="text-sm text-gray-500 mb-4">
                              60 questions • 70 minutes
                            </div>
                            <Link 
                              href="#"
                              onClick={(e) => e.preventDefault()}
                              className={`w-full px-4 py-2 rounded-md font-medium text-sm flex items-center justify-center gap-2 bg-gray-300 text-gray-500 cursor-not-allowed`}
                            >
                              Start Exam
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                              </svg>
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Micro FRQ Section */}
            <div className="mb-8">
              <div className="bg-gradient-to-br from-green-500/10 to-green-600/10 backdrop-blur-sm border border-green-200 rounded-md p-8">
                <div className="md:flex gap-12 block">
                  <div className="md:w-1/4 w-full mb-8 md:mb-0 text-center md:text-left">
                    <h3 className="text-2xl font-extrabold tracking-tight text-gray-900 mb-3">
                      AP Micro <br className="hidden md:inline" /> FRQ Exams
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Master free response questions with our practice sets
                    </p>
                  </div>

                  <div className="md:flex-1">
                    <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
                      {[1, 2, 3].map((num) => (
                        <div 
                          key={`micro-frq-${num}`} 
                          className={`bg-white rounded-md shadow-sm border border-gray-100 overflow-hidden ${num > 1 ? 'opacity-75' : ''}`}
                        >
                          <div className="p-4 flex flex-col h-full">
                            <div>
                              <div className="flex items-center gap-2 mb-3">
                                <h4 className="text-lg font-bold text-gray-900">
                                  Exam {num}
                                </h4>
                                {num > 1 && <Lock className="w-4 h-4 text-gray-400" />}
                              </div>
                              <div className="text-sm text-gray-500 mb-3">
                                3 questions • 60 minutes
                              </div>
                              <div className="flex flex-wrap gap-1 mb-4">
                                {num === 1 && (
                                  <>
                                    <span className="px-2 py-0.5 bg-gray-100 rounded-sm text-xs text-gray-600">Marginal Analysis</span>
                                    <span className="px-2 py-0.5 bg-gray-100 rounded-sm text-xs text-gray-600">Perfect Competition</span>
                                    <span className="px-2 py-0.5 bg-gray-100 rounded-sm text-xs text-gray-600">Monopsony</span>
                                  </>
                                )}
                                {num === 2 && (
                                  <>
                                    <span className="px-2 py-0.5 bg-gray-100 rounded-sm text-xs text-gray-600">Perfect Competition</span>
                                    <span className="px-2 py-0.5 bg-gray-100 rounded-sm text-xs text-gray-600">Monopoly</span>
                                    <span className="px-2 py-0.5 bg-gray-100 rounded-sm text-xs text-gray-600">Game Theory</span>
                                  </>
                                )}
                                {num === 3 && (
                                  <>
                                    <span className="px-2 py-0.5 bg-gray-100 rounded-sm text-xs text-gray-600">Factor Markets</span>
                                    <span className="px-2 py-0.5 bg-gray-100 rounded-sm text-xs text-gray-600">Market Structure</span>
                                    <span className="px-2 py-0.5 bg-gray-100 rounded-sm text-xs text-gray-600">Externalities</span>
                                  </>
                                )}
                              </div>
                            </div>
                            <div className="mt-auto">
                              <Link 
                                href="#"
                                onClick={(e) => num === 1 ? handleExamStart(e, 'micro', 'frq', '1') : e.preventDefault()}
                                className={`w-full px-4 py-2 rounded-md font-medium text-sm flex items-center justify-center gap-2 ${
                                  num === 1 
                                    ? 'bg-green-600 text-white hover:bg-green-700 transition-colors' 
                                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                }`}
                              >
                                Start Exam
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                              </Link>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Bottom commitment section with gradient */}
        <div className="bg-gray-50 rounded-md p-8 mt-12 text-center">
          <h4 className="text-xl font-semibold mb-4">Our Commitment to Excellence</h4>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Every exam is crafted by experienced AP® Economics teachers and reviewed by our academic board. We maintain the highest standards to ensure your student's success.
          </p>
          <div className="mt-6 flex justify-center gap-8 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              AP® Exam Alignment
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Secure payment
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Priority support
            </div>
          </div>
        </div>
      </div>
    </>
  )
} 