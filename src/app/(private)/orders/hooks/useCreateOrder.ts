"use client";

/**
 * orders/hooks — create mutation with precise cache invalidation.
 */

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { orderService } from "../api/order.service";
import { orderKeys } from "../lib/orderKeys";

export function useCreateOrder() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: orderService.createOrder,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: orderKeys.all }),
  });
}
