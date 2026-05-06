import { GraphGymScenario, graphGymScenarios } from './graphGymScenarios';
import type { CourseSubject } from '@/lib/courseSubject';
import { econCourseFromSubject } from '@/lib/courseSubject';

export interface GraphGymBundle {
  id: string;
  subject: 'macro' | 'micro';
  unit: number;
  label: string;
  description: string;
  accentColor: string; // e.g. 'blue', 'green', 'orange' (Tailwind color name)
  matchKeywords: string[]; // matched against scenario.topics[0] (primary topic)
}

// Bundles are checked in order. Unit-level filtering is applied first (scenario.lessonId unit),
// then the first bundle whose matchKeywords appear in the scenario's primary topic wins.
export const GRAPH_GYM_BUNDLES: GraphGymBundle[] = [
  // ═══════════════════ MACRO ═══════════════════

  // Unit 1 — PPC & Intro
  {
    id: 'macro-ppc',
    subject: 'macro',
    unit: 1,
    label: 'Production Possibilities Curve',
    description: 'PPC shifts, inefficiency, and opportunity costs',
    accentColor: 'blue',
    matchKeywords: ['PPC', 'Production Possibilities', 'Opportunity Cost', 'Inefficiency'],
  },
  {
    id: 'macro-supply-demand',
    subject: 'macro',
    unit: 1,
    label: 'Supply & Demand',
    description: 'Market equilibrium, surpluses, and demand shifts',
    accentColor: 'green',
    matchKeywords: ['Supply and Demand', 'Market Equilibrium', 'Demand Shift', 'Substitutes', 'Surplus', 'Price Controls'],
  },

  // Unit 3 — AD/AS
  {
    id: 'macro-ad-as',
    subject: 'macro',
    unit: 3,
    label: 'AD-AS Model',
    description: 'Aggregate demand, supply shocks, and output gaps',
    accentColor: 'yellow',
    matchKeywords: ['AD-AS', 'Aggregate Demand', 'SRAS', 'Recessionary Gap', 'Inflationary Gap', 'Stagflation', 'Self-Correction', 'Cost-Push', 'Investment', 'Long Run'],
  },

  // Unit 4 — Financial Sector
  // Ample Reserves must come BEFORE Money Market so "Monetary Policy" (scenario 31 first topic) routes correctly
  {
    id: 'macro-ample-reserves',
    subject: 'macro',
    unit: 4,
    label: 'Ample Reserves',
    description: "Fed policy tools and the administered rates framework",
    accentColor: 'red',
    matchKeywords: ['Ample Reserves', 'Administered Rates', 'Monetary Policy', 'Market for Reserves'],
  },
  {
    id: 'macro-money-market',
    subject: 'macro',
    unit: 4,
    label: 'Money Market',
    description: 'Money supply, demand, and nominal interest rates',
    accentColor: 'purple',
    matchKeywords: ['Money Market', 'Money Supply', 'Money Demand', 'Contractionary Policy'],
  },
  {
    id: 'macro-loanable-funds',
    subject: 'macro',
    unit: 4,
    label: 'Loanable Funds',
    description: 'Real interest rates, crowding out, and capital flows',
    accentColor: 'orange',
    matchKeywords: ['Loanable Funds', 'Crowding Out', 'Capital Flow', 'Deficit Spending', 'Political Instability'],
  },

  // Unit 5 — Stabilization Policy
  {
    id: 'macro-phillips',
    subject: 'macro',
    unit: 5,
    label: 'Phillips Curve',
    description: 'Short-run tradeoffs, stagflation, and expectations',
    accentColor: 'pink',
    matchKeywords: ['Phillips Curve', 'Inflation', 'Unemployment'],
  },

  // Unit 6 — International Trade
  {
    id: 'macro-forex',
    subject: 'macro',
    unit: 6,
    label: 'Foreign Exchange',
    description: 'Currency markets, appreciation, and depreciation',
    accentColor: 'teal',
    matchKeywords: ['Foreign Exchange', 'Forex', 'Exchange Rate', 'Exchange Rates', 'Capital Flows', 'Depreciation', 'Net Exports'],
  },

  // ═══════════════════ MICRO ═══════════════════

  // Unit 1 — Basic Concepts
  {
    id: 'micro-ppc',
    subject: 'micro',
    unit: 1,
    label: 'Production Possibilities Curve',
    description: 'PPC shifts, opportunity costs, and trade-offs',
    accentColor: 'blue',
    matchKeywords: ['PPC', 'Production Possibilities', 'Opportunity Cost'],
  },

  // Unit 2 — Supply & Demand
  // More specific bundles first so general S&D acts as fallthrough
  {
    id: 'micro-trade',
    subject: 'micro',
    unit: 2,
    label: 'Trade & Tariffs',
    description: 'International trade, tariffs, and welfare analysis',
    accentColor: 'teal',
    matchKeywords: ['International Trade', 'Tariff', 'Tariffs'],
  },
  {
    id: 'micro-price-controls',
    subject: 'micro',
    unit: 2,
    label: 'Price Controls',
    description: 'Price floors, ceilings, shortages, and surpluses',
    accentColor: 'orange',
    matchKeywords: ['Price Controls', 'Price Floor', 'Price Ceiling', 'Shortage'],
  },
  {
    id: 'micro-taxes-subsidies',
    subject: 'micro',
    unit: 2,
    label: 'Taxes & Subsidies',
    description: 'Per-unit taxes, subsidies, and welfare effects',
    accentColor: 'yellow',
    matchKeywords: ['Tax', 'Excise Tax', 'Subsidy', 'Subsidies', 'Per-Unit Tax', 'Tax Incidence', 'Tax Revenue'],
  },
  {
    id: 'micro-supply-demand',
    subject: 'micro',
    unit: 2,
    label: 'Supply & Demand',
    description: 'Market equilibrium, consumer and producer surplus, elasticity',
    accentColor: 'green',
    matchKeywords: ['Market Equilibrium', 'Consumer and Producer Surplus', 'Elasticity', 'Surplus', 'Allocative Efficiency'],
  },

  // Unit 3 — Production & Costs
  {
    id: 'micro-cost-curves',
    subject: 'micro',
    unit: 3,
    label: 'Cost Curves',
    description: 'Production function, marginal product, and diminishing returns',
    accentColor: 'purple',
    matchKeywords: ['Production Function', 'Marginal Product', 'Diminishing Returns'],
  },
  {
    id: 'micro-perfect-competition',
    subject: 'micro',
    unit: 3,
    label: 'Perfect Competition',
    description: 'Short-run profits, losses, and long-run adjustment',
    accentColor: 'blue',
    matchKeywords: ['Perfect Competition', 'Increasing-Cost Industry', 'Number of Sellers'],
  },

  // Unit 4 — Imperfect Competition
  {
    id: 'micro-monopoly',
    subject: 'micro',
    unit: 4,
    label: 'Monopoly',
    description: 'Profit maximization, price discrimination, and natural monopoly regulation',
    accentColor: 'red',
    matchKeywords: ['Monopoly', 'Price Discrimination', 'Natural Monopoly'],
  },
  {
    id: 'micro-monopolistic-competition',
    subject: 'micro',
    unit: 4,
    label: 'Monopolistic Competition',
    description: 'Short-run losses and long-run zero-profit equilibrium',
    accentColor: 'pink',
    matchKeywords: ['Monopolistic Competition'],
  },

  // Unit 5 — Factor Markets
  {
    id: 'micro-factor-markets',
    subject: 'micro',
    unit: 5,
    label: 'Labor Markets',
    description: 'Competitive labor markets, monopsony, and wage determination',
    accentColor: 'green',
    matchKeywords: ['Labor Market', 'Labor Supply', 'Factor Markets', 'Factor Market', 'Wages', 'MRP', 'MRC', 'Monopsony', 'Wage Maker'],
  },

  // Unit 6 — Market Failure
  {
    id: 'micro-externalities',
    subject: 'micro',
    unit: 6,
    label: 'Externalities',
    description: 'Negative and positive externalities, DWL, and corrective policies',
    accentColor: 'orange',
    matchKeywords: ['Externality', 'Externalities', 'Market Failure', 'MSC', 'MSB', 'Marginal Social', 'Negative Production', 'Positive Consumption'],
  },
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Assign a scenario to a bundle by unit-then-keyword matching. */
export function getBundleIdForScenario(
  scenario: GraphGymScenario,
  subject: 'macro' | 'micro',
): string | null {
  const unit = parseInt(scenario.lessonId.split('.')[0], 10);
  const relevantBundles = GRAPH_GYM_BUNDLES.filter(
    (b) => b.subject === subject && b.unit === unit,
  );
  const primaryTopic = (scenario.topics[0] ?? '').toLowerCase();

  for (const bundle of relevantBundles) {
    const matches = bundle.matchKeywords.some((kw) =>
      primaryTopic.includes(kw.toLowerCase()),
    );
    if (matches) return bundle.id;
  }
  return null;
}

export interface BundleWithScenarios {
  bundle: GraphGymBundle;
  scenarios: GraphGymScenario[];
  /** First S3 HTTPS image found among the bundle's scenarios, used as thumbnail. */
  thumbnailUrl: string | null;
}

/** Return all bundles (for a given subject) with their matched scenarios and a thumbnail. */
export function getBundlesForSubject(subject: CourseSubject): BundleWithScenarios[] {
  const econ = econCourseFromSubject(subject);
  if (!econ) return [];

  const filtered = graphGymScenarios.filter((s) => {
    const subjects = Array.isArray(s.subject) ? s.subject : [s.subject];
    return subjects.includes(econ);
  });

  const bundleMap = new Map<string, GraphGymScenario[]>();
  for (const s of filtered) {
    const bundleId = getBundleIdForScenario(s, econ);
    if (!bundleId) continue;
    const list = bundleMap.get(bundleId) ?? [];
    list.push(s);
    bundleMap.set(bundleId, list);
  }

  return GRAPH_GYM_BUNDLES.filter((b) => b.subject === econ)
    .map((bundle) => {
      const scenarios = bundleMap.get(bundle.id) ?? [];
      const thumbnailUrl =
        scenarios.find((s) => s.correctImage.startsWith('https://'))?.correctImage ?? null;
      return { bundle, scenarios, thumbnailUrl };
    })
    .filter((b) => b.scenarios.length > 0);
}

/** Lookup a single bundle by id, with its scenarios and thumbnail. */
export function getBundleById(
  bundleId: string,
  subject?: CourseSubject,
): BundleWithScenarios | null {
  const resolvedSubject: CourseSubject =
    subject ?? (bundleId.startsWith('macro-') ? 'macro' : 'micro');
  const bundles = getBundlesForSubject(resolvedSubject);
  return bundles.find((b) => b.bundle.id === bundleId) ?? null;
}
