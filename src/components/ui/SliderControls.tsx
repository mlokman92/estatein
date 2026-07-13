import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/cn";

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * "01 of 60" counter + prev/next arrows, sitting above a top divider line.
 * Presentational by default; pass onPrev/onNext to wire up a carousel.
 */
export function SliderControls({
  current = 1,
  total,
  onPrev,
  onNext,
  className,
}: {
  current?: number;
  total: number;
  onPrev?: () => void;
  onNext?: () => void;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-center justify-between border-t border-line pt-6",
        className,
      )}
    >
      <p className="text-lg text-muted sm:text-xl">
        <span className="text-white">{pad(current)}</span> of {pad(total)}
      </p>
      <div className="flex items-center gap-2.5">
        <button
          type="button"
          onClick={onPrev}
          aria-label="Previous"
          className="grid size-12 place-items-center rounded-full border border-line bg-transparent text-white transition-colors hover:bg-elevated hover:border-line-strong"
        >
          <ArrowLeft className="size-6" />
        </button>
        <button
          type="button"
          onClick={onNext}
          aria-label="Next"
          className="grid size-12 place-items-center rounded-full border border-line bg-surface text-white transition-colors hover:bg-elevated hover:border-line-strong"
        >
          <ArrowRight className="size-6" />
        </button>
      </div>
    </div>
  );
}
