"use client";

/**
 * orders/_components — OrderTable.
 *
 * Feature component: reads listing params from the URL, fetches via useOrders,
 * and renders the three canonical states (loading skeleton, error, empty) before
 * the grid. "Dumb" about transport — all of it lives in the hook/service.
 */

import { useOrders } from "../hooks/useOrders";
import { orderColumns } from "./OrderColumn";
import { useListingParams } from "@/hooks/useListingParams";
import { BasicDataGridTable } from "@/components/table/BasicDataGridTable";
import { TableSkeleton } from "@/components/skeleton/TableSkeleton";
import { AppErrorState, AppEmptyState } from "@/components/feedback";
import type { Order } from "@/domain/entities/order.types";

export function OrderTable() {
  const { page, limit, setPage } = useListingParams();
  const { data, isLoading, error, refetch } = useOrders({ page, limit });

  if (isLoading) return <TableSkeleton />;
  if (error) return <AppErrorState onRetry={() => refetch()} />;
  if (!data?.data.length) return <AppEmptyState message="No orders yet" />;

  const meta = data.pagination;
  return (
    <BasicDataGridTable<Order>
      title="My Orders"
      columns={orderColumns}
      data={data.data}
      currentPage={meta.page ?? 1}
      totalPages={meta.total_pages ?? 1}
      onPageChange={setPage}
      getRowId={(o) => o._id}
    />
  );
}
