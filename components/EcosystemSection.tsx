import Image from "next/image";
import Link from "next/link";
import { projects } from "@/data/projects";
import { Reveal } from "@/components/Reveal";
import { TypedHeading } from "@/components/TypedHeading";

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
          <p className="section-kicker">We are not starting from scratch</p>
          <TypedHeading>
            Part of a growing ecosystem for <strong>distributed quality.</strong>
          </TypedHeading>
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
          <h3>A shared layer for quality information.</h3>
          <p>
            OpenDQM connects and learns from work already happening across distributed
            manufacturing, open hardware, provenance, and quality. Together, these perspectives can
            make quality evidence easier to exchange and trust.
          </p>
        </div>
        <Link className="text-link" href="/about#affiliated-projects">
          How the ecosystem connects <span aria-hidden="true">&#8594;</span>
        </Link>
      </div>
    </section>
  );
}
