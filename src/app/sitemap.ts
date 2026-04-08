import { MetadataRoute } from 'next';
import { macroUnits, microUnits } from '@/data/cheatSheets';
import { blogPosts } from '@/data/blogPosts';
import { generateSeoUrl } from '@/utils/blogUrls';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://apdojo.com';
  
  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/ap-macro-practice-tests`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/ap-micro-practice-tests`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/full-mcq-exam`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/full-frq-exam`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/unit-cheat-sheets`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
  ];

  // Study guide pages
  const studyGuidePages: MetadataRoute.Sitemap = [
    ...macroUnits.map(unit => ({
      url: `${baseUrl}/study-guides/AP-macroeconomics-unit-${unit.number}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
    ...microUnits.map(unit => ({
      url: `${baseUrl}/study-guides/AP-microeconomics-unit-${unit.number}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ];

  // Unit cheat sheet pages
  const unitPages: MetadataRoute.Sitemap = [
    ...macroUnits.map(unit => ({
      url: `${baseUrl}/unit/${unit.number}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
    ...microUnits.map(unit => ({
      url: `${baseUrl}/unit/${unit.number}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ];

  // Pretty cheat sheet routes (e.g. /ap-macro-unit-4-cheat-sheet)
  const cheatSheetPages: MetadataRoute.Sitemap = [
    ...macroUnits.map(unit => ({
      url: `${baseUrl}/ap-macro-unit-${unit.number}-cheat-sheet`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
    ...microUnits.map(unit => ({
      url: `${baseUrl}/ap-micro-unit-${unit.number}-cheat-sheet`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ];

  // AP Macro deep dive pages (canonical lesson deep dives)
  const macroDeepDives = [
    // Unit 1 – Basic Economic Concepts
    { unit: 1, slug: 'production-possibilities-curve' },
    { unit: 1, slug: 'comparative-advantage' },
    { unit: 1, slug: 'market-equilibrium' },
    { unit: 1, slug: 'scarcity' },
    { unit: 1, slug: 'demand' },
    { unit: 1, slug: 'supply' },
    // Unit 2 – Economic Indicators and the Business Cycle
    { unit: 2, slug: 'circular-flow-gdp' },
    { unit: 2, slug: 'limitations-gdp' },
    { unit: 2, slug: 'unemployment' },
    { unit: 2, slug: 'price-indices-inflation' },
    { unit: 2, slug: 'costs-inflation' },
    { unit: 2, slug: 'real-nominal-gdp' },
    { unit: 2, slug: 'business-cycles' },
    // Unit 3 – National Income & Price Determination
    { unit: 3, slug: 'aggregate-demand' },
    { unit: 3, slug: 'multipliers' },
    { unit: 3, slug: 'short-run-aggregate-supply' },
    { unit: 3, slug: 'long-run-aggregate-supply' },
    { unit: 3, slug: 'ad-as-equilibrium' },
    { unit: 3, slug: 'changes-ad-as-short-run' },
    { unit: 3, slug: 'long-run-self-adjustment' },
    { unit: 3, slug: 'fiscal-policy' },
    { unit: 3, slug: 'automatic-stabilizers' },
    // Unit 4 – Financial Sector
    { unit: 4, slug: 'financial-assets' },
    { unit: 4, slug: 'nominal-real-interest-rates' },
    { unit: 4, slug: 'definition-measurement-functions-money' },
    { unit: 4, slug: 'banking-expansion-money-supply' },
    { unit: 4, slug: 'money-market' },
    { unit: 4, slug: 'loanable-funds-market' },
    { unit: 4, slug: 'monetary-policy' },
    // Unit 5 – Long-Run Consequences of Stabilization Policies
    { unit: 5, slug: 'fiscal-monetary-policy-short-run' },
    { unit: 5, slug: 'phillips-curve' },
    { unit: 5, slug: 'money-growth-inflation' },
    { unit: 5, slug: 'government-deficits-national-debt' },
    { unit: 5, slug: 'crowding-out' },
    { unit: 5, slug: 'economic-growth' },
    { unit: 5, slug: 'public-policy-economic-growth' },
    // Unit 6 – Open Economy: International Trade & Finance
    { unit: 6, slug: 'balance-of-payments-accounts' },
    { unit: 6, slug: 'exchange-rates' },
    { unit: 6, slug: 'foreign-exchange-market' },
    { unit: 6, slug: 'changes-policies-forex-market' },
    { unit: 6, slug: 'changes-forex-market-net-exports' },
    { unit: 6, slug: 'real-interest-rates-international-capital-flows' },
  ];

  const deepDivePages: MetadataRoute.Sitemap = macroDeepDives.map(page => ({
    url: `${baseUrl}/ap-macro/unit-${page.unit}/${page.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // Blog post pages — dynamically generated from blogPosts data
  const blogPostPages: MetadataRoute.Sitemap = Object.values(blogPosts).map(post => ({
    url: `${baseUrl}/blog/${generateSeoUrl(post.slug, post.subject, post.unit)}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // IMPORTANT: Only return canonical URLs we actually want indexed.
  // Older /unit/{number} and /study-guides/... routes either duplicate or redirect
  // to these cheat sheet pages and should NOT be listed here to avoid redirect errors.
  return [...staticPages, ...cheatSheetPages, ...deepDivePages, ...blogPostPages];
}



