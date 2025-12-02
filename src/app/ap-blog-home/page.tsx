import Link from 'next/link';
import { blogPosts } from '@/data/blogPosts';
import { ArrowRight } from 'lucide-react';

function BlogCard({ post }: { post: typeof blogPosts[string] }) {
  return (
    <Link href={`/blog/${post.slug}`}>
      <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 flex flex-col transition-all hover:shadow-2xl hover:scale-[1.02] h-full cursor-pointer group">
        <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
          {post.title}
        </h3>
        <p className="text-gray-600 mb-6 flex-grow">
          {post.description}
        </p>
        <div className="flex items-center text-blue-600 font-semibold group-hover:text-blue-700 mt-auto">
          <span>Read Article</span>
          <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
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
        <div className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">
            AP <span className="text-blue-500">Blog</span>
          </h1>
          <p className="text-xl text-gray-600">
            Learn key concepts, master difficult topics, and ace your AP Economics exams.
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No blog posts available yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

