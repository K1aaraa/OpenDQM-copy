// Next 16.4 exports nested segment paths with Windows separators, while its router
// requests dot-separated __next.*.txt filenames. Linux already emits flat files.
// Copy the Windows variants to the expected names; never rewrite application data.
// Remove this workaround when an upgraded Next build passes the resource checks
// on Windows without it. See docs/DEVELOPMENT.md.
import { readdir, copyFile } from "node:fs/promises";
import { resolve, relative, dirname, join } from "node:path";

const root = resolve("out");
let copied = 0;

async function visit(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const source = join(directory, entry.name);
    if (entry.isDirectory()) {
      await visit(source);
    } else if (entry.isFile() && entry.name.endsWith(".txt")) {
      const parts = relative(root, source).split(/[\\/]/);
      const segment = parts.findIndex((part) => part.startsWith("__next."));
      if (segment !== -1 && segment < parts.length - 1) {
        const destination = join(root, ...parts.slice(0, segment), parts.slice(segment).join("."));
        if (dirname(destination) !== dirname(source)) {
          await copyFile(source, destination);
          copied++;
        }
      }
    }
  }
}

await visit(root);
console.log(`Static export ready (${copied} Windows prefetch filenames normalized).`);
