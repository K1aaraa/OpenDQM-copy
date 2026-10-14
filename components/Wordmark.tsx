import Link from "next/link";

export function Wordmark({ variant = "dark" }: { variant?: "dark" | "light" }) {
  return (
    <Link className={`brand brand-${variant}`} href="/" aria-label="OpenDQM home">
      OpenDQM
    </Link>
  );
}
