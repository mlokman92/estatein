"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, MapPin } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/cn";

const images = [
  { src: "/images/pd-1.jpg", alt: "Seaside Serenity Villa exterior with infinity pool" },
  { src: "/images/pd-2.jpg", alt: "Open-plan living and dining room" },
  { src: "/images/pd-3.jpg", alt: "Villa exterior in daylight" },
  { src: "/images/pd-4.jpg", alt: "Poolside terrace with parasols" },
  { src: "/images/pd-5.jpg", alt: "Beachfront pool deck with loungers" },
  { src: "/images/pd-6.jpg", alt: "Living room with feature wall" },
  { src: "/images/pd-7.jpg", alt: "Gourmet kitchen and dining area" },
  { src: "/images/pd-8.jpg", alt: "Master bedroom suite" },
  { src: "/images/pd-9.jpg", alt: "Bright sitting room" },
];

export function PropertyGallery() {
  const [active, setActive] = useState(0);
  const len = images.length;
  const secondary = (active + 1) % len;

  return (
    <section className="pt-8 lg:pt-12">
      <Container>
        {/* Title / location / price */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <h1 className="text-3xl font-semibold text-white sm:text-4xl 3xl:text-5xl">
              Seaside Serenity Villa
            </h1>
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-line bg-surface px-4 py-2 text-sm text-muted">
              <MapPin className="size-4 text-white/80" aria-hidden="true" />
              Malibu, California
            </span>
          </div>
          <div className="sm:text-right">
            <p className="text-sm text-muted">Price</p>
            <p className="text-2xl font-bold text-white sm:text-3xl">$1,250,000</p>
          </div>
        </div>

        {/* Gallery panel */}
        <div
          role="group"
          aria-roledescription="carousel"
          aria-label="Seaside Serenity Villa photo gallery"
          className="mt-8 rounded-2xl border border-line bg-surface p-4 lg:p-6"
        >
          {/* Announce the active photo to assistive tech on change */}
          <p className="sr-only" aria-live="polite">
            {`Photo ${active + 1} of ${len}: ${images[active].alt}`}
          </p>
          {/* Thumbnail strip */}
          <div className="flex gap-3 overflow-x-auto pb-1">
            {images.map((img, i) => (
              <button
                key={img.src}
                type="button"
                onClick={() => setActive(i)}
                aria-label={`Show photo ${i + 1}`}
                aria-current={i === active}
                className={cn(
                  "relative aspect-[3/2] w-[104px] shrink-0 overflow-hidden rounded-lg transition lg:w-[128px]",
                  i === active
                    ? "ring-2 ring-purple"
                    : "opacity-70 hover:opacity-100",
                )}
              >
                <Image src={img.src} alt="" fill sizes="128px" className="object-cover" />
              </button>
            ))}
          </div>

          {/* Main images (2 on desktop, 1 on mobile) */}
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div className="relative aspect-[5/4] overflow-hidden rounded-xl">
              <Image
                src={images[active].src}
                alt={images[active].alt}
                fill
                priority
                sizes="(min-width: 768px) 45vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="relative hidden aspect-[5/4] overflow-hidden rounded-xl md:block">
              <Image
                src={images[secondary].src}
                alt={images[secondary].alt}
                fill
                sizes="45vw"
                className="object-cover"
              />
            </div>
          </div>

          {/* Carousel controls */}
          <div className="mt-5 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => setActive((a) => (a - 1 + len) % len)}
              aria-label="Previous photo"
              className="grid size-11 place-items-center rounded-full border border-line bg-bg text-white transition-colors hover:border-line-strong hover:bg-elevated"
            >
              <ArrowLeft className="size-5" />
            </button>
            <div className="flex items-center gap-2">
              {images.map((img, i) => (
                <button
                  key={img.src}
                  type="button"
                  onClick={() => setActive(i)}
                  aria-label={`Go to photo ${i + 1}`}
                  aria-current={i === active}
                  className={cn(
                    "h-1.5 rounded-full transition-all",
                    i === active ? "w-6 bg-purple" : "w-1.5 bg-line-strong hover:bg-muted",
                  )}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={() => setActive((a) => (a + 1) % len)}
              aria-label="Next photo"
              className="grid size-11 place-items-center rounded-full border border-line bg-bg text-white transition-colors hover:border-line-strong hover:bg-elevated"
            >
              <ArrowRight className="size-5" />
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
}
