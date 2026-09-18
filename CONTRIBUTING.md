# Contributing to OpenDQM

Thank you for helping improve OpenDQM. This project uses a pull request workflow so changes can be reviewed and validated before they reach production.

## Workflow

1. Create a branch from `main`.
2. Use a descriptive branch name, such as `feature/events-page`, `fix/project-card-layout`, or `docs/readme`.
3. Make focused commits with meaningful messages.
4. Run the local checks before opening a pull request.
5. Open a pull request and wait for CI to pass.

## Local Checks

```bash
npm run lint
npm run typecheck
npm run test
npm run format:check
npm run build
```

## Commit Messages

Use clear, action-oriented messages:

- `Add events route`
- `Refactor project cards into reusable component`
- `Fix mobile menu focus state`
- `Document GitHub Pages deployment`

## Code Style

- TypeScript runs in strict mode.
- Components should be small, named, and reusable.
- Shared content belongs in `data/` when it is repeated or likely to change.
- Public images belong in `public/images`.
- Downloadable documents belong in `public/documents`.
- Preserve accessibility features such as skip links, semantic headings, visible focus styles, labels, and reduced-motion support.

## Pull Request Expectations

Pull requests should include:

- A short summary of what changed
- Screenshots for visual changes
- Notes about testing performed
- Any follow-up work or known limitations

CI must pass before merge. Deployment to GitHub Pages happens only after changes are merged to `main`.
