import { graphGymScenarios, GraphGymScenario } from '@/data/graphGymScenarios';

/**
 * Mapping of scenario titles to their shorter, topic-based slugs
 * Format: {topic}-graphing-practice
 */
const scenarioSlugMap: Record<number, string> = {
  1: 'monopoly-graphing-practice',
  2: 'surplus-graphing-practice',
  3: 'excise-tax-graphing-practice',
  4: 'perfect-competition-profit-graphing-practice',
  5: 'monopolistic-competition-graphing-practice',
  6: 'labor-market-graphing-practice',
  7: 'monopsony-graphing-practice',
  8: 'negative-externality-graphing-practice',
  9: 'positive-externality-graphing-practice',
  10: 'natural-monopoly-graphing-practice',
  11: 'full-employment-graphing-practice',
  12: 'recessionary-gap-graphing-practice',
  13: 'inflationary-gap-graphing-practice',
  14: 'money-market-graphing-practice',
  15: 'loanable-funds-graphing-practice',
  16: 'phillips-curve-graphing-practice',
  17: 'stagflation-graphing-practice',
  18: 'forex-market-graphing-practice',
  19: 'economic-growth-graphing-practice',
  20: 'contractionary-monetary-policy-graphing-practice',
  21: 'tariff-graphing-practice',
  22: 'subsidy-graphing-practice',
  23: 'positive-production-externality-graphing-practice',
  24: 'price-ceiling-graphing-practice',
  25: 'price-discrimination-graphing-practice',
  26: 'perfect-competition-long-run-graphing-practice',
  27: 'monopolistic-competition-loss-graphing-practice',
  28: 'product-curves-graphing-practice',
  29: 'negative-consumption-externality-graphing-practice',
  30: 'labor-supply-shift-graphing-practice',
  31: 'reserves-market-graphing-practice',
  32: 'crowding-out-graphing-practice',
  33: 'capital-inflow-graphing-practice',
  34: 'self-correction-inflationary-gap-graphing-practice',
  35: 'opportunity-cost-graphing-practice',
  36: 'investment-demand-graphing-practice',
  37: 'cost-push-inflation-graphing-practice',
  38: 'forex-interest-rate-graphing-practice',
  39: 'phillips-curve-shift-graphing-practice',
  40: 'excise-tax-consumers-graphing-practice',
  41: 'price-floor-graphing-practice',
  42: 'tariff-welfare-graphing-practice',
  43: 'negative-externality-correction-graphing-practice',
  44: 'positive-consumption-externality-graphing-practice',
  45: 'perfect-competition-short-run-graphing-practice',
  46: 'crowding-out-capital-flows-graphing-practice',
  47: 'monetary-policy-net-exports-graphing-practice',
  48: 'phillips-curve-adjustment-graphing-practice',
  49: 'self-correction-stagflation-graphing-practice',
  50: 'ample-reserves-market-graphing-practice',
  51: 'technological-growth-graphing-practice',
  52: 'natural-monopoly-regulation-graphing-practice',
  53: 'expansionary-monetary-policy-graphing-practice',
};

/**
 * Get the slug for a specific scenario by ID
 */
export function getSlugForScenario(scenario: GraphGymScenario): string {
  return scenarioSlugMap[scenario.id] || generateFallbackSlug(scenario.title);
}

/**
 * Generate a fallback slug from title if not in map
 */
function generateFallbackSlug(title: string): string {
  // Remove common prefixes and make URL-friendly
  let slug = title
    .toLowerCase()
    .replace(/^(the|an|a)\s+/i, '') // Remove articles
    .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric with hyphens
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
  
  return `${slug}-graphing-practice`;
}

/**
 * Get a scenario by its slug
 */
export function getScenarioBySlug(slug: string, subject?: 'macro' | 'micro'): GraphGymScenario | undefined {
  // Remove -graphing-practice suffix if present
  const baseSlug = slug.replace(/-graphing-practice$/, '');
  
  // Find scenario by matching slug
  return graphGymScenarios.find(scenario => {
    const scenarioSlug = getSlugForScenario(scenario);
    const scenarioBaseSlug = scenarioSlug.replace(/-graphing-practice$/, '');
    
    if (scenarioBaseSlug !== baseSlug) return false;
    
    // If subject is provided, filter by subject
    if (subject) {
      const scenarioSubjects = Array.isArray(scenario.subject) ? scenario.subject : [scenario.subject];
      return scenarioSubjects.includes(subject);
    }
    
    return true;
  });
}

/**
 * Get all scenarios with their slugs for a given subject
 */
export function getScenariosWithSlugs(subject?: 'macro' | 'micro'): Array<{ scenario: GraphGymScenario; slug: string }> {
  let scenarios = graphGymScenarios;
  
  // Filter by subject if provided
  if (subject) {
    scenarios = scenarios.filter(scenario => {
      const scenarioSubjects = Array.isArray(scenario.subject) ? scenario.subject : [scenario.subject];
      return scenarioSubjects.includes(subject);
    });
  }
  
  return scenarios.map(scenario => ({
    scenario,
    slug: getSlugForScenario(scenario),
  }));
}
