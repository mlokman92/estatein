import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { getFooterColumns, getSocialLinks, getSiteContent } from "@/lib/queries";
import type { FooterContent } from "@/lib/content";
import { NewsletterForm } from "./NewsletterForm";

export async function Footer() {
  const [columns, socials, footer] = await Promise.all([
    getFooterColumns(),
    getSocialLinks(),
    getSiteContent<FooterContent>("global.footer"),
  ]);

  const year = new Date().getFullYear();
  const copyright = (
    footer?.copyright ?? "©{year} Estatein. All Rights Reserved."
  ).replace("{year}", String(year));
  const terms = footer?.legalLinks?.[0];
  const placeholder = footer?.newsletterPlaceholder ?? "Enter Your Email";

  return (
    <footer className="border-t border-line bg-bg">
      <Container className="py-16 lg:py-20">
        <div className="flex flex-col gap-12 lg:flex-row lg:gap-20">
          {/* Brand + subscribe */}
          <div className="flex flex-col gap-7 lg:w-[420px] lg:shrink-0">
            <Logo />
            <NewsletterForm placeholder={placeholder} />
          </div>

          {/* Link columns */}
          <div className="grid flex-1 grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3 lg:grid-cols-5 lg:gap-x-6">
            {columns.map((column) => (
              <nav key={column.id} aria-label={column.heading}>
                <h2 className="mb-5 text-xl font-medium text-muted">
                  {column.heading}
                </h2>
                <div className="flex flex-col gap-3">
                  {column.links.map((link) => (
                    <a
                      key={link.id}
                      href={link.href ?? "#"}
                      className="text-lg font-medium text-white transition-colors hover:text-purple-light"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </nav>
            ))}
          </div>
        </div>
      </Container>

      {/* Bottom bar */}
      <div className="bg-surface">
        <Container className="flex flex-wrap items-center justify-between gap-4 py-8">
          <div className="flex flex-wrap items-center gap-x-8 gap-y-2">
            <p className="text-lg font-medium text-white">{copyright}</p>
            {terms && (
              <a
                href={terms.href ?? "#"}
                className="text-lg font-medium text-white transition-colors hover:text-purple-light"
              >
                {terms.label}
              </a>
            )}
          </div>
          <div className="flex items-center gap-2.5">
            {socials.map((social) => (
              <a
                key={social.id}
                href={social.url ?? "#"}
                aria-label={social.platform}
                className="grid size-13 place-items-center rounded-full bg-bg text-white transition-colors hover:bg-elevated"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                  className="size-6"
                >
                  {social.svg_path && <path d={social.svg_path} />}
                </svg>
              </a>
            ))}
          </div>
        </Container>
      </div>
    </footer>
  );
}
