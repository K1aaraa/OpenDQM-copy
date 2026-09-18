import type { Metadata } from "next";
import type { ReactNode } from "react";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://opendqm.org";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "OpenDQM | Open Distributed Quality Management",
    template: "%s | OpenDQM"
  },
  description:
    "OpenDQM is building an open, shared, trusted ecosystem for distributed quality management.",
  applicationName: "OpenDQM",
  keywords: [
    "OpenDQM",
    "distributed quality management",
    "quality assurance",
    "open source hardware",
    "distributed manufacturing"
  ],
  authors: [{ name: "OpenDQM" }],
  creator: "OpenDQM",
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "OpenDQM",
    title: "OpenDQM | Open Distributed Quality Management",
    description: "An open, shared, trusted ecosystem for distributed quality management.",
    images: [{ url: "/images/opengraph.svg", width: 1200, height: 630, alt: "OpenDQM" }]
  },
  twitter: {
    card: "summary_large_image",
    title: "OpenDQM",
    description: "An open, shared, trusted ecosystem for distributed quality management.",
    images: ["/images/opengraph.svg"]
  },
  alternates: {
    canonical: "/"
  }
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
