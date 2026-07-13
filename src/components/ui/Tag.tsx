import { cn } from "@/lib/cn";

/** Small pill with an icon + label, e.g. property features (4-Bedroom, Villa). */
export function Tag({
  icon,
  children,
  className,
}: {
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-line bg-bg px-4 py-2 text-sm text-muted",
        className,
      )}
    >
      {icon && <span className="text-white/80">{icon}</span>}
      {children}
    </span>
  );
}
