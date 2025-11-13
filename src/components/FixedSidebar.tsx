'use client';

import Link from 'next/link';
import Image from 'next/image'; // For placeholder avatar if needed
import { useRouter, usePathname } from 'next/navigation'; // Import for programmatic navigation if needed for complex cases
import {
  Home,
  Target, // For Focused Practice
  ListChecks, // For Unit MCQs
  Bot, // For AI FRQ Helper (or MessageSquare, Zap)
  FileText, // For Practice Exams
  PlaySquare, // For Video Library
  BookCopy, // For Study Guides (or Notebook, BookMarked)
  PlusCircle,
  Smile, // For guest avatar
  MessageSquare, // For Async Tutoring
  GraduationCap, // For AP Macro Course
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuthContext } from '@/contexts/AuthContext'; // Import useAuthContext
import { useEffect, useState } from 'react'; // Import useState for client-side guestSubject

interface NavItemProps {
  icon: React.ElementType;
  label: string;
  baseHrefPattern: string; // e.g., "/videos/{subject}" or "/aiFRQHelper"
  isSubjectDependent: boolean;
  // queryParams are part of baseHrefPattern if static, e.g. "?mode=custom"
}

export function FixedSidebar() {
  const { user, userData, loadingUserData } = useAuthContext();
  const router = useRouter();
  const pathname = usePathname(); // Get current path
  const [guestSubject, setGuestSubject] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);

  // Check if we're on the select-subject page
  const isOnSelectSubjectPage = pathname === '/select-subject';
  
  // Check if we're on the home page (for extended mode)
  const isOnHomePage = pathname === '/' || pathname === '/userHomePage';
  
  // Determine if we should show compact mode
  // Use compact mode for all pages except home page
  const isCompactMode = !isOnHomePage;

  useEffect(() => {
    setIsClient(true); // Indicate component has mounted
    if (typeof window !== 'undefined') {
      const storedGuestSubject = localStorage.getItem('guestAPSubject');
      setGuestSubject(storedGuestSubject);
    }
  }, []);

  // Listen for changes to localStorage
  useEffect(() => {
    const handleStorageChange = () => {
      if (typeof window !== 'undefined') {
        const storedGuestSubject = localStorage.getItem('guestAPSubject');
        setGuestSubject(storedGuestSubject);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const getFinalHref = (item: NavItemProps): string => {
    if (!isClient) return '#'; // Return placeholder if not yet mounted to avoid hydration mismatch with localStorage

    // If user is not logged in, check for guest subject
    if (!user) {
      if (item.label === 'Home') {
        return item.baseHrefPattern; // Home goes directly
      }
      
      // Check if guest has already selected a subject
      const currentGuestSubject = typeof window !== 'undefined' ? localStorage.getItem('guestAPSubject') : null;
      if (currentGuestSubject) {
        // Guest has a subject, so replace {subject} placeholder and go directly
        if (item.isSubjectDependent) {
          return item.baseHrefPattern.replace('{subject}', currentGuestSubject);
        } else {
          return item.baseHrefPattern; // Non-subject-dependent items go directly
        }
      }
      
      // Guest hasn't selected a subject, redirect to select-guest-subject
      return `/select-guest-subject?redirectPattern=${encodeURIComponent(item.baseHrefPattern)}`;
    }

    // User is logged in - use their selected subject
    let effectiveSubject: string | null = null;
    if (userData?.selectedSubject) {
      effectiveSubject = userData.selectedSubject;
    }

    let finalHref = item.baseHrefPattern;
    // Replace {subject} placeholder only if the item is subject-dependent AND we have an effective subject
    if (item.isSubjectDependent && effectiveSubject) {
      finalHref = item.baseHrefPattern.replace('{subject}', effectiveSubject);
    }
    
    return finalHref;
  };

  const userDashboardNavItems: NavItemProps[] = [
    { icon: Home, label: 'Home', baseHrefPattern: '/', isSubjectDependent: false }, 
    { icon: GraduationCap, label: 'AP Macro Course', baseHrefPattern: '/ap-macro-course', isSubjectDependent: false }, 
    { icon: BookCopy, label: 'Unit Study Guides', baseHrefPattern: '/unit/1', isSubjectDependent: false }, // Unit landing page with study guide icon
    { icon: PlaySquare, label: 'Video Library', baseHrefPattern: '/videos/{subject}', isSubjectDependent: true }, 
    { icon: Target, label: 'Focused Practice', baseHrefPattern: '/focusedPracticePreview', isSubjectDependent: false },
    { icon: ListChecks, label: 'Unit MCQs', baseHrefPattern: '/select-practice-units?subject={subject}', isSubjectDependent: true }, 
    { icon: Bot, label: 'AI FRQ Helper', baseHrefPattern: '/aiFRQHelper', isSubjectDependent: false }, 
    { icon: FileText, label: 'Practice Exams', baseHrefPattern: '/purchase/exams', isSubjectDependent: false }, // Assuming purchase page isn't subject-specific upfront
    { icon: MessageSquare, label: 'Async Tutoring', baseHrefPattern: '/async-tutoring', isSubjectDependent: false }, // Premium feature
  ];

  return (
    <div className={`fixed top-0 left-0 h-screen bg-white text-gray-700 flex flex-col shadow-lg z-40 border-r border-gray-200 ${
      isCompactMode ? 'w-16 p-2 space-y-2' : 'w-72 p-4 space-y-3'
    }`} style={{ paddingTop: '80px' }}>
      {/* TEMPORARY TEST BUTTON */}
      <Link
        href="/macro-video-library"
        className="mb-6 block text-center font-extrabold text-lg py-4 rounded-lg bg-yellow-400 hover:bg-yellow-500 text-black border-2 border-yellow-600 shadow-lg transition-all duration-200"
        style={{ fontSize: '1.25rem', letterSpacing: '0.05em' }}
      >
        TEST: Macro Video Library
      </Link>

      {/* User Section - Conditionally render only if a user is logged in and has a photo */}
      {user && user.photoURL && (
        <div className={`flex items-center mb-4 ${isCompactMode ? 'justify-center p-1' : 'space-x-3 p-2'}`}>
          <Image 
            src={user.photoURL} 
            alt={user.displayName || 'User Avatar'} 
            width={isCompactMode ? 32 : 48} 
            height={isCompactMode ? 32 : 48} 
            className="rounded-full" 
          />
          {!isCompactMode && (
            <div>
              {/* Display user's name or a default if display name is not available. Guest user text is removed. */}
              <p className="font-semibold text-lg truncate">{user.displayName || 'AP Dojo User'}</p>
            </div>
          )}
        </div>
      )}

      {/* Chat with PDF Button */}
      <Button 
        size={isCompactMode ? "sm" : "lg"}
        className={`mt-4 ${
          isCompactMode 
            ? `w-12 h-12 p-0 rounded-lg ${
                isOnSelectSubjectPage 
                  ? 'bg-gray-400 cursor-not-allowed text-gray-600' 
                  : 'bg-blue-500 hover:bg-blue-600 text-white'
              }`
            : `w-full text-lg py-4 ${
                isOnSelectSubjectPage 
                  ? 'bg-gray-400 cursor-not-allowed text-gray-600' 
                  : 'bg-blue-500 hover:bg-blue-600 text-white'
              }`
        }`}
        title={isOnSelectSubjectPage ? "Please complete subject selection first" : "Chat with PDF"}
        onClick={() => {
          if (!isOnSelectSubjectPage) {
            // Navigate to AI FRQ Helper page for chat functionality
            router.push('/aiFRQHelper');
          }
        }}
        disabled={isOnSelectSubjectPage}
      >
        <PlusCircle size={isCompactMode ? 20 : 24} className={isCompactMode ? "" : "mr-2"} />
        {!isCompactMode && "Chat with PDF"}
      </Button>

      {/* Navigation */}
      <nav className={`flex-grow overflow-y-auto pt-2 pb-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 ${
        isCompactMode ? 'space-y-2' : 'space-y-3'
      }`}>
        {userDashboardNavItems.map((item) => {
          const isDisabled = isOnSelectSubjectPage && item.label !== 'Home';
          const finalHref = isDisabled ? '#' : getFinalHref(item);
          
          // TEMPORARILY DISABLED FOR TESTING - uncomment the line below to restore premium-only access
          // if (item.label === 'Async Tutoring' && (!user || !userData?.purchases || userData.purchases.length === 0)) {
          //   return null;
          // }
          
          return (
            <Link
              key={item.label}
              href={finalHref}
              className={`flex items-center rounded-md transition-colors duration-150 group ${
                isCompactMode 
                  ? `justify-center w-12 h-12 ${
                      isDisabled 
                        ? 'text-gray-400 cursor-not-allowed' 
                        : 'text-gray-700 hover:bg-gray-100 hover:text-blue-600'
                    }`
                  : `px-4 py-3 space-x-3 ${
                      isDisabled 
                        ? 'text-gray-400 cursor-not-allowed' 
                        : 'text-gray-700 hover:bg-gray-100 hover:text-blue-600'
                    }`
              }`}
              title={isDisabled ? "Please complete subject selection first" : item.label}
              onClick={(e) => {
                if (isDisabled) {
                  e.preventDefault();
                }
              }}
            >
              <item.icon 
                size={24} 
                className={`${
                  isCompactMode 
                    ? `flex-shrink-0 ${
                        isDisabled 
                          ? 'text-gray-400' 
                          : 'text-gray-500 group-hover:text-blue-500'
                      }`
                    : `text-gray-500 group-hover:text-blue-500 flex-shrink-0`
                }`} 
              />
              {!isCompactMode && (
                <span className="text-base font-medium flex-grow whitespace-nowrap">{item.label}</span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Removed dividers and social links section */}
    </div>
  );
} 