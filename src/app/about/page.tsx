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
    <div className="min-h-screen max-w-7xl mx-auto py-20 flex flex-col items-center justify-center gap-12 px-4 md:px-8 text-slate-700 z-40 relative">
      <div className="w-full max-w-[1200px] flex flex-col items-center justify-start gap-12 px-4 md:px-8 mt-10">
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
