import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SparkleCluster } from "@/components/ui/Sparkle";
import { cn } from "@/lib/cn";

const paragraph =
  "Step inside the world of Estatein, where professionalism meets warmth, and expertise meets passion. Our gallery offers a glimpse into our team and workspaces, inviting you to get to know us better.";

function Photo({
  src,
  alt,
  className,
  sizes = "(min-width: 1024px) 50vw, 100vw",
}: {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
}) {
  return (
    <div className={cn("relative overflow-hidden rounded-2xl", className)}>
      <Image src={src} alt={alt} fill sizes={sizes} className="object-cover" />
    </div>
  );
}

export function Gallery() {
  return (
    <section className="border-t border-line py-16 lg:py-20 3xl:py-28">
      <Container>
        <div className="grid gap-4 lg:grid-cols-2 lg:gap-5">
          {/* Left column */}
          <div className="flex flex-col gap-4 lg:gap-5">
            <Photo
              src="/images/gallery-1.jpg"
              alt="Estatein office workspace"
              className="aspect-[3/1]"
            />
            <Photo
              src="/images/gallery-2.jpg"
              alt="Estatein team collaborating around a table"
              className="aspect-[3/1]"
            />
            <div className="order-first flex flex-1 flex-col justify-center py-2 lg:order-none">
              <SparkleCluster className="mb-4" />
              <h2 className="text-[32px] font-semibold leading-[1.2] tracking-tight sm:text-[40px] 3xl:text-5xl">
                Explore Estatein&apos;s World
              </h2>
              <p className="mt-4 max-w-md text-base leading-relaxed text-muted sm:text-lg">
                {paragraph}
              </p>
            </div>
          </div>

          {/* Right column */}
          <div className="flex flex-col gap-4 lg:gap-5">
            <Photo
              src="/images/gallery-3.jpg"
              alt="The Estatein team"
              className="aspect-[3/1]"
            />
            <div className="grid grid-cols-2 gap-4 lg:gap-5">
              <Photo
                src="/images/gallery-4.jpg"
                alt="Estatein real estate professionals"
                className="aspect-[3/2]"
                sizes="(min-width: 1024px) 25vw, 50vw"
              />
              <Photo
                src="/images/gallery-5.jpg"
                alt="Estatein advisory team"
                className="aspect-[3/2]"
                sizes="(min-width: 1024px) 25vw, 50vw"
              />
            </div>
            <Photo
              src="/images/gallery-6.jpg"
              alt="Closing a deal with a handshake"
              className="aspect-[5/2]"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
