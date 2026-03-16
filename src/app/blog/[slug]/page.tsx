import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Clock, Download } from 'lucide-react';
import { blogPosts } from '@/data/blogPosts';
import { BlogPostClient } from '@/components/BlogPostClient';
import { calculateReadingTime } from '@/utils/readingTime';
import { GraphExplanationPost as GraphExplanationPostComponent } from '@/components/GraphExplanationPost';
import { GraphExplanationPost as GraphExplanationPostType } from '@/types/blogPost';
import { graphExplanationPosts } from '@/data/graphExplanationPosts';
import { getSlugFromSeoUrl, generateSeoUrl } from '@/utils/blogUrls';

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

// Helper function to get post data for metadata
async function getPostData(slug: string) {
  const slugToDataMap = new Map<string, { subject: string; unit: number }>();
  
  Object.values(blogPosts).forEach(post => {
    slugToDataMap.set(post.slug, { subject: post.subject, unit: post.unit });
  });
  
  Object.values(graphExplanationPosts).forEach(post => {
    const matchingRegularPost = blogPosts[post.slug];
    const unit = matchingRegularPost?.unit || 0;
    slugToDataMap.set(post.slug, { subject: post.subject, unit });
  });
  
  const originalSlug = getSlugFromSeoUrl(slug, slugToDataMap);
  const finalSlug = originalSlug || slug;
  
  const graphPost = graphExplanationPosts[finalSlug];
  const regularPost = blogPosts[finalSlug];
  
  return { graphPost, regularPost, finalSlug, slugToDataMap };
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug: seoSlug } = await params;
  const { graphPost, regularPost, finalSlug, slugToDataMap } = await getPostData(seoSlug);
  
  if (!graphPost && !regularPost) {
    return {
      title: 'Blog Post Not Found | AP Dojo',
      description: 'The requested blog post could not be found.',
    };
  }
  
  const post = graphPost || regularPost;
  const isGraphPost = !!graphPost;
  
  // Get subject and unit for URL generation
  const data = slugToDataMap.get(finalSlug);
  const subject = data?.subject || (graphPost?.subject === 'macro' ? 'Macro' : 'Micro') || 'Macro';
  const unit = data?.unit || 0;
  const seoUrl = generateSeoUrl(finalSlug, subject, unit);
  
  const title = isGraphPost 
    ? `${graphPost.headline} | AP Dojo`
    : `${regularPost.title} | AP Dojo`;
  
  const description = post.seoSnippet || 
    (isGraphPost ? graphPost.intro : regularPost.description) ||
    `Learn about ${isGraphPost ? graphPost.headline : regularPost.title} for AP ${subject} Economics.`;
  
  const subjectFull = subject === 'Macro' ? 'Macroeconomics' : 'Microeconomics';
  const keywords = [
    `AP ${subjectFull}`,
    `AP ${subject}`,
    isGraphPost ? 'graph explanation' : 'blog post',
    isGraphPost ? graphPost.headline : regularPost.title,
    `AP ${subject} Unit ${unit}`,
    'AP economics',
    'AP exam prep',
    'AP economics study guide',
  ].join(', ');
  
  const url = `https://apdojo.com/blog/${seoUrl}`;
  const imageUrl = isGraphPost 
    ? graphPost.visual?.imageUrl || 'https://apdojo.com/images/og-default.jpg'
    : regularPost.thumbnailUrl || 'https://apdojo.com/images/og-default.jpg';
  
  return {
    title,
    description,
    keywords,
    authors: [{ name: 'AP Dojo' }],
    openGraph: {
      title,
      description,
      type: 'article',
      url,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: isGraphPost ? graphPost.visual?.alt || graphPost.headline : regularPost.title,
        },
      ],
      siteName: 'AP Dojo',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
    alternates: {
      canonical: url,
    },
  };
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
    // Get data for structured data
    const data = slugToDataMap.get(slug);
    const subject = data?.subject || (graphPost.subject === 'macro' ? 'Macro' : 'Micro');
    const unit = data?.unit || 0;
    const seoUrl = generateSeoUrl(slug, subject, unit);
    const url = `https://apdojo.com/blog/${seoUrl}`;
    
    // Structured data for SEO
    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: graphPost.headline,
      description: graphPost.seoSnippet || graphPost.intro,
      image: graphPost.visual?.imageUrl,
      datePublished: new Date().toISOString(),
      author: {
        '@type': 'Organization',
        name: 'AP Dojo',
      },
      publisher: {
        '@type': 'Organization',
        name: 'AP Dojo',
        logo: {
          '@type': 'ImageObject',
          url: 'https://apdojo.com/images/logo.png',
        },
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': url,
      },
      about: {
        '@type': 'Thing',
        name: `AP ${subject} Graph Explanation`,
      },
    };
    
    // Render as Graph Explanation Post
    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
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
      </>
    );
  }

  // Otherwise, check for regular blog post
  const post = blogPosts[slug];

  if (!post) {
    notFound();
  }

  const readingTime = calculateReadingTime(post.content);
  
  // Get data for structured data
  const data = slugToDataMap.get(slug);
  const subject = data?.subject || post.subject;
  const unit = data?.unit || post.unit;
  const seoUrl = generateSeoUrl(slug, subject, unit);
  const url = `https://apdojo.com/blog/${seoUrl}`;
  
  // Structured data for SEO
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.seoSnippet || post.description,
    image: post.thumbnailUrl,
    datePublished: new Date().toISOString(), // You may want to add actual publish dates
    author: {
      '@type': 'Organization',
      name: 'AP Dojo',
    },
    publisher: {
      '@type': 'Organization',
      name: 'AP Dojo',
      logo: {
        '@type': 'ImageObject',
        url: 'https://apdojo.com/images/logo.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    about: {
      '@type': 'Thing',
      name: `AP ${subject} Unit ${unit}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <Link
            href="/ap-blog-home"
            className="inline-flex items-center text-black hover:text-gray-700 mb-8 group font-bold"
          >
            <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
            Back to Blog
          </Link>

          <article>
            {/* Hero Section (match GraphExplanationPost layout) */}
            <section className="mb-12">
              <h2 className="text-2xl sm:text-3xl font-black text-black mb-4 leading-tight relative inline-block">
                <span className="relative z-10">
                  {post.subject === 'Macro' ? 'AP Macroeconomics' : 'AP Microeconomics'}
                </span>
                <span
                  className="absolute bottom-1 left-0 right-0 h-4 bg-yellow-300 -z-0"
                  style={{ transform: 'skew(-12deg)' }}
                />
              </h2>

              <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-black mb-6 leading-tight">
                {post.title}
              </h1>

              {post.seoSnippet && (
                <div className="bg-gray-50 border-l-4 border-yellow-400 rounded-r-lg px-6 py-4 mb-6">
                  <p className="text-lg text-gray-700 leading-relaxed text-center font-bold">{post.seoSnippet}</p>
                </div>
              )}
            </section>

            {/* Printable Cheat Sheets CTA (Macro and selected Micro posts) - right after SEO snippet */}
            {(post.subject === 'Macro' || post.slug === 'understanding-externalities') && (
              <section className="mb-12 border-2 border-black rounded-2xl bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6 sm:p-8">
                <div className="flex flex-row items-center gap-6 sm:gap-8 flex-wrap">
                  {/* Horizontally stacked 6 PDF previews - bundle style */}
                  <div className="relative h-[130px] sm:h-[145px] w-[200px] sm:w-[210px] flex-shrink-0">
                    {[1, 2, 3, 4, 5, 6].map((unitNumber, index) => {
                      const pdfUrl = `https://apdojowhiteboards.s3.ap-southeast-2.amazonaws.com/pdfs/AP+Macro+-+Unit+${unitNumber}.pdf`;
                      return (
                        <div
                          key={unitNumber}
                          className="absolute bottom-0 left-0 w-[100px] sm:w-[110px] border border-black bg-white overflow-hidden rounded-sm shadow-md"
                          style={{
                            aspectRatio: '8.5/11',
                            transform: `translateX(${index * 20}px)`,
                            zIndex: index,
                            filter: 'blur(0.5px)',
                          }}
                        >
                          <iframe
                            src={`${pdfUrl}#toolbar=0&navpanes=0`}
                            title={`Unit ${unitNumber} cheat sheet preview`}
                            className="absolute top-0 left-0 pointer-events-none w-full h-full"
                            style={{
                              width: '833px',
                              height: '1080px',
                              transform: 'scale(0.12)',
                              transformOrigin: 'top left',
                            }}
                          />
                          <Link
                            href="/cheat-sheets"
                            className="absolute inset-0 z-10"
                            aria-label={`View Unit ${unitNumber} cheat sheet`}
                          />
                        </div>
                      );
                    })}
                  </div>
                  {/* Text and CTA to the right of the bundle */}
                  <div className="flex-1 flex flex-col gap-2 sm:gap-3 min-w-0">
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">
                      Printable Cheat Sheets for Every Unit
                    </h2>
                    <p className="text-gray-700 text-sm sm:text-base">
                      Everything you need to ace your exam, all on a single page.
                    </p>
                    <Link
                      href="/cheat-sheets"
                      className="inline-flex items-center justify-center gap-2 w-fit px-5 py-3 bg-yellow-300 text-black font-black text-base rounded-xl border-2 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:-translate-y-0.5 active:translate-y-0 transition-transform"
                    >
                      <Download className="w-4 h-4" />
                      Download PDF Cheat Sheets
                    </Link>
                  </div>
                </div>
              </section>
            )}

            {/* Post Content */}
            <section className="mb-12">
              <BlogPostClient
                content={post.content}
                subject={post.subject === 'Macro' ? 'ap_macroeconomics' : 'ap_microeconomics'}
                unit={post.unit}
                practiceUrl="/unitFRQpracticePage"
                images={post.images || []}
                videoUrl={post.videoUrl || null}
                audioUrl={post.audioUrl ?? null}
                graphGymScenarioId={post.graphGymScenarioId}
                graphGymPrompt={post.graphGymPrompt}
                practiceQuestionIds={post.practiceQuestionIds}
              />
            </section>
          </article>
        </div>
      </div>
    </>
  );
}

