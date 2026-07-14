import { Mail, Phone, MapPin } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Tag } from "@/components/ui/Tag";
import { cn } from "@/lib/cn";
import { getOfficeLocations, getSiteContent } from "@/lib/queries";
import type { ContactSectionHeadings } from "@/lib/content";

export async function OfficeLocations() {
  const [offices, headings] = await Promise.all([
    getOfficeLocations(),
    getSiteContent<ContactSectionHeadings>("contact.section_headings"),
  ]);

  if (offices.length === 0) return null;

  const regions = Array.from(new Set(offices.map((o) => o.region)));
  const tabs = [
    "All",
    ...regions.map((r) => r.charAt(0).toUpperCase() + r.slice(1)),
  ];

  return (
    <section className="border-t border-line py-16 lg:py-20 3xl:py-28">
      <Container>
        <SectionHeading
          title={headings?.offices.title ?? "Discover Our Office Locations"}
          description={
            headings?.offices.description ??
            "Estatein is here to serve you across multiple locations. Whether you're looking to meet our team, discuss real estate opportunities, or simply drop by for a chat, we have offices conveniently located to serve your needs. Explore the categories below to find the Estatein office nearest to you"
          }
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
          {offices.map((office) => {
            const contacts: { Icon: LucideIcon; value: string }[] = [
              { Icon: Mail, value: office.email ?? "" },
              { Icon: Phone, value: office.phone ?? "" },
              { Icon: MapPin, value: office.city ?? "" },
            ].filter((c) => c.value);

            return (
              <article
                key={office.id}
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
                  {contacts.map(({ Icon, value }) => (
                    <Tag key={value} icon={<Icon className="size-4" />}>
                      {value}
                    </Tag>
                  ))}
                </div>

                <Button
                  variant="primary"
                  href={office.button_href ?? "#"}
                  aria-label={`Get direction to ${office.label}`}
                  className="mt-6 w-full"
                >
                  {office.button_label}
                </Button>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
