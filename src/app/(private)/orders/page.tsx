/**
 * Route: /orders  (app/(private)/orders/page.tsx)
 *
 * Thin page: composes the feature component inside a Suspense boundary. No
 * fetching or business logic in the page itself.
 */

import { Suspense } from "react";
import { PageSkeletonLoader } from "@/components/skeleton/PageSkeletonLoader";
import { OrderTable } from "./_components/OrderTable";

export default function OrdersPage() {
  return (
    <Suspense fallback={<PageSkeletonLoader />}>
      <OrderTable />
    </Suspense>
  );
}
