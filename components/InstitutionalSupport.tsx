import Image from "next/image";
import { Reveal } from "@/components/Reveal";

export function InstitutionalSupport() {
  return (
    <section className="institutional-support" aria-labelledby="institutional-support-title">
      <div className="container">
        <Reveal className="institutional-support-panel">
          <div className="nsf-wordmark">
            <Image
              src="/images/NSF_logo.png"
              alt="National Science Foundation"
              width={260}
              height={260}
            />
          </div>
          <div className="institutional-support-copy">
            <p className="section-kicker">Institutional context</p>
            <h2 id="institutional-support-title">Research through the NSF POSE initiative</h2>
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
