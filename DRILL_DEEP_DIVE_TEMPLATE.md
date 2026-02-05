# Drill Deep Dive Page Template

This guide shows how to create a new deep-dive page for any dojo drill.

## Quick Start

1. **Create the page file**: `src/app/unit-[N]/[drill-slug]-deep-dive/page.tsx`
2. **Create the layout file**: `src/app/unit-[N]/[drill-slug]-deep-dive/layout.tsx`
3. **Use the `DrillDeepDive` component**

## Example: Basic Page (No Custom Content)

```tsx
'use client';

import { DrillDeepDive } from '@/components/DrillDeepDive';

export default function MyDrillDeepDivePage() {
  return (
    <DrillDeepDive
      drillId="your-drill-id-from-dojoDrills"
      backLink="/ap-macro-unit-1-cheat-sheet"
      backLinkText="Back to Unit 1 Cheat Sheet"
    />
  );
}
```

## Example: Page with Custom Stage 2 Content

```tsx
'use client';

import { DrillDeepDive } from '@/components/DrillDeepDive';

export default function MyDrillDeepDivePage() {
  // Custom Stage 2 content (optional)
  const stage2Content = (
    <div className="bg-white border-2 border-black rounded-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-8 mb-8">
      <h2 className="text-3xl font-bold text-black mb-4">
        Your Custom Title
      </h2>
      <p className="text-lg text-gray-700 mb-6 leading-relaxed">
        Your custom explanation content here.
      </p>
      {/* Add images, diagrams, lists, etc. */}
    </div>
  );

  return (
    <DrillDeepDive
      drillId="your-drill-id"
      backLink="/ap-macro-unit-1-cheat-sheet"
      backLinkText="Back to Unit 1 Cheat Sheet"
      stage2Content={stage2Content}
    />
  );
}
```

## Example: Page with Custom Key Takeaways

```tsx
'use client';

import { DrillDeepDive } from '@/components/DrillDeepDive';

export default function MyDrillDeepDivePage() {
  // Custom Key Takeaways (optional)
  const keyTakeaways = (
    <div className="bg-yellow-50 border-4 border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-8">
      <h2 className="text-2xl font-black text-black mb-6">Key Takeaways</h2>
      <ul className="space-y-4">
        <li className="flex items-start gap-4">
          <span className="text-2xl">📊</span>
          <div>
            <strong className="text-black">Takeaway 1:</strong> Description here.
          </div>
        </li>
        <li className="flex items-start gap-4">
          <span className="text-2xl">✅</span>
          <div>
            <strong className="text-black">Takeaway 2:</strong> Description here.
          </div>
        </li>
      </ul>
    </div>
  );

  return (
    <DrillDeepDive
      drillId="your-drill-id"
      backLink="/ap-macro-unit-1-cheat-sheet"
      backLinkText="Back to Unit 1 Cheat Sheet"
      keyTakeaways={keyTakeaways}
    />
  );
}
```

## Layout File Template

```tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Your Drill Title Deep Dive: Description | AP Dojo',
  description: 'Your SEO description here.',
  openGraph: {
    title: 'Your Drill Title Deep Dive: Description | AP Dojo',
    description: 'Your SEO description here.',
  },
  alternates: {
    canonical: 'https://apdojo.com/unit-1/your-drill-slug-deep-dive',
  },
};

export default function MyDrillDeepDiveLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
```

## What the Component Handles Automatically

- ✅ Video from `drill.stage1.videoUrl`
- ✅ Comprehension questions from `drill.stage1.comprehensionQuestions`
- ✅ MCQ questions from `drill.stage3.mcqIds`
- ✅ Answer selection and feedback
- ✅ Question explanations
- ✅ Styling consistent with Unit Cheat Sheets
- ✅ SEO-friendly semantic HTML

## Finding Drill IDs

Check `src/data/dojoDrills.ts` for available drill IDs. Examples:
- `ppc-and-opportunity-cost-macro`
- `absolute-and-comparative-advantage-macro`
- `absolute-and-comparative-advantage-micro`

## Real Examples

- **PPC**: `src/app/unit-1/ppc-deep-dive/page.tsx`
- **Comparative Advantage**: `src/app/unit-1/comparative-advantage-deep-dive/page.tsx`
