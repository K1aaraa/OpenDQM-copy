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
        eyebrow="Contact"
        title="Help shape distributed quality management"
        description="OpenDQM is developing shared infrastructure and community practices for an open, trusted, interoperable quality ecosystem."
      />
      <section className="section">
        <div className="container contact-panel">
          <article className="info-card">
            <h2>Contact the OpenDQM team</h2>
            <a className="contact-email" href="mailto:info@opendqm.org">
              info@opendqm.org
            </a>
          </article>
        </div>
      </section>
      <InterviewForm />
    </>
  );
}
