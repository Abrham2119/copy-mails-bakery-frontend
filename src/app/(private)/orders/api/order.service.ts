/**
 * orders/api — order service (Application layer transport).
 *
 * Uses the shared apiClient, builds query strings via the shared builder, and
 * returns domain types. Endpoint strings come from the central registry.
 */

import { apiClient } from "@/infrastructure/api/api";
import { API_ENDPOINTS } from "@/infrastructure/api/endpoints";
import { buildQueryString } from "@/lib/query-builder";
import type { Order, OrderResponse } from "@/domain/entities/order.types";
import type { OrderParams } from "../types/api";

export const orderService = {
  getOrders: async (params?: OrderParams): Promise<OrderResponse> => {
    const queryString = buildQueryString(params ?? {});
    const { data } = await apiClient.get<OrderResponse>(
      `${API_ENDPOINTS.order.root}${queryString}`,
    );
    return data;
  },

  getOrderById: async (id: string): Promise<Order> => {
    const { data } = await apiClient.get<{ data: Order }>(API_ENDPOINTS.order.byId(id));
    return data.data;
  },

  createOrder: async (payload: Partial<Order>): Promise<Order> => {
    const { data } = await apiClient.post<{ data: Order }>(API_ENDPOINTS.order.root, payload);
    return data.data;
  },
};
