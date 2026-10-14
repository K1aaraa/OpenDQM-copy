# Interview form integrations

The website is a static export, so form delivery runs separately. The frontend selects a transport in this order:

| Build-time setting                      | Transport                                           | Setup                                                   |
| --------------------------------------- | --------------------------------------------------- | ------------------------------------------------------- |
| `NEXT_PUBLIC_INTERVIEW_APPS_SCRIPT_URL` | Direct Google Apps Script acknowledgement           | [DIRECT-SETUP.md](DIRECT-SETUP.md)                      |
| `NEXT_PUBLIC_INTERVIEW_EMAIL_ENDPOINT`  | JSON email intake such as Formspree                 | Configure the public endpoint and test its response     |
| `NEXT_PUBLIC_INTERVIEW_ENDPOINT`        | Cloudflare Worker to a secret-protected Apps Script | Instructions below and [SETUP-GUIDE.md](SETUP-GUIDE.md) |

Only one mode is active. Leave all three unset to show the email fallback with submission disabled. Endpoint URLs are public build-time configuration; Sheet access and bridge secrets stay in backend configuration. Never combine the two Apps Script files in one project.

## Files

- `interview-apps-script-direct.js`: direct public intake used by the first mode; nonce-matched browser acknowledgement.
- `interview-worker.ts`, `wrangler.jsonc`, `interview-apps-script.js`: alternative Worker bridge and its authenticated writer.
- `diagnose-interview.gs`: manual Apps Script diagnostics, not shipped to browsers.
- `DIRECT-SETUP.md`: direct-mode deployment and verification.
- `SETUP-GUIDE.md`: step-by-step Worker-mode deployment.

These alternatives are retained because they implement supported form transports and have unit coverage. They are not all deployed by the website CI. Do not change a live backend or submit a test record just by running website checks.

---

# Enable interview requests

**Current selected setup: direct Google Sheets intake without a shared secret.** Follow [DIRECT-SETUP.md](DIRECT-SETUP.md) and replace Code.gs with `interview-apps-script-direct.js`. The older script/Worker steps below are retained for the previous optional bridge mode and are not required for direct intake. The live Version 1 must be replaced with a new deployment version before enabling direct submissions.

The static GitHub Pages site submits to a Cloudflare Worker. The Worker validates requests and calls a Google Apps Script web app using a server-only secret. The script appends a row to the existing Sheet. No spreadsheet interface, Sheet URL, Google credential, or bridge secret is shipped in the website.

## Required account setup

1. **Before collecting personal information, stop publishing the supplied Sheet to the web and remove “anyone with the link” access.** Keep access restricted to the research team. A previously published Sheet is unsuitable for storing interview requests until its publication and sharing are disabled. Review retention and access with the team.
2. In that Sheet, create an empty tab named `Interview requests`. In Extensions → Apps Script, paste `interview-apps-script.js`.
3. Set Apps Script **Script Properties**: `INTERVIEW_SHEET_ID` = `1WI3xtbpIIAnGy4EcZjEB-5M25qkGPctGT5sZXRF9HdI`, `INTERVIEW_TAB` = `Interview requests`, and `INTERVIEW_SECRET` = a randomly generated secret of at least 32 bytes. Do not add the secret to Git.
4. Deploy the Apps Script as a **Web app**, executing as the owner, accessible to Anyone. Authorize the owner's Sheet access. The public web app still requires the bridge secret on every write. Copy its `/exec` URL; updates require a new deployment version.
5. Deploy the separate Worker with Wrangler: from `integration`, the supplied Apps Script URL is already set as `APPS_SCRIPT_URL` in `wrangler.jsonc`. Run `npx wrangler secret put APPS_SCRIPT_SECRET`, entering the matching private secret at the prompt. Run `npx wrangler deploy`. `ALLOWED_ORIGINS` is a comma-separated allowlist. It currently contains the deployed website origin and `http://localhost:3000`, so the same endpoint can serve production and local development. Each origin must match exactly (no path or trailing slash); add the actual custom-domain origin if applicable. Install/authenticate Wrangler with the Cloudflare account as needed.
6. Set repository Actions variable `NEXT_PUBLIC_INTERVIEW_ENDPOINT` to the deployed Worker's HTTPS URL. Rebuild the website. For local development, set it in `.env.local` and use a test spreadsheet tab and the allowlisted local origin. This endpoint URL is public; it is not a credential.
7. Verify on the deployed website: valid submission → confirmation → exactly one row in the private Sheet. Confirm invalid input and a filled honeypot do not append rows. Confirm the headers match exactly. Test network failures without showing success. Do not use real participant information for QA.

Columns: `submitted_at`, `first_name`, `last_name`, `professional_background`, `linkedin`, `email`, `preferred_interview_times`, `timezone`, `interest_reason`, `source`.

The Worker bounds streamed request size, checks origin, validates required fields/URLs/availability/time zones/consent, and neutralizes spreadsheet formulas. The form includes a honeypot, and the script limits repeated email submissions for two minutes under a write lock. Origin checks and honeypots are basic protections, not bot authentication; if abuse develops, add Turnstile with server verification and a Worker rate limiter before accepting requests. Requests are not logged. Successful UI confirmation requires an acknowledged, flushed append. A network timeout can be ambiguous, so the form asks visitors to contact the team before retrying.

Until the endpoint is configured, the branded form remains visible with an email fallback and a disabled submit button. It never simulates a saved request.

## Availability schema migration

The form now sends `preferred_interview_times` as natural-language text. If an existing tab uses `preferred_interview_slots` as column 7, rename that header to `preferred_interview_times`, keeping the old rows intact, and redeploy the Worker and Apps Script before enabling the revised form. The writer checks exact column names and refuses mismatched headers.

## Handoff verification

Run `npm run lint`, `npm run typecheck`, `npm run format:check`, `npm test`, and a production build with `GITHUB_PAGES=true` and `NEXT_PUBLIC_BASE_PATH=/OpenDQM-copy` for this repository. CI derives that prefix from the repository name. For the original PubInv/OpenDQM repository, the prefix is `/OpenDQM`. A custom-domain root deployment should instead use an empty prefix. Confirm both Actions jobs in `CI/CD Pipeline` and inspect images, `/contact/#schedule-interview`, routes, accordion keyboard interaction, and responsive layouts on the actual deployment.
