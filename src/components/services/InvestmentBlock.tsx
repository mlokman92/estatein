import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { SparkleCluster } from "@/components/ui/Sparkle";
import { ServiceCard } from "./ServiceCard";
import { getInvestmentCards, getSiteContent } from "@/lib/queries";
import type { InvestmentBlockContent } from "@/lib/content";

export async function InvestmentBlock() {
  const [cards, content] = await Promise.all([
    getInvestmentCards(),
    getSiteContent<InvestmentBlockContent>("services.investment_block"),
  ]);

  const heading = content?.heading ?? "Smart Investments, Informed Decisions";
  const intro =
    content?.intro ??
    "Building a real estate portfolio requires a strategic approach. Estatein's Investment Advisory Service empowers you to make smart investments and informed decisions.";
  const ctaHeading = content?.ctaHeading ?? "Unlock Your Investment Potential";
  const ctaParagraph =
    content?.ctaParagraph ??
    "Explore our Property Management Service categories and let us handle the complexities while you enjoy the benefits of property ownership.";
  const ctaButtonLabel = content?.ctaButtonLabel ?? "Learn More";
  const ctaButtonHref = content?.ctaButtonHref ?? "#";

  return (
    <section className="border-t border-line py-16 lg:py-20 3xl:py-28">
      <Container>
        <div className="grid gap-8 lg:grid-cols-3 lg:gap-10">
          {/* Left — intro + highlighted CTA card */}
          <div className="lg:col-span-1">
            <SparkleCluster className="mb-4" />
            <h2 className="text-[32px] font-semibold leading-[1.2] tracking-tight sm:text-[40px] 3xl:text-5xl">
              {heading}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
              {intro}
            </p>

            <article className="relative mt-8 overflow-hidden rounded-2xl border border-line bg-elevated p-6 lg:p-7">
              <div
                aria-hidden
                className="bg-grid pointer-events-none absolute inset-0 opacity-20"
              />
              <div className="relative">
                <h3 className="text-xl font-semibold text-white lg:text-2xl">
                  {ctaHeading}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-muted">
                  {ctaParagraph}
                </p>
                <Button
                  variant="dark"
                  size="md"
                  href={ctaButtonHref}
                  aria-label="Learn more about unlocking your investment potential"
                  className="mt-6 w-full bg-bg"
                >
                  {ctaButtonLabel}
                </Button>
              </div>
            </article>
          </div>

          {/* Right — 2×2 grid of service cards */}
          <div className="grid gap-6 sm:grid-cols-2 lg:col-span-2">
            {cards.map((card) => (
              <ServiceCard
                key={card.id}
                icon={card.icon}
                title={card.title}
                description={card.description}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
