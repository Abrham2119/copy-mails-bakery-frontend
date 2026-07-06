/**
 * stores — cart store (Zustand, global client state).
 *
 * Shopping cart items, quantities and totals. Client-owned and shared across
 * routes. Persisted so the cart survives refreshes. Select narrowly in
 * components (`useCartStore((s) => s.items)`) to avoid extra renders.
 */

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "@/domain/entities/product.types";

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  setQuantity: (productId: string, quantity: number) => void;
  clear: () => void;
  count: () => number;
  total: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product, quantity = 1) =>
        set((s) => {
          const existing = s.items.find((i) => i.product._id === product._id);
          return existing
            ? {
                items: s.items.map((i) =>
                  i.product._id === product._id
                    ? { ...i, quantity: i.quantity + quantity }
                    : i,
                ),
              }
            : { items: [...s.items, { product, quantity }] };
        }),
      removeItem: (productId) =>
        set((s) => ({ items: s.items.filter((i) => i.product._id !== productId) })),
      setQuantity: (productId, quantity) =>
        set((s) => ({
          items: s.items.map((i) =>
            i.product._id === productId ? { ...i, quantity: Math.max(1, quantity) } : i,
          ),
        })),
      clear: () => set({ items: [] }),
      count: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
      total: () => get().items.reduce((sum, i) => sum + i.product.price * i.quantity, 0),
    }),
    { name: "cart-store" },
  ),
);
