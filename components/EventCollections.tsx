"use client";

import { useEffect, useState } from "react";
import { EventCard } from "@/components/EventCard";
import { events } from "@/data/events";
import { isPastEvent } from "@/lib/events";
import Link from "next/link";
import { webinars } from "@/data/webinars";

export function EventCollections() {
  const [today, setToday] = useState<Date | null>(null);
  useEffect(() => setToday(new Date()), []);

  const upcoming = today ? events.filter((event) => !isPastEvent(event, today)) : events;
  const past = today ? events.filter((event) => isPastEvent(event, today)) : [];

  return (
    <div className="event-collections">
      <section aria-labelledby="upcoming-events">
        <div className="collection-heading">
          <h2 id="upcoming-events">Upcoming Events</h2>
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
          <h2 id="past-events">Past events</h2>
        </div>
        <div className="event-page-grid">
          {webinars.map((webinar) => (
            <article className="info-card event-card webinar-card" key={webinar.slug}>
              <time className="event-date" dateTime={webinar.dateTime}>
                {webinar.date}
              </time>
              <h3>{webinar.title}</h3>
              <p className="event-location">Online webinar</p>
              <p>
                A community gathering to share ideas and tools for distributed quality management.
              </p>
              <Link className="webinar-link" href={`/events/${webinar.slug}`}>
                View webinar details →
              </Link>
            </article>
          ))}
          {past.map((event) => (
            <div id={event.id} key={event.id}>
              <EventCard event={event} past />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
