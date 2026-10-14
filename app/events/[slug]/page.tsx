import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/PageHeader";
import { webinars } from "@/data/webinars";

export const dynamicParams = false;
export function generateStaticParams() {
  return webinars.map(({ slug }) => ({ slug }));
}
type Props = { params: Promise<{ slug: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const webinar = webinars.find((item) => item.slug === slug);
  return { title: webinar ? `${webinar.title} | ${webinar.date}` : "Webinar" };
}
export default async function WebinarPage({ params }: Props) {
  const { slug } = await params;
  const webinar = webinars.find((item) => item.slug === slug);
  if (!webinar) notFound();
  return (
    <div className="webinar-archive">
      <PageHeader title={webinar.title} description={`${webinar.date} · Online webinar`} />
      <section className="section webinar-details">
        <div className="container">
          <Link className="webinar-link" href="/events">
            ← Back to events
          </Link>
          <nav className="webinar-page-nav" aria-label="On this page">
            <a href="#webinar-overview">Overview</a>
            <a href="#presenters-title">
              Presenters <span>{webinar.presenters.length}</span>
            </a>
          </nav>
          <div className="webinar-overview-grid" id="webinar-overview">
            <aside className="webinar-session" aria-label="Session information">
              <span className="event-status">Past event</span>
              <h2>Session details</h2>
              <dl className="webinar-facts">
                <div>
                  <dt>Time</dt>
                  <dd>{webinar.sessionTime}</dd>
                </div>
                <div>
                  <dt>Format</dt>
                  <dd>Online community webinar</dd>
                </div>
                <div>
                  <dt>Hosted by</dt>
                  <dd>Andrew Lamb &amp; Victoria Jaqua</dd>
                </div>
              </dl>
              <button className="button button-primary" type="button" disabled>
                Video coming soon
              </button>
            </aside>
            <div className="webinar-description">
              <h2>Quality in a distributed world</h2>
              <p>
                The challenge of distributed manufacturing is the challenge of distributed quality
                management, control and assurance. Traditional, centralised approaches are not yet
                fit for a future where anyone almost anywhere can make and sell almost anything.
              </p>
              <p>
                The{" "}
                <a href="https://www.internetofproduction.org/">Internet of Production Alliance</a>,{" "}
                <a href="https://www.pubinv.org/">Public Invention</a> and the{" "}
                <a href="https://gosqas.org/">
                  Global Open Source Quality Assurance System (GOSQAS)
                </a>{" "}
                convened two online gatherings to share ideas and innovations that might help the
                world to overcome this challenge, connecting people looking for ideas, innovations
                and new connections.
              </p>
            </div>
          </div>
          <section className="webinar-presenters" aria-labelledby="presenters-title">
            <div className="webinar-presenters-header">
              <div>
                <h2 id="presenters-title">
                  Presenters <span className="presenter-count">{webinar.presenters.length}</span>
                </h2>
              </div>
            </div>
            <div className="webinar-presenter-grid">
              {webinar.presenters.map((presenter) => (
                <article className="info-card webinar-presenter" key={presenter.name}>
                  <div className="webinar-presenter-heading">
                    <span className="presenter-initials" aria-hidden="true">
                      {presenter.initials}
                    </span>
                    <div>
                      <h3>{presenter.name}</h3>
                      {presenter.role ? <p className="presenter-role">{presenter.role}</p> : null}
                      {presenter.organization ? <p>{presenter.organization}</p> : null}
                    </div>
                  </div>
                  {presenter.bio || presenter.links.length > 0 ? (
                    <details className="presenter-bio-disclosure">
                      <summary aria-label={`Bio of ${presenter.name}`}>
                        <span className="bio-label-closed">View bio</span>
                        <span className="bio-label-open">Close bio</span>
                        <span className="bio-toggle-icon" aria-hidden="true" />
                      </summary>
                      {presenter.bio ? <p className="presenter-bio">{presenter.bio}</p> : null}
                      {presenter.links.length > 0 ? (
                        <ul
                          className="presenter-links"
                          aria-label={`${presenter.name} profile links`}
                        >
                          {presenter.links.map((link) => (
                            <li key={link.href}>
                              <a
                                href={link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={`${presenter.name}: ${link.label} (opens in a new tab)`}
                              >
                                {link.label} ↗
                              </a>
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </details>
                  ) : null}
                </article>
              ))}
            </div>
          </section>
        </div>
      </section>
    </div>
  );
}
