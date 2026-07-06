import type { Heading } from "@/domain/entities/catalog.types";

/** Small cupcake glyph that sits above each section heading (theme motif). */
function Cupcake({ color }: { color: string }) {
  return (
    <svg width="34" height="34" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M6 10h12l-1.4 9.2a1 1 0 0 1-1 .8H8.4a1 1 0 0 1-1-.8L6 10Z"
        fill={color}
        opacity="0.9"
      />
      <path
        d="M7 10a5 5 0 0 1 10 0M12 3v2M9 4.5l.6 1.6M15 4.5l-.6 1.6"
        stroke={color}
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

/**
 * Section heading: centered cupcake motif, a small sub-heading, and the large
 * Lobster Two main heading. Colors are per-section (ported from the theme).
 */
export function SectionHeading({
  heading,
  mainColor = "#000000",
  subColor = "#000000",
  className = "",
}: {
  heading: Heading;
  mainColor?: string;
  subColor?: string;
  className?: string;
}) {
  return (
    <div className={`mb-10 text-center ${className}`}>
      <div className="mb-2 flex justify-center">
        <Cupcake color={mainColor} />
      </div>
      {heading.sub && (
        <h5
          className="mb-1 font-body text-base font-normal tracking-wide"
          style={{ color: subColor }}
        >
          {heading.sub}
        </h5>
      )}
      {heading.main && (
        <h2
          className="font-heading text-[40px] leading-tight md:text-h2"
          style={{ color: mainColor }}
        >
          {heading.main}
        </h2>
      )}
    </div>
  );
}
