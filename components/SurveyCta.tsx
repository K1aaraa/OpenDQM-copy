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
            <p className="section-kicker">Take the survey</p>
            <GradientHeading lead="What does quality look like" emphasis="from where you stand?" />
            <p>
              We&apos;re listening. Your experience can help OpenDQM understand what works, what is
              missing, and what distributed quality needs to become.
            </p>
          </div>
          <a className="button button-light" href={surveyUrl}>
            Take the OpenDQM Survey <span aria-hidden="true">&#8594;</span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
