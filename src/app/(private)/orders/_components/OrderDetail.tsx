"use client";

/**
 * orders/_components — OrderDetail.
 *
 * Reads a single order by id via useOrderById and renders a summary. Receives
 * `id` from the page (which extracts it from route params).
 */

import { useOrderById } from "../hooks/useOrders";
import { statusConfig } from "./OrderColumn";
import { PageSkeletonLoader } from "@/components/skeleton/PageSkeletonLoader";
import { AppErrorState } from "@/components/feedback";
import { Badge } from "@/components/ui/Badge";

export function OrderDetail({ id }: { id: string }) {
  const { data: order, isLoading, error, refetch } = useOrderById(id);

  if (isLoading) return <PageSkeletonLoader />;
  if (error || !order) return <AppErrorState onRetry={() => refetch()} />;

  const c = statusConfig[order.status];
  return (
    <div className="mx-auto max-w-2xl space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Order #{order._id.slice(-6)}</h1>
        <Badge className={c.classes} dotClassName={c.dot}>
          {c.label}
        </Badge>
      </div>

      <dl className="grid grid-cols-2 gap-4 rounded-xl border border-line p-4 text-sm">
        <div>
          <dt className="text-ink/60">Placed</dt>
          <dd>{new Date(order.placed_at).toLocaleString()}</dd>
        </div>
        <div>
          <dt className="text-ink/60">Items</dt>
          <dd>{order.items_count ?? order.items?.length ?? 0}</dd>
        </div>
        <div>
          <dt className="text-ink/60">Subtotal</dt>
          <dd>
            {order.currency} {order.subtotal.toFixed(2)}
          </dd>
        </div>
        <div>
          <dt className="text-ink/60">Total</dt>
          <dd className="font-semibold">
            {order.currency} {order.total_amount.toFixed(2)}
          </dd>
        </div>
      </dl>
    </div>
  );
}
