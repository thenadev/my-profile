import HomeContact from "@/components/home/Contact";
import About from "@/components/home/HomeAbout";
import HomeHero from "@/components/home/HomeHero";
import HomeProjects from "@/components/home/HomeProjects";
import HomeWorkExperience from "@/components/home/HomeWorkExperience";
import ServicesSection from "@/components/home/Services";

export default function HomePage() {
  return (
    <div className="overflow-hidden">
      <HomeHero />
      <About />
      <HomeWorkExperience />
      <HomeProjects />
      {/*<DocumentSection />*/}
      <HomeContact />
    </div>
  );
}
