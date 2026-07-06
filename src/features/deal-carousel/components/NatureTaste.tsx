import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { dealsHeading } from "@/constant/catalog";

const FEATURED = {
  title: "Gourmet Cake",
  price: "$395.00",
  image: "/images/asset-9f56a5b635d0.jpg",
  blurb:
    "Hand-crafted with the finest natural ingredients. A rich, indulgent treat baked fresh for your special celebrations.",
};

/** "Nature Taste" — featured deal product on a soft-pink panel. */
export function NatureTaste() {
  return (
    <section className="bg-[#ffe1ec] py-20">
      <Container>
        <SectionHeading heading={dealsHeading} mainColor="#ff599a" />
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2">
          <div className="relative mx-auto aspect-[4/3] w-full max-w-xl overflow-hidden rounded-theme">
            <Image
              src={FEATURED.image}
              alt={FEATURED.title}
              fill
              sizes="(max-width: 768px) 90vw, 45vw"
              className="object-cover"
            />
          </div>
          <div className="text-center md:text-left">
            <h3 className="mb-3 font-heading text-h3 text-ink">{FEATURED.title}</h3>
            <p className="mb-4 font-body text-lg font-semibold text-brand">
              {FEATURED.price}
            </p>
            <p className="mb-6 font-body leading-relaxed text-ink/80">
              {FEATURED.blurb}
            </p>
            <a href="#" className="btn-theme">
              Shop Now
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
