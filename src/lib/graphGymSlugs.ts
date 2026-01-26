import { graphGymScenarios, GraphGymScenario } from '@/data/graphGymScenarios';

/**
 * Get the full URL slug for a specific scenario
 * Format: /graph-gym/ap-{subject}-{keywords}-graphing-practice
 */
export function getSlugForScenario(scenario: GraphGymScenario): string {
  // Use the slug field from the scenario object (1-2 word keywords)
  const keywords = scenario.slug || generateFallbackKeywords(scenario.title);
  
  // Determine subject - if array, use first one (or could be smarter)
  const subject = Array.isArray(scenario.subject) ? scenario.subject[0] : scenario.subject;
  const subjectPrefix = subject === 'macro' ? 'ap-macro' : 'ap-micro';
  
  // Return full URL path: /graph-gym/ap-{subject}-{keywords}-graphing-practice
  return `graph-gym/${subjectPrefix}-${keywords}-graphing-practice`;
}

/**
 * Generate fallback keywords from title if slug not provided
 */
function generateFallbackKeywords(title: string): string {
  // Remove common prefixes and make URL-friendly
  let slug = title
    .toLowerCase()
    .replace(/^(the|an|a)\s+/i, '') // Remove articles
    .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric with hyphens
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
  
  return slug;
}

/**
 * Get a scenario by its slug
 * Accepts both old format (monopoly-graphing-practice) and new format (graph-gym/ap-micro-monopoly-graphing-practice)
 */
export function getScenarioBySlug(slug: string, subject?: 'macro' | 'micro'): GraphGymScenario | undefined {
  // Handle new format: graph-gym/ap-micro-monopoly-graphing-practice
  // Or old format: monopoly-graphing-practice
  let keywords: string | null = null;
  let detectedSubject: 'macro' | 'micro' | null = null;
  
  if (slug.startsWith('graph-gym/')) {
    // New format: graph-gym/ap-micro-monopoly-graphing-practice
    const withoutPrefix = slug.replace(/^graph-gym\//, '');
    const match = withoutPrefix.match(/^ap-(macro|micro)-(.+)-graphing-practice$/);
    if (match) {
      detectedSubject = match[1] as 'macro' | 'micro';
      keywords = match[2];
    }
  } else {
    // Old format: monopoly-graphing-practice (for backwards compatibility)
    keywords = slug.replace(/-graphing-practice$/, '');
  }
  
  if (!keywords) {
    return undefined;
  }
  
  // Find scenario by matching keywords
  return graphGymScenarios.find(scenario => {
    const scenarioKeywords = scenario.slug || generateFallbackKeywords(scenario.title);
    
    if (scenarioKeywords !== keywords) return false;
    
    // If subject was detected from URL or provided, filter by subject
    const filterSubject = detectedSubject || subject;
    if (filterSubject) {
      const scenarioSubjects = Array.isArray(scenario.subject) ? scenario.subject : [scenario.subject];
      return scenarioSubjects.includes(filterSubject);
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
