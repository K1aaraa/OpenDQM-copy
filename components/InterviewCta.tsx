import { Reveal } from "@/components/Reveal";
import { GradientHeading } from "@/components/GradientHeading";
import Link from "next/link";

type InterviewCtaProps = { compact?: boolean };

export function InterviewCta({ compact = false }: InterviewCtaProps) {
  return (
    <section className={`survey-cta ${compact ? "survey-cta-compact" : ""}`}>
      <div className="container">
        <Reveal className="survey-cta-inner">
          <div>
            <GradientHeading lead="What does quality mean to you?" emphasis="" />
            <p>
              Your experience can help OpenDQM understand the challenges, solutions, and new ideas
              for distributed quality management.
            </p>
          </div>
          <Link className="button button-light" href="/contact#schedule-interview">
            Schedule an Interview <span aria-hidden="true">&#8594;</span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
