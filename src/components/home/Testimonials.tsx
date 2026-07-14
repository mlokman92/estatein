import Image from "next/image";
import { Star } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SliderControls } from "@/components/ui/SliderControls";
import { getTestimonials, getSiteContent } from "@/lib/queries";
import type { HomeSectionHeadings } from "@/lib/content";

export async function Testimonials() {
  const [testimonials, headings] = await Promise.all([
    getTestimonials(),
    getSiteContent<HomeSectionHeadings>("home.section_headings"),
  ]);
  if (testimonials.length === 0) return null;
  const h = headings?.testimonials;

  return (
    <section className="border-t border-line py-16 lg:py-20 3xl:py-28">
      <Container>
        <SectionHeading
          title={h?.title ?? "What Our Clients Say"}
          description={h?.description ?? ""}
          action={
            <Button variant="dark" href="#">
              {h?.actionLabel ?? "View All Testimonials"}
            </Button>
          }
        />

        <div className="mt-12 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 md:grid md:grid-cols-2 md:overflow-visible md:pb-0 lg:grid-cols-3">
          {testimonials.map((t) => (
            <article
              key={t.id}
              className="flex w-[85%] shrink-0 snap-start flex-col gap-4 rounded-2xl border border-line bg-surface p-6 md:w-auto"
            >
              <div className="flex items-center gap-2.5">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <span
                    key={i}
                    className="grid size-11 place-items-center rounded-full bg-elevated"
                  >
                    <Star
                      className="size-6 fill-current text-[#f5c451]"
                      aria-hidden="true"
                    />
                  </span>
                ))}
              </div>

              <h3 className="text-xl font-semibold text-white">{t.title}</h3>

              <p className="leading-relaxed text-muted">{t.body}</p>

              <div className="flex items-center gap-3 border-t border-line pt-5">
                {t.avatar && (
                  <Image
                    src={t.avatar}
                    alt={t.author_name ?? ""}
                    width={48}
                    height={48}
                    className="size-12 rounded-full object-cover"
                  />
                )}
                <div>
                  <p className="font-medium text-white">{t.author_name}</p>
                  <p className="text-sm text-muted">{t.author_location}</p>
                </div>
              </div>
            </article>
          ))}
        </div>

        <SliderControls current={1} total={testimonials.length} className="mt-12" />
      </Container>
    </section>
  );
}
