import { BarChart3, Flame, Lightbulb, Sun } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { SparkleCluster } from "@/components/ui/Sparkle";
import { ServiceCard, type Service } from "./ServiceCard";

const intro =
  "Building a real estate portfolio requires a strategic approach. Estatein's Investment Advisory Service empowers you to make smart investments and informed decisions.";

const cards: Service[] = [
  {
    icon: BarChart3,
    title: "Market Insight",
    description:
      "Stay ahead of market trends with our expert Market Analysis. We provide in-depth insights into real estate market conditions",
  },
  {
    icon: Flame,
    title: "ROI Assessment",
    description:
      "Make investment decisions with confidence. Our ROI Assessment services evaluate the potential returns on your investments",
  },
  {
    icon: Lightbulb,
    title: "Customized Strategies",
    description:
      "Every investor is unique, and so are their goals. We develop Customized Investment Strategies tailored to your specific needs",
  },
  {
    icon: Sun,
    title: "Diversification Mastery",
    description:
      "Diversify your real estate portfolio effectively. Our experts guide you in spreading your investments across various property types and locations",
  },
];

export function InvestmentBlock() {
  return (
    <section className="border-t border-line py-16 lg:py-20 3xl:py-28">
      <Container>
        <div className="grid gap-8 lg:grid-cols-3 lg:gap-10">
          {/* Left — intro + highlighted CTA card */}
          <div className="lg:col-span-1">
            <SparkleCluster className="mb-4" />
            <h2 className="text-[32px] font-semibold leading-[1.2] tracking-tight sm:text-[40px] 3xl:text-5xl">
              Smart Investments, Informed Decisions
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
                  Unlock Your Investment Potential
                </h3>
                <p className="mt-3 text-base leading-relaxed text-muted">
                  Explore our Property Management Service categories and let us
                  handle the complexities while you enjoy the benefits of
                  property ownership.
                </p>
                <Button
                  variant="dark"
                  size="md"
                  href="#"
                  aria-label="Learn more about unlocking your investment potential"
                  className="mt-6 w-full bg-bg"
                >
                  Learn More
                </Button>
              </div>
            </article>
          </div>

          {/* Right — 2×2 grid of service cards */}
          <div className="grid gap-6 sm:grid-cols-2 lg:col-span-2">
            {cards.map((card) => (
              <ServiceCard key={card.title} {...card} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
