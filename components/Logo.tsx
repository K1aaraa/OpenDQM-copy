import Link from "next/link";

export function Logo() {
  return (
    <Link className="brand" href="/" aria-label="OpenDQM home">
      <svg className="brand-mark" viewBox="0 0 48 48" aria-hidden="true">
        <rect width="48" height="48" rx="13" fill="#67569F" />
        <path
          d="M12 12h24v24H12zM24 12v24M12 24h24"
          fill="none"
          stroke="#D6F8FF"
          strokeWidth="2.4"
        />
        <circle cx="24" cy="24" r="8" fill="none" stroke="#96DBEE" strokeWidth="2.4" />
      </svg>
      <span>
        Open<span>DQM</span>
      </span>
    </Link>
  );
}
