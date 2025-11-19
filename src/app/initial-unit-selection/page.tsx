'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '@/contexts/AuthContext';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Loader2, Check, ArrowLeft } from 'lucide-react';
import { macroUnits, microUnits, Unit as UnitType } from '@/data/cheatSheets';

export default function InitialUnitSelectionPage() {
  const { user, loading: authLoading } = useAuthContext();
  const router = useRouter();
  
  // State for multi-subject flow
  const [subjects, setSubjects] = useState<('macro' | 'micro')[]>([]);
  const [currentStep, setCurrentStep] = useState(0);

  // Store selected units per subject
  const [selectedUnits, setSelectedUnits] = useState<{ [key in 'macro' | 'micro']?: Set<number> }>({});
  
  const [pageLoading, setPageLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (authLoading) return;

    if (!user) {
      router.push('/login');
      return;
    }

    const fetchUserData = async () => {
      setPageLoading(true);
      setError('');
      try {
        const userDocRef = doc(db, 'users', user.uid);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          if (userData.hasCompletedInitialUnitSelection) {
            router.push('/');
          } else if (userData.selectedSubjects && userData.selectedSubjects.length > 0) {
            const userSubjects = userData.selectedSubjects as ('macro' | 'micro')[];
            setSubjects(userSubjects);

            // Initialize state for selected units for each subject
            const initialSelections: { [key in 'macro' | 'micro']?: Set<number> } = {};
            userSubjects.forEach(s => {
              initialSelections[s] = new Set();
            });
            setSelectedUnits(initialSelections);
            setPageLoading(false);
          } else {
            router.push('/select-subject');
          }
        } else {
          console.error('User document not found.');
          setError('Could not load user data.');
          setPageLoading(false);
        }
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError('Failed to load user data.');
        setPageLoading(false);
      }
    };

    fetchUserData();
  }, [user, authLoading, router]);

  const currentSubject = subjects[currentStep];
  const unitsForCurrentSubject = currentSubject === 'macro' ? macroUnits : microUnits;
  const selectedUnitsForCurrentSubject = selectedUnits[currentSubject] || new Set();

  const handleUnitToggle = (unitId: number) => {
    if (!currentSubject) return;
    setSelectedUnits(prev => {
      const newSubjectUnits = new Set(prev[currentSubject]);
      if (newSubjectUnits.has(unitId)) {
        newSubjectUnits.delete(unitId);
      } else {
        newSubjectUnits.add(unitId);
      }
      return { ...prev, [currentSubject]: newSubjectUnits };
    });
  };

  const handleNextStep = () => {
    if (selectedUnitsForCurrentSubject.size < 2) {
      setError(`Please select at least two units for ${currentSubject === 'macro' ? 'AP Macroeconomics' : 'AP Microeconomics'}.`);
      return;
    }
    setError('');

    if (currentStep < subjects.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSelectionSubmit();
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setError('');
    }
  };

  const handleSelectionSubmit = async () => {
    if (!user) {
      setError('User not found. Please log in again.');
      return;
    }
    // Final validation
    for (const subject of subjects) {
        if (!selectedUnits[subject] || selectedUnits[subject]!.size < 2) {
            setError(`Please select at least two units for each subject.`);
            // Optionally, switch to the step with the error
            const subjectIndex = subjects.indexOf(subject);
            if (subjectIndex !== -1) setCurrentStep(subjectIndex);
            return;
        }
    }

    setError('');
    setIsSubmitting(true);

    try {
      const userDocRef = doc(db, 'users', user.uid);
      
      const initialPracticeUnits: { [key: string]: number[] } = {};
      for (const subject of subjects) {
        initialPracticeUnits[subject] = Array.from(selectedUnits[subject]!);
      }

      await updateDoc(userDocRef, {
        initialPracticeUnits: initialPracticeUnits,
        hasCompletedInitialUnitSelection: true
      });

      router.push('/');
    } catch (err) {
      console.error("Error saving initial unit selection:", err);
      setError('Failed to save selection. Please try again.');
      setIsSubmitting(false);
    }
  };

  if (pageLoading || authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-blue-500" />
      </div>
    );
  }

  const subjectName = currentSubject === 'macro' ? 'AP Macroeconomics' : 'AP Microeconomics';
  const isFinalStep = currentStep === subjects.length - 1;

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full space-y-8 p-8 bg-white rounded-lg shadow-lg border border-gray-200">
        <div>
          <h2 className="text-center text-3xl font-extrabold tracking-tight text-gray-900 mb-2">
            Select Your Skills to Sharpen
          </h2>
          <p className="text-center text-gray-600 max-w-md mx-auto">
            {subjects.length > 1 
              ? `Step ${currentStep + 1} of ${subjects.length}: Select initial units for ${subjectName}.`
              : `Select at least two units you want to focus on for ${subjectName}.`}
          </p>
        </div>

        {error && (
          <div className="text-red-600 text-base text-center bg-red-50 p-3 rounded">
            {error}
          </div>
        )}

        <div className="space-y-4">
          {unitsForCurrentSubject.map(unit => {
            const isSelected = selectedUnitsForCurrentSubject.has(unit.number);
            return (
              <label
                key={unit.number}
                htmlFor={`unit-${unit.number}-checkbox`}
                className={`flex items-center p-4 border rounded-md cursor-pointer transition-all duration-150 ${isSelected ? 'border-blue-500 ring-2 ring-blue-300 bg-blue-50' : 'border-gray-300 hover:border-gray-400'}`}
              >
                <div className={`w-6 h-6 flex-shrink-0 border-2 rounded flex items-center justify-center mr-4 ${isSelected ? 'bg-blue-500 border-blue-500' : 'border-gray-400 bg-white'}`}>
                  {isSelected && <Check className="w-4 h-4 text-white stroke-[3]" />}
                </div>
                <input
                  type="checkbox"
                  id={`unit-${unit.number}-checkbox`}
                  checked={isSelected}
                  onChange={() => handleUnitToggle(unit.number)}
                  className="absolute opacity-0 w-0 h-0"
                />
                <span className="text-lg font-semibold text-gray-800">
                  Unit {unit.number}: {unit.title}
                </span>
              </label>
            );
          })}
        </div>

        <div className="flex gap-4 items-center">
          {currentStep > 0 && (
             <button
                onClick={handlePreviousStep}
                className="p-3 border rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
                aria-label="Go to previous step"
            >
                <ArrowLeft className="h-5 w-5" />
            </button>
          )}
          <button
            onClick={handleNextStep}
            className={`w-full flex justify-center py-3 px-4 border border-transparent text-base font-medium rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${ 
              (isSubmitting || selectedUnitsForCurrentSubject.size < 2) ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
            }`}
            disabled={isSubmitting || selectedUnitsForCurrentSubject.size < 2}
          >
            {isSubmitting ? <Loader2 className="h-5 w-5 animate-spin" /> : (isFinalStep ? 'Finish and Start Learning' : 'Next')} 
          </button>
        </div>
      </div>
    </div>
  );
} 