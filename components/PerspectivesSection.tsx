"use client";

import { useEffect, useRef, useState } from "react";
import { GradientHeading } from "@/components/GradientHeading";
import { Reveal } from "@/components/Reveal";

const perspectives = [
  "Makers",
  "Researchers",
  "Manufacturers",
  "Quality professionals",
  "Tool builders",
  "Standards and certification groups",
  "Users"
];

export function PerspectivesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const items = Array.from(section.querySelectorAll(".perspective-item"));
            setActive(items.indexOf(entry.target));
          }
        });
      },
      { rootMargin: "-38% 0px -38% 0px", threshold: 0.2 }
    );

    section
      .querySelectorAll<HTMLElement>(".perspective-item")
      .forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="section perspectives-section" ref={sectionRef}>
      <div className="container">
        <Reveal className="section-heading perspectives-heading">
          <GradientHeading lead="Who is" emphasis="involved?" />
          <p>OpenDQM needs different views of making, checking, standards, tools, and use.</p>
        </Reveal>
        <div className="perspective-rail">
          <div className="perspective-rail-line" aria-hidden="true">
            <span style={{ height: `${((active + 1) / perspectives.length) * 100}%` }} />
          </div>
          <div className="perspective-grid">
            {perspectives.map((item, index) => (
              <Reveal className={`perspective-item ${active === index ? "active" : ""}`} key={item}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{item}</strong>
                <i aria-hidden="true">&#8594;</i>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
