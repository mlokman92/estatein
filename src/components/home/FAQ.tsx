import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SliderControls } from "@/components/ui/SliderControls";

const DESC =
  "Find answers to common questions about Estatein's services, property listings, and the real estate process. We're here to provide clarity and assist you every step of the way.";

const FAQS: { question: string; answer: string }[] = [
  {
    question: "How do I search for properties on Estatein?",
    answer:
      "Learn how to use our user-friendly search tools to find properties that match your criteria.",
  },
  {
    question: "What documents do I need to sell my property through Estatein?",
    answer:
      "Find out about the necessary documentation for listing your property with us.",
  },
  {
    question: "How can I contact an Estatein agent?",
    answer:
      "Discover the different ways you can get in touch with our experienced agents.",
  },
];

export function FAQ() {
  return (
    <section className="border-t border-line py-16 lg:py-20 3xl:py-28">
      <Container>
        <SectionHeading
          title="Frequently Asked Questions"
          description={DESC}
          action={
            <Button variant="dark" href="#">
              {"View All FAQ’s"}
            </Button>
          }
        />

        <div className="mt-12 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 md:grid md:grid-cols-2 md:overflow-visible md:pb-0 lg:grid-cols-3">
          {FAQS.map((faq) => (
            <div
              key={faq.question}
              className="flex w-[85%] shrink-0 snap-start flex-col gap-3 rounded-2xl border border-line bg-surface p-6 md:h-full md:w-auto"
            >
              <h3 className="text-xl font-semibold text-white">
                {faq.question}
              </h3>
              <p className="leading-relaxed text-muted">
                {faq.answer}
              </p>
              <Button variant="dark" size="md" href="#" className="mt-auto self-start">
                Read More
              </Button>
            </div>
          ))}
        </div>

        <SliderControls current={1} total={10} className="mt-12" />
      </Container>
    </section>
  );
}
