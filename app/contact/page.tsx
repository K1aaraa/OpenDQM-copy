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
            <span className="card-kicker">Contact</span>
            <h2>Contact information coming soon.</h2>
            <p>
              OpenDQM is formalizing contact details, community calls, and workshop logistics. More
              ways to connect will be shared here as they become available.
            </p>
          </article>
        </div>
      </section>
    </>
  );
}
