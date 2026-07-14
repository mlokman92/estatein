import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { CTA } from "@/components/layout/CTA";
import { Footer } from "@/components/layout/Footer";
import { ContactHero } from "@/components/contact/ContactHero";
import { ContactForm } from "@/components/contact/ContactForm";
import { OfficeLocations } from "@/components/contact/OfficeLocations";
import { Gallery } from "@/components/contact/Gallery";
import { getSiteContent } from "@/lib/queries";
import type { ContactSectionHeadings } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact Us | Estatein",
  description:
    "Get in touch with Estatein. Reach out via our contact form, connect with our offices, or explore our world — we're just a message away.",
};

export const revalidate = 60;

export default async function ContactPage() {
  const sh = await getSiteContent<ContactSectionHeadings>(
    "contact.section_headings",
  );

  return (
    <>
      <Header />
      <main>
        <ContactHero />
        <ContactForm title={sh?.form.title} description={sh?.form.description} />
        <OfficeLocations />
        <Gallery />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
