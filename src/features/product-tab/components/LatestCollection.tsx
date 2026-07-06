"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Carousel } from "@/components/ui/Carousel";
import { ProductCard } from "@/components/card/ProductCard";
import { productTabs, tabHeading } from "@/constant/catalog";

/** "Latest Collection" — tabbed product carousels (Vanilla/Strawberry/…). */
export function LatestCollection() {
  const [active, setActive] = useState(productTabs[0]?.id ?? "");
  const current = productTabs.find((t) => t.id === active) ?? productTabs[0];

  return (
    <section className="py-20">
      <Container>
        <SectionHeading heading={tabHeading} mainColor="#f3d600" />

        <div className="mb-10 flex flex-wrap justify-center gap-3">
          {productTabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActive(tab.id)}
              className={`rounded-btn border-2 px-6 py-2 font-body text-sm font-medium transition-colors ${
                tab.id === active
                  ? "border-brand bg-brand text-white"
                  : "border-accent bg-white text-ink hover:border-brand hover:bg-brand hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {current && (
          <Carousel key={current.id}>
            {current.products.map((product, i) => (
              <ProductCard key={i} product={product} />
            ))}
          </Carousel>
        )}
      </Container>
    </section>
  );
}
