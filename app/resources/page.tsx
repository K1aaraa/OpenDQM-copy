import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { resources } from "@/data/resources";

export const metadata: Metadata = {
  title: "Resources",
  description: "Participate in OpenDQM and find future community resources.",
  alternates: { canonical: "/resources" }
};

export default function ResourcesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Resources"
        title="Explore the material behind OpenDQM."
        description="Share your perspective, learn where the project started, and return as new community resources are developed."
      />
      <section className="section resources-page">
        <div className="container resource-groups">
          <section className="resource-group" aria-labelledby="participate-heading">
            <div className="resource-group-heading">
              <span>01</span>
              <h2 id="participate-heading">Share your perspective</h2>
            </div>
            <article className="resource-row resource-row-featured">
              <div>
                <span className="card-kicker">{resources.participate.eyebrow}</span>
                <h3>{resources.participate.title}</h3>
                <p>{resources.participate.description}</p>
              </div>
              <a className="button button-primary" href={resources.participate.href}>
                {resources.participate.action} <span aria-hidden="true">&#8599;</span>
              </a>
            </article>
          </section>

          <section className="resource-group" aria-labelledby="proposal-heading">
            <div className="resource-group-heading">
              <span>02</span>
              <h2 id="proposal-heading">Where the project started</h2>
            </div>
            <article className="resource-row">
              <div>
                <span className="card-kicker">Project proposal</span>
                <h3>{resources.documents[0].title}</h3>
                <p>Learn about the ideas and questions that shaped the beginning of OpenDQM.</p>
              </div>
              <a className="button button-secondary" href={resources.documents[0].href}>
                View proposal <span aria-hidden="true">&#8594;</span>
              </a>
            </article>
          </section>

          <section className="resource-group resource-coming-soon" aria-labelledby="more-heading">
            <div className="resource-group-heading">
              <span>03</span>
              <h2 id="more-heading">More resources</h2>
            </div>
            <p>Future guides and community material will be added as the work develops.</p>
          </section>
        </div>
      </section>
    </>
  );
}
