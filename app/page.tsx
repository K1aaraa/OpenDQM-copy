import { EventsSection } from "@/components/EventsSection";
import { EcosystemSection } from "@/components/EcosystemSection";
import { Hero } from "@/components/Hero";
import { WhySection } from "@/components/WhySection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <div className="home-ombre">
        <WhySection />
        <EcosystemSection />
        <EventsSection />
      </div>
    </>
  );
}
