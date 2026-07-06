import Image from "next/image";
import type { Product } from "@/domain/entities/catalog.types";
import { BagIcon, CompareIcon, EyeIcon, HeartIcon } from "@/components/ui/icons";

/**
 * Product grid card — featured image with a hover cross-fade to a second
 * image, hover action icons, optional sale badge, title and price.
 */
export function ProductCard({ product }: { product: Product }) {
  return (
    <div className="group text-center">
      <div className="relative overflow-hidden rounded-theme bg-form">
        <a href={"#"} className="block">
          <div className="relative aspect-square">
            <Image
              src={product.image}
              alt={product.title}
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className="object-cover transition-opacity duration-500 group-hover:opacity-0"
            />
            <Image
              src={product.hoverImage}
              alt=""
              aria-hidden
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className="object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            />
          </div>
        </a>

        {product.onSale && (
          <span className="absolute left-4 top-4 rounded-full bg-brand px-3 py-1 text-xs font-semibold uppercase text-white">
            Sale
          </span>
        )}

        {/* Hover action icons */}
        <div className="absolute right-4 top-4 flex translate-x-4 flex-col gap-2 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
          {[
            { Icon: HeartIcon, label: "Add to wishlist" },
            { Icon: CompareIcon, label: "Compare" },
            { Icon: EyeIcon, label: "Quick view" },
          ].map(({ Icon, label }) => (
            <button
              key={label}
              type="button"
              aria-label={label}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white text-ink shadow-light transition-colors hover:bg-brand hover:text-white"
            >
              <Icon />
            </button>
          ))}
        </div>
      </div>

      <h6 className="mt-4 font-body text-base font-medium">
        <a href={"#"} className="transition-colors hover:text-brand">
          {product.title}
        </a>
      </h6>

      <div className="mt-1 font-body text-sm">
        {product.salePrice ? (
          <span className="space-x-2">
            <span className="font-semibold text-brand">{product.salePrice}</span>
            {product.wasPrice && (
              <span className="text-gray-400 line-through">{product.wasPrice}</span>
            )}
          </span>
        ) : (
          <span className="font-semibold">{product.price}</span>
        )}
      </div>

      <div className="mt-3">
        <button type="button" className="btn-theme">
          <BagIcon className="mr-2 h-4 w-4" />
          Add to Cart
        </button>
      </div>
    </div>
  );
}
