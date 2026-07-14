import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { CTA } from "@/components/layout/CTA";
import { Footer } from "@/components/layout/Footer";
import { ServicesHero } from "@/components/services/ServicesHero";
import { ServiceCategory } from "@/components/services/ServiceCategory";
import { InvestmentBlock } from "@/components/services/InvestmentBlock";
import { getServiceCategoriesWithCards, getSiteContent } from "@/lib/queries";
import type { ServicesSeo } from "@/lib/content";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSiteContent<ServicesSeo>("services.seo");
  return {
    title: seo?.title ?? "Services | Estatein",
    description:
      seo?.description ??
      "Explore Estatein's comprehensive real estate services — property valuation and selling, effortless property management, and investment advisory.",
  };
}

export default async function ServicesPage() {
  const categories = await getServiceCategoriesWithCards();

  return (
    <>
      <Header />
      <main>
        <ServicesHero />
        {categories.map((category) => (
          <ServiceCategory
            key={category.id}
            heading={category.heading}
            paragraph={category.paragraph ?? ""}
            cards={category.cards}
            featuredHeading={category.featured_heading ?? ""}
            featuredParagraph={category.featured_paragraph ?? ""}
            featuredButtonLabel={category.featured_button_label ?? "Learn More"}
            featuredButtonHref={category.featured_button_href ?? "#"}
          />
        ))}
        <InvestmentBlock />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
