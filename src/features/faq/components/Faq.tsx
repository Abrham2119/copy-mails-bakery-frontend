"use client";

import { useState } from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { faqHeading, faqImage, faqs } from "@/constant/catalog";

/** FAQ accordion on the green panel; one item open at a time. */
export function Faq() {
  const [open, setOpen] = useState(0);

  return (
    <section className="bg-[#cdea7e] py-20">
      <Container>
        <SectionHeading heading={faqHeading} mainColor="#000000" />
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2">
          {faqImage && (
            <div className="relative mx-auto aspect-square w-full max-w-md overflow-hidden rounded-theme">
              <Image
                src={faqImage}
                alt="Frequently asked questions"
                fill
                sizes="(max-width: 768px) 90vw, 45vw"
                className="object-cover"
              />
            </div>
          )}
          <div className="space-y-3">
            {faqs.map((item, i) => {
              const isOpen = open === i;
              return (
                <div key={i} className="overflow-hidden rounded-theme bg-white">
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left"
                  >
                    <span
                      className={`font-heading text-h5 ${isOpen ? "text-brand" : "text-ink"}`}
                    >
                      {item.q}
                    </span>
                    <span className="text-2xl leading-none text-brand">
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>
                  <div
                    className={`grid transition-all duration-300 ${
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="px-6 pb-5 font-body text-sm leading-relaxed text-ink/80">
                        {item.a}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
