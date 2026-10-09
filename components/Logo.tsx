import Link from "next/link";
import Image from "next/image";
import { assetPath } from "@/lib/assets";

export function Logo() {
  return (
    <Link className="brand" href="/" aria-label="OpenDQM home">
      <Image
        src={assetPath("/images/Dark Logo.png")}
        alt="OpenDQM"
        width={1400}
        height={670}
        priority
      />
    </Link>
  );
}
