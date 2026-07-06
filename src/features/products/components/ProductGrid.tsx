"use client";

/**
 * features/products — ProductGrid.
 * Reads listing params from the URL, fetches via useProducts, renders the three
 * canonical states then the grid.
 */

import { useProducts } from "../hooks/useProducts";
import { ProductCard } from "./ProductCard";
import { ProductCardSkeleton } from "./ProductCardSkeleton";
import { useListingParams } from "@/hooks/useListingParams";
import { AppErrorState, AppEmptyState } from "@/components/feedback";

export function ProductGrid() {
  const { page, limit } = useListingParams({ limit: 12 });
  const { data, isLoading, error, refetch } = useProducts({ page, limit });

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    );
  }
  if (error) return <AppErrorState onRetry={() => refetch()} />;
  if (!data?.data.length) return <AppEmptyState message="No products found" />;

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {data.data.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
}
