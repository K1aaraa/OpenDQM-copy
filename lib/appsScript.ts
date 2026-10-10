import type { InterviewRequest } from "@/lib/interview";

export function isAppsScriptReply(origin: string, value: unknown, nonce: string): boolean {
  let url: URL;
  try {
    url = new URL(origin);
  } catch {
    return false;
  }
  const trusted =
    url.protocol === "https:" &&
    (url.hostname === "script.google.com" ||
      url.hostname === "script.googleusercontent.com" ||
      url.hostname.endsWith(".googleusercontent.com"));
  const data = value as { type?: string; nonce?: string; ok?: boolean } | null;
  return Boolean(
    trusted &&
    data &&
    data.type === "opendqm-interview-result" &&
    data.nonce === nonce &&
    typeof data.ok === "boolean"
  );
}

/** A form POST avoids CORS; only the matching Google-hosted acknowledgement confirms success. */
export function submitAppsScript(endpoint: string, request: InterviewRequest): Promise<void> {
  const url = new URL(endpoint);
  if (
    url.protocol !== "https:" ||
    url.hostname !== "script.google.com" ||
    !/^\/macros\/s\/[^/]+\/exec$/.test(url.pathname)
  )
    return Promise.reject(new Error("Invalid Apps Script endpoint"));
  return new Promise((resolve, reject) => {
    const nonce = crypto.randomUUID();
    const frame = document.createElement("iframe");
    frame.name = `interview-${nonce}`;
    frame.hidden = true;
    frame.title = "Interview submission acknowledgement";
    const form = document.createElement("form");
    form.hidden = true;
    form.method = "POST";
    form.action = endpoint;
    form.target = frame.name;
    for (const [name, value] of Object.entries({
      payload: JSON.stringify(request),
      nonce,
      response_origin: window.location.origin
    })) {
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = name;
      input.value = value;
      form.append(input);
    }
    const cleanup = () => {
      clearTimeout(timer);
      window.removeEventListener("message", receive);
      form.remove();
      frame.remove();
    };
    const receive = (event: MessageEvent) => {
      if (!isAppsScriptReply(event.origin, event.data, nonce)) return;
      const ok = event.data.ok === true;
      cleanup();
      if (ok) resolve();
      else reject(new Error("Request was rejected"));
    };
    const timer = setTimeout(() => {
      cleanup();
      reject(new Error("No acknowledged write"));
    }, 45000);
    window.addEventListener("message", receive);
    document.body.append(frame, form);
    try {
      form.submit();
    } catch (error) {
      cleanup();
      reject(error);
    }
  });
}
