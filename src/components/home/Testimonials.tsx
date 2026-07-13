import Image from "next/image";
import { Star } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SliderControls } from "@/components/ui/SliderControls";

type Testimonial = {
  rating: number;
  title: string;
  text: string;
  name: string;
  location: string;
  avatar: string;
};

const testimonials: Testimonial[] = [
  {
    rating: 5,
    title: "Exceptional Service!",
    text: "Our experience with Estatein was outstanding. Their team's dedication and professionalism made finding our dream home a breeze. Highly recommended!",
    name: "Wade Warren",
    location: "USA, California",
    avatar: "/images/avatar-1.jpg",
  },
  {
    rating: 5,
    title: "Efficient and Reliable",
    text: "Estatein provided us with top-notch service. They helped us sell our property quickly and at a great price. We couldn't be happier with the results.",
    name: "Emelie Thomson",
    location: "USA, Florida",
    avatar: "/images/avatar-2.jpg",
  },
  {
    rating: 5,
    title: "Trusted Advisors",
    text: "The Estatein team guided us through the entire buying process. Their knowledge and commitment to our needs were impressive. Thank you for your support!",
    name: "John Mans",
    location: "USA, Nevada",
    avatar: "/images/avatar-3.jpg",
  },
];

export function Testimonials() {
  return (
    <section className="border-t border-line py-16 lg:py-20 3xl:py-28">
      <Container>
        <SectionHeading
          title="What Our Clients Say"
          description="Read the success stories and heartfelt testimonials from our valued clients. Discover why they chose Estatein for their real estate needs."
          action={
            <Button variant="dark" href="#">
              View All Testimonials
            </Button>
          }
        />

        <div className="mt-12 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 md:grid md:grid-cols-2 md:overflow-visible md:pb-0 lg:grid-cols-3">
          {testimonials.map((t) => (
            <article
              key={t.name}
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

              <p className="leading-relaxed text-muted">{t.text}</p>

              <div className="flex items-center gap-3 border-t border-line pt-5">
                <Image
                  src={t.avatar}
                  alt={t.name}
                  width={48}
                  height={48}
                  className="size-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-medium text-white">{t.name}</p>
                  <p className="text-sm text-muted">{t.location}</p>
                </div>
              </div>
            </article>
          ))}
        </div>

        <SliderControls current={1} total={10} className="mt-12" />
      </Container>
    </section>
  );
}
