# OpenDQM

[![CI](https://github.com/K1aaraa/OpenDQM-copy/actions/workflows/ci.yml/badge.svg)](https://github.com/K1aaraa/OpenDQM-copy/actions/workflows/ci.yml)

OpenDQM is the website for Open Distributed Quality Management: an open, shared, trusted, interoperable ecosystem for distributed quality assurance, verification, liability, and continuous improvement.

The site is now organized as a maintainable Next.js application with React, TypeScript, reusable components, data-driven content, and static export support for GitHub Pages.

## Live Site

The production site is intended to be served through GitHub Pages. Update this link when the repository URL or custom domain is finalized:

- https://opendqm.org

## Local Development

Requirements:

- Node.js 20 or newer
- npm

Install dependencies and start the development server:

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Commands

```bash
npm run dev
npm run lint
npm run typecheck
npm run test
npm run format:check
npm run build
```

## Project Structure

```text
app/                  Next.js App Router pages, metadata, and global CSS
components/           Reusable React components for layout and page sections
data/                 Typed content for navigation, projects, events, and resources
lib/                  Shared utilities
public/images/        Website images and social preview assets
public/documents/     PDFs, reports, and downloadable source documents
public/icons/         Favicons and reusable icon assets
tests/                Vitest coverage for structured content and utilities
.github/workflows/    CI and GitHub Pages deployment workflow
```

## Content Updates

Projects, events, resources, and navigation are data-driven:

- Add affiliated ecosystem projects in `data/projects.ts`
- Add events in `data/events.ts`
- Add resources in `data/resources.ts`
- Add or revise top-level navigation in `data/navigation.ts`

Routes live in `app/`. The homepage is the primary overview; supporting pages are available at `/about`, `/events`, `/resources`, and `/contact`. Affiliated projects appear on the homepage and About page rather than having a separate route. The `/updates` route is prepared for future content but intentionally hidden from navigation until updates are ready to publish.

## Deployment

Every push and pull request runs linting, TypeScript checks, Vitest, `npm audit`, and a production build through GitHub Actions. A successful push to `main` uploads the static `out/` artifact and deploys it to GitHub Pages.

For a project page deployed under a repository subpath, configure `NEXT_PUBLIC_BASE_PATH` and set `GITHUB_PAGES=true` in the workflow or repository environment.

## Contributing

Use pull requests for production changes. Create focused branches such as:

- `feature/site-refactor`
- `feature/events-page`
- `fix/mobile-navigation`
- `docs/contributing-guide`

Please read `CONTRIBUTING.md` before opening a pull request.

Planned backend-backed features, including the reusable interest form and conversational survey assistant, are tracked in [`ROADMAP.md`](ROADMAP.md).
