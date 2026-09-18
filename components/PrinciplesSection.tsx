"use client";

import { useEffect, useRef, useState } from "react";
import { GradientHeading } from "@/components/GradientHeading";
import { principles } from "@/data/principles";

export function PrinciplesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (
      !section ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      window.matchMedia("(max-width: 980px)").matches
    )
      return;
    let frame = 0;
    const update = () => {
      const bounds = section.getBoundingClientRect();
      const distance = section.offsetHeight - window.innerHeight;
      const progress = Math.min(1, Math.max(0, -bounds.top / Math.max(distance, 1)));
      setActive(Math.min(principles.length - 1, Math.floor(progress * principles.length)));
      frame = 0;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  const principle = principles[active];

  return (
    <section className="section-dark principle-sequence" id="about">
      <div className="principle-scroll" ref={sectionRef}>
        <div className="principle-sticky container">
          <div className="principle-intro">
            <GradientHeading lead="What guides" emphasis="the work?" />
            <p>
              Four simple principles help OpenDQM stay open to participation while making quality
              information more useful across boundaries.
            </p>
          </div>
          <article className="principle-focus-card" key={principle.title}>
            <span>{String(active + 1).padStart(2, "0")}</span>
            <h3>{principle.title}</h3>
            <p>{principle.description}</p>
          </article>
          <div className="principle-progress" aria-hidden="true">
            {principles.map((item, index) => (
              <span className={index === active ? "active" : ""} key={item.title} />
            ))}
          </div>
        </div>
      </div>
      <div className="principle-mobile container">
        <div className="principle-intro">
          <GradientHeading lead="What guides" emphasis="the work?" />
          <p>Four simple principles help quality information move across boundaries.</p>
        </div>
        <div className="principle-tabs" role="tablist" aria-label="OpenDQM principles">
          {principles.map((item, index) => (
            <button
              type="button"
              role="tab"
              aria-selected={active === index}
              onClick={() => setActive(index)}
              key={item.title}
            >
              {String(index + 1).padStart(2, "0")}
            </button>
          ))}
        </div>
        <article className="principle-focus-card" key={`mobile-${principle.title}`}>
          <span>{String(active + 1).padStart(2, "0")}</span>
          <h3>{principle.title}</h3>
          <p>{principle.description}</p>
        </article>
      </div>
      <ul className="sr-only">
        {principles.map((item) => (
          <li key={item.title}>
            {item.title}: {item.description}
          </li>
        ))}
      </ul>
    </section>
  );
}
