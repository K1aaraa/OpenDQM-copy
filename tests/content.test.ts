import { describe, expect, it } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { EventCard } from "@/components/EventCard";
import { events } from "@/data/events";
import { projects } from "@/data/projects";
import { resources } from "@/data/resources";
import { formatDateRange } from "@/lib/formatDate";
import { isPastEvent } from "@/lib/events";

describe("site content", () => {
  it("keeps affiliated projects data complete", () => {
    expect(projects).toHaveLength(4);
    expect(projects.every((project) => project.title && project.image && project.description)).toBe(
      true
    );
  });

  it("keeps events in chronological order", () => {
    const dates = events.map((event) => event.startDate);
    expect(dates).toEqual([...dates].sort());
  });

  it("publishes downloadable resources", () => {
    expect(resources.documents.some((resource) => resource.href.endsWith(".pdf"))).toBe(true);
    expect(resources.participate.title).toBe("OpenDQM Survey");
  });

  it("formats event date ranges", () => {
    expect(formatDateRange("2026-11-09", "2026-11-11")).toBe("Nov 9, 2026 - Nov 11, 2026");
  });

  it("keeps events upcoming through the final day in their own timezone", () => {
    const workshop = events[0];
    expect(isPastEvent(workshop, new Date("2026-11-08T12:00:00Z"))).toBe(false);
    expect(isPastEvent(workshop, new Date("2026-11-09T17:00:00Z"))).toBe(false);
    expect(isPastEvent(workshop, new Date("2026-11-12T04:59:59Z"))).toBe(false);
    expect(isPastEvent(workshop, new Date("2026-11-12T05:00:00Z"))).toBe(true);
  });

  it("renders unavailable event details as status text rather than a link", () => {
    const markup = renderToStaticMarkup(
      createElement(EventCard, { event: events[0], compact: true })
    );
    expect(markup).toContain("Details coming soon");
    expect(markup).not.toMatch(/<a(?:\s|>)/);
  });
});
