import { ArrowUpRight, Building2, MonitorPlay, Store, Sun } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Container } from "@/components/ui/Container";

type Feature = {
  title: string;
  icon: LucideIcon;
};

const FEATURES: Feature[] = [
  { title: "Find Your Dream Home", icon: Store },
  { title: "Unlock Property Value", icon: MonitorPlay },
  { title: "Effortless Property Management", icon: Building2 },
  { title: "Smart Investments, Informed Decisions", icon: Sun },
];

export function FeatureBar() {
  return (
    <section className="py-6 lg:py-8">
      <Container>
        <div className="rounded-2xl border border-line bg-bg p-4 sm:p-5">
          <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
            {FEATURES.map(({ title, icon: Icon }) => (
              <div
                key={title}
                className="relative flex flex-col items-center gap-4 rounded-xl border border-line bg-surface px-4 py-6 text-center sm:gap-5 sm:px-5 sm:py-8 lg:py-10"
              >
                <ArrowUpRight
                  className="absolute right-5 top-5 size-5 text-muted-2"
                  aria-hidden="true"
                />
                <span className="grid place-items-center rounded-full border border-purple-light p-2.5">
                  <span className="grid place-items-center rounded-full border border-purple-light p-3.5">
                    <Icon className="size-6 text-purple" aria-hidden="true" />
                  </span>
                </span>
                <h3 className="text-sm font-semibold leading-snug text-white sm:text-base lg:text-xl">
                  {title}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
