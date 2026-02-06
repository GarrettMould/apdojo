'use client';

import { DrillDeepDive } from '@/components/DrillDeepDive';
import { getFlashcardsForLesson } from '@/data/unitFlashcards';

export default function ComparativeAdvantageDeepDivePage() {
  // Comparative Advantage is Unit 1, Lesson 1.3 in Macro (per dojoDrills)
  const lessonPills = [
    { label: 'AP Macro - 1.3' },
  ];

  // Unit 1 Macro lesson 1.3: terms + rapid-fire from unit flashcard array
  const flashcards = getFlashcardsForLesson('macro', 1, '1.3');

  const stage2Content = (
    <div className="space-y-12"> {/* Adds massive spacing between major sections */}
      
      {/* SECTION 1: THE CORE CONCEPT */}
      <section className="border-b border-gray-200 pb-10">
        <h3 className="text-2xl font-bold text-black mb-4">
          1. The Golden Rule of Trade
        </h3>
        <p className="text-lg text-gray-700 leading-relaxed">
          Comparative advantage is not about being the best (that's <em>absolute</em> advantage). 
          It is about who has the <strong>lowest opportunity cost</strong>. The country that gives up 
          <em>less</em> to produce a good has the comparative advantage, and that is the good they should specialize in.
        </p>
      </section>

      {/* SECTION 2: THE "OOO" TRICK (Visual Break) */}
      <section className="bg-blue-50 p-6 rounded-xl border border-blue-100">
        <h3 className="text-xl font-bold text-blue-900 mb-4">
          2. The "OOO" Trick: Output vs. Input
        </h3>
        <p className="text-gray-700 mb-4">
          Before you calculate anything, check if the table shows <strong>Output</strong> (products made) 
          or <strong>Input</strong> (hours/resources used).
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <span className="block font-bold text-green-700 mb-1">Output Questions</span>
            <p className="text-sm text-gray-600">"Tons of Wheat produced"</p>
            <p className="font-bold mt-2">Rule: OOO (Output = Other goes Over)</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <span className="block font-bold text-red-700 mb-1">Input Questions</span>
            <p className="text-sm text-gray-600">"Hours to make one unit"</p>
            <p className="font-bold mt-2">Rule: IOU (Input = Other goes Under)</p>
          </div>
        </div>
      </section>

      {/* SECTION 3: THE STEP-BY-STEP PROCESS */}
      <section>
        <h3 className="text-2xl font-bold text-black mb-6">
          3. How to Solve It (Step-by-Step)
        </h3>
        <div className="space-y-6">
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-black text-white flex items-center justify-center font-bold">1</div>
            <div>
              <h4 className="font-bold text-lg">Identify Absolute Advantage</h4>
              <p className="text-gray-600">If it's Output, look for the BIGGER number. If it's Input, look for the SMALLER number.</p>
            </div>
          </div>
          
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-black text-white flex items-center justify-center font-bold">2</div>
            <div>
              <h4 className="font-bold text-lg">Calculate the Ratio</h4>
              <p className="text-gray-600">Use the OOO or IOU rule to turn the data into a simple cost (e.g., 1 Car = 3 Trucks).</p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-black text-white flex items-center justify-center font-bold">3</div>
            <div>
              <h4 className="font-bold text-lg">Pick the Low Cost</h4>
              <p className="text-gray-600">The country with the lower opportunity cost specializes. Trade happens between the two costs.</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );

  return (
    <DrillDeepDive
      drillId="absolute-and-comparative-advantage-macro"
      backLink="/ap-macro-unit-1-cheat-sheet"
      backLinkText="Back to Unit 1 Cheat Sheet"
      lessonPills={lessonPills}
      flashcards={flashcards}
      stage2Content={stage2Content}
    />
  );
}