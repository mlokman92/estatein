"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { Sparkle } from "@/components/ui/Sparkle";
import { cn } from "@/lib/cn";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Properties", href: "/properties" },
  { label: "Services", href: "/services" },
];

const BANNER_TEXT = "Discover Your Dream Property with Estatein";

// Closes the native <details> menu after a nav choice (progressive
// enhancement — the menu still opens/closes natively if JS never runs).
function closeMenu(e: React.MouseEvent<HTMLElement>) {
  e.currentTarget.closest("details")?.removeAttribute("open");
}

export function Header() {
  const pathname = usePathname();

  // Mobile only: hide the sticky header when scrolling down, reveal it the
  // moment the user scrolls back up (desktop keeps it in normal flow).
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;

    const update = () => {
      const y = window.scrollY;
      // Only start hiding once past the header's own height, and require a
      // small delta so tiny jitters don't toggle it.
      if (y > lastY + 4 && y > 120) {
        setHidden(true);
      } else if (y < lastY - 4) {
        setHidden(false);
      }
      lastY = y;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // A link is "current" only for real routes (not the "#" placeholders).
  const isActive = (href: string) =>
    href !== "#" &&
    (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b border-line transition-transform duration-300 lg:relative lg:translate-y-0",
        hidden && "-translate-y-full",
      )}
    >
      {/* Top announcement banner — dismissible via a checkbox + label (pure
          CSS) so the close button works even if React never hydrates. */}
      <input
        type="checkbox"
        id="dismiss-banner"
        aria-label="Dismiss announcement"
        className="peer sr-only"
      />
      <div className="relative overflow-hidden border-b border-line bg-surface peer-checked:hidden">
        <div
          aria-hidden="true"
          className="bg-grid pointer-events-none absolute inset-0 opacity-40"
        />
        <Container className="relative">
          <div className="flex items-center justify-center py-3 pr-8 sm:py-[18px] sm:pr-12">
            <p className="flex items-center gap-1.5 whitespace-nowrap text-xs text-white sm:gap-2 sm:text-sm md:text-base 3xl:text-lg">
              <Sparkle size={12} className="shrink-0 text-purple-light" />
              <span>{BANNER_TEXT}</span>
              <a
                href="#"
                className="font-medium text-white underline decoration-white/60 underline-offset-2 hover:decoration-white"
              >
                Learn More
              </a>
            </p>
          </div>
        </Container>
        <label
          htmlFor="dismiss-banner"
          aria-label="Dismiss announcement"
          className="absolute right-4 top-1/2 flex -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white/10 p-1 text-white transition-colors hover:bg-white/20 sm:right-6 lg:right-8"
        >
          <X className="size-6" />
        </label>
      </div>

      {/* Navigation bar */}
      <div className="bg-surface">
        <Container>
          <div className="relative flex items-center justify-between py-4 3xl:py-5">
            <Logo />

            {/* Desktop nav links (centered) */}
            <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-[30px] lg:flex">
              {NAV_LINKS.map((link) => {
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      // Same box (padding + 1px border) in both states so the
                      // centered nav never changes width between pages.
                      "rounded-btn border px-5 py-3 text-base font-medium transition-colors 3xl:px-6 3xl:py-3.5 3xl:text-lg",
                      active
                        ? "border-line bg-bg text-white"
                        : "border-transparent text-white hover:text-muted",
                    )}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* Right side */}
            <div className="flex items-center gap-3">
              <Button
                variant="dark"
                size="md"
                href="/contact"
                className="hidden bg-bg lg:inline-flex 3xl:text-lg"
              >
                Contact Us
              </Button>

              {/* Mobile menu — a native <details> element so it opens/closes
                  via the browser itself, with NO JavaScript. This makes it
                  immune to hydration/cache failures that can kill React click
                  handlers on real devices. */}
              <details className="group lg:hidden">
                <summary
                  aria-label="Toggle navigation menu"
                  className="inline-flex cursor-pointer list-none select-none items-center justify-center rounded-btn border border-line bg-bg p-2.5 text-white transition-colors hover:border-line-strong [&::-webkit-details-marker]:hidden"
                >
                  <Menu
                    className="size-6 group-open:hidden"
                    aria-hidden="true"
                  />
                  <X
                    className="hidden size-6 group-open:block"
                    aria-hidden="true"
                  />
                </summary>

                {/* Full-width dropdown panel below the nav bar (overlays content) */}
                <div className="absolute inset-x-0 top-full z-50 border-t border-line bg-surface pb-6 shadow-xl">
                  <nav className="flex flex-col gap-2 pt-4">
                    {NAV_LINKS.map((link) => (
                      <Link
                        key={link.label}
                        href={link.href}
                        aria-current={isActive(link.href) ? "page" : undefined}
                        onClick={closeMenu}
                        className={cn(
                          "rounded-btn border px-4 py-3 text-base font-medium text-white transition-colors",
                          isActive(link.href)
                            ? "border-line bg-bg"
                            : "border-transparent hover:bg-elevated",
                        )}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </nav>
                  <Button
                    variant="dark"
                    size="md"
                    href="/contact"
                    onClick={closeMenu}
                    className="mt-4 w-full"
                  >
                    Contact Us
                  </Button>
                </div>
              </details>
            </div>
          </div>
        </Container>
      </div>
    </header>
  );
}
