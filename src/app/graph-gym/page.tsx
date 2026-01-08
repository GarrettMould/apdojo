'use client';

import { GraphGym } from '@/components/GraphGym';
import { CourseProvider } from '@/contexts/CourseContext';

export default function GraphGymPage() {
  return (
    <CourseProvider>
      <GraphGym />
    </CourseProvider>
  );
}



