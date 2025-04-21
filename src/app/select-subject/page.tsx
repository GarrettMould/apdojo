'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '@/contexts/AuthContext';
import { doc, updateDoc, writeBatch, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Loader2 } from 'lucide-react';
import { macroUnits, microUnits, Unit as UnitType } from '@/data/cheatSheets';

export default function SelectSubjectPage() {
  const { user, loading: authLoading } = useAuthContext();
  const router = useRouter();
  const [selectedSubject, setSelectedSubject] = useState<'macro' | 'micro' | ''>('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Redirect if not logged in or auth is still loading
  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login'); // Or wherever you want to redirect logged-out users
    }
    // We might add a check here later to redirect if subject is already selected
  }, [user, authLoading, router]);

  const handleSubjectSelect = async () => {
    if (!selectedSubject) {
      setError('Please select a subject to continue.');
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

      // 1. Update the main user document with the selected subject
      batch.update(userDocRef, {
        selectedSubject: selectedSubject,
        hasCompletedSubjectSelection: true
      });

      // 2. Create initial XP docs for all units of the selected subject
      const unitsToInitialize = selectedSubject === 'macro' ? macroUnits : microUnits;
      const initialBaseXP = 25; // Start everyone at 25 XP

      unitsToInitialize.forEach(unit => {
        const unitIdStr = unit.number.toString();
        const unitXPRef = doc(db, 'users', user.uid, 'unitXP', unitIdStr);
        batch.set(unitXPRef, {
          subject: selectedSubject,
          totalXP: initialBaseXP,
          lastUpdated: serverTimestamp()
        });
      });

      // 3. Commit the batch write
      await batch.commit();

      console.log(`User ${user.uid} updated with subject ${selectedSubject} and initial XP docs created.`);
      // 4. Redirect to the NEXT step (initial unit selection)
      router.push('/initial-unit-selection');

    } catch (err) {
      console.error("Error updating subject and initializing XP:", err);
      setError('Failed to save selection. Please try again.');
      setIsLoading(false);
    }
  };

  if (authLoading || (!user && !authLoading)) {
    // Show loading spinner while auth check happens or if redirecting
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
            Select the primary AP subject you'll be studying with AP Dojo.
          </p>
        </div>

        {error && (
          <div className="text-red-600 text-base text-center bg-red-50 p-3 rounded">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <label className={`flex items-center p-4 border rounded-md cursor-pointer transition-colors ${selectedSubject === 'macro' ? 'border-blue-500 ring-2 ring-blue-200 bg-blue-50' : 'border-gray-300 hover:border-gray-400'}`}>
            <input
              type="radio"
              name="subject"
              value="macro"
              checked={selectedSubject === 'macro'}
              onChange={() => setSelectedSubject('macro')}
              className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300"
              required
            />
            <div className="ml-3">
              <span className="block text-base font-semibold text-gray-900">AP Macroeconomics</span>
              <span className="block text-sm text-gray-500">Study of the economy as a whole.</span>
            </div>
          </label>
          <label className={`flex items-center p-4 border rounded-md cursor-pointer transition-colors ${selectedSubject === 'micro' ? 'border-blue-500 ring-2 ring-blue-200 bg-blue-50' : 'border-gray-300 hover:border-gray-400'}`}>
            <input
              type="radio"
              name="subject"
              value="micro"
              checked={selectedSubject === 'micro'}
              onChange={() => setSelectedSubject('micro')}
              className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300"
              required
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
              (!selectedSubject || isLoading) ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
            }`}
            disabled={!selectedSubject || isLoading}
          >
            {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Continue to Unit Selection'}
          </button>
        </div>
      </div>
    </div>
  );
} 