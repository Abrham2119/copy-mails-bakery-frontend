"use client";

import { useRef, type ReactNode } from "react";
import { ArrowLeftIcon, ArrowRightIcon } from "@/components/ui/icons";

interface CarouselProps {
  children: ReactNode[];
  /** Tailwind width classes per item (controls items-per-view). */
  itemClassName?: string;
  className?: string;
}

/**
 * Lightweight horizontal carousel: a scroll-snap track with prev/next arrows.
 * Replaces the theme's Swiper for the product/logo rows.
 */
export function Carousel({
  children,
  itemClassName = "w-[85%] sm:w-1/2 lg:w-1/4",
  className = "",
}: CarouselProps) {
  const track = useRef<HTMLDivElement>(null);

  const scrollBy = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  };

  return (
    <div className={`relative ${className}`}>
      <div
        ref={track}
        className="flex snap-x snap-mandatory gap-0 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {children.map((child, i) => (
          <div key={i} className={`shrink-0 snap-start px-[15px] ${itemClassName}`}>
            {child}
          </div>
        ))}
      </div>

      <button
        type="button"
        aria-label="Previous"
        onClick={() => scrollBy(-1)}
        className="absolute -left-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-white text-ink shadow-light transition-colors hover:bg-brand hover:text-white"
      >
        <ArrowLeftIcon />
      </button>
      <button
        type="button"
        aria-label="Next"
        onClick={() => scrollBy(1)}
        className="absolute -right-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-white text-ink shadow-light transition-colors hover:bg-brand hover:text-white"
      >
        <ArrowRightIcon />
      </button>
    </div>
  );
}
