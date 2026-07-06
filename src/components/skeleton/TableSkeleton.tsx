/**
 * components/skeleton — TableSkeleton. Loading placeholder for data tables.
 */

export function TableSkeleton({ rows = 6 }: { rows?: number }) {
  return (
    <div className="animate-pulse space-y-2">
      <div className="h-10 w-full rounded bg-line" />
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="h-12 w-full rounded bg-line/60" />
      ))}
    </div>
  );
}
