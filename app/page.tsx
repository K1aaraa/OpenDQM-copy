import { EventsSection } from "@/components/EventsSection";
import { EcosystemSection } from "@/components/EcosystemSection";
import { Hero } from "@/components/Hero";
import { PrinciplesSection } from "@/components/PrinciplesSection";
import { ResourcesSection } from "@/components/ResourcesSection";
import { WhySection } from "@/components/WhySection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <WhySection />
      <PrinciplesSection />
      <EcosystemSection />
      <EventsSection />
      <ResourcesSection />
    </>
  );
}
