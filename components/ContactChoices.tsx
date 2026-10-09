"use client";

import { useEffect, useRef } from "react";
import { InterviewForm } from "@/components/InterviewForm";

export function ContactChoices() {
  const interview = useRef<HTMLDetailsElement>(null);
  useEffect(() => {
    const openInterview = () => {
      if (window.location.hash === "#schedule-interview" && interview.current) {
        interview.current.open = true;
        requestAnimationFrame(() =>
          document.getElementById("schedule-interview")?.scrollIntoView()
        );
      }
    };
    openInterview();
    window.addEventListener("hashchange", openInterview);
    return () => window.removeEventListener("hashchange", openInterview);
  }, []);

  return (
    <section className="section contact-choices" aria-labelledby="connect-title">
      <div className="container">
        <h2 id="connect-title">Connect with the team</h2>
        <p className="connect-intro">Choose how you’d like to get involved.</p>
        <details className="contact-choice">
          <summary>
            <span>
              <strong>Email the team</strong>
              <span>Ask a question or start a conversation.</span>
            </span>
            <span className="choice-plus" aria-hidden="true">
              +
            </span>
          </summary>
          <div className="email-choice-content">
            <a className="contact-email" href="mailto:info@opendqm.org">
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                aria-hidden="true"
              >
                <rect x="3" y="5" width="18" height="14" rx="3" />
                <path d="m3 6 9 7 9-7" />
              </svg>
              info@opendqm.org
            </a>
            <a className="button button-secondary" href="mailto:info@opendqm.org">
              Send an email <span aria-hidden="true">→</span>
            </a>
          </div>
        </details>
        <details className="contact-choice" ref={interview}>
          <summary>
            <span>
              <strong>Schedule an Interview</strong>
              <span>Share your experience and help inform the research.</span>
            </span>
            <span className="choice-plus" aria-hidden="true">
              +
            </span>
          </summary>
          <InterviewForm />
        </details>
      </div>
    </section>
  );
}
