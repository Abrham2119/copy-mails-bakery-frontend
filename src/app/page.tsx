import { Header } from "@/app/_components/Header";
import { Footer } from "@/app/_components/Footer";
import { BackToTop } from "@/app/_components/BackToTop";

import { HeroSlideshow } from "@/features/slideshow/components/HeroSlideshow";
import { FeelTheTaste } from "@/features/linkedlist-menu/components/FeelTheTaste";
import { BestSelling } from "@/features/product-carousel/components/BestSelling";
import { NatureTaste } from "@/features/deal-carousel/components/NatureTaste";
import { LatestCollection } from "@/features/product-tab/components/LatestCollection";
import { DealBanner } from "@/features/deal-banner/components/DealBanner";
import { MenuItems } from "@/features/pricing-block/components/MenuItems";
import { FromTheBlog } from "@/features/blog/components/FromTheBlog";
import { Faq } from "@/features/faq/components/Faq";
import { SupportBlock } from "@/features/support-block/components/SupportBlock";
import { BrandLogos } from "@/features/brand-logos/components/BrandLogos";

/**
 * Home page — component-based rebuild of the original DT index template.
 * Each section is a self-contained, data-driven Tailwind component.
 */
export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <HeroSlideshow />
        <FeelTheTaste />
        <BestSelling />
        <NatureTaste />
        <LatestCollection />
        <DealBanner />
        <MenuItems />
        <FromTheBlog />
        <Faq />
        <SupportBlock />
        <BrandLogos />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
