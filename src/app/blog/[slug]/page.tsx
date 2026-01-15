import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Clock } from 'lucide-react';
import { blogPosts } from '@/data/blogPosts';
import { BlogPostClient } from '@/components/BlogPostClient';
import { calculateReadingTime } from '@/utils/readingTime';
import { GraphExplanationPost as GraphExplanationPostComponent } from '@/components/GraphExplanationPost';
import { GraphExplanationPost as GraphExplanationPostType } from '@/types/blogPost';
import { graphExplanationPosts } from '@/data/graphExplanationPosts';
import { getSlugFromSeoUrl } from '@/utils/blogUrls';

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  // Generate SEO URLs for both regular blog posts and graph explanation posts
  const { generateSeoUrl } = await import('@/utils/blogUrls');
  
  const regularPostParams = Object.values(blogPosts).map((post) => ({
    slug: generateSeoUrl(post.slug, post.subject, post.unit)
  }));
  
  const graphPostParams = Object.values(graphExplanationPosts).map((post) => {
    // Get unit from matching regular post if available
    const matchingRegularPost = blogPosts[post.slug];
    const unit = matchingRegularPost?.unit || 0;
    return {
      slug: generateSeoUrl(post.slug, post.subject, unit)
    };
  });
  
  return [...regularPostParams, ...graphPostParams];
}

// Fetch the graph explanation post data based on slug
async function getGraphExplanationPost(slug: string): Promise<GraphExplanationPostType | null> {
  return graphExplanationPosts[slug] || null;
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug: seoSlug } = await params;
  
  // Create a map of all posts for reverse lookup
  const slugToDataMap = new Map<string, { subject: string; unit: number }>();
  
  // Add regular posts
  Object.values(blogPosts).forEach(post => {
    slugToDataMap.set(post.slug, { subject: post.subject, unit: post.unit });
  });
  
  // Add graph posts (with unit from matching regular post if available)
  Object.values(graphExplanationPosts).forEach(post => {
    const matchingRegularPost = blogPosts[post.slug];
    const unit = matchingRegularPost?.unit || 0;
    slugToDataMap.set(post.slug, { subject: post.subject, unit });
  });
  
  // Try to get the original slug from SEO URL
  const originalSlug = getSlugFromSeoUrl(seoSlug, slugToDataMap);
  
  // If it's not an SEO URL, try using the slug directly (for backwards compatibility)
  const slug = originalSlug || seoSlug;
  
  // Check if this is a graph explanation post
  const graphPost = await getGraphExplanationPost(slug);
  
  if (graphPost) {
    // Render as Graph Explanation Post
    return (
      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <Link 
            href="/ap-blog-home" 
            className="inline-flex items-center text-black hover:text-gray-700 mb-8 group font-bold"
          >
            <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
            Back to Blog
          </Link>
          <GraphExplanationPostComponent post={graphPost} />
        </div>
      </div>
    );
  }

  // Otherwise, check for regular blog post
  const post = blogPosts[slug];

  if (!post) {
    notFound();
  }

  const readingTime = calculateReadingTime(post.content);

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-12">
          <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-8 group">
            <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
            Back to Home
          </Link>
        
        <article className="bg-white p-8 sm:p-12 rounded-xl shadow-md border border-gray-200">
            {/* Header */}
          <header className="mb-8 border-b pb-6 text-center">
            <h1 className="text-5xl sm:text-6xl font-extrabold text-gray-900 leading-tight mb-4">
                {post.title}
              </h1>
            {/* SEO Snippet - After H1 headline */}
            {post.seoSnippet && (
              <div className="bg-gray-50 border-l-4 border-blue-500 rounded-r-lg px-6 py-4 mb-4">
                <p className="text-lg text-gray-700 leading-relaxed text-center font-bold">
                  {post.seoSnippet}
                </p>
              </div>
            )}
              
            <div className="flex items-center justify-center gap-6">
              <div className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-md ${
                post.subject === 'Macro' 
                  ? 'bg-blue-100 text-blue-800' 
                  : 'bg-green-100 text-green-800'
              }`}>
                  {post.subject} - Unit {post.unit}
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Clock className="w-4 h-4 mr-1.5" />
                  <span>{readingTime} min read</span>
                </div>
              </div>

            </header>

            {/* Post Content */}
            <BlogPostClient 
              content={post.content}
            subject={post.subject === 'Macro' ? 'ap_macroeconomics' : 'ap_microeconomics'}
              practiceUrl="/unitFRQpracticePage"
            images={post.images || []}
            videoUrl={post.videoUrl || null}
            />
          </article>
      </div>
    </div>
  );
}

