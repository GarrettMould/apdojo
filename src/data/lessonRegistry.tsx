/**
 * Lesson Deep Dive registry: subject + unit + slug → LessonContent.
 * Used by the dynamic deep dive route to render DrillDeepDive with the right data.
 */

import React from 'react';
import type { FlashcardData } from '@/components/DrillDeepDive';
import { getKeyTermsForLesson } from '@/data/cheatSheetTerms';
import { getFlashcardsForLesson } from '@/data/unitFlashcards';

/** Key term for Instant Answer section (term + definition). */
export interface InstantAnswerKeyTerm {
  term: string;
  definition: string;
}

export interface LessonContent {
  /** Lesson identifier (e.g. '1.2'). */
  id: string;
  /** Display title for the lesson. */
  title: string;
  /** Dojo drill id from dojoDrills, or null if no drill yet. */
  drillId: string | null;
  /** Video URL or video identifier; null if video comes only from drill. */
  videoId: string | null;
  /** Flashcards for warm-up (list + graph + rapid-fire). */
  flashcards: FlashcardData[];
  /** Instant Answer blurb and key terms (optional section). */
  instantAnswer: {
    blurb: string;
    keyTerms: InstantAnswerKeyTerm[];
  };
  /** Main deep dive content (e.g. Key Takeaways, custom sections). */
  content: React.ReactNode;
  /** Identifier for the MCQ Gauntlet / practice set. */
  quizId: string;
}

type SubjectSlug = string;
type UnitSlug = string;
type LessonSlug = string;

/** Registry key: subject + unit + slug. */
const registry = new Map<string, LessonContent>();

function key(subject: string, unit: string, slug: string): string {
  return `${subject}:${unit}:${slug}`;
}

// ——— AP Macro Unit 1: Production Possibilities Curve ———
const ppcKeyTerms = getKeyTermsForLesson('macro', 1, '1.2');
const ppcFlashcards = getFlashcardsForLesson('macro', 1, '1.2') as FlashcardData[];

registry.set(key('ap-macro', '1', 'production-possibilities-curve'), {
  id: '1.2',
  title: 'PPC and Opportunity Cost',
  drillId: 'ppc-and-opportunity-cost-macro',
  videoId: 'https://apdojovideos.s3.ap-southeast-2.amazonaws.com/dojoDrills/dd_macro_1.2.mp4',
  flashcards: ppcFlashcards,
  instantAnswer: {
    blurb: `The Production Possibilities Curve demonstrates opportunity cost through its shape. A bowed-out (concave to the origin) curve indicates increasing opportunity costs, because resources are not perfectly adaptable between uses. When you move along the curve, you give up some of one good to gain more of another; on a bowed-out curve, producing more of one good requires giving up increasing amounts of the other, reflecting resource specialization.`,
    keyTerms: ppcKeyTerms,
  },
  content: (
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
  ),
  quizId: 'ppc-and-opportunity-cost-macro',
});

// ——— AP Macro Unit 1: Comparative Advantage (1.3) ———
const compAdvFlashcards = getFlashcardsForLesson('macro', 1, '1.3') as FlashcardData[];
const compAdvKeyTerms = getKeyTermsForLesson('macro', 1, '1.3');
registry.set(key('ap-macro', '1', 'comparative-advantage'), {
  id: '1.3',
  title: 'Absolute and Comparative Advantage',
  drillId: 'absolute-and-comparative-advantage-macro',
  videoId: 'https://apdojovideos.s3.ap-southeast-2.amazonaws.com/dojoDrills/dd_micro_1.4.mp4',
  flashcards: compAdvFlashcards,
  instantAnswer: { blurb: '', keyTerms: compAdvKeyTerms },
  content: (
    <div className="bg-yellow-50 border-4 border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-8">
      <h2 className="text-2xl font-black text-black mb-6">Key Takeaways</h2>
      <ul className="space-y-4">
        <li className="flex items-start gap-4">
          <span className="text-2xl">📊</span>
          <div><strong className="text-black">Comparative advantage</strong> (lower opportunity cost), not absolute advantage, determines gains from trade.</div>
        </li>
        <li className="flex items-start gap-4">
          <span className="text-2xl">📈</span>
          <div><strong className="text-black">Output problem:</strong> OC of 1 Good A = Other / Itself. <strong className="text-black">Input problem:</strong> OC = Itself / Other.</div>
        </li>
        <li className="flex items-start gap-4">
          <span className="text-2xl">✅</span>
          <div><strong className="text-black">Terms of trade</strong> must lie between both parties’ opportunity costs for trade to be mutually beneficial.</div>
        </li>
      </ul>
    </div>
  ),
  quizId: 'absolute-and-comparative-advantage-macro',
});

// ——— AP Macro Unit 1: Market Equilibrium (1.6) ———
const eqFlashcards = getFlashcardsForLesson('macro', 1, '1.6') as FlashcardData[];
const eqKeyTerms = getKeyTermsForLesson('macro', 1, '1.6');
registry.set(key('ap-macro', '1', 'market-equilibrium'), {
  id: '1.6',
  title: 'Supply & Demand',
  drillId: 'supply-and-demand-macro',
  videoId: 'https://apdojovideos.s3.ap-southeast-2.amazonaws.com/dojoDrills/dd_macro_1.6.mp4',
  flashcards: eqFlashcards,
  instantAnswer: { blurb: '', keyTerms: eqKeyTerms },
  content: (
    <div className="bg-yellow-50 border-4 border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-8">
      <h2 className="text-2xl font-black text-black mb-6">Key Takeaways</h2>
      <ul className="space-y-4">
        <li className="flex items-start gap-4">
          <span className="text-2xl">📊</span>
          <div><strong className="text-black">Equilibrium</strong> is where demand and supply curves intersect; Qd = Qs.</div>
        </li>
        <li className="flex items-start gap-4">
          <span className="text-2xl">📈</span>
          <div><strong className="text-black">Surplus</strong> (price above equilibrium): Qs &gt; Qd, price falls. <strong className="text-black">Shortage</strong> (price below): Qd &gt; Qs, price rises.</div>
        </li>
        <li className="flex items-start gap-4">
          <span className="text-2xl">✅</span>
          <div><strong className="text-black">Double shifts</strong> can make price or quantity change <strong className="text-black">indeterminate</strong> without knowing relative shift sizes.</div>
        </li>
      </ul>
    </div>
  ),
  quizId: 'supply-and-demand-macro',
});

/**
 * Look up lesson content by subject, unit, and lesson slug.
 * @param subject - e.g. 'ap-macro'
 * @param unit - e.g. '1'
 * @param slug - e.g. 'production-possibilities-curve'
 * @returns LessonContent or null if not found
 */
export function getLessonData(
  subject: string,
  unit: string,
  slug: string
): LessonContent | null {
  return registry.get(key(subject, unit, slug)) ?? null;
}
