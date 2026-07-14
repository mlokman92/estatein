import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SliderControls } from "@/components/ui/SliderControls";
import { Tag } from "@/components/ui/Tag";
import { getProperties } from "@/lib/queries";
import { formatPrice } from "@/lib/format";

export async function PropertyGrid() {
  const properties = await getProperties();

  return (
    <section className="border-t border-line py-16 lg:py-20 3xl:py-28">
      <Container>
        <SectionHeading
          title="Discover a World of Possibilities"
          description="Our portfolio of properties is as diverse as your dreams. Explore the following categories to find the perfect property that resonates with your vision of home"
        />

        <div className="mt-12 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 md:grid md:grid-cols-2 md:overflow-visible md:pb-0 lg:grid-cols-3">
          {properties.map((property) => (
            <article
              key={property.id}
              className="flex w-[90%] shrink-0 snap-start flex-col gap-5 rounded-2xl border border-line bg-surface p-5 sm:gap-6 sm:p-6 md:w-auto"
            >
              <div className="relative aspect-[432/318] w-full overflow-hidden rounded-xl">
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

              <div className="flex flex-col gap-4">
                {property.tagline && (
                  <Tag className="self-start py-2.5 3xl:text-base">
                    {property.tagline}
                  </Tag>
                )}

                <div>
                  <h3 className="text-xl font-semibold text-white sm:text-2xl">
                    {property.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted sm:text-base">
                    {property.card_description}...{" "}
                    <a
                      href={`/properties/${property.slug}`}
                      className="text-white underline"
                    >
                      Read More
                    </a>
                  </p>
                </div>
              </div>

              <div className="mt-auto flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs text-muted sm:text-sm">Price</p>
                  <p className="text-xl font-bold text-white sm:text-2xl">
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
          ))}
        </div>

        <SliderControls current={1} total={properties.length} className="mt-12" />
      </Container>
    </section>
  );
}
