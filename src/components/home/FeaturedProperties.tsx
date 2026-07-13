import Image from "next/image";
import { BedDouble, Bath, Building2 } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SliderControls } from "@/components/ui/SliderControls";
import { Tag } from "@/components/ui/Tag";

const DESC =
  'Explore our handpicked selection of featured properties. Each listing offers a glimpse into exceptional homes and investments available through Estatein. Click "View Details" for more information.';

type Feature = { icon: React.ReactNode; label: string };

type Property = {
  image: string;
  title: string;
  description: string;
  features: Feature[];
  price: string;
};

const PROPERTIES: Property[] = [
  {
    image: "/images/property-1.jpg",
    title: "Seaside Serenity Villa",
    description:
      "A stunning 4-bedroom, 3-bathroom villa in a peaceful suburban neighborhood",
    features: [
      { icon: <BedDouble className="size-4" />, label: "4-Bedroom" },
      { icon: <Bath className="size-4" />, label: "3-Bathroom" },
      { icon: <Building2 className="size-4" />, label: "Villa" },
    ],
    price: "$550,000",
  },
  {
    image: "/images/property-2.jpg",
    title: "Metropolitan Haven",
    description:
      "A chic and fully-furnished 2-bedroom apartment with panoramic city views",
    features: [
      { icon: <BedDouble className="size-4" />, label: "2-Bedroom" },
      { icon: <Bath className="size-4" />, label: "2-Bathroom" },
      { icon: <Building2 className="size-4" />, label: "Villa" },
    ],
    price: "$550,000",
  },
  {
    image: "/images/property-3.jpg",
    title: "Rustic Retreat Cottage",
    description:
      "An elegant 3-bedroom, 2.5-bathroom townhouse in a gated community",
    features: [
      { icon: <BedDouble className="size-4" />, label: "3-Bedroom" },
      { icon: <Bath className="size-4" />, label: "3-Bathroom" },
      { icon: <Building2 className="size-4" />, label: "Villa" },
    ],
    price: "$550,000",
  },
];

export function FeaturedProperties() {
  return (
    <section className="border-t border-line py-16 lg:py-20 3xl:py-28">
      <Container>
        <SectionHeading
          title="Featured Properties"
          description={DESC}
          action={
            <Button variant="dark" href="/properties">
              View All Properties
            </Button>
          }
        />

        <div className="mt-12 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 md:grid md:grid-cols-2 md:overflow-visible md:pb-0 lg:grid-cols-3">
          {PROPERTIES.map((property) => (
            <article
              key={property.title}
              className="flex w-[90%] shrink-0 snap-start flex-col gap-5 rounded-2xl border border-line bg-surface p-5 md:w-auto"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl">
                <Image
                  src={property.image}
                  alt={property.title}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>

              <h3 className="text-2xl font-semibold text-white">
                {property.title}
              </h3>

              <p className="text-sm leading-relaxed text-muted">
                {property.description}...{" "}
                <span className="text-white underline">Read More</span>
              </p>

              <div className="flex flex-wrap gap-2.5">
                {property.features.map((feature) => (
                  <Tag key={feature.label} icon={feature.icon}>
                    {feature.label}
                  </Tag>
                ))}
              </div>

              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs text-muted sm:text-sm">Price</p>
                  <p className="text-lg font-semibold text-white sm:text-xl">
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

        <SliderControls current={1} total={60} className="mt-12" />
      </Container>
    </section>
  );
}
