'use client';

import { useState } from 'react';
import { blogPosts } from '@/data/blogPosts';
import DojoDrill from '@/components/DojoDrill';
import { X } from 'lucide-react';
import Link from 'next/link';

export default function DojoDrillsPage() {
  const [selectedDrill, setSelectedDrill] = useState<string | null>(null);

  // Filter blog posts that have dojoDrills videos
  const dojoDrillPosts = Object.values(blogPosts).filter(
    (post) => post.videoUrl && post.videoUrl.includes('dojoDrills')
  );

  const currentDrill = selectedDrill
    ? dojoDrillPosts.find((post) => post.slug === selectedDrill)
    : null;

  if (currentDrill) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <button
            onClick={() => setSelectedDrill(null)}
            className="mb-6 flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <X className="w-5 h-5" />
            <span>Back to Dojo Drills</span>
          </button>
          <DojoDrill
            videoUrl={currentDrill.videoUrl!}
            videoTitle={currentDrill.title}
            unit={currentDrill.unit}
            subject={
              currentDrill.subject === 'Macro'
                ? 'ap_macroeconomics'
                : 'ap_microeconomics'
            }
            lessonIds={[]} // You can extract lessonIds from the blog post if needed
            step2Type={
              currentDrill.slug === 'nominal-vs-real-gdp-explained' ? 'table' :
              currentDrill.slug === 'monopoly-marginal-revenue' ? 'monopoly' :
              'graph'
            }
            onComplete={() => {
              // Handle completion - maybe show a success message or navigate
              console.log('Dojo Drill completed!');
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Dojo Drills</h1>
          <p className="text-lg text-gray-600">
            Master key concepts through interactive video lessons, graph simulations, and practice questions.
          </p>
        </div>

        {dojoDrillPosts.length === 0 ? (
          <div className="bg-white border-4 border-black rounded-3xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8 text-center">
            <p className="text-gray-600">No Dojo Drills available yet. Check back soon!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dojoDrillPosts.map((post) => (
              <button
                key={post.slug}
                onClick={() => setSelectedDrill(post.slug)}
                className="bg-white border-4 border-black rounded-3xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6 text-left hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all active:translate-y-1"
              >
                <div className="mb-4">
                  <div
                    className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-md mb-2 ${
                      post.subject === 'Macro'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-green-100 text-green-800'
                    }`}
                  >
                    {post.subject} - Unit {post.unit}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-3">
                    {post.description}
                  </p>
                </div>
                <div className="text-sm font-semibold text-blue-600">
                  Start Drill →
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
