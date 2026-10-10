"use client";

import { useEffect, useState } from "react";
import { InterviewForm } from "@/components/InterviewForm";
import { BrandIcon } from "@/components/BrandIcon";

export function ContactChoices() {
  const [expanded, setExpanded] = useState(false);
  useEffect(() => {
    const openFromHash = () => {
      if (window.location.hash === "#schedule-interview") setExpanded(true);
    };
    openFromHash();
    window.addEventListener("hashchange", openFromHash);
    return () => window.removeEventListener("hashchange", openFromHash);
  }, []);
  useEffect(() => {
    if (expanded) {
      // Let the expanded layout and the router's fragment handling settle first.
      const timer = window.setTimeout(
        () => document.getElementById("schedule-interview")?.scrollIntoView(),
        100
      );
      return () => window.clearTimeout(timer);
    }
  }, [expanded]);
  return (
    <div className="contact-flow">
      <section className="section contact-choices" aria-labelledby="connect-title">
        <div className="container">
          <h2 id="connect-title">Connect with the team</h2>
          <p className="connect-intro">Choose how you’d like to get involved.</p>
          <div className="contact-paths">
            <article className="contact-path">
              <span className="contact-path-icon">
                <BrandIcon kind="mail" />
              </span>
              <h3>Email the team</h3>
              <p>Ask a question or start a conversation.</p>
              <a className="contact-email" href="mailto:info@opendqm.org">
                info@opendqm.org
              </a>
              <a className="button button-secondary" href="mailto:info@opendqm.org">
                Send an email <BrandIcon kind="arrow" />
              </a>
            </article>
            <article className="contact-path">
              <span className="contact-path-icon">
                <BrandIcon kind="calendar" />
              </span>
              <h3>Schedule an Interview</h3>
              <p>Share your experience and help inform the research.</p>
              <button
                className="button button-primary"
                type="button"
                aria-expanded={expanded}
                aria-controls="interview-questions"
                onClick={() => setExpanded(!expanded)}
              >
                {expanded ? "Hide interview form" : "Schedule an Interview"}{" "}
                <BrandIcon kind="arrow" />
              </button>
            </article>
          </div>
        </div>
      </section>
      <div id="interview-questions" hidden={!expanded}>
        <InterviewForm />
      </div>
    </div>
  );
}
