import Link from "next/link";

export function Logo() {
  return (
    <Link className="brand" href="/" aria-label="OpenDQM home">
      <span>
        Open<span>DQM</span>
      </span>
    </Link>
  );
}
