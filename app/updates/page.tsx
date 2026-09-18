import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "Updates",
  description: "OpenDQM project and community updates.",
  alternates: { canonical: "/updates" }
};

export default function UpdatesPage() {
  return (
    <PageHeader
      eyebrow="Updates"
      title="OpenDQM updates are coming soon."
      description="This route is ready for future project announcements, community news, and release notes."
    />
  );
}
