import Link from "next/link"
import Image from "next/image"

type Post = {
  title: string
  slug: { current: string }
  publishedAt: string
  excerpt: string
  imageUrl: string
}

export function BlogList({ posts }: { posts: Post[] }) {
  return (
    <section className="py-12">
      <h2 className="text-3xl font-bold mb-8">Blog Posts</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {posts.map((post) => (
          <Link 
            href={`/blog/${post.slug.current}`}
            key={post.slug.current}
            className="border rounded-lg hover:shadow-lg transition-all"
          >
            {post.imageUrl && (
              <div className="relative h-48 w-full">
                <Image
                  src={post.imageUrl}
                  alt={post.title}
                  fill
                  className="object-cover rounded-t-lg"
                />
              </div>
            )}
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">{post.title}</h3>
              <p className="text-gray-600">{post.excerpt}</p>
              <div className="text-sm text-gray-500 mt-4">
                {new Date(post.publishedAt).toLocaleDateString()}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
} 