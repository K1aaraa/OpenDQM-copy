import Image from "next/image";
import { projects } from "@/data/projects";
import { Reveal } from "@/components/Reveal";
import { GradientHeading } from "@/components/GradientHeading";

function LogoSet({ hidden = false }: { hidden?: boolean }) {
  return (
    <div className="logo-set" aria-hidden={hidden || undefined}>
      {projects.map((project) => (
        <div className="ecosystem-logo" key={project.title}>
          <Image src={project.image} alt={hidden ? "" : project.alt} width={160} height={82} />
          <span>{project.title}</span>
        </div>
      ))}
    </div>
  );
}

export function EcosystemSection() {
  return (
    <section className="section ecosystem-section" id="ecosystem">
      <div className="container">
        <Reveal className="ecosystem-heading">
          {/* <p className="section-kicker">Part of a broader quality ecosystem</p> */}
          <GradientHeading
            lead="The Ecosystem"
          />
        </Reveal>
      </div>
      <Reveal className="logo-marquee">
        <div className="logo-track">
          <LogoSet />
          <LogoSet hidden />
        </div>
      </Reveal>
      <div className="container ecosystem-explainer">
        <div>
          {/* <p className="section-kicker">What we are building</p> */}
          <p className="ecosystem-formal-definition">
            OpenDQM is a research project sponsored by the National Science Foundation Pathways for Open Source Ecosystems Phase 1 grant. The Global Open Source Quality Assurance System (GOSQAS), a project of Public Invention and central core of the OpenDQM ecosystem, gratefully partners with other open source community initiatives.
          </p>
        </div>
      </div>
    </section>
  );
}
