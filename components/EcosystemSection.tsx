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
          <p className="section-kicker">Part of a broader quality ecosystem</p>
          <GradientHeading
            lead="Affiliated organizations"
            emphasis="connected to distributed quality."
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
          <p className="section-kicker">What we are building</p>
          <h3>What OpenDQM is building</h3>
          <p>
            OpenDQM is scoping a shared foundation for distributed quality: the infrastructure,
            practices, evidence, governance, and data exchange needed across manufacturing
            environments.
          </p>
          <p>
            The goal is to help quality information move clearly between different people,
            organizations, tools, and locations so it can be understood, exchanged, verified, and
            improved.
          </p>
          <p className="ecosystem-formal-definition">
            OpenDQM is establishing an open, shared, trusted, interoperable ecosystem to support
            democratized quality control and distributed quality assurance, verification, liability,
            and continuous improvement across heterogeneous actors.
          </p>
        </div>
      </div>
    </section>
  );
}
