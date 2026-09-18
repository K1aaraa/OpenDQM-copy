import Link from "next/link";
import { surveyUrl } from "@/data/resources";

export function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-waves" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
      </div>
      <div className="container hero-grid">
        <div className="hero-content">
          <h1>
            Making is becoming more distributed. <span>How do we make quality visible?</span>
          </h1>
          <p className="hero-copy">
            Products can be designed, made, tested, and used by different people in different
            places. OpenDQM brings people together to explore shared approaches to quality across
            them.
          </p>
          <div className="hero-actions">
            <a className="button hero-button-primary" href={surveyUrl}>
              Share your perspective <span aria-hidden="true">&#8594;</span>
            </a>
            <Link className="button hero-button-secondary" href="/about">
              Explore OpenDQM <span aria-hidden="true">&#8594;</span>
            </Link>
          </div>
        </div>
      </div>
      <div className="hero-process" aria-label="Design, make, check, use, improve">
        <span>Design</span>
        <i aria-hidden="true">&#8594;</i>
        <span>Make</span>
        <i aria-hidden="true">&#8594;</i>
        <span>Check</span>
        <i aria-hidden="true">&#8594;</i>
        <span>Use</span>
        <i aria-hidden="true">&#8594;</i>
        <span>Improve</span>
      </div>
    </section>
  );
}
