import type { Metadata } from "next";
import { AboutEcosystem } from "@/components/AboutEcosystem";
import { PageHeader } from "@/components/PageHeader";
import { PrinciplesSection } from "@/components/PrinciplesSection";
import { Reveal } from "@/components/Reveal";
import { SurveyCta } from "@/components/SurveyCta";

const perspectives = [
  "Makers",
  "Researchers",
  "Manufacturers",
  "Quality professionals",
  "Tool builders",
  "Standards and certification groups",
  "Users"
];

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
            <h2>
              A community-driven effort for <strong>quality across boundaries.</strong>
            </h2>
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
      <section className="section perspectives-section">
        <div className="container">
          <Reveal className="section-heading">
            <h2>
              Who is <strong>involved?</strong>
            </h2>
            <p>OpenDQM needs different views of making, checking, standards, tools, and use.</p>
          </Reveal>
          <div className="perspective-grid">
            {perspectives.map((item, index) => (
              <Reveal
                className={`perspective-item perspective-${index % 2 ? "right" : "left"}`}
                key={item}
              >
                <span>0{index + 1}</span>
                {item}
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <PrinciplesSection />
      <section className="section about-ecosystem" id="affiliated-projects">
        <div className="container">
          <Reveal className="section-heading">
            <h2>
              How the ecosystem <strong>connects.</strong>
            </h2>
            <p>
              Affiliated projects bring complementary experience to the wider challenge of
              distributed quality management.
            </p>
          </Reveal>
          <AboutEcosystem />
        </div>
      </section>
      <SurveyCta compact />
    </>
  );
}
