"use client";

import { useEffect, useRef, useState } from "react";
import { GradientHeading } from "@/components/GradientHeading";

const steps = [
  {
    number: "01",
    title: "Who made it?",
    copy: "Understand the people and organizations involved in producing a product."
  },
  {
    number: "02",
    title: "What was checked?",
    copy: "Make quality evidence easier to understand, share, and verify."
  },
  {
    number: "03",
    title: "Who needs to know?",
    copy: "Help useful quality information move between the people and organizations that rely on it."
  }
];

export function WhySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const cards = section.querySelectorAll<HTMLElement>(".vertical-story-card");
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(Number((entry.target as HTMLElement).dataset.step));
        }),
      { rootMargin: "-34% 0px -34% 0px", threshold: 0.2 }
    );
    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="why-section vertical-story" id="why" ref={sectionRef}>
      <div className="container vertical-story-intro">
        <p className="section-kicker">Why OpenDQM exists</p>
        <GradientHeading
          lead="Making can cross boundaries."
          emphasis="Quality needs to cross them too."
        />
        <div className="why-copy">
          <p>A product may involve different makers, organizations, tools, and locations.</p>
          <p>
            But information about how it was made, checked, verified, and improved does not always
            move as easily.
          </p>
        </div>
      </div>
      <div className="container vertical-story-list">
        {steps.map((step, index) => (
          <div className="vertical-story-slot" key={step.title}>
            <article
              className={`vertical-story-card ${active === index ? "active" : ""}`}
              data-step={index}
            >
              <span>{step.number}</span>
              <h3>{step.title}</h3>
              <p>{step.copy}</p>
            </article>
          </div>
        ))}
      </div>
    </section>
  );
}
