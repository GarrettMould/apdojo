'use client';

import { motion } from 'framer-motion';
import { reviews } from '@/data/reviews';
import { Quote, Star } from 'lucide-react';

export function HomeSocialProofSection() {
  const featured = reviews.slice(0, 6);

  return (
    <section className="bg-gray-50 py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900">
            Real students. Real <span className="text-blue-500">results</span>.
          </h2>
          <p className="mt-4 text-lg sm:text-xl text-gray-700 font-medium max-w-3xl mx-auto">
            Built from thousands of tutoring hours and real AP exam patterns.
          </p>
        </motion.div>

        {/* Reviews from src/data/reviews.ts */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
        >
          <h3 className="text-2xl sm:text-3xl font-black text-gray-900 text-center mb-8">
            What students and parents say
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((r, idx) => (
              <div
                key={`${r.author}-${idx}`}
                className="bg-white border-4 border-black rounded-2xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6 flex flex-col"
              >
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  {r.badge && (
                    <span className="text-xs font-black uppercase tracking-wider bg-gray-100 border-2 border-black px-3 py-1 rounded-full whitespace-nowrap">
                      {r.badge}
                    </span>
                  )}
                </div>

                {r.title && (
                  <p className="text-lg font-black text-gray-900 leading-snug mb-3">
                    {r.title}
                  </p>
                )}

                <div className="relative flex-1">
                  <Quote className="w-7 h-7 text-gray-300 absolute -top-1 -left-1" />
                  <p className="text-gray-800 font-medium leading-relaxed pl-8">
                    {r.text}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t-2 border-black flex items-center justify-between gap-3">
                  <p className="text-sm font-black text-gray-900">— {r.author}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

