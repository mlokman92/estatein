import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { CTA } from "@/components/layout/CTA";
import { Footer } from "@/components/layout/Footer";
import { ContactHero } from "@/components/contact/ContactHero";
import { ContactForm } from "@/components/contact/ContactForm";
import { OfficeLocations } from "@/components/contact/OfficeLocations";
import { Gallery } from "@/components/contact/Gallery";

export const metadata: Metadata = {
  title: "Contact Us | Estatein",
  description:
    "Get in touch with Estatein. Reach out via our contact form, connect with our offices, or explore our world — we're just a message away.",
};

export default function ContactPage() {
  return (
    <>
      <Header />
      <main>
        <ContactHero />
        <ContactForm />
        <OfficeLocations />
        <Gallery />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
