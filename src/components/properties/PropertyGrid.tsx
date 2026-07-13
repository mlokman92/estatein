import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SliderControls } from "@/components/ui/SliderControls";
import { Tag } from "@/components/ui/Tag";

type Property = {
  image: string;
  tagline: string;
  title: string;
  description: string;
  price: string;
};

const properties: Property[] = [
  {
    image: "/images/property-1.jpg",
    tagline: "Coastal Escapes - Where Waves Beckon",
    title: "Seaside Serenity Villa",
    description:
      "Wake up to the soothing melody of waves. This beachfront villa offers",
    price: "$1,250,000",
  },
  {
    image: "/images/property-2.jpg",
    tagline: "Urban Oasis - Life in the Heart of the City",
    title: "Metropolitan Haven",
    description:
      "Immerse yourself in the energy of the city. This modern apartment in the heart",
    price: "$650,000",
  },
  {
    image: "/images/property-3.jpg",
    tagline: "Countryside Charm - Escape to Nature's Embrace",
    title: "Rustic Retreat Cottage",
    description:
      "Find tranquility in the countryside. This charming cottage is nestled amidst rolling hills",
    price: "$350,000",
  },
];

export function PropertyGrid() {
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
              key={property.title}
              className="flex w-[90%] shrink-0 snap-start flex-col gap-5 rounded-2xl border border-line bg-surface p-5 sm:gap-6 sm:p-6 md:w-auto"
            >
              <div className="relative aspect-[432/318] w-full overflow-hidden rounded-xl">
                <Image
                  src={property.image}
                  alt={property.title}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>

              <div className="flex flex-col gap-4">
                <Tag className="self-start py-2.5 3xl:text-base">
                  {property.tagline}
                </Tag>

                <div>
                  <h3 className="text-xl font-semibold text-white sm:text-2xl">
                    {property.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted sm:text-base">
                    {property.description}...{" "}
                    <a href="#" className="text-white underline">
                      Read More
                    </a>
                  </p>
                </div>
              </div>

              <div className="mt-auto flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs text-muted sm:text-sm">Price</p>
                  <p className="text-xl font-bold text-white sm:text-2xl">
                    {property.price}
                  </p>
                </div>
                <Button
                  variant="primary"
                  size="md"
                  href="/property-details"
                  className="shrink-0 whitespace-nowrap px-4 py-3 text-sm sm:px-6 sm:py-4 sm:text-base"
                >
                  <span className="sm:hidden">View Details</span>
                  <span className="hidden sm:inline">View Property Details</span>
                </Button>
              </div>
            </article>
          ))}
        </div>

        <SliderControls current={1} total={10} className="mt-12" />
      </Container>
    </section>
  );
}
