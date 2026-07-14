import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { CTA } from "@/components/layout/CTA";
import { Footer } from "@/components/layout/Footer";
import { PropertiesHero } from "@/components/properties/PropertiesHero";
import { PropertyGrid } from "@/components/properties/PropertyGrid";
import { InquiryForm } from "@/components/properties/InquiryForm";

export const metadata: Metadata = {
  title: "Properties | Estatein",
  description:
    "Explore Estatein's curated selection of properties. Search, filter, and find the perfect home that resonates with your vision.",
};

export const revalidate = 60;

export default function PropertiesPage() {
  return (
    <>
      <Header />
      <main>
        <PropertiesHero />
        <PropertyGrid />
        <InquiryForm />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
