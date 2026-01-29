"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { siteConfig } from "@/config/site";
import {
  getYearsOfExperienceDisplay,
  SATISFACTION_PERCENT,
} from "@/config/stats";
import { sendGoogleEvent } from "@/utils/sendGoogleEvent";
import { ArrowRight, Award, MessageCircle, Shield, Zap } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { FaGithub, FaLinkedin, FaMapPin } from "react-icons/fa";
import { MdEmail, MdPhone } from "react-icons/md";

const ContactSection: React.FC = () => {
  const t = useTranslations("About.ContactSection");

  const handleContactClick = () => {
    sendGoogleEvent("cta_click", {
      cta_type: "contact",
      location: "about_page",
      section: "contact",
    });
  };

  return (
    <section className="w-full">
      <div className="relative group">
        <div className="absolute -inset-2 bg-gradient-to-r from-primary/20 to-primary/20 rounded-3xl blur-md -z-20 group-hover:blur-lg transition-all duration-300" />

        <Card className="bg-card backdrop-blur-sm border border-border shadow-sm hover:shadow-md hover:border-primary/40 rounded-3xl p-8 md:p-12 transition-all">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4 text-center">
            {t("title")}
          </h2>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-6">
            {t("description")}
          </p>
          <div className="flex justify-center mb-6">
            <Button
              asChild
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-3"
            >
              <Link
                href="/contact"
                onClick={handleContactClick}
                className="flex items-center gap-2"
              >
                <MessageCircle className="h-5 w-5" />
                {t("cta.button")}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-6 mb-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Award className="h-4 w-4 text-primary" />
              <span>
                {getYearsOfExperienceDisplay()}{" "}
                {t("cta.trustBadges.experience")}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-primary" />
              <span>
                {SATISFACTION_PERCENT}% {t("cta.trustBadges.satisfaction")}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-primary" />
              <span>{t("cta.trustBadges.response")}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-primary rounded-full" />
              <span>{t("cta.trustBadges.free")}</span>
            </div>
          </div>
          <hr className="border-border mb-6" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <MdEmail className="w-5 h-5 text-primary" />
                <a
                  href={`mailto:${siteConfig.contactEmail}`}
                  className="text-foreground hover:text-primary hover:underline transition-colors"
                >
                  {siteConfig.contactEmail}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <MdPhone className="w-5 h-5 text-primary" />
                <a
                  href={`tel:${siteConfig.contactPhone}`}
                  className="text-foreground hover:text-primary hover:underline transition-colors"
                >
                  {siteConfig.contactPhoneDisplay}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <FaMapPin className="w-5 h-5 text-primary" />
                <span className="text-muted-foreground">
                  {siteConfig.city}, Deutschland
                </span>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <FaLinkedin className="w-5 h-5 text-primary" />
                <a
                  href={siteConfig.links.linkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground hover:text-primary hover:underline transition-colors"
                >
                  {t("social.linkedin")}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <FaGithub className="w-5 h-5 text-primary" />
                <a
                  href={siteConfig.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground hover:text-primary hover:underline transition-colors"
                >
                  {t("social.github")}
                </a>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default ContactSection;
