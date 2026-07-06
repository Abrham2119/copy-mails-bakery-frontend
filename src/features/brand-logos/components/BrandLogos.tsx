import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Carousel } from "@/components/ui/Carousel";
import { brandLogos } from "@/constant/catalog";

/** Brand / partner logos strip. */
export function BrandLogos() {
  return (
    <section className="border-y border-line py-14">
      <Container>
        <Carousel itemClassName="w-1/2 sm:w-1/3 lg:w-1/5">
          {brandLogos.map((logo, i) => (
            <div key={i} className="flex h-20 items-center justify-center">
              <Image
                src={logo}
                alt={`Brand ${i + 1}`}
                width={140}
                height={70}
                className="h-auto max-h-16 w-auto object-contain opacity-60 grayscale transition hover:opacity-100 hover:grayscale-0"
              />
            </div>
          ))}
        </Carousel>
      </Container>
    </section>
  );
}
