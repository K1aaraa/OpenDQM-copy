/* Paste into a Google Apps Script project. Configure Script Properties as documented. */
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

function doPost(event) {
  const response = (body) =>
    ContentService.createTextOutput(JSON.stringify(body)).setMimeType(ContentService.MimeType.JSON);
  try {
    if (!event.postData || event.postData.contents.length > 30000) return response({ ok: false });
    const data = JSON.parse(event.postData.contents);
    const props = PropertiesService.getScriptProperties();
    const secret = props.getProperty("INTERVIEW_SECRET");
    if (!secret || data.secret !== secret) return response({ ok: false });
    if (
      !Array.isArray(data.row) ||
      data.row.length !== INTERVIEW_COLUMNS.length ||
      data.row.some((cell) => typeof cell !== "string" || cell.length > 5000)
    )
      return response({ ok: false });
    const row = data.row;
    if (
      !row[1].trim() ||
      !row[2].trim() ||
      !row[3].trim() ||
      !row[8].trim() ||
      !row[6].trim() ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(row[5]) ||
      row[9] !== "opendqm-interview-form"
    )
      return response({ ok: false });
    const key = Utilities.base64EncodeWebSafe(
      Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, row[5].toLowerCase())
    );
    const lock = LockService.getScriptLock();
    lock.waitLock(10000);
    try {
      const cache = CacheService.getScriptCache();
      if (cache.get(key)) return response({ ok: false, rateLimited: true });
      const sheet = SpreadsheetApp.openById(props.getProperty("INTERVIEW_SHEET_ID")).getSheetByName(
        props.getProperty("INTERVIEW_TAB") || "Interview requests"
      );
      if (!sheet) return response({ ok: false });
      if (sheet.getLastRow() === 0) sheet.appendRow(INTERVIEW_COLUMNS);
      const headers = sheet.getRange(1, 1, 1, INTERVIEW_COLUMNS.length).getValues()[0];
      if (headers.some((cell, i) => cell !== INTERVIEW_COLUMNS[i])) return response({ ok: false });
      // Defense in depth against formula injection, including whitespace-prefixed formulas.
      sheet.appendRow(row.map((cell) => (/^[\s]*[=+\-@]/.test(cell) ? "'" + cell : cell)));
      SpreadsheetApp.flush();
      cache.put(key, "submitted", 120);
      return response({ ok: true });
    } finally {
      lock.releaseLock();
    }
  } catch {
    return response({ ok: false });
  }
}
