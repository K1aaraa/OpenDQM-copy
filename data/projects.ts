export type Project = {
  title: string;
  category: string;
  description: string;
  image: string;
  alt: string;
};

export const projects: Project[] = [
  {
    title: "Global Distributed Tracking",
    category: "Provenance",
    description: "Traceable, verifiable records across distributed production networks.",
    image: "/images/gdt.jpg",
    alt: "Global Distributed Tracking project logo"
  },
  {
    title: "Internet of Production",
    category: "Infrastructure",
    description: "Connecting production knowledge, systems, and participants.",
    image: "/images/iopa.png",
    alt: "Internet of Production project logo"
  },
  {
    title: "Open Source Hardware Association",
    category: "Validation",
    description: "Certification for open-source hardware projects.",
    image: "/images/oshwa.jpg",
    alt: "Open Source Hardware Association logo"
  },
  {
    title: "Distributed Medical Device Manufacturing",
    category: "Production",
    description: "Experienced team of medical device manufacturers.",
    image: "/images/dmdm.png",
    alt: "Distributed Medical Device Manufacturing project logo"
  }
];
