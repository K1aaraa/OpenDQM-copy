type BrandIconProps = { kind: "mail" | "calendar" | "arrow" };

export function BrandIcon({ kind }: BrandIconProps) {
  return (
    <svg
      className="brand-icon"
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {kind === "mail" && (
        <>
          <rect x="3" y="5" width="18" height="14" rx="4" />
          <path d="m4 7 8 6 8-6" />
        </>
      )}
      {kind === "calendar" && (
        <>
          <rect x="4" y="5" width="16" height="16" rx="4" />
          <path d="M8 3v4m8-4v4M4 11h16m-12 5 2 2 5-5" />
        </>
      )}
      {kind === "arrow" && (
        <>
          <path d="M4 12h15m-5-5 5 5-5 5" />
          <circle cx="4" cy="12" r="1" fill="currentColor" stroke="none" />
        </>
      )}
    </svg>
  );
}
