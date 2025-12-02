'use client';

interface BlogPostSidebarProps {
  keyTakeaway?: string;
}

/**
 * Sidebar component that shows key takeaway
 * Practice box is rendered here via portal when scroll trigger fires
 */
export function BlogPostSidebar({ 
  keyTakeaway
}: BlogPostSidebarProps) {
  return (
    <aside className="hidden lg:block lg:col-span-1 relative" data-blog-sidebar>
      <div className="relative min-h-full">
        <div className="sticky top-24 space-y-6">
          {keyTakeaway && (
            <div className="p-6 border-2 border-blue-500 bg-white rounded-lg shadow-lg">
              <h3 className="text-lg font-bold text-gray-800 mb-3">Key Takeaway</h3>
              <p className="text-sm text-gray-600">
                {keyTakeaway}
              </p>
            </div>
          )}
        </div>
        {/* Practice box will be portaled here when trigger fires */}
      </div>
    </aside>
  );
}

