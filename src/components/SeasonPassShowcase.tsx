'use client';

import React from 'react';
import { PricingComparisonTable } from '@/components/PricingComparisonTable';

export function SeasonPassShowcase() {
  return (
    <div className="w-full pt-16 sm:pt-24 pb-8 sm:pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Pricing Comparison Table */}
        <PricingComparisonTable />
      </div>
    </div>
  );
}

