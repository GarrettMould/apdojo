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
  /** Identifier for the MCQ Gauntlet / practice set; omit for review-only lessons. */
  quizId?: string | null;
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

// ——— AP Macro Unit 1: Scarcity (1.1) ——— review-only (no video/drill/MCQ)
const scarcityFlashcards = getFlashcardsForLesson('macro', 1, '1.1') as FlashcardData[];
const scarcityKeyTerms = getKeyTermsForLesson('macro', 1, '1.1');
registry.set(key('ap-macro', '1', 'scarcity'), {
  id: '1.1',
  title: 'Scarcity',
  drillId: null,
  videoId: null,
  flashcards: scarcityFlashcards,
  instantAnswer: { blurb: 'Scarcity means limited resources force choices; every choice has an opportunity cost.', keyTerms: scarcityKeyTerms },
  content: (
    <div className="bg-yellow-50 border-4 border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-8">
      <h2 className="text-2xl font-black text-black mb-6">Key Takeaways</h2>
      <ul className="space-y-4">
        <li className="flex items-start gap-4">
          <span className="text-2xl">📊</span>
          <div><strong className="text-black">Scarcity</strong> means unlimited wants exceed limited resources; it forces trade-offs.</div>
        </li>
        <li className="flex items-start gap-4">
          <span className="text-2xl">📈</span>
          <div><strong className="text-black">Opportunity cost</strong> is the value of the next-best alternative given up when making a choice.</div>
        </li>
        <li className="flex items-start gap-4">
          <span className="text-2xl">✅</span>
          <div><strong className="text-black">Economics</strong> studies how people and societies allocate scarce resources to satisfy wants.</div>
        </li>
      </ul>
    </div>
  ),
});

// ——— AP Macro Unit 1: Demand (1.4) ——— review-only
const demandFlashcards = getFlashcardsForLesson('macro', 1, '1.4') as FlashcardData[];
const demandKeyTerms = getKeyTermsForLesson('macro', 1, '1.4');
registry.set(key('ap-macro', '1', 'demand'), {
  id: '1.4',
  title: 'Demand',
  drillId: null,
  videoId: null,
  flashcards: demandFlashcards,
  instantAnswer: { blurb: 'Demand is the relationship between price and quantity demanded; the law of demand says as price rises, quantity demanded falls.', keyTerms: demandKeyTerms },
  content: (
    <div className="bg-yellow-50 border-4 border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-8">
      <h2 className="text-2xl font-black text-black mb-6">Key Takeaways</h2>
      <ul className="space-y-4">
        <li className="flex items-start gap-4">
          <span className="text-2xl">📊</span>
          <div><strong className="text-black">Law of demand:</strong> Price and quantity demanded are inversely related; the demand curve slopes down.</div>
        </li>
        <li className="flex items-start gap-4">
          <span className="text-2xl">📈</span>
          <div><strong className="text-black">Demand shifts</strong> (income, tastes, prices of related goods, expectations, number of buyers) move the whole curve; a price change moves along the curve.</div>
        </li>
        <li className="flex items-start gap-4">
          <span className="text-2xl">✅</span>
          <div><strong className="text-black">Quantity demanded</strong> is one point on the curve; <strong className="text-black">demand</strong> is the entire curve.</div>
        </li>
      </ul>
    </div>
  ),
});

