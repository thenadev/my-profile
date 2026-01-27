"use client";

import { useTranslations } from "next-intl";

const AboutHero: React.FC = () => {
  const t = useTranslations("About.Hero");

  return (
    <section className="text-center mb-16">
      <h1 className="text-4xl md:text-5xl xl:text-6xl font-extrabold bg-gradient-to-r from-turquoise-500 via-turquoise-600 to-turquoise-700 bg-clip-text text-transparent mb-6 animate-fadeIn">
        {t("title")}
      </h1>
      <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed animate-fadeIn delay-200">
        {t("description")}
      </p>
    </section>
  );
};

export default AboutHero;
