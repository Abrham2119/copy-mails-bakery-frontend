/**
 * features/reviews — service (Step C).
 * Uses the shared apiClient; endpoint from the central registry.
 */

import { apiClient } from "@/infrastructure/api/api";
import { API_ENDPOINTS } from "@/infrastructure/api/endpoints";
import type { Review } from "@/domain/entities/review.types";

export const reviewService = {
  getByProduct: async (productId: string): Promise<Review[]> => {
    const { data } = await apiClient.get<{ data: Review[] }>(
      API_ENDPOINTS.reviews.byProduct(productId),
    );
    return data.data;
  },
};
