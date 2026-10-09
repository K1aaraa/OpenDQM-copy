import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { InterviewForm } from "@/components/InterviewForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact OpenDQM and learn how to participate in the distributed quality management ecosystem.",
  alternates: { canonical: "/contact" }
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Get involved"
        title="Help shape distributed quality management"
        description="Whether you'd like to ask a question or participate in the research, we'd like to hear from you."
      />
      <section className="section connect-section" aria-label="Ways to get involved">
        <div className="container connect-options">
          <article className="connect-option">
            <p className="section-kicker">Have a question?</p>
            <h2>Contact the OpenDQM team</h2>
            <a className="contact-email" href="mailto:info@opendqm.org">
              <svg
                width="20"
                height="20"
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
          </article>
          <article className="connect-option connect-option-research">
            <p className="section-kicker">Participate in research</p>
            <h2>Schedule an Interview</h2>
            <p>Share your experience and help inform the research.</p>
            <a className="button button-primary" href="#schedule-interview">
              Start below <span aria-hidden="true">↓</span>
            </a>
          </article>
        </div>
      </section>
      <InterviewForm />
    </>
  );
}
