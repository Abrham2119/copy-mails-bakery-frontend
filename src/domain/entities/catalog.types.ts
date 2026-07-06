/** Domain types for the storefront catalog and homepage content. */

export interface Heading {
  sub: string | null;
  main: string | null;
}

export interface Product {
  title: string;
  image: string;
  hoverImage: string;
  price: string;
  salePrice: string | null;
  wasPrice: string | null;
  onSale: boolean;
}

export interface ProductTab {
  id: string;
  label: string;
  products: Product[];
}

export interface Slide {
  image: string;
  sub: string;
  subColor: string;
  heading: string;
  headingColor: string;
  offer: string;
  offerColor: string;
  button: string;
}

export interface MenuCard {
  title: string;
  desc: string;
  image: string;
}

export interface DealBanner {
  image: string;
  heading: string;
  sub: string;
  button: string;
}

export interface PricingItem {
  title: string;
  desc: string;
}

export interface BlogPost {
  image: string;
  title: string;
  date: string;
  author: string;
  comments: number;
}

export interface Faq {
  q: string;
  a: string;
}
