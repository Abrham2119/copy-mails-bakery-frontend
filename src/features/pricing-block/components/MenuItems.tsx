import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { pricingHeading, pricingItems, pricingImage } from "@/constant/catalog";

/** "Menu Items" — price-list panel on the teal background. */
export function MenuItems() {
  return (
    <section className="relative bg-teal py-20 text-white">
      {pricingImage && (
        <Image
          src={pricingImage}
          alt=""
          aria-hidden
          fill
          sizes="100vw"
          className="object-cover opacity-20"
        />
      )}
      <Container className="relative">
        <SectionHeading
          heading={pricingHeading}
          mainColor="#ffffff"
          subColor="#ffe450"
        />
        <div className="grid grid-cols-1 gap-x-16 gap-y-8 md:grid-cols-2">
          {pricingItems.map((item, i) => (
            <div key={i} className="border-b border-white/20 pb-6">
              <h5 className="mb-2 font-heading text-h5 text-white">
                <a href="#" className="transition-colors hover:text-accent">
                  {item.title}
                </a>
              </h5>
              <p className="font-body text-sm leading-relaxed text-white/85">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
