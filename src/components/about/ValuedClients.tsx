import { LayoutGrid, Zap } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SliderControls } from "@/components/ui/SliderControls";

type Client = {
  since: string;
  company: string;
  domain: string;
  category: string;
  quote: string;
};

const clients: Client[] = [
  {
    since: "2019",
    company: "ABC Corporation",
    domain: "Commercial Real Estate",
    category: "Luxury Home Development",
    quote:
      "Estatein's expertise in finding the perfect office space for our expanding operations was invaluable. They truly understand our business needs.",
  },
  {
    since: "2018",
    company: "GreenTech Enterprises",
    domain: "Commercial Real Estate",
    category: "Retail Space",
    quote:
      "Estatein's ability to identify prime retail locations helped us expand our brand presence. They are a trusted partner in our growth.",
  },
];

export function ValuedClients() {
  return (
    <section className="border-t border-line py-16 lg:py-20 3xl:py-28">
      <Container>
        <SectionHeading
          title="Our Valued Clients"
          description="At Estatein, we have had the privilege of working with a diverse range of clients across various industries. Here are some of the clients we've had the pleasure of serving"
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {clients.map((client) => (
            <article
              key={client.company}
              className="flex flex-col rounded-2xl border border-line bg-surface p-6 lg:p-8"
            >
              {/* Header: since + company, with a Visit Website action */}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-base text-muted">Since {client.since}</p>
                  <h3 className="mt-2 text-2xl font-semibold text-white 3xl:text-[28px]">
                    {client.company}
                  </h3>
                </div>
                <Button
                  variant="dark"
                  size="md"
                  href="#"
                  aria-label={`Visit ${client.company} website`}
                  className="shrink-0 bg-bg"
                >
                  Visit Website
                </Button>
              </div>

              {/* Domain + Category */}
              <div className="mt-8 grid grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center gap-2 text-muted">
                    <LayoutGrid className="size-5" aria-hidden="true" />
                    <span className="text-base">Domain</span>
                  </div>
                  <p className="mt-2 text-base font-medium text-white sm:text-lg">
                    {client.domain}
                  </p>
                </div>
                <div className="border-l border-line pl-4 sm:pl-6">
                  <div className="flex items-center gap-2 text-muted">
                    <Zap className="size-5" aria-hidden="true" />
                    <span className="text-base">Category</span>
                  </div>
                  <p className="mt-2 text-base font-medium text-white sm:text-lg">
                    {client.category}
                  </p>
                </div>
              </div>

              {/* Testimonial */}
              <div className="mt-8 rounded-xl border border-line bg-bg p-5 lg:p-6">
                <p className="text-base text-muted">What They Said 🤗</p>
                <p className="mt-3 text-base leading-relaxed text-white">
                  {client.quote}
                </p>
              </div>
            </article>
          ))}
        </div>

        <SliderControls current={1} total={10} className="mt-12" />
      </Container>
    </section>
  );
}
