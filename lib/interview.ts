export type InterviewSlot = { date: string; start: string; end: string };
export type InterviewRequest = {
  first_name: string;
  last_name: string;
  professional_background: string;
  linkedin: string;
  email: string;
  preferred_interview_slots: InterviewSlot[];
  timezone: string;
  interest_reason: string;
  consent: boolean;
  website: string;
};

export function validateInterview(value: unknown, now = new Date()): string[] {
  if (!value || typeof value !== "object") return ["Please complete the interview form."];
  const data = value as Partial<InterviewRequest>;
  const errors: string[] = [];
  for (const [key, label, max] of [
    ["first_name", "First name", 100],
    ["last_name", "Last name", 100],
    ["professional_background", "Professional background", 2000],
    ["interest_reason", "Reason for interest", 4000]
  ] as const) {
    const text = data[key];
    if (typeof text !== "string" || !text.trim() || text.length > max)
      errors.push(`${label} is required (maximum ${max} characters).`);
  }
  if (
    typeof data.email !== "string" ||
    data.email.length > 254 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)
  )
    errors.push("Enter a valid email address.");
  if (typeof data.linkedin !== "string" || data.linkedin.length > 500)
    errors.push("Enter a valid LinkedIn URL or leave it blank.");
  else if (data.linkedin) {
    try {
      const url = new URL(data.linkedin);
      if (
        url.protocol !== "https:" ||
        !["linkedin.com", "www.linkedin.com"].includes(url.hostname) ||
        url.username ||
        url.password
      )
        throw new Error();
    } catch {
      errors.push("Use an https://linkedin.com profile URL.");
    }
  }
  let timezoneValid = false;
  try {
    if (typeof data.timezone !== "string" || !data.timezone || data.timezone.length > 100)
      throw new Error();
    new Intl.DateTimeFormat("en", { timeZone: data.timezone }).format(now);
    timezoneValid = true;
  } catch {
    errors.push("Enter a valid time zone, such as America/Chicago.");
  }
  const slots = data.preferred_interview_slots;
  if (!Array.isArray(slots) || slots.length < 1 || slots.length > 3)
    errors.push("Choose one to three preferred interview windows.");
  else {
    const dateParts = new Intl.DateTimeFormat("en-CA", {
      timeZone: timezoneValid ? data.timezone : "UTC",
      year: "numeric",
      month: "2-digit",
      day: "2-digit"
    }).formatToParts(now);
    const get = (type: string) => dateParts.find((part) => part.type === type)?.value;
    const today = `${get("year")}-${get("month")}-${get("day")}`;
    for (const slot of slots) {
      if (
        !slot ||
        typeof slot.date !== "string" ||
        !/^\d{4}-\d{2}-\d{2}$/.test(slot.date) ||
        !Number.isFinite(Date.parse(slot.date)) ||
        new Date(slot.date).toISOString().slice(0, 10) !== slot.date ||
        slot.date < today ||
        !/^([01]\d|2[0-3]):[0-5]\d$/.test(slot.start) ||
        !/^([01]\d|2[0-3]):[0-5]\d$/.test(slot.end) ||
        slot.start >= slot.end
      )
        errors.push(
          "Each window needs a current or future date and an end time after its start time."
        );
    }
  }
  if (data.consent !== true)
    errors.push("Please consent to being contacted about your interview request.");
  if (typeof data.website !== "string" || data.website)
    errors.push("Unable to accept this request.");
  return errors;
}

/** Prevent user-supplied values from becoming spreadsheet formulas. */
export function spreadsheetText(value: string): string {
  return /^[\s]*[=+\-@]/.test(value) ? `'${value}` : value;
}
