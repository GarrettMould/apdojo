'use client';

import { BlogContentWithKeyTerms } from './BlogContentWithKeyTerms';
import { SidebarScrollTriggeredBox } from './SidebarScrollTriggeredBox';

interface BlogPostClientProps {
  content: React.ReactNode;
  subject?: 'ap_microeconomics' | 'ap_macroeconomics';
  practiceUrl?: string;
}

/**
 * Client component that wraps blog content and manages scroll-triggered practice box
 * The practice box appears in the sidebar at the scroll position where trigger fires
 */
export function BlogPostClient({
  content,
  subject = 'ap_macroeconomics',
  practiceUrl = '/unitFRQpracticePage'
}: BlogPostClientProps) {
  return (
    <div className="prose prose-xl max-w-none prose-blue text-lg">
      <BlogContentWithKeyTerms subject={subject}>
        {content}
      </BlogContentWithKeyTerms>
      {/* Trigger that makes practice box appear in sidebar at this scroll position */}
      <SidebarScrollTriggeredBox practiceUrl={practiceUrl} />
    </div>
  );
}

