/**
 * Route: /orders/[id]  (app/(private)/orders/[id]/page.tsx)
 *
 * In Next.js 15 `params` is a Promise — await it, then hand the id to the
 * feature component.
 */

import { Suspense } from "react";
import { PageSkeletonLoader } from "@/components/skeleton/PageSkeletonLoader";
import { OrderDetail } from "../_components/OrderDetail";

export default async function OrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <Suspense fallback={<PageSkeletonLoader />}>
      <OrderDetail id={id} />
    </Suspense>
  );
}
