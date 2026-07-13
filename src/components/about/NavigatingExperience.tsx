import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

type Step = { step: string; title: string; description: string };

const steps: Step[] = [
  {
    step: "Step 01",
    title: "Discover a World of Possibilities",
    description:
      "Your journey begins with exploring our carefully curated property listings. Use our intuitive search tools to filter properties based on your preferences, including location, type, size, and budget.",
  },
  {
    step: "Step 02",
    title: "Narrowing Down Your Choices",
    description:
      "Once you've found properties that catch your eye, save them to your account or make a shortlist. This allows you to compare and revisit your favorites as you make your decision.",
  },
  {
    step: "Step 03",
    title: "Personalized Guidance",
    description:
      "Have questions about a property or need more information? Our dedicated team of real estate experts is just a call or message away.",
  },
  {
    step: "Step 04",
    title: "See It for Yourself",
    description:
      "Arrange viewings of the properties you're interested in. We'll coordinate with the property owners and accompany you to ensure you get a firsthand look at your potential new home.",
  },
  {
    step: "Step 05",
    title: "Making Informed Decisions",
    description:
      "Before making an offer, our team will assist you with due diligence, including property inspections, legal checks, and market analysis. We want you to be fully informed and confident in your choice.",
  },
  {
    step: "Step 06",
    title: "Getting the Best Deal",
    description:
      "We'll help you negotiate the best terms and prepare your offer. Our goal is to secure the property at the right price and on favorable terms.",
  },
];

export function NavigatingExperience() {
  return (
    <section className="border-t border-line py-16 lg:py-20 3xl:py-28">
      <Container>
        <SectionHeading
          title="Navigating the Estatein Experience"
          description="At Estatein, we've designed a straightforward process to help you find and purchase your dream property with ease. Here's a step-by-step guide to how it all works."
        />

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {steps.map(({ step, title, description }) => (
            <article key={step} className="flex h-full flex-col">
              {/* Step label — purple left-accent, flush above the body */}
              <div className="border-l-2 border-purple px-5 py-4">
                <p className="text-lg font-medium text-white 3xl:text-xl">
                  {step}
                </p>
              </div>
              {/* Body — purple corner glow, rounded on every corner but top-left */}
              <div
                className="relative flex flex-1 flex-col gap-5 overflow-hidden rounded-b-[12px] rounded-tr-[12px] border border-purple/25 p-6 lg:p-8 3xl:p-[50px]"
                style={{
                  backgroundImage:
                    "radial-gradient(100% 100% at 0% 0%, rgba(112, 59, 247, 0.4) 0%, rgba(112, 59, 247, 0) 35%)",
                }}
              >
                <h3 className="text-xl font-semibold text-white lg:text-2xl 3xl:text-[26px]">
                  {title}
                </h3>
                <p className="text-base leading-relaxed text-muted lg:text-lg">
                  {description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
