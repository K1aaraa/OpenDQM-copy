# Connect the interview form to your Google Sheet

The earlier link is a Google **Sheet**, not a Google Doc. Sharing a Sheet, publishing it, or copying an iframe does not create a submission endpoint. The existing implementation uses:

Website form → Cloudflare Worker → Google Apps Script → private Google Sheet.

## 1. Prepare the Sheet

1. Open https://docs.google.com/spreadsheets/d/1m9GTbGxv3wdOPBloWTGmQ2RyW2dlirgaRwmaNf0ZVMI/edit while signed in as an owner or editor.
2. Because this Sheet was published, go to **File → Share → Publish to web** and stop publishing it. In **Share**, set **General access** to **Restricted**. Only research-team members should be able to read participant details.
3. Add a new, empty tab using the **+** at the bottom. Name it exactly `Interview requests`. Leave its rows empty; the script creates the headings automatically.

## 2. Add the Apps Script

1. In the Sheet menu, choose **Extensions → Apps Script**.
2. The script editor opens in a new tab. Give the project a name, such as `OpenDQM Interview Requests`.
3. Open the local file `integration/interview-apps-script.js` in your editor. Copy its entire contents.
4. In Apps Script, replace the default sample contents of `Code.gs` with that code. Save.
5. In the script editor's **Project Settings** (gear icon), find **Script Properties** and add these properties:

| Property             | Value                                                                                                                                                         |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `INTERVIEW_SHEET_ID` | `1m9GTbGxv3wdOPBloWTGmQ2RyW2dlirgaRwmaNf0ZVMI`                                                                                                                |
| `INTERVIEW_TAB`      | `Interview requests`                                                                                                                                          |
| `INTERVIEW_SECRET`   | A new randomly generated password with at least 32 random bytes of entropy; a password manager's 48-character random password is suitable. Save it privately. |

The secret is a private password between the Worker and Apps Script. Do not send it in chat, add it to Git, or put it into the website's `.env.local`.

## 3. Get the Google Web App URL

1. Click **Deploy → New deployment** in the upper right.
2. In **Select type**, select **Web app** (use the gear icon if needed).
3. Set **Execute as** to **Me** (the account with access to the Sheet).
4. Set **Who has access** to **Anyone**. This makes the endpoint reachable by the Worker; the code still requires the private secret for writes. It does not make the Sheet public.
5. Click **Deploy** and authorize the script to access the Sheet under your own account. If your organization's policy blocks this deployment, stop and ask its administrator for the approved alternative.
6. Copy the **Web app URL**, which looks like `https://script.google.com/macros/s/.../exec`. Copy that URL rather than a `/dev` test URL, Sheet URL, deployment ID, or embed code.

You can send the `/exec` URL in chat. It is not the private secret. This is the first URL we need, but the website still needs the Worker in the next step to validate submissions and return reliable confirmation.

Google's instructions: https://developers.google.com/apps-script/guides/web

## 4. Connect the secure Worker

Use a Cloudflare account authorized to host the interview endpoint. Open a PowerShell terminal in the website's root folder and run these commands one at a time:

```powershell
Set-Location integration
npx wrangler login
npx wrangler deploy
npx wrangler secret put APPS_SCRIPT_URL
npx wrangler secret put APPS_SCRIPT_SECRET
```

The login command opens Cloudflare's authentication page. The first deploy creates the configured Worker; it cannot accept submissions until both secrets are set.

When `APPS_SCRIPT_URL` asks for its value, paste the `/exec` URL. When `APPS_SCRIPT_SECRET` asks for its value, paste the exact private password saved in Apps Script. Enter these at the secret prompts, not as command arguments or into chat. `wrangler secret put` deploys an updated version with the secret.

Copy the deployed Worker HTTPS URL printed by Wrangler (usually ending in `.workers.dev`). **This Worker URL is the website's `NEXT_PUBLIC_INTERVIEW_ENDPOINT`.** The configured origin allowlist permits `http://localhost:3000` and the current GitHub Pages origin. Other local ports or custom domains need explicit allowlist updates in `wrangler.jsonc`.

Cloudflare documentation: https://developers.cloudflare.com/workers/configuration/secrets/

## 5. Enable and test locally

In the website root, create or update `.env.local` with the Worker URL:

```dotenv
NEXT_PUBLIC_INTERVIEW_ENDPOINT=https://YOUR-WORKER.YOUR-SUBDOMAIN.workers.dev
```

Restart the Next.js development server. Visit `/contact#schedule-interview`, submit a clearly marked test request with an email address you control, and verify both:

- The website shows a saved-request confirmation.
- Exactly one corresponding row appears in the private `Interview requests` tab.

Also test invalid input, a network failure, and the honeypot; those must not create a successful request. Delete test rows after verification. Do not test using real participant details. Opening the Worker URL in a browser is not a form test: it expects a POST from an allowed website origin.

## 6. Enable production when ready

The current request is **local changes only; do not push or deploy the website yet**.

When production changes are authorized, open the repository's **Settings → Secrets and variables → Actions → Variables** and set `NEXT_PUBLIC_INTERVIEW_ENDPOINT` to the Worker URL. The workflow already reads that variable. Rebuild/deploy the website, then verify a test submission on the actual GitHub Pages URL and confirm the row in the Sheet. Merely configuring a variable does not change an already-built static website.

If Apps Script code changes later, deploy a new Apps Script version before retesting. For additional validation details and column migrations, see `README.md` in this folder.
