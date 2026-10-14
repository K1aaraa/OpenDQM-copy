"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Wordmark } from "@/components/Wordmark";
import { navigation } from "@/data/navigation";
import { resources } from "@/data/resources";

export function Header() {
  const pathname = usePathname().replace(/\/$/, "");
  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);
  const [isOpen, setIsOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const previousScroll = useRef(0);
  const menuRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

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
    if (!isOpen) return;
    document.body.classList.add("menu-open");
    const menu = menuRef.current;
    const toggle = toggleRef.current;
    const focusable = () =>
      Array.from(menu?.querySelectorAll<HTMLElement>("a[href], button:not([disabled])") ?? []);
    const frame = requestAnimationFrame(() => focusable()[0]?.focus());
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setIsOpen(false);
      }
      if (event.key === "Tab") {
        const items = focusable();
        const first = items[0];
        const last = items[items.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }
    };
    const background = document.querySelectorAll<HTMLElement>("main, footer");
    background.forEach((element) => {
      element.inert = true;
    });
    const desktop = matchMedia("(min-width: 761px)");
    const closeOnDesktop = () => {
      if (desktop.matches) setIsOpen(false);
    };
    desktop.addEventListener("change", closeOnDesktop);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      cancelAnimationFrame(frame);
      document.body.classList.remove("menu-open");
      background.forEach((element) => {
        element.inert = false;
      });
      desktop.removeEventListener("change", closeOnDesktop);
      document.removeEventListener("keydown", onKeyDown);
      toggle?.focus({ preventScroll: true });
    };
  }, [isOpen]);

  return (
    <header
      className={`site-header ${isHidden ? "header-hidden" : ""} ${isScrolled ? "header-scrolled" : ""}`}
    >
      <nav className="nav" aria-label="Primary navigation">
        <Wordmark />
        <div className="desktop-navigation">
          <ul className="nav-links">
            {navigation.map((item) => (
              <li
                className={`${item.href === "/resources" ? "nav-has-popup" : ""} ${item.comingSoon ? "nav-soon" : ""}`.trim()}
                key={item.href}
              >
                {item.comingSoon ? (
                  <button type="button" disabled aria-disabled="true">
                    {item.label}
                  </button>
                ) : (
                  <Link
                    className={isActive(item.href) ? "active" : ""}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    href={item.href}
                  >
                    {item.label}
                  </Link>
                )}
                {item.comingSoon && <span role="tooltip">Coming soon</span>}
                {item.href === "/resources" && (
                  <div className="nav-popup">
                    <a href={resources.participate.href}>
                      <strong>OpenDQM Survey</strong>
                      <small>Help shape the ecosystem</small>
                    </a>
                    <div className="nav-popup-soon">
                      <strong>Community materials</strong>
                      <small>Coming soon</small>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
        <button
          ref={toggleRef}
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
        ref={menuRef}
        role={isOpen ? "dialog" : undefined}
        aria-modal={isOpen ? true : undefined}
        aria-label="Site navigation"
        className={`mobile-menu ${isOpen ? "open" : ""}`}
        id="mobile-menu"
        aria-hidden={!isOpen}
        inert={!isOpen}
      >
        <div className="mobile-menu-head">
          <span>Explore OpenDQM</span>
          <button type="button" onClick={() => setIsOpen(false)} aria-label="Close navigation">
            <span aria-hidden="true">&#215;</span>
          </button>
        </div>
        <div className="mobile-menu-links">
          {navigation.map((item) => (
            <div className="mobile-nav-group" key={item.href}>
              {item.comingSoon ? (
                <div className="mobile-nav-disabled" aria-disabled="true">
                  <div>
                    {item.label}
                    <small>Coming soon</small>
                  </div>
                </div>
              ) : (
                <Link
                  className={isActive(item.href) ? "active" : ""}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  href={item.href}
                >
                  {item.label}
                </Link>
              )}
              {item.href === "/resources" && (
                <div className="mobile-subnav">
                  <a href={resources.participate.href}>OpenDQM Survey</a>
                  <span className="mobile-subnav-soon">Community materials - Coming soon</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </aside>
    </header>
  );
}
