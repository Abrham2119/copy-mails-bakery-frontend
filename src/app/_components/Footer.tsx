import { Container } from "@/components/ui/Container";
import { SITE } from "@/constant/site";
import { FOOTER_COLUMNS, NEWSLETTER } from "@/constant/footer";
import {
  HomeIcon,
  PhoneIcon,
  ClockIcon,
  MailIcon,
  ChevronRightIcon,
  FacebookIcon,
  PinterestIcon,
  InstagramIcon,
} from "@/components/ui/icons";

const SOCIALS = [
  { Icon: FacebookIcon, label: "Facebook", href: SITE.social.facebook },
  { Icon: PinterestIcon, label: "Pinterest", href: SITE.social.pinterest },
  { Icon: InstagramIcon, label: "Instagram", href: SITE.social.instagram },
];

/** Site footer: contact, link columns, newsletter, and the copyright bar. */
export function Footer() {
  return (
    <footer className="bg-black text-white">
      <Container className="grid grid-cols-1 gap-10 py-16 md:grid-cols-2 lg:grid-cols-4">
        {/* Contact */}
        <div>
          <h4 className="mb-6 font-heading text-h5 text-brand">Contact us</h4>
          <ul className="space-y-4 text-sm text-white/90">
            <li className="flex gap-3">
              <HomeIcon className="mt-0.5 shrink-0 text-white" />
              <span>{SITE.contact.address}</span>
            </li>
            <li className="flex items-center gap-3">
              <PhoneIcon className="shrink-0 text-white" />
              <span>{SITE.contact.phone}</span>
            </li>
            <li className="flex items-center gap-3">
              <ClockIcon className="shrink-0 text-white" />
              <span>{SITE.contact.hours}</span>
            </li>
            <li className="flex items-center gap-3">
              <MailIcon className="shrink-0 text-accent" />
              <span>{SITE.contact.email}</span>
            </li>
          </ul>
        </div>

        {/* Link columns */}
        {FOOTER_COLUMNS.map((col) => (
          <div key={col.title}>
            <h4 className="mb-6 font-heading text-h5 text-brand">{col.title}</h4>
            <ul className="space-y-3 text-sm">
              {col.links.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="inline-flex items-center gap-2 text-white/90 transition-colors hover:text-brand"
                  >
                    <ChevronRightIcon className="h-4 w-4 text-white/60" />
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Newsletter */}
        <div>
          <h4 className="mb-6 font-heading text-h5 text-brand">{NEWSLETTER.title}</h4>
          <form
            className="flex flex-col gap-3"
            onSubmit={undefined}
            action="#"
          >
            <input
              type="email"
              placeholder={NEWSLETTER.placeholder}
              aria-label="Email address"
              className="w-full rounded-btn bg-white px-5 py-3 text-sm text-ink outline-none"
            />
            <button type="submit" className="btn-theme self-start">
              {NEWSLETTER.button}
            </button>
          </form>
          <p className="mt-4 text-sm text-white/80">{NEWSLETTER.blurb}</p>
        </div>
      </Container>

      {/* Copyright bar */}
      <div className="border-t border-white/15">
        <Container className="flex flex-col items-center justify-between gap-4 py-6 text-sm text-white/80 md:flex-row">
          <p>{SITE.copyright}</p>
          <div className="flex items-center gap-4">
            {SOCIALS.map(({ Icon, label, href }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="text-white/80 transition-colors hover:text-brand"
              >
                <Icon />
              </a>
            ))}
          </div>
        </Container>
      </div>
    </footer>
  );
}
