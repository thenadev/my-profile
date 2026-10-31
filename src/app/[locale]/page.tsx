import HomeContact from "@/components/home/Contact";
import About from "@/components/home/HomeAbout";
import HomeHero from "@/components/home/HomeHero";
import HomeProjects from "@/components/home/HomeProjects";
import HomeThenaDevHint from "@/components/home/HomeThenaDevHint";
import HomeWorkExperience from "@/components/home/HomeWorkExperience";
import { unstable_setRequestLocale } from "next-intl/server";

export default function HomePage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  return (
    <div className="overflow-hidden min-h-screen bg-turquoise-800">
      <div className="flex min-h-screen w-full">
        {/* Türkise Seitenleiste links – durchgehend */}
        <div
          className="flex-shrink-0 w-6 sm:w-12 lg:w-24 bg-turquoise-800"
          aria-hidden
        />
        {/* Dunkler Mittelstreifen: alle Sektionen in einem durchgehenden Rahmen */}
        <main className="flex-1 flex min-w-0 flex-col">
          <div className="mx-auto w-full max-w-7xl flex-1 flex flex-col bg-background">
            <HomeHero />
            <About />
            <HomeWorkExperience />
            <HomeProjects />
            <HomeContact />
            <HomeThenaDevHint />
          </div>
        </main>
        {/* Türkise Seitenleiste rechts – durchgehend */}
        <div
          className="flex-shrink-0 w-6 sm:w-12 lg:w-24 bg-turquoise-800"
          aria-hidden
        />
      </div>
    </div>
  );
}
