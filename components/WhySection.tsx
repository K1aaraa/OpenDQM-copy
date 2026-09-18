"use client";

import { useEffect, useRef } from "react";
import { Reveal } from "@/components/Reveal";

const steps = [
  {
    number: "01",
    title: "Who made it?",
    copy: "Organizations: participants across a distributed production network."
  },
  {
    number: "02",
    title: "What was checked?",
    copy: "Shared evidence: quality information that can move between participants."
  },
  {
    number: "03",
    title: "Who needs to know?",
    copy: "Trusted quality: evidence that becomes verifiable and actionable."
  }
];

export function WhySection() {
  const storyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const story = storyRef.current;
    if (!story || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const update = () => {
      const bounds = story.getBoundingClientRect();
      const distance = story.offsetHeight - window.innerHeight;
      const progress = Math.min(1, Math.max(0, -bounds.top / Math.max(distance, 1)));
      story.style.setProperty("--story-progress", String(progress));
      story.dataset.stage = String(Math.min(2, Math.floor(progress * 3)));
      frame = 0;
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section className="why-section" id="why">
      <div className="scroll-story" ref={storyRef} data-stage="0">
        <div className="story-sticky container">
          <div className="why-grid">
            <Reveal>
              <p className="section-kicker">Why OpenDQM exists</p>
              <h2>
                Making can cross boundaries. <strong>Quality needs to cross them too.</strong>
              </h2>
            </Reveal>
            <Reveal className="why-copy">
              <p>A product may involve different makers, organizations, tools, and locations.</p>
              <p>
                But information about how it was made, checked, and improved does not always move as
                easily.
              </p>
            </Reveal>
          </div>
          <div className="quality-story-cards">
            <div className="story-connector" aria-hidden="true">
              <span />
            </div>
            {steps.map((step, index) => (
              <article className="story-card" data-step={index} key={step.title}>
                <span>{step.number}</span>
                <h3>{step.title}</h3>
                <p>{step.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
