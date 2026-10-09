import { spreadsheetText, validateInterview, type InterviewRequest } from "../lib/interview";

type Env = { ALLOWED_ORIGIN: string; APPS_SCRIPT_URL: string; APPS_SCRIPT_SECRET: string };

/** Deploy separately from the static website. Secrets exist only in the Worker. */
const interviewWorker = {
  async fetch(request: Request, env: Env): Promise<Response> {
    const origin = request.headers.get("Origin");
    const headers = {
      "Access-Control-Allow-Origin": env.ALLOWED_ORIGIN,
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      Vary: "Origin",
      "Cache-Control": "no-store"
    };
    const reply = (body: object, status: number) => Response.json(body, { status, headers });
    if (origin !== env.ALLOWED_ORIGIN) return reply({ ok: false }, 403);
    if (request.method === "OPTIONS") return new Response(null, { status: 204, headers });
    if (request.method !== "POST") return reply({ ok: false }, 405);
    if (!env.APPS_SCRIPT_URL || !env.APPS_SCRIPT_SECRET) return reply({ ok: false }, 503);
    // Bound actual streamed bytes, not only the user-controlled Content-Length header.
    const reader = request.body?.getReader();
    if (!reader) return reply({ ok: false }, 400);
    let bytes = 0;
    const chunks: Uint8Array[] = [];
    try {
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        bytes += value.byteLength;
        if (bytes > 24000) {
          await reader.cancel();
          return reply({ ok: false }, 413);
        }
        chunks.push(value);
      }
      const buffer = new Uint8Array(bytes);
      let offset = 0;
      for (const chunk of chunks) {
        buffer.set(chunk, offset);
        offset += chunk.length;
      }
      const value: unknown = JSON.parse(new TextDecoder().decode(buffer));
      const errors = validateInterview(value);
      if (errors.length) return reply({ ok: false, errors }, 400);
      const data = value as InterviewRequest;
      const row = [
        new Date().toISOString(),
        data.first_name.trim(),
        data.last_name.trim(),
        data.professional_background.trim(),
        data.linkedin,
        data.email.trim(),
        JSON.stringify(data.preferred_interview_slots),
        data.timezone,
        data.interest_reason.trim(),
        "opendqm-interview-form"
      ].map(spreadsheetText);
      const upstream = await fetch(env.APPS_SCRIPT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ secret: env.APPS_SCRIPT_SECRET, row }),
        signal: AbortSignal.timeout(20000)
      });
      const result = (await upstream.json()) as { ok?: boolean; rateLimited?: boolean };
      if (result.rateLimited) return reply({ ok: false }, 429);
      if (!upstream.ok || result.ok !== true) return reply({ ok: false }, 502);
      return reply({ ok: true }, 200);
    } catch {
      return reply({ ok: false }, 502);
    }
  }
};

export default interviewWorker;
