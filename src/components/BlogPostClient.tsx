'use client';

import { BlogContentWithKeyTerms } from './BlogContentWithKeyTerms';
import { SidebarScrollTriggeredBox } from './SidebarScrollTriggeredBox';
import { processBlogContent } from '@/utils/processBlogContent';
import { processMathContent } from '@/utils/processMathContent';

interface BlogPostClientProps {
  content: React.ReactNode;
  subject?: 'ap_microeconomics' | 'ap_macroeconomics';
  practiceUrl?: string;
  images?: string[];
}

/**
 * Client component that wraps blog content and manages scroll-triggered practice box
 * The practice box appears in the sidebar at the scroll position where trigger fires
 */
export function BlogPostClient({
  content,
  subject = 'ap_macroeconomics',
  practiceUrl = '/unitFRQpracticePage',
  images = []
}: BlogPostClientProps) {
  // Process content to replace [IMAGE:N] placeholders with actual images
  const processedContent = processBlogContent(content, images);
  
  // Process content to render KaTeX math formulas
  const mathProcessedContent = processMathContent(processedContent);

  return (
    <div className="prose prose-xl max-w-none prose-blue text-lg [&_p]:leading-relaxed [&_p]:mb-6 [&_li]:leading-relaxed [&_h2]:mb-6 [&_h3]:mb-4">
      <BlogContentWithKeyTerms subject={subject}>
        {mathProcessedContent}
      </BlogContentWithKeyTerms>
      {/* Trigger that makes practice box appear in sidebar at this scroll position */}
      <SidebarScrollTriggeredBox practiceUrl={practiceUrl} />
    </div>
  );
}

