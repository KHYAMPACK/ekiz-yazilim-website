import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import FaqSection from "@/components/FaqSection";
import FirstClientNote from "@/components/FirstClientNote";
import FounderSection from "@/components/FounderSection";
import HeroIntake from "@/components/HeroIntake";
import ProcessSection from "@/components/ProcessSection";
import ResearchSection from "@/components/ResearchSection";
import Reveal from "@/components/Reveal";
import ScFooter from "@/components/ScFooter";
import ScHeader from "@/components/ScHeader";
import WebsiteSection from "@/components/WebsiteSection";
import WorksSection from "@/components/WorksSection";

export default function Home() {
  return (
    <div className="sc-root">
      <ScHeader />
      <main>
        <HeroIntake />
        <Reveal>
          <AboutSection />
        </Reveal>
        <Reveal delay={40}>
          <WebsiteSection />
        </Reveal>
        <Reveal delay={40}>
          <ProcessSection />
        </Reveal>
        <Reveal delay={40}>
          <WorksSection />
        </Reveal>
        <Reveal delay={40}>
          <ResearchSection />
        </Reveal>
        <Reveal delay={40}>
          <FirstClientNote />
        </Reveal>
        <Reveal delay={40}>
          <FounderSection />
        </Reveal>
        <Reveal delay={40}>
          <FaqSection />
        </Reveal>
        <Reveal delay={40}>
          <ContactSection />
        </Reveal>
      </main>
      <Reveal>
        <ScFooter />
      </Reveal>
    </div>
  );
}
