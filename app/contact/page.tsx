import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";

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
        eyebrow="Contact"
        title="Help shape distributed quality management."
        description="OpenDQM is developing shared infrastructure and community practices for an open, trusted, interoperable quality ecosystem."
      />
      <section className="section">
        <div className="container contact-panel">
          <article className="info-card">
            <span className="card-kicker">Participation</span>
            <h2>Start with the OpenDQM survey.</h2>
            <p>
              The survey is the current public intake path while the project formalizes contact
              details, community calls, and workshop logistics.
            </p>
            <a
              className="button button-primary"
              href="https://docs.google.com/forms/d/e/1FAIpQLSdwxEZT6vPbFw7K9m1mXFwH4mAHAooeS-6rnsAkMlPOzjc5LQ/viewform?usp=publish-editor"
            >
              Open survey
            </a>
          </article>
        </div>
      </section>
    </>
  );
}
