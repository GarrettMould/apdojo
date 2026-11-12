/**
 * AP Macro lessons that have their own page at /ap-macro/unit-{unit}/{slug}, keyed by lesson number.
 * Used by the sitemap and by the unit cheat sheets, which link to each lesson page.
 */
export const MACRO_LESSON_SLUGS: Record<string, string> = {
  // Unit 1 – Basic Economic Concepts
  '1.1': 'scarcity',
  '1.2': 'production-possibilities-curve',
  '1.3': 'comparative-advantage',
  '1.4': 'demand',
  '1.5': 'supply',
  '1.6': 'market-equilibrium',
  // Unit 2 – Economic Indicators and the Business Cycle
  '2.1': 'circular-flow-gdp',
  '2.2': 'limitations-gdp',
  '2.3': 'unemployment',
  '2.4': 'price-indices-inflation',
  '2.5': 'costs-inflation',
  '2.6': 'real-nominal-gdp',
  '2.7': 'business-cycles',
  // Unit 3 – National Income and Price Determination
  '3.1': 'aggregate-demand',
  '3.2': 'multipliers',
  '3.3': 'short-run-aggregate-supply',
  '3.4': 'long-run-aggregate-supply',
  '3.5': 'ad-as-equilibrium',
  '3.6': 'changes-ad-as-short-run',
  '3.7': 'long-run-self-adjustment',
  '3.8': 'fiscal-policy',
  '3.9': 'automatic-stabilizers',
  // Unit 4 – Financial Sector
  '4.1': 'financial-assets',
  '4.2': 'nominal-real-interest-rates',
  '4.3': 'definition-measurement-functions-money',
  '4.4': 'banking-expansion-money-supply',
  '4.5': 'money-market',
  '4.6': 'monetary-policy',
  '4.7': 'loanable-funds-market',
  // Unit 5 – Long-Run Consequences of Stabilization Policies
  '5.1': 'fiscal-monetary-policy-short-run',
  '5.2': 'phillips-curve',
  '5.3': 'money-growth-inflation',
  '5.4': 'government-deficits-national-debt',
  '5.5': 'crowding-out',
  '5.6': 'economic-growth',
  '5.7': 'public-policy-economic-growth',
  // Unit 6 – Open Economy: International Trade and Finance
  '6.1': 'balance-of-payments-accounts',
  '6.2': 'exchange-rates',
  '6.3': 'foreign-exchange-market',
  '6.4': 'changes-policies-forex-market',
  '6.5': 'changes-forex-market-net-exports',
  '6.6': 'real-interest-rates-international-capital-flows',
};

/** The lesson page URL for an AP Macro lesson number (e.g. '2.3'), or null if it has no page. */
export function macroLessonHref(lessonId: string): string | null {
  const slug = MACRO_LESSON_SLUGS[lessonId];
  if (!slug) return null;
  return `/ap-macro/unit-${lessonId.split('.')[0]}/${slug}`;
}
