'use client';

import React from 'react';
import { FullVideoLibrary } from '@/components/FullVideoLibrary';

interface VideoLibraryPageProps {
  params: Promise<{
    subject: string;
  }>;
}

export default function VideoLibraryPage({ params }: VideoLibraryPageProps) {
  const unwrappedParams = React.use(params);
  const subject = unwrappedParams.subject === 'macro' 
    ? 'AP Macroeconomics' 
    : 'AP Microeconomics';

  return <FullVideoLibrary subject={subject} />;
} 