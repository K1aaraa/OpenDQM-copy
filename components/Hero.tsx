"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { surveyUrl } from "@/data/resources";
import { BrandIcon } from "@/components/BrandIcon";

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
          <div className="hero-message">
            <h1 className="hero-title">
              Help shape the future of quality management for digital, democratized and distributed
              manufacturing
            </h1>
          </div>
          <div className="hero-actions">
            <Link className="button hero-button-primary" href="/contact#schedule-interview">
              Schedule an Interview <BrandIcon kind="arrow" />
            </Link>
            <a className="button hero-button-secondary" href={surveyUrl}>
              Take the Survey <BrandIcon kind="arrow" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
