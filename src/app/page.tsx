'use client'

import { RecentContent } from "@/components/recent-content";
import { client } from '@/lib/sanity'
import { PortableText } from '@portabletext/react'
import Image from 'next/image'
import CoffeeGDPCalculator from "@/components/interactiveGDPCalculator"
import PopularTopics from "@/components/PopularTopics"
import Link from 'next/link'
import { Hero } from "@/components/hero"
import DiagnosticQuizMacro from '@/components/diagnosticQuizMacro'
import { FullExam } from '@/components/FullExam'
import { macroSetOneQuestions } from '@/data/questionBanks/macroSetOne'
import { ExamOptionsPreview } from "@/components/previews/ExamOptionsPreview"
import { VideoLibraryPreview } from "@/components/previews/VideoLibraryPreview"
import LiveTestMockup from '@/components/liveTestMockup'
import { useState, useEffect } from 'react'
import ExamDayCountdown from '@/components/ExamDayCountdown'
const components = {
  types: {
    image: ({ value }: any) => {
      return (
        <div className="relative w-full h-[300px] my-2">
          <Image
            src={value.asset.url}
            alt={value.alt || ' '}
            fill
            className="object-cover"
          />
        </div>
      )
    }
  }, 
  marks: {
    highlight: ({children}: {children: React.ReactNode}) => <span className="bg-yellow-200">{children}</span>,
    underline: ({children}: {children: React.ReactNode}) => <span className="underline">{children}</span>,
  }
}

async function getPost() {
  const query = `*[_type == "post"][0]{
    title,
    subtitle,
    publishedAt,
    "author": author->{
      name,
      slug,
      "imageUrl": image.asset->url
    },
    body[]{
      ...,
      _type == "image" => {
        "asset": {
          "url": asset->url
        }
      }
    },
    mainImage {
      asset->{
        _id,
        url
      }
    }
  }`
  const post = await client.fetch(query)
  
  return post
}

export default async function Home() {
  const post = await getPost()

  return (
    <main>
      
      <Hero />
      <LiveTestMockup />
      <ExamOptionsPreview />
      <ExamDayCountdown />
      <VideoLibraryPreview />
      {/*<div className="py-12">
        <DiagnosticQuizMacro />
      </div>/>*/}
      {/*<PopularTopics />*/}
      {/*<section className="py-12 max-w-2xl mx-auto">
        

        <div className="mb-8">
          <h2 className="text-5xl font-bold mb-4">{post.title}</h2>
          {post.subtitle && (
            <h3 className="text-xl text-gray-600 mb-4">{post.subtitle}</h3>
          )}
          {post.author && (
            <div className="text-black font-bold mb-1 text-lg">
              By {post.author.name}
            </div>
          )}
          <time className="text-gray-500">
            {new Date(post.publishedAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </time>
        </div>

        <div className="prose max-w-none [&>p]:text-lg [&>p]:leading-relaxed [&>p]:mb-8 [&>h4]:text-2xl [&>h4]:font-bold [&>h4]:mt-6 [&>h4]:mb-2 [&>h4]:text-blue-600">
          <PortableText 
            value={post.body} 
            components={components}
          />
        </div>
      </section>

      <section className="py-12 max-w-2xl mx-auto">
        <CoffeeGDPCalculator />
      </section>*/}
    </main>
  )
}
