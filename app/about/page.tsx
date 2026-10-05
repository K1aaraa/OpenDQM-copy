import type { Metadata } from "next";
import { AboutEcosystem } from "@/components/AboutEcosystem";
import { InstitutionalSupport } from "@/components/InstitutionalSupport";
import { PageHeader } from "@/components/PageHeader";
import { PerspectivesSection } from "@/components/PerspectivesSection";
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
        eyebrow="About"
        title="We are researching the distributed quality management ecosystem."
        description=""
      />
      <section className="section about-intro">
        <div className="container about-intro-grid">
          <Reveal>
            <GradientHeading
              lead="What is OpenDQM?"
              emphasis="A community-driven effort that connects people exploring how quality can work across organizations, tools, and locations."
            />
          </Reveal>
          <Reveal className="about-intro-copy">
            <p>
              Investigating ecosystem scale questions:

              How can information move without requiring every participant to use the same system?

              How can open participation be supported while preserving accountability, learning, and trust?
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
      <InstitutionalSupport />
    </>
  );
}
