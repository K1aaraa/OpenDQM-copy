import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { runInNewContext } from "node:vm";
import { isAppsScriptReply } from "@/lib/appsScript";

const nonce = "12345678-1234-4234-8234-123456789012";
const request = {
  first_name: "QA",
  last_name: "Tester",
  professional_background: "Engineer",
  linkedin: "https://www.linkedin.com/in/tester/",
  email: "qa@example.org",
  preferred_interview_times: "Friday mornings",
  timezone: "America/Chicago",
  interest_reason: "Help the research",
  consent: true,
  website: ""
};
function writer() {
  const rows: string[][] = [];
  const cache = new Map<string, string>();
  const properties: Record<string, string> = {
    INTERVIEW_SHEET_ID: "sheet",
    INTERVIEW_TAB: "Interview requests"
  };
  const sheet = {
    getLastRow: () => rows.length,
    appendRow: (row: string[]) => rows.push(row),
    getRange: () => ({ getValues: () => [rows[0]] })
  };
  const context = {
    HtmlService: {
      XFrameOptionsMode: { ALLOWALL: "ALLOWALL" },
      createHtmlOutput: (html: string) => ({
        html,
        setXFrameOptionsMode() {
          return this;
        }
      })
    },
    PropertiesService: {
      getScriptProperties: () => ({ getProperty: (key: string) => properties[key] })
    },
    Utilities: {
      DigestAlgorithm: { SHA_256: "sha256" },
      computeDigest: (_algorithm: string, text: string) =>
        createHash("sha256").update(text).digest(),
      base64EncodeWebSafe: (bytes: Buffer) => bytes.toString("base64url")
    },
    LockService: { getScriptLock: () => ({ waitLock() {}, releaseLock() {} }) },
    CacheService: {
      getScriptCache: () => ({
        get: (key: string) => cache.get(key),
        put: (key: string, value: string) => cache.set(key, value)
      })
    },
    SpreadsheetApp: { openById: () => ({ getSheetByName: () => sheet }), flush() {} }
  };
  const code = readFileSync(
    new URL("../integration/interview-apps-script-direct.js", import.meta.url),
    "utf8"
  );
  const post = runInNewContext(code + "\ndoPost", context) as (event: object) => { html: string };
  const send = (data: object = request, origin = "https://k1aaraa.github.io", token = nonce) =>
    post({
      parameter: { payload: JSON.stringify(data), response_origin: origin, nonce: token },
      postData: { contents: JSON.stringify(data) }
    }).html;
  return { rows, cache, properties, send };
}

describe("Apps Script acknowledgements", () => {
  it("accepts only a matching Google-hosted structured reply", () => {
    const message = { type: "opendqm-interview-result", nonce, ok: true };
    expect(isAppsScriptReply("https://script.googleusercontent.com", message, nonce)).toBe(true);
    expect(isAppsScriptReply("https://example.org", message, nonce)).toBe(false);
    expect(isAppsScriptReply("https://googleusercontent.com.example.org", message, nonce)).toBe(
      false
    );
    expect(
      isAppsScriptReply("https://script.google.com", { ...message, nonce: "wrong" }, nonce)
    ).toBe(false);
    expect(isAppsScriptReply("null", message, nonce)).toBe(false);
    expect(isAppsScriptReply("https://script.google.com", { ...message, ok: "true" }, nonce)).toBe(
      false
    );
  });
});

describe("public spreadsheet writer", () => {
  it("appends validated requests without a secret, with server timestamp and source", () => {
    const api = writer();
    expect(api.send()).toContain('"ok":true');
    expect(api.rows).toHaveLength(2);
    expect(api.rows[1][0]).toMatch(/^\d{4}-\d{2}-\d{2}T/);
    expect(api.rows[1][9]).toBe("opendqm-interview-form");
  });
  it("acknowledges the same request once and rejects tampered replays", () => {
    const api = writer();
    api.send();
    expect(api.send()).toContain('"ok":true');
    expect(api.send({ ...request, interest_reason: "Changed" })).toContain('"ok":false');
    expect(api.rows).toHaveLength(2);
  });
  it.each([
    { ...request, consent: false },
    { ...request, website: "bot" },
    { ...request, first_name: "" },
    { ...request, email: "invalid" },
    { ...request, linkedin: "https://linkedin.com.evil.org/profile" },
    { ...request, timezone: "Wrong/Zone" },
    { ...request, interest_reason: "x".repeat(4001) }
  ])("rejects invalid data before writing", (data) => {
    const api = writer();
    expect(api.send(data)).toContain('"ok":false');
    expect(api.rows).toHaveLength(0);
  });
  it("rejects unknown reply destinations and nonce values", () => {
    const api = writer();
    api.send(request, "https://example.org");
    api.send(request, "https://k1aaraa.github.io", "wrong");
    expect(api.rows).toHaveLength(0);
  });
  it("sanitizes spreadsheet formulas", () => {
    const api = writer();
    api.send({ ...request, first_name: " =HYPERLINK(1)" });
    expect(api.rows[1][1]).toBe("' =HYPERLINK(1)");
  });
  it("rejects duplicate email requests and header mismatches", () => {
    const api = writer();
    api.send();
    expect(
      api.send(request, "https://k1aaraa.github.io", "22345678-1234-4234-8234-123456789012")
    ).toContain('"ok":false');
    const other = writer();
    other.rows.push(["wrong"]);
    expect(other.send()).toContain('"ok":false');
    expect(other.rows).toHaveLength(1);
  });
});
