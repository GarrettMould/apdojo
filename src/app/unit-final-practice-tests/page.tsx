'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, FileText, Play, Brain, Check } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function MCQPracticePage() {
  const router = useRouter();

  const units = [
    { id: '1', name: 'Unit 1: Basic Economic Concepts', price: 10 },
    { id: '2', name: 'Unit 2: Economic Indicators and the Business Cycle', price: 10 },
    { id: '3', name: 'Unit 3: National Income and Price Determination', price: 10 },
    { id: '4', name: 'Unit 4: Financial Sector', price: 10 },
    { id: '5', name: 'Unit 5: Long-Run Consequences of Stabilization Policies', price: 10 },
    { id: '6', name: 'Unit 6: Open Economy—International Trade and Finance', price: 10 },
  ];

  const bundlePrice = 49;

  const handlePurchase = (item: { type: 'unit' | 'bundle', id?: string, price: number }) => {
    const params = new URLSearchParams();
    params.set('total', item.price.toString());
    
    if (item.type === 'bundle') {
      params.set('bundle', 'true');
    } else {
      params.set('units', item.id!);
    }
    
    router.push(`/purchase/mcq-practice?${params.toString()}`);
  };

  return (
    <div className="min-h-screen pt-20 pb-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              AP Dojo Practice Tests
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              AP-aligned practice tests with teacher-led video explanation
            </p>
          </div>

          {/* Reordered Layout: Paid Content First, then Free */}
          <div className="space-y-16">
            
            {/* Top Section: Unit Tests with Video Explanations (Paid) */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
                Unit Tests + Detailed Video Explanations
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                
                {/* Bundle Option */}
                <div className="bg-white rounded-lg overflow-hidden shadow-lg flex flex-col">
                  <div className="relative">
                    <Image src="/images/MasterMCQs.PNG" alt="MCQ Explanations Thumbnail" width={500} height={300} className="w-full object-cover" />
                  </div>
                  <div className="p-4 flex flex-col flex-grow">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-bold text-gray-900">All 6 Units Bundle</h3>
                      <p className="text-lg font-semibold text-green-600">$49</p>
                    </div>
                    <ul className="text-gray-600 text-sm mt-2 list-disc list-inside space-y-1 flex-grow">
                      <li>Includes all 6 units exams</li>
                      <li>$11 discount</li>
                    </ul>
                    <Button 
                      onClick={() => handlePurchase({ type: 'bundle', price: bundlePrice })}
                      className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md text-sm mt-4"
                    >
                      Purchase
                    </Button>
                  </div>
                </div>
                
                {/* Individual Unit Options */}
                {units.map((unit) => (
                  <div key={unit.id} className="bg-white rounded-lg overflow-hidden shadow-lg flex flex-col">
                    <div className="relative">
                      <Image src="/images/MasterMCQs.PNG" alt="MCQ Explanations Thumbnail" width={500} height={300} className="w-full object-cover" />
                    </div>
                    <div className="p-4 flex flex-col flex-grow">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-bold text-gray-900">{`Unit ${unit.id} Test`}</h3>
                        <p className="text-lg font-semibold text-gray-800">${unit.price}</p>
                      </div>
                      <ul className="text-gray-600 text-sm mt-2 list-disc list-inside space-y-1 flex-grow">
                        <li>15 MCQs</li>
                        <li>2 FRQs</li>
                        <li>Detailed Video Explanations</li>
                      </ul>
                      <Button 
                        onClick={() => handlePurchase({ type: 'unit', id: unit.id, price: unit.price })}
                        className="w-full bg-gray-800 hover:bg-gray-900 text-white font-semibold py-2 px-4 rounded-md text-sm mt-4"
                      >
                        Purchase
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
