"use client";

import {
  AboutHero,
  BlockchainSection,
  ContactSection,
  PersonalStory,
  PersonalValues,
  ProfessionalJourney,
} from "@/components/about";
import { useTranslations } from "next-intl";

const AboutPage: React.FC = () => {
  const t = useTranslations("About");

  return (
    <div className="min-h-screen w-full flex flex-col items-center gap-8 md:gap-12 bg-background py-20 z-40 relative">
      <div className="w-full max-w-7xl mx-auto flex flex-col items-center justify-start gap-8 md:gap-12 px-4 md:px-8">
        <AboutHero />
        <PersonalStory />
        <ProfessionalJourney />
        <BlockchainSection />
        <PersonalValues />
        <ContactSection />
      </div>
    </div>
  );
};

export default AboutPage;
