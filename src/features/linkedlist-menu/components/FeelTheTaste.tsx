import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { menuCards, menuHeading } from "@/constant/catalog";

// Per-card background tints, matching the original (teal / pink / yellow).
const CARD_BG = ["#bfe9e7", "#ffd9e6", "#fdeebb"];

/** "Feel the Taste" — three colored collection cards. */
export function FeelTheTaste() {
  return (
    <section className="py-20">
      <Container>
        <SectionHeading heading={menuHeading} mainColor="#add50f" />
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {menuCards.map((card, i) => (
            <div
              key={card.title}
              className="rounded-theme p-8 text-center"
              style={{ backgroundColor: CARD_BG[i % CARD_BG.length] }}
            >
              <div className="relative mx-auto mb-6 aspect-square w-full max-w-[260px] overflow-hidden rounded-theme">
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  sizes="(max-width: 768px) 90vw, 30vw"
                  className="object-cover"
                />
              </div>
              <h4 className="mb-3 font-heading text-h4 text-ink">
                <a href="#" className="transition-colors hover:text-brand">
                  {card.title}
                </a>
              </h4>
              <p className="mb-6 font-body text-sm leading-relaxed text-ink/80">
                {card.desc}
              </p>
              <a href="#" className="btn-theme">
                Shop Now
              </a>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
