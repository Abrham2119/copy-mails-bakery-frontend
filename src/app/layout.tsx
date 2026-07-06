import type { Metadata, Viewport } from "next";
import { SITE } from "@/constant/site";
import { fontVariables } from "@/config/fonts";

import "./globals.css";

export const metadata: Metadata = {
  title: SITE.name,
  description: SITE.tagline,
  icons: { icon: "/images/icon.png" },
  openGraph: {
    siteName: SITE.tagline,
    title: SITE.name,
    description: SITE.tagline,
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={fontVariables}>
      <body className="bg-white font-body text-ink antialiased">{children}</body>
    </html>
  );
}
