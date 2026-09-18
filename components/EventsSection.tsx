"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { EventCard } from "@/components/EventCard";
import { Reveal } from "@/components/Reveal";
import { TypedHeading } from "@/components/TypedHeading";
import { events } from "@/data/events";
import { isPastEvent } from "@/lib/events";

export function EventsSection() {
  const [today, setToday] = useState<Date | null>(null);

  useEffect(() => setToday(new Date()), []);

  const upcoming = today ? events.filter((event) => !isPastEvent(event, today)) : events;

  return (
    <section className="section events-section" id="events">
      <div className="container">
        <Reveal className="events-heading">
          <div>
            <p className="eyebrow">Events</p>
            <TypedHeading>
              Join an upcoming <strong>workshop.</strong>
            </TypedHeading>
            <p className="section-intro">
              OpenDQM workshops bring together people working across quality, manufacturing,
              hardware, and assurance.
            </p>
          </div>
        </Reveal>
        <Reveal className="event-list event-list-home">
          {upcoming.slice(0, 3).map((event) => (
            <EventCard key={event.id} event={event} compact />
          ))}
          {upcoming.length === 0 && (
            <p className="empty-state">New workshop dates will be announced soon.</p>
          )}
        </Reveal>
        <div className="events-action">
          <Link className="button button-secondary" href="/events">
            View all events <span aria-hidden="true">&#8594;</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
