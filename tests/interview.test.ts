import { describe, expect, it, afterEach, vi } from "vitest";
import { validateInterview, spreadsheetText, type InterviewRequest } from "@/lib/interview";
import worker from "../integration/interview-worker";

const valid = (): InterviewRequest => ({
  first_name: "Ada",
  last_name: "Lovelace",
  professional_background: "Open hardware researcher",
  linkedin: "https://www.linkedin.com/in/example/",
  email: "ada@example.org",
  preferred_interview_slots: [{ date: "2099-11-10", start: "09:00", end: "10:00" }],
  timezone: "America/Chicago",
  interest_reason: "I would like to support distributed assurance.",
  consent: true,
  website: ""
});

describe("interview validation", () => {
  it("accepts a complete request and optional empty LinkedIn", () => {
    expect(validateInterview(valid())).toEqual([]);
    expect(validateInterview({ ...valid(), linkedin: "" })).toEqual([]);
  });
  it.each([
    { first_name: " " },
    { email: "invalid" },
    { timezone: "Mars/Olympus" },
    { consent: false },
    { website: "spam" },
    { interest_reason: "x".repeat(4001) },
    { linkedin: "https://linkedin.com.evil.example/profile" },
    { linkedin: "javascript:alert(1)" },
    { preferred_interview_slots: [] },
    { preferred_interview_slots: [{ date: "2099-02-30", start: "09:00", end: "10:00" }] },
    { preferred_interview_slots: [{ date: "2000-01-01", start: "09:00", end: "10:00" }] },
    { preferred_interview_slots: [{ date: "2099-01-01", start: "10:00", end: "09:00" }] }
  ])("rejects invalid request %j", (patch) => {
    expect(validateInterview({ ...valid(), ...patch }).length).toBeGreaterThan(0);
  });
  it("uses the visitor's time zone at a date boundary", () => {
    const request = {
      ...valid(),
      preferred_interview_slots: [{ date: "2026-10-08", start: "09:00", end: "10:00" }],
      timezone: "America/Los_Angeles"
    };
    expect(validateInterview(request, new Date("2026-10-09T01:00:00Z"))).toEqual([]);
    expect(
      validateInterview({ ...request, timezone: "UTC" }, new Date("2026-10-09T01:00:00Z")).length
    ).toBeGreaterThan(0);
  });
  it("neutralizes spreadsheet formulas without rewriting normal prose", () => {
    for (const value of ["=IMPORTXML()", "+123", "-123", "@SUM(A1)", " \n=SUM(A1)"])
      expect(spreadsheetText(value)).toBe(`'${value}`);
    expect(spreadsheetText("Open quality research")).toBe("Open quality research");
  });
});

describe("interview write endpoint", () => {
  const env = {
    ALLOWED_ORIGIN: "https://pubinv.github.io",
    APPS_SCRIPT_URL: "https://script.google.com/test/exec",
    APPS_SCRIPT_SECRET: "test-only-secret"
  };
  const request = (body: unknown = valid(), origin = env.ALLOWED_ORIGIN) =>
    new Request("https://worker.example", {
      method: "POST",
      headers: { Origin: origin, "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });
  afterEach(() => vi.unstubAllGlobals());
  it("does not write invalid requests or disallowed origins", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    expect((await worker.fetch(request({ ...valid(), consent: false }), env)).status).toBe(400);
    expect((await worker.fetch(request(valid(), "https://other.example"), env)).status).toBe(403);
    expect(fetchMock).not.toHaveBeenCalled();
  });
  it("rejects oversized bodies before calling the spreadsheet", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    expect((await worker.fetch(request({ text: "x".repeat(25000) }), env)).status).toBe(413);
    expect(fetchMock).not.toHaveBeenCalled();
  });
  it("returns success only after an acknowledged append and sends the ordered columns", async () => {
    const fetchMock = vi.fn().mockResolvedValue(Response.json({ ok: true }));
    vi.stubGlobal("fetch", fetchMock);
    const response = await worker.fetch(request({ ...valid(), first_name: "=SUM(A1)" }), env);
    expect(await response.json()).toEqual({ ok: true });
    const sent = JSON.parse(fetchMock.mock.calls[0][1].body);
    expect(sent.row).toHaveLength(10);
    expect(sent.row[1]).toBe("'=SUM(A1)");
    expect(sent.row[9]).toBe("opendqm-interview-form");
    expect(response.headers.get("Access-Control-Allow-Origin")).toBe(env.ALLOWED_ORIGIN);
  });
  it("does not report success when upstream fails or rate limits", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(Response.json({ ok: false })));
    expect((await worker.fetch(request(), env)).status).toBe(502);
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(Response.json({ ok: false, rateLimited: true }))
    );
    expect((await worker.fetch(request(), env)).status).toBe(429);
  });
});