// ——— AP Macro Unit 1: Supply (1.5) ——— review-only
const supplyFlashcards = getFlashcardsForLesson('macro', 1, '1.5') as FlashcardData[];
const supplyKeyTerms = getKeyTermsForLesson('macro', 1, '1.5');
registry.set(key('ap-macro', '1', 'supply'), {
  id: '1.5',
  title: 'Supply',
  drillId: null,
  videoId: null,
  flashcards: supplyFlashcards,
  instantAnswer: { blurb: 'Supply is the relationship between price and quantity supplied; the law of supply says as price rises, quantity supplied rises.', keyTerms: supplyKeyTerms },
  content: (
    <div className="bg-yellow-50 border-4 border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-8">
      <h2 className="text-2xl font-black text-black mb-6">Key Takeaways</h2>
      <ul className="space-y-4">
        <li className="flex items-start gap-4">
          <span className="text-2xl">📊</span>
          <div><strong className="text-black">Law of supply:</strong> Price and quantity supplied are positively related; the supply curve slopes up.</div>
        </li>
        <li className="flex items-start gap-4">
          <span className="text-2xl">📈</span>
          <div><strong className="text-black">Supply shifts</strong> (input prices, technology, expectations, number of sellers) move the whole curve; a price change moves along the curve.</div>
        </li>
        <li className="flex items-start gap-4">
          <span className="text-2xl">✅</span>
          <div><strong className="text-black">Quantity supplied</strong> is one point on the curve; <strong className="text-black">supply</strong> is the entire curve.</div>
        </li>
      </ul>
    </div>
  ),
});

// ——— AP Macro Unit 2: Circular Flow and GDP (2.1) ———
const u2_1Flashcards = getFlashcardsForLesson('macro', 2, '2.1') as FlashcardData[];
const u2_1KeyTerms = getKeyTermsForLesson('macro', 2, '2.1');
registry.set(key('ap-macro', '2', 'circular-flow-gdp'), {
  id: '2.1',
  title: 'The Circular Flow and GDP',
  drillId: null,
  videoId: null,
  flashcards: u2_1Flashcards,
  instantAnswer: { blurb: 'The circular flow model shows how households and firms exchange money and goods. GDP measures total output using the expenditure approach: C + I + G + (X - M).', keyTerms: u2_1KeyTerms },
  content: (
    <div className="bg-yellow-50 border-4 border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-8">
      <h2 className="text-2xl font-black text-black mb-6">Key Takeaways</h2>
      <ul className="space-y-4">
        <li className="flex items-start gap-4"><span className="text-2xl">📊</span><div><strong className="text-black">Circular flow:</strong> Households supply factors of production and buy goods; firms use factors and sell goods; money and goods flow in opposite directions.</div></li>
        <li className="flex items-start gap-4"><span className="text-2xl">📈</span><div><strong className="text-black">GDP (expenditure):</strong> C + I + G + (X - M) — consumption, investment, government spending, net exports.</div></li>
        <li className="flex items-start gap-4"><span className="text-2xl">✅</span><div><strong className="text-black">GDP measures</strong> the market value of all final goods and services produced in a country in a period; avoid double-counting intermediate goods.</div></li>
      </ul>
    </div>
  ),
});

// ——— AP Macro Unit 2: Limitations of GDP (2.2) ———
const u2_2Flashcards = getFlashcardsForLesson('macro', 2, '2.2') as FlashcardData[];
const u2_2KeyTerms = getKeyTermsForLesson('macro', 2, '2.2');
registry.set(key('ap-macro', '2', 'limitations-gdp'), {
  id: '2.2',
  title: 'Limitations of GDP',
  drillId: null,
  videoId: null,
  flashcards: u2_2Flashcards,
  instantAnswer: { blurb: 'GDP does not measure welfare, leisure, income distribution, nonmarket activity, or environmental quality. It is a useful output measure but not a well-being index.', keyTerms: u2_2KeyTerms },
  content: (
    <div className="bg-yellow-50 border-4 border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-8">
      <h2 className="text-2xl font-black text-black mb-6">Key Takeaways</h2>
      <ul className="space-y-4">
        <li className="flex items-start gap-4"><span className="text-2xl">📊</span><div><strong className="text-black">GDP excludes</strong> household production, underground economy, leisure, environmental quality, and distribution of income.</div></li>
        <li className="flex items-start gap-4"><span className="text-2xl">📈</span><div><strong className="text-black">Use GDP for</strong> measuring output and growth; do not use it alone to judge welfare or happiness.</div></li>
      </ul>
    </div>
  ),
});

