import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Carousel } from "@/components/ui/Carousel";
import { ProductCard } from "@/components/card/ProductCard";
import { bestSelling, bestSellingHeading } from "@/constant/catalog";

/** "Best selling Products" — horizontal product carousel. */
export function BestSelling() {
  return (
    <section className="py-20">
      <Container>
        <SectionHeading heading={bestSellingHeading} mainColor="#36ded8" />
        <Carousel>
          {bestSelling.map((product, i) => (
            <ProductCard key={i} product={product} />
          ))}
        </Carousel>
      </Container>
    </section>
  );
}
