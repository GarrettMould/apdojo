'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '@/contexts/AuthContext';
import { doc, writeBatch, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Loader2, Check } from 'lucide-react';
import { macroUnits, microUnits } from '@/data/cheatSheets';

export default function SelectSubjectPage() {
  const { user, loading: authLoading } = useAuthContext();
  const router = useRouter();
  const [selectedSubjects, setSelectedSubjects] = useState<Set<'macro' | 'micro'>>(new Set());
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Redirect if not logged in or auth is still loading
  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  const handleSubjectToggle = (subject: 'macro' | 'micro') => {
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
        const unitsToInitialize = subject === 'macro' ? macroUnits : microUnits;
        unitsToInitialize.forEach(unit => {
          const unitIdStr = unit.number.toString();
          // The path now needs to be unique for each subject's unit
          const unitXPRef = doc(db, 'users', user.uid, 'unitXP', `${subject}_${unitIdStr}`);
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

  if (authLoading || (!user && !authLoading)) {
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
            Select the AP subject(s) you'll be studying. You can choose both!
          </p>
        </div>

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