import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { CTA } from "@/components/layout/CTA";
import { Footer } from "@/components/layout/Footer";
import { FAQ } from "@/components/home/FAQ";
import { PropertyGallery } from "@/components/property/PropertyGallery";
import { PropertyOverview } from "@/components/property/PropertyOverview";
import { PropertyInquiryForm } from "@/components/property/PropertyInquiryForm";
import { PricingDetails } from "@/components/property/PricingDetails";
import { getPropertyBySlug, getPropertySlugs } from "@/lib/queries";
import type { PricingItem } from "@/lib/queries";
import { formatPrice } from "@/lib/format";

export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await getPropertySlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const data = await getPropertyBySlug(slug);
  if (!data) return { title: "Property | Estatein" };
  const { property } = data;
  return {
    title: property.meta_title ?? `${property.title} | Estatein`,
    description:
      property.meta_description ?? property.card_description ?? undefined,
  };
}

export default async function PropertyDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = await getPropertyBySlug(slug);
  if (!data) notFound();

  const { property, gallery, pricing } = data;
  const price = formatPrice(property.price, property.currency);
  const features = Array.isArray(property.key_features)
    ? (property.key_features as unknown[]).map(String)
    : [];
  const propertyName = [property.title, property.location]
    .filter(Boolean)
    .join(", ");

  return (
    <>
      <Header />
      <main>
        <PropertyGallery
          title={property.title}
          location={property.location}
          price={price}
          images={gallery.map((g) => ({ src: g.src, alt: g.alt }))}
        />
        <PropertyOverview
          description={property.full_description}
          bedrooms={property.bedrooms}
          bathrooms={property.bathrooms}
          area={property.area}
          areaUnit={property.area_unit}
          features={features}
        />
        <PropertyInquiryForm
          propertyId={property.id}
          propertyName={propertyName}
          title={property.title}
        />
        <PricingDetails
          listingPrice={price}
          categories={pricing.map((c) => ({
            title: c.title,
            learnMoreUrl: c.learn_more_url,
            items: Array.isArray(c.items) ? (c.items as PricingItem[]) : [],
          }))}
        />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
