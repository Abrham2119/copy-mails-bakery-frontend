/** Footer link columns + social links (from the original storefront). */
export interface FooterColumn {
  title: string;
  links: string[];
}

export const FOOTER_COLUMNS: FooterColumn[] = [
  {
    title: "Help",
    links: ["Search", "Help", "Information", "Privacy Policy", "Shipping Details"],
  },
  {
    title: "Support",
    links: ["Contact us", "About us", "Careers", "Refunds & Returns", "Deliveries"],
  },
];

export const NEWSLETTER = {
  title: "Newsletter",
  blurb: "Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.",
  placeholder: "Your email address",
  button: "Sign Up",
};
