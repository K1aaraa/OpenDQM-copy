"use client";

import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";

type GradientHeadingProps = {
  as?: "h1" | "h2";
  lead: string;
  emphasis: string;
  className?: string;
};

type HeadingStyle = CSSProperties & { "--characters": number };

export function GradientHeading({
  as: Tag = "h2",
  lead,
  emphasis,
  className = ""
}: GradientHeadingProps) {
  const ref = useRef<HTMLHeadingElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const heading = ref.current;
    if (!heading) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(heading);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`gradient-heading ${visible ? "gradient-heading-visible" : ""} ${className}`.trim()}
    >
      <span className="heading-lead">{lead}</span>{" "}
      <strong
        className="typed-gradient"
        style={{ "--characters": emphasis.length } as HeadingStyle}
      >
        {emphasis}
      </strong>
    </Tag>
  );
}
