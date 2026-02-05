'use client';

import { DrillDeepDive } from '@/components/DrillDeepDive';
import { getFlashcardsForLesson } from '@/data/unitFlashcards';

export default function PPCDeepDivePage() {
  // PPC is Unit 1, Lesson 1.2 in both Macro and Micro (per dojoDrills)
  const lessonPills = [
    { label: 'AP Macro - 1.2' },
    { label: 'AP Micro - 1.2' },
  ];

  // Unit 1 Macro lesson 1.2: terms + graph + rapid-fire from unit flashcard array
  const flashcards = getFlashcardsForLesson('macro', 1, '1.2');

  const keyTakeaways = (
    <div className="bg-yellow-50 border-4 border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-8">
      <h2 className="text-2xl font-black text-black mb-6">Key Takeaways</h2>
      <ul className="space-y-4">
        <li className="flex items-start gap-4">
          <span className="text-2xl">📊</span>
          <div>
            <strong className="text-black">The PPC shows trade-offs:</strong> Moving along the curve means
            giving up some of one good to get more of another, demonstrating opportunity cost.
          </div>
        </li>
        <li className="flex items-start gap-4">
          <span className="text-2xl">📈</span>
          <div>
            <strong className="text-black">Bowed-out shape indicates increasing opportunity costs:</strong>
            Resources are specialized, so reallocating them becomes more costly as you move along the curve.
          </div>
        </li>
        <li className="flex items-start gap-4">
          <span className="text-2xl">✅</span>
          <div>
            <strong className="text-black">Points on the curve are efficient:</strong> All resources are
            fully utilized. Points inside are inefficient, and points outside are unattainable.
          </div>
        </li>
        <li className="flex items-start gap-4">
          <span className="text-2xl">🚀</span>
          <div>
            <strong className="text-black">The curve shifts outward with growth:</strong> Economic growth,
            technological advancement, or increased resources can shift the PPC outward, making previously
            unattainable combinations possible.
          </div>
        </li>
      </ul>
    </div>
  );

  return (
    <DrillDeepDive
      drillId="ppc-and-opportunity-cost-macro"
      backLink="/ap-macro-unit-1-cheat-sheet"
      backLinkText="Back to Unit 1 Cheat Sheet"
      lessonPills={lessonPills}
      flashcards={flashcards}
      keyTakeaways={keyTakeaways}
    />
  );
}
