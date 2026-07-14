import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getExperienceSteps, getSiteContent } from "@/lib/queries";
import type { AboutSectionHeadings } from "@/lib/content";

export async function NavigatingExperience() {
  const [steps, headings] = await Promise.all([
    getExperienceSteps(),
    getSiteContent<AboutSectionHeadings>("about.section_headings"),
  ]);

  if (steps.length === 0) return null;

  const heading = headings?.navigating;

  return (
    <section className="border-t border-line py-16 lg:py-20 3xl:py-28">
      <Container>
        <SectionHeading
          title={heading?.title ?? "Navigating the Estatein Experience"}
          description={
            heading?.description ??
            "At Estatein, we've designed a straightforward process to help you find and purchase your dream property with ease. Here's a step-by-step guide to how it all works."
          }
        />

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {steps.map((step, i) => (
            <article key={step.id} className="flex h-full flex-col">
              {/* Step label — purple left-accent, flush above the body */}
              <div className="border-l-2 border-purple px-5 py-4">
                <p className="text-lg font-medium text-white 3xl:text-xl">
                  Step {String(i + 1).padStart(2, "0")}
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
                  {step.title}
                </h3>
                <p className="text-base leading-relaxed text-muted lg:text-lg">
                  {step.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