// ——— AP Macro Unit 2: Unemployment (2.3) ———
const u2_3Flashcards = getFlashcardsForLesson('macro', 2, '2.3') as FlashcardData[];
const u2_3KeyTerms = getKeyTermsForLesson('macro', 2, '2.3');
registry.set(key('ap-macro', '2', 'unemployment'), {
  id: '2.3',
  title: 'Unemployment',
  drillId: null,
  videoId: null,
  flashcards: u2_3Flashcards,
  instantAnswer: { blurb: 'The unemployment rate is (unemployed / labor force) × 100. Types: frictional (job search), structural (skills mismatch), cyclical (recession). Natural rate = frictional + structural.', keyTerms: u2_3KeyTerms },
  content: (
    <div className="bg-yellow-50 border-4 border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-8">
      <h2 className="text-2xl font-black text-black mb-6">Key Takeaways</h2>
      <ul className="space-y-4">
        <li className="flex items-start gap-4"><span className="text-2xl">📊</span><div><strong className="text-black">Labor force</strong> = employed + unemployed; unemployment rate = (unemployed / labor force) × 100.</div></li>
        <li className="flex items-start gap-4"><span className="text-2xl">📈</span><div><strong className="text-black">Frictional, structural, cyclical:</strong> Only cyclical is addressed by demand-side policy; natural rate is frictional + structural.</div></li>
        <li className="flex items-start gap-4"><span className="text-2xl">✅</span><div><strong className="text-black">Full employment</strong> does not mean zero unemployment; it means unemployment is at the natural rate.</div></li>
      </ul>
    </div>
  ),
});

// ——— AP Macro Unit 2: Price Indices and Inflation (2.4) ———
const u2_4Flashcards = getFlashcardsForLesson('macro', 2, '2.4') as FlashcardData[];
const u2_4KeyTerms = getKeyTermsForLesson('macro', 2, '2.4');
registry.set(key('ap-macro', '2', 'price-indices-inflation'), {
  id: '2.4',
  title: 'Price Indices and Inflation',
  drillId: null,
  videoId: null,
  flashcards: u2_4Flashcards,
  instantAnswer: { blurb: 'CPI measures the cost of a fixed basket of consumer goods; CPI = (cost in current year / cost in base year) × 100. Inflation rate = ((CPI₂ - CPI₁) / CPI₁) × 100.', keyTerms: u2_4KeyTerms },
  content: (
    <div className="bg-yellow-50 border-4 border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-8">
      <h2 className="text-2xl font-black text-black mb-6">Key Takeaways</h2>
      <ul className="space-y-4">
        <li className="flex items-start gap-4"><span className="text-2xl">📊</span><div><strong className="text-black">CPI:</strong> (Cost of basket this year / Cost of basket base year) × 100; base year = 100.</div></li>
        <li className="flex items-start gap-4"><span className="text-2xl">📈</span><div><strong className="text-black">Inflation rate:</strong> ((CPI later - CPI earlier) / CPI earlier) × 100. Use it to deflate nominal values to real.</div></li>
        <li className="flex items-start gap-4"><span className="text-2xl">✅</span><div><strong className="text-black">GDP deflator</strong> uses all goods in GDP; CPI uses a consumer basket. Both can measure inflation.</div></li>
      </ul>
    </div>
  ),
});

// ——— AP Macro Unit 2: Costs of Inflation (2.5) ———
const u2_5Flashcards = getFlashcardsForLesson('macro', 2, '2.5') as FlashcardData[];
const u2_5KeyTerms = getKeyTermsForLesson('macro', 2, '2.5');
registry.set(key('ap-macro', '2', 'costs-inflation'), {
  id: '2.5',
  title: 'Costs of Inflation',
  drillId: null,
  videoId: null,
  flashcards: u2_5Flashcards,
  instantAnswer: { blurb: 'Inflation causes shoe-leather costs, menu costs, redistribution from lenders to borrowers when unanticipated, and distortion of price signals and taxes.', keyTerms: u2_5KeyTerms },
  content: (
    <div className="bg-yellow-50 border-4 border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-8">
      <h2 className="text-2xl font-black text-black mb-6">Key Takeaways</h2>
      <ul className="space-y-4">
        <li className="flex items-start gap-4"><span className="text-2xl">📊</span><div><strong className="text-black">Shoe-leather and menu costs:</strong> Resources spent minimizing cash holdings and updating prices.</div></li>
        <li className="flex items-start gap-4"><span className="text-2xl">📈</span><div><strong className="text-black">Redistribution:</strong> Unanticipated inflation hurts lenders (fixed nominal interest) and helps borrowers.</div></li>
        <li className="flex items-start gap-4"><span className="text-2xl">✅</span><div><strong className="text-black">High inflation</strong> distorts relative prices and tax brackets, creating uncertainty and inefficiency.</div></li>
      </ul>
    </div>
  ),
});

