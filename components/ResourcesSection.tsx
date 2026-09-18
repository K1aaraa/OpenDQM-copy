import Link from "next/link";
import { SurveyCta } from "@/components/SurveyCta";

export function ResourcesSection() {
  return (
    <>
      <SurveyCta />
      <div className="home-resources-link">
        <Link className="text-link" href="/resources">
          Explore OpenDQM resources <span aria-hidden="true">&#8594;</span>
        </Link>
      </div>
    </>
  );
}
