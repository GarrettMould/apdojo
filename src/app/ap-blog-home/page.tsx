'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useMemo } from 'react';
import { useAuthContext } from '@/contexts/AuthContext';
import { blogPosts } from '@/data/blogPosts';
import { graphExplanationPosts } from '@/data/graphExplanationPosts';
import { ArrowRight, Clock, Pen } from 'lucide-react';
import { calculateReadingTime } from '@/utils/readingTime';
import { generateSeoUrl } from '@/utils/blogUrls';
import { macroUnits, microUnits } from '@/data/cheatSheets';

// Graph-only posts (no matching blog post) - unit for syllabus ordering
const GRAPH_POST_UNIT_FALLBACK: Record<string, number> = {
  'consumer-producer-surplus-deadweight-loss': 2, // Micro Unit 2: Supply and Demand
};

type BlogListItem = {
  slug: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  unit: number;
  subject: string;
  isGraph: boolean;
  readingTime?: number;
  seoUrl: string;
};

function BlogRow({ item, index }: { item: BlogListItem; index: number }) {
  const isEven = index % 2 === 0;

  return (
    <li
      style={{
        display: 'flex',
        flexDirection: isEven ? 'row' : 'row-reverse',
        alignItems: 'center',
        gap: '24px',
        padding: '18px 0 24px 0',
        borderBottom: '1px solid #e5e7eb',
      }}
    >
      <Link href={item.seoUrl} className="block flex-shrink-0 group" style={{ width: '220px', height: '150px' }}>
        <div
          className="rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] border-4 border-black overflow-hidden transition-all group-hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] group-hover:-translate-y-1"
          style={{ width: '220px', height: '150px' }}
        >
          <div className="relative w-full h-full bg-white overflow-hidden p-2">
            <Image
              src={item.thumbnailUrl}
              alt={item.title}
              fill
              className="object-contain transition-transform duration-300 group-hover:scale-105"
              sizes="170px"
            />
          </div>
        </div>
      </Link>

      <div
        style={{
          flex: 1,
          minWidth: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: isEven ? 'flex-start' : 'flex-end',
          textAlign: isEven ? 'left' : 'right',
        }}
      >
        <Link href={item.seoUrl} className="block group/link w-full">
          <h3 className="font-black text-lg text-black mb-1 group-hover/link:text-blue-600 transition-colors leading-tight">
            {item.title}
          </h3>
          <p className="text-gray-700 text-sm leading-relaxed line-clamp-2 mb-3">
            {item.description}
          </p>
          <div className="flex items-center gap-2 text-xs text-gray-600" style={{ justifyContent: isEven ? 'flex-start' : 'flex-end' }}>
            {item.readingTime != null && (
              <>
                <Clock className="w-3 h-3 flex-shrink-0" />
                <span>{item.readingTime} min read</span>
                <span className="text-gray-400">·</span>
              </>
            )}
            {item.isGraph && (
              <>
                <Pen className="w-3 h-3 flex-shrink-0" />
                <span className="font-bold">Interactive</span>
                <span className="text-gray-400">·</span>
              </>
            )}
            <span className="font-black text-blue-600 group-hover/link:text-blue-700 flex items-center gap-1">
              Read <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
            </span>
          </div>
        </Link>
      </div>
    </li>
  );
}

export default function BlogHomePage() {
  const { selectedSubject } = useAuthContext();
  const sortedBlogItems = useMemo(() => {
    const regularPosts = Object.values(blogPosts);
    const graphPosts = Object.values(graphExplanationPosts);
    const hiddenSlugs = new Set(['nominal-vs-real-gdp-explained']);
    const matchesSubject = (subject: string) => subject.toLowerCase() === selectedSubject;
    const graphPostSlugs = new Set(graphPosts.map(post => post.slug));

    const regularItems: BlogListItem[] = regularPosts
      .filter(post => !graphPostSlugs.has(post.slug))
      .filter(post => !hiddenSlugs.has(post.slug))
      .filter(post => matchesSubject(post.subject))
      .map(post => ({
        slug: post.slug,
        title: post.title,
        description: post.description,
        thumbnailUrl: post.thumbnailUrl,
        unit: post.unit,
        subject: post.subject,
        isGraph: false,
        readingTime: calculateReadingTime(post.content),
        seoUrl: `/blog/${generateSeoUrl(post.slug, post.subject, post.unit)}`,
      }));

    const graphItems: BlogListItem[] = graphPosts
      .filter(post => !hiddenSlugs.has(post.slug))
      .filter(post => matchesSubject(post.subject))
      .map(post => {
        const matchingPost = blogPosts[post.slug];
        const unit = matchingPost?.unit ?? GRAPH_POST_UNIT_FALLBACK[post.slug] ?? 7;
        return {
          slug: post.slug,
          title: post.headline,
          description: post.intro,
          thumbnailUrl: post.visual?.imageUrl ?? '/images/placeholder.png',
          unit,
          subject: post.subject === 'macro' ? 'Macro' : 'Micro',
          isGraph: true,
          seoUrl: `/blog/${generateSeoUrl(post.slug, post.subject, unit)}`,
        };
      });

    const merged = [...regularItems, ...graphItems];
    const sorted = merged.sort((a, b) => a.unit - b.unit || a.title.localeCompare(b.title));
    const byUnit = sorted.reduce<Record<number, BlogListItem[]>>((acc, item) => {
      if (!acc[item.unit]) acc[item.unit] = [];
      acc[item.unit].push(item);
      return acc;
    }, {});
    return byUnit;
  }, [selectedSubject]);

  const units = selectedSubject === 'macro' ? macroUnits : microUnits;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-[720px] mx-auto px-4 py-12">
        <header className="mb-12 text-center">
          <h1 className="text-5xl sm:text-6xl font-black text-gray-900 mb-4 tracking-tight">
            Economics Explained
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Deep dives into key concepts, expert tips for mastering difficult topics, and strategies to help you ace your AP Economics exams.
          </p>
        </header>

        {Object.keys(sortedBlogItems).length > 0 ? (
          <div className="space-y-12">
            {units.map(unit => {
              const items = sortedBlogItems[unit.number] ?? [];
              if (items.length === 0) return null;
              return (
                <section key={unit.number}>
                  <h2 className="text-2xl font-black text-gray-900 mb-6 pt-4 border-t border-gray-200 first:border-t-0 first:pt-0">
                    Unit {unit.number}: {unit.title}
                  </h2>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 0 }}>
                    {items.map((item, index) => (
                      <BlogRow key={item.slug} item={item} index={index} />
                    ))}
                  </ul>
                </section>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No blog posts available yet. Check back soon!</p>
          </div>
        )}
      </div>
    </div>
  );
}

