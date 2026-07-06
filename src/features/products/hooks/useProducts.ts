"use client";

/** features/products — data hooks (TanStack Query). */

import { useQuery } from "@tanstack/react-query";
import { productService } from "../api/productService";
import type { ProductParams } from "../types/api";

const productKeys = {
  all: ["products"] as const,
  list: (params?: ProductParams) => [...productKeys.all, "list", params] as const,
  byId: (id: string) => [...productKeys.all, "detail", id] as const,
};

export const useProducts = (params?: ProductParams) =>
  useQuery({
    queryKey: productKeys.list(params),
    queryFn: () => productService.getProducts(params),
  });

export const useProduct = (id: string) =>
  useQuery({
    queryKey: productKeys.byId(id),
    queryFn: () => productService.getProductById(id),
    enabled: !!id,
  });
