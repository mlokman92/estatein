import { Award, ShieldCheck, Sparkles, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SparkleCluster } from "@/components/ui/Sparkle";
import { cn } from "@/lib/cn";

type Value = {
  icon: LucideIcon;
  title: string;
  description: string;
  /** Per-quadrant divider borders for the 2×2 grid. */
  border: string;
};

const values: Value[] = [
  {
    icon: ShieldCheck,
    title: "Trust",
    description:
      "Trust is the cornerstone of every successful real estate transaction.",
    border: "border-b border-line sm:border-r",
  },
  {
    icon: Award,
    title: "Excellence",
    description:
      "We set the bar high for ourselves. From the properties we list to the services we provide.",
    border: "border-b border-line",
  },
  {
    icon: Users,
    title: "Client-Centric",
    description:
      "Your dreams and needs are at the center of our universe. We listen, understand.",
    border: "border-b border-line sm:border-b-0 sm:border-r",
  },
  {
    icon: Sparkles,
    title: "Our Commitment",
    description:
      "We are dedicated to providing you with the highest level of service, professionalism, and support.",
    border: "",
  },
];

export function OurValues() {
  return (
    <section className="border-t border-line py-16 lg:py-20 3xl:py-28">
      <Container>
        <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-16">
          {/* Left — heading block */}
          <div className="lg:w-[38%]">
            <SparkleCluster className="mb-4" />
            <h2 className="text-[32px] font-semibold leading-[1.2] tracking-tight sm:text-[40px] 3xl:text-5xl">
              Our Values
            </h2>
            <p className="mt-4 max-w-md text-base leading-relaxed text-muted sm:text-lg">
              Our story is one of continuous growth and evolution. We started as
              a small team with big dreams, determined to create a real estate
              platform that transcended the ordinary.
            </p>
          </div>

          {/* Right — 2×2 grid of values with divider lines */}
          <div className="grid grid-cols-1 overflow-hidden rounded-card border border-line bg-surface sm:grid-cols-2 lg:flex-1">
            {values.map(({ icon: Icon, title, description, border }) => (
              <div
                key={title}
                className={cn("flex flex-col gap-4 p-6 lg:p-8", border)}
              >
                <span className="grid size-12 place-items-center rounded-btn border border-line-strong bg-elevated">
                  <Icon className="size-6 text-purple" aria-hidden="true" />
                </span>
                <h3 className="text-xl font-semibold text-white 3xl:text-2xl">
                  {title}
                </h3>
                <p className="text-base leading-relaxed text-muted">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
