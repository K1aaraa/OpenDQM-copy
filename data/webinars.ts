import { webinarPresenters } from "./webinar-presenters";

export const webinars = [
  {
    slug: "show-and-tell-december-3-2025",
    title: "Toward Distributed Quality Management - Show & Tell",
    date: "December 3, 2025",
    dateTime: "2025-12-03",
    sessionTime: "2pm GMT",
    localTime: "8:00 - 9:30 AM CST",
    presenters: webinarPresenters[0],
    href: "https://events.teams.microsoft.com/event/4d70ed29-9ea0-43c0-bf36-8146a468dc19@1a600530-6b2e-4bef-b68c-12de09e852a4"
  },
  {
    slug: "show-and-tell-december-4-2025",
    title: "Toward Distributed Quality Management - Show & Tell",
    date: "December 4, 2025",
    dateTime: "2025-12-04",
    sessionTime: "11am PST",
    localTime: "1:00 - 2:30 PM CST",
    presenters: webinarPresenters[1],
    href: "https://events.teams.microsoft.com/event/06a0a560-2cbb-4218-84e7-cb3908726db7@1a600530-6b2e-4bef-b68c-12de09e852a4"
  }
] as const;
