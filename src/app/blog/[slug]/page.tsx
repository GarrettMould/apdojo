import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Clock } from 'lucide-react';
import { blogPosts } from '@/data/blogPosts';
import { BlogPostClient } from '@/components/BlogPostClient';
import { BlogPostSidebar } from '@/components/BlogPostSidebar';
import { calculateReadingTime } from '@/utils/readingTime';

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return Object.keys(blogPosts).map((slug) => ({
    slug,
  }));
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = params;
  const post = blogPosts[slug];

  if (!post) {
    notFound();
  }

  const readingTime = calculateReadingTime(post.content);

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="lg:pl-8">
          <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-8 group">
            <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
            Back to Home
          </Link>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-12 lg:pl-8">
          <article className="lg:col-span-2 bg-white p-8 sm:p-12 rounded-xl shadow-md border border-gray-200">
            {/* Header */}
            <header className="mb-8 border-b pb-6">
              <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight mb-3">
                {post.title}
              </h1>
              <p className="text-lg text-gray-600 mb-2">
                {post.description}
              </p>
              <div className="flex items-center text-sm text-gray-500">
                <Clock className="w-4 h-4 mr-1.5" />
                <span>{readingTime} min read</span>
              </div>
            </header>

            {/* Post Content */}
            <BlogPostClient 
              content={post.content}
              subject="ap_macroeconomics"
              practiceUrl="/unitFRQpracticePage"
            />
          </article>

          <BlogPostSidebar 
            keyTakeaway={post.keyTakeaway}
          />
        </div>
      </div>
    </div>
  );
}

