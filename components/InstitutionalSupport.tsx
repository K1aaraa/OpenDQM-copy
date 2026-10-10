import Image from "next/image";
import { Reveal } from "@/components/Reveal";

export function InstitutionalSupport() {
  return (
    <section className="institutional-support" aria-labelledby="institutional-support-title">
      <div className="container">
        <Reveal className="institutional-support-panel">
          <div className="nsf-wordmark">
            <Image src="public/images/nsf-logo.png" alt="" width={260} height={260} />
          </div>
          <div className="institutional-support-copy">
            <p className="section-kicker"></p>
            <h2 id="institutional-support-title">NSF POSE initiative</h2>
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
