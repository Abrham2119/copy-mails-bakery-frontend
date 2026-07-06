"use client";

/**
 * features/reviews — data hook (Step C). Returns { data, isLoading, error }.
 */

import { useQuery } from "@tanstack/react-query";
import { reviewService } from "../api/reviewService";
import { reviewKeys } from "../lib/reviewKeys";

export const useReviews = (productId: string) =>
  useQuery({
    queryKey: reviewKeys.byProduct(productId),
    queryFn: () => reviewService.getByProduct(productId),
    enabled: !!productId,
  });
