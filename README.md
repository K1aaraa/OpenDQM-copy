# OpenDQM website

Public information site for Open Distributed Quality Management. Built with Next.js App Router, React, TypeScript, and plain CSS. It exports static HTML for GitHub Pages; interview requests go to a separately configured service.

## Start here

Use **Node.js 22.12 or newer in the Node 22 LTS line** (CI uses Node 22).

```sh
npm ci
npm run dev
```

Open http://localhost:3000. No credentials are needed to view the site. Without an interview endpoint, the form shows an email fallback and disables submission. See [.env.example](.env.example) for optional settings; never commit `.env.local`.

## Commands

| Command                                       | Purpose                                                          |
| --------------------------------------------- | ---------------------------------------------------------------- |
| `npm run dev`                                 | Local development with hot reload                                |
| `npm run check`                               | Lint, TypeScript, formatting, and unit tests                     |
| `npm run format`                              | Apply formatting to source and documentation                     |
| `npm run build`                               | Export the website into `out/`                                   |
| `npm run preview`                             | Serve the existing export on http://127.0.0.1:4173               |
| `npm run test:browser`                        | Responsive, accessibility, and interaction checks against `out/` |
| `npm audit --omit=dev --audit-level=moderate` | The production dependency audit used in CI                       |

Before the first browser check, run `npx playwright install chromium`. Run `npm run build` before `npm run test:browser`; tests intentionally check production output, not the development server. Playwright starts and stops its preview server automatically. External forms, emails, or real participant records are never submitted by these checks.

## Where to change things

| Change                                             | File or directory                                                       |
| -------------------------------------------------- | ----------------------------------------------------------------------- |
| Homepage headline, survey and interview buttons    | `components/Hero.tsx`                                                   |
| Main navigation / text branding / footer           | `components/Header.tsx`, `Wordmark.tsx`, `Footer.tsx`                   |
| About page and Project Summary PDF section         | `app/about/page.tsx`                                                    |
| Team members and biographies                       | `data/team.tsx` (JSX biographies)                                       |
| Workshop dates and venues                          | `data/events.ts`                                                        |
| Webinar dates / verified source URLs               | `data/webinars.ts`                                                      |
| Presenter names, roles, biographies, profile links | `data/webinar-presenters.ts`                                            |
| Webinar page layout                                | `app/events/[slug]/page.tsx`                                            |
| Survey URL and document register                   | `data/resources.ts`                                                     |
| Interview form / validation / delivery             | `components/InterviewForm.tsx`, `lib/interview.ts`, `lib/appsScript.ts` |
| Colors, shared layout and responsive rules         | `app/globals.css`                                                       |
| Summary section and webinar styling                | `styles/project-summary.css`, `styles/webinars.css`                     |
| Static images / downloadable documents             | `public/images/`, `public/documents/`                                   |

## Developer handoff

- [Development guide](docs/DEVELOPMENT.md): architecture, styling, content updates, and debugging.
- [Verification guide](docs/VERIFICATION.md): checks, deployment prefixes, and external-service limits.
- [Interview integration guide](integration/README.md): choose the matching form backend.
- [Contributing](CONTRIBUTING.md): local and pull request workflow.
- [Roadmap](ROADMAP.md): proposed features, separate from the current implementation.

## CI and deployment

[`.github/workflows/ci.yml`](.github/workflows/ci.yml) installs the lockfile dependencies, checks code and formatting, runs unit tests and the production audit, builds the static site, and runs Chromium responsive/accessibility tests. A successful push to `main` then deploys `out/` to GitHub Pages; pull requests validate without deploying.

The workflow derives `NEXT_PUBLIC_BASE_PATH` from the repository name and sets `GITHUB_PAGES=true`. For a root custom-domain deployment, use an empty prefix instead. Keep the same prefix when building and previewing. See the verification guide for copyable commands.

`out/`, `.next/`, test reports, and `.qa/` are generated local output. Do not edit or commit them. Downloaded source archives do not contain `.git`; use a real clone for branches, diffs, and pull requests. Local checks do not establish that a remote Actions run has passed.
