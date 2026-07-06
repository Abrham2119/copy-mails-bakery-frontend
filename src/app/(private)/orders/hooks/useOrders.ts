"use client";

/**
 * orders/hooks — TanStack Query data hooks.
 *
 * Hooks wrap the service and expose { data, isLoading, error }. They never call
 * apiClient and never contain business logic — orchestration only.
 */

import { useQuery } from "@tanstack/react-query";
import { orderService } from "../api/order.service";
import { orderKeys } from "../lib/orderKeys";
import type { OrderParams } from "../types/api";

export const useOrders = (params?: OrderParams) =>
  useQuery({
    queryKey: orderKeys.list(params),
    queryFn: () => orderService.getOrders(params),
  });

export const useOrderById = (id: string) =>
  useQuery({
    queryKey: orderKeys.byId(id),
    queryFn: () => orderService.getOrderById(id),
    enabled: !!id,
  });
