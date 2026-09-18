"use client";

import Image from "next/image";
import { useState } from "react";
import { projects } from "@/data/projects";

export function AboutEcosystem() {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <div className="about-project-track" aria-label="Affiliated organizations and projects">
      {projects.map((project, index) => {
        const isExpanded = expanded === index;
        return (
          <button
            className={`about-project-card ${isExpanded ? "expanded" : ""}`}
            type="button"
            aria-expanded={isExpanded}
            onClick={() => setExpanded(isExpanded ? null : index)}
            key={project.title}
          >
            <span className="about-project-number">0{index + 1}</span>
            <span className="about-project-card-logo">
              <Image src={project.image} alt={project.alt} width={170} height={84} />
            </span>
            <span className="about-project-card-name">{project.title}</span>
            <span className="about-project-details">
              <span className="card-kicker">{project.category}</span>
              <span>{project.description}</span>
            </span>
            <span className="about-project-prompt" aria-hidden="true">
              {isExpanded ? "Close" : "View details"}
            </span>
          </button>
        );
      })}
    </div>
  );
}
