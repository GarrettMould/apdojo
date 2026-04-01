'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

const WHITEBOARD_PREVIEW_URLS = [
  'https://apdojowhiteboards.s3.ap-southeast-2.amazonaws.com/AP_Macro_Unit_1/1.2_PPC_1.jpg',
  'https://apdojowhiteboards.s3.ap-southeast-2.amazonaws.com/AP_Macro_Unit_1/1.2_PPC_2.jpg',
  'https://apdojowhiteboards.s3.ap-southeast-2.amazonaws.com/AP_Macro_Unit_1/1.2_PPC_3.jpg',
];

export function CheatSheetPreview() {
  const router = useRouter();

  const handleCardClick = () => {
    router.push('/unit/1');
  };

  const sampleTerms = [
    { term: 'Scarcity', def: 'Limited resources, unlimited wants' },
    { term: 'Opportunity Cost', def: 'Value of next best alternative' },
    { term: 'PPC', def: 'Production Possibilities Curve' },
    { term: 'Comparative Advantage', def: 'Lower opportunity cost of producing a good' },
    { term: 'Absolute Advantage', def: 'Can produce more with same resources' },
    { term: 'Demand', def: 'Quantity buyers will purchase at each price' },
    { term: 'Supply', def: 'Quantity producers will offer at each price' },
    { term: 'Equilibrium', def: 'Where quantity supplied equals quantity demanded' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      onClick={handleCardClick}
      className="w-full min-h-[400px] flex flex-col bg-white border-4 border-black rounded-3xl shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] p-5 sm:p-6 cursor-pointer hover:shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] transition-all overflow-hidden"
    >
      {/* Mini unit tabs */}
      <div className="flex gap-1 mb-3 pb-2 border-b border-gray-200">
        {[1, 2, 3, 4, 5, 6].map((n) => (
          <span
            key={n}
            className={`px-2 py-1 text-xs font-bold rounded ${
              n === 1 ? 'bg-blue-100 text-blue-700 border-2 border-blue-500' : 'text-gray-500'
            }`}
          >
            {n}
          </span>
        ))}
      </div>

      {/* Mini Ultimate Unit Shuffle - purple */}
      <div className="mb-4 p-4 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-black text-white">🎯 Ultimate Unit Shuffle</p>
            <p className="text-xs text-indigo-100 mt-0.5">All 24 flashcards shuffled</p>
            <div className="flex gap-1.5 mt-2">
              <span className="bg-white/20 px-2 py-0.5 rounded text-xs font-semibold">List</span>
              <span className="bg-white/20 px-2 py-0.5 rounded text-xs font-semibold">Rapid Fire</span>
              <span className="bg-white/20 px-2 py-0.5 rounded text-xs font-semibold">Graph</span>
            </div>
          </div>
          <ArrowRight className="w-5 h-5 text-white flex-shrink-0" />
        </div>
      </div>

      {/* Mini lesson section: Key Terms */}
      <div className="flex-grow min-h-0">
        <h3 className="text-xs font-bold text-gray-600 mb-2">1.1 – Scarcity • Key Terms</h3>
        <div className="space-y-2">
          {sampleTerms.map((item, i) => (
            <div
              key={i}
              className="p-2 rounded-lg border border-gray-200 bg-gray-50"
            >
              <p className="font-bold text-gray-900 text-xs leading-tight">{item.term}</p>
              <p className="text-[10px] text-gray-600 leading-tight mt-0.5">{item.def}</p>
            </div>
          ))}
        </div>

        {/* Mini whiteboards - real thumbnails */}
        <div className="mt-3 pt-2 border-t border-gray-100">
          <p className="text-[10px] font-semibold text-gray-500 mb-1.5">Whiteboards</p>
          <div className="grid grid-cols-3 gap-1">
            {WHITEBOARD_PREVIEW_URLS.map((url, i) => (
              <div
                key={i}
                className="relative aspect-video rounded overflow-hidden border border-gray-200 bg-gray-100"
              >
                <Image
                  src={url}
                  alt={`Whiteboard ${i + 1}`}
                  fill
                  priority
                  className="object-cover"
                  sizes="80px"
                />
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-4 flex items-center gap-2 text-blue-600 font-bold text-sm">
          <span>View Cheat Sheets</span>
          <ArrowRight className="w-4 h-4 flex-shrink-0" />
        </div>
      </div>
    </motion.div>
  );
}
