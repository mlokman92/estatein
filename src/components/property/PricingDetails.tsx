import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { PricingItem } from "@/lib/queries";

const paragraph =
  "At Estatein, transparency is key. We want you to have a clear understanding of all costs associated with your property investment. Below, we break down the pricing to help you make an informed decision.";

const note =
  "The figures provided above are estimates and may vary depending on the property, location, and individual circumstances.";

type Category = {
  title: string;
  learnMoreUrl: string | null;
  items: PricingItem[];
};

function CategoryCard({ title, learnMoreUrl, items }: Category) {
  return (
    <div className="rounded-2xl border border-line bg-surface p-6 lg:p-8">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line pb-6">
        <h3 className="text-xl font-semibold text-white lg:text-2xl">{title}</h3>
        <Button
          variant="dark"
          size="md"
          href={learnMoreUrl ?? "#"}
          aria-label={`Learn more about ${title}`}
          className="bg-bg"
        >
          Learn More
        </Button>
      </div>
      <dl className="mt-6 grid gap-x-8 gap-y-6 sm:grid-cols-2">
        {items.map((item, i) => (
          <div key={i}>
            <dt className="text-sm text-muted">{item.label}</dt>
            <dd className="mt-2 flex flex-wrap items-center gap-2.5">
              <span className="text-lg font-semibold text-white">
                {item.value}
              </span>
              {item.note && (
                <span className="rounded-full border border-line bg-bg px-3 py-1 text-sm text-muted">
                  {item.note}
                </span>
              )}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export function PricingDetails({
  listingPrice,
  categories,
}: {
  listingPrice: string;
  categories: Category[];
}) {
  if (categories.length === 0) return null;

  return (
    <section className="border-t border-line py-16 lg:py-20 3xl:py-28">
      <Container>
        <SectionHeading
          title="Comprehensive Pricing Details"
          description={paragraph}
        />

        {/* Note callout */}
        <div className="mt-8 flex flex-col gap-2 rounded-xl border border-line bg-surface p-5 sm:flex-row sm:items-center sm:gap-4">
          <span className="shrink-0 font-semibold text-white">Note</span>
          <span className="text-base text-muted">{note}</span>
        </div>

        {/* Listing price + category cards */}
        <div className="mt-8 grid gap-8 lg:grid-cols-[220px_1fr] lg:gap-10">
          <div>
            <p className="text-base text-muted">Listing Price</p>
            <p className="mt-1 text-3xl font-bold text-white 3xl:text-4xl">
              {listingPrice}
            </p>
          </div>
          <div className="flex flex-col gap-6">
            {categories.map((category) => (
              <CategoryCard key={category.title} {...category} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
