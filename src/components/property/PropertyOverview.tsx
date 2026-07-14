import { BedDouble, Bath, Maximize, Zap } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/cn";

export function PropertyOverview({
  description,
  bedrooms,
  bathrooms,
  area,
  areaUnit,
  features,
}: {
  description: string | null;
  bedrooms: number | null;
  bathrooms: number | null;
  area: number | null;
  areaUnit: string;
  features: string[];
}) {
  const stats: { icon: LucideIcon; label: string; value: string }[] = [];
  if (bedrooms != null)
    stats.push({
      icon: BedDouble,
      label: "Bedrooms",
      value: String(bedrooms).padStart(2, "0"),
    });
  if (bathrooms != null)
    stats.push({
      icon: Bath,
      label: "Bathrooms",
      value: String(bathrooms).padStart(2, "0"),
    });
  if (area != null)
    stats.push({
      icon: Maximize,
      label: "Area",
      value: `${area.toLocaleString()} ${areaUnit}`,
    });

  return (
    <section className="py-12 lg:py-16">
      <Container>
        <div className="grid items-start gap-6 lg:grid-cols-2">
          {/* Description + quick facts */}
          <div className="rounded-2xl border border-line bg-surface p-6 lg:p-8">
            <h2 className="text-2xl font-semibold text-white 3xl:text-[28px]">
              Description
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted">
              {description}
            </p>

            {stats.length > 0 && (
              <div className="mt-8 grid grid-cols-3 border-t border-line pt-6">
                {stats.map(({ icon: Icon, label, value }, i) => (
                  <div
                    key={label}
                    className={cn(i > 0 && "border-l border-line pl-4 sm:pl-6")}
                  >
                    <div className="flex items-center gap-2 text-muted">
                      <Icon className="size-5 shrink-0" aria-hidden="true" />
                      <span className="text-sm sm:text-base">{label}</span>
                    </div>
                    <p className="mt-2 text-lg font-semibold text-white sm:text-xl 3xl:text-2xl">
                      {value}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Key features and amenities */}
          {features.length > 0 && (
            <div className="rounded-2xl border border-line bg-surface p-6 lg:p-8">
              <h2 className="text-2xl font-semibold text-white 3xl:text-[28px]">
                Key Features and Amenities
              </h2>
              <ul className="mt-6 flex flex-col gap-4">
                {features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-3 rounded-xl border border-line bg-bg px-5 py-4"
                  >
                    <Zap
                      className="size-5 shrink-0 text-purple-light"
                      aria-hidden="true"
                    />
                    <span className="text-base text-muted">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
