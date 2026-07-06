/**
 * Route: /products — protected products listing (composes the products feature).
 */

import { Suspense } from "react";
import { PageSkeletonLoader } from "@/components/skeleton/PageSkeletonLoader";
import { ProductGrid } from "@/features/products";

export default function ProductsPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Products</h1>
      <Suspense fallback={<PageSkeletonLoader />}>
        <ProductGrid />
      </Suspense>
    </div>
  );
}
