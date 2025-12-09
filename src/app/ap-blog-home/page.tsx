import Link from 'next/link';
import Image from 'next/image';
import { blogPosts } from '@/data/blogPosts';
import { ArrowRight, Clock } from 'lucide-react';
import { calculateReadingTime } from '@/utils/readingTime';
import { BlogPost } from '@/data/blogPosts';

function BlogCard({ post }: { post: BlogPost }) {
  const readingTime = calculateReadingTime(post.content);

  return (
    <Link href={`/blog/${post.slug}`} className="block group">
      <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden h-full flex flex-col transition-shadow hover:shadow-xl">
        <div className="relative w-full h-48 bg-white">
          <Image
            src={post.thumbnailUrl}
            alt={post.title}
            layout="fill"
            objectFit="contain"
            className="transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="p-6 flex flex-col flex-grow">
          <div className="mb-3">
            <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-1 rounded-md">
              {post.subject} - Unit {post.unit}
            </span>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
            {post.title}
          </h3>
          <p className="text-gray-600 text-sm mb-4 flex-grow">
            {post.description}
          </p>
          <div className="flex items-center justify-between text-xs text-gray-500 mt-auto">
            <div className="flex items-center">
              <Clock className="w-3 h-3 mr-1" />
              <span>{readingTime} min read</span>
            </div>
            <div className="flex items-center font-semibold text-blue-600 group-hover:text-blue-700">
              <span>Read</span>
              <ArrowRight className="w-3 h-3 ml-1 transition-transform group-hover:translate-x-0.5" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function BlogHomePage() {
  const posts = Object.values(blogPosts);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <header className="mb-12 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-3">
            The AP <span className="text-blue-600">Dojo Blog</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Deep dives into key concepts, expert tips for mastering difficult topics, and strategies to help you ace your AP Economics exams.
          </p>
        </header>

        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <BlogCard key={post.slug} post={post} />
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

