import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { CTA } from "@/components/layout/CTA";
import { Footer } from "@/components/layout/Footer";
import { AboutHero } from "@/components/about/AboutHero";
import { OurValues } from "@/components/about/OurValues";
import { OurAchievements } from "@/components/about/OurAchievements";
import { NavigatingExperience } from "@/components/about/NavigatingExperience";
import { MeetTheTeam } from "@/components/about/MeetTheTeam";
import { ValuedClients } from "@/components/about/ValuedClients";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "About Us | Estatein",
  description:
    "Learn about Estatein's journey, values, and achievements — and meet the team behind our mission to make your real estate dreams a reality.",
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <main>
        <AboutHero />
        <OurValues />
        <OurAchievements />
        <NavigatingExperience />
        <MeetTheTeam />
        <ValuedClients />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
