export type Event = {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  location: string;
  venue: string;
  description: string;
  timeZone: string;
};

export const events: Event[] = [
  {
    id: "workshop-1",
    title: "Workshop #1",
    startDate: "2026-11-09",
    endDate: "2026-11-11",
    location: "Michigan",
    venue: "Venue to be announced",
    description:
      "Our first in-person ecosystem scoping workshop is planned to take place in Michigan.",
    timeZone: "America/Detroit"
  },
  {
    id: "workshop-2",
    title: "Workshop #2",
    startDate: "2026-11-12",
    endDate: "2026-11-14",
    location: "Tucson, AZ",
    venue: "Venue to be announced",
    description:
      "Our second in-person ecosystem scoping workshop is planned to take place in Tucson, Arizona.",
    timeZone: "America/Phoenix"
  },
  {
    id: "workshop-3",
    title: "Workshop #3",
    startDate: "2026-11-30",
    endDate: "2026-12-01",
    location: "Alexandria, VA",
    venue: "Buildmo makerspace, 5380 Eisenhower Ave, Suite C, Alexandria, VA 22304",
    description:
      "Our third in-person ecosystem scoping workshop is planned for Alexandria, Virginia.",
    timeZone: "America/New_York"
  },
  {
    id: "workshop-4",
    title: "Workshop #4",
    startDate: "2026-12-02",
    endDate: "2026-12-04",
    location: "Austin, TX",
    venue: "Austin Public Library, 710 W Cesar Chavez St, Austin, TX 78701",
    description: "Our fourth in-person ecosystem scoping workshop is planned for Austin, Texas.",
    timeZone: "America/Chicago"
  }
];
