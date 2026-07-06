/** features/products — ProductCardSkeleton. */

export function ProductCardSkeleton() {
  return (
    <div className="animate-pulse space-y-3 rounded-xl border border-line p-3">
      <div className="aspect-square w-full rounded-lg bg-line" />
      <div className="h-4 w-3/4 rounded bg-line" />
      <div className="h-4 w-1/3 rounded bg-line" />
    </div>
  );
}
