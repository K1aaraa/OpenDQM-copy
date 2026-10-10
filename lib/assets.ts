/** Public files need the same prefix as routes on a GitHub Pages project site. */
export function assetPath(path: string) {
  return `${process.env.NEXT_PUBLIC_BASE_PATH || ""}${path}`;
}
