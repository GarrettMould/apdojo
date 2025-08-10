'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Loader2, BookOpen, Play, FileText, Target } from 'lucide-react';

function UserHomePageContent() {
  const { user, loading: authLoading, userData, loadingUserData } = useAuthContext();
  const router = useRouter();

  // --- Modified useEffect for Redirection & Data Loading --- 
  useEffect(() => {
    // Wait for all relevant loading states to be false
    if (authLoading || loadingUserData) { 
      console.log('[Home Page Effect] Waiting for auth/user data...');
      return; 
    }
    
    // --- User Check (Failsafe) ---
    if (!user) {
        console.log('[Home Page Effect] No user found after loading, redirecting to login.');
        router.push('/login');
        return;
    }

    // --- UserData Check ---
    if (userData) {
        console.log('[Home Page Effect] User data loaded, checking setup steps...');
        // --- Setup Checks ---
        if (!userData.selectedSubject) {
            console.log('[Home Page Effect] No selected subject, redirecting to /select-subject');
            router.push('/select-subject');
            return;
        }
        if (!userData.hasCompletedInitialUnitSelection) {
            console.log('[Home Page Effect] Initial units not selected, redirecting to /initial-unit-selection');
            router.push('/initial-unit-selection'); 
            return;
        }
    }
  }, [user, authLoading, userData, loadingUserData, router]);

  // --- Conditional Rendering based on Loading/Error State --- 
  if (authLoading || loadingUserData) { 
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    );
  }
  
  // --- Main component return --- 
  return (
    <div className="min-h-screen pt-20 pb-16 bg-gray-50">
       <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">


                    {/* Container with Shadow Effect */}
          <div className="relative">
            {/* Shadow Card - Behind Main Container */}
            <div className="bg-gray-200 rounded-lg border-4 border-dashed border-gray-300 absolute inset-0 transform translate-x-4 translate-y-4 -z-10" style={{ borderStyle: 'dashed', borderWidth: '4px', borderColor: '#d1d5db', borderDasharray: '40 15' } as React.CSSProperties}></div>
            
            {/* Main Container - AP Macro Course */}
            <div className="bg-white rounded-lg border-4 border-dashed border-blue-400 shadow-sm overflow-hidden relative" style={{ borderStyle: 'dashed', borderWidth: '4px', borderColor: '#60a5fa', borderDasharray: '40 15' } as React.CSSProperties}>
            <div className="p-12">
              {/* Left Section - Informational */}
              <div className="flex flex-col lg:flex-row items-start gap-8">
                <div className="flex-1 lg:w-4/5">
                  <h2 className="text-5xl font-bold text-gray-800 mb-6 whitespace-nowrap">
                    AP Macroeconomics
              </h2>
                  <p className="text-gray-600 mb-8 text-lg">
                    Comprehensive study materials, practice exams, and interactive tools to help you excel in AP Macroeconomics.
                  </p>
                  
                  {/* Large Enter Course Button */}
                  <Link href="/ap-macro-course">
                    <Button className="bg-transparent border-4 border-blue-500 hover:bg-blue-50 text-blue-600 font-bold py-6 px-12 text-xl">
                      <Play className="w-8 h-8 mr-4" />
                      Enter Course
                    </Button>
                  </Link>
                </div>

                {/* Right Section - Reserved for Image */}
                <div className="flex-1 lg:w-1/5">
                  {/* Image will be added here later */}
                </div>
              </div>

                            {/* Usage Limits/Information */}
              <div className="mt-8 pt-6">
                <div className="flex items-center justify-between">
                  <div className="text-center">
                    <p className="text-base font-semibold text-gray-800">6 Units</p>
                    <p className="text-sm text-gray-500">Complete Coverage</p>
                  </div>
                  <div className="w-px h-8 bg-blue-200"></div>
                  <div className="text-center">
                    <p className="text-base font-semibold text-gray-800">50+ Videos</p>
                    <p className="text-sm text-gray-500">Expert Explanations</p>
                  </div>
                  <div className="w-px h-8 bg-blue-200"></div>
                  <div className="text-center">
                    <p className="text-base font-semibold text-gray-800">Practice Exams</p>
                    <p className="text-sm text-gray-500">MCQ & FRQ</p>
                                          </div>
                  <div className="w-px h-8 bg-blue-200"></div>
                  <div className="text-center">
                    <p className="text-base font-semibold text-gray-800">Interactive Tools</p>
                    <p className="text-sm text-gray-500">Flashcards & More</p>
                                                  </div>
                                                  </div>
                                          </div>
                                                      </div>
                                              </div>
                                      </div>

           {/* Feature Grid */}
           <div className="mt-16">
             <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">
               Study Tools & Resources
             </h2>
             
             <div className="space-y-6">
               {/* Unit MCQ Practice */}
               <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                 <div className="p-8">
                   <h3 className="text-2xl font-bold text-gray-800 mb-4">
                     Unit MCQ Practice
                   </h3>
                   <p className="text-gray-600 mb-6 text-lg">
                     Practice multiple choice questions by unit. Focus on specific topics and track your progress.
                   </p>
                   <Link href="/select-practice-units?subject=macro">
                     <Button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 text-lg">
                       Start Practice
                                                  </Button>
                   </Link>
                                              </div>
                                      </div>

               {/* Unit Study Guides */}
               <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                 <div className="p-8">
                   <h3 className="text-2xl font-bold text-gray-800 mb-4">
                     Unit Study Guides
                   </h3>
                   <p className="text-gray-600 mb-6 text-lg">
                     Comprehensive study guides for each unit. Review key concepts, formulas, and important topics.
                   </p>
                   <Link href="/unit-study-guides">
                     <Button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 text-lg">
                       View Guides
                                      </Button>
                   </Link>
                      </div>
                  </div>
              </div>
            </div>
        </div>
       </div>
    </div>
  );
}

// --- Loading Fallback Component --- 
function HomePageLoadingFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
    </div>
  );
}

// --- Default Export with Suspense --- 
export default function UserHomePage() {
  return (
    <Suspense fallback={<HomePageLoadingFallback />}>
      <UserHomePageContent />
    </Suspense>
  );
}