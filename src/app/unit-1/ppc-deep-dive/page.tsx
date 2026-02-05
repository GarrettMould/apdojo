'use client';

import { DrillDeepDive } from '@/components/DrillDeepDive';

export default function PPCCDeepDivePage() {
  // Custom Stage 2 content for PPC (explanatory content above the interactive drill)
  const stage2Content = (
    <>
      <h3 className="text-2xl font-bold text-black mb-4">
        Visualizing Opportunity Cost on the PPC
      </h3>
      <p className="text-lg text-gray-700 mb-6 leading-relaxed">
        The Production Possibilities Curve demonstrates opportunity cost through its shape. A bowed-out 
        (concave to the origin) curve indicates increasing opportunity costs. This occurs because resources 
        are not perfectly adaptable between different uses.
      </p>
      
      <p className="text-lg text-gray-700 mb-6 leading-relaxed">
        When you move along the curve from one point to another, you're giving up some of one good to 
        gain more of another. The opportunity cost is what you sacrifice to get something else. On a bowed-out 
        curve, as you produce more of one good, you must give up increasing amounts of the other good, 
        reflecting the reality that resources are specialized.
      </p>

      <div className="mt-6 space-y-4">
        <h4 className="text-xl font-bold text-black">
          Key Points on the PPC:
        </h4>
        <ul className="space-y-3 list-disc list-inside text-gray-700">
          <li>
            <strong>Points on the curve:</strong> Represent efficient production where all resources are fully utilized
          </li>
          <li>
            <strong>Points inside the curve:</strong> Indicate underutilization or inefficiency - the economy could produce more of both goods
          </li>
          <li>
            <strong>Points outside the curve:</strong> Are unattainable with current resources and technology
          </li>
          <li>
            <strong>Bowed-out shape:</strong> Shows increasing opportunity costs due to resource specialization
          </li>
        </ul>
      </div>
    </>
  );

  // Custom Key Takeaways for PPC
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
      stage2Content={stage2Content}
      keyTakeaways={keyTakeaways}
    />
  );
}
