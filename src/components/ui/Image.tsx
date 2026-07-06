"use client";

/**
 * components/ui — Image wrapper.
 *
 * In Next.js you'd usually reach for `next/image`; this thin wrapper is the
 * lightweight escape hatch when you need lazy loading + a graceful fallback on
 * error for remote/uncontrolled sources.
 */

import { useState } from "react";
import { cn } from "@/lib/utils/cn";

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallback?: string;
}

export function Image({ className, fallback = "/images/placeholder.png", ...props }: ImageProps) {
  const [src, setSrc] = useState(props.src);
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      {...props}
      src={src}
      alt={props.alt ?? ""}
      loading="lazy"
      decoding="async"
      onError={() => setSrc(fallback)}
      className={cn("object-cover", className)}
    />
  );
}
