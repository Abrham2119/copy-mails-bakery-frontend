/** Header navigation + branding. */
export interface NavItem {
  label: string;
  href: string;
  hasDropdown?: boolean;
}

export const LOGO = "/images/asset-fb340a8b1c66.png";

export const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "#", hasDropdown: true },
  { label: "Collection", href: "#", hasDropdown: true },
  { label: "Shop", href: "#", hasDropdown: true },
  { label: "Cookies Cakes", href: "#" },
  { label: "Wedding Cakes", href: "#" },
  { label: "Cup Cakes", href: "#" },
  { label: "Pages", href: "#", hasDropdown: true },
];
