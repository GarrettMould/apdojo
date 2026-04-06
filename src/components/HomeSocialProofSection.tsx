'use client';

import { motion } from 'framer-motion';
import { reviews, Review } from '@/data/reviews';
import { Star } from 'lucide-react';

// Peek heights for the first two review cards (px)
const REVIEW_PEEK_H = [60, 80] as const;

function ReviewCard({ r }: { r: Review }) {
  return (
    <div className="bg-white border-4 border-black rounded-2xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6 flex flex-col">
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
        <span
          aria-hidden="true"
          className="text-6xl leading-none text-gray-300 absolute -top-3 -left-1 select-none"
        >
          &ldquo;
        </span>
        <p className="text-gray-800 font-medium leading-relaxed pl-8">
          {r.text}
        </p>
      </div>

      <div className="mt-5 pt-4 border-t-2 border-black flex items-center justify-between gap-3">
        <p className="text-sm font-black text-gray-900">— {r.author}</p>
      </div>
    </div>
  );
}

function MobileReviewStack({ items }: { items: Review[] }) {
  const show = items.slice(0, 3);
  return (
    <div className="md:hidden flex flex-col gap-0.5">
      {show.map((r, i) => {
        const isLast = i === show.length - 1;
        return (
          <div
            key={`${r.author}-${i}`}
            style={
              isLast
                ? { position: 'relative', zIndex: 3 }
                : {
                    height: REVIEW_PEEK_H[i],
                    overflow: 'hidden',
                    position: 'relative',
                    zIndex: i + 1,
                    opacity: 0.5 + i * 0.2,
                    pointerEvents: 'none',
                  }
            }
          >
            <ReviewCard r={r} />
            {!isLast && (
              <div
                className="absolute bottom-0 left-0 right-0 pointer-events-none"
                style={{ height: 28, background: 'linear-gradient(to bottom, transparent, rgba(249,250,251,0.95))' }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

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
            From Panic to a <span className="text-blue-500">5</span>.
          </h2>
          <p className="mt-4 text-lg sm:text-xl text-gray-700 font-medium max-w-3xl mx-auto">
            Built from thousands of tutoring hours and real AP exam patterns.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
        >
          <h3 className="text-2xl sm:text-3xl font-black text-gray-900 text-center mb-8">
            What students and parents say
          </h3>

          {/* Mobile: 3-card peek stack */}
          <MobileReviewStack items={featured} />

          {/* Desktop: grid */}
          <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((r, idx) => (
              <ReviewCard key={`${r.author}-${idx}`} r={r} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
