import type { Metadata } from "next";
import { EventCollections } from "@/components/EventCollections";
import { PageHeader } from "@/components/PageHeader";
import { SurveyCta } from "@/components/SurveyCta";

export const metadata: Metadata = {
  title: "Events",
  description: "Attend OpenDQM ecosystem scoping workshops and community events.",
  alternates: { canonical: "/events" }
};

export default function EventsPage() {
  return (
    <>
      <PageHeader
        // eyebrow="Events"
        title="Support OpenDQM Research."
        description="OpenDQM workshops connect experts in quality assurance, manufacturing, hardware, testing, standards, and distributed production."
      />
      <section className="section">
        <div className="container">
          <EventCollections />
        </div>
      </section>
      <SurveyCta compact />
    </>
  );
}
