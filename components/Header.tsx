"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Logo } from "@/components/Logo";
import { navigation } from "@/data/navigation";
import { resources } from "@/data/resources";

export function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const previousScroll = useRef(0);

  useEffect(() => setIsOpen(false), [pathname]);

  useEffect(() => {
    const onScroll = () => {
      const currentScroll = window.scrollY;
      setIsScrolled(currentScroll > 40);
      setIsHidden(currentScroll > previousScroll.current && currentScroll > 120 && !isOpen);
      previousScroll.current = currentScroll;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isOpen]);

  useEffect(() => {
    document.body.classList.toggle("menu-open", isOpen);
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.classList.remove("menu-open");
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [isOpen]);

  return (
    <header
      className={`site-header ${isHidden ? "header-hidden" : ""} ${isScrolled ? "header-scrolled" : ""}`}
    >
      <nav className="nav" aria-label="Primary navigation">
        <Logo />
        <div className="desktop-navigation">
          <ul className="nav-links">
            {navigation.map((item) => (
              <li
                className={item.href === "/resources" ? "nav-has-popup" : undefined}
                key={item.href}
              >
                <Link className={pathname === item.href ? "active" : ""} href={item.href}>
                  {item.label}
                  {item.href === "/resources" && <span aria-hidden="true">&#8964;</span>}
                </Link>
                {item.href === "/resources" && (
                  <div className="nav-popup">
                    <a href={resources.participate.href}>
                      <span>Participate</span>
                      <strong>OpenDQM Survey</strong>
                      <small>Help shape the ecosystem</small>
                    </a>
                    <Link href="/resources">
                      <span>Resources</span>
                      <strong>Community materials</strong>
                      <small>Explore available resources</small>
                    </Link>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
        <button
          className="menu-toggle"
          type="button"
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          aria-label={isOpen ? "Close navigation" : "Open navigation"}
          onClick={() => setIsOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      <button
        className={`menu-backdrop ${isOpen ? "open" : ""}`}
        type="button"
        aria-label="Close navigation"
        tabIndex={isOpen ? 0 : -1}
        onClick={() => setIsOpen(false)}
      />
      <aside
        className={`mobile-menu ${isOpen ? "open" : ""}`}
        id="mobile-menu"
        aria-hidden={!isOpen}
      >
        <div className="mobile-menu-head">
          <span>Explore OpenDQM</span>
          <button type="button" onClick={() => setIsOpen(false)} aria-label="Close navigation">
            <span aria-hidden="true">&#215;</span>
          </button>
        </div>
        <div className="mobile-menu-links">
          {navigation.map((item, index) => (
            <div className="mobile-nav-group" key={item.href}>
              <Link className={pathname === item.href ? "active" : ""} href={item.href}>
                <span>0{index + 1}</span>
                {item.label}
              </Link>
              {item.href === "/resources" && (
                <div className="mobile-subnav">
                  <a href={resources.participate.href}>OpenDQM Survey</a>
                  <Link href="/resources">All resources</Link>
                </div>
              )}
            </div>
          ))}
        </div>
      </aside>
    </header>
  );
}
