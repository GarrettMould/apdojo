export function PageContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-6xl mx-auto px-6">
      {children}
    </div>
  );
} 