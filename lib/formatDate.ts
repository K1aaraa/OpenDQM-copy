const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC"
});

export function formatDateRange(startDate: string, endDate: string): string {
  const start = dateFormatter.format(new Date(startDate));
  const end = dateFormatter.format(new Date(endDate));

  if (startDate === endDate) {
    return start;
  }

  return `${start} - ${end}`;
}
