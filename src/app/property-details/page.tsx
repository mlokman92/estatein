import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { CTA } from "@/components/layout/CTA";
import { Footer } from "@/components/layout/Footer";
import { FAQ } from "@/components/home/FAQ";
import { PropertyGallery } from "@/components/property/PropertyGallery";
import { PropertyOverview } from "@/components/property/PropertyOverview";
import { PropertyInquiryForm } from "@/components/property/PropertyInquiryForm";
import { PricingDetails } from "@/components/property/PricingDetails";

export const metadata: Metadata = {
  title: "Seaside Serenity Villa | Estatein",
  description:
    "Explore the Seaside Serenity Villa in Malibu, California — photos, key features, pricing details, and an inquiry form to schedule a viewing.",
};

export default function PropertyDetailsPage() {
  return (
    <>
      <Header />
      <main>
        <PropertyGallery />
        <PropertyOverview />
        <PropertyInquiryForm />
        <PricingDetails />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
