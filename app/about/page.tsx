import type { Metadata } from "next";
import Image from "next/image";
import { assetPath } from "@/lib/assets";
import { BrandIcon } from "@/components/BrandIcon";
import { InstitutionalSupport } from "@/components/InstitutionalSupport";
import { TeamSection } from "@/components/TeamSection";
import { PageHeader } from "@/components/PageHeader";
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
      <div className="about-ombre">
        <section className="section about-intro">
          <div className="container about-intro-grid">
            <Reveal className="about-intro-summary">
              <GradientHeading lead="What is OpenDQM?" emphasis=" " />
            </Reveal>
            <Reveal className="about-intro-copy">
              <p>
                A community-driven effort that connects people exploring how quality can work across
                organizations, tools, and locations.
              </p>
              <p>
                How can information move without requiring every participant to use the same system?
                How can open participation be supported while preserving accountability, learning,
                and trust?
              </p>
            </Reveal>
          </div>
        </section>
        <InstitutionalSupport />
        <TeamSection />
        <section className="section project-summary" aria-labelledby="project-summary-title">
          <div className="container project-summary-grid">
            <div>
              <h2 id="project-summary-title">Read the Project Summary</h2>
              <p>
                Explore the vision and goals behind OpenDQM and our research into distributed
                quality management.
              </p>
              <a
                className="button button-primary"
                href={assetPath("/documents/OpenDQM%20summary.pdf")}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View Project Summary PDF (opens in a new tab)"
              >
                View PDF <BrandIcon kind="arrow" />
              </a>
            </div>
            <a
              className="summary-preview"
              href={assetPath("/documents/OpenDQM%20summary.pdf")}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open the OpenDQM Project Summary PDF in a new tab"
            >
              <Image
                src={assetPath("/documents/opendqm-summary-preview.png")}
                alt="Preview of the OpenDQM Project Summary: overview, intellectual merits, and broader impacts"
                width={857}
                height={1109}
              />
              <span>
                Open PDF <BrandIcon kind="arrow" />
              </span>
            </a>
          </div>
        </section>
      </div>
    </>
  );
}
