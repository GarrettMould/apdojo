'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '@/contexts/AuthContext';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Loader2, Check } from 'lucide-react';
import { macroUnits, microUnits, Unit as UnitType } from '@/data/cheatSheets';

export default function SelfAssessmentPage() {
  const { user, loading: authLoading } = useAuthContext();
  const router = useRouter();
  const [selectedUnits, setSelectedUnits] = useState<Set<number>>(new Set());
  const [units, setUnits] = useState<UnitType[]>([]);
  const [subject, setSubject] = useState<'macro' | 'micro' | null>(null);
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
          if (userData.selectedSubject) {
            const selectedSubject = userData.selectedSubject as 'macro' | 'micro';
            setSubject(selectedSubject);
            const subjectUnits = selectedSubject === 'macro' ? macroUnits : microUnits;
            setUnits(subjectUnits);
            setSelectedUnits(new Set());
            setPageLoading(false);
          } else {
            console.log('Subject not selected, redirecting to subject selection.');
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

  const handleUnitToggle = (unitId: number) => {
    setSelectedUnits(prev => {
      const newSet = new Set(prev);
      if (newSet.has(unitId)) {
        newSet.delete(unitId);
      } else {
        newSet.add(unitId);
      }
      return newSet;
    });
  };

  const handleStartPractice = () => {
    if (selectedUnits.size === 0) {
      setError('Please select at least one unit to practice.');
      return;
    }
    if (!subject) {
        setError('Could not determine subject. Please try again.');
        return;
    }

    setError('');
    setIsSubmitting(true);

    const unitIds = Array.from(selectedUnits);
    
    // If only one unit selected, use new route structure for better SEO
    if (unitIds.length === 1) {
      const subjectSlug = getSubjectSlug(subject as 'macro' | 'micro');
      const unitSlug = getUnitSlug(unitIds[0], subject as 'macro' | 'micro');
      const practiceUrl = `/mcq-practice/${subjectSlug}/${unitSlug}`;
      console.log(`Navigating to practice: ${practiceUrl}`);
      router.push(practiceUrl);
    } else {
      // Multiple units - use old route with query params
      const unitIdsString = unitIds.join(',');
      const practiceUrl = `/unitMCQPracticePage?subject=${subject}&mode=custom&units=${unitIdsString}`;
      console.log(`Navigating to custom practice: ${practiceUrl}`);
      router.push(practiceUrl);
    }
  };

  if (pageLoading || authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full space-y-8 p-8 bg-white rounded-lg shadow-lg border border-gray-200">
        <div>
          <h2 className="text-center text-3xl font-extrabold tracking-tight text-gray-900 mb-2">
          Select Your Skills to Sharpen
          </h2>
          <p className="text-center text-gray-600 max-w-md mx-auto">
           We'll target your practice to help you master the areas you need most — and rack up that XP.
          </p>
        </div>

        {error && (
          <div className="text-red-600 text-base text-center bg-red-50 p-3 rounded">
            {error}
          </div>
        )}

        <div className="space-y-4">
          {units.map(unit => {
            const isSelected = selectedUnits.has(unit.number);
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

        <div>
          <button
            onClick={handleStartPractice}
            className={`w-full flex justify-center py-3 px-4 border border-transparent text-base font-medium rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
              (isSubmitting || selectedUnits.size === 0) ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
            }`}
            disabled={isSubmitting || selectedUnits.size === 0}
          >
            {isSubmitting ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Start Custom Practice'}
          </button>
        </div>
      </div>
    </div>
  );
}