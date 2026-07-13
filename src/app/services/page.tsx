import type { Metadata } from "next";
import {
  BarChart3,
  PieChart,
  Coins,
  Megaphone,
  Users,
  Wrench,
  Wallet,
  ShieldCheck,
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { CTA } from "@/components/layout/CTA";
import { Footer } from "@/components/layout/Footer";
import { ServicesHero } from "@/components/services/ServicesHero";
import {
  ServiceCategory,
  type ServiceCategoryProps,
} from "@/components/services/ServiceCategory";
import { InvestmentBlock } from "@/components/services/InvestmentBlock";

export const metadata: Metadata = {
  title: "Services | Estatein",
  description:
    "Explore Estatein's comprehensive real estate services — property valuation and selling, effortless property management, and investment advisory.",
};

const propertyValue: ServiceCategoryProps = {
  heading: "Unlock Property Value",
  paragraph:
    "Selling your property should be a rewarding experience, and at Estatein, we make sure it is. Our Property Selling Service is designed to maximize the value of your property, ensuring you get the best deal possible. Explore the categories below to see how we can help you at every step of your selling journey",
  cards: [
    {
      icon: BarChart3,
      title: "Valuation Mastery",
      description:
        "Discover the true worth of your property with our expert valuation services.",
    },
    {
      icon: PieChart,
      title: "Strategic Marketing",
      description:
        "Selling a property requires more than just a listing; it demands a strategic marketing approach.",
    },
    {
      icon: Coins,
      title: "Negotiation Wizardry",
      description:
        "Negotiating the best deal is an art, and our negotiation experts are masters of it.",
    },
    {
      icon: Megaphone,
      title: "Closing Success",
      description:
        "A successful sale is not complete until the closing. We guide you through the intricate closing process.",
    },
  ],
  featured: {
    heading: "Unlock the Value of Your Property Today",
    paragraph:
      "Ready to unlock the true value of your property? Explore our Property Selling Service categories and let us help you achieve the best deal possible for your valuable asset.",
    buttonLabel: "Learn More",
  },
};

const propertyManagement: ServiceCategoryProps = {
  heading: "Effortless Property Management",
  paragraph:
    "Owning a property should be a pleasure, not a hassle. Estatein's Property Management Service takes the stress out of property ownership, offering comprehensive solutions tailored to your needs. Explore the categories below to see how we can make property management effortless for you",
  cards: [
    {
      icon: Users,
      title: "Tenant Harmony",
      description:
        "Our Tenant Management services ensure that your tenants have a smooth and reducing vacancies.",
    },
    {
      icon: Wrench,
      title: "Maintenance Ease",
      description:
        "Say goodbye to property maintenance headaches. We handle all aspects of property upkeep.",
    },
    {
      icon: Wallet,
      title: "Financial Peace of Mind",
      description:
        "Managing property finances can be complex. Our financial experts take care of rent collection",
    },
    {
      icon: ShieldCheck,
      title: "Legal Guardian",
      description:
        "Stay compliant with property laws and regulations effortlessly.",
    },
  ],
  featured: {
    heading: "Experience Effortless Property Management",
    paragraph:
      "Ready to experience hassle-free property management? Explore our Property Management Service categories and let us handle the complexities while you enjoy the benefits of property ownership.",
    buttonLabel: "Learn More",
  },
};

export default function ServicesPage() {
  return (
    <>
      <Header />
      <main>
        <ServicesHero />
        <ServiceCategory {...propertyValue} />
        <ServiceCategory {...propertyManagement} />
        <InvestmentBlock />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
