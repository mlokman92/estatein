import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { getSiteContent } from "@/lib/queries";
import type { HomeHero } from "@/lib/content";

export async function Hero() {
  const hero = await getSiteContent<HomeHero>("home.hero");
  if (!hero) return null;

  return (
    <section className="relative overflow-hidden border-b border-line">
      {/* Faint grid + purple glow behind the whole hero */}
      <div
        aria-hidden
        className="bg-grid pointer-events-none absolute inset-0 -z-10 opacity-60"
      />
      <div
        aria-hidden
        className="glow-purple pointer-events-none absolute right-0 top-0 -z-10 h-[600px] w-[600px]"
      />

      <Container className="py-14 lg:py-16 3xl:py-24">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-center lg:gap-12 3xl:gap-20">
          {/* LEFT column */}
          <div className="flex w-full flex-col gap-10 lg:w-[55%] lg:gap-10 3xl:gap-[60px]">
            <div className="flex flex-col gap-6">
              <h1 className="text-[40px] font-semibold leading-[1.15] text-white sm:text-[44px] lg:text-5xl 3xl:text-6xl">
                {hero.heading}
              </h1>
              <p className="max-w-xl text-base leading-[1.5] text-muted 3xl:text-lg">
                {hero.subheading}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-5">
              <Button variant="outline" href={hero.secondaryButtonHref ?? undefined}>
                {hero.secondaryButtonLabel}
              </Button>
              <Button variant="primary" href={hero.primaryButtonHref ?? "/properties"}>
                {hero.primaryButtonLabel}
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {hero.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl border border-line bg-surface px-4 py-4 sm:px-6"
                >
                  <p className="text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
                    {stat.value}
                  </p>
                  <p className="text-sm text-muted sm:text-base lg:text-lg">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT column */}
          <div className="relative w-full lg:w-[45%]">
            <div className="relative h-[420px] w-full overflow-hidden rounded-2xl lg:h-[560px]">
              <Image
                src={hero.heroImage}
                alt={hero.heroImageAlt}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
              />
            </div>

            {/* Rotating circular badge overlapping the top-left corner */}
            <div className="absolute -left-6 -top-6 size-[140px] rounded-full border border-line bg-bg p-2 lg:size-[168px]">
              <span className="animate-spin-slow absolute inset-0 block">
                <svg viewBox="0 0 100 100" className="size-full">
                  <defs>
                    <path
                      id="hero-badge-circle"
                      d="M 50,50 m -37,0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                      fill="none"
                    />
                  </defs>
                  <text className="fill-white text-[9px] font-semibold uppercase tracking-[0.18em]">
                    <textPath href="#hero-badge-circle" startOffset="0">
                      {hero.badgeText}
                    </textPath>
                  </text>
                </svg>
              </span>
              {/* Non-rotating center circle with arrow */}
              <div className="absolute left-1/2 top-1/2 flex size-[72px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-surface lg:size-[84px]">
                <ArrowUpRight className="size-8 text-white" strokeWidth={2} />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
