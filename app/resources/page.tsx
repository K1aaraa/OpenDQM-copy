import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { InterviewCta } from "@/components/InterviewCta";

export const metadata: Metadata = {
  title: "Resources",
  description: "Participate in OpenDQM and find future community resources.",
  alternates: { canonical: "/resources" }
};

export default function ResourcesPage() {
  return (
    <>
      <PageHeader title="Explore OpenDQM" description="" />
      <InterviewCta />
    </>
  );
}
