import HomeContact from "@/components/home/Contact";
import About from "@/components/home/HomeAbout";
import HomeHero from "@/components/home/HomeHero";
import HomeWorkExperience from "@/components/home/HomeWorkExperience";
import ProjectsSection from "@/components/home/Projects";
import ServicesSection from "@/components/home/Services";

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <About />
      <HomeWorkExperience />
      <ProjectsSection />
      {/*<DocumentSection />*/}
      <HomeContact />
    </>
  );
}
