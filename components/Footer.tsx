import Image from "next/image";
import { assetPath } from "@/lib/assets";
import Link from "next/link";
import { Logo } from "@/components/Logo";

const currentYear = new Date().getFullYear();

export function Footer() {
  return (
    <footer id="contact">
      <div className="container">
        <div className="footer-directory">
          <div className="footer-intro">
            <Logo variant="light" />

            <p>Open, shared infrastructure for trusted distributed quality management.</p>

            <div className="footer-funding">
              <Image
                src={assetPath("/images/nsf-logo.png")}
                alt="National Science Foundation logo"
                width={70}
                height={70}
              />

              <span>Funded by the National Science Foundation</span>
            </div>
          </div>

          <div className="footer-column">
            <h3>Explore</h3>
            <Link href="/about">About OpenDQM</Link>
            <Link href="/events">Events</Link>
            <Link href="/resources">Resources</Link>
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
