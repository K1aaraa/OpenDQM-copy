"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { surveyUrl } from "@/data/resources";

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    if (
      !hero ||
      !matchMedia("(pointer: fine)").matches ||
      matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    let lastRipple = 0;
    const move = (event: PointerEvent) => {
      const now = performance.now();
      if (now - lastRipple < 180) return;
      lastRipple = now;
      const bounds = hero.getBoundingClientRect();
      const ripple = document.createElement("span");
      ripple.className = "hero-ripple";
      ripple.style.left = `${event.clientX - bounds.left}px`;
      ripple.style.top = `${event.clientY - bounds.top}px`;
      ripple.addEventListener("animationend", () => ripple.remove(), { once: true });
      hero.querySelector(".hero-waves")?.appendChild(ripple);
    };
    hero.addEventListener("pointermove", move);
    return () => {
      hero.removeEventListener("pointermove", move);
    };
  }, []);

  return (
    <section className="hero" id="top" ref={heroRef}>
      <div className="hero-waves" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
      </div>
      <div className="container hero-grid">
        <div className="hero-content">
          <h1>Making is becoming more distributed.</h1>
          <p className="hero-copy">
            Products can be designed, made, tested, and used by different people in different
            places.
          </p>
          <p className="hero-copy">
            Quality management has not yet adapted to the new digital, democratized, distributed
            reality. OpenDQM is building the shared foundation it needs.
          </p>
          <div className="hero-actions">
            <a className="button hero-button-primary" href={surveyUrl}>
              Take the OpenDQM Survey <span aria-hidden="true">&#8594;</span>
            </a>
            <Link className="button hero-button-secondary" href="/about">
              About us <span aria-hidden="true">&#8594;</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
