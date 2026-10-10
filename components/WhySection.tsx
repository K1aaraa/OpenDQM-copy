import { GradientHeading } from "@/components/GradientHeading";

const steps = [
  {
    title: "Open",
    copy: "Built for participation and transparency."
  },
  {
    title: "Shared",
    copy: "A common infrastructure connecting people, systems, and evidence."
  },
  {
    title: "Trusted",
    copy: "Verified information and accountable quality processes."
  },
  {
    title: "Interoperable",
    copy: "Functional approaches across different tools and organizations."
  }
];

export function WhySection() {
  return (
    <section className="why-section" id="why">
      <div className="container vertical-story-intro">
        <GradientHeading lead="Our" emphasis="Mission" />
        <div className="why-copy">
          <p>
            OpenDQM is researching the establishment of an open, shared, trusted, and interoperable
            ecosystem that supports democratized quality control, distributed quality assurance,
            verification, liability, and continuous improvement across diverse stakeholders.
          </p>
        </div>
      </div>

      <div className="container horizontal-story-list">
        {steps.map((step) => (
          <article
            className="horizontal-story-card"
            key={step.title}
            tabIndex={0}
            aria-labelledby={`principle-${step.title.toLowerCase()}`}
          >
            <h3 id={`principle-${step.title.toLowerCase()}`}>{step.title}</h3>
            <p>{step.copy}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
