type PageHeaderProps = {
  eyebrow?: string;
  title: string;
  description: string;
};

export function PageHeader({ eyebrow, title, description }: PageHeaderProps) {
  return (
    <section className="page-header">
      <div className="container">
        <Reveal className="page-header-content">
          {eyebrow ? <p className="section-kicker">{eyebrow}</p> : null}
          <TypedHeading as="h1">{title}</TypedHeading>
          <p>{description}</p>
        </Reveal>
      </div>
    </section>
  );
}
import { Reveal } from "@/components/Reveal";
import { TypedHeading } from "@/components/TypedHeading";
