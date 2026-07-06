import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { dealBanner } from "@/constant/catalog";

/** Promo banner — cake image with welcome heading and a call to action. */
export function DealBanner() {
  return (
    <section className="py-20">
      <Container>
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2">
          {dealBanner.image && (
            <div className="relative mx-auto aspect-[4/3] w-full max-w-xl overflow-hidden rounded-theme">
              <Image
                src={dealBanner.image}
                alt={dealBanner.sub || "Cakes & Bakes"}
                fill
                sizes="(max-width: 768px) 90vw, 45vw"
                className="object-cover"
              />
            </div>
          )}
          <div className="text-center md:text-left">
            <p className="mb-2 font-body text-lg font-medium text-brand">
              {dealBanner.heading}
            </p>
            <h2 className="mb-6 font-heading text-h3 text-ink md:text-h2">
              {dealBanner.sub}
            </h2>
            <a href="#" className="btn-theme">
              {dealBanner.button}
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
