"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { ArrowLeftIcon, ArrowRightIcon } from "@/components/ui/icons";
import { slides } from "@/constant/catalog";

const AUTOPLAY_MS = 5000;

/** Hero slideshow with autoplay, arrows and dot navigation. */
export function HeroSlideshow() {
  const [index, setIndex] = useState(0);
  const count = slides.length;

  const go = useCallback(
    (next: number) => setIndex((next + count) % count),
    [count]
  );

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % count), AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [count]);

  return (
    <section className="relative h-[78vh] min-h-[460px] w-full overflow-hidden md:h-[88vh] md:min-h-[620px]">
      {slides.map((slide, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-700 ${
            i === index ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
          aria-hidden={i !== index}
        >
          <Image
            src={slide.image}
            alt={slide.heading}
            fill
            priority={i === 0}
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 flex items-center">
            <Container>
              <div className="max-w-md">
                <p
                  className="mb-2 font-body text-lg font-medium"
                  style={{ color: slide.subColor }}
                >
                  {slide.sub}
                </p>
                <h2
                  className="font-heading text-4xl md:text-6xl"
                  style={{ color: slide.headingColor }}
                >
                  {slide.heading}
                </h2>
                <div
                  className="my-4 font-heading text-5xl md:text-7xl"
                  style={{ color: slide.offerColor }}
                >
                  {slide.offer}
                </div>
                <a href="#" className="btn-theme">
                  {slide.button}
                </a>
              </div>
            </Container>
          </div>
        </div>
      ))}

      <button
        type="button"
        aria-label="Previous slide"
        onClick={() => go(index - 1)}
        className="absolute left-4 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-ink transition-colors hover:bg-brand hover:text-white"
      >
        <ArrowLeftIcon />
      </button>
      <button
        type="button"
        aria-label="Next slide"
        onClick={() => go(index + 1)}
        className="absolute right-4 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-ink transition-colors hover:bg-brand hover:text-white"
      >
        <ArrowRightIcon />
      </button>

      <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => go(i)}
            className={`h-2.5 rounded-full transition-all ${
              i === index ? "w-6 bg-white" : "w-2.5 bg-white/60"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
