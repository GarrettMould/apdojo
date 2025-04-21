'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '@/contexts/AuthContext';
// Import getDoc and updateDoc for user data, remove batch/timestamp
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Loader2, Check } from 'lucide-react';
import { macroUnits, microUnits, Unit as UnitType } from '@/data/cheatSheets';

// Page renamed to InitialUnitSelectionPage
export default function InitialUnitSelectionPage() {
  const { user, loading: authLoading } = useAuthContext();
  const router = useRouter();
  const [selectedUnits, setSelectedUnits] = useState<Set<number>>(new Set());
  const [units, setUnits] = useState<UnitType[]>([]);
  const [subject, setSubject] = useState<'macro' | 'micro' | null>(null);
  const [pageLoading, setPageLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [showTooltip, setShowTooltip] = useState(false);

  // Fetch user subject and check initial unit selection status
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
          // Check if initial units already selected
          if (userData.hasCompletedInitialUnitSelection) {
            console.log('User already completed initial unit selection, redirecting home.');
            router.push('/userHomePage');
          } else if (userData.selectedSubject) {
            const selectedSubject = userData.selectedSubject as 'macro' | 'micro';
            setSubject(selectedSubject);
            const subjectUnits = selectedSubject === 'macro' ? macroUnits : microUnits;
            setUnits(subjectUnits);
            setSelectedUnits(new Set()); 
            setPageLoading(false);
          } else {
            // Should not happen if previous step worked, but handle anyway
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

  // Submit handler to save selected units to user doc
  const handleSelectionSubmit = async () => {
    // Require at least two units
    if (selectedUnits.size < 2) {
      setError('Please select at least two units to focus on initially.');
      return;
    }
    if (!user) {
        setError('User not found. Please log in again.');
        return;
    }

    setError('');
    setIsSubmitting(true);

    try {
        const userDocRef = doc(db, 'users', user.uid);
        const initialPracticeUnitIds = Array.from(selectedUnits);
        
        // Update user document with selected units and completion flag
        await updateDoc(userDocRef, {
            initialPracticeUnitIds: initialPracticeUnitIds,
            hasCompletedInitialUnitSelection: true
        });

        console.log('Initial practice units saved:', initialPracticeUnitIds);
        router.push('/userHomePage'); // Go to homepage

    } catch (err) {
        console.error("Error saving initial unit selection:", err);
        setError('Failed to save selection. Please try again.');
        setIsSubmitting(false);
    }
  };

  // ... loading return ...

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full space-y-8 p-8 bg-white rounded-lg shadow-lg border border-gray-200">
        <div>
          {/* Title and subtitle remain the same */}
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

        {/* Checkbox List remains the same */}
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
                  className="absolute opacity-0 w-0 h-0" // Hide default checkbox
                />
                <span className="text-lg font-semibold text-gray-800">
                  Unit {unit.number}: {unit.title}
                </span>
              </label>
            );
          })}
        </div>

        {/* Wrapper div for button and tooltip */}
        <div 
          className="relative" 
          onMouseEnter={() => { if (selectedUnits.size < 2) setShowTooltip(true); }}
          onMouseLeave={() => setShowTooltip(false)}
        >
          <button
            onClick={handleSelectionSubmit} // Use new handler
            className={`w-full flex justify-center py-3 px-4 border border-transparent text-base font-medium rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${ 
              (isSubmitting || selectedUnits.size < 2) ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
            }`}
            disabled={isSubmitting || selectedUnits.size < 2}
          >
            {isSubmitting ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Start Learning'} 
          </button>

          {/* Tooltip - Absolutely positioned */}
          {showTooltip && (
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-max max-w-xs px-3 py-1.5 bg-gray-800 text-white text-xs rounded shadow-lg z-10">
              Choose at least two units you would like to improve
              {/* Optional: triangle pointer */}
              <div className="absolute left-1/2 transform -translate-x-1/2 top-full w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-gray-800"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 