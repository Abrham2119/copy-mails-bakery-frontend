/** features/reviews — query-key factory. */

export const reviewKeys = {
  all: ["reviews"] as const,
  byProduct: (productId: string) => [...reviewKeys.all, "product", productId] as const,
};
