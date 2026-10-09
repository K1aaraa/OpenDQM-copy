import Image from "next/image";
import { assetPath } from "@/lib/assets";
import { Reveal } from "@/components/Reveal";

export function InstitutionalSupport() {
  return (
    <section className="institutional-support" aria-labelledby="institutional-support-title">
      <div className="container">
        <Reveal className="institutional-support-panel">
          <div className="nsf-wordmark">
            <Image
              src={assetPath("/images/nsf-logo.png")}
              alt="National Science Foundation logo"
              width={260}
              height={260}
            />
          </div>
          <div className="institutional-support-copy">
            <p className="section-kicker"></p>
            <h2 id="institutional-support-title">NSF POSE Phase I Grant</h2>
            <p>
              OpenDQM research is being conducted within the framework of the National Science
              Foundation&apos;s Pathways to Enable Open-Source Ecosystems (POSE) program, which
              focuses on planning and growing sustainable open-source ecosystems around shared
              technologies and communities.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
