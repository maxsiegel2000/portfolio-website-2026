import AboutSection from "@/components/sections/AboutSection";
import { ContactSection } from "@/components/sections/ContactSection";
import HeroSection from "@/components/sections/HeroSection";
import { SkillsSection } from "@/components/sections/SkillsSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ContactSection />
    </>
  );
}
