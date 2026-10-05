"use client";

import { GradientHeading } from "@/components/GradientHeading";

const steps = [
  {
    title: "Shared",
    copy: "A common infrastructure connecting people, systems, and evidence.",
  },
  {
    title: "Trusted",
    copy: "Verified information and accountable quality processes.",
  },
  {
    title: "The Ecosystem",
    copy: "OpenDQM is a research project sponsored by the National Science Foundation Pathways for Open Source Ecosystems Phase 1 grant. The Global Open Source Quality Assurance System (GOSQAS), a project of Public Invention and central core of the OpenDQM ecosystem, gratefully partners with other open source community initiatives.",
  },
];

export function WhySection() {
  return (
    <section className="why-section" id="why">
      <div className="container vertical-story-intro">
        <GradientHeading
          lead="OpenDQM is researching the establishment of an"
          emphasis="open, shared, trusted, and interoperable ecosystem"
        />

        <div className="why-copy">
          <p>
            that supports democratized quality control, distributed quality
            assurance, verification, liability, and continuous improvement
            across diverse stakeholders.
          </p>
        </div>
      </div>

      <div className="container horizontal-story-list">
        {steps.map((step) => (
          <article className="horizontal-story-card" key={step.title}>
            <h3>{step.title}</h3>
            <p>{step.copy}</p>
          </article>
        ))}
      </div>
    </section>
  );
}