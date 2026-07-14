"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

// Guarantees every client-side route change starts at the very top of the
// page. Next's App Router resets scroll on navigation, but that reset can land
// slightly off; forcing scroll to (0, 0) on each pathname change makes "go to
// top" deterministic. Skips when a hash target is present so in-page anchors
// (if any are added later) still scroll to their element.
export function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.location.hash) return;
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
