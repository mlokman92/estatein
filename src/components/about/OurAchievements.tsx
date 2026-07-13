import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

type Achievement = { title: string; description: string };

const achievements: Achievement[] = [
  {
    title: "3+ Years of Excellence",
    description:
      "With over 3 years in the industry, we've amassed a wealth of knowledge and experience, becoming a go-to resource for all things real estate.",
  },
  {
    title: "Happy Clients",
    description:
      "Our greatest achievement is the satisfaction of our clients. Their success stories fuel our passion for what we do.",
  },
  {
    title: "Industry Recognition",
    description:
      "We've earned the respect of our peers and industry leaders, with accolades and awards that reflect our commitment to excellence.",
  },
];

export function OurAchievements() {
  return (
    <section className="border-t border-line py-16 lg:py-20 3xl:py-28">
      <Container>
        <SectionHeading
          title="Our Achievements"
          description="Our story is one of continuous growth and evolution. We started as a small team with big dreams, determined to create a real estate platform that transcended the ordinary."
        />

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {achievements.map(({ title, description }) => (
            <article
              key={title}
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
