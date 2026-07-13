import { BedDouble, Bath, Maximize, Zap } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/cn";

const description =
  "Discover your own piece of paradise with the Seaside Serenity Villa. With an open floor plan, breathtaking ocean views from every room, and direct access to a pristine sandy beach, this property is the epitome of coastal living.";

const stats: { icon: LucideIcon; label: string; value: string }[] = [
  { icon: BedDouble, label: "Bedrooms", value: "04" },
  { icon: Bath, label: "Bathrooms", value: "03" },
  { icon: Maximize, label: "Area", value: "2,500 Square Feet" },
];

const features = [
  "Expansive oceanfront terrace for outdoor entertaining",
  "Gourmet kitchen with top-of-the-line appliances",
  "Private beach access for morning strolls and sunset views",
  "Master suite with a spa-inspired bathroom and ocean-facing balcony",
  "Private garage and ample storage space",
];

export function PropertyOverview() {
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
          </div>

          {/* Key features and amenities */}
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
        </div>
      </Container>
    </section>
  );
}
