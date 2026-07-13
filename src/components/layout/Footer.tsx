import { Mail, Send } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";

type LinkColumn = {
  heading: string;
  links: string[];
};

const linkColumns: LinkColumn[] = [
  {
    heading: "Home",
    links: ["Hero Section", "Features", "Properties", "Testimonials", "FAQ's"],
  },
  {
    heading: "About Us",
    links: ["Our Story", "Our Works", "How It Works", "Our Team", "Our Clients"],
  },
  {
    heading: "Properties",
    links: ["Portfolio", "Categories"],
  },
  {
    heading: "Services",
    links: [
      "Valuation Mastery",
      "Strategic Marketing",
      "Negotiation Wizardry",
      "Closing Success",
      "Property Management",
    ],
  },
  {
    heading: "Contact Us",
    links: ["Contact Form", "Our Offices"],
  },
];

// Brand glyphs as inline SVG paths (lucide dropped brand icons in v1).
const socials = [
  {
    label: "Facebook",
    path: "M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.326-.043-1.557-.14-2.857-.14C11.928 2 10 3.657 10 6.7v2.8H7v4h3V22h4v-8.5z",
  },
  {
    label: "LinkedIn",
    path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
  },
  {
    label: "X (formerly Twitter)",
    path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
  },
  {
    label: "YouTube",
    path: "M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z",
  },
];

const copyright = "©2023 Estatein. All Rights Reserved.";

export function Footer() {
  return (
    <footer className="border-t border-line bg-bg">
      <Container className="py-16 lg:py-20">
        <div className="flex flex-col gap-12 lg:flex-row lg:gap-20">
          {/* Brand + subscribe */}
          <div className="flex flex-col gap-7 lg:w-[420px] lg:shrink-0">
            <Logo />
            <form
              action="#"
              className="flex items-center gap-3 rounded-btn border border-line bg-surface py-1.5 pl-4 pr-2"
            >
              <Mail aria-hidden="true" className="size-5 shrink-0 text-muted" />
              <input
                type="email"
                aria-label="Enter your email"
                placeholder="Enter Your Email"
                className="min-w-0 flex-1 bg-transparent text-sm text-white placeholder-muted outline-none"
              />
              <button
                type="submit"
                aria-label="Subscribe"
                className="grid size-10 place-items-center rounded-btn text-white transition-colors hover:text-purple-light"
              >
                <Send aria-hidden="true" className="size-6" />
              </button>
            </form>
          </div>

          {/* Link columns */}
          <div className="grid flex-1 grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3 lg:grid-cols-5 lg:gap-x-6">
            {linkColumns.map((column) => (
              <nav key={column.heading} aria-label={column.heading}>
                <h2 className="mb-5 text-xl font-medium text-muted">
                  {column.heading}
                </h2>
                <div className="flex flex-col gap-3">
                  {column.links.map((link) => (
                    <a
                      key={link}
                      href="#"
                      className="text-lg font-medium text-white transition-colors hover:text-purple-light"
                    >
                      {link}
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
            <a
              href="#"
              className="text-lg font-medium text-white transition-colors hover:text-purple-light"
            >
              Terms &amp; Conditions
            </a>
          </div>
          <div className="flex items-center gap-2.5">
            {socials.map(({ label, path }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="grid size-13 place-items-center rounded-full bg-bg text-white transition-colors hover:bg-elevated"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                  className="size-6"
                >
                  <path d={path} />
                </svg>
              </a>
            ))}
          </div>
        </Container>
      </div>
    </footer>
  );
}
