import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SliderControls } from "@/components/ui/SliderControls";
import { getFaqItems, getSiteContent } from "@/lib/queries";
import type { HomeSectionHeadings } from "@/lib/content";

export async function FAQ() {
  const [faqs, headings] = await Promise.all([
    getFaqItems(),
    getSiteContent<HomeSectionHeadings>("home.section_headings"),
  ]);
  if (faqs.length === 0) return null;
  const h = headings?.faq;

  return (
    <section className="border-t border-line py-16 lg:py-20 3xl:py-28">
      <Container>
        <SectionHeading
          title={h?.title ?? "Frequently Asked Questions"}
          description={h?.description ?? ""}
          action={
            <Button variant="dark" href="#">
              {h?.actionLabel ?? "View All FAQ’s"}
            </Button>
          }
        />

        <div className="mt-12 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 md:grid md:grid-cols-2 md:overflow-visible md:pb-0 lg:grid-cols-3">
          {faqs.map((faq) => (
            <div
              key={faq.id}
              className="flex w-[85%] shrink-0 snap-start flex-col gap-3 rounded-2xl border border-line bg-surface p-6 md:h-full md:w-auto"
            >
              <h3 className="text-xl font-semibold text-white">{faq.question}</h3>
              <p className="leading-relaxed text-muted">{faq.answer}</p>
              <Button
                variant="dark"
                size="md"
                href={faq.read_more_url ?? "#"}
                className="mt-auto self-start"
              >
                Read More
              </Button>
            </div>
          ))}
        </div>

        <SliderControls current={1} total={faqs.length} className="mt-12" />
      </Container>
    </section>
  );
}
