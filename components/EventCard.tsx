import type { Event } from "@/data/events";
import { formatDateRange } from "@/lib/formatDate";

type EventCardProps = {
  event: Event;
  compact?: boolean;
  past?: boolean;
};

export function EventCard({ event, compact = false, past = false }: EventCardProps) {
  return (
    <article className={`info-card event-card ${compact ? "event-card-compact" : ""}`}>
      <span className="card-kicker">{event.title}</span>
      <h3>{formatDateRange(event.startDate, event.endDate)}</h3>
      <p className="event-location">{event.location}</p>
      {!compact && <p>{event.description}</p>}
      {!compact && <p className="event-venue">{event.venue}</p>}
      <span className="event-status">{past ? "Recap coming soon" : "Details coming soon"}</span>
    </article>
  );
}
