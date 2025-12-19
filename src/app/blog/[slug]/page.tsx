import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Clock } from 'lucide-react';
import { blogPosts } from '@/data/blogPosts';
import { BlogPostClient } from '@/components/BlogPostClient';
import { calculateReadingTime } from '@/utils/readingTime';

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return Object.keys(blogPosts).map((slug) => ({
    slug,
  }));
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
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
            <p className="text-xl sm:text-2xl text-gray-600 mb-6">
                {post.description}
              </p>
              
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

