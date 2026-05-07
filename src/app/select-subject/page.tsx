'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '@/contexts/AuthContext';
import { doc, writeBatch, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Loader2, Check } from 'lucide-react';
import type { CourseSubject } from '@/lib/courseSubject';
import { unitXpDocumentId, unitsForCourseSubject } from '@/lib/courseSubject';
import { hasAdminRole } from '@/lib/adminAccess';

export default function SelectSubjectPage() {
  const { user, userData, loading: authLoading, loadingUserData } = useAuthContext();
  const router = useRouter();
  const canAccessGov = Boolean(user && hasAdminRole(userData));

  const [selectedSubjects, setSelectedSubjects] = useState<Set<CourseSubject>>(new Set());
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showVerificationMessage, setShowVerificationMessage] = useState(false);

  // Redirect if not logged in or auth is still loading
  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  // Check if user just signed up (email not verified)
  useEffect(() => {
    if (user && !user.emailVerified) {
      setShowVerificationMessage(true);
    }
  }, [user]);

  const handleSubjectToggle = (subject: CourseSubject) => {
    setSelectedSubjects(prev => {
      const newSet = new Set(prev);
      if (newSet.has(subject)) {
        newSet.delete(subject);
      } else {
        newSet.add(subject);
      }
      return newSet;
    });
  };

  const handleSubjectSelect = async () => {
    if (selectedSubjects.size === 0) {
      setError('Please select at least one subject to continue.');
      return;
    }
    if (!user) {
      setError('You must be logged in.');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const batch = writeBatch(db);
      const userDocRef = doc(db, 'users', user.uid);
      const subjects = Array.from(selectedSubjects);

      // 1. Update the main user document with the selected subjects
      batch.update(userDocRef, {
        selectedSubjects: subjects,
        hasCompletedSubjectSelection: true
      });

      // 2. Create initial XP docs for all units of the selected subjects
      const initialBaseXP = 25; // Start everyone at 25 XP

      subjects.forEach(subject => {
        const unitsToInitialize = unitsForCourseSubject(subject);
        unitsToInitialize.forEach(unit => {
          const unitIdStr = unit.number.toString();
          const unitXPRef = doc(db, 'users', user.uid, 'unitXP', unitXpDocumentId(subject, unit.number));
          batch.set(unitXPRef, {
            subject: subject,
            unit: unit.number,
            totalXP: initialBaseXP,
            lastUpdated: serverTimestamp()
          });
        });
      });

      // 3. Commit the batch write
      await batch.commit();

      console.log(`User ${user.uid} updated with subjects: ${subjects.join(', ')} and initial XP docs created.`);
      
      // 4. Redirect to the NEXT step (initial unit selection)
      router.push('/initial-unit-selection');

    } catch (err) {
      console.error("Error updating subject and initializing XP:", err);
      setError('Failed to save selection. Please try again.');
      setIsLoading(false);
    }
  };

  if (authLoading || (!user && !authLoading) || (user && loadingUserData)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg w-full space-y-8 p-8 bg-white rounded-lg shadow-lg border border-gray-200">
        <div>
          <h2 className="text-center text-3xl font-extrabold tracking-tight text-gray-900 mb-2">
            Choose Your Focus
          </h2>
          <p className="text-center text-gray-600">
            Select the AP subject(s) you&apos;ll be studying. You can choose more than one.
          </p>
        </div>

        {showVerificationMessage && user && !user.emailVerified && (
          <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-blue-700">
                  <strong>Welcome!</strong> We&apos;ve sent a verification email to <strong>{user.email}</strong>. 
                  Please check your inbox and verify your email address to ensure you receive important updates.
                </p>
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="text-red-600 text-base text-center bg-red-50 p-3 rounded">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <label 
            htmlFor="macro-checkbox"
            className={`flex items-center p-4 border rounded-md cursor-pointer transition-colors ${selectedSubjects.has('macro') ? 'border-blue-500 ring-2 ring-blue-200 bg-blue-50' : 'border-gray-300 hover:border-gray-400'}`}
          >
            <div className={`w-6 h-6 flex-shrink-0 border-2 rounded flex items-center justify-center mr-4 ${selectedSubjects.has('macro') ? 'bg-blue-500 border-blue-500' : 'border-gray-400 bg-white'}`}>
              {selectedSubjects.has('macro') && <Check className="w-4 h-4 text-white stroke-[3]" />}
            </div>
            <input
              type="checkbox"
              id="macro-checkbox"
              name="subject"
              value="macro"
              checked={selectedSubjects.has('macro')}
              onChange={() => handleSubjectToggle('macro')}
              className="absolute opacity-0 w-0 h-0"
            />
            <div className="ml-3">
              <span className="block text-base font-semibold text-gray-900">AP Macroeconomics</span>
              <span className="block text-sm text-gray-500">Study of the economy as a whole.</span>
            </div>
          </label>
          <label 
            htmlFor="micro-checkbox"
            className={`flex items-center p-4 border rounded-md cursor-pointer transition-colors ${selectedSubjects.has('micro') ? 'border-blue-500 ring-2 ring-blue-200 bg-blue-50' : 'border-gray-300 hover:border-gray-400'}`}
          >
            <div className={`w-6 h-6 flex-shrink-0 border-2 rounded flex items-center justify-center mr-4 ${selectedSubjects.has('micro') ? 'bg-blue-500 border-blue-500' : 'border-gray-400 bg-white'}`}>
              {selectedSubjects.has('micro') && <Check className="w-4 h-4 text-white stroke-[3]" />}
            </div>
            <input
              type="checkbox"
              id="micro-checkbox"
              name="subject"
              value="micro"
              checked={selectedSubjects.has('micro')}
              onChange={() => handleSubjectToggle('micro')}
              className="absolute opacity-0 w-0 h-0"
            />
            <div className="ml-3">
              <span className="block text-base font-semibold text-gray-900">AP Microeconomics</span>
              <span className="block text-sm text-gray-500">Study of individual and firm decisions.</span>
            </div>
          </label>
          {canAccessGov && (
            <label 
              htmlFor="gov-checkbox"
              className={`flex items-center p-4 border rounded-md cursor-pointer transition-colors ${selectedSubjects.has('gov') ? 'border-violet-500 ring-2 ring-violet-200 bg-violet-50' : 'border-gray-300 hover:border-gray-400'}`}
            >
              <div className={`w-6 h-6 flex-shrink-0 border-2 rounded flex items-center justify-center mr-4 ${selectedSubjects.has('gov') ? 'bg-violet-600 border-violet-600' : 'border-gray-400 bg-white'}`}>
                {selectedSubjects.has('gov') && <Check className="w-4 h-4 text-white stroke-[3]" />}
              </div>
              <input
                type="checkbox"
                id="gov-checkbox"
                name="subject"
                value="gov"
                checked={selectedSubjects.has('gov')}
                onChange={() => handleSubjectToggle('gov')}
                className="absolute opacity-0 w-0 h-0"
              />
              <div className="ml-3">
                <span className="block text-base font-semibold text-gray-900">AP United States Government and Politics</span>
                <span className="block text-sm text-gray-500">Foundations, institutions, and political behavior.</span>
              </div>
            </label>
          )}
        </div>

        <div>
          <button
            onClick={handleSubjectSelect}
            className={`w-full flex justify-center py-3 px-4 border border-transparent text-base font-medium rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
              (selectedSubjects.size === 0 || isLoading) ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
            }`}
            disabled={selectedSubjects.size === 0 || isLoading}
          >
            {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Continue to Unit Selection'}
          </button>
        </div>
      </div>
    </div>
  );
}