// ——— AP Macro Unit 2: Real vs Nominal GDP (2.6) ——— has drill
const u2_6Flashcards = getFlashcardsForLesson('macro', 2, '2.6') as FlashcardData[];
const u2_6KeyTerms = getKeyTermsForLesson('macro', 2, '2.6');
registry.set(key('ap-macro', '2', 'real-nominal-gdp'), {
  id: '2.6',
  title: 'Real vs. Nominal GDP',
  drillId: 'nominal-vs-real-gdp-explained',
  videoId: null,
  flashcards: u2_6Flashcards,
  instantAnswer: { blurb: 'Nominal GDP uses current prices; real GDP uses base-year prices to measure actual output. GDP deflator = (Nominal GDP / Real GDP) × 100.', keyTerms: u2_6KeyTerms },
  content: (
    <div className="bg-yellow-50 border-4 border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-8">
      <h2 className="text-2xl font-black text-black mb-6">Key Takeaways</h2>
      <ul className="space-y-4">
        <li className="flex items-start gap-4"><span className="text-2xl">📊</span><div><strong className="text-black">Nominal GDP</strong> = output × current prices; <strong className="text-black">real GDP</strong> = output × base-year prices (removes price effects).</div></li>
        <li className="flex items-start gap-4"><span className="text-2xl">📈</span><div><strong className="text-black">GDP deflator</strong> = (Nominal / Real) × 100; use it to convert nominal to real: Real = Nominal / (Deflator/100).</div></li>
        <li className="flex items-start gap-4"><span className="text-2xl">✅</span><div><strong className="text-black">Growth rates:</strong> Use real GDP to compare output across years; nominal can be misleading when prices change.</div></li>
      </ul>
    </div>
  ),
  quizId: 'nominal-vs-real-gdp-explained',
});

// ——— AP Macro Unit 2: Business Cycles (2.7) ———
const u2_7Flashcards = getFlashcardsForLesson('macro', 2, '2.7') as FlashcardData[];
const u2_7KeyTerms = getKeyTermsForLesson('macro', 2, '2.7');
registry.set(key('ap-macro', '2', 'business-cycles'), {
  id: '2.7',
  title: 'Business Cycles',
  drillId: null,
  videoId: null,
  flashcards: u2_7Flashcards,
  instantAnswer: { blurb: 'The business cycle has expansion, peak, contraction (recession), and trough. Real GDP, employment, and income fluctuate around a long-run growth trend.', keyTerms: u2_7KeyTerms },
  content: (
    <div className="bg-yellow-50 border-4 border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-8">
      <h2 className="text-2xl font-black text-black mb-6">Key Takeaways</h2>
      <ul className="space-y-4">
        <li className="flex items-start gap-4"><span className="text-2xl">📊</span><div><strong className="text-black">Phases:</strong> Expansion → Peak → Contraction (recession) → Trough → expansion again.</div></li>
        <li className="flex items-start gap-4"><span className="text-2xl">📈</span><div><strong className="text-black">Recession:</strong> Significant decline in real GDP and employment over a period (e.g. two quarters).</div></li>
        <li className="flex items-start gap-4"><span className="text-2xl">✅</span><div><strong className="text-black">Cycles are irregular</strong> in length and magnitude; long-run growth is the trend around which the economy fluctuates.</div></li>
      </ul>
    </div>
  ),
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
