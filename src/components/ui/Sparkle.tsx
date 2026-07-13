import { cn } from "@/lib/cn";

/** Single 4-point concave star used throughout the Estatein brand. */
export function Sparkle({
  className,
  size = 16,
  color = "currentColor",
}: {
  className?: string;
  size?: number;
  color?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 34 34"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M17 0c0 9.389-7.611 17-17 17 9.389 0 17 7.611 17 17 0-9.389 7.611-17 17-17-9.389 0-17-7.611-17-17Z"
        fill={color}
      />
    </svg>
  );
}

/**
 * Decorative sparkle cluster shown above/beside section headings
 * (matches the small "Abstract Design" element in the Figma file).
 */
export function SparkleCluster({ className }: { className?: string }) {
  return (
    <span className={cn("pointer-events-none inline-flex items-end gap-1", className)}>
      <Sparkle size={20} className="text-white/90" />
      <Sparkle size={11} className="text-white/40" />
      <Sparkle size={7} className="text-white/25" />
    </span>
  );
}
