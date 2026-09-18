type PageHeaderProps = {
  eyebrow?: string;
  title: string;
  description: string;
};

export function PageHeader({ eyebrow, title, description }: PageHeaderProps) {
  return (
    <section className={`page-header page-header-${eyebrow?.toLowerCase() ?? "default"}`}>
      <div className="container">
        <Reveal className="page-header-content">
          {eyebrow ? <p className="section-kicker">{eyebrow}</p> : null}
          <h1>{title}</h1>
          <p>{description}</p>
        </Reveal>
      </div>
    </section>
  );
}
import { Reveal } from "@/components/Reveal";
