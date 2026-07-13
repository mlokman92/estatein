import { SparkleCluster } from "./Sparkle";
import { cn } from "@/lib/cn";

/**
 * Standard section header: sparkle + title + description on the left, with an
 * optional action (e.g. a "View All" button) bottom-aligned on the right.
 */
export function SectionHeading({
  title,
  description,
  action,
  className,
  descriptionClassName,
}: {
  title: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
  descriptionClassName?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-6 md:flex-row md:items-end md:justify-between",
        className,
      )}
    >
      <div className="relative max-w-3xl">
        <SparkleCluster className="mb-4" />
        <h2 className="text-[32px] font-semibold leading-[1.2] tracking-tight sm:text-[40px] 3xl:text-5xl">
          {title}
        </h2>
        {description && (
          <p
            className={cn(
              "mt-4 text-base leading-relaxed text-muted sm:text-lg",
              descriptionClassName,
            )}
          >
            {description}
          </p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
