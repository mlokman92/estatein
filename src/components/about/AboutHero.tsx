import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/cn";
import { getSiteContent } from "@/lib/queries";
import type { AboutHero as AboutHeroContent } from "@/lib/content";

const fallbackStats = [
  { value: "200+", label: "Happy Customers" },
  { value: "10k+", label: "Properties For Clients" },
  { value: "16+", label: "Years of Experience" },
];

const fallbackParagraph =
  "Our story is one of continuous growth and evolution. We started as a small team with big dreams, determined to create a real estate platform that transcended the ordinary. Over the years, we've expanded our reach, forged valuable partnerships, and gained the trust of countless clients.";

export async function AboutHero() {
  const content = await getSiteContent<AboutHeroContent>("about.hero");
  const heading = content?.heading ?? "Our Journey";
  const paragraph = content?.paragraph ?? fallbackParagraph;
  const image = content?.image ?? "/images/about-journey.png";
  const imageAlt =
    content?.imageAlt ??
    "A hand holding a scale model of a modern two-storey house";
  const stats = content?.stats ?? fallbackStats;

  return (
    <section className="relative overflow-hidden">
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
          <div className="flex w-full flex-col gap-10 lg:w-[55%] 3xl:gap-[60px]">
            <div className="flex flex-col gap-6">
              <h1 className="text-[40px] font-semibold leading-[1.15] text-white sm:text-[44px] lg:text-5xl 3xl:text-6xl">
                {heading}
              </h1>
              <p className="max-w-xl text-base leading-[1.6] text-muted 3xl:text-lg">
                {paragraph}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {stats.map((stat, i) => (
                <div
                  key={stat.label}
                  className={cn(
                    "rounded-xl border border-line bg-surface px-4 py-4 sm:px-6",
                    i === 2 && "col-span-2 sm:col-span-1",
                  )}
                >
                  <p className="text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-sm text-muted sm:text-base lg:text-lg">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT column — dark textured panel with the "hand holding a model
              house" cutout bleeding off the bottom-right edge. */}
          <div className="relative w-full lg:w-[45%]">
            <div className="relative h-[340px] w-full overflow-hidden rounded-2xl border border-line bg-[#0d0d0d] sm:h-[420px] lg:h-[500px] 3xl:h-[546px]">
              <div
                aria-hidden
                className="bg-grid pointer-events-none absolute inset-0 opacity-30"
              />
              <div
                aria-hidden
                className="glow-purple pointer-events-none absolute -right-10 top-0 h-full w-2/3 opacity-70"
              />
              {image && (
                <Image
                  src={image}
                  alt={imageAlt}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover object-bottom"
                />
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
