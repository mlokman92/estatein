import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getAchievements, getSiteContent } from "@/lib/queries";
import type { AboutSectionHeadings } from "@/lib/content";

export async function OurAchievements() {
  const [achievements, headings] = await Promise.all([
    getAchievements(),
    getSiteContent<AboutSectionHeadings>("about.section_headings"),
  ]);

  if (achievements.length === 0) return null;

  const heading = headings?.achievements;

  return (
    <section className="border-t border-line py-16 lg:py-20 3xl:py-28">
      <Container>
        <SectionHeading
          title={heading?.title ?? "Our Achievements"}
          description={
            heading?.description ??
            "Our story is one of continuous growth and evolution. We started as a small team with big dreams, determined to create a real estate platform that transcended the ordinary."
          }
        />

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {achievements.map(({ id, title, description }) => (
            <article
              key={id}
              className="relative overflow-hidden rounded-2xl border border-line bg-surface p-6 lg:p-8"
            >
              <div
                aria-hidden
                className="bg-grid pointer-events-none absolute inset-0 opacity-30"
              />
              <div className="relative">
                <h3 className="text-2xl font-semibold text-white 3xl:text-[28px]">
                  {title}
                </h3>
                <p className="mt-4 text-base leading-relaxed text-muted">
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
