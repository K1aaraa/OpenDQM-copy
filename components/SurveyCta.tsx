import { Reveal } from "@/components/Reveal";
import { TypedHeading } from "@/components/TypedHeading";
import { surveyUrl } from "@/data/resources";

type SurveyCtaProps = { compact?: boolean };

export function SurveyCta({ compact = false }: SurveyCtaProps) {
  return (
    <section className={`survey-cta ${compact ? "survey-cta-compact" : ""}`}>
      <div className="container">
        <Reveal className="survey-cta-inner">
          <div>
            <p className="section-kicker">Share your perspective</p>
            <TypedHeading>
              What does quality look like <strong>from where you stand?</strong>
            </TypedHeading>
            <p>We are listening. Your experience can help shape what OpenDQM needs to become.</p>
          </div>
          <a className="button button-light" href={surveyUrl}>
            Share your perspective <span aria-hidden="true">&#8594;</span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
