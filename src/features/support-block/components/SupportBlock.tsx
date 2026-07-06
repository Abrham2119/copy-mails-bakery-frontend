import Image from "next/image";
import { Container } from "@/components/ui/Container";

const FEATURES = [
  {
    icon: "/images/asset-5778bf8c803f.png",
    title: "Money Back Guarantee",
    text: "Send Within 30 days",
  },
  {
    icon: "/images/asset-dccc8e83529a.png",
    title: "24/7 Customer Service",
    text: "Call Us 24/7 at 000 -123 - 456",
  },
  {
    icon: "/images/asset-5cb2bd0f8353.png",
    title: "Free Shipping World Wide",
    text: "On Order Over $23 - 7 Days A Week",
  },
];

/** Service guarantees strip (money-back / support / free shipping). */
export function SupportBlock() {
  return (
    <section className="py-16">
      <Container>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="flex items-center gap-4 rounded-theme border border-line p-6"
            >
              <Image
                src={f.icon}
                alt=""
                width={56}
                height={56}
                className="h-14 w-14 shrink-0 object-contain"
              />
              <div>
                <h5 className="font-heading text-h5 text-ink">{f.title}</h5>
                <p className="font-body text-sm text-ink/70">{f.text}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
