"use client";

import { Card } from "@/components/ui/card";
import { siteConfig } from "@/config/site";
import { FaGithub, FaLinkedin, FaMapPin } from "react-icons/fa";
import { MdEmail, MdPhone } from "react-icons/md";

const ContactSection: React.FC = () => {
  return (
    <section className="w-full">
      <div className="relative group">
        <div className="absolute -inset-2 bg-gradient-to-r from-gray-400/20 to-blue-400/20 rounded-3xl blur-md -z-20 group-hover:blur-lg transition-all duration-300" />

        <Card className="bg-white/90 backdrop-blur-sm border border-gray-100/50 shadow-2xl rounded-3xl p-8">
          <h2 className="text-2xl font-semibold text-slate-800 mb-6 text-center">
            Lass uns zusammenarbeiten
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <MdEmail className="w-5 h-5 text-blue-600" />
                <a
                  href={`mailto:${siteConfig.contactEmail}`}
                  className="text-blue-600 hover:underline"
                >
                  {siteConfig.contactEmail}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <MdPhone className="w-5 h-5 text-green-600" />
                <a
                  href={`tel:${siteConfig.contactPhone}`}
                  className="text-green-600 hover:underline"
                >
                  {siteConfig.contactPhoneDisplay}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <FaMapPin className="w-5 h-5 text-purple-600" />
                <span className="text-slate-600">
                  {siteConfig.city}, {siteConfig.country}
                </span>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <FaLinkedin className="w-5 h-5 text-blue-600" />
                <a
                  href={siteConfig.links.linkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  LinkedIn Profil
                </a>
              </div>
              <div className="flex items-center gap-3">
                <FaGithub className="w-5 h-5 text-gray-800" />
                <a
                  href={siteConfig.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-800 hover:underline"
                >
                  GitHub Projekte
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