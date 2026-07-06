"use client";

import { useState, type SVGProps } from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { LOGO, NAV_ITEMS } from "@/constant/navigation";
import { SearchIcon, UserIcon, HeartIcon, BagIcon } from "@/components/ui/icons";

const ChevronDown = (p: SVGProps<SVGSVGElement>) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden {...p}>
    <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const BoltIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden {...p}>
    <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" />
  </svg>
);
const PhoneAppIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden {...p}>
    <rect x="7" y="2" width="10" height="20" rx="2" />
    <path d="M11 18h2" />
  </svg>
);

const SearchPill = ({ id }: { id: string }) => (
  <form action="#" role="search" className="relative w-full">
    <input
      id={id}
      type="search"
      placeholder="Search for cakes & products."
      aria-label="Search for cakes and products"
      className="w-full rounded-full border border-line bg-white py-3 pl-6 pr-12 text-sm text-ink outline-none transition-colors placeholder:text-gray-400 focus:border-brand"
    />
    <button
      type="submit"
      aria-label="Search"
      className="absolute right-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full text-gray-500 hover:text-brand"
    >
      <SearchIcon />
    </button>
  </form>
);

/**
 * Site header (MyDawa-style). The announcement bar scrolls away; the main row
 * (logo, search and action pills) is sticky and stays pinned to the top while
 * scrolling. The bar is a top-level sibling so its sticky containing block is
 * the page — keeping it pinned for the whole scroll.
 */
export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Announcement bar — scrolls away */}
      <div className="bg-brand text-white">
        <Container className="flex h-10 items-center justify-center overflow-hidden text-sm font-medium">
          <p className="truncate">
            Fresh cakes baked daily — free delivery on orders over $23 this week!
          </p>
        </Container>
      </div>

      {/* Sticky bar — logo, search and action pills stay pinned */}
      <header className="sticky top-0 z-50 border-b border-line bg-white shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
        <Container className="flex items-center gap-4 py-4">
          <button
            type="button"
            aria-label="Open menu"
            className="text-ink lg:hidden"
            onClick={() => setMobileOpen((v) => !v)}
          >
            <span className="block h-0.5 w-6 bg-ink" />
            <span className="mt-1.5 block h-0.5 w-6 bg-ink" />
            <span className="mt-1.5 block h-0.5 w-6 bg-ink" />
          </button>

          {/* Logo (unchanged) */}
          <a href="#" aria-label="Cakes & Bakes home" className="shrink-0">
            <Image
              src={LOGO}
              alt="Cakes & Bakes"
              width={120}
              height={64}
              priority
              className="h-14 w-auto"
            />
          </a>

          {/* Search pill */}
          <div className="mx-2 hidden max-w-2xl flex-1 md:block">
            <SearchPill id="search-desktop" />
          </div>

          {/* Action pills */}
          <div className="ml-auto flex items-center gap-2 md:gap-3">
            <button
              type="button"
              className="hidden items-center gap-2 rounded-full bg-gray-100 px-4 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-gray-200 lg:flex"
            >
              <PhoneAppIcon />
              Get the App
              <ChevronDown className="text-gray-500" />
            </button>

            <button
              type="button"
              className="hidden items-center gap-2 rounded-full bg-accent/30 px-4 py-2 text-left transition-colors hover:bg-accent/50 sm:flex"
            >
              <BoltIcon className="text-brand" />
              <span className="leading-tight">
                <span className="block text-[11px] text-gray-500">Delivery to</span>
                <span className="block text-sm font-semibold text-ink">Your City</span>
              </span>
              <ChevronDown className="text-gray-500" />
            </button>

            <button
              type="button"
              aria-label="Wishlist"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-gray-100 text-ink transition-colors hover:bg-gray-200 hover:text-brand"
            >
              <HeartIcon />
            </button>

            <button
              type="button"
              className="hidden items-center gap-2 rounded-full bg-gray-100 px-4 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-gray-200 sm:flex"
            >
              <UserIcon className="h-5 w-5" />
              Sign In
            </button>

            <button
              type="button"
              aria-label="Cart"
              className="relative flex h-11 w-11 items-center justify-center rounded-full bg-gray-100 text-ink transition-colors hover:bg-gray-200 hover:text-brand"
            >
              <BagIcon />
              <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-brand px-1 text-[10px] font-semibold text-white">
                0
              </span>
            </button>
          </div>
        </Container>

        {/* Mobile search (part of the sticky bar) */}
        <Container className="pb-4 md:hidden">
          <SearchPill id="search-mobile" />
        </Container>

        {/* Primary navigation — sticky together with the bar */}
        <nav className="hidden border-t border-line lg:block">
        <Container>
          <ul className="flex items-center justify-center gap-8 py-3 font-body text-sm font-medium uppercase tracking-wide">
            {NAV_ITEMS.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className="inline-flex items-center gap-1 text-ink transition-colors hover:text-brand"
                >
                  {item.label}
                  {item.hasDropdown && <ChevronDown className="text-gray-400" />}
                </a>
              </li>
            ))}
          </ul>
        </Container>
        </nav>
      </header>

      {/* Mobile navigation */}
      {mobileOpen && (
        <nav className="border-b border-line bg-white lg:hidden">
          <ul className="flex flex-col py-2 font-body text-sm font-medium uppercase">
            {NAV_ITEMS.map((item) => (
              <li key={item.label} className="border-b border-line/60 last:border-0">
                <a href={item.href} className="block px-4 py-3 text-ink hover:text-brand">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </>
  );
}
