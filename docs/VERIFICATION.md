# Verification and release checks

## Match the GitHub workflow locally

Use Node 22 LTS (22.12+).

```sh
npm ci
npx playwright install chromium
npm run check
npm audit --omit=dev --audit-level=moderate
npm run build
npm run test:browser
```

On Linux, use `npx playwright install --with-deps chromium` to install browser system libraries. In restricted environments with a preinstalled Chromium binary, set `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH` to its full path, using a revision compatible with the installed Playwright version. The normal install does not need this override.

## GitHub Pages prefix

CI tests the exported production site under the repository prefix, not just at `/`. For this fork, the prefix is `/OpenDQM-copy`; upstream uses `/OpenDQM`.

PowerShell:

```powershell
$env:GITHUB_PAGES = "true"
$env:NEXT_PUBLIC_BASE_PATH = "/OpenDQM-copy"
npm run build
npm run test:browser
Remove-Item Env:GITHUB_PAGES, Env:NEXT_PUBLIC_BASE_PATH
```

Bash:

```sh
export GITHUB_PAGES=true NEXT_PUBLIC_BASE_PATH=/OpenDQM-copy
npm run build
npm run test:browser
unset GITHUB_PAGES NEXT_PUBLIC_BASE_PATH
```

For the normal root preview after a prefixed build, clear these settings and rebuild. A preview server cannot change the prefix already embedded in exported HTML. Stop any previously running preview server before testing a different prefix.

## What the browser checks cover

- Eight public routes (including the reserved Updates page) at 320, 390, 768, 1024, 1440, and 1920 CSS pixels.
- HTTP success, one visible main heading, decoded images, no horizontal page overflow or clipped heading, and no uncaught browser errors or failed resource responses.
- Automated WCAG A/AA checks with axe on phone and desktop widths.
- Mobile menu focus containment, Escape dismissal, route navigation, and restored background interaction.
- All 26 presenter profiles: links hidden until expanded and keyboard collapse.
- Disabled video controls, the actual summary PDF signature, and team-card keyboard focus.
- Interview deep link, detected timezone, required field validation, and unavailable-endpoint fallback. Test traffic blocks POST requests.

These checks use Chromium and do not establish cross-browser parity by themselves. Before release, also manually check Safari/iOS, Firefox, browser zoom, touch targets, text readability, screen-reader navigation, and real content. Automated accessibility checks do not replace that review.

## External integration limits

Unit tests mock the external writer. Browser tests intentionally do not send participant data or verify a real email/Sheet write. A backend owner must verify one explicitly marked synthetic request end-to-end against a test destination before enabling or changing production intake. See the integration guides. An ambiguous timeout must not display a success message.

The October 14, 2026 clean-install review found five high-severity **development-only** advisories in the existing `eslint-config-next -> @next/eslint-plugin-next -> fast-glob -> micromatch -> braces` chain. The available `braces` release was still 3.0.3; npm suggested downgrading the Next lint configuration across a major version. That change was not applied automatically. Recheck the advisory database when updating lint tooling. The production-only audit reported zero vulnerabilities.

The workflow audits **production** dependencies. Run `npm audit` separately when reviewing development-tool advisories. Do not run `npm audit fix --force` blindly: suggested major downgrades can break lint/build behavior. Keep the production audit and tooling findings distinct in release reports.

## Review artifacts

Playwright retains a trace in `test-results/` for failed tests. Open it using `npx playwright show-trace <path-to-trace.zip>`. Screenshots used during local review belong in ignored `.qa/`. CI failures must be fixed before deployment; a local pass does not guarantee GitHub permissions or external service settings.
