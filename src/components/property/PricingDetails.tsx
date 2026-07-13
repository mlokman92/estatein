import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";

const paragraph =
  "At Estatein, transparency is key. We want you to have a clear understanding of all costs associated with your property investment. Below, we break down the pricing for Seaside Serenity Villa to help you make an informed decision.";

const note =
  "The figures provided above are estimates and may vary depending on the property, location, and individual circumstances.";

type Item = { label: string; value: string; note?: string };
type Category = { title: string; items: Item[] };

const categories: Category[] = [
  {
    title: "Additional Fees",
    items: [
      { label: "Property Transfer Tax", value: "$25,000", note: "Based on the sale price and local regulations" },
      { label: "Legal Fees", value: "$3,000", note: "Approximate cost for legal services, including title transfer" },
      { label: "Home Inspection", value: "$500", note: "Recommended for due diligence" },
      { label: "Property Insurance", value: "$1,200", note: "Annual cost for comprehensive property insurance" },
      { label: "Mortgage Fees", value: "Varies", note: "If applicable, consult with your lender for specific details" },
    ],
  },
  {
    title: "Monthly Costs",
    items: [
      { label: "Property Taxes", value: "$1,250", note: "Approximate monthly property tax based on the sale price and local rates" },
      { label: "Homeowners' Association Fee", value: "$300", note: "Monthly fee for common area maintenance and security" },
    ],
  },
  {
    title: "Total Initial Costs",
    items: [
      { label: "Listing Price", value: "$1,250,000" },
      { label: "Additional Fees", value: "$29,700", note: "Property transfer tax, legal fees, inspection, insurance" },
      { label: "Down Payment", value: "$250,000", note: "20%" },
      { label: "Mortgage Amount", value: "$1,000,000", note: "If applicable" },
    ],
  },
  {
    title: "Monthly Expenses",
    items: [
      { label: "Property Taxes", value: "$1,250" },
      { label: "Homeowners' Association Fee", value: "$300" },
      { label: "Mortgage Payment", value: "Varies based on terms and interest rate", note: "If applicable" },
      { label: "Property Insurance", value: "$100", note: "Approximate monthly cost" },
    ],
  },
];

function CategoryCard({ title, items }: Category) {
  return (
    <div className="rounded-2xl border border-line bg-surface p-6 lg:p-8">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line pb-6">
        <h3 className="text-xl font-semibold text-white lg:text-2xl">{title}</h3>
        <Button
          variant="dark"
          size="md"
          href="#"
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

export function PricingDetails() {
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
              $1,250,000
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
