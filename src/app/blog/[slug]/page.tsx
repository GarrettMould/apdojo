import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Clock } from 'lucide-react';
import { blogPosts } from '@/data/blogPosts';
import { BlogPostClient } from '@/components/BlogPostClient';
import { BlogPostSidebar } from '@/components/BlogPostSidebar';
import { calculateReadingTime } from '@/utils/readingTime';
import { Button } from '@/components/ui/button';
import { List, Edit } from 'lucide-react';

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
              <p className="text-lg text-gray-600 mb-4">
                {post.description}
              </p>
              
              <div className="flex items-center justify-between">
                <div className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-1 rounded-md">
                  {post.subject} - Unit {post.unit}
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Clock className="w-4 h-4 mr-1.5" />
                  <span>{readingTime} min read</span>
                </div>
              </div>

            </header>

            {/* Call to Action Links */}
            <div className="space-y-3 my-8">
              <Link href={`/unitMCQPracticePage?subject=${post.subject.toLowerCase()}&mode=custom&units=${post.unit}`} className="block">
                <div className="bg-gray-100 p-4 rounded-lg flex justify-between items-center hover:bg-gray-200 transition-colors">
                  <div className="flex items-center">
                    <List className="w-5 h-5 mr-3 text-blue-600" />
                    <span className="font-semibold text-gray-800">Practice Unit {post.unit} MCQs</span>
                  </div>
                  <Button size="sm">Start Practicing</Button>
                </div>
              </Link>
              <Link href={`/unitFRQpracticePage?subject=${post.subject.toLowerCase()}`} className="block">
                <div className="bg-gray-100 p-4 rounded-lg flex justify-between items-center hover:bg-gray-200 transition-colors">
                  <div className="flex items-center">
                    <Edit className="w-5 h-5 mr-3 text-green-600" />
                    <span className="font-semibold text-gray-800">Practice Unit {post.unit} FRQs</span>
                  </div>
                  <Button size="sm">Start Practicing</Button>
                </div>
              </Link>
            </div>

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

