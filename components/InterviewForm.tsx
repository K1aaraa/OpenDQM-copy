"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { validateInterview, type InterviewRequest } from "@/lib/interview";
import { submitAppsScript } from "@/lib/appsScript";

const scriptEndpoint = process.env.NEXT_PUBLIC_INTERVIEW_APPS_SCRIPT_URL;
const emailEndpoint = !scriptEndpoint
  ? process.env.NEXT_PUBLIC_INTERVIEW_EMAIL_ENDPOINT
  : undefined;
const endpoint = scriptEndpoint || emailEndpoint || process.env.NEXT_PUBLIC_INTERVIEW_ENDPOINT;

export function InterviewForm() {
  const [timezone, setTimezone] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
  const [status, setStatus] = useState<"idle" | "sending" | "success">("idle");
  const feedback = useRef<HTMLDivElement>(null);
  const submitting = useRef(false);
  useEffect(() => setTimezone(Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC"), []);
  useEffect(() => {
    if (errors.length || status === "success") feedback.current?.focus();
  }, [errors, status]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting.current) return;
    const form = new FormData(event.currentTarget);
    const text = (name: string) => String(form.get(name) || "").trim();
    const request: InterviewRequest = {
      first_name: text("first_name"),
      last_name: text("last_name"),
      professional_background: text("professional_background"),
      linkedin: text("linkedin"),
      email: text("email"),
      preferred_interview_times: text("preferred_interview_times"),
      timezone,
      interest_reason: text("interest_reason"),
      consent: form.get("consent") === "on",
      website: text("website")
    };
    const issues = validateInterview(request);
    if (issues.length) {
      setErrors(issues);
      return;
    }
    if (!endpoint) {
      setErrors(["Interview scheduling is not available yet. Please email info@opendqm.org."]);
      return;
    }
    submitting.current = true;
    setStatus("sending");
    setErrors([]);
    try {
      if (scriptEndpoint) {
        await submitAppsScript(scriptEndpoint, request);
      } else {
        const response = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(
            emailEndpoint
              ? {
                  ...request,
                  _subject: "OpenDQM interview request",
                  _gotcha: request.website,
                  source: "opendqm-interview-form"
                }
              : request
          ),
          signal: AbortSignal.timeout(25000)
        });
        const result = await response.json();
        if (!response.ok || (emailEndpoint ? Boolean(result.errors) : result.ok !== true))
          throw new Error();
      }
      setStatus("success");
    } catch {
      setStatus("idle");
      setErrors([
        "We couldn’t confirm your request was saved. Your entries are still here. Please email info@opendqm.org before retrying to avoid a duplicate request."
      ]);
    } finally {
      submitting.current = false;
    }
  }
  return (
    <section
      className="section interview-section"
      id="schedule-interview"
      aria-labelledby="interview-title"
    >
      <div className="container interview-panel">
        <h2 id="interview-title">Schedule an Interview</h2>
        <p>
          Share your experience and help shape OpenDQM research. Tell us when you’re available; the
          team will contact you to arrange an interview.
        </p>
        <div ref={feedback} tabIndex={-1} role={errors.length ? "alert" : "status"}>
          {errors.length > 0 && (
            <ul className="form-errors">
              {errors.map((error) => (
                <li key={error}>{error}</li>
              ))}
            </ul>
          )}
          {status === "success" && (
            <div className="form-success">
              <h3>Thank you for supporting OpenDQM research.</h3>
              <p>
                Your interview request has been received. The team will contact you by email to
                confirm a time.
              </p>
            </div>
          )}
        </div>
        {status !== "success" && (
          <form onSubmit={submit} className="interview-form">
            <div className="form-grid">
              <label>
                First name
                <input name="first_name" autoComplete="given-name" required maxLength={100} />
              </label>
              <label>
                Last name
                <input name="last_name" autoComplete="family-name" required maxLength={100} />
              </label>
              <label>
                Email
                <input name="email" type="email" autoComplete="email" required maxLength={254} />
              </label>
              <label>
                LinkedIn profile <span>(optional)</span>
                <input
                  name="linkedin"
                  type="url"
                  placeholder="https://www.linkedin.com/in/…"
                  maxLength={500}
                />
              </label>
            </div>
            <label>
              Professional background
              <textarea name="professional_background" required maxLength={2000} rows={3} />
            </label>
            <div className="availability-fields">
              <label>
                Preferred interview dates and times
                <textarea
                  name="preferred_interview_times"
                  required
                  maxLength={2000}
                  rows={5}
                  placeholder="I'm usually available Oct. 15-18 after 2 PM, Friday mornings, or Tuesday Oct. 20 between 10 AM and 1 PM."
                  aria-describedby="availability-help"
                />
              </label>
              <p id="availability-help" className="form-help">
                Tell us what works for you in your own words. The team will follow up to confirm a
                time.
              </p>
              <label className="timezone-field">
                Your time zone
                <input
                  name="timezone"
                  value={timezone}
                  onChange={(e) => setTimezone(e.target.value)}
                  required
                  maxLength={100}
                  aria-describedby="timezone-help"
                />
              </label>
              <p id="timezone-help" className="form-help">
                Detected from your browser. You can edit it if needed, for example America/Chicago
                or Europe/London.
              </p>
            </div>
            <label>
              Why are you interested in supporting OpenDQM research?
              <textarea name="interest_reason" required maxLength={4000} rows={4} />
            </label>
            <div className="form-trap" aria-hidden="true">
              <label>
                Website
                <input name="website" tabIndex={-1} autoComplete="off" />
              </label>
            </div>
            <label className="consent">
              <input name="consent" type="checkbox" required />{" "}
              <span>
                I agree that the OpenDQM team may use these details to contact me and coordinate
                research participation.{" "}
                {emailEndpoint
                  ? "These details are processed and stored by Formspree and emailed to the OpenDQM team."
                  : "Interview requests are stored privately and accessed by the research team."}{" "}
                To request deletion, email <a href="mailto:info@opendqm.org">info@opendqm.org</a>.
              </span>
            </label>
            {!endpoint && (
              <p role="status" className="form-help">
                Online interview requests are being set up. Please contact{" "}
                <a href="mailto:info@opendqm.org">info@opendqm.org</a> to schedule an interview.
              </p>
            )}
            <button
              type="submit"
              className="button button-primary"
              disabled={!endpoint || status === "sending"}
            >
              {status === "sending" ? "Sending request…" : "Request an Interview →"}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
