import { principles } from "@/data/principles";
import { Reveal } from "@/components/Reveal";
import { TypedHeading } from "@/components/TypedHeading";

export function PrinciplesSection() {
  return (
    <section className="section section-dark" id="about">
      <div className="container">
        <Reveal className="section-heading">
          <TypedHeading>
            What guides <strong>the work?</strong>
          </TypedHeading>
          <p>
            Four simple principles help OpenDQM stay open to participation while making quality
            information more useful across boundaries.
          </p>
        </Reveal>
        <Reveal className="principles">
          {principles.map((principle, index) => (
            <article className="principle" key={principle.title}>
              <span className="principle-index">{String(index + 1).padStart(2, "0")}</span>
              <h3>{principle.title}</h3>
              <p>{principle.description}</p>
            </article>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
