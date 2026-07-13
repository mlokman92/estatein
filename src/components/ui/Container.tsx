import { cn } from "@/lib/cn";

/**
 * Page content wrapper. Mirrors the Figma layout where content is 1596px wide
 * inside a 1920px canvas (≈162px gutters). Caps at 1596px and centers, with
 * responsive padding on narrower viewports.
 */
export function Container({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-[1596px] px-5 sm:px-8 lg:px-12 xl:px-16",
        className,
      )}
    >
      {children}
    </div>
  );
}
