"use client";

import { useEffect, useRef, useState } from "react";
import { Check } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";

export type DropdownOption = { label: string; value: string };

/**
 * A filter control styled to match the static filter buttons in the properties
 * hero (icon | divider | label | chevron), with a working popover menu. The
 * first option is expected to be the "Any …" reset (empty value).
 */
export function FilterDropdown({
  icon: Icon,
  label,
  value,
  options,
  onSelect,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  options: DropdownOption[];
  onSelect: (value: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click or Escape while the menu is open.
  useEffect(() => {
    if (!open) return;
    function onPointerDown(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const selected = options.find((o) => o.value === value && o.value !== "");

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex w-full items-center gap-3 rounded-xl border border-line bg-surface px-4 py-3.5 text-left transition-colors hover:border-line-strong"
      >
        <Icon className="size-5 shrink-0 text-white/80" aria-hidden="true" />
        <span className="h-5 w-px shrink-0 bg-line-strong" />
        <span
          className={cn(
            "flex-1 truncate text-base",
            selected ? "text-white" : "text-muted",
          )}
        >
          {selected ? selected.label : label}
        </span>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
          className={cn(
            "size-5 shrink-0 text-muted transition-transform",
            open && "rotate-180",
          )}
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

      {open && (
        <ul
          role="listbox"
          aria-label={label}
          className="absolute left-0 top-[calc(100%+0.5rem)] z-30 max-h-64 w-full overflow-auto rounded-xl border border-line bg-elevated p-1.5 shadow-2xl"
        >
          {options.map((opt) => {
            const isSelected = opt.value === value;
            return (
              <li key={opt.value || "any"}>
                <button
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => {
                    onSelect(opt.value);
                    setOpen(false);
                  }}
                  className={cn(
                    "flex w-full items-center justify-between gap-2 rounded-lg px-3 py-2.5 text-left text-base transition-colors hover:bg-surface",
                    isSelected ? "text-white" : "text-muted",
                  )}
                >
                  <span className="truncate">{opt.label}</span>
                  {isSelected && (
                    <Check
                      className="size-4 shrink-0 text-purple"
                      aria-hidden="true"
                    />
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
