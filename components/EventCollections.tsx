"use client";

import { useEffect, useState } from "react";
import { EventCard } from "@/components/EventCard";
import { events } from "@/data/events";
import { isPastEvent } from "@/lib/events";

export function EventCollections() {
  const [today, setToday] = useState<Date | null>(null);
  useEffect(() => setToday(new Date()), []);

  const upcoming = today ? events.filter((event) => !isPastEvent(event, today)) : events;
  const past = today ? events.filter((event) => isPastEvent(event, today)) : [];

  return (
    <div className="event-collections">
      <section aria-labelledby="upcoming-events">
        <div className="collection-heading">
          <span>01</span>
          <h2 id="upcoming-events">Upcoming events</h2>
        </div>
        <div className="event-page-grid">
          {upcoming.map((event) => (
            <div id={event.id} key={event.id}>
              <EventCard event={event} />
            </div>
          ))}
          {upcoming.length === 0 && (
            <p className="empty-state">New workshop dates will be announced soon.</p>
          )}
        </div>
      </section>
      <section aria-labelledby="past-events">
        <div className="collection-heading">
          <span>02</span>
          <h2 id="past-events">Past events</h2>
        </div>
        <div className="event-page-grid">
          {past.map((event) => (
            <div id={event.id} key={event.id}>
              <EventCard event={event} past />
            </div>
          ))}
          {past.length === 0 && (
            <p className="empty-state">Past workshop details will appear here.</p>
          )}
        </div>
      </section>
    </div>
  );
}
