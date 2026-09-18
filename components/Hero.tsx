"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { surveyUrl } from "@/data/resources";
import { GradientHeading } from "@/components/GradientHeading";

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
    let currentX = 50,
      currentY = 50,
      targetX = 50,
      targetY = 50,
      frame = 0;
    const animate = () => {
      currentX += (targetX - currentX) * 0.09;
      currentY += (targetY - currentY) * 0.09;
      hero.style.setProperty("--pointer-x", `${currentX}%`);
      hero.style.setProperty("--pointer-y", `${currentY}%`);
      frame = requestAnimationFrame(animate);
    };
    const move = (event: PointerEvent) => {
      const bounds = hero.getBoundingClientRect();
      targetX = ((event.clientX - bounds.left) / bounds.width) * 100;
      targetY = ((event.clientY - bounds.top) / bounds.height) * 100;
      hero.dataset.pointer = "active";
    };
    const leave = () => {
      targetX = 50;
      targetY = 50;
      hero.dataset.pointer = "idle";
    };
    hero.addEventListener("pointermove", move);
    hero.addEventListener("pointerleave", leave);
    frame = requestAnimationFrame(animate);
    return () => {
      hero.removeEventListener("pointermove", move);
      hero.removeEventListener("pointerleave", leave);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section className="hero" id="top" ref={heroRef} data-pointer="idle">
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
          <GradientHeading
            as="h1"
            lead="Making is becoming more distributed."
            emphasis="How do we make quality visible?"
          />
          <p className="hero-copy">
            Products can be designed, made, tested, and used by different people in different
            places. OpenDQM brings people together to explore shared approaches to quality across
            them.
          </p>
          <div className="hero-actions">
            <a className="button hero-button-primary" href={surveyUrl}>
              Share your perspective <span aria-hidden="true">&#8594;</span>
            </a>
            <Link className="button hero-button-secondary" href="/about">
              Explore OpenDQM <span aria-hidden="true">&#8594;</span>
            </Link>
          </div>
        </div>
      </div>
      <div className="hero-process" aria-label="Design, make, check, use, improve">
        <span>Design</span>
        <i aria-hidden="true">&#8594;</i>
        <span>Make</span>
        <i aria-hidden="true">&#8594;</i>
        <span>Check</span>
        <i aria-hidden="true">&#8594;</i>
        <span>Use</span>
        <i aria-hidden="true">&#8594;</i>
        <span>Improve</span>
      </div>
    </section>
  );
}
