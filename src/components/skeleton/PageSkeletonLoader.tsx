/**
 * components/skeleton — PageSkeletonLoader.
 *
 * Full-page loading placeholder used as a Suspense fallback for lazy routes.
 */

export function PageSkeletonLoader() {
  return (
    <div className="mx-auto w-full max-w-5xl animate-pulse space-y-4 p-6">
      <div className="h-8 w-48 rounded bg-line" />
      <div className="h-64 w-full rounded-xl bg-line" />
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-24 rounded-lg bg-line" />
        ))}
      </div>
    </div>
  );
}
