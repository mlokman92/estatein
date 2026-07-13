import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";

/** Shared styling + helpers for the site's dark form controls. */

export const fieldLabelCls = "mb-2.5 block text-base font-medium text-white";

export const fieldInputCls =
  "w-full rounded-xl border border-line bg-bg px-4 py-3.5 text-base text-white placeholder-muted outline-none transition-colors focus:border-line-strong";

const selectCls =
  "flex w-full items-center justify-between gap-3 rounded-xl border border-line bg-bg px-4 py-3.5 text-left text-base text-muted transition-colors hover:border-line-strong";

/** Slugify a label into a valid, whitespace-free element id. */
export const slug = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

/**
 * Presentational select-styled control (the template forms aren't wired to a
 * backend). `label` becomes the accessible name so multiple selects stay
 * distinguishable. Pass `value` to render a pre-selected value (white) instead
 * of the muted placeholder.
 */
export function FakeSelect({
  label,
  placeholder,
  value,
}: {
  label: string;
  placeholder: string;
  value?: string;
}) {
  return (
    <button type="button" aria-label={label} className={selectCls}>
      <span className={cn("truncate", value && "text-white")}>
        {value ?? placeholder}
      </span>
      <ChevronDown className="size-5 shrink-0" aria-hidden="true" />
    </button>
  );
}
