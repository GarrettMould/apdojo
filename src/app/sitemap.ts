import { MetadataRoute } from 'next';
import { macroUnits, microUnits } from '@/data/cheatSheets';

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

  // IMPORTANT: Only return canonical URLs we actually want indexed.
  // Older /unit/{number} and /study-guides/... routes either duplicate or redirect
  // to these cheat sheet pages and should NOT be listed here to avoid redirect errors.
  return [...staticPages, ...cheatSheetPages];
}



