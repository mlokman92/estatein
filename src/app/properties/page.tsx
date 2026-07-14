import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { CTA } from "@/components/layout/CTA";
import { Footer } from "@/components/layout/Footer";
import { PropertiesHero } from "@/components/properties/PropertiesHero";
import { PropertyGrid } from "@/components/properties/PropertyGrid";
import { InquiryForm } from "@/components/properties/InquiryForm";
import { getPropertyFilterOptions } from "@/lib/queries";
import type { PropertyFilters } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Properties | Estatein",
  description:
    "Explore Estatein's curated selection of properties. Search, filter, and find the perfect home that resonates with your vision.",
};

export const revalidate = 60;

export default async function PropertiesPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const sp = await searchParams;
  const one = (v: string | string[] | undefined): string =>
    (Array.isArray(v) ? v[0] : v) ?? "";
  const filters: PropertyFilters = {
    query: one(sp.q),
    location: one(sp.location),
    type: one(sp.type),
    price: one(sp.price),
    size: one(sp.size),
  };
  const options = await getPropertyFilterOptions();

  return (
    <>
      <Header />
      <main>
        <PropertiesHero filters={filters} options={options} />
        <PropertyGrid filters={filters} />
        <InquiryForm />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
