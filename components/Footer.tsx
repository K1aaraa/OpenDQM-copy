import Link from "next/link";
import { Logo } from "@/components/Logo";
import { surveyUrl } from "@/data/resources";

const currentYear = new Date().getFullYear();

export function Footer() {
  return (
    <footer id="contact">
      <div className="container">
        <div className="footer-cta">
          <h2>
            Help shape the future of <span>distributed quality management.</span>
          </h2>
          <div className="footer-actions">
            <a className="button button-light" href={surveyUrl}>
              Take the survey
            </a>
            <Link className="button button-outline-light" href="/contact">
              Contact us
            </Link>
          </div>
        </div>
        <div className="footer-directory">
          <div className="footer-intro">
            <Logo />
            <p>Open, shared infrastructure for trusted distributed quality management.</p>
          </div>
          <div className="footer-column">
            <h3>Explore</h3>
            <Link href="/about">About OpenDQM</Link>
            <span className="footer-unavailable">Updates</span>
            <Link href="/events">Events</Link>
            <span className="footer-unavailable">Resources</span>
          </div>
          <div className="footer-column">
            <h3>Resources</h3>
            <a href={surveyUrl}>Survey</a>
            <span className="footer-unavailable">Community materials</span>
          </div>
          <div className="footer-column">
            <h3>Connect</h3>
            <Link href="/contact">Contact us</Link>
            <a href="https://github.com/PubInv/OpenDQM">GitHub</a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>Copyright {currentYear} OpenDQM</span>
          <span>Open Distributed Quality Management</span>
        </div>
      </div>
    </footer>
  );
}
