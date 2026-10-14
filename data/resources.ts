export const surveyUrl =
  "https://docs.google.com/forms/d/e/1FAIpQLSdwxEZT6vPbFw7K9m1mXFwH4mAHAooeS-6rnsAkMlPOzjc5LQ/viewform?usp=publish-editor";

export const resources = {
  participate: {
    eyebrow: "Participate",
    title: "OpenDQM Survey",
    description: "Share your perspective and help shape OpenDQM priorities and community needs.",
    href: surveyUrl,
    action: "Take the survey"
  },
  documents: [
    {
      eyebrow: "Project document",
      title: "2026 POSE Proposal",
      description: "Read the proposal that frames the current OpenDQM project and its goals.",
      href: "/documents/2026-POSE-Proposal.pdf",
      action: "View proposal"
    }
  ]
} as const;
