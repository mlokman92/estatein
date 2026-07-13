import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceCard, type Service } from "./ServiceCard";

export type ServiceCategoryProps = {
  heading: string;
  paragraph: string;
  cards: Service[];
  featured: { heading: string; paragraph: string; buttonLabel: string };
};

/**
 * A "service category" section: heading + paragraph, then a grid of service
 * cards with one wide featured CTA card occupying the last two columns.
 */
export function ServiceCategory({
  heading,
  paragraph,
  cards,
  featured,
}: ServiceCategoryProps) {
  return (
    <section className="border-t border-line py-16 lg:py-20 3xl:py-28">
      <Container>
        <SectionHeading title={heading} description={paragraph} />

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {cards.map((card) => (
            <ServiceCard key={card.title} {...card} />
          ))}

          {/* Wide featured CTA card — spans the remaining two columns */}
          <article className="relative overflow-hidden rounded-2xl border border-line bg-elevated p-6 md:col-span-2 lg:p-8">
            <div
              aria-hidden
              className="bg-grid pointer-events-none absolute inset-0 opacity-20"
            />
            <div className="relative flex flex-wrap items-start justify-between gap-4">
              <h3 className="max-w-md text-xl font-semibold text-white lg:text-2xl 3xl:text-[28px]">
                {featured.heading}
              </h3>
              <Button
                variant="dark"
                size="md"
                href="#"
                aria-label={`${featured.buttonLabel} about ${featured.heading}`}
                className="bg-bg"
              >
                {featured.buttonLabel}
              </Button>
            </div>
            <p className="relative mt-4 max-w-2xl text-base leading-relaxed text-muted">
              {featured.paragraph}
            </p>
          </article>
        </div>
      </Container>
    </section>
  );
}
