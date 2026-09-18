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
        eyebrow="Events"
        title="Come explore these questions with us."
        description="OpenDQM workshops bring together people with different experiences of making, testing, quality, standards, and distributed production."
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
