# Direct Google Sheets intake: no shared secret or Cloudflare

Use `interview-apps-script-direct.js`, replacing ALL of Code.gs (do not combine it with the older script). This is a public intake endpoint: visitors can submit data without reading the private Sheet. Keep the Sheet unpublished and sharing Restricted before collecting personal data. Google authorization remains necessary for the script owner to write to the Sheet.

1. Replace Code.gs with the entire contents of `interview-apps-script-direct.js` and save.
2. Keep Script Properties `INTERVIEW_SHEET_ID` and `INTERVIEW_TAB` unchanged. The old `INTERVIEW_SECRET` property is unused; it can be removed after migration. No secret appears in website code.
3. Choose **Deploy → Manage deployments → pencil/Edit → Version: New version → Deploy**. Keep Execute as Me and access Anyone. Updating the existing deployment retains its /exec URL; copying code alone does not update Version 1. Alternatively create a new Web app deployment and provide its new /exec URL.
4. Set `NEXT_PUBLIC_INTERVIEW_APPS_SCRIPT_URL` to the new version's /exec URL locally in `.env.local` and restart Next.js. This mode takes precedence over the previously prepared email/Worker modes. For GitHub Pages, set the repository Actions variable of the same name before rebuilding and deploying.
5. Submit a marked test request with an email you control and verify exactly one row in the private Interview requests tab and a success message. Verify invalid input and a filled honeypot do not append rows. Confirm the client does not show success when the writer fails or no acknowledgement arrives. Delete test records. Only then enable production participant intake.

The browser posts fields into a hidden response iframe (not an embedded Sheet). Google returns a nonce-matched postMessage acknowledgement after appendRow and flush. HTTPS Google origins and the unpredictable request nonce are checked before acknowledging success. A timeout is ambiguous and never displayed as a saved request. Network/browser embedding policies can affect this transport, so local mocks alone do not prove real Google delivery; verify the deployed Apps Script response in a browser after redeployment.

The script independently validates required fields, bounded lengths, email, LinkedIn URL, timezone, consent and honeypot; it creates timestamp/source server-side, escapes spreadsheet formulas and refuses incorrect column headings. A lock serializes writes; cache-backed duplicate detection, a two-minute per-email limit and a 30-per-ten-minute volume cap are basic spam protections. Caches are best effort, and the supplied response_origin is only a reply destination, not authentication. Determined bots can still submit or exhaust quotas. Add a server-verified CAPTCHA if abuse develops. Do not claim that the public endpoint prevents all bots or hides the existence of the Sheet from its owner.

Allowed reply origins are in INTERVIEW_ORIGINS. They include https://pubinv.github.io, https://www.opendqm.org, https://opendqm.org, https://k1aaraa.github.io and http://localhost:3000. These are origins, so repository paths and trailing slashes are omitted. Adding an origin does not configure DNS or move the GitHub Pages deployment. The endpoint never serves or returns spreadsheet rows; Google Sheet ID and tab remain Script Properties.

Google deployment instructions: https://developers.google.com/apps-script/concepts/deployments

Google HTML service restrictions: https://developers.google.com/apps-script/guides/html/restrictions
