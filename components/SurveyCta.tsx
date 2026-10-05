import { Reveal } from "@/components/Reveal";
import { GradientHeading } from "@/components/GradientHeading";
import { surveyUrl } from "@/data/resources";

type SurveyCtaProps = { compact?: boolean };

export function SurveyCta({ compact = false }: SurveyCtaProps) {
  return (
    <section className={`survey-cta ${compact ? "survey-cta-compact" : ""}`}>
      <div className="container">
        <Reveal className="survey-cta-inner">
          <div>
            <GradientHeading lead="What does quality mean to you?" emphasis = "" />
            <p>
              Your experience can help OpenDQM understand the challenges, solutions, and new ideas for distributed quality management.
            </p>
          </div>
          <a className="button button-light" href={surveyUrl}>
            Schedule an Interview <span aria-hidden="true">&#8594;</span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
