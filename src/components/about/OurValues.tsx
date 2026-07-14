import { Container } from "@/components/ui/Container";
import { SparkleCluster } from "@/components/ui/Sparkle";
import { cn } from "@/lib/cn";
import { getCompanyValues, getSiteContent } from "@/lib/queries";
import { iconByName } from "@/lib/icons";
import type { AboutSectionHeadings } from "@/lib/content";

/** Per-quadrant divider borders for the 2×2 grid, derived from position. */
const borders = [
  "border-b border-line sm:border-r",
  "border-b border-line",
  "border-b border-line sm:border-b-0 sm:border-r",
  "",
];

export async function OurValues() {
  const [values, headings] = await Promise.all([
    getCompanyValues(),
    getSiteContent<AboutSectionHeadings>("about.section_headings"),
  ]);

  if (values.length === 0) return null;

  const heading = headings?.values;

  return (
    <section className="border-t border-line py-16 lg:py-20 3xl:py-28">
      <Container>
        <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-16">
          {/* Left — heading block */}
          <div className="lg:w-[38%]">
            <SparkleCluster className="mb-4" />
            <h2 className="text-[32px] font-semibold leading-[1.2] tracking-tight sm:text-[40px] 3xl:text-5xl">
              {heading?.title ?? "Our Values"}
            </h2>
            <p className="mt-4 max-w-md text-base leading-relaxed text-muted sm:text-lg">
              {heading?.description ??
                "Our story is one of continuous growth and evolution. We started as a small team with big dreams, determined to create a real estate platform that transcended the ordinary."}
            </p>
          </div>

          {/* Right — 2×2 grid of values with divider lines */}
          <div className="grid grid-cols-1 overflow-hidden rounded-card border border-line bg-surface sm:grid-cols-2 lg:flex-1">
            {values.map((value, i) => {
              const Icon = iconByName(value.icon);
              return (
                <div
                  key={value.id}
                  className={cn(
                    "flex flex-col gap-4 p-6 lg:p-8",
                    borders[i] ?? "",
                  )}
                >
                  <span className="grid size-12 place-items-center rounded-btn border border-line-strong bg-elevated">
                    <Icon className="size-6 text-purple" aria-hidden="true" />
                  </span>
                  <h3 className="text-xl font-semibold text-white 3xl:text-2xl">
                    {value.title}
                  </h3>
                  <p className="text-base leading-relaxed text-muted">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
