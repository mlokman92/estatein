"use client";

import { Search, MapPin, Building2, Wallet, Box, Calendar } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

type Filter = { label: string; icon: LucideIcon };

const filters: Filter[] = [
  { label: "Location", icon: MapPin },
  { label: "Property Type", icon: Building2 },
  { label: "Pricing Range", icon: Wallet },
  { label: "Property Size", icon: Box },
  { label: "Build Year", icon: Calendar },
];

const paragraph =
  "Welcome to Estatein, where your dream property awaits in every corner of our beautiful world. Explore our curated selection of properties, each offering a unique story and a chance to redefine your life. With categories to suit every dreamer, your journey";

export function PropertiesHero() {
  return (
    <section className="relative overflow-hidden border-b border-line">
      <div
        aria-hidden
        className="bg-grid pointer-events-none absolute inset-0 -z-10 opacity-50"
      />
      <div
        aria-hidden
        className="glow-purple pointer-events-none absolute right-0 top-0 -z-10 h-[500px] w-[500px]"
      />

      <Container className="py-14 lg:py-16 3xl:py-24">
        <div className="max-w-4xl">
          <h1 className="text-[40px] font-semibold leading-[1.15] text-white sm:text-[44px] lg:text-5xl 3xl:text-6xl">
            Find Your Dream Property
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-[1.6] text-muted 3xl:text-lg">
            {paragraph}
          </p>
        </div>

        {/* Search bar */}
        <form
          onSubmit={(e) => e.preventDefault()}
          className="mt-10 flex flex-col gap-3 rounded-2xl border border-line bg-surface p-3 sm:flex-row sm:items-center 3xl:mt-12"
        >
          <input
            type="search"
            aria-label="Search for a property"
            placeholder="Search For A Property"
            className="min-w-0 flex-1 bg-transparent px-3 py-2.5 text-base text-white placeholder-muted outline-none sm:py-3"
          />
          <Button
            variant="primary"
            size="md"
            type="submit"
            className="shrink-0 gap-2"
          >
            <Search className="size-5" aria-hidden="true" />
            Find Property
          </Button>
        </form>

        {/* Filter dropdowns */}
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5">
          {filters.map(({ label, icon: Icon }) => (
            <button
              key={label}
              type="button"
              className="flex items-center gap-3 rounded-xl border border-line bg-surface px-4 py-3.5 text-left transition-colors hover:border-line-strong"
            >
              <Icon className="size-5 shrink-0 text-white/80" aria-hidden="true" />
              <span className="h-5 w-px shrink-0 bg-line-strong" />
              <span className="flex-1 truncate text-base text-muted">
                {label}
              </span>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
                className="size-5 shrink-0 text-muted"
              >
                <path
                  d="m6 9 6 6 6-6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          ))}
        </div>
      </Container>
    </section>
  );
}
