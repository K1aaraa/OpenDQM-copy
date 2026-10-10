# Enable interview requests

The static GitHub Pages site submits to a Cloudflare Worker. The Worker validates requests and calls a Google Apps Script web app using a server-only secret. The script appends a row to the existing Sheet. No spreadsheet interface, Sheet URL, Google credential, or bridge secret is shipped in the website.

## Required account setup

1. **Before collecting personal information, stop publishing the supplied Sheet to the web and remove “anyone with the link” access.** Keep access restricted to the research team. A previously published Sheet is unsuitable for storing interview requests until its publication and sharing are disabled. Review retention and access with the team.
2. In that Sheet, create an empty tab named `Interview requests`. In Extensions → Apps Script, paste `interview-apps-script.js`.
3. Set Apps Script **Script Properties**: `INTERVIEW_SHEET_ID` = `1m9GTbGxv3wdOPBloWTGmQ2RyW2dlirgaRwmaNf0ZVMI`, `INTERVIEW_TAB` = `Interview requests`, and `INTERVIEW_SECRET` = a randomly generated secret of at least 32 bytes. Do not add the secret to Git.
4. Deploy the Apps Script as a **Web app**, executing as the owner, accessible to Anyone. Authorize the owner's Sheet access. The public web app still requires the bridge secret on every write. Copy its `/exec` URL; updates require a new deployment version.
5. Deploy the separate Worker with Wrangler: from `integration`, run `npx wrangler secret put APPS_SCRIPT_URL` and `npx wrangler secret put APPS_SCRIPT_SECRET`, entering the URL and matching secret at the prompts. Run `npx wrangler deploy`. `ALLOWED_ORIGINS` is a comma-separated allowlist. It currently contains the deployed website origin and `http://localhost:3000`, so the same endpoint can serve production and local development. Each origin must match exactly (no path or trailing slash); add the actual custom-domain origin if applicable. Install/authenticate Wrangler with the Cloudflare account as needed.
6. Set repository Actions variable `NEXT_PUBLIC_INTERVIEW_ENDPOINT` to the deployed Worker's HTTPS URL. Rebuild the website. For local development, set it in `.env.local` and use a test spreadsheet tab and the allowlisted local origin. This endpoint URL is public; it is not a credential.
7. Verify on the deployed website: valid submission → confirmation → exactly one row in the private Sheet. Confirm invalid input and a filled honeypot do not append rows. Confirm the headers match exactly. Test network failures without showing success. Do not use real participant information for QA.

Columns: `submitted_at`, `first_name`, `last_name`, `professional_background`, `linkedin`, `email`, `preferred_interview_times`, `timezone`, `interest_reason`, `source`.

The Worker bounds streamed request size, checks origin, validates required fields/URLs/availability/time zones/consent, and neutralizes spreadsheet formulas. The form includes a honeypot, and the script limits repeated email submissions for two minutes under a write lock. Origin checks and honeypots are basic protections, not bot authentication; if abuse develops, add Turnstile with server verification and a Worker rate limiter before accepting requests. Requests are not logged. Successful UI confirmation requires an acknowledged, flushed append. A network timeout can be ambiguous, so the form asks visitors to contact the team before retrying.

Until the endpoint is configured, the branded form remains visible with an email fallback and a disabled submit button. It never simulates a saved request.

## Availability schema migration

The form now sends `preferred_interview_times` as natural-language text. If an existing tab uses `preferred_interview_slots` as column 7, rename that header to `preferred_interview_times`, keeping the old rows intact, and redeploy the Worker and Apps Script before enabling the revised form. The writer checks exact column names and refuses mismatched headers.

## Handoff verification

Run `npm run lint`, `npm run typecheck`, `npm run format:check`, `npm test`, and a production build with `GITHUB_PAGES=true` and `NEXT_PUBLIC_BASE_PATH=/OpenDQM-copy` for this repository. CI derives that prefix from the repository name. For the original PubInv/OpenDQM repository, the prefix is `/OpenDQM`. A custom-domain root deployment should instead use an empty prefix. Confirm both Actions jobs in `CI/CD Pipeline` and inspect images, `/contact/#schedule-interview`, routes, accordion keyboard interaction, and responsive layouts on the actual deployment.
