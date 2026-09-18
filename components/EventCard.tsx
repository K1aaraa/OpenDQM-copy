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
      <span className="event-date">{formatDateRange(event.startDate, event.endDate)}</span>
      <h3>{event.title}</h3>
      <p className="event-location">{event.location}</p>
      {!compact && <p>{event.description}</p>}
      {!compact && event.venue ? <p className="event-venue">{event.venue}</p> : null}
      <span className="event-status">
        {past ? "Invitation-only workshop" : "Private event - invitation required"}
      </span>
    </article>
  );
}
