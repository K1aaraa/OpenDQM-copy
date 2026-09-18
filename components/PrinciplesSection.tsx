import { principles } from "@/data/principles";
import { Reveal } from "@/components/Reveal";

export function PrinciplesSection() {
  return (
    <section className="section section-dark" id="about">
      <div className="container">
        <Reveal className="section-heading">
          <h2>
            What guides <strong>the work?</strong>
          </h2>
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
