import type { Event } from "@/data/events";

function dateStringInTimeZone(date: Date, timeZone: string) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).formatToParts(date);
  const values = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  return `${values.year}-${values.month}-${values.day}`;
}

export function isPastEvent(event: Event, today = new Date()) {
  return event.endDate < dateStringInTimeZone(today, event.timeZone);
}
