# OpenDQM Product Roadmap

## Phase 1: Static Site

- Maintain the accessible Next.js static export on GitHub Pages.
- Keep the existing Google Form as the primary survey path.
- Preserve reduced-motion, keyboard, contrast, and responsive behavior as release requirements.

## Phase 2: Interest and Contact Data

Build one reusable interest form for the About page, Events page, and final site CTA. The frontend should submit to an external serverless endpoint so the website can remain on GitHub Pages.

The typed frontend form is prepared in `components/InterestForm.tsx`. It must not be rendered until a reviewed endpoint, privacy statement, success/error handling, and abuse controls are configured.

```text
GitHub Pages
  -> Cloudflare Worker or Supabase Edge Function
  -> server-side validation, rate limiting, and bot protection
  -> PostgreSQL / Supabase
```

The data model should include `name`, `email`, `organization`, `role`, `interests`, `source`, `consent`, and `created_at`. Marketing consent must remain separate from survey participation. Production work requires an approved provider, privacy copy, retention policy, unsubscribe flow, and secrets configured outside browser code.

## Phase 3: Conversational Survey

- Read and cache the current Google Form schema through the supported Google Forms API.
- Present questions progressively in an accessible conversational interface.
- Store responses in OpenDQM-owned infrastructure because the Forms REST API does not support submitting completed responses.
- Keep the direct Google Form CTA available as an alternative.
- Treat optional update signup as a separate consent step.

## Release Gates

Every phase must continue to pass ESLint, TypeScript, Prettier, Vitest, the production build, accessibility checks, and the GitHub Pages deployment workflow. New external integrations must fail visibly and safely rather than pretending a submission succeeded.
