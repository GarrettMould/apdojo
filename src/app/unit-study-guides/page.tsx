'use client';

import React from 'react';
import Link from 'next/link';
import { BookOpen, Play, Target } from 'lucide-react';
import { useAuthContext } from '@/contexts/AuthContext';
import { AuthGate } from '@/components/AuthGate';

// Unit information - you can expand this with more details
const unitInfo = [
  {
    id: 1,
    title: "Basic Economic Concepts",
    description: "Scarcity, opportunity cost, and production possibilities",
    videoCount: 8,
    termCount: 12,
    color: "blue"
  },
  {
    id: 2,
    title: "Economic Indicators and the Business Cycle",
    description: "GDP, unemployment, inflation, and economic cycles",
    videoCount: 10,
    termCount: 15,
    color: "green"
  },
  {
    id: 3,
    title: "National Income and Price Determination",
    description: "Aggregate demand, aggregate supply, and equilibrium",
    videoCount: 12,
    termCount: 18,
    color: "purple"
  },
  {
    id: 4,
    title: "Financial Sector",
    description: "Money, banking, and monetary policy",
    videoCount: 9,
    termCount: 14,
    color: "orange"
  },
  {
    id: 5,
    title: "Stabilization Policies",
    description: "Fiscal policy, monetary policy, and their effects",
    videoCount: 11,
    termCount: 16,
    color: "red"
  },
  {
    id: 6,
    title: "Open Economy—International Trade and Finance",
    description: "International trade, exchange rates, and balance of payments",
    videoCount: 7,
    termCount: 13,
    color: "indigo"
  }
];

const getColorClasses = (color: string) => {
  const colorMap = {
    blue: {
      bg: 'bg-blue-100',
      text: 'text-blue-600',
      border: 'border-blue-200',
      hover: 'hover:border-blue-300 hover:bg-blue-50'
    },
    green: {
      bg: 'bg-green-100',
      text: 'text-green-600',
      border: 'border-green-200',
      hover: 'hover:border-green-300 hover:bg-green-50'
    },
    purple: {
      bg: 'bg-purple-100',
      text: 'text-purple-600',
      border: 'border-purple-200',
      hover: 'hover:border-purple-300 hover:bg-purple-50'
    },
    orange: {
      bg: 'bg-orange-100',
      text: 'text-orange-600',
      border: 'border-orange-200',
      hover: 'hover:border-orange-300 hover:bg-orange-50'
    },
    red: {
      bg: 'bg-red-100',
      text: 'text-red-600',
      border: 'border-red-200',
      hover: 'hover:border-red-300 hover:bg-red-50'
    },
    indigo: {
      bg: 'bg-indigo-100',
      text: 'text-indigo-600',
      border: 'border-indigo-200',
      hover: 'hover:border-indigo-300 hover:bg-indigo-50'
    }
  };
  return colorMap[color as keyof typeof colorMap] || colorMap.blue;
};

export default function UnitStudyGuidesPage() {
  const { user } = useAuthContext();

  // Check if user is authenticated
  if (!user) {
    return <AuthGate />;
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <div className="text-center py-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Unit Study Guides
          </h1>
          <p className="text-lg text-gray-600">
            Comprehensive study materials for each AP Macroeconomics unit
          </p>
        </div>

        {/* Units Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {unitInfo.map((unit) => {
            const colors = getColorClasses(unit.color);
            
            return (
              <Link key={unit.id} href={`/unit/${unit.id}`}>
                <div className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 p-6 cursor-pointer h-64 flex flex-col">
                  {/* Unit Header */}
                  <div className="mb-4">
                    <h3 className="text-lg font-bold text-gray-900">Unit {unit.id}</h3>
                    <p className="text-sm text-gray-500">{unit.title}</p>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 text-sm mb-6 leading-relaxed flex-1">
                    {unit.description}
                  </p>

                  {/* View Button */}
                  <div className="mt-auto">
                    <div className="bg-transparent border-2 border-blue-300 hover:bg-blue-50 text-blue-500 font-semibold py-2 px-6 text-center rounded-lg transition-colors duration-200">
                      View
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12 mb-8">
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Ready to start learning?
            </h3>
            <p className="text-gray-600 mb-4">
              Choose a unit above to begin your AP Macroeconomics journey
            </p>
            <Link href="/ap-macro-course">
              <div className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200">
                <Play className="w-4 h-4" />
                <span className="font-medium">Go to Course</span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 