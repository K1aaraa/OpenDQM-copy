/* Replace ALL of Code.gs with this file, then deploy a NEW VERSION. No secret required. */
const INTERVIEW_COLUMNS = [
  "submitted_at",
  "first_name",
  "last_name",
  "professional_background",
  "linkedin",
  "email",
  "preferred_interview_times",
  "timezone",
  "interest_reason",
  "source"
];
const INTERVIEW_ORIGINS = [
  "https://pubinv.github.io",
  "https://www.opendqm.org",
  "https://opendqm.org",
  "https://k1aaraa.github.io",
  "http://localhost:3000"
];

function interviewReply(origin, nonce, ok) {
  const message = JSON.stringify({ type: "opendqm-interview-result", nonce, ok }).replace(
    /</g,
    "\\u003c"
  );
  const target = JSON.stringify(origin).replace(/</g, "\\u003c");
  return HtmlService.createHtmlOutput(
    "<!doctype html><html><body><script>window.top.postMessage(" +
      message +
      "," +
      target +
      ");</script></body></html>"
  ).setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function validInterview(data) {
  if (!data || typeof data !== "object" || Array.isArray(data)) return false;
  for (const entry of [
    ["first_name", 100],
    ["last_name", 100],
    ["professional_background", 2000],
    ["preferred_interview_times", 2000],
    ["interest_reason", 4000]
  ]) {
    const value = data[entry[0]];
    if (typeof value !== "string" || !value.trim() || value.length > entry[1]) return false;
  }
  if (
    typeof data.email !== "string" ||
    data.email.length > 254 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)
  )
    return false;
  if (
    typeof data.linkedin !== "string" ||
    data.linkedin.length > 500 ||
    (data.linkedin && !/^https:\/\/(www\.)?linkedin\.com(?:\/[^\s]*)?\/?$/.test(data.linkedin))
  )
    return false;
  if (
    typeof data.timezone !== "string" ||
    data.timezone.length > 100 ||
    !/^(UTC|[A-Za-z0-9_+\-]+(?:\/[A-Za-z0-9_+\-]+)+)$/.test(data.timezone)
  )
    return false;
  if (typeof Intl !== "undefined" && Intl.DateTimeFormat) {
    try {
      new Intl.DateTimeFormat("en", { timeZone: data.timezone }).format();
    } catch {
      return false;
    }
  }
  return data.consent === true && data.website === "";
}

// Google invokes this entry point when the Web App receives a POST.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function doPost(event) {
  const parameters = (event && event.parameter) || {};
  const origin = parameters.response_origin || "";
  const nonce = parameters.nonce || "";
  // The origin is a reply destination, not caller authentication. This is a public intake endpoint.
  if (!INTERVIEW_ORIGINS.includes(origin) || !/^[a-f0-9-]{36}$/.test(nonce))
    return HtmlService.createHtmlOutput("Request rejected.");
  const reply = (ok) => interviewReply(origin, nonce, ok);
  try {
    if (
      !event.postData ||
      event.postData.contents.length > 50000 ||
      typeof parameters.payload !== "string" ||
      parameters.payload.length > 15000
    )
      return reply(false);
    const data = JSON.parse(parameters.payload);
    if (!validInterview(data)) return reply(false);
    const props = PropertiesService.getScriptProperties();
    const digest = (text) =>
      Utilities.base64EncodeWebSafe(
        Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, text)
      );
    const emailKey = "email-" + digest(data.email.trim().toLowerCase());
    const requestKey = "request-" + nonce;
    const fingerprint = digest(parameters.payload);
    const lock = LockService.getScriptLock();
    lock.waitLock(10000);
    try {
      const cache = CacheService.getScriptCache();
      const previous = cache.get(requestKey);
      if (previous) return reply(previous === fingerprint);
      if (cache.get(emailKey)) return reply(false);
      const bucketKey = "volume-" + Math.floor(Date.now() / 600000);
      const count = Number(cache.get(bucketKey) || "0");
      if (count >= 30) return reply(false);
      const sheetId = props.getProperty("INTERVIEW_SHEET_ID");
      if (!sheetId) return reply(false);
      const sheet = SpreadsheetApp.openById(sheetId).getSheetByName(
        props.getProperty("INTERVIEW_TAB") || "Interview requests"
      );
      if (!sheet) return reply(false);
      if (sheet.getLastRow() === 0) sheet.appendRow(INTERVIEW_COLUMNS);
      const headers = sheet.getRange(1, 1, 1, INTERVIEW_COLUMNS.length).getValues()[0];
      if (headers.some((value, index) => value !== INTERVIEW_COLUMNS[index])) return reply(false);
      const row = [
        new Date().toISOString(),
        data.first_name,
        data.last_name,
        data.professional_background,
        data.linkedin,
        data.email,
        data.preferred_interview_times,
        data.timezone,
        data.interest_reason,
        "opendqm-interview-form"
      ];
      sheet.appendRow(row.map((value) => (/^[\s]*[=+\-@]/.test(value) ? "'" + value : value)));
      SpreadsheetApp.flush();
      cache.put(requestKey, fingerprint, 21600);
      cache.put(emailKey, "submitted", 120);
      cache.put(bucketKey, String(count + 1), 600);
      return reply(true);
    } finally {
      lock.releaseLock();
    }
  } catch {
    return reply(false);
  }
}
