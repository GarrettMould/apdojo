import Link from 'next/link';
import Image from 'next/image';
import { blogPosts } from '@/data/blogPosts';
import { graphExplanationPosts } from '@/data/graphExplanationPosts';
import { ArrowRight, Clock, Pen } from 'lucide-react';
import { calculateReadingTime } from '@/utils/readingTime';
import { BlogPost } from '@/data/blogPosts';
import { GraphExplanationPost } from '@/types/blogPost';
import { generateSeoUrl } from '@/utils/blogUrls';

function BlogCard({ post }: { post: BlogPost }) {
  const readingTime = calculateReadingTime(post.content);
  const seoUrl = generateSeoUrl(post.slug, post.subject, post.unit);

  return (
    <Link href={`/blog/${seoUrl}`} className="block group">
      <div className="bg-white rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] border-4 border-black overflow-hidden h-full flex flex-col transition-all hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1">
        <div className="relative w-full h-48 bg-white border-b-4 border-black overflow-hidden p-2">
          <Image
            src={post.thumbnailUrl}
            alt={post.title}
            fill
            className="transition-transform duration-300 group-hover:scale-105 object-contain"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className="p-6 flex flex-col flex-grow bg-white">
          <div className="mb-3">
            <span
              className={`inline-block text-xs font-black px-3 py-1 rounded-lg border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] ${
                post.subject === 'Macro' ? 'bg-blue-100 text-blue-900' : 'bg-green-100 text-green-900'
              }`}
            >
              {post.subject} - Unit {post.unit}
            </span>
          </div>
          <h3 className="text-xl font-black text-black mb-2 group-hover:text-blue-600 transition-colors leading-tight">
            {post.title}
          </h3>
          <p className="text-gray-700 text-sm mb-4 flex-grow leading-relaxed line-clamp-2">
            {post.description}
          </p>
          <div className="flex items-center justify-between text-xs text-gray-600 mt-auto">
            <div className="flex items-center">
              <Clock className="w-3 h-3 mr-1" />
              <span>{readingTime} min read</span>
            </div>
            <div className="flex items-center font-black text-blue-600 group-hover:text-blue-700">
              <span>Read</span>
              <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

function GraphExplanationCard({ post }: { post: GraphExplanationPost }) {
  // Get unit from matching regular post if it exists, otherwise we'll need a fallback
  const matchingRegularPost = blogPosts[post.slug];
  const unit = matchingRegularPost?.unit || 0; // Fallback to 0 if no match
  const seoUrl = generateSeoUrl(post.slug, post.subject, unit);
  
  return (
    <Link href={`/blog/${seoUrl}`} className="block group">
      <div className="bg-white rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] border-4 border-black overflow-hidden h-full flex flex-col transition-all hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1">
        <div className="relative w-full h-48 bg-white border-b-4 border-black overflow-hidden p-2">
          {post.visual?.imageUrl ? (
            <Image
              src={post.visual.imageUrl}
              alt={post.visual.alt || post.headline}
              fill
              className="object-contain transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="flex items-center justify-center h-full">
              <Pen className="w-20 h-20 text-black opacity-20" />
            </div>
          )}
        </div>
        <div className="p-6 flex flex-col flex-grow bg-white">
          <div className="mb-3">
            <span className={`inline-block text-xs font-black px-3 py-1 rounded-lg border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] ${
              post.subject === 'macro' 
                ? 'bg-blue-100 text-blue-900' 
                : 'bg-green-100 text-green-900'
            }`}>
              {post.subject === 'macro' ? 'Macro' : 'Micro'} - Graph Explained
            </span>
          </div>
          <h3 className="text-xl font-black text-black mb-2 group-hover:text-blue-600 transition-colors leading-tight">
            {post.headline}
          </h3>
          <p className="text-gray-700 text-sm mb-4 flex-grow leading-relaxed line-clamp-2">
            {post.intro}
          </p>
          <div className="flex items-center justify-between text-xs text-gray-600 mt-auto">
            <div className="flex items-center gap-2">
              <Pen className="w-4 h-4" />
              <span className="font-bold">Interactive</span>
            </div>
            <div className="flex items-center font-black text-blue-600 group-hover:text-blue-700">
              <span>Read</span>
              <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function BlogHomePage() {
  const regularPosts = Object.values(blogPosts);
  const graphPosts = Object.values(graphExplanationPosts);
  const hiddenSlugs = new Set(['nominal-vs-real-gdp-explained']);
  
  // Get slugs from graph posts to filter out duplicates
  const graphPostSlugs = new Set(graphPosts.map(post => post.slug));
  
  // Filter out regular posts that have the same slug as graph posts
  const uniqueRegularPosts = regularPosts
    .filter(post => !graphPostSlugs.has(post.slug))
    .filter(post => !hiddenSlugs.has(post.slug));

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <header className="mb-12 text-center">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-gray-900 mb-4 tracking-tight">
            The AP <span className="text-blue-600">Dojo</span> Blog
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Deep dives into key concepts, expert tips for mastering difficult topics, and strategies to help you ace your AP Economics exams.
          </p>
        </header>

        {(uniqueRegularPosts.length > 0 || graphPosts.length > 0) ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Regular Blog Posts (only unique ones not in graph posts) */}
            {uniqueRegularPosts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
            {/* Graph Explanation Posts */}
            {graphPosts.filter(post => !hiddenSlugs.has(post.slug)).map((post) => (
              <GraphExplanationCard key={post.slug} post={post} />
            ))}
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

