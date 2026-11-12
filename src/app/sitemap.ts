import { MetadataRoute } from 'next';
import { govUnits, macroUnits, microUnits, statsUnits } from '@/data/cheatSheets';
import { MACRO_LESSON_SLUGS, macroLessonHref } from '@/data/macroLessonPages';
import { AP_GOV_REQUIRED_SCOTUS_CASES, SCOTUS_CASE_LANDING_HUB, scotusCaseLandingPath } from '@/data/gov/scotusRequiredCases';
import { blogPosts } from '@/data/blogPosts';
import { generateSeoUrl } from '@/utils/blogUrls';
import { FEATURES } from '@/lib/featureFlags';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://apdojo.com';
  
  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/ap-macro-practice-tests`,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/ap-micro-practice-tests`,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/ap-gov-practice-tests`,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/ap-stats-practice-tests`,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/ap-macro-mcq-practice-test-1`,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/ap-micro-mcq-practice-test-1`,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/full-frq-exam`,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    ...(FEATURES.tutoring
      ? [{ url: `${baseUrl}/tutoring`, changeFrequency: 'monthly' as const, priority: 0.8 }]
      : []),
    {
      url: `${baseUrl}/unit-cheat-sheets`,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
  ];

  // Study guide pages
  const studyGuidePages: MetadataRoute.Sitemap = [
    ...macroUnits.map(unit => ({
      url: `${baseUrl}/study-guides/AP-macroeconomics-unit-${unit.number}`,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
    ...microUnits.map(unit => ({
      url: `${baseUrl}/study-guides/AP-microeconomics-unit-${unit.number}`,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ];

  // Unit cheat sheet pages
  const unitPages: MetadataRoute.Sitemap = [
    ...macroUnits.map(unit => ({
      url: `${baseUrl}/unit/${unit.number}`,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
    ...microUnits.map(unit => ({
      url: `${baseUrl}/unit/${unit.number}`,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ];

  // Pretty cheat sheet routes (e.g. /ap-macro-unit-4-cheat-sheet)
  const cheatSheetPages: MetadataRoute.Sitemap = [
    ...macroUnits.map(unit => ({
      url: `${baseUrl}/ap-macro-unit-${unit.number}-cheat-sheet`,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
    ...microUnits.map(unit => ({
      url: `${baseUrl}/ap-micro-unit-${unit.number}-cheat-sheet`,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
    ...govUnits.map(unit => ({
      url: `${baseUrl}/ap-gov-unit-${unit.number}-cheat-sheet`,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
    ...statsUnits.map(unit => ({
      url: `${baseUrl}/ap-stats-unit-${unit.number}-cheat-sheet`,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ];


  const scotusCasePages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}${SCOTUS_CASE_LANDING_HUB}`,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    ...AP_GOV_REQUIRED_SCOTUS_CASES.map((requiredCase) => ({
      url: `${baseUrl}${scotusCaseLandingPath(requiredCase.id)}`,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ];

  // AP Macro lesson pages (canonical lesson deep dives)
  const deepDivePages: MetadataRoute.Sitemap = Object.keys(MACRO_LESSON_SLUGS).map(lessonId => ({
    url: `${baseUrl}${macroLessonHref(lessonId)}`,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // Blog post pages — dynamically generated from blogPosts data
  const blogPostPages: MetadataRoute.Sitemap = Object.values(blogPosts).map(post => ({
    url: `${baseUrl}/blog/${generateSeoUrl(post.slug, post.subject, post.unit)}`,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // IMPORTANT: Only return canonical URLs we actually want indexed.
  // Older /unit/{number} and /study-guides/... routes either duplicate or redirect
  // to these cheat sheet pages and should NOT be listed here to avoid redirect errors.
  return [...staticPages, ...cheatSheetPages, ...deepDivePages, ...scotusCasePages, ...blogPostPages];
}



