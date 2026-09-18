import type { Metadata } from "next";
import { AboutEcosystem } from "@/components/AboutEcosystem";
import { InstitutionalSupport } from "@/components/InstitutionalSupport";
import { PageHeader } from "@/components/PageHeader";
import { PerspectivesSection } from "@/components/PerspectivesSection";
import { PrinciplesSection } from "@/components/PrinciplesSection";
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
        eyebrow="About"
        title="What problem are we trying to solve?"
        description="Making can happen across many people, tools, and places. Quality information does not always travel with it."
      />
      <section className="section about-intro">
        <div className="container about-intro-grid">
          <Reveal>
            <p className="section-kicker">What is OpenDQM?</p>
            <GradientHeading
              lead="A community-driven effort for"
              emphasis="quality across boundaries."
            />
          </Reveal>
          <Reveal className="about-intro-copy">
            <p>
              OpenDQM brings people together to explore how quality information, evidence, and
              responsibility can work across organizations, tools, and locations.
            </p>
            <p>
              The goal is to help information move without requiring every participant to use the
              same system.
            </p>
            <p>
              That can support open participation while preserving accountability, learning, and
              trust.
            </p>
          </Reveal>
        </div>
      </section>
      <PerspectivesSection />
      <PrinciplesSection />
      <section className="section about-ecosystem" id="affiliated-projects">
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
      </section>
      <InstitutionalSupport />
    </>
  );
}
