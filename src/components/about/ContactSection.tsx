"use client";

import { Card } from "@/components/ui/card";
import { siteConfig } from "@/config/site";
import { useTranslations } from "next-intl";
import { FaGithub, FaLinkedin, FaMapPin } from "react-icons/fa";
import { MdEmail, MdPhone } from "react-icons/md";

const ContactSection: React.FC = () => {
  const t = useTranslations("About.ContactSection");

  return (
    <section className="w-full">
      <div className="relative group">
        <div className="absolute -inset-2 bg-gradient-to-r from-turquoise-500/20 to-turquoise-600/20 rounded-3xl blur-md -z-20 group-hover:blur-lg transition-all duration-300" />

        <Card className="bg-turquoise-800/60 backdrop-blur-sm border border-turquoise-600/30 shadow-sm hover:shadow-md rounded-3xl p-8">
          <h2 className="text-2xl font-semibold text-white mb-6 text-center">
            {t("title")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <MdEmail className="w-5 h-5 text-turquoise-400" />
                <a
                  href={`mailto:${siteConfig.contactEmail}`}
                  className="text-turquoise-300 hover:underline"
                >
                  {siteConfig.contactEmail}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <MdPhone className="w-5 h-5 text-turquoise-400" />
                <a
                  href={`tel:${siteConfig.contactPhone}`}
                  className="text-turquoise-300 hover:underline"
                >
                  {siteConfig.contactPhoneDisplay}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <FaMapPin className="w-5 h-5 text-turquoise-400" />
                <span className="text-gray-200">
                  {siteConfig.city}, Deutschland
                </span>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <FaLinkedin className="w-5 h-5 text-turquoise-400" />
                <a
                  href={siteConfig.links.linkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-turquoise-300 hover:underline"
                >
                  {t("social.linkedin")}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <FaGithub className="w-5 h-5 text-turquoise-400" />
                <a
                  href={siteConfig.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-turquoise-300 hover:underline"
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
