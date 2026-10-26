import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import EcommerceSection from "@/components/EcommerceSection";
import FaqSection from "@/components/FaqSection";
import FirstClientNote from "@/components/FirstClientNote";
import FounderSection from "@/components/FounderSection";
import HeroIntake from "@/components/HeroIntake";
import ProcessSection from "@/components/ProcessSection";
import Reveal from "@/components/Reveal";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import WebsiteSection from "@/components/WebsiteSection";
import WorksSection from "@/components/WorksSection";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <HeroIntake />
        <Reveal>
          <AboutSection />
        </Reveal>
        <Reveal delay={40}>
          <WebsiteSection />
        </Reveal>
        <Reveal delay={40}>
          <EcommerceSection />
        </Reveal>
        <Reveal delay={40}>
          <ProcessSection />
        </Reveal>
        <Reveal delay={40}>
          <WorksSection />
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
        <SiteFooter />
      </Reveal>
    </>
  );
}
