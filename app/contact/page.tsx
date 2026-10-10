import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { ContactChoices } from "@/components/ContactChoices";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact OpenDQM and learn how to participate in the distributed quality management ecosystem.",
  alternates: { canonical: "/contact" }
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Get involved"
        title="Help shape distributed quality management"
        description="Whether you'd like to ask a question or participate in the research, we'd like to hear from you."
      />
      <ContactChoices />
    </>
  );
}
