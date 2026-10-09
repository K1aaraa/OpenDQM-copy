import Link from "next/link";
import Image from "next/image";
import { assetPath } from "@/lib/assets";

export function Logo({ variant = "dark" }: { variant?: "dark" | "light" }) {
  return (
    <Link className={`brand brand-${variant}`} href="/" aria-label="OpenDQM home">
      <Image
        src={assetPath(`/images/${variant === "light" ? "Light" : "Dark"} Logo.png`)}
        alt="OpenDQM"
        width={1400}
        height={670}
        priority
      />
    </Link>
  );
}
