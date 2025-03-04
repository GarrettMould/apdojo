import { client } from '@/lib/sanity'
import { notFound } from 'next/navigation'

async function getBlogPost(slug: string) {
  const post = await client.fetch(
    `*[_type == "post" && slug.current == $slug][0]{
      title,
      content,
      publishedAt,
      excerpt,
      "imageUrl": coverImage.asset->url
    }`,
    { slug }
  )
  
  if (!post) {
    notFound()
  }
  
  return post
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const post = await getBlogPost(params.slug)

  return (
    <article className="py-8">
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      <div className="text-gray-600 mb-8">
        {new Date(post.publishedAt).toLocaleDateString()}
      </div>
      <div className="prose max-w-none">
        {post.excerpt}
        {/* We'll need to add a Portable Text component to render the content properly */}
      </div>
    </article>
  )
} 