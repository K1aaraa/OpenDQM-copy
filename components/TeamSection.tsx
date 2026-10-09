"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { team } from "@/data/team";
import { assetPath } from "@/lib/assets";

function TeamCard({ person }: { person: (typeof team)[number] }) {
  const [flipped, setFlipped] = useState(false);
  const interacted = useRef(false);
  const frontButton = useRef<HTMLButtonElement>(null);
  const backButton = useRef<HTMLButtonElement>(null);
  const changeFace = (value: boolean) => {
    interacted.current = true;
    setFlipped(value);
  };
  useEffect(() => {
    if (interacted.current)
      (flipped ? backButton : frontButton).current?.focus({ preventScroll: true });
  }, [flipped]);
  const name = (
    <h3>
      <a
        className="team-name-link"
        href={person.linkedin}
        target="_blank"
        rel="noopener noreferrer"
      >
        {person.name} <span aria-hidden="true">↗</span>
        <span className="sr-only"> — LinkedIn, opens in a new tab</span>
      </a>
    </h3>
  );
  return (
    <article className={`team-card team-flip-card ${flipped ? "is-flipped" : ""}`}>
      <div className="team-card-inner">
        <div className="team-face team-front" aria-hidden={flipped} inert={flipped}>
          <button
            className="team-photo-button"
            type="button"
            ref={frontButton}
            aria-label={`Read bio for ${person.name}`}
            aria-expanded={flipped}
            aria-controls={`bio-${person.id}`}
            onClick={() => changeFace(true)}
          >
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
            <span className="team-photo-hint" aria-hidden="true">
              Read bio ↻
            </span>
          </button>
          <div className="team-card-content">
            {name}
            <p className="team-role">{person.role}</p>
            <button
              type="button"
              className="team-read-hint"
              aria-expanded={flipped}
              aria-controls={`bio-${person.id}`}
              onClick={() => changeFace(true)}
            >
              Click to read bio <span aria-hidden="true">↻</span>
              <span className="sr-only"> for {person.name}</span>
            </button>
          </div>
        </div>
        <div className="team-face team-back" aria-hidden={!flipped} inert={!flipped}>
          {name}
          <p className="team-role">{person.role}</p>
          <div
            id={`bio-${person.id}`}
            className="team-bio team-bio-scroll"
            role="region"
            aria-label={`Full biography of ${person.name}`}
            tabIndex={flipped ? 0 : -1}
          >
            {person.bio}
          </div>
          <button
            className="bio-toggle"
            type="button"
            ref={backButton}
            aria-expanded={flipped}
            aria-controls={`bio-${person.id}`}
            onClick={() => changeFace(false)}
          >
            Back to photo <span aria-hidden="true">↶</span>
            <span className="sr-only"> for {person.name}</span>
          </button>
        </div>
      </div>
    </article>
  );
}

export function TeamSection() {
  return (
    <section className="section team-section" aria-labelledby="team-title">
      <div className="container">
        <h2 id="team-title">Team</h2>
        <div className="team-grid">
          {team.map((person) => (
            <TeamCard key={person.id} person={person} />
          ))}
        </div>
      </div>
    </section>
  );
}
