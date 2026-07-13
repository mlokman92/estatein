import { ArrowUpRight, Store, MonitorPlay, Building2, Sun } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Container } from "@/components/ui/Container";

type Feature = { label: string; icon: LucideIcon };

const features: Feature[] = [
  { label: "Find Your Dream Home", icon: Store },
  { label: "Unlock Property Value", icon: MonitorPlay },
  { label: "Effortless Property Management", icon: Building2 },
  { label: "Smart Investments, Informed Decisions", icon: Sun },
];

const paragraph =
  "Welcome to Estatein, where your real estate aspirations meet expert guidance. Explore our comprehensive range of services, each designed to cater to your unique needs and dreams.";

export function ServicesHero() {
  return (
    <section className="relative overflow-hidden border-b border-line">
      <div
        aria-hidden
        className="bg-grid pointer-events-none absolute inset-0 -z-10 opacity-50"
      />
      <div
        aria-hidden
        className="glow-purple pointer-events-none absolute right-0 top-0 -z-10 h-[500px] w-[500px]"
      />

      <Container className="py-14 lg:py-16 3xl:py-24">
        <div className="max-w-4xl">
          <h1 className="text-[40px] font-semibold leading-[1.15] text-white sm:text-[44px] lg:text-5xl 3xl:text-6xl">
            Elevate Your Real Estate Experience
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-[1.6] text-muted 3xl:text-lg">
            {paragraph}
          </p>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4 3xl:mt-12">
          {features.map(({ label, icon: Icon }) => (
            <div
              key={label}
              className="flex flex-col gap-6 rounded-2xl border border-line bg-surface p-5 sm:gap-8 sm:p-6"
            >
              <div className="flex items-start justify-between">
                <span className="grid size-12 place-items-center rounded-full border border-purple-light/40 sm:size-14">
                  <Icon className="size-5 text-purple sm:size-6" aria-hidden="true" />
                </span>
                <ArrowUpRight
                  className="size-5 text-muted-2 sm:size-6"
                  aria-hidden="true"
                />
              </div>
              <p className="text-sm font-semibold leading-snug text-white sm:text-base lg:text-xl">
                {label}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
