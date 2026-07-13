import Link from "next/link";
import { cn } from "@/lib/cn";

/** Estatein wordmark: purple sparkle mark + "Estatein" set in Urbanist. */
export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="Estatein home"
      className={cn("inline-flex items-center gap-2.5", className)}
    >
      <svg
        width="30"
        height="30"
        viewBox="0 0 48 48"
        fill="none"
        aria-hidden="true"
      >
        {/* Real Estatein mark from Figma (node 60:3101): four quarter-circle petals */}
        <path d="M24 48C10.7467 48 0 37.2533 0 24H24V48Z" fill="#703bf7" />
        <path d="M0 0C13.2533 0 24 10.7467 24 24H0V0Z" fill="#703bf7" />
        <path d="M24 48C37.2533 48 48 37.2533 48 24H24V48Z" fill="#703bf7" />
        <path d="M48 24C48 10.7467 37.2533 0 24 0V24H48Z" fill="#703bf7" />
      </svg>
      <span className="text-xl font-semibold tracking-tight text-white">
        Estatein
      </span>
    </Link>
  );
}
