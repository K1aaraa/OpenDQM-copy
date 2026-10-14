import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const prefix = process.env.NEXT_PUBLIC_BASE_PATH || "";
const url = (path: string) => `${prefix}${path}`;
const routes = [
  "/",
  "/about/",
  "/events/",
  "/resources/",
  "/contact/",
  "/updates/",
  "/events/show-and-tell-december-3-2025/",
  "/events/show-and-tell-december-4-2025/"
];

for (const width of [320, 390, 768, 1024, 1440, 1920]) {
  test(`pages and assets fit a ${width}px viewport`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    const failedResources: string[] = [];
    page.on("response", (response) => {
      if (response.status() >= 400) failedResources.push(`${response.status()} ${response.url()}`);
    });
    for (const route of routes) {
      const response = await page.goto(url(route));
      expect(response?.status(), route).toBe(200);
      await expect(page.locator("h1")).toBeVisible();
      // Load offscreen images before testing their actual decoded state.
      await page.evaluate(async () => {
        const images = Array.from(document.images);
        await Promise.all(
          images.map(async (image) => {
            image.loading = "eager";
            await image.decode().catch(() => {});
          })
        );
      });
      expect(
        await page.evaluate(() =>
          Array.from(document.images)
            .filter((image) => image.naturalWidth === 0)
            .map((image) => image.src)
        ),
        route
      ).toEqual([]);
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth > innerWidth),
        route
      ).toBe(false);
      const heading = await page.locator("h1").boundingBox();
      expect(heading!.x + heading!.width, route).toBeLessThanOrEqual(width + 1);
    }
    expect(errors).toEqual([]);
    expect(failedResources).toEqual([]);
  });
}

for (const width of [390, 1440]) {
  test(`accessible page content at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    for (const route of routes) {
      await page.goto(url(route));
      const result = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
        .analyze();
      expect(result.violations, route).toEqual([]);
    }
  });
}

test("mobile navigation contains keyboard focus and restores it on Escape", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(url("/"));
  const toggle = page.getByRole("button", { name: "Open navigation", exact: true });
  await toggle.click();
  const menu = page.getByRole("dialog", { name: "Site navigation" });
  await expect(menu.getByRole("button", { name: "Close navigation" })).toBeFocused();
  const last = menu.getByRole("link").last();
  await last.focus();
  await page.keyboard.press("Tab");
  await expect(menu.getByRole("button", { name: "Close navigation" })).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(toggle).toBeFocused();
  await expect(menu).not.toBeVisible();
  await toggle.click();
  await menu.getByRole("link", { name: "About", exact: true }).click();
  await expect(page).toHaveURL(new RegExp(`${prefix}/about/?$`));
  await expect(page.locator("main")).not.toHaveAttribute("inert");
});

test("presenter links are available only after expanding their profile", async ({ page }) => {
  for (const day of [3, 4]) {
    await page.goto(url(`/events/show-and-tell-december-${day}-2025/`));
    await expect(page.locator(".webinar-presenter")).toHaveCount(13);
    await expect(page.getByRole("button", { name: "Video coming soon" })).toBeDisabled();
    for (const profile of await page.locator(".webinar-presenter").all()) {
      const links = profile.locator(".presenter-links a");
      await expect(links.first()).not.toBeVisible();
      await profile.locator("summary").click();
      await expect(links.first()).toBeVisible();
      await profile.locator("summary").press("Enter");
      await expect(links.first()).not.toBeVisible();
    }
  }
});

test("summary download and team biography controls work", async ({ page, request }) => {
  await page.goto(url("/about/"));
  const document = page.getByRole("link", {
    name: "View Project Summary PDF (opens in a new tab)",
    exact: true
  });
  const response = await request.get((await document.getAttribute("href"))!);
  expect(response.status()).toBe(200);
  expect((await response.body()).subarray(0, 5).toString()).toBe("%PDF-");
  const card = page.locator(".team-card").first();
  await card.getByRole("button", { name: /^Read bio for/ }).click();
  await expect(card.getByRole("region")).toBeVisible();
  await expect(card.getByRole("button", { name: /^Back to photo/ })).toBeFocused();
  await card.getByRole("button", { name: /^Back to photo/ }).press("Enter");
  await expect(card.getByRole("button", { name: /^Read bio for/ })).toBeFocused();
});

test("interview deep link opens the form and invalid input cannot submit", async ({ page }) => {
  let writes = 0;
  await page.route("**/*", async (route) => {
    if (route.request().method() === "POST") {
      writes++;
      await route.abort();
    } else await route.continue();
  });
  await page.goto(url("/contact/#schedule-interview"));
  await expect(page.locator(".interview-form")).toBeVisible();
  await expect(page.locator('input[name="timezone"]')).not.toHaveValue("");
  const submit = page.getByRole("button", { name: /Request an Interview/ });
  if (await submit.isEnabled()) {
    await submit.click();
    expect(
      await page
        .locator('input[name="first_name"]')
        .evaluate((input: HTMLInputElement) => input.validity.valueMissing)
    ).toBe(true);
  } else {
    await expect(
      page.getByText("Online interview requests are being set up.", { exact: false })
    ).toBeVisible();
  }
  expect(writes).toBe(0);
});

test("unknown routes return a useful 404 with a working home link", async ({ page }) => {
  const response = await page.goto(url("/not-a-real-page/"));
  expect(response?.status()).toBe(404);
  await expect(page.getByRole("heading", { name: "Page not found." })).toBeVisible();
  await page.getByRole("link", { name: "Return home" }).click();
  await expect(page).toHaveURL(new RegExp(`${prefix}/$`));
});
