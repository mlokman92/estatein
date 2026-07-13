import { Mail, Phone, MapPin } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Tag } from "@/components/ui/Tag";
import { cn } from "@/lib/cn";

const tabs = ["All", "Regional", "International"];

const contactIcons: LucideIcon[] = [Mail, Phone, MapPin];

type Office = {
  label: string;
  title: string;
  description: string;
  contacts: string[];
  buttonLabel: string;
};

const offices: Office[] = [
  {
    label: "Main Headquarters",
    title: "123 Estatein Plaza, City Center, Metropolis",
    description:
      "Our main headquarters serve as the heart of Estatein. Located in the bustling city center, this is where our core team of experts operates, driving the excellence and innovation that define us.",
    contacts: ["info@estatein.com", "+1 (123) 456-7890", "Metropolis"],
    buttonLabel: "Get Direction",
  },
  {
    label: "Regional Offices",
    title: "456 Urban Avenue, Downtown District, Metropolis",
    description:
      "Estatein's presence extends to multiple regions, each with its own dynamic real estate landscape. Discover our regional offices, staffed by local experts who understand the nuances of their respective markets.",
    contacts: ["info@restatein.com", "+1 (123) 628-7890", "Metropolis"],
    buttonLabel: "Get Direction",
  },
];

export function OfficeLocations() {
  return (
    <section className="border-t border-line py-16 lg:py-20 3xl:py-28">
      <Container>
        <SectionHeading
          title="Discover Our Office Locations"
          description="Estatein is here to serve you across multiple locations. Whether you're looking to meet our team, discuss real estate opportunities, or simply drop by for a chat, we have offices conveniently located to serve your needs. Explore the categories below to find the Estatein office nearest to you"
        />

        {/* Region tabs (segmented control) */}
        <div className="mt-10 inline-flex flex-wrap gap-1.5 rounded-xl border border-line bg-surface p-1.5">
          {tabs.map((tab, i) => (
            <button
              key={tab}
              type="button"
              aria-pressed={i === 0}
              className={cn(
                "rounded-lg px-5 py-2.5 text-base font-medium transition-colors sm:px-6",
                i === 0
                  ? "bg-elevated text-white"
                  : "text-muted hover:text-white",
              )}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          {offices.map((office) => (
            <article
              key={office.title}
              className="flex flex-col rounded-2xl border border-line bg-surface p-6 lg:p-8"
            >
              <p className="text-base text-muted">{office.label}</p>
              <h3 className="mt-2 text-2xl font-semibold text-white 3xl:text-[28px]">
                {office.title}
              </h3>
              <p className="mt-4 text-base leading-relaxed text-muted">
                {office.description}
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                {office.contacts.map((contact, i) => {
                  const Icon = contactIcons[i];
                  return (
                    <Tag key={contact} icon={<Icon className="size-4" />}>
                      {contact}
                    </Tag>
                  );
                })}
              </div>

              <Button
                variant="primary"
                href="#"
                aria-label={`Get direction to ${office.label}`}
                className="mt-6 w-full"
              >
                {office.buttonLabel}
              </Button>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
