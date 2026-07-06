# Cakes & Bakes — Next.js + Tailwind Rebuild

A component-based rebuild of the **DT "Cakes & Bakes"** Shopify storefront as a
modern **Next.js (App Router) + TypeScript + Tailwind CSS** application, following
Clean Architecture. The original 14 MB saved HTML page was analyzed, its content
and design tokens extracted, and every section re-authored as a small,
data-driven React component styled purely with Tailwind utilities.

## Quick start

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run start    # serve the production build
```

## Approach

- **Pure Tailwind + ported design tokens.** The theme's CSS custom properties
  (colors, fonts, radii, container width, font sizes) were ported into
  `tailwind.config.ts` as design tokens (`brand`, `accent`, `ink`, `line`,
  `font-heading`, `rounded-btn`, `max-w-container`, …). Components use only
  Tailwind utilities + a couple of small `@layer components` helpers
  (`.theme-container`, `.btn-theme`). No legacy stylesheet remains.
- **Typography via `next/font`.** Poppins (body), Lobster Two (headings) and
  Work Sans are loaded with `next/font/google` and exposed as CSS variables.
- **Component-based sections.** Each Shopify section is a self-contained
  component under `src/features/<section>/`, rendered from typed data — not
  from preserved HTML. Repeated UI is factored into reusable primitives
  (`ProductCard`, `Carousel`, `SectionHeading`, `Container`, icon set).
- **Interactivity as React.** Slideshow autoplay/dots/arrows, product tabs,
  carousels, the FAQ accordion, mobile menu and back-to-top are all real React
  state/components.
- **Data layer.** Content (products, slides, blog posts, FAQs, menu cards,
  pricing, brand logos, nav, footer) lives as typed constants in
  `src/constants/`, typed by `src/types/catalog.ts`.

## Project structure

```
src/
├─ app/
│  ├─ layout.tsx            Root layout: next/font wiring + globals + metadata
│  └─ page.tsx              Home page: composes the section components
├─ components/
│  ├─ ui/                   Reusable primitives
│  │  ├─ Container.tsx      1400px max-width container
│  │  ├─ SectionHeading.tsx Cupcake motif + sub/main heading (per-section colors)
│  │  ├─ ProductCard.tsx    Image hover-swap, action icons, sale badge, price
│  │  ├─ Carousel.tsx       Client scroll-snap carousel with arrows
│  │  └─ icons.tsx          Inline SVG icon set
│  └─ layout/
│     ├─ Header.tsx         Utility bar, logo, nav, icons, mobile menu (client)
│     ├─ Footer.tsx         Contact, link columns, newsletter, socials
│     └─ BackToTop.tsx      Scroll-to-top button (client)
├─ features/                One folder + component per section:
│  ├─ slideshow/HeroSlideshow.tsx        (client, autoplay)
│  ├─ linkedlist-menu/FeelTheTaste.tsx
│  ├─ product-carousel/BestSelling.tsx
│  ├─ deal-carousel/NatureTaste.tsx
│  ├─ product-tab/LatestCollection.tsx   (client, tabs)
│  ├─ deal-banner/DealBanner.tsx
│  ├─ pricing-block/MenuItems.tsx
│  ├─ blog/FromTheBlog.tsx
│  ├─ faq/Faq.tsx                         (client, accordion)
│  ├─ support-block/SupportBlock.tsx
│  └─ brand-logos/BrandLogos.tsx
├─ constants/               Typed data: catalog.ts, navigation.ts, footer.ts, site.ts
├─ types/                   catalog.ts — domain types
└─ styles/                  globals.css — Tailwind layers + theme helpers

public/images/              Migrated images (decoded from the original snapshot)
tools/                      Extraction pipeline used to derive content/tokens
```

## Migration pipeline (`tools/`)

| Script | Responsibility |
| --- | --- |
| `extract.py` | Decode base64 assets from the original HTML → `public/images`. |
| `extract_data.py` | Parse section content into structured `tools/data.json`. |
| `gen_data_ts.py` | Generate the typed `src/constants/catalog.ts` from `data.json`. |

## Notes

- This is a faithful **re-creation** of the original look using Tailwind, not a
  byte-identical copy of the legacy CSS. Colors, fonts, spacing and layout were
  matched against the original via design tokens and screenshots.
- There is no Shopify backend; product/cart links and the newsletter form are
  inert placeholders, as in a static marketing rebuild.
