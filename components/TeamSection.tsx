"use client";

import Image from "next/image";
import { useState } from "react";
import { team } from "@/data/team";
import { assetPath } from "@/lib/assets";

export function TeamSection() {
  const [expanded, setExpanded] = useState<string[]>([]);
  return (
    <section className="section team-section" aria-labelledby="team-title">
      <div className="container">
        <h2 id="team-title">Team</h2>
        <div className="team-grid">
          {team.map((person) => {
            const open = expanded.includes(person.id);
            return (
              <article className="team-card" key={person.id}>
                <Image
                  className="team-photo"
                  src={assetPath(person.image)}
                  width={600}
                  height={600}
                  alt={
                    person.id === "victoria-jaqua"
                      ? "Branded initials placeholder for Victoria F. Jaqua"
                      : person.name
                  }
                />
                <div className="team-card-content">
                  <h3>{person.name}</h3>
                  <p className="team-role">{person.role}</p>
                  <a className="team-link" href={person.linkedin}>
                    LinkedIn<span className="sr-only"> profile for {person.name}</span> ↗
                  </a>
                  <button
                    type="button"
                    className="bio-toggle"
                    aria-expanded={open}
                    aria-controls={`bio-${person.id}`}
                    onClick={() =>
                      setExpanded((current) =>
                        open ? current.filter((id) => id !== person.id) : [...current, person.id]
                      )
                    }
                  >
                    {open ? "Close bio −" : "Read bio +"}
                    <span className="sr-only"> for {person.name}</span>
                  </button>
                  <div id={`bio-${person.id}`} className="team-bio" hidden={!open}>
                    {person.bio}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
