"use client";

/**
 * features/products — ProductCard (commerce).
 *
 * NOTE: distinct from the marketing home page's card in
 * `src/components/card/ProductCard.tsx`. This one binds to the API `Product`
 * domain type and the cart store.
 */

import type { Product } from "@/domain/entities/product.types";
import { Button } from "@/components/ui/Button";
import { Image } from "@/components/ui/Image";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";

export function ProductCard({ product }: { product: Product }) {
  const addItem = useCartStore((s) => s.addItem);

  return (
    <article className="group flex flex-col gap-3 rounded-xl border border-line p-3">
      <div className="aspect-square w-full overflow-hidden rounded-lg bg-line/40">
        <Image
          src={product.image}
          alt={product.name}
          className="h-full w-full transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="flex-1">
        <h3 className="line-clamp-1 text-sm font-medium">{product.name}</h3>
        <p className="mt-1 text-sm text-ink/70">
          {product.currency} {product.price.toFixed(2)}
        </p>
      </div>
      <Button
        size="sm"
        disabled={!product.in_stock}
        onClick={() => {
          addItem(product);
          toast.success(`${product.name} added to cart`);
        }}
      >
        {product.in_stock ? "Add to cart" : "Out of stock"}
      </Button>
    </article>
  );
}
