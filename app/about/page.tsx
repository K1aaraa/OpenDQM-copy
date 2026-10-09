import type { Metadata } from "next";
// import { AboutEcosystem } from "@/components/AboutEcosystem";
import { InstitutionalSupport } from "@/components/InstitutionalSupport";
import { TeamSection } from "@/components/TeamSection";
import { PageHeader } from "@/components/PageHeader";
// import { PerspectivesSection } from "@/components/PerspectivesSection";
// import { PrinciplesSection } from "@/components/PrinciplesSection";
import { Reveal } from "@/components/Reveal";
import { GradientHeading } from "@/components/GradientHeading";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about OpenDQM's open, shared, trusted, interoperable approach to distributed quality management.",
  alternates: { canonical: "/about" }
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        title="Researching a new distributed quality management ecosystem"
        description=""
      />
      <section className="section about-intro">
        <div className="container about-intro-grid">
          <Reveal className="about-intro-summary">
            <GradientHeading lead="What is OpenDQM?" emphasis=" " />
            <p>
              A community-driven effort that connects people exploring how quality can work across
              organizations, tools, and locations.
            </p>
          </Reveal>
          <Reveal className="about-intro-copy">
            <p className="section-kicker">Questions guiding our research</p>
            <p>
              How can information move without requiring every participant to use the same system?
            </p>
            <p>
              How can open participation be supported while preserving accountability, learning, and
              trust?
            </p>
          </Reveal>
        </div>
      </section>
      {/* <PerspectivesSection /> */}
      {/* <PrinciplesSection /> */}
      {/* <section className="section about-ecosystem" id="affiliated-projects">
        <div className="container">
          <Reveal className="section-heading">
            <GradientHeading lead="How the ecosystem" emphasis="connects." />
            <p>
              Affiliated projects bring complementary experience to the wider challenge of
              distributed quality management.
            </p>
          </Reveal>
          <AboutEcosystem />
        </div>
      </section> */}
      {/* <AboutEcosystem /> */}
      <InstitutionalSupport />
      <TeamSection />
    </>
  );
}
