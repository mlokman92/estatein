"use client";

import { useRef } from "react";
import type { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Search, MapPin, Building2, Wallet, Box, Calendar } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { FilterDropdown } from "./FilterDropdown";
import type { DropdownOption } from "./FilterDropdown";
import type { PropertyFilters, PropertyFilterOptions } from "@/lib/queries";

const paragraph =
  "Welcome to Estatein, where your dream property awaits in every corner of our beautiful world. Explore our curated selection of properties, each offering a unique story and a chance to redefine your life. With categories to suit every dreamer, your journey";

// Price/size buckets map to the numeric `price` / `area` columns as "min-max"
// range strings (empty bound = open-ended). See getProperties() in queries.ts.
const priceRanges: DropdownOption[] = [
  { label: "Any Price", value: "" },
  { label: "Under $500K", value: "-500000" },
  { label: "$500K – $1M", value: "500000-1000000" },
  { label: "$1M – $2M", value: "1000000-2000000" },
  { label: "Over $2M", value: "2000000-" },
];

const sizeRanges: DropdownOption[] = [
  { label: "Any Size", value: "" },
  { label: "Under 1,000 sq ft", value: "-1000" },
  { label: "1,000 – 2,000 sq ft", value: "1000-2000" },
  { label: "2,000 – 4,000 sq ft", value: "2000-4000" },
  { label: "Over 4,000 sq ft", value: "4000-" },
];

export function PropertiesHero({
  filters,
  options,
}: {
  filters: PropertyFilters;
  options: PropertyFilterOptions;
}) {
  const router = useRouter();
  const searchRef = useRef<HTMLInputElement>(null);

  // Build the next URL from the committed filters plus a patch. The search box
  // is the source of truth for `q`, so dropdown changes preserve typed text.
  function navigate(
    patch: Partial<
      Record<"q" | "location" | "type" | "price" | "size", string>
    > = {},
  ) {
    const merged = {
      q: searchRef.current?.value.trim() ?? filters.query ?? "",
      location: filters.location ?? "",
      type: filters.type ?? "",
      price: filters.price ?? "",
      size: filters.size ?? "",
      ...patch,
    };
    const params = new URLSearchParams();
    (Object.keys(merged) as (keyof typeof merged)[]).forEach((key) => {
      if (merged[key]) params.set(key, merged[key]);
    });
    const qs = params.toString();
    router.push(qs ? `/properties?${qs}` : "/properties");
  }

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    navigate();
  }

  const locationOptions: DropdownOption[] = [
    { label: "Any Location", value: "" },
    ...options.locations.map((l) => ({ label: l, value: l })),
  ];
  const typeOptions: DropdownOption[] = [
    { label: "Any Type", value: "" },
    ...options.types.map((t) => ({ label: t, value: t })),
  ];

  return (
    <section className="relative border-b border-line">
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
          onSubmit={onSubmit}
          className="mt-10 flex flex-col gap-3 rounded-2xl border border-line bg-surface p-3 sm:flex-row sm:items-center 3xl:mt-12"
        >
          <input
            ref={searchRef}
            type="search"
            name="q"
            // `key` re-seeds the uncontrolled input when the URL's `q` changes
            // (e.g. browser back/forward or landing on a shared search link).
            key={filters.query ?? ""}
            defaultValue={filters.query ?? ""}
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
          <FilterDropdown
            icon={MapPin}
            label="Location"
            value={filters.location ?? ""}
            options={locationOptions}
            onSelect={(v) => navigate({ location: v })}
          />
          <FilterDropdown
            icon={Building2}
            label="Property Type"
            value={filters.type ?? ""}
            options={typeOptions}
            onSelect={(v) => navigate({ type: v })}
          />
          <FilterDropdown
            icon={Wallet}
            label="Pricing Range"
            value={filters.price ?? ""}
            options={priceRanges}
            onSelect={(v) => navigate({ price: v })}
          />
          <FilterDropdown
            icon={Box}
            label="Property Size"
            value={filters.size ?? ""}
            options={sizeRanges}
            onSelect={(v) => navigate({ size: v })}
          />
          {/* Build Year has no column in the DB, so it stays a static control. */}
          <button
            type="button"
            className="flex items-center gap-3 rounded-xl border border-line bg-surface px-4 py-3.5 text-left transition-colors hover:border-line-strong"
          >
            <Calendar className="size-5 shrink-0 text-white/80" aria-hidden="true" />
            <span className="h-5 w-px shrink-0 bg-line-strong" />
            <span className="flex-1 truncate text-base text-muted">
              Build Year
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
        </div>
      </Container>
    </section>
  );
}
