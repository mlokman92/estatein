import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SparkleCluster } from "@/components/ui/Sparkle";
import { cn } from "@/lib/cn";
import { getGalleryPhotos, getSiteContent } from "@/lib/queries";
import type { ContactSectionHeadings } from "@/lib/content";
import type { GalleryPhoto } from "@/lib/queries";

const DEFAULT_PARAGRAPH =
  "Step inside the world of Estatein, where professionalism meets warmth, and expertise meets passion. Our gallery offers a glimpse into our team and workspaces, inviting you to get to know us better.";

// Literal aspect-ratio classes so Tailwind's scanner emits them.
const ASPECT_CLASS: Record<string, string> = {
  "3/1": "aspect-[3/1]",
  "3/2": "aspect-[3/2]",
  "5/2": "aspect-[5/2]",
};

function Photo({
  photo,
  className,
  fallbackAspect,
}: {
  photo: GalleryPhoto;
  className?: string;
  fallbackAspect: string;
}) {
  const aspect = ASPECT_CLASS[photo.aspect_ratio ?? ""] ?? fallbackAspect;
  return (
    <div className={cn("relative overflow-hidden rounded-2xl", aspect, className)}>
      <Image
        src={photo.src}
        alt={photo.alt ?? ""}
        fill
        sizes={photo.sizes ?? "(min-width: 1024px) 50vw, 100vw"}
        className="object-cover"
      />
    </div>
  );
}

export async function Gallery() {
  const [photos, headings] = await Promise.all([
    getGalleryPhotos(),
    getSiteContent<ContactSectionHeadings>("contact.section_headings"),
  ]);

  if (photos.length === 0) return null;

  return (
    <section className="border-t border-line py-16 lg:py-20 3xl:py-28">
      <Container>
        <div className="grid gap-4 lg:grid-cols-2 lg:gap-5">
          {/* Left column */}
          <div className="flex flex-col gap-4 lg:gap-5">
            {photos[0] && <Photo photo={photos[0]} fallbackAspect="aspect-[3/1]" />}
            {photos[1] && <Photo photo={photos[1]} fallbackAspect="aspect-[3/1]" />}
            <div className="order-first flex flex-1 flex-col justify-center py-2 lg:order-none">
              <SparkleCluster className="mb-4" />
              <h2 className="text-[32px] font-semibold leading-[1.2] tracking-tight sm:text-[40px] 3xl:text-5xl">
                {headings?.gallery.title ?? "Explore Estatein's World"}
              </h2>
              <p className="mt-4 max-w-md text-base leading-relaxed text-muted sm:text-lg">
                {headings?.gallery.description ?? DEFAULT_PARAGRAPH}
              </p>
            </div>
          </div>

          {/* Right column */}
          <div className="flex flex-col gap-4 lg:gap-5">
            {photos[2] && <Photo photo={photos[2]} fallbackAspect="aspect-[3/1]" />}
            <div className="grid grid-cols-2 gap-4 lg:gap-5">
              {photos[3] && (
                <Photo photo={photos[3]} fallbackAspect="aspect-[3/2]" />
              )}
              {photos[4] && (
                <Photo photo={photos[4]} fallbackAspect="aspect-[3/2]" />
              )}
            </div>
            {photos[5] && <Photo photo={photos[5]} fallbackAspect="aspect-[5/2]" />}
          </div>
        </div>
      </Container>
    </section>
  );
}
