import Image from "next/image";
import type { ReactNode } from "react";
import { BedDouble, Bath, Building2 } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SliderControls } from "@/components/ui/SliderControls";
import { Tag } from "@/components/ui/Tag";
import { getProperties, getSiteContent } from "@/lib/queries";
import type { HomeSectionHeadings } from "@/lib/content";
import { formatPrice } from "@/lib/format";

export async function FeaturedProperties() {
  const [all, headings] = await Promise.all([
    getProperties(),
    getSiteContent<HomeSectionHeadings>("home.section_headings"),
  ]);
  const properties = all.slice(0, 6);
  if (properties.length === 0) return null;
  const h = headings?.featuredProperties;

  return (
    <section className="border-t border-line py-16 lg:py-20 3xl:py-28">
      <Container>
        <SectionHeading
          title={h?.title ?? "Featured Properties"}
          description={h?.description ?? ""}
          action={
            <Button variant="dark" href="/properties">
              {h?.actionLabel ?? "View All Properties"}
            </Button>
          }
        />

        <div className="mt-12 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 md:grid md:grid-cols-2 md:overflow-visible md:pb-0 lg:grid-cols-3">
          {properties.map((property) => {
            const features = [
              property.bedrooms != null && {
                icon: <BedDouble className="size-4" />,
                label: `${property.bedrooms}-Bedroom`,
              },
              property.bathrooms != null && {
                icon: <Bath className="size-4" />,
                label: `${property.bathrooms}-Bathroom`,
              },
              property.property_type && {
                icon: <Building2 className="size-4" />,
                label: property.property_type,
              },
            ].filter(Boolean) as { icon: ReactNode; label: string }[];

            return (
              <article
                key={property.id}
                className="flex w-[90%] shrink-0 snap-start flex-col gap-5 rounded-2xl border border-line bg-surface p-5 md:w-auto"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl">
                  {property.card_image && (
                    <Image
                      src={property.card_image}
                      alt={property.title}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                      className="object-cover"
                    />
                  )}
                </div>

                <h3 className="text-2xl font-semibold text-white">
                  {property.title}
                </h3>

                <p className="text-sm leading-relaxed text-muted">
                  {property.card_description}...{" "}
                  <span className="text-white underline">Read More</span>
                </p>

                <div className="flex flex-wrap gap-2.5">
                  {features.map((feature) => (
                    <Tag key={feature.label} icon={feature.icon}>
                      {feature.label}
                    </Tag>
                  ))}
                </div>

                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs text-muted sm:text-sm">Price</p>
                    <p className="text-lg font-semibold text-white sm:text-xl">
                      {formatPrice(property.price, property.currency)}
                    </p>
                  </div>
                  <Button
                    variant="primary"
                    size="md"
                    href={`/properties/${property.slug}`}
                    className="shrink-0 whitespace-nowrap px-4 py-3 text-sm sm:px-6 sm:py-4 sm:text-base"
                  >
                    <span className="sm:hidden">View Details</span>
                    <span className="hidden sm:inline">View Property Details</span>
                  </Button>
                </div>
              </article>
            );
          })}
        </div>

        <SliderControls current={1} total={all.length} className="mt-12" />
      </Container>
    </section>
  );
}
