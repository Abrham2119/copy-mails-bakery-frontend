"use client";

/**
 * orders/_components — column + status config (carried over from the guide).
 *
 * Presentational mapping only: order status → label/classes/dot. No data logic.
 */

import type { Column } from "@/components/table/BasicDataGridTable";
import type { Order, OrderStatus } from "@/domain/entities/order.types";
import { Badge } from "@/components/ui/Badge";

export const statusConfig: Record<OrderStatus, { label: string; classes: string; dot: string }> = {
  pending: { label: "Pending", classes: "bg-amber-500/10 text-amber-600 border-amber-500/20", dot: "bg-amber-500" },
  processing: { label: "Processing", classes: "bg-blue-500/10 text-blue-600 border-blue-500/20", dot: "bg-blue-500" },
  shipped: { label: "Shipped", classes: "bg-purple-500/10 text-purple-600 border-purple-500/20", dot: "bg-purple-500" },
  delivered: { label: "Delivered", classes: "bg-green-500/10 text-green-600 border-green-500/20", dot: "bg-green-500" },
  cancelled: { label: "Cancelled", classes: "bg-zinc-500/10 text-zinc-500 border-zinc-500/20", dot: "bg-zinc-400" },
  refunded: { label: "Refunded", classes: "bg-red-500/10 text-red-600 border-red-500/20", dot: "bg-red-500" },
};

export const orderColumns: Column<Order>[] = [
  { key: "_id", header: "Order", render: (o) => <span className="font-mono text-xs">#{o._id.slice(-6)}</span> },
  { key: "items_count", header: "Items", render: (o) => o.items_count ?? o.items?.length ?? 0 },
  { key: "total_amount", header: "Total", render: (o) => `${o.currency} ${o.total_amount.toFixed(2)}` },
  {
    key: "status",
    header: "Status",
    render: (o) => {
      const c = statusConfig[o.status];
      return (
        <Badge className={c.classes} dotClassName={c.dot}>
          {c.label}
        </Badge>
      );
    },
  },
  { key: "placed_at", header: "Placed", render: (o) => new Date(o.placed_at).toLocaleDateString() },
];
