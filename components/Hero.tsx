"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import Image from "next/image";
import { assetPath } from "@/lib/assets";
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
          <div className="hero-logo">
            <Image
              src={assetPath("/images/Light Logo.png")}
              alt="OpenDQM"
              width={1400}
              height={670}
              priority
            />
          </div>
          <div className="hero-message">
            <h1 className="hero-title">Distributed Quality Management</h1>
            <p className="hero-copy">
              OpenDQM is researching a new ecosystem that supports democratized quality control,
              distributed quality assurance, and trusted verification across diverse stakeholders.
            </p>
          </div>
          <div className="hero-actions">
            <Link className="button hero-button-primary" href="/contact#schedule-interview">
              Schedule an Interview <BrandIcon kind="arrow" />
            </Link>
            <Link className="button hero-button-secondary" href="/about">
              About us <BrandIcon kind="arrow" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
