/** features/products — product service. Returns domain types. */

import { apiClient } from "@/infrastructure/api/api";
import { API_ENDPOINTS } from "@/infrastructure/api/endpoints";
import { buildQueryString } from "@/lib/query-builder";
import type { Product } from "@/domain/entities/product.types";
import type { ProductParams, ProductListResponse } from "../types/api";

export const productService = {
  getProducts: async (params?: ProductParams): Promise<ProductListResponse> => {
    const { data } = await apiClient.get<ProductListResponse>(
      `${API_ENDPOINTS.products.root}${buildQueryString(params ?? {})}`,
    );
    return data;
  },
  getProductById: async (id: string): Promise<Product> => {
    const { data } = await apiClient.get<{ data: Product }>(API_ENDPOINTS.products.byId(id));
    return data.data;
  },
};
